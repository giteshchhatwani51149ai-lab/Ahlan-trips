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
  // Tunisia
  { name: 'Tunis', code: 'TUN', country: 'Tunisia' },
  { name: 'Sfax', code: 'SFA', country: 'Tunisia' },
  { name: 'Monastir', code: 'MIR', country: 'Tunisia' },
  { name: 'Tozeur', code: 'TOE', country: 'Tunisia' },
  { name: 'Djerba', code: 'DJE', country: 'Tunisia' },
  // Turkey
  { name: 'Istanbul', code: 'IST', country: 'Turkey' },
  { name: 'Istanbul Sabiha', code: 'SAW', country: 'Turkey' },
  { name: 'Izmir', code: 'ADB', country: 'Turkey' },
  { name: 'Ankara', code: 'ESB', country: 'Turkey' },
  // France
  { name: 'Paris', code: 'CDG', country: 'France' },
  { name: 'Paris Orly', code: 'ORY', country: 'France' },
  { name: 'Lyon', code: 'LYS', country: 'France' },
  { name: 'Marseille', code: 'MRS', country: 'France' },
  { name: 'Nice', code: 'NCE', country: 'France' },
  // UK
  { name: 'London Heathrow', code: 'LHR', country: 'United Kingdom' },
  { name: 'London Gatwick', code: 'LGW', country: 'United Kingdom' },
  { name: 'London Stansted', code: 'STN', country: 'United Kingdom' },
  { name: 'Manchester', code: 'MAN', country: 'United Kingdom' },
  { name: 'Edinburgh', code: 'EDI', country: 'United Kingdom' },
  // Germany
  { name: 'Frankfurt', code: 'FRA', country: 'Germany' },
  { name: 'Munich', code: 'MUC', country: 'Germany' },
  { name: 'Berlin', code: 'BER', country: 'Germany' },
  { name: 'Düsseldorf', code: 'DUS', country: 'Germany' },
  { name: 'Hamburg', code: 'HAM', country: 'Germany' },
  // Europe
  { name: 'Amsterdam', code: 'AMS', country: 'Netherlands' },
  { name: 'Brussels', code: 'BRU', country: 'Belgium' },
  { name: 'Madrid', code: 'MAD', country: 'Spain' },
  { name: 'Barcelona', code: 'BCN', country: 'Spain' },
  { name: 'Rome', code: 'FCO', country: 'Italy' },
  { name: 'Milan Malpensa', code: 'MXP', country: 'Italy' },
  { name: 'Milan Linate', code: 'LIN', country: 'Italy' },
  { name: 'Venice', code: 'VCE', country: 'Italy' },
  { name: 'Athens', code: 'ATH', country: 'Greece' },
  { name: 'Zurich', code: 'ZRH', country: 'Switzerland' },
  { name: 'Geneva', code: 'GVA', country: 'Switzerland' },
  { name: 'Vienna', code: 'VIE', country: 'Austria' },
  { name: 'Copenhagen', code: 'CPH', country: 'Denmark' },
  { name: 'Stockholm', code: 'ARN', country: 'Sweden' },
  { name: 'Oslo', code: 'OSL', country: 'Norway' },
  { name: 'Helsinki', code: 'HEL', country: 'Finland' },
  { name: 'Warsaw', code: 'WAW', country: 'Poland' },
  { name: 'Prague', code: 'PRG', country: 'Czech Republic' },
  { name: 'Budapest', code: 'BUD', country: 'Hungary' },
  { name: 'Lisbon', code: 'LIS', country: 'Portugal' },
  { name: 'Porto', code: 'OPO', country: 'Portugal' },
  // Middle East
  { name: 'Dubai', code: 'DXB', country: 'UAE' },
  { name: 'Abu Dhabi', code: 'AUH', country: 'UAE' },
  { name: 'Doha', code: 'DOH', country: 'Qatar' },
  { name: 'Manama', code: 'BAH', country: 'Bahrain' },
  { name: 'Kuwait City', code: 'KWI', country: 'Kuwait' },
  { name: 'Muscat', code: 'MCT', country: 'Oman' },
  { name: 'Riyadh', code: 'RUH', country: 'Saudi Arabia' },
  { name: 'Jeddah', code: 'JED', country: 'Saudi Arabia' },
  { name: 'Beirut', code: 'BEY', country: 'Lebanon' },
  { name: 'Amman', code: 'AMM', country: 'Jordan' },
  { name: 'Tel Aviv', code: 'TLV', country: 'Israel' },
  // Africa
  { name: 'Cairo', code: 'CAI', country: 'Egypt' },
  { name: 'Hurghada', code: 'HRG', country: 'Egypt' },
  { name: 'Sharm El-Sheikh', code: 'SSH', country: 'Egypt' },
  { name: 'Casablanca', code: 'CMN', country: 'Morocco' },
  { name: 'Marrakesh', code: 'RAK', country: 'Morocco' },
  { name: 'Algiers', code: 'ALG', country: 'Algeria' },
  { name: 'Oran', code: 'ORN', country: 'Algeria' },
  { name: 'Tripoli', code: 'TIP', country: 'Libya' },
  { name: 'Dakar', code: 'DAK', country: 'Senegal' },
  { name: 'Abidjan', code: 'ABJ', country: "Côte d'Ivoire" },
  { name: 'Accra', code: 'ACC', country: 'Ghana' },
  { name: 'Lagos', code: 'LOS', country: 'Nigeria' },
  { name: 'Abuja', code: 'ABV', country: 'Nigeria' },
  { name: 'Nairobi', code: 'NBO', country: 'Kenya' },
  { name: 'Addis Ababa', code: 'ADD', country: 'Ethiopia' },
  { name: 'Johannesburg', code: 'JNB', country: 'South Africa' },
  { name: 'Cape Town', code: 'CPT', country: 'South Africa' },
  { name: 'Dar es Salaam', code: 'DAR', country: 'Tanzania' },
  { name: 'Kigali', code: 'KGL', country: 'Rwanda' },
  { name: 'Mauritius', code: 'MRU', country: 'Mauritius' },
  // Americas
  { name: 'New York JFK', code: 'JFK', country: 'USA' },
  { name: 'New York LaGuardia', code: 'LGA', country: 'USA' },
  { name: 'Newark', code: 'EWR', country: 'USA' },
  { name: 'Los Angeles', code: 'LAX', country: 'USA' },
  { name: 'Chicago', code: 'ORD', country: 'USA' },
  { name: 'Miami', code: 'MIA', country: 'USA' },
  { name: 'San Francisco', code: 'SFO', country: 'USA' },
  { name: 'Boston', code: 'BOS', country: 'USA' },
  { name: 'Atlanta', code: 'ATL', country: 'USA' },
  { name: 'Dallas', code: 'DFW', country: 'USA' },
  { name: 'Toronto', code: 'YYZ', country: 'Canada' },
  { name: 'Vancouver', code: 'YVR', country: 'Canada' },
  { name: 'Montreal', code: 'YUL', country: 'Canada' },
  { name: 'São Paulo', code: 'GRU', country: 'Brazil' },
  { name: 'Rio de Janeiro', code: 'GIG', country: 'Brazil' },
  { name: 'Mexico City', code: 'MEX', country: 'Mexico' },
  { name: 'Bogotá', code: 'BOG', country: 'Colombia' },
  { name: 'Lima', code: 'LIM', country: 'Peru' },
  { name: 'Buenos Aires', code: 'EZE', country: 'Argentina' },
  // Russia
  { name: 'Moscow Sheremetyevo', code: 'SVO', country: 'Russia' },
  { name: 'Moscow Domodedovo', code: 'DME', country: 'Russia' },
  { name: 'St. Petersburg', code: 'LED', country: 'Russia' },
  // South Asia
  { name: 'New Delhi', code: 'DEL', country: 'India' },
  { name: 'Mumbai', code: 'BOM', country: 'India' },
  { name: 'Bangalore', code: 'BLR', country: 'India' },
  { name: 'Chennai', code: 'MAA', country: 'India' },
  { name: 'Kolkata', code: 'CCU', country: 'India' },
  { name: 'Hyderabad', code: 'HYD', country: 'India' },
  { name: 'Kochi', code: 'COK', country: 'India' },
  { name: 'Pune', code: 'PNQ', country: 'India' },
  { name: 'Karachi', code: 'KHI', country: 'Pakistan' },
  { name: 'Lahore', code: 'LHE', country: 'Pakistan' },
  { name: 'Islamabad', code: 'ISB', country: 'Pakistan' },
  { name: 'Dhaka', code: 'DAC', country: 'Bangladesh' },
  { name: 'Colombo', code: 'CMB', country: 'Sri Lanka' },
  { name: 'Kathmandu', code: 'KTM', country: 'Nepal' },
  { name: 'Male', code: 'MLE', country: 'Maldives' },
  // East/Southeast Asia
  { name: 'Bangkok Suvarnabhumi', code: 'BKK', country: 'Thailand' },
  { name: 'Bangkok Don Mueang', code: 'DMK', country: 'Thailand' },
  { name: 'Phuket', code: 'HKT', country: 'Thailand' },
  { name: 'Kuala Lumpur', code: 'KUL', country: 'Malaysia' },
  { name: 'Singapore', code: 'SIN', country: 'Singapore' },
  { name: 'Jakarta', code: 'CGK', country: 'Indonesia' },
  { name: 'Bali', code: 'DPS', country: 'Indonesia' },
  { name: 'Manila', code: 'MNL', country: 'Philippines' },
  { name: 'Ho Chi Minh City', code: 'SGN', country: 'Vietnam' },
  { name: 'Hanoi', code: 'HAN', country: 'Vietnam' },
  { name: 'Yangon', code: 'RGN', country: 'Myanmar' },
  { name: 'Beijing Capital', code: 'PEK', country: 'China' },
  { name: 'Beijing Daxing', code: 'PKX', country: 'China' },
  { name: 'Shanghai', code: 'PVG', country: 'China' },
  { name: 'Guangzhou', code: 'CAN', country: 'China' },
  { name: 'Hong Kong', code: 'HKG', country: 'Hong Kong' },
  { name: 'Taipei', code: 'TPE', country: 'Taiwan' },
  { name: 'Seoul Incheon', code: 'ICN', country: 'South Korea' },
  { name: 'Seoul Gimpo', code: 'GMP', country: 'South Korea' },
  { name: 'Tokyo Narita', code: 'NRT', country: 'Japan' },
  { name: 'Tokyo Haneda', code: 'HND', country: 'Japan' },
  { name: 'Osaka', code: 'KIX', country: 'Japan' },
  // Oceania
  { name: 'Sydney', code: 'SYD', country: 'Australia' },
  { name: 'Melbourne', code: 'MEL', country: 'Australia' },
  { name: 'Brisbane', code: 'BNE', country: 'Australia' },
  { name: 'Perth', code: 'PER', country: 'Australia' },
  { name: 'Auckland', code: 'AKL', country: 'New Zealand' }
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

