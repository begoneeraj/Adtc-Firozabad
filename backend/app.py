import os
import re
import sqlite3
import smtplib
from datetime import datetime
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, origins=os.getenv("ALLOWED_ORIGINS", "*"))

DB_PATH = os.getenv("DB_PATH", "enrollments.db")


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db()
    conn.execute("""
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
        )
    """)
    conn.commit()
    conn.close()


init_db()


def send_confirmation(to_email: str, name: str, phone: str, course: str) -> bool:
    smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_user = os.getenv("SMTP_USER", "")
    smtp_pass = os.getenv("SMTP_PASS", "")
    from_email = os.getenv("FROM_EMAIL", smtp_user)

    if not smtp_user or not smtp_pass:
        return False

    msg = MIMEMultipart("alternative")
    msg["Subject"] = "ADTC Firozabad - Registration Confirmation"
    msg["From"] = f"ADTC Firozabad <{from_email}>"
    msg["To"] = to_email

    body = f"""Dear {name},

Thank you for registering with ADTC Firozabad.

We have received your interest in the {course} course.

Our team will contact you at {phone} within 24 hours to confirm your slot and guide you on the next steps.

Please keep the following documents ready for Day 1:
  - Aadhaar Card (original + photocopy)
  - 4–6 passport-size photographs
  - Medical fitness certificate (Form 1A)
  - Date of birth proof

Centre Address : Wazirpur Jihalpur, Firozabad, Uttar Pradesh — 283 203
Phone          : +91 97605 14938
Email          : adtcfirozabadup@gmail.com
Centre Hours   : Monday – Saturday, 9:00 AM – 5:00 PM

Warm regards,
ADTC Firozabad Team
Accredited Driving Training Centre
Under CMVR 1989 | Govt. of Uttar Pradesh
"""

    msg.attach(MIMEText(body, "plain", "utf-8"))

    try:
        with smtplib.SMTP(smtp_host, smtp_port, timeout=10) as server:
            server.ehlo()
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.sendmail(from_email, to_email, msg.as_string())
        return True
    except Exception:
        return False


VALID_COURSES = {"Two-Wheeler", "Four-Wheeler", "Heavy Vehicle"}


def validate(data: dict) -> dict:
    errors = {}

    name = (data.get("name") or "").strip()
    if not name:
        errors["name"] = "Full name is required."

    phone = re.sub(r"\D", "", (data.get("phone") or ""))
    if not phone:
        errors["phone"] = "Phone number is required."
    elif not re.fullmatch(r"[6-9]\d{9}", phone):
        errors["phone"] = "Enter a valid 10-digit Indian mobile number."

    aadhaar = re.sub(r"\s", "", (data.get("aadhaar") or ""))
    if not aadhaar:
        errors["aadhaar"] = "Aadhaar number is required."
    elif not re.fullmatch(r"\d{12}", aadhaar):
        errors["aadhaar"] = "Aadhaar must be exactly 12 digits, numbers only."

    course = (data.get("preferred_course") or "").strip()
    if not course:
        errors["preferred_course"] = "Please select a course."
    elif course not in VALID_COURSES:
        errors["preferred_course"] = "Invalid course selection."

    email = (data.get("email") or "").strip().lower()
    if not email:
        errors["email"] = "Email address is required."
    elif not re.fullmatch(r"[^\s@]+@[^\s@]+\.[^\s@]+", email):
        errors["email"] = "Enter a valid email address."

    return errors


@app.route("/api/enroll", methods=["POST"])
def enroll():
    data = request.get_json(silent=True) or {}

    errors = validate(data)
    if errors:
        return jsonify({"success": False, "errors": errors}), 400

    name     = data["name"].strip()
    phone    = re.sub(r"\D", "", data["phone"])
    aadhaar  = re.sub(r"\s", "", data["aadhaar"])
    ll       = (data.get("learners_license") or "").strip()
    course   = data["preferred_course"].strip()
    email    = data["email"].strip().lower()
    now      = datetime.utcnow().isoformat(timespec="seconds")

    try:
        conn = get_db()
        conn.execute(
            """INSERT INTO enrollments
               (name, phone, aadhaar, learners_license, preferred_course, email, submitted_at, contacted_status)
               VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')""",
            (name, phone, aadhaar, ll, course, email, now),
        )
        conn.commit()
        conn.close()
    except Exception:
        return jsonify({"success": False, "errors": {"_": "Server error. Please try again or call us directly."}}), 500

    send_confirmation(email, name, phone, course)

    return jsonify({
        "success": True,
        "message": "Your information has been received. We will contact you soon."
    })


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    debug = os.getenv("FLASK_DEBUG", "false").lower() == "true"
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "5000")), debug=debug)
