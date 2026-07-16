/**
 * ShaSec — contact form → Formspree (AJAX + inline status)
 */
(function () {
  'use strict';

  function initContactForm() {
    var form = document.getElementById('contact-form');
    var note = document.getElementById('contact-form-note');
    var submitBtn = document.getElementById('contact-submit');
    var submitLabel = form && form.querySelector('.contact-submit-label');
    if (!form) return;

    var configured = form.getAttribute('data-contact-configured') === 'true';
    var successMsg =
      form.getAttribute('data-success-message') ||
      '';
    var errorMsg =
      form.getAttribute('data-error-message') ||
      '';
    var pendingMsg =
      form.getAttribute('data-pending-message') ||
      'Formspree belum dikonfigurasi.';

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
          ? (form.getAttribute('data-send-loading') || '')
          : (form.getAttribute('data-send-label') || '');
      }
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        setNote(form.getAttribute('data-required-note') || '', 'warn');
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
      setNote('Mengirim pesan…', null);

      var data = new FormData(form);
      // Help Formspree set reply-to
      if (data.get('email') && !data.get('_replyto')) {
        data.set('_replyto', data.get('email'));
      }

      fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json'
        }
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
    window.ShaSec.ready(initContactForm);
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForm);
  } else {
    initContactForm();
  }
})();
