/* ═══════════════════════════════════════════════════
   ADTC Firozabad — Shared Script
   Language toggle, dark mode, nav, FAQ, back-to-top
   ═══════════════════════════════════════════════════ */

const T = {
  en: {
    /* ── Common UI ── */
    'skip':        'Skip to Main Content',
    'govt-strip':  'Government of Uttar Pradesh | Ministry of Road Transport & Highways | Under CMVR 1989',
    'lang-btn':    'हिंदी',
    'screen':      'Screen Reader',
    'helpline':    'Helpline: 1033 (Road Safety)',
    'centre-name': 'Accredited Driving Training Centre',
    'centre-sub':  'Firozabad, Uttar Pradesh · Govt. of U.P. · Under CMVR 1989',
    'acc-badge':   'ACCREDITED\nCENTRE ✓',
    /* ── Nav ── */
    'nav-home':    'Home',
    'nav-about':   'About ADTC',
    'nav-process': 'Process',
    'nav-infra':   'Infrastructure',
    'nav-form5b':  'Form 5B',
    'nav-faq':     'FAQ',
    'nav-contact': 'Contact Us',
    'nav-apply':   'Apply Now',
    /* ── Notice ── */
    'notice-label':'NOTICE:',
    'notice-text': 'ADTC Firozabad is now accepting enrollments for July 2026 batch. | Form 5B issued to all successful candidates — valid for direct licence without RTO driving test. | Candidates who complete training at ADTC are exempted from RTO driving test under CMVR Rule 15. | UP Transport Department approved ADTC under PPP model.',
    /* ── Footer ── */
    'f-brand':     'ADTC Firozabad',
    'f-h2':        'Quick Links',
    'f-h3':        'Government Links',
    'f-h4':        'Contact',
    'f-copy':      '© 2026 ADTC Firozabad — Government of Uttar Pradesh. All rights reserved.',
    'f-privacy':   'Privacy Policy',
    'f-terms':     'Terms of Use',
    'f-grievance': 'Grievance Redressal',
    'f-rti':       'RTI',
    /* ── Index page ── */
    'hero-badge':  'Government Accredited · CMVR 1989 Certified · Firozabad, U.P.',
    'hero-h1a':    'Drive with ',
    'hero-h1b':    'Confidence.',
    'hero-h1c':    'Get Licensed the ',
    'hero-h1d':    'Right Way.',
    'hero-p':      'ADTC Firozabad is an officially accredited driving training and testing facility under the Central Motor Vehicles Rules 1989. Train with certified instructors, get evaluated on a fully automated test track, and receive your Form 5B certificate — your direct path to a driving licence.',
    'hero-btn1':   'Enrol Now',
    'hero-btn2':   'Learn About ADTC',
    'stat1-l':     'Candidates Trained',
    'stat2-l':     'Official Certificate Issued',
    'stat3-l':     'Automated Fair Evaluation',
    'stat4-l':     'Govt. Approved & Monitored',
    /* ── About page ── */
    'about-label': 'What is ADTC?',
    'about-h2':    'More Than a Driving School — A Government-Backed Authority',
    'about-p':     'An ADTC is not just a private driving school. It is an accredited training and testing institution operating under the authority of the Central Motor Vehicles Rules 1989, monitored by the UP Transport Department.',
    'about-h-vision': 'Our Vision',
    'about-h-mission': 'Our Mission',
    'about-h-auth': 'Legal Authority & Accreditation',
    /* ── Process page ── */
    'process-label':  'How It Works',
    'process-title':  'From Enrolment to Licence — 6 Clear Steps',
    'process-desc':   'ADTC replaces the uncertainty of the conventional RTO test with a standardized, technology-driven evaluation that is transparent, fair, and government-monitored.',
    'step1-h': 'Enrolment & Registration',
    'step2-h': 'Document Verification',
    'step3-h': 'Theory Training',
    'step4-h': 'Practical Driving Sessions',
    'step5-h': 'Automated Track Evaluation',
    'step6-h': 'Form 5B Certificate',
    /* ── Infrastructure page ── */
    'infra-label':  'Our Facility',
    'infra-title':  'World-Class Infrastructure at ADTC Firozabad',
    'infra-desc':   'Equipped with the latest technology mandated under CMVR 1989 for accredited driving training centres.',
    /* ── Form 5B page ── */
    'form5b-label': 'The Certificate',
    'form5b-title': 'What is Form 5B?',
    'form5b-desc':  'Form 5B is the official certificate issued by an Accredited Driving Training Centre under CMVR Rule 10(3). Holding Form 5B entitles you to apply for a driving licence without appearing for the RTO driving test.',
    /* ── FAQ page ── */
    'faq-label': 'Help & Support',
    'faq-title': 'Frequently Asked Questions',
    'faq-desc':  'Find answers to the most common questions about ADTC Firozabad, the enrolment process, Form 5B, and your driving licence.',
    /* ── Contact page ── */
    'contact-label': 'Get in Touch',
    'contact-title': 'Contact ADTC Firozabad',
    'contact-desc':  'We are here to help. Reach us by phone, email, or visit us in person during working hours.',
    'contact-form-h': 'Send an Enquiry',
    'contact-name':   'Full Name',
    'contact-phone':  'Mobile Number',
    'contact-msg':    'Your Message',
    'contact-submit': 'Send Enquiry',
    /* ── Enroll page ── */
    'enroll-label': 'Join ADTC',
    'enroll-title': 'Apply for Enrolment',
    'enroll-desc':  'Fill in the form below to apply for the next available batch. Our team will contact you within 1 working day to confirm your slot.',
    'enroll-submit': 'Submit Application',
    /* ── Inauguration page ── */
    'inaug-label': 'Official Inauguration',
    'inaug-title': 'A Proud Milestone for Firozabad',
    /* ── Dark mode ── */
    'dark-label': 'Dark',
    'light-label': 'Light',
  },
  hi: {
    /* ── Common UI ── */
    'skip':        'मुख्य सामग्री पर जाएं',
    'govt-strip':  'उत्तर प्रदेश सरकार | सड़क परिवहन एवं राजमार्ग मंत्रालय | सीएमवीआर 1989 के अंतर्गत',
    'lang-btn':    'English',
    'screen':      'स्क्रीन रीडर',
    'helpline':    'हेल्पलाइन: 1033 (सड़क सुरक्षा)',
    'centre-name': 'मान्यता प्राप्त ड्राइविंग प्रशिक्षण केंद्र',
    'centre-sub':  'फिरोजाबाद, उत्तर प्रदेश · उ.प्र. सरकार · सीएमवीआर 1989 के अंतर्गत',
    'acc-badge':   'मान्यता प्राप्त\nकेंद्र ✓',
    /* ── Nav ── */
    'nav-home':    'होम',
    'nav-about':   'एडीटीसी के बारे में',
    'nav-process': 'प्रक्रिया',
    'nav-infra':   'बुनियादी ढाँचा',
    'nav-form5b':  'फॉर्म 5बी',
    'nav-faq':     'सामान्य प्रश्न',
    'nav-contact': 'संपर्क करें',
    'nav-apply':   'अभी आवेदन करें',
    /* ── Notice ── */
    'notice-label':'सूचना:',
    'notice-text': 'एडीटीसी फिरोजाबाद जुलाई 2026 बैच के लिए नामांकन स्वीकार कर रहा है। | सफल उम्मीदवारों को फॉर्म 5बी जारी — आरटीओ ड्राइविंग टेस्ट के बिना सीधे लाइसेंस के लिए मान्य। | सीएमवीआर नियम 15 के अंतर्गत एडीटीसी में प्रशिक्षण पूर्ण करने वाले उम्मीदवार आरटीओ ड्राइविंग टेस्ट से छूट प्राप्त करते हैं।',
    /* ── Footer ── */
    'f-brand':     'एडीटीसी फिरोजाबाद',
    'f-h2':        'त्वरित लिंक',
    'f-h3':        'सरकारी लिंक',
    'f-h4':        'संपर्क',
    'f-copy':      '© 2026 एडीटीसी फिरोजाबाद — उत्तर प्रदेश सरकार। सर्व अधिकार सुरक्षित।',
    'f-privacy':   'गोपनीयता नीति',
    'f-terms':     'उपयोग शर्तें',
    'f-grievance': 'शिकायत निवारण',
    'f-rti':       'आरटीआई',
    /* ── Index page ── */
    'hero-badge':  'सरकार द्वारा मान्यता प्राप्त · सीएमवीआर 1989 · फिरोजाबाद, उ.प्र.',
    'hero-h1a':    'आत्मविश्वास से ',
    'hero-h1b':    'गाड़ी चलाएं।',
    'hero-h1c':    'सही तरीके से ',
    'hero-h1d':    'लाइसेंस पाएं।',
    'hero-p':      'एडीटीसी फिरोजाबाद सीएमवीआर 1989 के अंतर्गत एक आधिकारिक रूप से मान्यता प्राप्त ड्राइविंग प्रशिक्षण और परीक्षण सुविधा है। प्रमाणित प्रशिक्षकों के साथ प्रशिक्षण लें, स्वचालित ट्रैक पर मूल्यांकन करवाएं और अपना फॉर्म 5बी प्रमाणपत्र प्राप्त करें।',
    'hero-btn1':   'अभी नामांकन करें',
    'hero-btn2':   'एडीटीसी के बारे में जानें',
    'stat1-l':     'प्रशिक्षित उम्मीदवार',
    'stat2-l':     'आधिकारिक प्रमाण पत्र जारी',
    'stat3-l':     'स्वचालित निष्पक्ष मूल्यांकन',
    'stat4-l':     'सरकार द्वारा अनुमोदित',
    /* ── About page ── */
    'about-label': 'एडीटीसी क्या है?',
    'about-h2':    'केवल एक ड्राइविंग स्कूल नहीं — एक सरकारी मान्यता प्राप्त संस्था',
    'about-p':     'एडीटीसी केवल एक निजी ड्राइविंग स्कूल नहीं है। यह सीएमवीआर 1989 के अंतर्गत एक मान्यता प्राप्त प्रशिक्षण और परीक्षण संस्था है, जिसकी निगरानी यूपी परिवहन विभाग द्वारा की जाती है।',
    'about-h-vision': 'हमारी दृष्टि',
    'about-h-mission': 'हमारा मिशन',
    'about-h-auth': 'कानूनी प्राधिकरण एवं मान्यता',
    /* ── Process page ── */
    'process-label':  'प्रक्रिया',
    'process-title':  'नामांकन से लाइसेंस तक — 6 स्पष्ट चरण',
    'process-desc':   'एडीटीसी पारंपरिक आरटीओ परीक्षा की अनिश्चितता को एक मानकीकृत, प्रौद्योगिकी-आधारित मूल्यांकन से प्रतिस्थापित करता है।',
    'step1-h': 'नामांकन एवं पंजीकरण',
    'step2-h': 'दस्तावेज़ सत्यापन',
    'step3-h': 'सैद्धांतिक प्रशिक्षण',
    'step4-h': 'व्यावहारिक ड्राइविंग सत्र',
    'step5-h': 'स्वचालित ट्रैक मूल्यांकन',
    'step6-h': 'फॉर्म 5बी प्रमाणपत्र',
    /* ── Infrastructure page ── */
    'infra-label':  'हमारी सुविधा',
    'infra-title':  'एडीटीसी फिरोजाबाद में विश्वस्तरीय बुनियादी ढाँचा',
    'infra-desc':   'सीएमवीआर 1989 के अंतर्गत मान्यता प्राप्त ड्राइविंग प्रशिक्षण केंद्रों के लिए निर्धारित नवीनतम तकनीक से सुसज्जित।',
    /* ── Form 5B page ── */
    'form5b-label': 'प्रमाणपत्र',
    'form5b-title': 'फॉर्म 5बी क्या है?',
    'form5b-desc':  'फॉर्म 5बी सीएमवीआर नियम 10(3) के अंतर्गत एक मान्यता प्राप्त ड्राइविंग प्रशिक्षण केंद्र द्वारा जारी आधिकारिक प्रमाणपत्र है। फॉर्म 5बी धारक आरटीओ ड्राइविंग टेस्ट के बिना ड्राइविंग लाइसेंस के लिए आवेदन कर सकते हैं।',
    /* ── FAQ page ── */
    'faq-label': 'सहायता एवं समर्थन',
    'faq-title': 'अक्सर पूछे जाने वाले प्रश्न',
    'faq-desc':  'एडीटीसी फिरोजाबाद, नामांकन प्रक्रिया, फॉर्म 5बी और ड्राइविंग लाइसेंस से संबंधित सामान्य प्रश्नों के उत्तर यहाँ पाएं।',
    /* ── Contact page ── */
    'contact-label': 'संपर्क करें',
    'contact-title': 'एडीटीसी फिरोजाबाद से संपर्क करें',
    'contact-desc':  'हम सहायता के लिए यहाँ हैं। कार्य दिवसों में फोन, ईमेल या व्यक्तिगत रूप से हमसे मिलें।',
    'contact-form-h': 'पूछताछ भेजें',
    'contact-name':   'पूरा नाम',
    'contact-phone':  'मोबाइल नंबर',
    'contact-msg':    'आपका संदेश',
    'contact-submit': 'पूछताछ भेजें',
    /* ── Enroll page ── */
    'enroll-label': 'एडीटीसी से जुड़ें',
    'enroll-title': 'नामांकन के लिए आवेदन करें',
    'enroll-desc':  'अगले उपलब्ध बैच के लिए आवेदन करने हेतु नीचे दिया गया फॉर्म भरें। हमारी टीम 1 कार्य दिवस में आपका स्लॉट पुष्टि करने हेतु संपर्क करेगी।',
    'enroll-submit': 'आवेदन जमा करें',
    /* ── Inauguration page ── */
    'inaug-label': 'आधिकारिक उद्घाटन',
    'inaug-title': 'फिरोजाबाद के लिए एक गर्व का क्षण',
    /* ── Dark mode ── */
    'dark-label': 'डार्क',
    'light-label': 'लाइट',
  }
};

