(() => {
  const el = document.getElementById('password-app');
  if (!el) return;
  const lang = el.dataset.lang === 'en' ? 'en' : 'id';
  const L = lang === 'id' ? {
    placeholder: 'Ketik password di sini…',
    strength: 'Kekuatan',
    crack: 'Estimasi crack',
    offline: 'Offline',
    tips: 'Saran perbaikan',
    generate: 'Generate passphrase',
    copy: 'Salin',
    copied: 'Disalin!',
    show: 'Lihat',
    hide: 'Sembunyi',
    veryWeak: 'Sangat lemah',
    weak: 'Lemah',
    fair: 'Cukup',
    strong: 'Kuat',
    veryStrong: 'Sangat kuat',
    inst: 'Instan',
    sec: 'detik',
    min: 'menit',
    hrs: 'jam',
    days: 'hari',
    years: 'tahun',
    centuries: 'abad',
  } : {
    placeholder: 'Type password here…',
    strength: 'Strength',
    crack: 'Crack estimate',
    offline: 'Offline',
    tips: 'Tips',
    generate: 'Generate passphrase',
    copy: 'Copy',
    copied: 'Copied!',
    show: 'Show',
    hide: 'Hide',
    veryWeak: 'Very weak',
    weak: 'Weak',
    fair: 'Fair',
    strong: 'Strong',
    veryStrong: 'Very strong',
    inst: 'Instant',
    sec: 'seconds',
    min: 'minutes',
    hrs: 'hours',
    days: 'days',
    years: 'years',
    centuries: 'centuries',
  };

  const passList = [
    'correct horse battery staple',
    'kuda-terbang-7-pagi-cerah',
    'shaSec-2026!Hardening#Lab',
    'api-budi-aman-9x-api',
  ];

  function estimate(pw) {
    if (!pw) return { score:0, label: L.veryWeak, crack: '-', entropy:0, pool:0, tips:[] };
    let pool=0;
    if (/[a-z]/.test(pw)) pool+=26;
    if (/[A-Z]/.test(pw)) pool+=26;
    if (/[0-9]/.test(pw)) pool+=10;
    if (/[^A-Za-z0-9]/.test(pw)) pool+=32;
    if (pool===0) pool=26;
    // detect common weak patterns
    const isCommon = /^(123|password|qwerty|admin|letmein|welcome|abc)/i.test(pw) || pw.length < 6;
    const entropy = pw.length * Math.log2(pool);
    // crack time at 10e9 guesses/sec (offline) and online 10/sec
    const guesses = Math.pow(pool, pw.length);
    const offlinePerSec = 1e10;
    const sec = guesses / offlinePerSec / 2; // avg
    let crackLabel;
    if (isCommon) crackLabel = L.inst;
    else if (sec < 1) crackLabel = `< 1 ${L.sec}`;
    else if (sec < 60) crackLabel = `${Math.round(sec)} ${L.sec}`;
    else if (sec < 3600) crackLabel = `${Math.round(sec/60)} ${L.min}`;
    else if (sec < 86400) crackLabel = `${Math.round(sec/3600)} ${L.hrs}`;
    else if (sec < 31536000) crackLabel = `${Math.round(sec/86400)} ${L.days}`;
    else if (sec < 31536000*100) crackLabel = `${Math.round(sec/31536000)} ${L.years}`;
    else crackLabel = `> 100 ${L.years} (${L.centuries})`;

    let score;
    if (entropy < 25) score=0;
    else if (entropy < 35) score=1;
    else if (entropy < 50) score=2;
    else if (entropy < 70) score=3;
    else score=4;
    if (isCommon) score = 0;
    if (pw.length >= 14 && score <3) score=3;

    const labels = [L.veryWeak, L.weak, L.fair, L.strong, L.veryStrong];
    const label = labels[score];
    const meterClass = score<=1?'is-weak': score===2?'is-fair':'is-strong';
    const meterPct = [15,30,55,80,100][score];

    const tips=[];
    if (pw.length < 12) tips.push(lang==='id' ? 'Panjang minimal 12 karakter (ideal 14-16+).' : 'At least 12 chars (ideal 14-16+).');
    if (!/[A-Z]/.test(pw)) tips.push(lang==='id' ? 'Tambah huruf besar.' : 'Add uppercase.');
    if (!/[a-z]/.test(pw)) tips.push(lang==='id' ? 'Tambah huruf kecil.' : 'Add lowercase.');
    if (!/[0-9]/.test(pw)) tips.push(lang==='id' ? 'Tambah angka.' : 'Add numbers.');
    if (!/[^A-Za-z0-9]/.test(pw)) tips.push(lang==='id' ? 'Tambah simbol (!@#).' : 'Add symbols (!@#).');
    if (/(.)\1{2,}/.test(pw)) tips.push(lang==='id' ? 'Hindari huruf berulang (aaa).' : 'Avoid repeats (aaa).');
    if (isCommon) tips.push(lang==='id' ? 'Hindari kata umum / pola keyboard.' : 'Avoid common words / keyboard patterns.');
    if (tips.length===0) tips.push(lang==='id' ? 'Bagus! Pertimbangkan passphrase 4-5 kata untuk lebih mudah diingat.' : 'Nice! Consider a 4-5 word passphrase for memorability.');

    return { score, label, crack: crackLabel, entropy: Math.round(entropy), pool, meterClass, meterPct, tips };
  }

  el.innerHTML = `
    <div class="pwd-wrap">
      <div class="pwd-input-row">
        <input id="pwd-input" class="pwd-input" type="password" placeholder="${L.placeholder}" autocomplete="off" spellcheck="false" />
        <button type="button" id="pwd-toggle" class="pwd-toggle" aria-label="toggle">👁</button>
      </div>
      <div class="pwd-meter" aria-hidden="true"><div id="pwd-meter-fill" class="pwd-meter-fill is-weak" style="width:12%"></div></div>
      <div class="pwd-stats">
        <div class="pwd-stat">
          <p class="pwd-stat-label">${L.strength}</p>
          <p class="pwd-stat-value" id="pwd-strength">—</p>
          <p class="font-mono text-2xs text-shasec-muted-soft" id="pwd-entropy"></p>
        </div>
        <div class="pwd-stat">
          <p class="pwd-stat-label">${L.crack} <span class="font-mono text-[10px] normal-case tracking-normal opacity-60">• ${L.offline} 10B/s</span></p>
          <p class="pwd-stat-value" id="pwd-crack">—</p>
          <p class="font-mono text-2xs text-shasec-muted-soft" id="pwd-len"></p>
        </div>
      </div>
      <div class="pwd-tips">
        <p class="font-mono text-2xs uppercase tracking-[0.14em] text-shasec-primary mb-2">${L.tips}</p>
        <ul id="pwd-tips" class="m-0 pl-5 space-y-1 list-disc marker:text-shasec-primary"></ul>
      </div>
      <div class="pwd-gen">
        <div id="pwd-gen-out" class="pwd-gen-out">${passList[0]}</div>
        <button type="button" id="pwd-gen" class="btn-outline btn-sm">${L.generate}</button>
        <button type="button" id="pwd-copy" class="btn-primary btn-sm">${L.copy}</button>
      </div>
      <p class="font-mono text-2xs text-shasec-muted-soft m-0">${lang==='id' ? 'Semua hitung di browser — tidak ada password dikirim.' : 'All calculated in browser — no password sent.'}</p>
    </div>
  `;

  const input = document.getElementById('pwd-input');
  const meter = document.getElementById('pwd-meter-fill');
  const strengthEl = document.getElementById('pwd-strength');
  const crackEl = document.getElementById('pwd-crack');
  const entropyEl = document.getElementById('pwd-entropy');
  const lenEl = document.getElementById('pwd-len');
  const tipsEl = document.getElementById('pwd-tips');
  const toggle = document.getElementById('pwd-toggle');
  const genBtn = document.getElementById('pwd-gen');
  const genOut = document.getElementById('pwd-gen-out');
  const copyBtn = document.getElementById('pwd-copy');

  function update() {
    const v = input.value;
    const r = estimate(v);
    meter.className = 'pwd-meter-fill ' + (r.meterClass || 'is-weak');
    meter.style.width = (v ? r.meterPct : 12) + '%';
    strengthEl.textContent = v ? r.label : '—';
    entropyEl.textContent = v ? `entropy ~${r.entropy} bit • pool ${r.pool}` : '';
    crackEl.textContent = v ? r.crack : '—';
    lenEl.textContent = v ? `${v.length} chars` : '';
    tipsEl.innerHTML = r.tips.map(t=>`<li>${t}</li>`).join('');
  }

  input.addEventListener('input', update);
  toggle.addEventListener('click', ()=>{
    const isPwd = input.type === 'password';
    input.type = isPwd ? 'text' : 'password';
    toggle.textContent = isPwd ? '🙈' : '👁';
  });
  genBtn.addEventListener('click', ()=>{
    const words = ['kuda','api','awan','buku','laut','senja','kopi','jaya','aman','cerah','pagi','malam','hutan','kota','sandi','kunci'];
    // generate 4-word passphrase with number
    const w = Array.from({length:4}, ()=> words[Math.floor(Math.random()*words.length)]);
    const num = Math.floor(Math.random()*90+10);
    const pw = w.join('-')+'-'+num;
    genOut.textContent = pw;
    input.value = pw;
    input.type='text';
    update();
  });
  copyBtn.addEventListener('click', async ()=>{
    const txt = genOut.textContent;
    if (!txt) return;
    if (navigator.clipboard) await navigator.clipboard.writeText(txt);
    const old = copyBtn.textContent;
    copyBtn.textContent = L.copied;
    setTimeout(()=>copyBtn.textContent=old,1200);
    // also copy if user typed custom
    if (input.value && input.value !== genOut.textContent) {
      try { await navigator.clipboard.writeText(input.value); } catch {}
    }
  });

  update();
  input.focus();
})();
