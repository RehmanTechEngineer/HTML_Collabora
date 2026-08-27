/**
 * Main application initialization and event handlers
 * Executes when the DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', function () {
  // ---------------------------
  // Bootstrap Form Validation
  // ---------------------------
  const forms = document.querySelectorAll('.needs-validation');
  
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        // In production: form.submit() would be used instead
        alert('Thank you for your message! We will get back to you soon.');
        form.reset();
      }
      form.classList.add('was-validated');
    }, false);
  });

  // ---------------------------
  // AOS Initialization (Animate On Scroll)
  // ---------------------------
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
  });

  // ---------------------------
  // Navbar Scroll Effect
  // ---------------------------
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function() {
    navbar.classList.toggle('navbar-scrolled', window.scrollY > 50);
  });

  // ---------------------------
  // Bootstrap Tooltip Initialization
  // ---------------------------
  const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  Array.from(tooltipElements).forEach(el => {
    new bootstrap.Tooltip(el);
  });

  // ---------------------------
  // Favorite Button Toggle
  // ---------------------------
  const favoriteBtn = document.getElementById('favoriteBtn');
  if (favoriteBtn) {
    favoriteBtn.addEventListener('click', function() {
      const icon = document.getElementById('favoriteIcon');
      const text = document.getElementById('favoriteText');
      
      const isFavorite = icon.classList.contains('ri-heart-fill');
      icon.classList.toggle('ri-heart-line', isFavorite);
      icon.classList.toggle('ri-heart-fill', !isFavorite);
      icon.classList.toggle('text-danger', !isFavorite);
      text.textContent = isFavorite ? 'Add to Favorites' : 'Added to Favorites';
    });
  }

  // ---------------------------
  // Copy Share Link Functionality
  // ---------------------------
  const copyLinkBtn = document.getElementById('copyLinkBtn');
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', function() {
      const shareLink = document.getElementById('shareLink');
      shareLink.select();
      document.execCommand('copy');
      
      // Visual feedback for copy action
      const originalText = this.textContent;
      this.textContent = 'Copied!';
      setTimeout(() => this.textContent = originalText, 2000);
    });
  }

  // ---------------------------
  // Dynamic CSS Injection
  // ---------------------------
  const style = document.createElement('style');
  style.textContent = `
    /* Content card hover effect */
    .content-card {
      transition: all 0.3s ease;
    }
    .content-card:hover {
      transform: translateY(-5px);
    }
    
    /* Content overlay animation */
    .content-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
      opacity: 0;
      transition: all 0.3s ease;
    }
    .content-card:hover .content-overlay {
      opacity: 1;
    }
    
    /* Gradient backgrounds */
    .bg-gradient-light {
      background: linear-gradient(135deg, rgba(67, 97, 238, 0.1), rgba(58, 12, 163, 0.05));
    }
    .bg-gradient-dark {
      background: linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0));
    }
    
    /* Profile image decorations */
    .profile-image-wrapper {
      position: relative;
      display: inline-block;
    }
    .profile-image-wrapper::after {
      content: '';
      position: absolute;
      top: -10px;
      left: -10px;
      right: -10px;
      bottom: -10px;
      border-radius: 50%;
      background: linear-gradient(135deg, #4361ee, #3a0ca3);
      z-index: -1;
      opacity: 0.1;
    }
    
    /* Custom tab styling */
    .nav-pills-soft .nav-link {
      color: #6c757d;
      border-radius: 0;
      position: relative;
      font-weight: 500;
    }
    .nav-pills-soft .nav-link.active {
      color: #4361ee;
      background-color: transparent;
    }
    .nav-pills-soft .nav-link.active::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      right: 0;
      height: 2px;
      background-color: #4361ee;
    }
    
    /* Scrollbar utilities */
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    
    /* Image utilities */
    .object-fit-cover {
      object-fit: cover;
    }
    .rounded-start-circle {
      border-top-left-radius: 50%;
      border-bottom-left-radius: 50%;
    }
  `;
  document.head.appendChild(style);

  // ---------------------------
  // Cookie Consent Banner
  // ---------------------------
  const cookieBanner = document.getElementById('cookieConsentBanner');
  const acceptButton = document.getElementById('acceptCookies');
  const settingsButton = document.getElementById('cookieSettings');

  if (cookieBanner && acceptButton && settingsButton) {
    // Only show banner if consent not given
    cookieBanner.style.display = localStorage.getItem('cookieConsent') ? 'none' : 'block';

    // Accept button handler
    acceptButton.addEventListener('click', function() {
      localStorage.setItem('cookieConsent', 'accepted');
      cookieBanner.style.display = 'none';
    });

    // Settings button handler
    settingsButton.addEventListener('click', function() {
      window.location.href = 'cookies.html#managing-cookies';
    });
  }

  // ---------------------------
  // FAQ Functionality
  // ---------------------------
  const faqSearch = document.getElementById('faqSearch');
  if (faqSearch) {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    // Search functionality
    faqSearch.addEventListener('input', function() {
      const term = this.value.toLowerCase();
      
      accordionItems.forEach(item => {
        const question = item.querySelector('.accordion-button').textContent.toLowerCase();
        const answer = item.querySelector('.accordion-body').textContent.toLowerCase();
        item.style.display = (question.includes(term) || answer.includes(term)) 
          ? '' 
          : 'none';
      });
    });

    // Category link smooth scrolling
    document.querySelectorAll('.category-link').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.hash);
        window.scrollTo({
          top: target.offsetTop - 100,
          behavior: 'smooth'
        });
      });
    });
  }

  // ---------------------------
  // Deadline Toggle
  // ---------------------------
  const deadlineCheckbox = document.getElementById('deadline');
  if (deadlineCheckbox) {
    const deadlineDetails = document.querySelector('.deadline-details');
    deadlineCheckbox.addEventListener('change', function() {
      deadlineDetails?.classList.toggle('d-none', !this.checked);
    });
  }

  // ---------------------------
  // Pricing Toggle (Monthly/Annual)
  // ---------------------------
  const monthlyBtn = document.getElementById('monthlyBtn');
  const annualBtn = document.getElementById('annualBtn');
  const pricingPlans = document.getElementById('pricingPlans');

  if (monthlyBtn && annualBtn && pricingPlans) {
    // Pricing data
    const pricingData = {
      monthly: [
        { price: '$0', period: 'Forever free' },
        { price: '$99', period: 'per month' },
        { price: '$499', period: 'per month' }
      ],
      annual: [
        { price: '$0', period: 'Forever free' },
        { price: '$79', period: 'per month, billed annually' },
        { price: '$399', period: 'per month, billed annually' }
      ]
    };

    // Update pricing display
    function updatePricing(type) {
      const pricingElements = pricingPlans.querySelectorAll('.pricing-value');
      pricingData[type].forEach((data, i) => {
        if (pricingElements[i]) {
          pricingElements[i].querySelector('h2').textContent = data.price;
          pricingElements[i].querySelector('p').textContent = data.period;
        }
      });
    }

    // Button event handlers
    monthlyBtn.addEventListener('click', function() {
      monthlyBtn.classList.replace('btn-outline-primary', 'btn-primary');
      annualBtn.classList.replace('btn-primary', 'btn-outline-primary');
      updatePricing('monthly');
    });

    annualBtn.addEventListener('click', function() {
      annualBtn.classList.replace('btn-outline-primary', 'btn-primary');
      monthlyBtn.classList.replace('btn-primary', 'btn-outline-primary');
      updatePricing('annual');
    });

    // Initialize with monthly pricing
    updatePricing('monthly');
  }
});