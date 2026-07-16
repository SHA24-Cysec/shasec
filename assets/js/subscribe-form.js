/**
 * ShaSec — newsletter subscribe → Formspree (AJAX + inline status)
 */
(function () {
  'use strict';

  function initSubscribeForm() {
    var form = document.getElementById('subscribe-form');
    var note = document.getElementById('subscribe-form-note');
    var submitBtn = document.getElementById('subscribe-submit');
    var submitLabel = form && form.querySelector('.subscribe-submit-label');
    if (!form) return;

    var configured = form.getAttribute('data-subscribe-configured') === 'true';
    var successMsg =
      form.getAttribute('data-success-message') ||
      '';
    var errorMsg =
      form.getAttribute('data-error-message') ||
      '';
    var pendingMsg =
      form.getAttribute('data-pending-message') ||
      ''; /* P3-4: fallback kosong — data-pending-message selalu diisi oleh Hugo template */

    function setNote(text, kind) {
      if (!note) return;
      note.textContent = text;
      note.classList.remove('form-note--ok', 'form-note--warn', 'form-note--error');
      if (kind === 'ok') note.classList.add('form-note--ok');
      if (kind === 'warn') note.classList.add('form-note--warn');
      if (kind === 'error') note.classList.add('form-note--error');
    }

    function setLoading(loading) {
      if (!submitBtn) return;
      submitBtn.disabled = loading;
      submitBtn.classList.toggle('is-loading', loading);
      form.classList.toggle('is-submitting', loading);
      if (submitLabel) {
        submitLabel.textContent = loading
          ? (form.getAttribute('data-subscribe-loading') || '')
          : (form.getAttribute('data-subscribe-label') || '');
      }
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        setNote(form.getAttribute('data-invalid-note') || '', 'warn');
        return;
      }

      if (!configured) {
        setNote(pendingMsg, 'warn');
        return;
      }

      var endpoint = form.getAttribute('action') || '';
      if (!endpoint || endpoint === '#') {
        setNote(pendingMsg, 'warn');
        return;
      }

      setLoading(true);
      setNote(form.getAttribute('data-submitting-note') || '', null);

      var data = new FormData(form);
      if (data.get('email') && !data.get('_replyto')) {
        data.set('_replyto', data.get('email'));
      }

      fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      })
        .then(function (res) {
          return res
            .json()
            .catch(function () {
              return {};
            })
            .then(function (body) {
              return { ok: res.ok, status: res.status, body: body };
            });
        })
        .then(function (result) {
          if (result.ok) {
            setNote(successMsg, 'ok');
            form.reset();
            return;
          }
          var msg = errorMsg;
          if (result.body && result.body.errors && result.body.errors.length) {
            msg =
              result.body.errors
                .map(function (err) {
                  return err.message || err;
                })
                .join(' ') || errorMsg;
          } else if (result.body && result.body.error) {
            msg = result.body.error;
          }
          setNote(msg, 'error');
        })
        .catch(function () {
          setNote(errorMsg, 'error');
        })
        .finally(function () {
          setLoading(false);
        });
    });
  }

  if (window.ShaSec && typeof window.ShaSec.ready === 'function') {
    window.ShaSec.ready(initSubscribeForm);
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSubscribeForm);
  } else {
    initSubscribeForm();
  }
})();
