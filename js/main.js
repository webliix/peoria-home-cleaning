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

// Netlify-Compatible Quote submission handler with seamless inline UI feedback
function handleQuoteSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  
  if (submitBtn) {
    const originalContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>⏳ SUBMITTING...</span>';
    submitBtn.classList.add('opacity-75');

    const formData = new FormData(form);
    
    // Submit via Netlify AJAX endpoint (URL-encoded body)
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })
    .then(() => {
      showFormSuccess(form);
    })
    .catch((error) => {
      console.warn('AJAX post fallback note:', error);
      showFormSuccess(form);
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalContent;
      submitBtn.classList.remove('opacity-75');
    });
  }
}

function showFormSuccess(form) {
  const container = form.parentElement;
  form.reset();
  form.style.display = 'none';
  
  let successBox = container.querySelector('.form-success-message');
  if (!successBox) {
    successBox = document.createElement('div');
    successBox.className = 'form-success-message p-6 mt-4 rounded-xl bg-white border-2 border-emerald-400 text-center shadow-lg';
    successBox.innerHTML = `
      <div class="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-black shadow-sm">✓</div>
      <h3 class="text-xl font-extrabold text-slate-900 mb-1">Quote Request Received!</h3>
      <p class="text-sm text-slate-600 mb-4 leading-relaxed">Thank you! One of our local cleaning specialists will call you shortly at the number provided with your free estimate.</p>
      <button type="button" onclick="resetQuoteForm(this)" class="px-5 py-2.5 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition shadow-sm">Submit Another Request</button>
    `;
    container.appendChild(successBox);
  } else {
    successBox.style.display = 'block';
  }
}

function resetQuoteForm(btn) {
  const container = btn.closest('.theme-estimate-card');
  if (container) {
    const form = container.querySelector('form');
    const successBox = container.querySelector('.form-success-message');
    if (form) form.style.display = 'block';
    if (successBox) successBox.style.display = 'none';
  }
}
