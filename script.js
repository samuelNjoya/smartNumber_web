/* ============================================
   SmartNumber — Landing interactions
   Minimal. Pas d'animation gratuite.
   ============================================ */

(function () {
  'use strict';

  // --- Smooth scroll pour les ancres (fallback si CSS scroll-behavior absent) ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // --- Reveal on scroll : léger, une seule fois par élément ---
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.feature, .screen-item').forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });

    // Injecte la classe d'état visible
    var style = document.createElement('style');
    style.textContent = '.is-visible { opacity: 1 !important; transform: none !important; }';
    document.head.appendChild(style);
  }
})();