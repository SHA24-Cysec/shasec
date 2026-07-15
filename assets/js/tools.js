/**
 * ShaSec — tools page filter (category chips + text search)
 */
(function () {
  'use strict';

  function init() {
    var grid = document.getElementById('tools-grid');
    if (!grid) return;

    var items = Array.prototype.slice.call(
      grid.querySelectorAll('[data-tools-item]')
    );
    var chips = Array.prototype.slice.call(
      document.querySelectorAll('[data-tools-filter]')
    );
    var input = document.getElementById('tools-search');
    var status = document.getElementById('tools-status');
    var empty = document.getElementById('tools-empty');
    var activeCat = 'all';

    function setHidden(el, hide) {
      if (!el) return;
      if (hide) {
        el.setAttribute('hidden', '');
        el.hidden = true;
        el.classList.add('hidden');
      } else {
        el.removeAttribute('hidden');
        el.hidden = false;
        el.classList.remove('hidden');
      }
    }

    function apply() {
      var q = ((input && input.value) || '').trim().toLowerCase();
      var visible = 0;

      items.forEach(function (el) {
        var cat = el.getAttribute('data-category') || '';
        var blob = el.getAttribute('data-search') || '';
        var catOk = activeCat === 'all' || cat === activeCat;
        var qOk = !q || blob.indexOf(q) !== -1;
        var show = catOk && qOk;
        el.style.display = show ? '' : 'none';
        el.setAttribute('aria-hidden', show ? 'false' : 'true');
        if (show) visible += 1;
      });

      if (status) {
        if (q || activeCat !== 'all') {
          status.textContent = 'Menampilkan ' + visible + ' tools (filter aktif)';
        } else {
          status.textContent = 'Menampilkan ' + visible + ' tools';
        }
      }
      setHidden(empty, visible !== 0);
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        activeCat = chip.getAttribute('data-tools-filter') || 'all';
        chips.forEach(function (c) {
          var on = c === chip;
          c.classList.toggle('is-active', on);
          c.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        apply();
      });
    });

    if (input) {
      var t;
      input.addEventListener('input', function () {
        clearTimeout(t);
        t = setTimeout(apply, 120);
      });
    }

    apply();
  }

  if (window.ShaSec && typeof window.ShaSec.ready === 'function') {
    window.ShaSec.ready(init);
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
