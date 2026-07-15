/**
 * ShaSec — smooth in-page anchor scrolling
 * - Offsets sticky header via scroll-padding-top (CSS)
 * - Respects prefers-reduced-motion
 * - Uses native smooth scroll when available
 */
(function () {
  'use strict';

  function prefersReducedMotion() {
    if (window.ShaSec && typeof window.ShaSec.prefersReducedMotion === 'function') {
      return window.ShaSec.prefersReducedMotion();
    }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function headerOffset() {
    var header = document.querySelector('.site-header');
    if (!header) return 0;
    return Math.ceil(header.getBoundingClientRect().height || 0);
  }

  function syncScrollPadding() {
    var offset = headerOffset();
    // keep room under sticky header for hash targets
    document.documentElement.style.scrollPaddingTop = offset + 12 + 'px';
  }

  function samePageAnchor(anchor) {
    if (!anchor || anchor.tagName !== 'A') return null;
    var href = anchor.getAttribute('href');
    if (!href || href.charAt(0) !== '#') return null;
    if (href === '#' || href === '#!') return null;
    try {
      // Ignore external absolute URLs that only look local
      if (anchor.hasAttribute('download')) return null;
      if (anchor.getAttribute('target') === '_blank') return null;
    } catch (e) {
      /* ignore */
    }
    return href.slice(1);
  }

  function scrollToId(id, updateHash) {
    if (!id) return false;
    var el = null;
    try {
      el = document.getElementById(id) || document.getElementsByName(id)[0];
    } catch (e) {
      return false;
    }
    if (!el) return false;

    var reduce = prefersReducedMotion();
    var top = el.getBoundingClientRect().top + window.pageYOffset - headerOffset() - 8;

    window.scrollTo({
      top: Math.max(0, top),
      behavior: reduce ? 'auto' : 'smooth'
    });

    if (updateHash !== false) {
      try {
        history.pushState(null, '', '#' + id);
      } catch (e) {
        /* ignore */
      }
    }

    // Improve a11y focus without heavy outline flash on mouse users
    if (typeof el.focus === 'function') {
      var prevTab = el.getAttribute('tabindex');
      if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
      try {
        el.focus({ preventScroll: true });
      } catch (e) {
        el.focus();
      }
      if (prevTab === null) {
        // keep tabindex for subsequent focus if needed; leave -1
      }
    }
    return true;
  }

  function onClick(e) {
    if (e.defaultPrevented) return;
    if (e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    var anchor = e.target && e.target.closest ? e.target.closest('a[href^="#"]') : null;
    var id = samePageAnchor(anchor);
    if (!id) return;

    if (scrollToId(id, true)) {
      e.preventDefault();
      // close mobile nav if open
      var panel = document.getElementById('mobile-nav');
      var toggle = document.getElementById('nav-toggle');
      if (panel && toggle && toggle.getAttribute('aria-expanded') === 'true') {
        toggle.click();
      }
    }
  }

  function init() {
    syncScrollPadding();
    window.addEventListener('resize', syncScrollPadding, { passive: true });
    document.addEventListener('click', onClick, false);

    // Honor existing hash on load
    if (window.location.hash && window.location.hash.length > 1) {
      var id = window.location.hash.slice(1);
      // Delay until layout/fonts settle slightly
      window.setTimeout(function () {
        scrollToId(id, false);
      }, 50);
    }
  }

  if (window.ShaSec && typeof window.ShaSec.ready === 'function') {
    window.ShaSec.ready(init);
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