function getLang() { return localStorage.getItem('adtc-lang') || 'en'; }

function applyLanguage(lang) {
  localStorage.setItem('adtc-lang', lang);
  document.documentElement.lang = lang === 'hi' ? 'hi' : 'en';
  const dict = T[lang];
  document.querySelectorAll('[data-key]').forEach(el => {
    const key = el.dataset.key;
    if (dict[key] !== undefined) {
      if (el.tagName === 'INPUT' && el.type !== 'submit') {
        el.placeholder = dict[key];
      } else {
        el.textContent = dict[key];
      }
    }
  });
  const btn = document.getElementById('lang-toggle');
  if (btn) btn.textContent = lang === 'hi' ? 'English' : 'हिंदी';

  // Update dark mode label text to current language
  const darkLabel = document.getElementById('dark-label');
  if (darkLabel) {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    darkLabel.textContent = isDark
      ? (lang === 'hi' ? T.hi['light-label'] : T.en['light-label'])
      : (lang === 'hi' ? T.hi['dark-label']  : T.en['dark-label']);
  }
}

/* ── DARK MODE ── */
function getTheme() { return localStorage.getItem('adtc-theme') || 'light'; }

function applyTheme(theme) {
  localStorage.setItem('adtc-theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
  const darkLabel = document.getElementById('dark-label');
  const darkBtn   = document.getElementById('dark-toggle');
  const lang = getLang();
  if (darkLabel) {
    darkLabel.textContent = theme === 'dark'
      ? (lang === 'hi' ? T.hi['light-label'] : T.en['light-label'])
      : (lang === 'hi' ? T.hi['dark-label']  : T.en['dark-label']);
  }
  if (darkBtn) {
    // Swap icon: moon for light mode, sun for dark mode
    const svg = darkBtn.querySelector('svg');
    if (svg) {
      svg.innerHTML = theme === 'dark'
        ? '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>'
        : '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Apply saved language
  applyLanguage(getLang());

  // Apply saved theme
  applyTheme(getTheme());

  // Language toggle
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      applyLanguage(getLang() === 'en' ? 'hi' : 'en');
    });
  }

  // Dark mode toggle
  const darkBtn = document.getElementById('dark-toggle');
  if (darkBtn) {
    darkBtn.addEventListener('click', () => {
      applyTheme(getTheme() === 'light' ? 'dark' : 'light');
    });
  }

  // Hamburger nav
  const ham = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (ham && navLinks) {
    ham.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
  }

  // Active nav link — match href to current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // Back-to-top
  const bt = document.getElementById('backTop');
  if (bt) {
    window.addEventListener('scroll', () => {
      bt.style.display = window.scrollY > 500 ? 'flex' : 'none';
    });
    bt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
});

