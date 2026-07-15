/**
 * ShaSec — client-side search against index.json
 * Robust index URL resolution + ?q= support + live input
 */
(function () {
  'use strict';

  var indexCache = null;
  var indexPromise = null;

  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }

  /**
   * Hide/show reliably.
   * Note: Tailwind .card { display:flex } can override bare [hidden] { display:none }
   * when specificity ties — so we toggle attribute + .hidden class together.
   */
  function setHidden(el, hide) {
    if (!el) return;
    if (hide) {
      el.setAttribute('hidden', '');
      el.hidden = true;
      el.classList.add('hidden');
      el.setAttribute('aria-hidden', 'true');
    } else {
      el.removeAttribute('hidden');
      el.hidden = false;
      el.classList.remove('hidden');
      el.removeAttribute('aria-hidden');
    }
  }

  function getConfig() {
    var el = document.getElementById('shasec-search-config');
    if (!el) return {};
    try {
      return JSON.parse(el.textContent);
    } catch (e) {
      return {};
    }
  }

  function getQuery() {
    try {
      return (new URLSearchParams(window.location.search).get('q') || '').trim();
    } catch (e) {
      return '';
    }
  }

  function setQueryInUrl(q, replace) {
    try {
      var url = new URL(window.location.href);
      if (q) url.searchParams.set('q', q);
      else url.searchParams.delete('q');
      if (replace) window.history.replaceState({}, '', url);
      else window.history.pushState({}, '', url);
    } catch (e) {
      /* ignore */
    }
  }

  function normalize(s) {
    return (s || '')
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function tokenize(q) {
    return normalize(q)
      .split(/[\s,.;:!?/\\|+_-]+/)
      .filter(function (t) {
        return t.length > 1;
      });
  }

  function scoreItem(item, tokens) {
    if (!tokens.length) return 0;
    var title = normalize(item.title);
    var summary = normalize(item.summary);
    var content = normalize(item.content);
    var cats = normalize((item.categories || []).join(' '));
    var section = normalize(item.section);
    var score = 0;
    var matched = 0;

    tokens.forEach(function (t) {
      var hit = false;
      if (title.indexOf(t) !== -1) {
        score += title.indexOf(t) === 0 ? 12 : 8;
        hit = true;
      }
      if (cats.indexOf(t) !== -1) {
        score += 5;
        hit = true;
      }
      if (section.indexOf(t) !== -1) {
        score += 3;
        hit = true;
      }
      if (summary.indexOf(t) !== -1) {
        score += 4;
        hit = true;
      }
      if (content.indexOf(t) !== -1) {
        score += 2;
        hit = true;
      }
      if (hit) matched += 1;
    });

    if (matched === 0) return 0;
    score += matched * 3;
    if (matched === tokens.length) score += 5;
    return score;
  }

  function excerptAround(text, tokens, maxLen) {
    maxLen = maxLen || 160;
    var plain = (text || '').replace(/\s+/g, ' ').trim();
    if (!plain) return '';
    var lower = normalize(plain);
    var idx = -1;
    for (var i = 0; i < tokens.length; i++) {
      idx = lower.indexOf(tokens[i]);
      if (idx !== -1) break;
    }
    if (idx === -1) {
      return plain.length > maxLen ? plain.slice(0, maxLen).trim() + '…' : plain;
    }
    var start = Math.max(0, idx - 40);
    var slice = plain.slice(start, start + maxLen);
    if (start > 0) slice = '…' + slice;
    if (start + maxLen < plain.length) slice = slice.trim() + '…';
    return slice;
  }

  function escapeHtml(s) {
    return (s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function highlight(text, tokens) {
    var safe = escapeHtml(text);
    if (!tokens.length) return safe;
    var sorted = tokens.slice().sort(function (a, b) {
      return b.length - a.length;
    });
    sorted.forEach(function (t) {
      if (t.length < 2) return;
      var re = new RegExp(
        '(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')',
        'ig'
      );
      safe = safe.replace(re, '<mark class="search-mark">$1</mark>');
    });
    return safe;
  }

  function candidateIndexUrls() {
    var cfg = getConfig();
    var list = [];
    if (cfg.indexUrl) list.push(cfg.indexUrl);
    if (cfg.indexUrlAbs) list.push(cfg.indexUrlAbs);
    list.push('/index.json');
    list.push('index.json');
    list.push('../index.json');

    var baseEl = document.querySelector('base');
    if (baseEl && baseEl.href) {
      try {
        list.push(new URL('index.json', baseEl.href).href);
      } catch (e) {
        /* ignore */
      }
    }

    try {
      var path = window.location.pathname || '/';
      var parts = path.split('/').filter(Boolean);
      if (parts.length && (parts[parts.length - 1] === 'search' || parts[parts.length - 1] === 'index.html')) {
        if (parts[parts.length - 1] === 'index.html') parts.pop();
        if (parts.length && parts[parts.length - 1] === 'search') parts.pop();
      }
      if (parts.length) {
        list.push('/' + parts.join('/') + '/index.json');
      }
    } catch (e) {
      /* ignore */
    }

    var seen = {};
    return list.filter(function (u) {
      if (!u || seen[u]) return false;
      seen[u] = true;
      return true;
    });
  }

  function fetchJson(url) {
    return fetch(url, {
      method: 'GET',
      credentials: 'same-origin',
      headers: { Accept: 'application/json, text/plain, */*' },
      cache: 'no-cache'
    }).then(function (res) {
      if (!res.ok) {
        var err = new Error('HTTP ' + res.status + ' for ' + url);
        err.status = res.status;
        err.url = url;
        throw err;
      }
      return res.json().then(function (data) {
        if (!Array.isArray(data)) {
          throw new Error('Index is not an array from ' + url);
        }
        return data;
      });
    });
  }

  function filterIndex(data) {
    var cfg = getConfig();
    var sections = cfg.includeSections;
    // Prefer server-filtered index; client filter as safety net
    if (!sections || !sections.length) {
      sections = ['articles'];
    }
    return (data || []).filter(function (item) {
      if (!item) return false;
      var sec = item.section || '';
      // allow explicit type/section articles
      if (sections.indexOf(sec) !== -1) return true;
      // fallback: permalink under /articles/
      var p = item.permalink || '';
      return p.indexOf('/articles/') !== -1;
    });
  }

  function loadIndex() {
    if (indexCache) return Promise.resolve(indexCache);
    if (indexPromise) return indexPromise;

    var urls = candidateIndexUrls();

    function tryAt(i) {
      if (i >= urls.length) {
        return Promise.reject(
          new Error('All index URLs failed: ' + urls.join(' | '))
        );
      }
      return fetchJson(urls[i]).catch(function () {
        return tryAt(i + 1);
      });
    }

    indexPromise = tryAt(0)
      .then(function (data) {
        indexCache = filterIndex(data);
        return indexCache;
      })
      .catch(function (err) {
        indexPromise = null; // allow retry later
        throw err;
      });

    return indexPromise;
  }

  function renderResults(items, tokens, q) {
    var root = qs('#search-results');
    var empty = qs('#search-empty');
    var meta = qs('#search-meta');
    var status = qs('#search-status');
    if (!root) return;

    root.innerHTML = '';
    setHidden(status, true);
    if (status) status.textContent = '';

    // Default: never show empty state unless zero hits
    setHidden(empty, true);

    if (!q) {
      if (meta) {
        setHidden(meta, false);
        meta.textContent = 'Ketik kata kunci untuk mencari.';
      }
      setHidden(root, true);
      return;
    }

    if (!tokens.length) {
      if (meta) {
        setHidden(meta, false);
        meta.textContent = 'Kata kunci terlalu pendek (min. 2 huruf).';
      }
      setHidden(root, true);
      return;
    }

    if (!items.length) {
      if (meta) {
        setHidden(meta, false);
        meta.textContent = '0 hasil untuk “' + q + '”';
      }
      setHidden(empty, false); // only here
      setHidden(root, true);
      return;
    }

    // Has results — force-hide empty state
    setHidden(empty, true);
    setHidden(root, false);
    if (meta) {
      setHidden(meta, false);
      meta.textContent = items.length + ' hasil untuk “' + q + '”';
    }

    var frag = document.createDocumentFragment();
    items.forEach(function (item) {
      var article = document.createElement('article');
      article.className = 'search-result card';

      var cats = (item.categories || []).slice(0, 2);
      var badgeHtml = cats
        .map(function (c) {
          return '<span class="badge">' + escapeHtml(c) + '</span>';
        })
        .join('');

      var snippet = excerptAround(
        item.summary || item.content || '',
        tokens,
        180
      );

      var href = item.permalink || '#';
      article.innerHTML =
        '<a class="search-result-link" href="' +
        escapeHtml(href) +
        '">' +
        '<div class="search-result-body">' +
        (badgeHtml
          ? '<div class="search-result-badges">' + badgeHtml + '</div>'
          : '') +
        '<h2 class="search-result-title">' +
        highlight(item.title || 'Tanpa judul', tokens) +
        '</h2>' +
        (snippet
          ? '<p class="search-result-excerpt">' +
            highlight(snippet, tokens) +
            '</p>'
          : '') +
        '<div class="search-result-meta">' +
        (item.section
          ? '<span>' + escapeHtml(item.section) + '</span>'
          : '') +
        (item.date ? '<span>' + escapeHtml(item.date) + '</span>' : '') +
        '</div></div></a>';

      frag.appendChild(article);
    });
    root.appendChild(frag);
  }

  function runSearch(q) {
    var status = qs('#search-status');
    var tokens = tokenize(q);

    if (status) {
      setHidden(status, false);
      status.textContent = indexCache
        ? 'Mencari…'
        : 'Memuat indeks pencarian…';
    }
    // While loading, never flash empty-state
    setHidden(qs('#search-empty'), true);

    return loadIndex()
      .then(function (items) {
        if (!q) {
          renderResults([], tokens, q);
          return;
        }
        if (!tokens.length) {
          renderResults([], tokens, q);
          return;
        }
        var scored = items
          .map(function (item) {
            return { item: item, score: scoreItem(item, tokens) };
          })
          .filter(function (x) {
            return x.score > 0;
          })
          .sort(function (a, b) {
            return b.score - a.score;
          })
          .slice(0, 40)
          .map(function (x) {
            return x.item;
          });
        renderResults(scored, tokens, q);
      })
      .catch(function (err) {
        if (status) {
          setHidden(status, false);
          status.textContent =
            'Gagal memuat indeks. Buka /index.json di browser — harus JSON array. Lalu hard-refresh halaman search.';
        }
        setHidden(qs('#search-empty'), true);
        if (typeof console !== 'undefined' && console.warn) {
          console.warn('[ShaSec search]', err && err.message ? err.message : err);
          console.warn('[ShaSec search] tried:', candidateIndexUrls());
        }
      });
  }

  function init() {
    var form = qs('#search-page-form');
    var input = qs('#search-page-input');
    if (!form || !input) return;

    function syncHeaderInputs(q) {
      ['#site-search', '#site-search-mobile'].forEach(function (sel) {
        var el = qs(sel);
        if (el && el !== input) el.value = q;
      });
    }

    var initial = getQuery();
    if (initial) {
      input.value = initial;
      syncHeaderInputs(initial);
      runSearch(initial);
    } else {
      var status = qs('#search-status');
      setHidden(status, true);
      var meta = qs('#search-meta');
      if (meta) {
        setHidden(meta, false);
        meta.textContent = 'Ketik kata kunci untuk mencari.';
      }
      setHidden(qs('#search-empty'), true);
      loadIndex().catch(function () {});
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var q = (input.value || '').trim();
      setQueryInUrl(q, false);
      syncHeaderInputs(q);
      runSearch(q);
    });

    var debounce;
    input.addEventListener('input', function () {
      clearTimeout(debounce);
      debounce = setTimeout(function () {
        var q = (input.value || '').trim();
        setQueryInUrl(q, true);
        syncHeaderInputs(q);
        runSearch(q);
      }, 200);
    });

    window.addEventListener('popstate', function () {
      var q = getQuery();
      input.value = q;
      syncHeaderInputs(q);
      runSearch(q);
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
