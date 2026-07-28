/* ShaSec — copy controls for fenced code blocks in article content. */
(function () {
  'use strict';

  var dictionary = {
    id: { code: 'Kode', copy: 'Salin kode', copied: 'Tersalin' },
    en: { code: 'Code', copy: 'Copy code', copied: 'Copied' }
  };

  function strings() {
    return dictionary[(document.documentElement.lang || 'id').split('-')[0]] || dictionary.id;
  }

  function languageName(code, fallback) {
    var lang = (code.getAttribute('data-lang') || '').trim().toLowerCase();
    if (!lang) {
      var match = (code.className || '').match(/language-([\w+-]+)/i);
      lang = match ? match[1].toLowerCase() : '';
    }

    var names = {
      bash: 'Bash', shell: 'Shell', sh: 'Shell', zsh: 'Zsh',
      powershell: 'PowerShell', ps1: 'PowerShell', xml: 'XML',
      html: 'HTML', css: 'CSS', javascript: 'JavaScript', js: 'JavaScript',
      typescript: 'TypeScript', ts: 'TypeScript', json: 'JSON', yaml: 'YAML',
      yml: 'YAML', ini: 'INI', toml: 'TOML', php: 'PHP', python: 'Python',
      py: 'Python', go: 'Go', sql: 'SQL', text: 'Text', plaintext: 'Text'
    };

    return names[lang] || (lang ? lang.toUpperCase() : fallback);
  }

  function fallbackCopy(text, callback) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.cssText = 'position:fixed;opacity:0;pointer-events:none;';
    document.body.appendChild(textarea);
    textarea.select();
    var copied = false;
    try { copied = document.execCommand('copy'); } catch (error) { copied = false; }
    textarea.remove();
    callback(copied);
  }

  function copy(text, callback) {
    if (navigator.clipboard && navigator.clipboard.writeText && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () { callback(true); }, function () { fallbackCopy(text, callback); });
      return;
    }
    fallbackCopy(text, callback);
  }

  function icon(path) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '1.8');
    svg.setAttribute('aria-hidden', 'true');
    svg.classList.add('code-copy-icon');
    var element = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    element.setAttribute('d', path);
    svg.appendChild(element);
    return svg;
  }

  function init() {
    var text = strings();
    document.querySelectorAll('.article-content .highlight').forEach(function (highlight) {
      if (highlight.closest('.code-block')) return;
      var code = highlight.querySelector('pre code');
      if (!code) return;

      var block = document.createElement('section');
      block.className = 'code-block';
      block.setAttribute('aria-label', languageName(code, text.code) + ' ' + text.code);
      highlight.parentNode.insertBefore(block, highlight);
      block.appendChild(highlight);

      var toolbar = document.createElement('div');
      toolbar.className = 'code-block-toolbar';
      var label = document.createElement('span');
      label.className = 'code-block-language';
      label.textContent = languageName(code, text.code);

      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'code-copy-btn';
      button.setAttribute('aria-label', text.copy);
      button.setAttribute('title', text.copy);
      button.appendChild(icon('M8 8h12v12H8zM4 16V4h12'));

      var status = document.createElement('span');
      status.className = 'code-copy-status';
      status.setAttribute('aria-live', 'polite');
      status.hidden = true;

      button.addEventListener('click', function () {
        copy(code.textContent, function (success) {
          if (!success) return;
          button.classList.add('is-copied');
          button.setAttribute('aria-label', text.copied);
          button.setAttribute('title', text.copied);
          button.replaceChildren(icon('m5 12 4.2 4.2L19 6.5'));
          status.textContent = text.copied;
          status.hidden = false;
          window.setTimeout(function () {
            button.classList.remove('is-copied');
            button.setAttribute('aria-label', text.copy);
            button.setAttribute('title', text.copy);
            button.replaceChildren(icon('M8 8h12v12H8zM4 16V4h12'));
            status.hidden = true;
          }, 1800);
        });
      });

      toolbar.appendChild(label);
      toolbar.appendChild(status);
      toolbar.appendChild(button);
      block.insertBefore(toolbar, highlight);
    });
  }

  if (window.ShaSec && window.ShaSec.ready) window.ShaSec.ready(init);
  else document.addEventListener('DOMContentLoaded', init);
})();
