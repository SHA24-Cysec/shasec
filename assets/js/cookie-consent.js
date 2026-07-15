/**
 * ShaSec — cookie consent banner
 * Stores choice in localStorage; dispatches "shasec:consent" for ads loader.
 */
(function () {
  'use strict';

  var STORAGE_DEFAULT = 'shasec_cookie_consent';

  function init() {
    var banner = document.getElementById('cookie-consent');
    if (!banner) return;

    var key = banner.getAttribute('data-storage-key') || STORAGE_DEFAULT;
    var existing = null;
    try {
      existing = localStorage.getItem(key);
    } catch (e) {
      existing = null;
    }

    function hide() {
      banner.setAttribute('hidden', '');
      banner.classList.remove('is-visible');
      document.body.classList.remove('has-cookie-banner');
    }

    function show() {
      banner.removeAttribute('hidden');
      banner.classList.add('is-visible');
      document.body.classList.add('has-cookie-banner');
    }

    function save(value) {
      try {
        localStorage.setItem(key, value);
      } catch (e) {
        /* ignore quota / private mode */
      }
      document.documentElement.setAttribute('data-consent', value);
      window.dispatchEvent(
        new CustomEvent('shasec:consent', { detail: { value: value, key: key } })
      );
      hide();
    }

    if (existing === 'accepted' || existing === 'rejected') {
      document.documentElement.setAttribute('data-consent', existing);
      hide();
      // Notify late listeners (ads) on load
      window.dispatchEvent(
        new CustomEvent('shasec:consent', {
          detail: { value: existing, key: key, initial: true }
        })
      );
    } else {
      show();
    }

    banner.querySelectorAll('[data-cookie-action]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var action = btn.getAttribute('data-cookie-action');
        if (action === 'accept') save('accepted');
        else if (action === 'reject') save('rejected');
      });
    });
  }

  if (window.ShaSec && typeof window.ShaSec.ready === 'function') {
    window.ShaSec.ready(init);
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
