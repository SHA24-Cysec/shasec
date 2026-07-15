/**
 * ShaSec — mobile navigation toggle
 */
(function () {
  'use strict';

  function initNav() {
    var toggle = document.getElementById('nav-toggle');
    var panel = document.getElementById('mobile-nav');
    var iconOpen = document.getElementById('nav-icon-open');
    var iconClose = document.getElementById('nav-icon-close');
    if (!toggle || !panel) return;

    function setOpen(open) {
      panel.classList.toggle('hidden', !open);
      if (open) {
        panel.removeAttribute('hidden');
      } else {
        panel.setAttribute('hidden', '');
      }
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
      if (iconOpen && iconClose) {
        iconOpen.classList.toggle('hidden', open);
        iconClose.classList.toggle('hidden', !open);
      }
    }

    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') !== 'true';
      setOpen(open);
    });

    panel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setOpen(false);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  if (window.ShaSec && typeof window.ShaSec.ready === 'function') {
    window.ShaSec.ready(initNav);
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNav);
  } else {
    initNav();
  }
})();
