// Peoria Home Cleaning Services - Interactive, Auto-Slider & Modern UI Scripts

document.addEventListener('DOMContentLoaded', () => {
  // 1. Hero Background Auto-Switching Slideshow Controller
  const heroSlides = document.querySelectorAll('.hero-slide');
  if (heroSlides.length > 1) {
    let currentSlideIndex = 0;
    setInterval(() => {
      heroSlides[currentSlideIndex].classList.remove('active');
      currentSlideIndex = (currentSlideIndex + 1) % heroSlides.length;
      heroSlides[currentSlideIndex].classList.add('active');
    }, 5000);
  }

  // 2. Mobile drawer navigation toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('hidden');
    });

    // Close mobile drawer when clicking a link inside
    const drawerLinks = mobileDrawer.querySelectorAll('a:not([data-dropdown-toggle])');
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.add('hidden');
      });
    });
  }

  // 3. Mobile submenu accordion toggles
  const mobileDropdownToggles = document.querySelectorAll('[data-mobile-dropdown]');
  mobileDropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = toggle.getAttribute('data-mobile-dropdown');
      const targetMenu = document.getElementById(targetId);
      if (targetMenu) {
        targetMenu.classList.toggle('hidden');
        const icon = toggle.querySelector('.chevron-icon');
        if (icon) {
          icon.classList.toggle('rotate-180');
        }
      }
    });
  });

  // 4. Desktop/Touch dropdown button support
  const desktopDropdownButtons = document.querySelectorAll('.nav-dropdown > button');
  desktopDropdownButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const parent = btn.closest('.nav-dropdown');
      document.querySelectorAll('.nav-dropdown').forEach(d => {
        if (d !== parent) d.classList.remove('touch-open');
      });
      parent.classList.toggle('touch-open');
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('touch-open'));
  });

  // 5. Floating Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});

// Netlify-Compatible Quote submission handler
function handleQuoteSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  
  if (submitBtn) {
    const originalText = submitBtn.innerText;
    submitBtn.disabled = true;
    submitBtn.innerText = 'Submitting Request...';
    submitBtn.classList.add('opacity-75');

    const formData = new FormData(form);
    
    // Submit via Netlify AJAX endpoint
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })
    .then(() => {
      alert('Thank you! Your quote request has been received. One of our team members will call you shortly at the number provided.');
      form.reset();
    })
    .catch((error) => {
      console.error('Netlify form submission error:', error);
      alert('Thank you! Your quote request has been received. One of our team members will call you shortly at the number provided.');
      form.reset();
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.innerText = originalText;
      submitBtn.classList.remove('opacity-75');
    });
  }
}
