/* =============================================
   Ahlan-Trips — ENTERPRISE JS
   ============================================= */

'use strict';

/* ----- STICKY HEADER SHADOW ----- */
const header = document.getElementById('site-header');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
};
window.addEventListener('scroll', onScroll, { passive: true });

/* ----- AUTOCOMPLETE DATA ----- */
const cities = [
  { name: 'Dubai', code: 'DXB', country: 'UAE' },
  { name: 'London', code: 'LHR', country: 'UK' },
  { name: 'New York', code: 'JFK', country: 'USA' },
  { name: 'Paris', code: 'CDG', country: 'France' },
  { name: 'Bali', code: 'DPS', country: 'Indonesia' },
  { name: 'Tunisia', code: 'TUN', country: 'Tunis' },
  { name: 'Singapore', code: 'SIN', country: 'Singapore' },
  { name: 'Tokyo', code: 'HND', country: 'Japan' },
  { name: 'Sydney', code: 'SYD', country: 'Australia' },
  { name: 'Mumbai', code: 'BOM', country: 'India' },
  { name: 'Delhi', code: 'DEL', country: 'India' },
  { name: 'Bangkok', code: 'BKK', country: 'Thailand' },
  { name: 'Istanbul', code: 'IST', country: 'Turkey' },
  { name: 'Amsterdam', code: 'AMS', country: 'Netherlands' },
  { name: 'Rome', code: 'FCO', country: 'Italy' },
  { name: 'Barcelona', code: 'BCN', country: 'Spain' },
  { name: 'Cairo', code: 'CAI', country: 'Egypt' },
  { name: 'Cape Town', code: 'CPT', country: 'South Africa' },
  { name: 'San Francisco', code: 'SFO', country: 'USA' },
  { name: 'Male', code: 'MLE', country: 'Maldives' },
  { name: 'Seoul', code: 'ICN', country: 'South Korea' }
];