// Contact page enquiry form — posts to Netlify Forms
function handleEnquiry(e) {
  e.preventDefault();
  const form = e.target;
  const name = document.getElementById('fname')?.value.trim();
  const phone = document.getElementById('phone')?.value.trim();
  if (!name || !phone) {
    alert(getLang() === 'hi'
      ? 'कृपया अपना नाम और मोबाइल नंबर भरें।'
      : 'Please enter your name and mobile number before submitting.');
    return;
  }

  const data = new FormData(form);
  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(data).toString(),
  })
    .then(() => {
      alert(getLang() === 'hi'
        ? `धन्यवाद, ${name}! आपकी जानकारी प्राप्त हो गई है। हम 1 कार्य दिवस में ${phone} पर संपर्क करेंगे।`
        : `Thank you, ${name}! Your enquiry has been received. Our team will contact you at ${phone} within 1 working day.`);
      form.reset();
    })
    .catch(() => {
      alert(getLang() === 'hi'
        ? 'क्षमा करें, सबमिट करने में समस्या हुई। कृपया पुनः प्रयास करें।'
        : 'Sorry, something went wrong submitting the form. Please try again.');
    });
}

/* ── Page-view tracking — sends current page name to Flask backend ── */
(function () {
  const BACKEND = document.getElementById('enrollForm')?.dataset.api || 'http://localhost:5000';
  const page = document.title.replace(' — ADTC Firozabad', '').replace(' | ADTC Firozabad', '').trim()
             || window.location.pathname.split('/').pop().replace('.html','') || 'home';
  fetch(BACKEND + '/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ page }),
    keepalive: true,
  }).catch(() => {});
}());

