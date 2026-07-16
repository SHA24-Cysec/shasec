/**
 * ShaSec — Back to Top button
 * Fix #09: Dikonversi dari ES6 (arrow/const) ke ES5 agar konsisten
 * dengan gaya seluruh file JS lain (main.js, nav.js, search.js, dll.)
 */
(function () {
  'use strict';

  function init() {
    var btt = document.getElementById('backToTop');
    if (!btt) return;

    function updateProgress() {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

      var p = 0;
      if (docHeight > 0) {
        p = scrollTop / docHeight;
      }

      if (scrollTop > 100) {
        btt.classList.add('show');
      } else {
        btt.classList.remove('show');
      }

      btt.style.setProperty('--p', p);
    }

    window.addEventListener('scroll', function () {
      window.requestAnimationFrame(updateProgress);
    }, { passive: true });

    btt.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    updateProgress();
  }

  if (window.ShaSec && typeof window.ShaSec.ready === 'function') {
    window.ShaSec.ready(init);
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
