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
      var navOpenLabel = toggle.getAttribute('data-label-open') || '';
      var navClosedLabel = toggle.getAttribute('data-label-closed') || '';
      toggle.setAttribute('aria-label', open ? navOpenLabel : navClosedLabel);
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

  /* ─────────────────────────────────────────────────────────────
   * Fix: Search bar navbar scroll ke atas saat mengetik
   *
   * Root cause:
   *   html { scroll-padding-top: ~76px } membuat browser mengira
   *   input di sticky header butuh ruang 76px di atasnya.
   *   Padahal input sudah berada di dalam header itu sendiri,
   *   sehingga browser scroll halaman ke atas setiap keystroke.
   *
   * Solusi:
   *   Set scroll-padding-top = 0 saat input navbar aktif (focus),
   *   pulihkan kembali saat selesai (blur) agar anchor-link
   *   scroll tetap berfungsi normal.
   * ───────────────────────────────────────────────────────────── */
  (function () {
    'use strict';

    function initSearchScrollFix() {
      var ids = ['site-search', 'site-search-mobile'];
      ids.forEach(function (id) {
        var el = document.getElementById(id);
        if (!el) return;

        el.addEventListener('focus', function () {
          document.documentElement.style.scrollPaddingTop = '0px';
        });

        el.addEventListener('blur', function () {
          var header = document.querySelector('.site-header');
          var offset = header ? Math.ceil(header.getBoundingClientRect().height) : 64;
          document.documentElement.style.scrollPaddingTop = (offset + 12) + 'px';
        });
      });
    }

    if (window.ShaSec && typeof window.ShaSec.ready === 'function') {
      window.ShaSec.ready(initSearchScrollFix);
    } else if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initSearchScrollFix);
    } else {
      initSearchScrollFix();
    }
  })();
})();
