import csv
import functools
import os
import re
import secrets
import smtplib
import sqlite3
from datetime import datetime, timedelta
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from io import StringIO

from dotenv import load_dotenv
from flask import (Flask, g, jsonify, make_response, redirect, render_template,
                   request, session, url_for)
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY", secrets.token_hex(32))
app.permanent_session_lifetime = timedelta(days=7)
_raw_origins = os.getenv("ALLOWED_ORIGINS", "*")
_origins = "*" if _raw_origins == "*" else [o.strip() for o in _raw_origins.split(",")]
CORS(app, origins=_origins)

DB_PATH = os.getenv("DB_PATH", "enrollments.db")
SESSION_MINS = int(os.getenv("SESSION_TIMEOUT_MINUTES", "30"))

# ── DB ────────────────────────────────────────────────────────────────────────

def get_db():
    if "db" not in g:
        g.db = sqlite3.connect(DB_PATH)
        g.db.row_factory = sqlite3.Row
    return g.db

@app.teardown_appcontext
def close_db(_=None):
    db = g.pop("db", None)
    if db:
        db.close()

def init_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.executescript("""
        CREATE TABLE IF NOT EXISTS enrollments (
            id                INTEGER PRIMARY KEY AUTOINCREMENT,
            name              TEXT    NOT NULL,
            phone             TEXT    NOT NULL,
            aadhaar           TEXT    NOT NULL,
            learners_license  TEXT,
            preferred_course  TEXT    NOT NULL,
            email             TEXT    NOT NULL,
            submitted_at      TEXT    NOT NULL,
            contacted_status  TEXT    NOT NULL DEFAULT 'pending'
        );
        CREATE TABLE IF NOT EXISTS users (
            id            INTEGER PRIMARY KEY AUTOINCREMENT,
            username      TEXT    NOT NULL UNIQUE,
            password_hash TEXT    NOT NULL,
            display_name  TEXT,
            email         TEXT,
            created_at    TEXT    NOT NULL,
            last_login    TEXT
        );
        CREATE TABLE IF NOT EXISTS page_views (
            id         INTEGER PRIMARY KEY AUTOINCREMENT,
            page       TEXT NOT NULL,
            ip_hash    TEXT,
            viewed_at  TEXT NOT NULL
        );
    """)
    if not conn.execute("SELECT 1 FROM users LIMIT 1").fetchone():
        now = datetime.utcnow().isoformat(timespec="seconds")
        conn.executemany(
            "INSERT INTO users (username,password_hash,display_name,email,created_at) VALUES (?,?,?,?,?)",
            [
                ("admin",   generate_password_hash("adtc@2026"), "Administrator", "adtcfirozabadup@gmail.com", now),
                ("manager", generate_password_hash("adtc@2026"), "Manager",       "",                          now),
            ]
        )
    conn.commit()
    conn.close()

init_db()

# ── Auth ──────────────────────────────────────────────────────────────────────

_attempts: dict = {}

def login_required(f):
    @functools.wraps(f)
    def wrapped(*args, **kwargs):
        if not session.get("user_id"):
            return (jsonify({"error": "Unauthorized"}), 401) if request.is_json else redirect(url_for("admin_login"))
        if not session.get("remember_me"):
            last = session.get("last_active")
            if last:
                idle = (datetime.utcnow() - datetime.fromisoformat(last)).total_seconds()
                if idle > SESSION_MINS * 60:
                    session.clear()
                    return (jsonify({"error": "Session expired"}), 401) if request.is_json \
                        else redirect(url_for("admin_login") + "?expired=1")
        session["last_active"] = datetime.utcnow().isoformat()
        return f(*args, **kwargs)
    return wrapped

def csrf_protect(f):
    @functools.wraps(f)
    def wrapped(*args, **kwargs):
        if request.method in ("POST", "PATCH", "DELETE", "PUT"):
            token = request.headers.get("X-CSRF-Token") or request.form.get("csrf_token")
            if token != session.get("csrf_token"):
                return jsonify({"error": "Invalid request token."}), 403
        return f(*args, **kwargs)
    return wrapped

# ── Public API ────────────────────────────────────────────────────────────────

VALID_COURSES = {"Two-Wheeler", "Four-Wheeler", "Heavy Vehicle"}

