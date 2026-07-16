/**
 * ShaSec — article share helpers
 * - Copy link
 * - Native Web Share API (when available)
 */
(function () {
  'use strict';

  function initShare() {
    var roots = document.querySelectorAll('[data-share-root]');
    if (!roots.length) return;

    var canNative =
      typeof navigator !== 'undefined' && typeof navigator.share === 'function';

    roots.forEach(function (root) {
      var url = root.getAttribute('data-share-url') || window.location.href;
      var title = root.getAttribute('data-share-title') || document.title;
      var text = root.getAttribute('data-share-text') || title;
      var feedback = root.querySelector('[data-share-feedback]');
      var copyBtn = root.querySelector('[data-share-copy]');
      var nativeBtn = root.querySelector('[data-share-native]');

      function showFeedback(msg) {
        if (!feedback) return;
        feedback.textContent = msg;
        feedback.hidden = false;
        feedback.classList.remove('hidden');
        window.clearTimeout(root._shareTimer);
        root._shareTimer = window.setTimeout(function () {
          feedback.hidden = true;
          feedback.classList.add('hidden');
          feedback.textContent = '';
        }, 2200);
      }

      if (copyBtn) {
        copyBtn.addEventListener('click', function () {
          var done = function () {
            showFeedback(copyBtn.getAttribute('data-copied-msg') || ''); /* P3-5: fallback kosong — data-copied-msg selalu diisi dari i18n share_copied */
            copyBtn.classList.add('is-copied');
            window.setTimeout(function () {
              copyBtn.classList.remove('is-copied');
            }, 1200);
          };
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url).then(done).catch(function () {
              fallbackCopy(url, done);
            });
          } else {
            fallbackCopy(url, done);
          }
        });
        // i18n message via data attribute set in HTML if present
        var copied = root.getAttribute('data-share-copied');
        if (copied) copyBtn.setAttribute('data-copied-msg', copied);
      }

      if (nativeBtn) {
        if (canNative) {
          nativeBtn.hidden = false;
          nativeBtn.classList.remove('hidden');
          nativeBtn.addEventListener('click', function () {
            navigator
              .share({ title: title, text: text, url: url })
              .catch(function () {
                /* user cancelled */
              });
          });
        } else {
          nativeBtn.hidden = true;
          nativeBtn.classList.add('hidden');
        }
      }
    });
  }

  function fallbackCopy(text, done) {
    try {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      if (done) done();
    } catch (e) {
      /* ignore */
    }
  }

  if (window.ShaSec && typeof window.ShaSec.ready === 'function') {
    window.ShaSec.ready(initShare);
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initShare);
  } else {
    initShare();
  }
})();
