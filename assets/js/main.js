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