def _validate_enroll(data):
    err = {}
    name = (data.get("name") or "").strip()
    if not name: err["name"] = "Full name is required."
    phone = re.sub(r"\D", "", data.get("phone") or "")
    if not phone: err["phone"] = "Phone number is required."
    elif not re.fullmatch(r"[6-9]\d{9}", phone): err["phone"] = "Enter a valid 10-digit Indian mobile number."
    aadhaar = re.sub(r"\s", "", data.get("aadhaar") or "")
    if not aadhaar: err["aadhaar"] = "Aadhaar number is required."
    elif not re.fullmatch(r"\d{12}", aadhaar): err["aadhaar"] = "Aadhaar must be exactly 12 digits."
    course = (data.get("preferred_course") or "").strip()
    if not course: err["preferred_course"] = "Please select a course."
    elif course not in VALID_COURSES: err["preferred_course"] = "Invalid course."
    email = (data.get("email") or "").strip().lower()
    if not email: err["email"] = "Email address is required."
    elif not re.fullmatch(r"[^\s@]+@[^\s@]+\.[^\s@]+", email): err["email"] = "Enter a valid email."
    return err

def _send_confirmation(to_email, name, phone, course):
    u = os.getenv("SMTP_USER", ""); p = os.getenv("SMTP_PASS", "")
    if not u or not p: return False
    msg = MIMEMultipart("alternative")
    msg["Subject"] = "ADTC Firozabad - Registration Confirmation"
    msg["From"]    = f"ADTC Firozabad <{u}>"
    msg["To"]      = to_email
    msg.attach(MIMEText(f"""Dear {name},

Thank you for registering with ADTC Firozabad.
We have received your interest in the {course} course.

Our team will contact you at {phone} within 24 hours to confirm your slot.

Documents to keep ready:
  - Aadhaar Card (original + photocopy)
  - 4-6 passport-size photographs
  - Medical fitness certificate (Form 1A)

Centre: Wazirpur Jihalpur, Firozabad, UP 283 203
Phone:  +91 97605 14938 | Mon-Sat 9 AM - 5 PM

Regards, ADTC Firozabad Team""", "plain", "utf-8"))
    try:
        with smtplib.SMTP(os.getenv("SMTP_HOST","smtp.gmail.com"), int(os.getenv("SMTP_PORT","587")), timeout=10) as s:
            s.ehlo(); s.starttls(); s.login(u, p)
            s.sendmail(u, to_email, msg.as_string())
        return True
    except Exception:
        return False

@app.route("/api/enroll", methods=["POST"])
def api_enroll():
    data = request.get_json(silent=True) or {}
    errors = _validate_enroll(data)
    if errors:
        return jsonify({"success": False, "errors": errors}), 400
    name    = data["name"].strip()
    phone   = re.sub(r"\D", "", data["phone"])
    aadhaar = re.sub(r"\s", "", data["aadhaar"])
    ll      = (data.get("learners_license") or "").strip()
    course  = data["preferred_course"].strip()
    email   = data["email"].strip().lower()
    now     = datetime.utcnow().isoformat(timespec="seconds")
    try:
        db = get_db()
        db.execute(
            "INSERT INTO enrollments (name,phone,aadhaar,learners_license,preferred_course,email,submitted_at,contacted_status)"
            " VALUES (?,?,?,?,?,?,?,'pending')",
            (name, phone, aadhaar, ll, course, email, now)
        )
        db.commit()
    except Exception:
        return jsonify({"success": False, "errors": {"_": "Server error. Please try again."}}), 500
    _send_confirmation(email, name, phone, course)
    return jsonify({"success": True, "message": "Your information has been received. We will contact you soon."})

@app.route("/api/track", methods=["POST"])
def api_track():
    data = request.get_json(silent=True) or {}
    page = (data.get("page") or "unknown")[:120]
    ip_h = str(abs(hash(request.remote_addr)))[-8:]
    now  = datetime.utcnow().isoformat(timespec="seconds")
    try:
        db = get_db()
        db.execute("INSERT INTO page_views (page,ip_hash,viewed_at) VALUES (?,?,?)", (page, ip_h, now))
        db.commit()
    except Exception:
        pass
    return jsonify({"ok": True})

@app.route("/health")
def health():
    return jsonify({"status": "ok"})

# ── Admin pages ───────────────────────────────────────────────────────────────

