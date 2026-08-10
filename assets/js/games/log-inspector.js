(() => {
  const el = document.getElementById('log-app');
  if (!el) return;
  const lang = el.dataset.lang === 'en' ? 'en' : 'id';
  const L = lang === 'id' ? {
    progress: (c,t)=>`Skenario ${c} / ${t}`,
    correct: 'Tepat!', wrong: 'Melenceng', next: 'Lanjut →', result: 'Skor akhir', best: 'Terbaik', restart: 'Main lagi', share: 'Bagikan skor',
    tap: 'Pilih 1 baris paling mencurigakan'
  } : {
    progress: (c,t)=>`Scenario ${c} / ${t}`,
    correct: 'Spot on!', wrong: 'Off mark', next: 'Next →', result: 'Final score', best: 'Best', restart: 'Play again', share: 'Share score',
    tap: 'Pick the most suspicious line'
  };

  const scenarios = lang === 'id' ? [
    { title:'Access Log — Web', lines:[
      '10.0.0.12 - - [10/Aug/2026:09:01] "GET /api/products HTTP/1.1" 200',
      '10.0.0.12 - - [10/Aug/2026:09:02] "GET /api/user?id=../../../etc/passwd HTTP/1.1" 200',
      '10.0.0.12 - - [10/Aug/2026:09:02] "GET /static/app.css HTTP/1.1" 200',
      '10.0.0.12 - - [10/Aug/2026:09:03] "GET /api/cart HTTP/1.1" 200',
      '10.0.0.12 - - [10/Aug/2026:09:03] "GET /health HTTP/1.1" 200',
    ], evil:1, why:'Path traversal ../../../etc/passwd — coba baca file sistem. Blok & investigasi.'},
    { title:'Access Log — Search', lines:[
      'GET /search?q=laptop 200',
      'GET /search?q=mouse 200',
      'GET /search?q=<script>alert(1)</script> 200',
      'GET /search?q=keyboard 200',
      'GET /search?q=monitor 200',
    ], evil:2, why:'XSS reflected: <script> di parameter q. Input tidak di-escape.'},
    { title:'Access Log — Login', lines:[
      'POST /login user=agus 200',
      'POST /login user=admin\' OR \'1\'=\'1 200',
      'POST /login user=budi 200',
      'GET /dashboard 200',
      'POST /login user=sari 401',
    ], evil:1, why:'SQL Injection tautology: OR 1=1 bypass login.'},
    { title:'Email Header', lines:[
      'From: noreply@tokopedia.com',
      'SPF: pass (tokopedia.com)',
      'DKIM: pass',
      'From: noreply@tokopedia.com <bounce@tokopedia-secure-shop.net>',
      'Return-Path: bounce@tokopedia-secure-shop.net',
    ], evil:3, why:'Domain secure-shop.net palsu, SPF/DKIM akan fail. Cek Return-Path.'},
    { title:'Access Log — UA', lines:[
      'UA: Mozilla/5.0 (Windows NT 10.0)',
      'UA: sqlmap/1.5.2#stable (http://sqlmap.org)',
      'UA: Mozilla/5.0 (iPhone; CPU iPhone OS 17)',
      'UA: curl/7.88',
      'UA: Mozilla/5.0 (Macintosh)',
    ], evil:1, why:'sqlmap UA = automated SQLi scanner. Blok & rate-limit.'},
    { title:'Access Log — SSRF', lines:[
      'GET /fetch?url=https://api.shasec.my.id/data 200',
      'GET /fetch?url=http://169.254.169.254/latest/meta-data/ 200',
      'GET /fetch?url=https://cdn.example.com/img.png 200',
      'GET /about 200',
      'GET /fetch?url=https://example.com 200',
    ], evil:1, why:'SSRF ke 169.254.169.254 (IMDS AWS) — coba curi credential instance.'},
    { title:'Access Log — Command', lines:[
      'GET /ping?ip=8.8.8.8 200',
      'GET /ping?ip=1.1.1.1 200',
      'GET /ping?ip=8.8.8.8; cat /etc/passwd 200',
      'GET /ping?ip=8.8.4.4 200',
      'GET /status 200',
    ], evil:2, why:'Command injection: ; cat /etc/passwd di parameter ip.'},
    { title:'Auth Log', lines:[
      'Failed login 10.0.0.5 401 (1x)',
      'Failed login 10.0.0.5 401 (2x)',
      'Failed login 10.0.0.5 401 (37x) — 1 menit',
      'Failed login 10.0.0.6 401 (1x)',
      'Success login 10.0.0.7 200',
    ], evil:2, why:'Brute force 37x/menit dari IP sama. Perlu blok & MFA.'},
  ] : [
    { title:'Access Log — Web', lines:[
      '10.0.0.12 - - [10/Aug/2026:09:01] "GET /api/products HTTP/1.1" 200',
      '10.0.0.12 - - [10/Aug/2026:09:02] "GET /api/user?id=../../../etc/passwd HTTP/1.1" 200',
      '10.0.0.12 - - [10/Aug/2026:09:02] "GET /static/app.css HTTP/1.1" 200',
      '10.0.0.12 - - [10/Aug/2026:09:03] "GET /api/cart HTTP/1.1" 200',
      '10.0.0.12 - - [10/Aug/2026:09:03] "GET /health HTTP/1.1" 200',
    ], evil:1, why:'Path traversal ../../../etc/passwd — tries to read system files.'},
    { title:'Access Log — Search', lines:[
      'GET /search?q=laptop 200',
      'GET /search?q=mouse 200',
      'GET /search?q=<script>alert(1)</script> 200',
      'GET /search?q=keyboard 200',
      'GET /search?q=monitor 200',
    ], evil:2, why:'Reflected XSS: <script> in q param. Not escaped.'},
    { title:'Access Log — Login', lines:[
      'POST /login user=agus 200',
      'POST /login user=admin\' OR \'1\'=\'1 200',
      'POST /login user=budi 200',
      'GET /dashboard 200',
      'POST /login user=sari 401',
    ], evil:1, why:'SQLi tautology OR 1=1 bypass.'},
    { title:'Email Header', lines:[
      'From: noreply@tokopedia.com',
      'SPF: pass (tokopedia.com)',
      'DKIM: pass',
      'From: noreply@tokopedia.com <bounce@tokopedia-secure-shop.net>',
      'Return-Path: bounce@tokopedia-secure-shop.net',
    ], evil:3, why:'Spoofed secure-shop.net, SPF/DKIM fail. Check Return-Path.'},
    { title:'Access Log — UA', lines:[
      'UA: Mozilla/5.0 (Windows NT 10.0)',
      'UA: sqlmap/1.5.2#stable (http://sqlmap.org)',
      'UA: Mozilla/5.0 (iPhone; CPU iPhone OS 17)',
      'UA: curl/7.88',
      'UA: Mozilla/5.0 (Macintosh)',
    ], evil:1, why:'sqlmap UA = SQLi scanner.'},
    { title:'Access Log — SSRF', lines:[
      'GET /fetch?url=https://api.shasec.my.id/data 200',
      'GET /fetch?url=http://169.254.169.254/latest/meta-data/ 200',
      'GET /fetch?url=https://cdn.example.com/img.png 200',
      'GET /about 200',
      'GET /fetch?url=https://example.com 200',
    ], evil:1, why:'SSRF to 169.254.169.254 (AWS IMDS).'},
    { title:'Access Log — Command', lines:[
      'GET /ping?ip=8.8.8.8 200',
      'GET /ping?ip=1.1.1.1 200',
      'GET /ping?ip=8.8.8.8; cat /etc/passwd 200',
      'GET /ping?ip=8.8.4.4 200',
      'GET /status 200',
    ], evil:2, why:'Command injection via ip param.'},
    { title:'Auth Log', lines:[
      'Failed login 10.0.0.5 401 (1x)',
      'Failed login 10.0.0.5 401 (2x)',
      'Failed login 10.0.0.5 401 (37x) — 1 min',
      'Failed login 10.0.0.6 401 (1x)',
      'Success login 10.0.0.7 200',
    ], evil:2, why:'Brute force 37/min from same IP.'},
  ];

  let idx=0, score=0, picked=null;

  function render(){
    const sc = scenarios[idx];
    el.innerHTML = `
      <div class="log-wrap p-4 sm:p-6">
        <div class="flex items-center justify-between gap-3 mb-3">
          <span class="font-mono text-2xs uppercase tracking-widest text-shasec-muted">${L.progress(idx+1, scenarios.length)} • ${sc.title}</span>
          <span class="font-mono text-2xs text-shasec-primary">${score}/${scenarios.length}</span>
        </div>
        <div class="h-1.5 rounded-full bg-shasec-border overflow-hidden mb-4"><div class="h-full bg-shasec-primary transition-all" style="width:${(idx/scenarios.length*100)}%"></div></div>
        <p class="font-mono text-2xs uppercase tracking-widest text-shasec-muted-soft mb-2">${L.tap}</p>
        <div class="flex flex-col gap-2" id="log-lines">
          ${sc.lines.map((ln,i)=>`<button type="button" class="log-line" data-i="${i}"><span class="log-line-num">${i+1}</span><span class="log-line-text">${ln.replace(/</g,'&lt;')}</span></button>`).join('')}
        </div>
        <div id="log-feedback" class="hidden mt-4 rounded-xl border p-4"></div>
      </div>
    `;
    el.querySelectorAll('[data-i]').forEach(b=> b.addEventListener('click', ()=> choose(parseInt(b.dataset.i,10))));
  }

  function choose(i){
    if (picked!==null) return;
    picked=i;
    const sc=scenarios[idx];
    const ok = i===sc.evil;
    if (ok) score++;
    const btns=el.querySelectorAll('[data-i]');
    btns.forEach(b=>{
      const bi=parseInt(b.dataset.i,10);
      b.disabled=true;
      if (bi===sc.evil) b.classList.add('is-evil');
      else if (bi===i && !ok) b.classList.add('is-wrong');
      if (bi===i) b.classList.add('is-picked');
    });
    const fb=document.getElementById('log-feedback');
    fb.className='rounded-xl border p-4 '+(ok?'border-shasec-primary/40 bg-shasec-primary-soft':'border-shasec-danger/40 bg-[#ff5c5c0f]');
    fb.innerHTML=`
      <p class="font-mono text-xs uppercase tracking-widest m-0 mb-1 ${ok?'text-shasec-primary':'text-shasec-danger'}">${ok?L.correct:L.wrong}</p>
      <p class="text-sm text-shasec-muted m-0 leading-relaxed">${sc.why}</p>
      <button type="button" class="btn-primary btn-sm mt-3" id="log-next">${idx+1 < scenarios.length ? L.next : L.result}</button>
    `;
    fb.classList.remove('hidden');
    document.getElementById('log-next').addEventListener('click', ()=>{
      picked=null;
      if (idx+1 < scenarios.length){ idx++; render(); }
      else finish();
    });
  }

  function finish(){
    const pct=Math.round(score/scenarios.length*100);
    let msg = pct===100 ? (lang==='id'?'Mata SOC tajam!':'Sharp SOC eye!') : pct>=75 ? 'Great' : pct>=50 ? 'Not bad' : (lang==='id'?'Perlu drilling lagi':'Need more drills');
    try{ const k='shasec_best_log'; const prev=parseInt(localStorage.getItem(k)||'0',10); if(score>prev) localStorage.setItem(k,String(score)); }catch{}
    const best=(()=>{try{return localStorage.getItem('shasec_best_log')||'-'}catch{return '-'}})();
    el.innerHTML=`
      <div class="log-wrap p-6 text-center">
        <p class="font-mono text-2xs uppercase tracking-[0.16em] text-shasec-primary mb-2">${L.result}</p>
        <p class="text-4xl font-bold text-shasec-text-bright mb-1">${score} / ${scenarios.length}</p>
        <p class="text-sm text-shasec-muted mb-1">${pct}% — ${msg}</p>
        <p class="font-mono text-2xs text-shasec-muted-soft mb-6">${L.best}: ${best} / ${scenarios.length}</p>
        <div class="flex flex-wrap justify-center gap-2">
          <button type="button" class="btn-primary btn-sm" id="log-restart">${L.restart}</button>
          <button type="button" class="btn-outline btn-sm" id="log-share">${L.share}</button>
        </div>
      </div>
    `;
    document.getElementById('log-restart').addEventListener('click', ()=>{ idx=0; score=0; picked=null; render(); });
    document.getElementById('log-share').addEventListener('click', async ()=>{
      const txt = lang==='id' ? `Skor Log Inspector ${score}/${scenarios.length} di ShaSec Games!` : `My Log Inspector ${score}/${scenarios.length} on ShaSec Games!`;
      const url=location.href;
      if (navigator.share){ try{ await navigator.share({title:document.title, text:txt, url}); }catch{} }
      else if (navigator.clipboard){ await navigator.clipboard.writeText(txt+' '+url); const b=document.getElementById('log-share'); const o=b.textContent; b.textContent='✓ Copied'; setTimeout(()=>b.textContent=o,1200); }
    });
  }

  render();
})();
