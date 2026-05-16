/* =============================================
   Ahlan-Trips — ENTERPRISE JS
   ============================================= */

'use strict';

/* ----- STICKY HEADER SHADOW + SCROLL PROGRESS ----- */
const header = document.getElementById('site-header');
const scrollProgressBar = document.getElementById('scroll-progress-bar');
const heroParallax = document.getElementById('hero-parallax');

const onScroll = () => {
  const scrollY = window.scrollY;
  
  // Header shadow
  header.classList.toggle('scrolled', scrollY > 10);
  
  // Scroll progress bar
  if (scrollProgressBar) {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollY / docHeight) * 100;
    scrollProgressBar.style.width = scrollPercent + '%';
  }
  
  // Hero parallax effect
  if (heroParallax && scrollY < window.innerHeight) {
    heroParallax.style.transform = `translateY(${scrollY * 0.4}px)`;
  }
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

// Initialize autocomplete for the first row
initAutocomplete('s-from-0', 's-from-results-0');
initAutocomplete('s-to-0', 's-to-results-0');

// Function to initialize autocomplete for dynamically added rows
function initRowAutocomplete(rowIndex) {
  initAutocomplete(`s-from-${rowIndex}`, `s-from-results-${rowIndex}`);
  initAutocomplete(`s-to-${rowIndex}`, `s-to-results-${rowIndex}`);
}

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

/* ----- FLIGHT SEARCH FUNCTIONALITY ----- */
const searchTabs = document.querySelectorAll('.search-tab');
const returnFieldContainer = document.getElementById('return-field-container');
const addCityContainer = document.getElementById('add-city-container');
const flightRowsContainer = document.getElementById('flight-rows-container');
const addCityBtn = document.getElementById('add-city-btn');
let cityRowCounter = 1;

// Trip type handling
function setTripType(type) {
  // Update active tab
  searchTabs.forEach(tab => {
    tab.classList.toggle('active', tab.dataset.type === type);
  });

  // Handle return field visibility
  if (returnFieldContainer) {
    returnFieldContainer.classList.toggle('visible', type === 'return');
  }

  // Handle multi-city add button
  if (addCityContainer) {
    addCityContainer.style.display = type === 'multicity' ? 'block' : 'none';
  }

  // Handle flight rows for multi-city
  let rows = flightRowsContainer.querySelectorAll('.flight-row');
  if (type === 'multicity') {
    // Ensure at least 2 rows for multi-city
    if (rows.length === 1) {
      addCityRow();
    }
  } else {
    // Reset to single row for one-way/return
    while (rows.length > 1) {
      rows[rows.length - 1].remove();
      rows = flightRowsContainer.querySelectorAll('.flight-row');
    }
    // Reset row counter
    cityRowCounter = 1;
  }
}

// Add city row for multi-city
function addCityRow() {
  const rowIndex = cityRowCounter++;
  const row = document.createElement('div');
  row.className = 'flight-row';
  row.dataset.row = rowIndex;
  row.innerHTML = `
    <div class="search-fields">
      <div class="search-field">
        <label for="s-from-${rowIndex}">From</label>
        <div class="search-field-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>
        <input type="text" id="s-from-${rowIndex}" placeholder="City or airport" autocomplete="off" class="s-from" />
        <div class="autocomplete-results" id="s-from-results-${rowIndex}"></div>
      </div>
      <div class="search-field">
        <label for="s-to-${rowIndex}">To</label>
        <div class="search-field-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <input type="text" id="s-to-${rowIndex}" placeholder="City or airport" autocomplete="off" class="s-to" />
        <div class="autocomplete-results" id="s-to-results-${rowIndex}"></div>
      </div>
    </div>
    <div class="search-row-bottom">
      <div class="search-field">
        <label for="s-depart-${rowIndex}">Depart</label>
        <div class="search-field-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </div>
        <input type="date" id="s-depart-${rowIndex}" class="s-depart" />
      </div>
      <button type="button" class="btn btn-secondary remove-city-btn" style="padding: 0.7rem;" onclick="this.closest('.flight-row').remove()">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  `;
  flightRowsContainer.appendChild(row);

  // Initialize autocomplete for the new row
  initRowAutocomplete(rowIndex);
}

// Tab click handlers
searchTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    setTripType(tab.dataset.type);
  });
});

// Add city button handler
if (addCityBtn) {
  addCityBtn.addEventListener('click', addCityRow);
}

