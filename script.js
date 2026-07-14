// =====================================================
// REWIRED — Interactivity
// =====================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Sticky nav CTA vs. hero CTA visibility ---------- */
  const heroCta = document.querySelector('.hero__cta');
  const navCta = document.getElementById('navCta');

  if (heroCta && navCta && 'IntersectionObserver' in window) {
    const ctaObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        navCta.classList.toggle('nav__cta--hidden', entry.isIntersecting);
      });
    }, { threshold: 0.1 });

    ctaObserver.observe(heroCta);
  }

  /* ---------- FAQ accordion (single-open) ---------- */
  const triggers = document.querySelectorAll('.accordion-item__trigger');

  triggers.forEach((trigger) => {
    const panel = trigger.parentElement.nextElementSibling;

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      // Close all
      triggers.forEach((t) => {
        t.setAttribute('aria-expanded', 'false');
        const p = t.parentElement.nextElementSibling;
        p.style.maxHeight = null;
      });

      // Open clicked one if it wasn't already open
      if (!isOpen) {
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Fade-in on scroll ---------- */
  const fadeTargets = document.querySelectorAll(
    '.section, .hero, .founding, .urgency, .final-close'
  );
  fadeTargets.forEach((el) => el.classList.add('fade-in'));

  if ('IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    fadeTargets.forEach((el) => fadeObserver.observe(el));
  } else {
    fadeTargets.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Smooth scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

});
