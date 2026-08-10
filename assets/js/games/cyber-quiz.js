(() => {
  const el = document.getElementById('quiz-app');
  if (!el) return;
  const lang = el.dataset.lang === 'en' ? 'en' : 'id';

  const poolId = [
    { q: 'Menurut Verizon DBIR, vektor awal breach paling sering adalah?', opts: ['Phishing & stolen credentials','Zero-day exploit','Insider fisik','Supply-chain hardware'], a:0, why:'DBIR bertahun-tahun tunjuk phishing + credential theft sebagai entry point utama. Patch tetap penting, tapi human factor mendominasi.', ref:'/articles/recognize-phishing-and-respond/' },
    { q: 'Ransomware 3.0 banyak pakai double/triple extortion. Artinya?', opts: ['Enkripsi + bocorkan data + DDoS/tekanan','Hanya enkripsi file','Minta tebusan pakai cash','Serang 3 negara sekaligus'], a:0, why:'Enkripsi saja tidak cukup — pelaku ancam publish data dan serang lanjutan bila tidak bayar.', ref:'/articles/ransomware-3-0-for-individuals/' },
    { q: 'Langkah paling efektif cegah take-over akun?', opts: ['Passkey / 2FA hardware key','Ganti password tiap minggu','Pakai 1 password kuat untuk semua','Matikan internet'], a:0, why:'Passkey dan security key tahan phishing. Ganti password rutin tanpa sebab tidak lagi direkomendasikan NIST.', ref:'/articles/hardware-security-keys-passkeys-deep-dive/' },
    { q: 'Saat dapat email “Aktifkan MFA sekarang” dengan link mencurigakan, yang benar?', opts: ['Buka portal resmi manual, jangan klik link','Klik link langsung agar cepat','Forward ke teman untuk cek','Balas email minta OTP'], a:0, why:'Buka manual via bookmark/SSO resmi. Link phishing sering meniru halaman MFA.', ref:'/articles/recognize-phishing-and-respond/' },
    { q: 'Backup 3-2-1 yang benar adalah?', opts: ['3 salinan, 2 media beda, 1 offsite/offline','3 password, 2 HP, 1 email','Backup 3 kali sehari','Simpan 3 file di 1 folder'], a:0, why:'3 salinan mencegah single point of failure, offsite/offline tahan ransomware.', ref:'/articles/3-2-1-backup-strategy-personal-data/' },
    { q: 'Quishing adalah?', opts: ['Phishing via QR code palsu','Phishing via suara AI','Phishing via USB','Phishing via satelit'], a:0, why:'QR ditempel overlay di parkir/menu/restoran mengarah ke domain phishing. Cek domain sebelum login.', ref:'/articles/quishing-evolution-qr-phishing-how-to-spot-malicious-qr/' },
    { q: 'Infostealer biasanya mencuri apa dulu?', opts: ['Session cookie & credential browser','Hanya wallpaper','Lisensi Windows','Foto profil saja'], a:0, why:'Infostealer ambil session/cookie agar bypass password & 2FA. Ganti password + revoke session.', ref:'/articles/infostealer-session-theft/' },
    { q: 'DNS filtering (DoH/DoT) membantu karena?', opts: ['Blokir domain jahat sebelum koneksi','Percepat CPU','Hapus virus otomatis','Ganti password'], a:0, why:'DNS filter cegah resolusi domain phishing/malware di level jaringan.', ref:'/articles/encrypted-dns-doh-dot-setup/' },
    { q: 'Kalau HP hilang, langkah jam pertama paling kritis?', opts: ['Kunci remote, revoke session, ganti password email utama','Posting di sosmed dulu','Tunggu 24 jam','Beli HP baru langsung'], a:0, why:'Email utama = kunci semua akun. Amankan itu dulu + remote lock.', ref:'/articles/lost-stolen-phone-digital-emergency-plan/' },
    { q: 'Prinsip least privilege artinya?', opts: ['Beri akses minimal yang dibutuhkan','Beri akses admin ke semua','Matikan semua akses','Ganti role tiap hari'], a:0, why:'Minimal akses = blast radius kecil saat akun disusupi.', ref:'/articles/access-management-for-small-business/' },
    { q: 'Tanda browser mungkin ter-hijack ekstensi jahat?', opts: ['Iklan pop-up masif & redirect aneh','Baterai awet','Font lebih indah','Halaman load lebih cepat'], a:0, why:'Ekstensi jahat injeksi iklan/redirect phishing. Audit permission.', ref:'/articles/browser-security-and-extensions/' },
    { q: 'Harus lapor insiden ke pihak mana dulu untuk jejak hukum?', opts: ['Polisi + simpan bukti digital rapi','Hapus semua bukti','DM influencer','Lapor ke marketplace saja'], a:0, why:'Bukti digital harus di-preserve (hash, screenshot, log) untuk laporan.', ref:'/articles/how-to-collect-digital-evidence-online-fraud-police-report/' },
  ];
  const poolEn = [
    { q: 'Per Verizon DBIR, the most common initial breach vector is?', opts: ['Phishing & stolen creds','Zero-day','Physical insider','Hardware supply chain'], a:0, why:'DBIR shows phishing + cred theft dominates. Patching matters but human factor wins.', ref:'/en/articles/recognize-phishing-and-respond/' },
    { q: 'Ransomware 3.0 double/triple extortion means?', opts: ['Encrypt + leak + DDoS/pressure','Encrypt only','Cash ransom only','Hit 3 countries'], a:0, why:'Encryption alone not enough — attackers threaten leaks and extra pressure.', ref:'/en/articles/ransomware-3-0-for-individuals/' },
    { q: 'Most effective account takeover prevention?', opts: ['Passkey / hardware 2FA key','Weekly password rotation','One strong password everywhere','Turn off internet'], a:0, why:'Passkeys/hardware keys are phishing-resistant. Routine rotation no longer NIST-recommended.', ref:'/en/articles/hardware-security-keys-passkeys-deep-dive/' },
    { q: 'You get “Enable MFA now” with suspicious link — do?', opts: ['Open official portal manually, don’t click','Click link quickly','Forward to friend','Reply asking OTP'], a:0, why:'Open via bookmark/SSO. Phish mimics MFA pages.', ref:'/en/articles/recognize-phishing-and-respond/' },
    { q: 'Correct 3-2-1 backup?', opts: ['3 copies, 2 media, 1 offsite/offline','3 passwords, 2 phones, 1 email','Backup 3x a day','3 files in 1 folder'], a:0, why:'3 copies avoids SPOF, offsite/offline resists ransomware.', ref:'/en/articles/3-2-1-backup-strategy-personal-data/' },
    { q: 'Quishing is?', opts: ['Phishing via fake QR','Voice AI phishing','USB phishing','Satellite phishing'], a:0, why:'Overlay QR at parking/menu leads to phishing domain.', ref:'/en/articles/quishing-evolution-qr-phishing-how-to-spot-malicious-qr/' },
    { q: 'Infostealer steals first?', opts: ['Browser session cookies & creds','Wallpaper only','Windows license','Profile pic only'], a:0, why:'Steals sessions to bypass password & 2FA. Rotate passwords + revoke.', ref:'/en/articles/infostealer-session-theft/' },
    { q: 'DNS filtering (DoH/DoT) helps because?', opts: ['Blocks bad domains before connect','Speeds CPU','Removes virus auto','Changes password'], a:0, why:'Blocks phishing/malware domains at DNS layer.', ref:'/en/articles/encrypted-dns-doh-dot-setup/' },
    { q: 'Phone lost — most critical first hour?', opts: ['Remote lock, revoke sessions, change primary email pwd','Post on social','Wait 24h','Buy new phone'], a:0, why:'Primary email unlocks everything. Secure it + remote lock.', ref:'/en/articles/lost-stolen-phone-digital-emergency-plan/' },
    { q: 'Least privilege means?', opts: ['Minimal access needed','Admin for all','No access at all','Rotate roles daily'], a:0, why:'Minimal access = smaller blast radius.', ref:'/en/articles/access-management-for-small-business/' },
    { q: 'Sign of hijacked browser extension?', opts: ['Mass pop-ups & weird redirects','Battery lasts longer','Prettier font','Faster load'], a:0, why:'Malicious extensions inject ads/redirects.', ref:'/en/articles/browser-security-and-extensions/' },
    { q: 'Report incident for legal trail — how?', opts: ['Police + preserve digital evidence','Delete evidence','DM influencer','Marketplace only'], a:0, why:'Preserve evidence (hash, screenshots, logs).', ref:'/en/articles/how-to-collect-digital-evidence-online-fraud-police-report/' },
  ];

  const pool = lang === 'id' ? poolId : poolEn;
  const T = lang === 'id' ? {
    progress:(c,t)=>`Soal ${c} / ${t}`,
    next:'Soal berikutnya →',
    finish:'Lihat skor →',
    review:'Pembahasan',
    ref:'Rujukan',
    score:(s,t)=>`Skor ${s} / ${t}`,
    restart:'Main lagi',
    share:'Bagikan skor',
    best:'Terbaik',
  } : {
    progress:(c,t)=>`Question ${c} / ${t}`,
    next:'Next →',
    finish:'See score →',
    review:'Review',
    ref:'Ref',
    score:(s,t)=>`Score ${s} / ${t}`,
    restart:'Play again',
    share:'Share score',
    best:'Best',
  };

  function shuffle(a){ for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
  const questions = shuffle([...pool]).slice(0,10);
  let idx=0, score=0, picked=null, revealed=false;

  function render() {
    const q = questions[idx];
    el.innerHTML = `
      <div class="quiz-wrap">
        <div class="quiz-progress">
          <span class="font-mono text-2xs uppercase tracking-widest text-shasec-muted">${T.progress(idx+1, questions.length)}</span>
          <div class="flex-1 h-1.5 rounded-full bg-shasec-border overflow-hidden"><div class="h-full bg-shasec-primary transition-all" style="width:${(idx/questions.length)*100}%"></div></div>
          <span class="font-mono text-2xs text-shasec-primary">${score}</span>
        </div>
        <p class="quiz-q">${idx+1}. ${q.q}</p>
        <div class="quiz-opts" id="quiz-opts">
          ${q.opts.map((o,i)=>`<button type="button" class="quiz-opt" data-i="${i}"><span class="font-mono text-2xs opacity-60 mr-2">${String.fromCharCode(65+i)}.</span>${o}</button>`).join('')}
        </div>
        <div id="quiz-explain" class="hidden"></div>
      </div>
    `;
    el.querySelectorAll('[data-i]').forEach(b=> b.addEventListener('click', ()=> choose(parseInt(b.dataset.i,10))));
  }

  function choose(i){
    if (revealed) return;
    revealed=true; picked=i;
    const q = questions[idx];
    const correct = i===q.a;
    if (correct) score++;
    const opts = el.querySelectorAll('[data-i]');
    opts.forEach(b=>{
      const bi = parseInt(b.dataset.i,10);
      b.disabled=true;
      if (bi===q.a) b.classList.add('is-correct');
      else if (bi===i && !correct) b.classList.add('is-wrong');
      if (bi===i) b.classList.add('is-selected');
    });
    const ex = document.getElementById('quiz-explain');
    ex.className='quiz-explain';
    ex.innerHTML = `
      <p class="font-mono text-2xs uppercase tracking-widest ${correct?'text-shasec-primary':'text-shasec-danger'} mb-1">${correct ? (lang==='id'?'Benar':'Correct') : (lang==='id'?'Salah':'Wrong')} — ${T.review}</p>
      <p class="m-0">${q.why}</p>
      <p class="m-0 mt-2 font-mono text-2xs"><a href="${q.ref}" class="text-shasec-primary hover:underline">${T.ref} →</a></p>
      <button type="button" class="btn-primary btn-sm mt-3" id="quiz-next">${idx+1<questions.length?T.next:T.finish}</button>
    `;
    ex.classList.remove('hidden');
    document.getElementById('quiz-next').addEventListener('click', ()=>{
      revealed=false; picked=null;
      if (idx+1 < questions.length) { idx++; render(); }
      else finish();
    });
  }

  function finish(){
    const pct=Math.round(score/questions.length*100);
    let msg = pct===100 ? (lang==='id'?'Sempurna!':'Perfect!') : pct>=80 ? (lang==='id'?'Keren — hampir hafal semua!':'Great — nearly there!') : pct>=60 ? (lang==='id'?'Lumayan — lanjut baca artikelnya ya.':'Not bad — keep reading.') : (lang==='id'?'Ayo latihan lagi — threat intel butuh jam terbang.':'Let’s practice again.');
    try{ const k='shasec_best_quiz'; const prev=parseInt(localStorage.getItem(k)||'0',10); if(score>prev) localStorage.setItem(k,String(score)); }catch{}
    const best = (()=>{ try{ return localStorage.getItem('shasec_best_quiz')||'-'; }catch{ return '-'; }})();
    el.innerHTML = `
      <div class="quiz-wrap text-center">
        <p class="font-mono text-2xs uppercase tracking-[0.16em] text-shasec-primary mb-2">${T.score(score, questions.length)}</p>
        <p class="text-4xl font-bold text-shasec-text-bright mb-1">${pct}%</p>
        <p class="text-sm text-shasec-muted mb-1">${msg}</p>
        <p class="font-mono text-2xs text-shasec-muted-soft mb-6">${T.best}: ${best} / ${questions.length}</p>
        <div class="flex flex-wrap justify-center gap-2">
          <button type="button" class="btn-primary btn-sm" id="quiz-restart">${T.restart}</button>
          <button type="button" class="btn-outline btn-sm" id="quiz-share">${T.share}</button>
        </div>
      </div>
    `;
    document.getElementById('quiz-restart').addEventListener('click', ()=>{
      const qs = shuffle([...pool]).slice(0,10);
      questions.splice(0, questions.length, ...qs);
      idx=0; score=0; revealed=false; picked=null; render();
    });
    document.getElementById('quiz-share').addEventListener('click', async ()=>{
      const txt = lang==='id' ? `Skor Cyber Quiz saya ${score}/${questions.length} di ShaSec Games!` : `My Cyber Quiz score ${score}/${questions.length} on ShaSec Games!`;
      const url=location.href;
      if (navigator.share){ try{ await navigator.share({title:document.title, text:txt, url}); }catch{} }
      else if (navigator.clipboard){ await navigator.clipboard.writeText(txt+' '+url); const b=document.getElementById('quiz-share'); const o=b.textContent; b.textContent='✓ Copied'; setTimeout(()=>b.textContent=o,1200); }
    });
  }

  render();
})();