/* ── ENROLMENT FORM (enroll.html) — posts to Flask API ── */
(function () {
  const form = document.getElementById('enrollForm');
  if (!form) return;

  const API_BASE = form.dataset.api || 'http://localhost:5000';

  function setError(id, msg) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = msg;
  }

  function clearErrors() {
    ['err-name','err-phone','err-aadhaar','err-course','err-email'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = '';
    });
    form.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
  }

  function markInvalid(inputId, errId, msg) {
    const input = document.getElementById(inputId);
    if (input) input.classList.add('invalid');
    setError(errId, msg);
  }

  function validateClient() {
    let valid = true;

    const name = document.getElementById('enroll-name').value.trim();
    if (!name) { markInvalid('enroll-name', 'err-name', 'Full name is required.'); valid = false; }

    const rawPhone = document.getElementById('enroll-phone').value.replace(/\D/g, '');
    if (!rawPhone) {
      markInvalid('enroll-phone', 'err-phone', 'Phone number is required.'); valid = false;
    } else if (!/^[6-9]\d{9}$/.test(rawPhone)) {
      markInvalid('enroll-phone', 'err-phone', 'Enter a valid 10-digit Indian mobile number.'); valid = false;
    }

    const aadhaar = document.getElementById('enroll-aadhaar').value.replace(/\s/g, '');
    if (!aadhaar) {
      markInvalid('enroll-aadhaar', 'err-aadhaar', 'Aadhaar number is required.'); valid = false;
    } else if (!/^\d{12}$/.test(aadhaar)) {
      markInvalid('enroll-aadhaar', 'err-aadhaar', 'Aadhaar must be exactly 12 digits, numbers only.'); valid = false;
    }

    const course = document.getElementById('enroll-course').value;
    if (!course) { markInvalid('enroll-course', 'err-course', 'Please select a course.'); valid = false; }

    const email = document.getElementById('enroll-email').value.trim();
    if (!email) {
      markInvalid('enroll-email', 'err-email', 'Email address is required.'); valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      markInvalid('enroll-email', 'err-email', 'Enter a valid email address.'); valid = false;
    }

    return valid;
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    clearErrors();
    if (!validateClient()) return;

    const btn = document.getElementById('enrollBtn');
    btn.disabled = true;
    btn.textContent = 'Submitting…';

    const payload = {
      name:             document.getElementById('enroll-name').value.trim(),
      phone:            document.getElementById('enroll-phone').value.replace(/\D/g, ''),
      aadhaar:          document.getElementById('enroll-aadhaar').value.replace(/\s/g, ''),
      learners_license: document.getElementById('enroll-ll').value.trim(),
      preferred_course: document.getElementById('enroll-course').value,
      email:            document.getElementById('enroll-email').value.trim(),
    };

    try {
      const res  = await fetch(API_BASE + '/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        document.getElementById('enrollFormWrap').innerHTML = `
          <div class="form-success">
            <div class="success-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" width="26" height="26" aria-hidden="true"><polyline points="20,6 9,17 4,12"/></svg>
            </div>
            <h3>Registration Received!</h3>
            <p>Your information has been received. We will contact you soon.</p>
            <p style="margin-top:8px;font-size:.78rem;">A confirmation has been sent to <strong>${payload.email}</strong><br>Our team will call you at <strong>+91 ${payload.phone}</strong> within 24 hours.</p>
          </div>`;
      } else {
        const fieldMap = {
          name: ['enroll-name','err-name'],
          phone: ['enroll-phone','err-phone'],
          aadhaar: ['enroll-aadhaar','err-aadhaar'],
          preferred_course: ['enroll-course','err-course'],
          email: ['enroll-email','err-email'],
        };
        if (data.errors) {
          Object.entries(data.errors).forEach(([field, msg]) => {
            if (fieldMap[field]) markInvalid(...fieldMap[field], msg);
          });
        }
        btn.disabled = false;
        btn.textContent = 'Submit Registration';
      }
    } catch (_) {
      setError('err-name',
        'Could not connect to the server. Please try again or call us at +91 97605 14938.');
      btn.disabled = false;
      btn.textContent = 'Submit Registration';
    }
  });
}());