@app.route("/admin/login", methods=["GET", "POST"])
def admin_login():
    if session.get("user_id"):
        return redirect(url_for("admin_dashboard"))
    error = expired = None
    if request.method == "POST":
        username = (request.form.get("username") or "").strip().lower()
        password =  request.form.get("password") or ""
        remember = bool(request.form.get("remember"))
        key      = f"{request.remote_addr}:{username}"
        info     = _attempts.get(key, {"n": 0, "blocked_until": None})
        if info["blocked_until"] and datetime.utcnow() < info["blocked_until"]:
            error = "Too many failed attempts. Please wait 5 minutes."
        else:
            db   = get_db()
            user = db.execute("SELECT * FROM users WHERE username=?", (username,)).fetchone()
            if user and check_password_hash(user["password_hash"], password):
                _attempts.pop(key, None)
                db.execute("UPDATE users SET last_login=? WHERE id=?",
                           (datetime.utcnow().isoformat(timespec="seconds"), user["id"]))
                db.commit()
                session.clear()
                session.permanent = remember
                session["user_id"]      = user["id"]
                session["username"]     = user["username"]
                session["display_name"] = user["display_name"] or user["username"]
                session["remember_me"]  = remember
                session["last_active"]  = datetime.utcnow().isoformat()
                session["csrf_token"]   = secrets.token_hex(16)
                return redirect(url_for("admin_dashboard"))
            else:
                info["n"] += 1
                if info["n"] >= 5:
                    info["blocked_until"] = datetime.utcnow() + timedelta(minutes=5)
                _attempts[key] = info
                error = "Invalid username or password."
    expired = request.args.get("expired")
    return render_template("admin/login.html", error=error, expired=expired)

@app.route("/admin/logout")
def admin_logout():
    session.clear()
    return redirect(url_for("admin_login"))

@app.route("/admin/")
@app.route("/admin")
@login_required
def admin_dashboard():
    return render_template("admin/dashboard.html",
                           display_name=session.get("display_name", "Admin"),
                           csrf_token=session.get("csrf_token", ""))

# ── Admin API — metrics ───────────────────────────────────────────────────────

@app.route("/admin/api/metrics")
@login_required
def admin_metrics():
    db  = get_db()
    now = datetime.utcnow()
    mo  = now.replace(day=1).strftime("%Y-%m-%d")
    ws  = (now - timedelta(days=now.weekday())).strftime("%Y-%m-%d")
    pws = (now - timedelta(days=now.weekday() + 7)).strftime("%Y-%m-%d")
    pwe = (now - timedelta(days=now.weekday() + 1)).strftime("%Y-%m-%d")

    def scalar(q, *p):
        return db.execute(q, p).fetchone()[0]

    total    = scalar("SELECT COUNT(*) FROM enrollments")
    mo_cnt   = scalar("SELECT COUNT(*) FROM enrollments WHERE date(submitted_at)>=?", mo)
    pending  = scalar("SELECT COUNT(*) FROM enrollments WHERE contacted_status='pending'")
    contacted= scalar("SELECT COUNT(*) FROM enrollments WHERE contacted_status='contacted'")
    not_int  = scalar("SELECT COUNT(*) FROM enrollments WHERE contacted_status='not_interested'")
    this_wk  = scalar("SELECT COUNT(*) FROM enrollments WHERE date(submitted_at)>=?", ws)
    last_wk  = scalar("SELECT COUNT(*) FROM enrollments WHERE date(submitted_at) BETWEEN ? AND ?", pws, pwe)
    tv       = scalar("SELECT COUNT(*) FROM page_views")
    td       = scalar("SELECT COUNT(*) FROM page_views WHERE date(viewed_at)=date('now')")

    courses = db.execute(
        "SELECT preferred_course,COUNT(*) c FROM enrollments GROUP BY preferred_course"
    ).fetchall()

    return jsonify({
        "total": total, "this_month": mo_cnt,
        "pending": pending, "contacted": contacted, "not_interested": not_int,
        "this_week": this_wk, "last_week": last_wk, "week_change": this_wk - last_wk,
        "total_views": tv, "views_today": td,
        "courses": [{"course": r["preferred_course"], "count": r["c"]} for r in courses],
    })

# ── Admin API — leads ─────────────────────────────────────────────────────────

def _mask(aadhaar):
    return ("****" + aadhaar[-4:]) if len(aadhaar) >= 4 else "****"

