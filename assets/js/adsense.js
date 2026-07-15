/**
 * ShaSec — load Google AdSense only after cookie consent accepted
 * and only when not in placeholder mode (data-adsense-mode="live").
 */
(function () {
  'use strict';

  var loaded = false;

  function cfg() {
    var el = document.getElementById('shasec-adsense-config');
    if (!el) return null;
    try {
      return JSON.parse(el.textContent);
    } catch (e) {
      return null;
    }
  }

  function hasLiveSlots() {
    return !!document.querySelector('.ad-slot[data-ad-live="true"]');
  }

  function loadScript(client) {
    if (loaded || !client) return;
    if (document.querySelector('script[data-shasec-adsense]')) {
      loaded = true;
      return;
    }
    loaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src =
      'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' +
      encodeURIComponent(client);
    s.crossOrigin = 'anonymous';
    s.setAttribute('data-shasec-adsense', '1');
    document.head.appendChild(s);
  }

  function onConsent(value) {
    var c = cfg();
    if (!c || !c.enabled) return;
    if (c.placeholder) return; // demo placeholders only
    if (!c.client) return;
    if (value !== 'accepted') return;
    if (!hasLiveSlots()) return;
    loadScript(c.client);
  }

  function init() {
    var c = cfg();
    if (!c || !c.enabled) return;

    var current =
      document.documentElement.getAttribute('data-consent') || '';
    if (current) onConsent(current);

    window.addEventListener('shasec:consent', function (e) {
      var value = e.detail && e.detail.value;
      onConsent(value);
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
