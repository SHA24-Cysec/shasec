/**
 * ShaSec — shared bootstrap
 * Global namespace for feature modules (nav, hero-terminal, contact-form).
 */
(function (window) {
  'use strict';

  var ShaSec = window.ShaSec || {};

  ShaSec.ready = function (fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  };

  ShaSec.prefersReducedMotion = function () {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  window.ShaSec = ShaSec;
})(window);
