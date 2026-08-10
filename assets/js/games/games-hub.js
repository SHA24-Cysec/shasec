(() => {
  // Best scores
  const keys = {
    'phishing-spotter': 'shasec_best_phishing',
    'password-lab': 'shasec_best_password',
    'cyber-quiz': 'shasec_best_quiz',
    'memory-hack': 'shasec_best_memory',
    'decode-lab': 'shasec_best_decode',
    'log-inspector': 'shasec_best_log',
    'ir-drill': 'shasec_best_ir',
    'soc-rush': 'shasec_best_soc'
  };
  document.querySelectorAll('[data-best]').forEach(el => {
    const slug = el.getAttribute('data-best');
    const k = keys[slug];
    if (!k) return;
    try {
      const v = localStorage.getItem(k);
      if (v) el.textContent = el.textContent.replace('—', v);
      if (slug === 'memory-hack') {
        const mv = localStorage.getItem('shasec_best_memory_moves');
        if (mv) el.textContent = el.textContent.replace('—', mv + ' moves');
      }
      // single page best
      if (el.id === 'single-best') {
        const s = localStorage.getItem(k) || localStorage.getItem(k+'_moves');
        if (s) el.textContent = s;
      }
    } catch {}
  });

  // Filter + search (list page)
  const grid = document.getElementById('games-grid-cards');
  if (!grid) return;
  const chips = document.querySelectorAll('[data-games-filter]');
  const search = document.getElementById('games-search');
  const status = document.getElementById('games-status');
  const empty = document.getElementById('games-empty');
  const items = Array.from(grid.querySelectorAll('[data-games-item]'));
  let active = 'all';
  let q = '';

  function apply() {
    let visible = 0;
    const term = q.trim().toLowerCase();
    items.forEach(el => {
      const cat = el.dataset.category || '';
      const blob = el.dataset.search || '';
      const catOk = active === 'all' || cat === active;
      const searchOk = !term || blob.includes(term);
      const show = catOk && searchOk;
      el.style.display = show ? '' : 'none';
      el.hidden = !show;
      if (show) visible++;
    });
    if (status) status.textContent = visible + ' games';
    if (empty) {
      empty.hidden = visible !== 0;
      empty.classList.toggle('hidden', visible !== 0);
    }
  }

  chips.forEach(c => c.addEventListener('click', () => {
    active = c.dataset.gamesFilter;
    chips.forEach(x => {
      const on = x === c;
      x.classList.toggle('is-active', on);
      x.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    apply();
  }));

  if (search) {
    search.addEventListener('input', () => {
      q = search.value || '';
      apply();
    });
  }
  apply();
})();
