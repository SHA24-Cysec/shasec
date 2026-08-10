(() => {
  const el = document.getElementById('memory-app');
  if (!el) return;
  const lang = el.dataset.lang === 'en' ? 'en' : 'id';
  const L = lang==='id' ? { moves:'Langkah', time:'Waktu', pairs:'Pasangan', win:'Mantap! Semua pasangan ketemu.', new:'Acak ulang', best:'Terbaik' } : { moves:'Moves', time:'Time', pairs:'Pairs', win:'Nice! All pairs found.', new:'Shuffle', best:'Best' };

  const pairsId = [
    { term:'Firewall', def:'Filter lalu lintas jaringan' },
    { term:'Malware', def:'Software jahat' },
    { term:'Phishing', def:'Tipuan ambil kredensial' },
    { term:'2FA', def:'Verifikasi dua langkah' },
    { term:'Ransomware', def:'Enkripsi minta tebusan' },
    { term:'VPN', def:'Terowongan enkripsi' },
    { term:'Patching', def:'Update tambal celah' },
    { term:'SOC', def:'Pusat monitoring' },
  ];
  const pairsEn = [
    { term:'Firewall', def:'Filters network traffic' },
    { term:'Malware', def:'Malicious software' },
    { term:'Phishing', def:'Trick to steal creds' },
    { term:'2FA', def:'Two-step verification' },
    { term:'Ransomware', def:'Encrypts for ransom' },
    { term:'VPN', def:'Encrypted tunnel' },
    { term:'Patching', def:'Update to fix flaws' },
    { term:'SOC', def:'Monitoring center' },
  ];
  const pairs = lang==='id' ? pairsId : pairsEn;

  let cards=[], flipped=[], matched=0, moves=0, timer=null, sec=0, locked=false;

  function build() {
    const deck=[];
    pairs.forEach((p,i)=>{
      deck.push({ id:i, type:'term', text:p.term });
      deck.push({ id:i, type:'def', text:p.def });
    });
    for(let i=deck.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [deck[i],deck[j]]=[deck[j],deck[i]]; }
    deck.forEach((c,idx)=> c.pos=idx);
    return deck;
  }

  function render() {
    cards=build(); flipped=[]; matched=0; moves=0; sec=0;
    clearInterval(timer);
    timer=setInterval(()=>{ sec++; const tEl=document.getElementById('mem-time'); if(tEl) tEl.textContent=sec+'s'; },1000);

    el.innerHTML = `
      <div class="memory-wrap">
        <div class="memory-stats">
          <span class="memory-stat">${L.moves}: <b id="mem-moves">0</b></span>
          <span class="memory-stat">${L.time}: <b id="mem-time">0s</b></span>
          <span class="memory-stat">${L.pairs}: <b id="mem-pairs">0 / ${pairs.length}</b></span>
          <button type="button" class="btn-outline btn-sm !py-1.5 ml-auto" id="mem-new">${L.new()}</button>
        </div>
        <div class="memory-grid" id="mem-grid">
          ${cards.map((c)=> `<button type="button" class="memory-card" data-pos="${c.pos}" aria-label="card"><span class="memory-card-back">?</span></button>`).join('')}
        </div>
        <p class="font-mono text-2xs text-shasec-muted-soft mt-3 m-0">${lang==='id'?'Balik 2 kartu — cocokkan istilah & definisi.':'Flip 2 — match term & definition.'}</p>
        <div id="mem-win" class="hidden mt-4 rounded-xl border border-shasec-primary/30 bg-shasec-primary-soft p-4 text-center">
          <p class="font-mono text-2xs uppercase tracking-widest text-shasec-primary m-0 mb-1">${L.win}</p>
          <p class="text-sm text-shasec-muted m-0 mb-2"><span id="mem-win-stats"></span></p>
          <p class="font-mono text-2xs text-shasec-muted-soft m-0 mb-3">${L.best}: <span id="mem-best">—</span></p>
          <div class="flex justify-center gap-2"><button type="button" class="btn-primary btn-sm" id="mem-again">${L.new}</button><button type="button" class="btn-outline btn-sm" id="mem-share">Share</button></div>
        </div>
      </div>
    `;

    el.querySelectorAll('.memory-card').forEach(b=> b.addEventListener('click', ()=> flip(b)));
    document.getElementById('mem-new').addEventListener('click', ()=> render());
  }

  function flip(btn){
    if (locked) return;
    const pos = parseInt(btn.dataset.pos,10);
    const card = cards.find(c=>c.pos===pos);
    if (!card || btn.classList.contains('is-flipped') || btn.classList.contains('is-matched')) return;
    btn.classList.add('is-flipped');
    btn.innerHTML = `<span class="memory-card-face">${card.text}</span>`;
    flipped.push({ btn, card });
    if (flipped.length===2){
      moves++;
      document.getElementById('mem-moves').textContent = String(moves);
      const [a,b]=flipped;
      if (a.card.id === b.card.id){
        // match
        a.btn.classList.add('is-matched');
        b.btn.classList.add('is-matched');
        flipped=[];
        matched++;
        document.getElementById('mem-pairs').textContent = `${matched} / ${pairs.length}`;
        if (matched===pairs.length) win();
      } else {
        locked=true;
        a.btn.classList.add('is-mismatch');
        b.btn.classList.add('is-mismatch');
        setTimeout(()=>{
          a.btn.classList.remove('is-flipped','is-mismatch');
          b.btn.classList.remove('is-flipped','is-mismatch');
          a.btn.innerHTML=`<span class="memory-card-back">?</span>`;
          b.btn.innerHTML=`<span class="memory-card-back">?</span>`;
          flipped=[]; locked=false;
        },800);
      }
    }
  }

  function win(){
    clearInterval(timer);
    const winEl=document.getElementById('mem-win');
    const statsEl=document.getElementById('mem-win-stats');
    const bestEl=document.getElementById('mem-best');
    statsEl.textContent = `${moves} ${L.moves.toLowerCase()} • ${sec}s`;
    // best = fewest moves or fastest time
    try{
      const k='shasec_best_memory';
      const prevMoves = parseInt(localStorage.getItem(k+'_moves')||'9999',10);
      if (moves < prevMoves) { localStorage.setItem(k+'_moves', String(moves)); localStorage.setItem(k+'_time', String(sec)); }
      const bm = localStorage.getItem(k+'_moves');
      const bt = localStorage.getItem(k+'_time');
      bestEl.textContent = bm ? `${bm} moves • ${bt}s` : `${moves} moves • ${sec}s`;
      localStorage.setItem('shasec_best_memory', `${moves}/${sec}s`);
    }catch{ bestEl.textContent = `${moves} • ${sec}s`; }
    winEl.classList.remove('hidden');
    document.getElementById('mem-again').addEventListener('click', ()=> render());
    document.getElementById('mem-share').addEventListener('click', async ()=>{
      const txt = lang==='id' ? `Memory Hack ${moves} langkah ${sec}s di ShaSec Games!` : `Memory Hack ${moves} moves ${sec}s on ShaSec Games!`;
      const url=location.href;
      if (navigator.share){ try{ await navigator.share({title:document.title, text:txt, url}); }catch{} }
      else if (navigator.clipboard){ await navigator.clipboard.writeText(txt+' '+url); const b=document.getElementById('mem-share'); const o=b.textContent; b.textContent='✓ Copied'; setTimeout(()=>b.textContent=o,1200); }
    });
  }

  render();
})();
