# ADTC Firozabad — Official Website

> **Client:** Accredited Driving Training Centre, Firozabad, Uttar Pradesh  
> **Project type:** Official institutional website — commissioned  
> **Status:** Live / Production-ready  

---

## About the Client

**ADTC Firozabad** is an Accredited Driving Training Centre (ADTC) and Automated Driving Test Track (ADTT) operating under the **Central Motor Vehicles Rules 1989 (Rules 31B–31J)**, fully accredited by the **Government of Uttar Pradesh** under a Public-Private Partnership (PPP) model.

The centre is owned and operated by **Kisaan Eicher Tractors, Shikohabad**, located at:

> Wazirpur Jihalpur, Firozabad, Uttar Pradesh — 283 203  
> **Phone:** +91 97605 14938 | **Hours:** Mon–Sat, 9 AM – 5 PM

ADTC Firozabad is authorized to issue **Form 5B** certificates under CMVR Rule 15, which exempts holders from the standard RTO driving test — making it one of the most significant driving training institutions in the region.

---

## Project Scope

This website was designed and developed as the official digital presence for ADTC Firozabad. The deliverables included:

- Full multi-page static website (13 pages)
- Bilingual support (English / Hindi) with localStorage persistence
- Fully responsive layout — mobile, tablet, and desktop
- Accessibility compliance — WCAG keyboard navigation, skip links, ARIA labels
- Integrated government compliance pages (Privacy Policy, Terms, RTI, Grievance Redressal)
- Photo gallery with lightbox for facility and inauguration coverage
- Google Maps embed via Plus Code
- Government links integration (Parivahan, Sarathi, MoRTH, UP Transport)
- SEO-ready semantic HTML structure
- Zero dependencies — no frameworks, no build tools, no CDN (except Google Fonts)

---

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Home — hero, stats, offerings, process overview, inauguration preview, photo gallery |
| `about.html` | About ADTC — legal framework, authority, PPP model, comparison vs regular driving schools |
| `process.html` | Enrolment process — 6-step flow, documents required, batch schedule |
| `form5b.html` | Form 5B certificate — what it is, legal basis, how to obtain and submit |
| `infrastructure.html` | Facility & technology — RFID, cameras, simulators, track layout diagram |
| `faq.html` | FAQs — categorised accordion (About ADTC / Form 5B / Training & Evaluation) |
| `contact.html` | Contact — address, Google Maps embed, quick enquiry form |
| `enroll.html` | Full enrolment application form with document checklist |
| `inauguration.html` | Inauguration gallery — 13 photos with lightbox |
| `privacy.html` | Privacy Policy — CMVR statutory obligations, IT Act 2000 |
| `terms.html` | Terms of Use — governing law: Firozabad courts |
| `grievance.html` | 3-tier Grievance Redressal (ADTC → UP Jansunwai → CPGRAMS/MoRTH) |
| `rti.html` | RTI page — RTI Act 2005, PIO details, fee structure, First & Second Appeal |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | Semantic HTML5 |
| Styling | Vanilla CSS3 with custom properties (design tokens) |
| Scripting | Vanilla JavaScript (ES6+) |
| Fonts | Google Fonts — Inter (UI) + Noto Sans Devanagari (Hindi) |
| Icons | Inline SVG — no icon library |
| Maps | Google Maps iframe (Plus Code: 4FV5+6HQ) |
| Hosting | Static — any web server or GitHub Pages compatible |

**No frameworks. No build tools. No runtime dependencies.**

---

## Key Features

- **Hindi / English toggle** — language switch stored in `localStorage`, applied via `data-key` attributes
- **Photo lightbox** — keyboard navigable (← → Esc), touch-friendly, pure JS
- **FAQ accordion** — one section open at a time, animated
- **Scrolling notice bar** — CSS `@keyframes` animation, no `<marquee>`
- **Active nav highlighting** — JS matches current filename to href on load
- **Back-to-top button** — appears on scroll, smooth scroll
- **Form validation** — client-side, accessible error states
- **Responsive navigation** — hamburger menu for mobile

---

## Government Compliance

This website meets the institutional requirements for a government-accredited centre:

- Privacy Policy aligned with **IT Act 2000** and CMVR statutory obligations
- RTI page compliant with **RTI Act 2005** (PIO, First Appeal, Second Appeal to CIC/UPSIC)
- 3-tier Grievance Redressal per **Ministry of Road Transport & Highways** guidelines
- All government portal links verified: Parivahan, Sarathi, MoRTH, UP Transport, RTI Online, CPGRAMS

---

## Project Structure

```
Adtc-Firozabad/
├── index.html
├── about.html
├── process.html
├── form5b.html
├── infrastructure.html
├── faq.html
├── contact.html
├── enroll.html
├── inauguration.html
├── privacy.html
├── terms.html
├── grievance.html
├── rti.html
├── styles.css          ← Entire shared design system
├── script.js           ← Shared JS (lang toggle, nav, FAQ, lightbox, back-to-top)
├── logo/               ← ADTC Firozabad logo assets
├── adtc pics/          ← 9 facility photographs
└── inaugration/        ← 13 inauguration ceremony photographs
```

---

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--navy` | `#0d2b5e` | Primary dark navy — headers, text |
| `--blue` | `#1a4da2` | Medium blue |
| `--sky` | `#2d6ecb` | Links, accent |
| `--saffron` | `#f47920` | CTA buttons, highlights |
| `--orange` | `#e05a00` | Hover states |
| `--green` | `#138808` | Success, India flag green |

Layout classes: `.section`, `.section-alt`, `.section-navy`, `.grid-2`, `.grid-3`, `.grid-4`, `.grid-auto`

---

## Developer

Designed and developed by **[Pushpraj Singh](https://github.com/begoneeraj)**  
Commissioned by ADTC Firozabad / Kisaan Eicher Tractors, Shikohabad

---

*Road Safety Helpline: 1033 (Government of India)*
