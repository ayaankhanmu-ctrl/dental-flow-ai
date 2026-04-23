/* ============================================================
   DENTAL FLOW — Global JavaScript
   Covers: sticky nav, mobile menu, scroll animations,
           FAQ accordion, form validation, counter animation
   ============================================================ */

/* ---- Sticky Navigation ---- */
// Adds 'scrolled' class to <nav> after user scrolls 50px
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

/* ---- Mobile Menu Toggle ---- */
// Toggles open/close of the mobile nav overlay
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    // Prevent body scroll when menu is open
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu when a nav link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ---- Scroll-Triggered Animations ---- */
// Elements with [data-animate] fade up when they enter the viewport
const animatedEls = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay for groups of cards
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay * 100);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
animatedEls.forEach(el => observer.observe(el));

/* ---- FAQ Accordion ---- */
// Click a question to expand/collapse its answer
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  if (question) {
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all other open items
      faqItems.forEach(i => i.classList.remove('open'));
      // Toggle current
      if (!isOpen) item.classList.add('open');
    });
  }
});

/* ---- Animated Number Counters ---- */
// Elements with class .counter and a data-target value will count up
function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1800; // ms
  const step     = target / (duration / 16);
  let current    = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString() + (el.dataset.suffix || '');
  }, 16);
}
const counterEls = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
counterEls.forEach(el => counterObserver.observe(el));

/* ---- Contact Form Validation ---- */
// Basic client-side validation — swap for real submission logic as needed
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = contactForm.querySelector('#name');
    const email   = contactForm.querySelector('#email');
    const message = contactForm.querySelector('#message');
    let valid = true;

    // Clear previous errors
    contactForm.querySelectorAll('.field-error').forEach(el => el.remove());

    function showError(field, msg) {
      field.style.borderColor = '#e74c3c';
      const err = document.createElement('span');
      err.className = 'field-error';
      err.style.cssText = 'color:#e74c3c;font-size:0.8rem;margin-top:4px;display:block;';
      err.textContent = msg;
      field.parentNode.appendChild(err);
      valid = false;
    }

    if (!name.value.trim())           showError(name, 'Please enter your name.');
    if (!email.value.includes('@'))   showError(email, 'Please enter a valid email.');
    if (!message.value.trim())        showError(message, 'Please add a message.');

    if (valid) {
      // ---- Replace this block with your real form submission (e.g. fetch to API) ----
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = '✓ Message Sent!';
      btn.style.background = '#27ae60';
      btn.disabled = true;
      contactForm.reset();
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        btn.disabled = false;
      }, 4000);
    }
  });
}

/* ---- Active Nav Link Highlight ---- */
// Highlights the nav link matching the current page
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPath || (currentPath === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});