/* ----- TOAST NOTIFICATION HELPER ----- */
function showToast(message, type = 'error') {
  // Remove existing toast
  const existing = document.getElementById('search-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'search-toast';
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: ${type === 'error' ? '#ef4444' : '#22c55e'};
    color: #fff;
    padding: 0.85rem 1.5rem;
    border-radius: 12px;
    font-size: 0.95rem;
    font-weight: 500;
    box-shadow: 0 8px 30px rgba(0,0,0,0.2);
    z-index: 99999;
    opacity: 0;
    transition: all 0.3s ease;
    white-space: nowrap;
    font-family: inherit;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  // Auto remove after 3.5s
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
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
    let errorMessages = [];

    // Clear previous error highlights
    document.querySelectorAll('.s-from, .s-to, .s-depart').forEach(el => {
      el.style.border = '';
      el.style.boxShadow = '';
    });

    rows.forEach((row, index) => {
      const fromEl = row.querySelector('.s-from');
      const toEl = row.querySelector('.s-to');
      const departEl = row.querySelector('.s-depart');

      const from = fromEl.value.trim();
      const to = toEl.value.trim();
      const depart = departEl.value;

      const label = rows.length > 1 ? ` (Flight ${index + 1})` : '';

      if (!from) {
        fromEl.style.border = '2px solid #ef4444';
        fromEl.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.15)';
        errorMessages.push(`Please enter departure city${label}`);
        isValid = false;
      }
      if (!to) {
        toEl.style.border = '2px solid #ef4444';
        toEl.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.15)';
        errorMessages.push(`Please enter destination city${label}`);
        isValid = false;
      }
      if (!depart) {
        departEl.style.border = '2px solid #ef4444';
        departEl.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.15)';
        errorMessages.push(`Please select departure date${label}`);
        isValid = false;
      }

      flightData.push({ segment: index + 1, from, to, depart });
    });

    // Check return date for Return trips
    const returnDate = document.getElementById('s-return').value;
    if (tripType === 'Return' && !returnDate) {
      const returnEl = document.getElementById('s-return');
      if (returnEl) {
        returnEl.style.border = '2px solid #ef4444';
        returnEl.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.15)';
      }
      errorMessages.push('Please select a return date');
      isValid = false;
    }

    if (!isValid) {
      showToast('⚠️ ' + errorMessages[0]);
      return;
    }

    // Retrieve Cabin Class & Passenger details
    const adults = parseInt(document.getElementById('adults-val')?.textContent || '1', 10);
    const children = parseInt(document.getElementById('children-val')?.textContent || '0', 10);
    const infants = parseInt(document.getElementById('infants-val')?.textContent || '0', 10);
    const cabinClassInput = document.querySelector('input[name="cabin-class"]:checked');
    const cabinClass = cabinClassInput ? cabinClassInput.value : 'Economy';

    // Build email body
    let emailBody = `Hello Ahlan-Trips Team,\n\nI would like to request a flight booking. Here are the details:\n\n`;
    emailBody += `=============================\n`;
    emailBody += `FLIGHT SEARCH DETAILS\n`;
    emailBody += `=============================\n\n`;
    emailBody += `Trip Type: ${tripType}\n`;
    emailBody += `Cabin Class: ${cabinClass}\n`;
    emailBody += `Passengers: ${adults} Adult(s)`;
    if (children > 0) emailBody += `, ${children} Child(ren)`;
    if (infants > 0) emailBody += `, ${infants} Infant(s)`;
    emailBody += `\n\n`;

    flightData.forEach((flight) => {
      if (flightData.length > 1) {
        emailBody += `--- Flight ${flight.segment} ---\n`;
      }
      emailBody += `From       : ${flight.from}\n`;
      emailBody += `To         : ${flight.to}\n`;
      emailBody += `Departure  : ${flight.depart}\n`;
      if (flightData.length > 1) emailBody += `\n`;
    });

    if (tripType === 'Return' && returnDate) {
      emailBody += `Return Date: ${returnDate}\n`;
    }

    emailBody += `\n=============================\n`;
    emailBody += `Please contact me with available flight options and pricing.\n\nThank you!`;

    const emailTo = 'info@ahlan-trips.com';
    const subject = encodeURIComponent(`Flight Booking Request - ${tripType}`);
    const body = encodeURIComponent(emailBody);
    const mailtoUrl = `mailto:${emailTo}?subject=${subject}&body=${body}`;

    // Button loading state
    const originalHTML = searchBtn.innerHTML;
    searchBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
        style="margin-right:8px;vertical-align:middle;animation:spin 1s linear infinite;">
        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
      </svg>
      Opening Mail…`;
    searchBtn.disabled = true;

    // Open mail client
    setTimeout(() => {
      try {
        window.location.href = mailtoUrl;
        showToast('✅ Opening your mail client…', 'success');
      } catch (err) {
        showToast('⚠️ Could not open mail client. Please email info@ahlan-trips.com directly.');
      }

      // Restore button
      setTimeout(() => {
        searchBtn.innerHTML = originalHTML;
        searchBtn.disabled = false;
      }, 2000);
    }, 300);
  });
}

/* Add spin keyframe if not present */
(function() {
  if (!document.getElementById('search-btn-styles')) {
    const style = document.createElement('style');
    style.id = 'search-btn-styles';
    style.textContent = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
    document.head.appendChild(style);
  }
})();

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

    const recipient = "info@ahlan-trips.com";
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
  other:    'Please use our contact form or reach us on WhatsApp at +216 27764593 or +216 27764649 for any other enquiries.',
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

/* =============================================
   AHLAN-TRIPS INTERACTIVE UI CONTROLLERS
   ============================================= */
(function() {
  let currentLanguage = localStorage.getItem('ahlan_lang') || 'en';

  /* -------------------------------------------
     1. Flight Search Widget (Class & Passengers)
     ------------------------------------------- */
  const trigger = document.getElementById('class-passengers-trigger');
  const popover = document.getElementById('class-passengers-popover');
  const container = document.querySelector('.search-class-passengers-container');
  const doneBtn = document.getElementById('class-passengers-done');

  if (trigger && popover && container) {
    // Toggle popover
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', !isExpanded);
      popover.classList.toggle('active', !isExpanded);
    });

    // Close on Done button click
    if (doneBtn) {
      doneBtn.addEventListener('click', () => {
        trigger.setAttribute('aria-expanded', 'false');
        popover.classList.remove('active');
      });
    }

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!container.contains(e.target)) {
        trigger.setAttribute('aria-expanded', 'false');
        popover.classList.remove('active');
      }
    });

    // Counters logic
    const counters = {
      adults: { valEl: document.getElementById('adults-val'), minus: document.getElementById('adults-minus'), plus: document.getElementById('adults-plus') },
      children: { valEl: document.getElementById('children-val'), minus: document.getElementById('children-minus'), plus: document.getElementById('children-plus') },
      infants: { valEl: document.getElementById('infants-val'), minus: document.getElementById('infants-minus'), plus: document.getElementById('infants-plus') }
    };

    function updateCounters() {
      const adultsVal = parseInt(counters.adults.valEl.textContent, 10);
      const childrenVal = parseInt(counters.children.valEl.textContent, 10);
      const infantsVal = parseInt(counters.infants.valEl.textContent, 10);
      const total = adultsVal + childrenVal + infantsVal;

      // Update disabled states for minus buttons
      counters.adults.minus.disabled = (adultsVal <= 1 || adultsVal <= infantsVal);
      counters.children.minus.disabled = (childrenVal <= 0);
      counters.infants.minus.disabled = (infantsVal <= 0);

      // Update disabled states for plus buttons
      const reachLimit = (total >= 9);
      counters.adults.plus.disabled = reachLimit;
      counters.children.plus.disabled = reachLimit;
      counters.infants.plus.disabled = (reachLimit || infantsVal >= adultsVal);
    }

    function updatePassengerDisplay() {
      const adultsVal = parseInt(counters.adults.valEl.textContent, 10);
      const childrenVal = parseInt(counters.children.valEl.textContent, 10);
      const infantsVal = parseInt(counters.infants.valEl.textContent, 10);
      
      const cabinClassInput = document.querySelector('input[name="cabin-class"]:checked');
      const cabinClassValue = cabinClassInput ? cabinClassInput.value : 'Economy';
      
      // Get translations
      const langData = window.translations ? (window.translations[currentLanguage] || window.translations['en']) : {};
      
      let classText = cabinClassValue;
      if (cabinClassValue === 'Economy') classText = langData.lbl_opt_economy || 'Economy';
      else if (cabinClassValue === 'Premium Economy') classText = langData.lbl_opt_premium || 'Premium Economy';
      else if (cabinClassValue === 'Business') classText = langData.lbl_opt_business || 'Business';
      else if (cabinClassValue === 'First') classText = langData.lbl_opt_first || 'First Class';

      let adultText = '';
      let childText = '';
      let infantText = '';

      if (currentLanguage === 'ar') {
        adultText = adultsVal + ' ' + (langData.lbl_adults || 'بالغ');
        childText = childrenVal > 0 ? `, ${childrenVal} ${langData.lbl_children || 'طفل'}` : '';
        infantText = infantsVal > 0 ? `, ${infantsVal} ${langData.lbl_infants || 'رضيع'}` : '';
      } else if (currentLanguage === 'fr') {
        const adWord = adultsVal > 1 ? 'Adultes' : 'Adulte';
        const chWord = childrenVal > 1 ? 'Enfants' : 'Enfant';
        const infWord = infantsVal > 1 ? 'Bébés' : 'Bébé';
        adultText = `${adultsVal} ${adWord}`;
        childText = childrenVal > 0 ? `, ${childrenVal} ${chWord}` : '';
        infantText = infantsVal > 0 ? `, ${infantsVal} ${infWord}` : '';
      } else {
        const adWord = adultsVal > 1 ? 'Adults' : 'Adult';
        const chWord = childrenVal > 1 ? 'Children' : 'Child';
        const infWord = infantsVal > 1 ? 'Infants' : 'Infant';
        adultText = `${adultsVal} ${adWord}`;
        childText = childrenVal > 0 ? `, ${childrenVal} ${chWord}` : '';
        infantText = infantsVal > 0 ? `, ${infantsVal} ${infWord}` : '';
      }

      const displayEl = document.getElementById('class-passengers-display');
      if (displayEl) {
        displayEl.textContent = `${adultText}${childText}${infantText}, ${classText}`;
      }
    }

    // Set up counter button event listeners
    Object.keys(counters).forEach((key) => {
      counters[key].minus.addEventListener('click', () => {
        let val = parseInt(counters[key].valEl.textContent, 10);
        if (key === 'adults' && val <= 1) return;
        if (key !== 'adults' && val <= 0) return;
        counters[key].valEl.textContent = --val;
        updateCounters();
        updatePassengerDisplay();
      });

      counters[key].plus.addEventListener('click', () => {
        const adultsVal = parseInt(counters.adults.valEl.textContent, 10);
        const childrenVal = parseInt(counters.children.valEl.textContent, 10);
        const infantsVal = parseInt(counters.infants.valEl.textContent, 10);
        if (adultsVal + childrenVal + infantsVal >= 9) return;
        if (key === 'infants' && infantsVal >= adultsVal) return;
        
        let val = parseInt(counters[key].valEl.textContent, 10);
        counters[key].valEl.textContent = ++val;
        updateCounters();
        updatePassengerDisplay();
      });
    });

    // Cabin class change listener
    document.querySelectorAll('input[name="cabin-class"]').forEach((radio) => {
      radio.addEventListener('change', () => {
        updatePassengerDisplay();
      });
    });

    // Initialize
    updateCounters();
    updatePassengerDisplay();
  }

  /* -------------------------------------------
     2. Testimonials Carousel
     ------------------------------------------- */
  const carousel = document.getElementById('testimonial-carousel');
  if (carousel) {
    const slides = carousel.querySelectorAll('.testimonial-slide');
    const dots = carousel.querySelectorAll('.carousel-dots .dot');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    let currentSlide = 0;
    let timer = null;

    function showSlide(index) {
      slides.forEach((slide) => slide.classList.remove('active'));
      dots.forEach((dot) => dot.classList.remove('active'));

      currentSlide = (index + slides.length) % slides.length;
      slides[currentSlide].classList.add('active');
      
      const targetDot = carousel.querySelector(`.carousel-dots .dot[data-index="${currentSlide}"]`);
      if (targetDot) targetDot.classList.add('active');
    }

    function nextSlide() {
      showSlide(currentSlide + 1);
    }

    function prevSlide() {
      showSlide(currentSlide - 1);
    }

    function startTimer() {
      stopTimer();
      timer = setInterval(nextSlide, 6000);
    }

    function stopTimer() {
      if (timer) clearInterval(timer);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startTimer(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startTimer(); });

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.getAttribute('data-index'), 10);
        showSlide(idx);
        startTimer();
      });
    });

    carousel.addEventListener('mouseenter', stopTimer);
    carousel.addEventListener('mouseleave', startTimer);

    // Initialize carousel timer
    startTimer();
  }

  /* -------------------------------------------
     3. FAQ Accordion
     ------------------------------------------- */
  const faqTriggers = document.querySelectorAll('.faq-acc-trigger');
  faqTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-acc-item');
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      // Close all items
      faqTriggers.forEach((t) => {
        t.setAttribute('aria-expanded', 'false');
        t.closest('.faq-acc-item').classList.remove('active');
      });

      // Open clicked item if it was closed
      if (!isExpanded) {
        trigger.setAttribute('aria-expanded', 'true');
        item.classList.add('active');
      }
    });
  });

  /* -------------------------------------------
     4. Travel Dashboard & Map Connections
     ------------------------------------------- */
  const hubs = {
    jfk: { name: 'New York (JFK)', x: 100, y: 120, label: 'JFK', country: 'USA' },
    lhr: { name: 'London (LHR)', x: 240, y: 90, label: 'LHR', country: 'United Kingdom' },
    cdg: { name: 'Paris (CDG)', x: 280, y: 110, label: 'CDG', country: 'France' },
    tun: { name: 'Tunis (TUN)', x: 290, y: 160, label: 'TUN', country: 'Tunisia' },
    dxb: { name: 'Dubai (DXB)', x: 400, y: 180, label: 'DXB', country: 'UAE' },
    dps: { name: 'Bali (DPS)', x: 510, y: 260, label: 'DPS', country: 'Indonesia' }
  };

  const hubData = {
    tun: {
      en: { flightNum: "AH-160", from: "TUN (Tunis)", to: "DXB (Dubai)", time: "10:15 AM", status: "On Time", hotel: "The Sahara Sands Resort", hotelLoc: "Tunis, TN", price: "$145/night", benefits: "Free Upgrade", statusClass: "status-green" },
      fr: { flightNum: "AH-160", from: "TUN (Tunis)", to: "DXB (Dubaï)", time: "10h15", status: "À l'heure", hotel: "The Sahara Sands Resort", hotelLoc: "Tunis, TN", price: "145$ / nuit", benefits: "Surclassement offert", statusClass: "status-green" },
      ar: { flightNum: "AH-160", from: "TUN (تونس)", to: "DXB (دبي)", time: "10:15 صباحًا", status: "في الوقت المحدد", hotel: "The Sahara Sands Resort", hotelLoc: "تونس، تونس", price: "145$/ليلة", benefits: "ترقية مجانية", statusClass: "status-green" }
    },
    jfk: {
      en: { flightNum: "UA-003", from: "JFK (New York)", to: "LHR (London)", time: "08:30 PM", status: "On Time", hotel: "The Lexington NYC", hotelLoc: "New York, USA", price: "$320/night", benefits: "Late Checkout", statusClass: "status-green" },
      fr: { flightNum: "UA-003", from: "JFK (New York)", to: "LHR (Londres)", time: "20h30", status: "À l'heure", hotel: "The Lexington NYC", hotelLoc: "New York, USA", price: "320$ / nuit", benefits: "Départ tardif", statusClass: "status-green" },
      ar: { flightNum: "UA-003", from: "JFK (نيويورك)", to: "LHR (لندن)", time: "08:30 مساءً", status: "في الوقت المحدد", hotel: "The Lexington NYC", hotelLoc: "نيويورك، أمريكا", price: "320$/ليلة", benefits: "مغادرة متأخرة", statusClass: "status-green" }
    },
    lhr: {
      en: { flightNum: "BA-112", from: "LHR (London)", to: "CDG (Paris)", time: "11:45 AM", status: "On Time", hotel: "The London Savoy", hotelLoc: "London, UK", price: "$290/night", benefits: "Free Breakfast", statusClass: "status-green" },
      fr: { flightNum: "BA-112", from: "LHR (Londres)", to: "CDG (Paris)", time: "11h45", status: "À l'heure", hotel: "The London Savoy", hotelLoc: "Londres, RU", price: "290$ / nuit", benefits: "Petit-déjeuner inclus", statusClass: "status-green" },
      ar: { flightNum: "BA-112", from: "LHR (لندن)", to: "CDG (باريس)", time: "11:45 صباحًا", status: "في الوقت المحدد", hotel: "The London Savoy", hotelLoc: "لندن، بريطانيا", price: "290$/ليلة", benefits: "فطور مجاني", statusClass: "status-green" }
    },
    cdg: {
      en: { flightNum: "AF-022", from: "CDG (Paris)", to: "TUN (Tunis)", time: "02:15 PM", status: "Delayed", hotel: "Hôtel Plaza Athénée", hotelLoc: "Paris, France", price: "$450/night", benefits: "VIP Lounge Access", statusClass: "status-red" },
      fr: { flightNum: "AF-022", from: "CDG (Paris)", to: "TUN (Tunis)", time: "14h15", status: "Retardé", hotel: "Hôtel Plaza Athénée", hotelLoc: "Paris, France", price: "450$ / nuit", benefits: "Accès Salon VIP", statusClass: "status-red" },
      ar: { flightNum: "AF-022", from: "CDG (باريس)", to: "TUN (تونس)", time: "02:15 مساءً", status: "متأخرة", hotel: "Hôtel Plaza Athénée", hotelLoc: "باريس، فرنسا", price: "450$/ليلة", benefits: "دخول صالة VIP", statusClass: "status-red" }
    },
    dxb: {
      en: { flightNum: "EK-201", from: "DXB (Dubai)", to: "DPS (Bali)", time: "09:05 AM", status: "On Time", hotel: "The Palace Downtown", hotelLoc: "Dubai, UAE", price: "$380/night", benefits: "Spa Discount", statusClass: "status-green" },
      fr: { flightNum: "EK-201", from: "DXB (Dubaï)", to: "DPS (Bali)", time: "09h05", status: "À l'heure", hotel: "The Palace Downtown", hotelLoc: "Dubaï, ÉAU", price: "380$ / nuit", benefits: "Réduction Spa", statusClass: "status-green" },
      ar: { flightNum: "EK-201", from: "DXB (دبي)", to: "DPS (بالي)", time: "09:05 صباحًا", status: "في الوقت المحدد", hotel: "The Palace Downtown", hotelLoc: "دبي، الإمارات", price: "380$/ليلة", benefits: "خصم على السبا", statusClass: "status-green" }
    },
    dps: {
      en: { flightNum: "GA-880", from: "DPS (Bali)", to: "DXB (Dubai)", time: "06:40 PM", status: "On Time", hotel: "Ayana Resort & Spa", hotelLoc: "Bali, Indonesia", price: "$210/night", benefits: "Welcome Drink", statusClass: "status-green" },
      fr: { flightNum: "GA-880", from: "DPS (Bali)", to: "DXB (Dubaï)", time: "18h40", status: "À l'heure", hotel: "Ayana Resort & Spa", hotelLoc: "Bali, Indonésie", price: "210$ / nuit", benefits: "Boisson de bienvenue", statusClass: "status-green" },
      ar: { flightNum: "GA-880", from: "DPS (بالي)", to: "DXB (دبي)", time: "06:40 مساءً", status: "في الوقت المحدد", hotel: "Ayana Resort & Spa", hotelLoc: "بالي، إندونيسيا", price: "210$/ليلة", benefits: "مشروب ترحيبي", statusClass: "status-green" }
    }
  };

  let activeHubId = 'tun';

  function drawConnections(activeId) {
    const connectionsGroup = document.getElementById('map-connections');
    if (!connectionsGroup) return;

    connectionsGroup.innerHTML = '';
    const activeHub = hubs[activeId];
    if (!activeHub) return;

    Object.entries(hubs).forEach(([id, hub]) => {
      if (id === activeId) return;

      const x1 = activeHub.x;
      const y1 = activeHub.y;
      const x2 = hub.x;
      const y2 = hub.y;

      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2;
      const dx = x2 - x1;
      const dy = y2 - y1;

      const cx = mx - dy * 0.18;
      const cy = my + dx * 0.18;

      const pathD = `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;

      const baseLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      baseLine.setAttribute('d', pathD);
      baseLine.setAttribute('class', 'route-path');

      const flowLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      flowLine.setAttribute('d', pathD);
      flowLine.setAttribute('class', 'route-path-flow');

      connectionsGroup.appendChild(baseLine);
      connectionsGroup.appendChild(flowLine);
    });
  }

  function updateHubDetails(hubId) {
    activeHubId = hubId;
    const hubInfo = hubData[hubId]?.[currentLanguage] || hubData[hubId]?.['en'];
    if (!hubInfo) return;

    const flightCard = document.getElementById('map-flight-card');
    const hotelCard = document.getElementById('map-hotel-card');

    if (flightCard && hotelCard) {
      flightCard.style.animation = 'none';
      hotelCard.style.animation = 'none';
      flightCard.offsetHeight; // trigger reflow
      hotelCard.offsetHeight; // trigger reflow
      flightCard.style.animation = 'ticketFadeInUp 0.6s ease forwards';
      hotelCard.style.animation = 'ticketFadeInUp 0.6s ease forwards 0.15s';
    }

    // Flight Card details
    const ticketNumberEl = document.getElementById('map-ticket-number');
    if (ticketNumberEl) ticketNumberEl.textContent = hubInfo.flightNum;

    const ticketFromEl = document.getElementById('map-ticket-from');
    if (ticketFromEl) ticketFromEl.textContent = hubInfo.from;

    const ticketToEl = document.getElementById('map-ticket-to');
    if (ticketToEl) ticketToEl.textContent = hubInfo.to;

    const ticketTimeEl = document.getElementById('map-ticket-time');
    if (ticketTimeEl) ticketTimeEl.textContent = hubInfo.time;

    const ticketStateEl = document.getElementById('map-ticket-state');
    if (ticketStateEl) {
      ticketStateEl.textContent = hubInfo.status;
      ticketStateEl.className = hubInfo.statusClass;
    }

    // Hotel Card details
    const hotelNameEl = document.getElementById('map-hotel-name');
    if (hotelNameEl) hotelNameEl.textContent = hubInfo.hotel;

    const hotelLocEl = document.getElementById('map-hotel-loc');
    if (hotelLocEl) hotelLocEl.textContent = hubInfo.hotelLoc;

    const hotelPriceEl = document.getElementById('map-hotel-price');
    if (hotelPriceEl) hotelPriceEl.textContent = hubInfo.price;

    const hotelBenefitsEl = document.getElementById('map-hotel-benefits');
    if (hotelBenefitsEl) hotelBenefitsEl.textContent = hubInfo.benefits;
  }

  const mapHubs = document.querySelectorAll('.map-hub');
  if (mapHubs.length > 0) {
    mapHubs.forEach((hub) => {
      hub.addEventListener('click', () => {
        const hubId = hub.getAttribute('data-id');
        
        mapHubs.forEach((h) => h.classList.remove('active'));
        hub.classList.add('active');

        drawConnections(hubId);
        updateHubDetails(hubId);
      });
    });

    // Initial load
    drawConnections('tun');
    updateHubDetails('tun');
  }

  /* -------------------------------------------
     5. Multi-language Synchronization Event Listener
     ------------------------------------------- */
  window.addEventListener('ahlanLanguageChanged', (e) => {
    currentLanguage = e.detail.lang;
    if (trigger) {
      updatePassengerDisplay();
    }
    if (mapHubs.length > 0) {
      updateHubDetails(activeHubId);
    }
  });

})();