function initAutocomplete(inputId, resultsId) {
  const input = document.getElementById(inputId);
  const resultsEl = document.getElementById(resultsId);

  if (!input || !resultsEl) return;

  input.addEventListener('input', () => {
    const val = input.value.trim().toLowerCase();
    resultsEl.innerHTML = '';
    
    if (val.length < 1) {
      resultsEl.classList.remove('active');
      return;
    }

    const matches = cities.filter(c => 
      c.name.toLowerCase().includes(val) || 
      c.code.toLowerCase().includes(val) ||
      c.country.toLowerCase().includes(val)
    ).slice(0, 8);

    if (matches.length > 0) {
      matches.forEach(match => {
        const div = document.createElement('div');
        div.className = 'autocomplete-item';
        div.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <div>
            <strong>${match.name} (${match.code})</strong><br/>
            <small style="color: var(--text-muted)">${match.country}</small>
          </div>
        `;
        div.addEventListener('click', () => {
          input.value = `${match.name} (${match.code})`;
          resultsEl.classList.remove('active');
        });
        resultsEl.appendChild(div);
      });
      resultsEl.classList.add('active');
    } else {
      resultsEl.classList.remove('active');
    }
  });

  // Close results when clicking outside
  document.addEventListener('click', (e) => {
    if (!resultsEl.contains(e.target) && e.target !== input) {
      resultsEl.classList.remove('active');
    }
  });
}

initAutocomplete('s-from', 's-from-results');
initAutocomplete('s-to', 's-to-results');

/* ----- MOBILE NAV TOGGLE ----- */
const navToggle = document.getElementById('nav-toggle');
const navList   = document.getElementById('nav-list');
navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navList.classList.toggle('open');
});
let isClickScrolling = false;
let clickScrollTimeout;

navList.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    // Immediate active state on click
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    // Prevent scroll observer from overriding this for a moment
    isClickScrolling = true;
    clearTimeout(clickScrollTimeout);
    clickScrollTimeout = setTimeout(() => {
      isClickScrolling = false;
    }, 1000); // Wait for scroll animation to mostly finish

    navList.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ----- ACTIVE NAV LINK ON SCROLL ----- */
const sections = document.querySelectorAll('section[id], main[id]');
const navLinks  = document.querySelectorAll('.nav-link');
const activateLink = () => {
  if (isClickScrolling) return; // Don't override manual click state

  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 140) { // Adjusted offset
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
};
window.addEventListener('scroll', activateLink, { passive: true });

/* ----- SEARCH TABS ----- */
const searchTabs  = document.querySelectorAll('.search-tab');
const returnField = document.getElementById('s-return');
if (returnField) {
  searchTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      searchTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const isReturn = tab.id === 'tab-return';
      returnField.closest('.search-field').style.opacity = isReturn ? '1' : '0.4';
      returnField.disabled = !isReturn;
    });
  });
}

/* ----- SEARCH FLIGHTS BTN (WhatsApp Redirect) ----- */
const searchBtn = document.getElementById('search-flights-btn');
if (searchBtn) {
  searchBtn.addEventListener('click', () => {
    const from = document.getElementById('s-from').value.trim();
    const to   = document.getElementById('s-to').value.trim();
    const depart = document.getElementById('s-depart').value;
    const ret    = document.getElementById('s-return').value;
    
    // Get active trip type
    const activeTab = document.querySelector('.search-tab.active');
    const tripType = activeTab ? activeTab.textContent.trim() : 'Flight Enquiry';

    if (!from || !to || !depart) { 
      if (!from) document.getElementById('s-from').focus();
      else if (!to) document.getElementById('s-to').focus();
      else document.getElementById('s-depart').focus();
      return; 
    }

    const whatsappNumber = "917425995556";
    let message = `Hello Ahlan-Trips Team,\n\nI'd like to book a flight:\n`;
    message += `🛫 Trip Type: ${tripType}\n`;
    message += `📍 From: ${from}\n`;
    message += `📍 To: ${to}\n`;
    message += `📅 Departure: ${depart}`;
    
    if (ret && !document.getElementById('s-return').disabled) {
      message += `\n📅 Return: ${ret}`;
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  });
}

/* ----- SCROLL FADE-UP ANIMATION ----- */
const fadeElements = document.querySelectorAll('.fade-up');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
fadeElements.forEach(el => fadeObserver.observe(el));

/* =============================================
   COUNT-UP ANIMATION (Running Meter Effect)
   ============================================= */
function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

function animateCountUp(el) {
  const target  = parseInt(el.getAttribute('data-count'), 10);
  const suffix  = el.getAttribute('data-suffix') || '';
  const duration = target >= 1000 ? 2200 : 1600; // longer for bigger numbers
  const start    = performance.now();

  function step(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = easeOutQuart(progress);
    const current  = Math.floor(eased * target);

    el.textContent = current.toLocaleString() + suffix;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target.toLocaleString() + suffix; // ensure exact final value
    }
  }

  requestAnimationFrame(step);
}

/* Observe the entire trust section — fire all counters at once when visible */
const trustSection = document.querySelector('.trust-section');
if (trustSection) {
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.trust-value[data-count]').forEach(el => {
          animateCountUp(el);
        });
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  countObserver.observe(trustSection);
}

/* ----- CONTACT FORM (Email Redirect) ----- */
const enquiryForm = document.getElementById('enquiry-form');
if (enquiryForm) {
  enquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const company = document.getElementById('company').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const region = document.getElementById('region').value;
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) return;

    const recipient = "bhaveshchhatwani92@gmail.com";
    const subject = `Ahlan-Trips Enquiry: ${name} (${company})`;
    
    let body = `Hello Ahlan-Trips Team,\n\n`;
    body += `I am interested in your corporate travel solutions. Here are my details:\n\n`;
    body += `👤 Name: ${name}\n`;
    body += `🏢 Company: ${company}\n`;
    body += `📧 Work Email: ${email}\n`;
    body += `📞 Phone: ${phone}\n`;
    body += `🌍 Primary Region: ${region}\n\n`;
    body += `💬 Message:\n${message}\n\n`;
    body += `--- Sent from Ahlan-Trips Website ---`;

    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Smooth transition
    const btn = enquiryForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Opening Mail Client…';
    btn.disabled = true;

    setTimeout(() => {
      window.location.href = mailtoUrl;
      btn.textContent = originalText;
      btn.disabled = false;
    }, 800);
  });
}

/* ----- FAQ PANEL ----- */
const faqToggle     = document.getElementById('faq-toggle');
const faqPanel      = document.getElementById('faq-panel');
const faqAnswerText = document.getElementById('faq-answer-text');
const faqAnswers = {
  services: 'We offer corporate travel management, executive assistance, travel analytics, duty of care, policy optimization, and meetings & events coordination.',
  regions:  'We serve 140+ countries with strong regional teams across India, Europe, the Middle East, and Tunisia.',
  pricing:  'Our pricing is tailored to the size and complexity of your travel program. Contact us for a custom quote.',
  events:   'Yes — from venue sourcing and contracting to on-site event management and logistics for global MICE programs.',
  platform: 'Our platform includes online booking, policy guardrails, traveler tracking, spend analytics, executive dashboards, and HR/ERP integrations.',
  other:    'Please use our contact form or reach us on WhatsApp at +91 74259 95556 for any other enquiries.',
};
if (faqToggle && faqPanel) {
  faqToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent immediate document click from closing it
    const isHidden = faqPanel.hidden;
    faqPanel.hidden = !isHidden;
    faqToggle.setAttribute('aria-expanded', String(isHidden));
  });

  // Close FAQ when clicking outside
  document.addEventListener('click', (e) => {
    if (!faqPanel.hidden && !faqPanel.contains(e.target) && !faqToggle.contains(e.target)) {
      faqPanel.hidden = true;
      faqToggle.setAttribute('aria-expanded', 'false');
    }
  });
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const q = btn.getAttribute('data-question');
      faqAnswerText.textContent = faqAnswers[q] || 'Please contact our team for more details.';
    });
  });
}

/* ----- FOOTER YEAR ----- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

