/* ═══════════════════════════════════════════════════
   ADTC Firozabad — Shared Script
   Language toggle, nav, FAQ, back-to-top
   ═══════════════════════════════════════════════════ */

const T = {
  en: {
    'skip':        'Skip to Main Content',
    'govt-strip':  'Government of Uttar Pradesh | Ministry of Road Transport & Highways | Under CMVR 1989',
    'lang-btn':    'हिंदी',
    'screen':      'Screen Reader',
    'helpline':    'Helpline: 1800-XXX-XXXX',
    'centre-name': 'Accredited Driving Training Centre',
    'centre-sub':  'Firozabad, Uttar Pradesh · Govt. of U.P. · Under CMVR 1989',
    'acc-badge':   'ACCREDITED\nCENTRE ✓',
    'nav-home':    'Home',
    'nav-about':   'About ADTC',
    'nav-process': 'Process',
    'nav-infra':   'Infrastructure',
    'nav-form5b':  'Form 5B',
    'nav-faq':     'FAQ',
    'nav-contact': 'Contact Us',
    'nav-apply':   'Apply Now',
    'notice-label':'NOTICE:',
    'notice-text': 'ADTC Firozabad is now accepting enrollments for July 2026 batch. | Form 5B issued to all successful candidates — valid for direct licence without RTO driving test. | Candidates who complete training at ADTC are exempted from RTO driving test under CMVR Rule 15. | UP Transport Department approved ADTC under PPP model.',
    'f-brand':     'ADTC Firozabad',
    'f-h2':        'Quick Links',
    'f-h3':        'Government Links',
    'f-h4':        'Contact',
    'f-copy':      '© 2026 ADTC Firozabad — Government of Uttar Pradesh. All rights reserved.',
    'f-privacy':   'Privacy Policy',
    'f-terms':     'Terms of Use',
    'f-grievance': 'Grievance Redressal',
    'f-rti':       'RTI',
    // Index
    'hero-badge':  'Government Accredited · CMVR 1989 Certified · Firozabad, U.P.',
    'hero-h1a':    'Drive with ',
    'hero-h1b':    'Confidence.',
    'hero-h1c':    ' Get Licensed the ',
    'hero-h1d':    'Right Way.',
    'hero-p':      'ADTC Firozabad is an officially accredited driving training and testing facility under the Central Motor Vehicles Rules 1989. Train with certified instructors, get evaluated on a fully automated test track, and receive your Form 5B certificate — your direct path to a driving licence.',
    'hero-btn1':   'Enrol Now',
    'hero-btn2':   'Learn About ADTC',
    'stat1-l':     'Candidates Trained',
    'stat2-l':     'Official Certificate Issued',
    'stat3-l':     'Automated Fair Evaluation',
    'stat4-l':     'Govt. Approved & Monitored',
    // About
    'about-label': 'What is ADTC?',
    'about-h2':    'More Than a Driving School—A Government-Backed Authority',
    'about-p':     'An ADTC is not just a private driving school. It is an accredited training and testing institution operating under the authority of the Central Motor Vehicles Rules 1989, monitored by the UP Transport Department.',
  },
  hi: {
    'skip':        'मुख्य सामग्री पर जाएं',
    'govt-strip':  'उत्तर प्रदेश सरकार | सड़क परिवहन एवं राजमार्ग मंत्रालय | सीएमवीआर 1989 के अंतर्गत',
    'lang-btn':    'English',
    'screen':      'स्क्रीन रीडर',
    'helpline':    'हेल्पलाइन: 1800-XXX-XXXX',
    'centre-name': 'मान्यता प्राप्त ड्राइविंग प्रशिक्षण केंद्र',
    'centre-sub':  'फिरोजाबाद, उत्तर प्रदेश · उ.प्र. सरकार · सीएमवीआर 1989 के अंतर्गत',
    'acc-badge':   'मान्यता प्राप्त\nकेंद्र ✓',
    'nav-home':    'होम',
    'nav-about':   'एडीटीसी के बारे में',
    'nav-process': 'प्रक्रिया',
    'nav-infra':   'बुनियादी ढाँचा',
    'nav-form5b':  'फॉर्म 5बी',
    'nav-faq':     'सामान्य प्रश्न',
    'nav-contact': 'संपर्क करें',
    'nav-apply':   'अभी आवेदन करें',
    'notice-label':'सूचना:',
    'notice-text': 'एडीटीसी फिरोजाबाद जुलाई 2026 बैच के लिए नामांकन स्वीकार कर रहा है। | सफल उम्मीदवारों को फॉर्म 5बी जारी — आरटीओ टेस्ट के बिना सीधे लाइसेंस के लिए मान्य।',
    'f-brand':     'एडीटीसी फिरोजाबाद',
    'f-h2':        'त्वरित लिंक',
    'f-h3':        'सरकारी लिंक',
    'f-h4':        'संपर्क',
    'f-copy':      '© 2026 एडीटीसी फिरोजाबाद — उत्तर प्रदेश सरकार। सर्व अधिकार सुरक्षित।',
    'f-privacy':   'गोपनीयता नीति',
    'f-terms':     'उपयोग शर्तें',
    'f-grievance': 'शिकायत निवारण',
    'f-rti':       'आरटीआई',
    'hero-badge':  'सरकार द्वारा मान्यता प्राप्त · सीएमवीआर 1989 · फिरोजाबाद, उ.प्र.',
    'hero-h1a':    'आत्मविश्वास से ',
    'hero-h1b':    'गाड़ी चलाएं।',
    'hero-h1c':    ' सही तरीके से ',
    'hero-h1d':    'लाइसेंस पाएं।',
    'hero-p':      'एडीटीसी फिरोजाबाद सीएमवीआर 1989 के अंतर्गत एक आधिकारिक रूप से मान्यता प्राप्त ड्राइविंग प्रशिक्षण और परीक्षण सुविधा है। प्रमाणित प्रशिक्षकों के साथ प्रशिक्षण लें… और अपना फॉर्म 5बी प्रमाणपत्र प्राप्त करें।',
    'hero-btn1':   'अभी नामांकन करें',
    'hero-btn2':   'एडीटीसी के बारे में जानें',
    'stat1-l':     'प्रशिक्षित उम्मीदवार',
    'stat2-l':     'आधिकारिक प्रमाण पत्र जारी',
    'stat3-l':     'स्वचालित निष्पक्ष मूल्यांकन',
    'stat4-l':     'सरकार द्वारा अनुमोदित',
    'about-label': 'एडीटीसी क्या है?',
    'about-h2':    'केवल एक ड्राइविंग स्कूल नहीं—एक सरकारी मान्यता प्राप्त संस्था',
    'about-p':     'एडीटीसी केवल एक निजी ड्राइविंग स्कूल नहीं है। यह सीएमवीआर 1989 के अंतर्गत एक मान्यता प्राप्त प्रशिक्षण और परीक्षण संस्था है।',
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
  if (btn) btn.textContent = lang === 'hi' ? T.en['lang-btn'] === 'हिंदी' ? 'English' : T.en['lang-btn'] : T.hi['lang-btn'];
  if (btn) btn.textContent = lang === 'hi' ? 'English' : 'हिंदी';
}

document.addEventListener('DOMContentLoaded', () => {
  // Language
  applyLanguage(getLang());
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      applyLanguage(getLang() === 'en' ? 'hi' : 'en');
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

// Form submit helper (used on contact/enroll pages)
function handleEnquiry(e) {
  e.preventDefault();
  const name = document.getElementById('fname')?.value.trim();
  const phone = document.getElementById('phone')?.value.trim();
  if (!name || !phone) {
    alert(getLang() === 'hi'
      ? 'कृपया अपना नाम और मोबाइल नंबर भरें।'
      : 'Please enter your name and mobile number before submitting.');
    return;
  }
  alert(getLang() === 'hi'
    ? `धन्यवाद, ${name}! आपकी जानकारी प्राप्त हो गई है। हम 1 कार्य दिवस में ${phone} पर संपर्क करेंगे।`
    : `Thank you, ${name}! Your enquiry has been received. Our team will contact you at ${phone} within 1 working day.`);
  e.target.reset();
}