@app.route("/admin/api/leads")
@login_required
def admin_leads():
    db     = get_db()
    status = request.args.get("status", "")
    course = request.args.get("course", "")
    search = request.args.get("search", "").strip()
    frm    = request.args.get("from", "")
    to     = request.args.get("to", "")
    sort   = request.args.get("sort", "submitted_at")
    order  = request.args.get("order", "desc")
    page   = max(1, int(request.args.get("page", 1)))
    per    = min(100, max(10, int(request.args.get("per_page", 25))))

    SAFE_SORTS = {"id","name","phone","email","preferred_course","submitted_at","contacted_status"}
    if sort not in SAFE_SORTS: sort = "submitted_at"
    dir_ = "DESC" if order.lower() == "desc" else "ASC"

    w, p = [], []
    if status: w.append("contacted_status=?"); p.append(status)
    if course: w.append("preferred_course=?"); p.append(course)
    if search: w.append("(name LIKE ? OR phone LIKE ?)"); p += [f"%{search}%", f"%{search}%"]
    if frm:    w.append("date(submitted_at)>=?"); p.append(frm)
    if to:     w.append("date(submitted_at)<=?"); p.append(to)

    wc    = ("WHERE " + " AND ".join(w)) if w else ""
    total = db.execute(f"SELECT COUNT(*) FROM enrollments {wc}", p).fetchone()[0]
    rows  = db.execute(
        f"SELECT * FROM enrollments {wc} ORDER BY {sort} {dir_} LIMIT ? OFFSET ?",
        p + [per, (page - 1) * per]
    ).fetchall()

    return jsonify({
        "leads": [{
            "id": r["id"], "name": r["name"], "phone": r["phone"], "email": r["email"],
            "aadhaar_masked": _mask(r["aadhaar"]),
            "learners_license": r["learners_license"] or "",
            "preferred_course": r["preferred_course"],
            "submitted_at": r["submitted_at"],
            "contacted_status": r["contacted_status"],
        } for r in rows],
        "total": total, "page": page, "per_page": per,
        "pages": max(1, -(-total // per)),
    })

@app.route("/admin/api/leads/<int:lid>/status", methods=["PATCH"])
@login_required
@csrf_protect
def admin_update_status(lid):
    data   = request.get_json(silent=True) or {}
    status = data.get("status", "")
    if status not in ("pending", "contacted", "not_interested"):
        return jsonify({"error": "Invalid status"}), 400
    db = get_db()
    db.execute("UPDATE enrollments SET contacted_status=? WHERE id=?", (status, lid))
    db.commit()
    return jsonify({"success": True})

@app.route("/admin/api/leads/<int:lid>", methods=["DELETE"])
@login_required
@csrf_protect
def admin_delete_lead(lid):
    db = get_db()
    db.execute("DELETE FROM enrollments WHERE id=?", (lid,))
    db.commit()
    return jsonify({"success": True})

@app.route("/admin/api/leads/bulk", methods=["POST"])
@login_required
@csrf_protect
def admin_bulk():
    data   = request.get_json(silent=True) or {}
    action = data.get("action", "")
    ids    = [int(i) for i in (data.get("ids") or []) if str(i).isdigit()]
    if not ids:
        return jsonify({"error": "No IDs provided"}), 400
    ph = ",".join("?" * len(ids))
    db = get_db()
    if action == "contacted":
        db.execute(f"UPDATE enrollments SET contacted_status='contacted' WHERE id IN ({ph})", ids)
        db.commit()
        return jsonify({"success": True, "updated": len(ids)})
    if action == "delete":
        db.execute(f"DELETE FROM enrollments WHERE id IN ({ph})", ids)
        db.commit()
        return jsonify({"success": True, "deleted": len(ids)})
    return jsonify({"error": "Unknown action"}), 400

# ── Admin API — export ────────────────────────────────────────────────────────

@app.route("/admin/api/export")
@login_required
def admin_export():
    db      = get_db()
    ids_raw = request.args.get("ids", "")
    if ids_raw:
        ids  = [int(i) for i in ids_raw.split(",") if i.strip().isdigit()]
        rows = db.execute(
            f"SELECT * FROM enrollments WHERE id IN ({','.join('?'*len(ids))}) ORDER BY submitted_at DESC", ids
        ).fetchall() if ids else []
    else:
        rows = db.execute("SELECT * FROM enrollments ORDER BY submitted_at DESC").fetchall()

    buf = StringIO()
    w   = csv.writer(buf)
    w.writerow(["ID","Name","Phone","Email","Aadhaar (masked)","Learner Licence","Course","Submitted At","Status"])
    for r in rows:
        w.writerow([r["id"], r["name"], r["phone"], r["email"], _mask(r["aadhaar"]),
                    r["learners_license"] or "", r["preferred_course"],
                    r["submitted_at"], r["contacted_status"]])

    resp = make_response(buf.getvalue())
    resp.headers["Content-Disposition"] = f'attachment; filename=adtc_leads_{datetime.utcnow().strftime("%Y%m%d_%H%M")}.csv'
    resp.headers["Content-Type"] = "text/csv"
    return resp

# ── Admin API — analytics ─────────────────────────────────────────────────────

@app.route("/admin/api/analytics/daily")
@login_required
def admin_analytics_daily():
    db    = get_db()
    since = (datetime.utcnow() - timedelta(days=30)).strftime("%Y-%m-%d")
    rows  = db.execute(
        "SELECT date(submitted_at) day,COUNT(*) c FROM enrollments WHERE date(submitted_at)>=? GROUP BY day ORDER BY day",
        (since,)
    ).fetchall()
    return jsonify([{"day": r["day"], "count": r["c"]} for r in rows])

@app.route("/admin/api/analytics/pages")
@login_required
def admin_analytics_pages():
    db   = get_db()
    rows = db.execute(
        "SELECT page,COUNT(*) v FROM page_views GROUP BY page ORDER BY v DESC LIMIT 10"
    ).fetchall()
    return jsonify([{"page": r["page"], "views": r["v"]} for r in rows])

# ── Admin API — settings ──────────────────────────────────────────────────────

@app.route("/admin/api/password", methods=["POST"])
@login_required
@csrf_protect
def admin_change_password():
    data    = request.get_json(silent=True) or {}
    current = data.get("current", "")
    new_p   = data.get("new", "")
    if len(new_p) < 8:
        return jsonify({"error": "Password must be at least 8 characters."}), 400
    db   = get_db()
    user = db.execute("SELECT * FROM users WHERE id=?", (session["user_id"],)).fetchone()
    if not user or not check_password_hash(user["password_hash"], current):
        return jsonify({"error": "Current password is incorrect."}), 400
    db.execute("UPDATE users SET password_hash=? WHERE id=?",
               (generate_password_hash(new_p), session["user_id"]))
    db.commit()
    return jsonify({"success": True})

@app.route("/admin/api/users")
@login_required
def admin_list_users():
    db   = get_db()
    rows = db.execute("SELECT id,username,display_name,email,created_at,last_login FROM users ORDER BY id").fetchall()
    return jsonify([dict(r) for r in rows])

@app.route("/admin/api/users", methods=["POST"])
@login_required
@csrf_protect
def admin_add_user():
    data     = request.get_json(silent=True) or {}
    username = (data.get("username") or "").strip().lower()
    password =  data.get("password") or ""
    display  =  data.get("display_name") or username
    email    = (data.get("email") or "").strip().lower()
    if not username or not password:
        return jsonify({"error": "Username and password are required."}), 400
    if len(password) < 8:
        return jsonify({"error": "Password must be at least 8 characters."}), 400
    try:
        db = get_db()
        db.execute(
            "INSERT INTO users (username,password_hash,display_name,email,created_at) VALUES (?,?,?,?,?)",
            (username, generate_password_hash(password), display, email,
             datetime.utcnow().isoformat(timespec="seconds"))
        )
        db.commit()
        return jsonify({"success": True})
    except sqlite3.IntegrityError:
        return jsonify({"error": "Username already exists."}), 400

@app.route("/admin/api/users/<int:uid>", methods=["DELETE"])
@login_required
@csrf_protect
def admin_delete_user(uid):
    if uid == session["user_id"]:
        return jsonify({"error": "Cannot delete your own account."}), 400
    db = get_db()
    db.execute("DELETE FROM users WHERE id=?", (uid,))
    db.commit()
    return jsonify({"success": True})

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.getenv("PORT", "5000")),
        debug=os.getenv("FLASK_DEBUG", "false").lower() == "true",
    )
