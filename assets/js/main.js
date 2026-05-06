// ── Nav scroll effect ──────────────────────────────────
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Mobile menu ────────────────────────────────────────
const burger = document.querySelector('.nav-burger');
const mobileMenu = document.querySelector('.nav-mobile');
burger?.addEventListener('click', () => {
  mobileMenu?.classList.toggle('open');
  burger.setAttribute('aria-expanded', mobileMenu?.classList.contains('open'));
});
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target)) mobileMenu?.classList.remove('open');
});

// ── Intersection Observer – fade-in on scroll ──────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// ── Stagger delay for grid children ───────────────────
document.querySelectorAll('.stagger > *').forEach((el, i) => {
  el.style.transitionDelay = `${i * 80}ms`;
});

// ── Language preference storage ────────────────────────
document.querySelectorAll('[data-lang]').forEach(link => {
  link.addEventListener('click', () => {
    try { localStorage.setItem('chordexp_lang', link.dataset.lang); } catch(e) {}
  });
});

// ── Cookie Consent ─────────────────────────────────────
(function() {
  const banner = document.getElementById('cookieBanner');
  if (!banner) return;

  try {
    if (localStorage.getItem('chordexp_cookies')) return;
  } catch(e) {}

  setTimeout(() => { banner.hidden = false; }, 900);

  document.getElementById('cookieAccept')?.addEventListener('click', () => {
    try { localStorage.setItem('chordexp_cookies', 'all'); } catch(e) {}
    banner.hidden = true;
  });

  document.getElementById('cookieDecline')?.addEventListener('click', () => {
    try { localStorage.setItem('chordexp_cookies', 'necessary'); } catch(e) {}
    banner.hidden = true;
  });
})();
