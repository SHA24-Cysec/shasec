(() => {
  const el = document.getElementById('decode-app');
  if (!el) return;
  const lang = el.dataset.lang === 'en' ? 'en' : 'id';
  const L = lang === 'id' ? {
    level: (n) => `Level ${n}`,
    easy: 'Easy', medium: 'Medium', hard: 'Hard',
    hint: 'Petunjuk', check: 'Periksa', next: 'Lanjut →', result: 'Skor akhir', best: 'Terbaik', share: 'Bagikan skor', restart: 'Main lagi',
    placeholder: 'Ketik jawaban di sini…',
    correct: 'Benar!', wrong: 'Belum tepat', showAnswer: 'Lihat jawaban',
    progress: (c,t) => `Puzzle ${c} / ${t}`,
    of: 'dari',
  } : {
    level: (n) => `Level ${n}`,
    easy: 'Easy', medium: 'Medium', hard: 'Hard',
    hint: 'Hint', check: 'Check', next: 'Next →', result: 'Final score', best: 'Best', share: 'Share score', restart: 'Play again',
    placeholder: 'Type answer here…',
    correct: 'Correct!', wrong: 'Not yet', showAnswer: 'Show answer',
    progress: (c,t) => `Puzzle ${c} / ${t}`,
    of: 'of',
  };

  const puzzles = [
    // Easy
    { level: 'Easy', type: 'Base64', encoded: 'U2hhU2Vj', answer: 'ShaSec', hint: lang==='id' ? 'Base64: A-Z, a-z, 0-9, +, /, = di akhir' : 'Base64: A-Z, a-z, 0-9, +, /, = at end', why: lang==='id' ? 'Base64 decode: U2hhU2Vj → ShaSec' : 'Base64 decode: U2hhU2Vj → ShaSec' },
    { level: 'Easy', type: 'Hex', encoded: '536861536563', answer: 'ShaSec', hint: lang==='id' ? 'Hex: tiap 2 karakter = 1 byte (53 = S)' : 'Hex: every 2 chars = 1 byte (53 = S)', why: lang==='id' ? 'Hex decode: 53 68 61 → Sha' : 'Hex decode: 53 68 61 → Sha' },
    { level: 'Easy', type: 'URL', encoded: 'shasec%2Emy%2Eid', answer: 'shasec.my.id', hint: lang==='id' ? '%2E = titik (.)' : '%2E = dot (.)', why: lang==='id' ? 'URL decode: %2E → .' : 'URL decode: %2E → .' },
    // Medium
    { level: 'Medium', type: 'ROT13', encoded: 'FunFrp', answer: 'ShaSec', hint: 'ROT13: A↔N, B↔O', why: 'ROT13: F→S, u→h ...' },
    { level: 'Medium', type: 'Base64 x2', encoded: 'VTJoaFUyVmo=', answer: 'ShaSec', hint: lang==='id' ? 'Decode Base64 dua kali' : 'Decode Base64 twice', why: lang==='id' ? 'VTJoaFUyVmo= → U2hhU2Vj → ShaSec' : 'VTJoaFUyVmo= → U2hhU2Vj → ShaSec' },
    { level: 'Medium', type: 'JWT', encoded: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoic2hhc2VjIiwicm9sZSI6ImFkbWluIn0.sig', answer: 'admin', hint: lang==='id' ? 'JWT = header.payload.signature, payload Base64URL JSON. Cari field \"role\"' : 'JWT = header.payload.signature, payload Base64URL JSON. Find \"role\"', why: lang==='id' ? 'Payload decode: {"user":"shasec","role":"admin"} → role=admin' : 'Payload decode: {"user":"shasec","role":"admin"} → role=admin' },
    // Hard
    { level: 'Hard', type: 'Hex → Base64', encoded: '553268615532566a', answer: 'ShaSec', hint: lang==='id' ? 'Hex dulu, hasilnya Base64' : 'Hex first, result is Base64', why: '553268... → (hex) → U2hhU2Vj → (base64) → ShaSec' },
    { level: 'Hard', type: 'URL → Base64', encoded: 'U2hhU2VjJTNE', answer: 'ShaSec', hint: lang==='id' ? 'URL decode dulu, lalu Base64' : 'URL decode first, then Base64', why: 'U2hhU2VjJTNE → URL → U2hhU2Vj= → Base64 → ShaSec' },
  ];

  let idx = 0, score = 0, hintShown = false;

  function render() {
    const p = puzzles[idx];
    const lvlColor = p.level === 'Easy' ? 'text-shasec-primary' : p.level === 'Medium' ? 'text-shasec-warning' : 'text-shasec-danger';
    el.innerHTML = `
      <div class="decode-wrap p-4 sm:p-6">
        <div class="flex items-center justify-between gap-3 mb-3">
          <span class="font-mono text-2xs uppercase tracking-widest ${lvlColor}">${p.level} • ${p.type}</span>
          <span class="font-mono text-2xs text-shasec-muted">${L.progress(idx+1, puzzles.length)}</span>
        </div>
        <div class="h-1.5 rounded-full bg-shasec-border overflow-hidden mb-4"><div class="h-full bg-shasec-primary transition-all" style="width:${((idx)/puzzles.length*100)}%"></div></div>

        <div class="rounded-xl border border-shasec-border bg-shasec-bg-elevated p-4 sm:p-5 mb-4">
          <p class="font-mono text-2xs uppercase tracking-widest text-shasec-muted-soft mb-2">Encoded</p>
          <p class="font-mono text-sm sm:text-base text-shasec-text-bright break-all select-all bg-shasec-bg-input border border-shasec-border rounded-lg px-3 py-2.5">${p.encoded}</p>
          <div class="mt-3 flex flex-wrap gap-2">
            <button type="button" id="decode-hint" class="btn-ghost btn-sm !text-2xs">${L.hint} ?</button>
            <span id="decode-hint-text" class="hidden font-mono text-xs text-shasec-warning bg-shasec-bg-input border border-shasec-border rounded px-2 py-1">${p.hint}</span>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-2">
          <input id="decode-input" class="input flex-1 !py-3.5 font-mono text-sm" placeholder="${L.placeholder}" autocomplete="off" spellcheck="false" />
          <button type="button" id="decode-check" class="btn-primary shrink-0">${L.check}</button>
        </div>
        <div id="decode-feedback" class="hidden mt-4 rounded-xl border p-4"></div>
      </div>
    `;
    const input = document.getElementById('decode-input');
    const hintBtn = document.getElementById('decode-hint');
    const hintText = document.getElementById('decode-hint-text');
    const checkBtn = document.getElementById('decode-check');
    hintBtn.addEventListener('click', () => {
      hintText.classList.toggle('hidden');
      hintShown = !hintText.classList.contains('hidden');
      if (hintShown) hintBtn.textContent = L.hint + ' ✓';
    });
    const doCheck = () => {
      const val = input.value.trim();
      if (!val) { input.focus(); return; }
      const ok = val === p.answer || val.toLowerCase() === p.answer.toLowerCase();
      if (ok) score++;
      const fb = document.getElementById('decode-feedback');
      fb.className = 'rounded-xl border p-4 ' + (ok ? 'border-shasec-primary/40 bg-shasec-primary-soft' : 'border-shasec-danger/40 bg-[#ff5c5c0f]');
      fb.innerHTML = `
        <p class="font-mono text-xs uppercase tracking-widest m-0 mb-1 ${ok ? 'text-shasec-primary' : 'text-shasec-danger'}">${ok ? L.correct : L.wrong} — ${p.answer}</p>
        <p class="text-sm text-shasec-muted m-0 leading-relaxed">${p.why}</p>
        <button type="button" class="btn-primary btn-sm mt-3" id="decode-next">${idx+1 < puzzles.length ? L.next : L.result}</button>
      `;
      fb.classList.remove('hidden');
      input.disabled = true;
      checkBtn.disabled = true;
      document.getElementById('decode-next').addEventListener('click', () => {
        if (idx+1 < puzzles.length) { idx++; render(); }
        else finish();
      });
      document.getElementById('decode-next').focus();
    };
    checkBtn.addEventListener('click', doCheck);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') doCheck(); });
    input.focus();
  }

  function finish() {
    const pct = Math.round(score / puzzles.length * 100);
    let msg = pct===100 ? (lang==='id'?'Sempurna — decoder handal!':'Perfect — sharp decoder!') : pct>=75 ? (lang==='id'?'Keren — hampir master':'Great — near master') : pct>=50 ? 'Lumayan' : (lang==='id'?'Latihan lagi — encoding makin licik':'Practice — encodings get sneaky');
    try { const k='shasec_best_decode'; const prev=parseInt(localStorage.getItem(k)||'0',10); if(score>prev) localStorage.setItem(k,String(score)); } catch {}
    const best = (()=>{try{return localStorage.getItem('shasec_best_decode')||'-'}catch{return '-'}})();
    el.innerHTML = `
      <div class="decode-wrap p-6 text-center">
        <p class="font-mono text-2xs uppercase tracking-[0.16em] text-shasec-primary mb-2">${L.result}</p>
        <p class="text-4xl font-bold text-shasec-text-bright mb-1">${score} / ${puzzles.length}</p>
        <p class="text-sm text-shasec-muted mb-1">${pct}% — ${msg}</p>
        <p class="font-mono text-2xs text-shasec-muted-soft mb-6">${L.best}: ${best} / ${puzzles.length}</p>
        <div class="flex flex-wrap justify-center gap-2">
          <button type="button" class="btn-primary btn-sm" id="decode-restart">${L.restart}</button>
          <button type="button" class="btn-outline btn-sm" id="decode-share">${L.share}</button>
        </div>
        <p class="font-mono text-2xs text-shasec-muted-soft mt-6">${lang==='id'?'Tip: di real case, cek CyberChef untuk decode cepat.':'Tip: use CyberChef for quick decode in real cases.'}</p>
      </div>
    `;
    document.getElementById('decode-restart').addEventListener('click', ()=>{ idx=0; score=0; render(); });
    document.getElementById('decode-share').addEventListener('click', async ()=>{
      const txt = lang==='id' ? `Skor Decode Lab ${score}/${puzzles.length} di ShaSec Games!` : `My Decode Lab ${score}/${puzzles.length} on ShaSec Games!`;
      const url=location.href;
      if (navigator.share) { try{ await navigator.share({title:document.title, text:txt, url}); }catch{} }
      else if (navigator.clipboard){ await navigator.clipboard.writeText(txt+' '+url); const b=document.getElementById('decode-share'); const o=b.textContent; b.textContent='✓ Copied'; setTimeout(()=>b.textContent=o,1200); }
    });
  }

  render();
})();
