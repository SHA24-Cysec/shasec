/**
 * ShaSec — homepage hero terminal typewriter
 */
(function () {
  'use strict';

  function initHeroTerminal() {
    var root = document.getElementById('hero-terminal-body');
    if (!root) return;

    var lines = [
      { type: 'cmd', text: 'whoami' },
      { type: 'out', text: 'shasec.operator', cls: 'text-shasec-text' },
      { type: 'cmd', text: 'ls ancaman/' },
      { type: 'out', text: 'ransomware', cls: 'text-shasec-primary' },
      { type: 'out', text: 'phishing', cls: 'text-shasec-primary' },
      { type: 'out', text: 'zero-day', cls: 'text-shasec-primary' },
      { type: 'out', text: 'apt-groups', cls: 'text-shasec-primary' },
      { type: 'out', text: 'malware-analysis', cls: 'text-shasec-primary' },
      { type: 'cmd', text: 'stay_secure --selalu' },
      { type: 'out', text: 'Menginisialisasi pertahanan…' },
      { type: 'out', text: 'Feed ancaman diperbarui.' },
      { type: 'out', text: 'Sistem aman.', cls: 'text-shasec-primary' },
      { type: 'prompt' }
    ];

    var promptHtml = '<span class="terminal-prompt">user@shasec:~$</span> ';
    var i = 0;
    var reduceMotion =
      (window.ShaSec && window.ShaSec.prefersReducedMotion && window.ShaSec.prefersReducedMotion()) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function el(tag, className, html) {
      var node = document.createElement(tag);
      if (className) node.className = className;
      if (html != null) node.innerHTML = html;
      return node;
    }

    function typeCommand(full, done) {
      var p = el('p', 'mt-0');
      p.innerHTML = promptHtml + '<span class="terminal-cmd"></span>';
      root.appendChild(p);
      var cmd = p.querySelector('.terminal-cmd');
      if (reduceMotion) {
        cmd.textContent = full;
        done();
        return;
      }
      var n = 0;
      var timer = setInterval(function () {
        n += 1;
        cmd.textContent = full.slice(0, n);
        if (n >= full.length) {
          clearInterval(timer);
          done();
        }
      }, 28);
    }

    function printOut(text, cls, done) {
      var p = el('p', cls || '');
      p.textContent = text;
      root.appendChild(p);
      done();
    }

    function printPrompt() {
      var p = el('p', 'mt-2');
      p.innerHTML = promptHtml + '<span class="terminal-cursor" aria-hidden="true"></span>';
      root.appendChild(p);
    }

    function next() {
      if (i >= lines.length) return;
      var line = lines[i++];
      if (line.type === 'cmd') {
        var gap = reduceMotion ? 0 : 220;
        setTimeout(function () {
          typeCommand(line.text, function () {
            setTimeout(next, reduceMotion ? 0 : 180);
          });
        }, gap);
      } else if (line.type === 'out') {
        setTimeout(function () {
          printOut(line.text, line.cls, function () {
            setTimeout(next, reduceMotion ? 0 : 90);
          });
        }, reduceMotion ? 0 : 60);
      } else if (line.type === 'prompt') {
        setTimeout(printPrompt, reduceMotion ? 0 : 120);
      }
    }

    root.innerHTML = '';
    next();
  }

  if (window.ShaSec && typeof window.ShaSec.ready === 'function') {
    window.ShaSec.ready(initHeroTerminal);
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroTerminal);
  } else {
    initHeroTerminal();
  }
})();