/* ----- SEARCH FLIGHTS BTN (Email) ----- */
const searchBtn = document.getElementById('search-flights-btn');
if (searchBtn) {
  searchBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Get active trip type
    const activeTab = document.querySelector('.search-tab.active');
    const tripType = activeTab ? activeTab.textContent.trim() : 'One Way';

    // Collect all flight data
    const rows = flightRowsContainer.querySelectorAll('.flight-row');
    const flightData = [];
    let isValid = true;
    let firstEmptyField = null;

    rows.forEach((row, index) => {
      const from = row.querySelector('.s-from').value.trim();
      const to = row.querySelector('.s-to').value.trim();
      const depart = row.querySelector('.s-depart').value;

      if (!from || !to || !depart) {
        isValid = false;
        if (!firstEmptyField) {
          if (!from) firstEmptyField = row.querySelector('.s-from');
          else if (!to) firstEmptyField = row.querySelector('.s-to');
          else firstEmptyField = row.querySelector('.s-depart');
        }
      }

      flightData.push({
        segment: index + 1,
        from: from,
        to: to,
        depart: depart
      });
    });

    // Get return date if applicable
    const returnDate = document.getElementById('s-return').value;

    // Validate
    if (!isValid) {
      if (firstEmptyField) firstEmptyField.focus();
      return;
    }

    // Build email body
    let emailBody = `Hello Ahlan-Trips Team,\n\nI'd like to book a flight:\n\n`;
    emailBody += `Trip Type: ${tripType}\n\n`;

    let itemNum = 1;
    flightData.forEach((flight) => {
      if (flightData.length > 1) {
        emailBody += `Flight ${flight.segment}:\n`;
      }
      emailBody += `  ${itemNum++}. From: ${flight.from}\n`;
      emailBody += `  ${itemNum++}. To: ${flight.to}\n`;
      emailBody += `  ${itemNum++}. Departure: ${flight.depart}\n`;
      if (flightData.length > 1) emailBody += `\n`;
    });

    if (tripType === 'Return' && returnDate) {
      emailBody += `  ${itemNum++}. Return: ${returnDate}\n`;
    }

    emailBody += `\nPlease contact me with available options.\n\nThank you!`;

    // Send email
    const emailTo = 'bhavesh.chhatwani@ahlan-trips.com';
    const subject = `Flight Booking Request - ${tripType}`;
    const mailtoUrl = `mailto:${emailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

    window.location.href = mailtoUrl;
  });
}

/* ----- SCROLL FADE-UP ANIMATION ----- */
const fadeElements = document.querySelectorAll('.fade-up');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
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

    const recipient = "bhavesh.chhatwani@ahlan-trips.com";
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
  other:    'Please use our contact form or reach us on WhatsApp at +216 27764593 for any other enquiries.',
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

/* ----- FOOTER WAVE ANIMATION ----- */
(function() {
  const canvas = document.getElementById('footer-wave');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = 80;
  const connectionDistance = 100;
  const maxConnections = 3;

  function resize() {
    const footer = canvas.parentElement;
    width = footer.offsetWidth;
    height = footer.offsetHeight;
    canvas.width = width;
    canvas.height = height;
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, width, height);

    // Update and draw particles
    particles.forEach((p, i) => {
      // Update position
      p.x += p.vx;
      p.y += p.vy;

      // Bounce off edges
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 107, 0, 0.6)';
      ctx.fill();

      // Draw connections
      let connections = 0;
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDistance && connections < maxConnections) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          const opacity = (1 - dist / connectionDistance) * 0.3;
          ctx.strokeStyle = `rgba(255, 107, 0, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          connections++;
        }
      }
    });

    requestAnimationFrame(drawParticles);
  }

  function init() {
    resize();
    createParticles();
    drawParticles();
  }

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });

  // Initialize when footer is visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        init();
        observer.disconnect();
      }
    });
  }, { threshold: 0.1 });

  observer.observe(canvas);
})();

/* ----- MOUSE PARALLAX FOR FLOATING ELEMENTS ----- */
(function() {
  const heroSection = document.querySelector('.hero-section');
  const floatItems = document.querySelectorAll('.float-item');
  if (!heroSection || floatItems.length === 0) return;

  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;

  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    mouseX = (e.clientX - rect.left - rect.width / 2) / 30;
    mouseY = (e.clientY - rect.top - rect.height / 2) / 30;
  }, { passive: true });

  function animate() {
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;

    floatItems.forEach((item, index) => {
      const factor = (index + 1) * 0.5;
      item.style.transform = `translate(${currentX * factor}px, ${currentY * factor}px)`;
    });

    requestAnimationFrame(animate);
  }
  animate();
})();

/* ----- TRUST SECTION PULSE ANIMATION ----- */
(function() {
  const trustItems = document.querySelectorAll('.trust-item');
  if (trustItems.length === 0) return;

  const trustObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        trustItems.forEach((item, index) => {
          setTimeout(() => {
            item.style.transform = 'scale(1.02)';
            setTimeout(() => {
              item.style.transform = 'scale(1)';
            }, 200);
          }, index * 100);
        });
      }
    });
  }, { threshold: 0.5 });

  trustItems.forEach(item => trustObserver.observe(item));
})();

/* ----- SOLUTIONS DASHBOARD TILT EFFECT ----- */
(function() {
  const dashboard = document.querySelector('.solutions-dashboard');
  if (!dashboard) return;

  dashboard.addEventListener('mousemove', (e) => {
    const rect = dashboard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    dashboard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });

  dashboard.addEventListener('mouseleave', () => {
    dashboard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  });
})();

/* ----- SMOOTH SCROLL FOR ANCHOR LINKS ----- */
(function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = document.getElementById('site-header')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
})();

