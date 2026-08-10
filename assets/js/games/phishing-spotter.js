(() => {
  const el = document.getElementById('phishing-app');
  if (!el) return;
  const lang = el.dataset.lang === 'en' ? 'en' : 'id';

  const T = {
    id: {
      correct: 'Benar!',
      wrong: 'Melenceng',
      next: 'Lanjut →',
      result: 'Skor akhir',
      best: 'Skor terbaik',
      share: 'Bagikan skor',
      restart: 'Main lagi',
      progress: (c,t)=> `Skenario ${c} dari ${t}`,
      score: (s,t)=> `${s} / ${t} benar`,
    },
    en: {
      correct: 'Correct!',
      wrong: 'Off mark',
      next: 'Next →',
      result: 'Final score',
      best: 'Your best',
      share: 'Share score',
      restart: 'Play again',
      progress: (c,t)=> `Scenario ${c} of ${t}`,
      score: (s,t)=> `${s} / ${t} correct`,
    }
  }[lang];

  const scenarios = lang === 'id' ? [
    {
      from: 'no-reply@shopee.co.id <n0-reply@shopee-secure-id.shop>',
      subject: 'Pesanan dibatalkan — verifikasi segera',
      body: 'Halo kak, pesanan #SPX-88219 dibatalkan karena alamat tidak valid. Klik https://shopee-secure-id.shop/verifikasi-alamat untuk konfirmasi dalam 2 jam atau dana hangus.\n— Shopee',
      isPhish: true,
      why: 'Domain palsu .shop bukan .co.id, urgensi 2 jam, minta klik link. Cek di aplikasi resmi, bukan via link.'
    },
    {
      from: 'bri-notifikasi@bri.co.id',
      subject: 'Mutasi kredit Rp 1.200.000',
      body: 'Mutasi kredit Rp1.200.000 ke rekening Anda pukul 09:12 WIB. Jika bukan Anda, hubungi 14017 atau cabang BRI terdekat. Info saldo: BRImo.',
      isPhish: false,
      why: 'Tidak minta klik link / OTP, hanya info dan arahkan ke channel resmi. Tetap verifikasi via BRImo, bukan via link balas.'
    },
    {
      from: 'it-support@perusahaan-anda.com',
      subject: 'Reset password Microsoft 365 — diperlukan',
      body: 'Tim IT: Silakan reset password via https://perusahaan-anda.com.sso-login365.work/reset . Gunakan SSO perusahaan. Deadline hari ini jam 17:00.',
      isPhish: true,
      why: 'Domain meniru SSO (sso-login365.work), bukan domain perusahaan. Hover link: subdomain mengarah ke luar.'
    },
    {
      from: 'noreply@tokopedia.com',
      subject: 'Kode OTP Tokopedia',
      body: 'Kode OTP Anda 482913 berlaku 5 menit. JANGAN bagikan ke siapa pun. Tokopedia tidak pernah minta OTP via telepon/WA.',
      isPhish: false,
      why: 'OTP legit tidak minta dibalas. Phishing biasanya minta OTP dikirim balik atau via link.'
    },
    {
      from: 'CS BCA <cs.bca.promo@bca-promo-claim.net>',
      subject: 'Selamat! Anda dapat cashback Rp 500.000',
      body: 'Klaim cashback BCA Rp500rb: download APK di https://bca-promo-claim.net/cashback.apk dan login.',
      isPhish: true,
      why: 'BCA tidak pernah bagi APK via link. Domain -claim.net mencurigakan + minta install APK = malware.'
    },
    {
      from: 'no-reply@google.com',
      subject: 'Perangkat baru login — Pixel 7',
      body: 'Perangkat Pixel 7 baru login ke akun Anda di Jakarta. Jika ini Anda, abaikan. Jika bukan, amankan akun: https://myaccount.google.com/notifications',
      isPhish: false,
      why: 'Link ke myaccount.google.com (domain resmi) dan tidak minta password. Tetap buka manual via browser bila ragu.'
    },
    {
      from: '+62 812-3456-7890 via WhatsApp',
      subject: 'Paket J&T tertahan',
      body: 'Paket J&T Anda tertahan. Cek resi: https://jnt-track-indo.my.id/resi?code=JP8821 . Isi data untuk pengiriman ulang.',
      isPhish: true,
      why: 'Domain my.id palsu bukan jnt.co.id, minta isi data pribadi. Cek resi hanya di aplikasi J&T resmi.'
    },
    {
      from: 'security@shasec.my.id',
      subject: '[ShaSec] Verifikasi email berlangganan',
      body: 'Klik tautan ini untuk verifikasi langganan ShaSec: https://shasec.my.id/subscribe/verify?token=abc123 — berlaku 24 jam.',
      isPhish: false,
      why: 'Domain shasec.my.id resmi, link verifikasi wajar, tidak minta password/OTP.'
    },
  ] : [
    {
      from: 'no-reply@shopee.co.id <n0-reply@shopee-secure-id.shop>',
      subject: 'Order cancelled — verify now',
      body: 'Your order #SPX-88219 cancelled due invalid address. Click https://shopee-secure-id.shop/verify-address within 2 hours or refund forfeited.',
      isPhish: true,
      why: 'Fake .shop domain, urgency pressure, asks to click. Check via official app instead.'
    },
    {
      from: 'bri-notifikasi@bri.co.id',
      subject: 'Credit mutation IDR 1,200,000',
      body: 'Credit IDR 1,200,000 at 09:12 WIB. If not you, call 14017 or visit branch. Check via BRImo.',
      isPhish: false,
      why: 'No link/OTP requested, directs to official channel. Verify via BRImo not reply link.'
    },
    {
      from: 'it-support@your-company.com',
      subject: 'Microsoft 365 password reset required',
      body: 'Please reset via https://your-company.com.sso-login365.work/reset . Use corporate SSO. Due today 17:00.',
      isPhish: true,
      why: 'Spoofed SSO domain (sso-login365.work), not company domain.'
    },
    {
      from: 'noreply@tokopedia.com',
      subject: 'Tokopedia OTP Code',
      body: 'Your OTP 482913 valid 5 minutes. DO NOT share. Tokopedia never asks OTP via call/WA.',
      isPhish: false,
      why: 'Legit OTP never asks you to reply. Phish asks to send OTP back.'
    },
    {
      from: 'CS BCA <cs.bca.promo@bca-promo-claim.net>',
      subject: 'Congrats! IDR 500k cashback',
      body: 'Claim BCA cashback IDR500k: download APK https://bca-promo-claim.net/cashback.apk and login.',
      isPhish: true,
      why: 'BCA never distributes APK via link. -claim.net is shady + APK = malware.'
    },
    {
      from: 'no-reply@google.com',
      subject: 'New device login — Pixel 7',
      body: 'New Pixel 7 login in Jakarta. If this was you, ignore. If not, secure: https://myaccount.google.com/notifications',
      isPhish: false,
      why: 'Link to official myaccount.google.com, no password asked. Open manually if unsure.'
    },
    {
      from: '+62 812-3456-7890 via WhatsApp',
      subject: 'J&T package on hold',
      body: 'Your J&T package on hold. Check: https://jnt-track-indo.my.id/resi?code=JP8821 . Fill data for redelivery.',
      isPhish: true,
      why: 'Fake my.id domain not jnt.co.id, asks for personal data.'
    },
    {
      from: 'security@shasec.my.id',
      subject: '[ShaSec] Verify subscription',
      body: 'Click to verify ShaSec subscription: https://shasec.my.id/subscribe/verify?token=abc123 — valid 24h.',
      isPhish: false,
      why: 'Official shasec.my.id, normal verification, no password/OTP asked.'
    },
  ];

  let idx = 0, score = 0, answered = false;

  function render() {
    const cur = scenarios[idx];
    el.innerHTML = `
      <div class="phish-wrap">
        <div class="phish-progress">
          <span class="font-mono text-2xs uppercase tracking-widest text-shasec-muted">${T.progress(idx+1, scenarios.length)}</span>
          <span class="font-mono text-2xs uppercase tracking-widest text-shasec-primary">${T.score(score, scenarios.length)}</span>
        </div>
        <div class="phish-bar" aria-hidden="true"><div class="phish-bar-fill" style="width:${((idx)/scenarios.length)*100}%"></div></div>
        <div class="phish-msgcard">
          <div class="phish-msg-head">
            <div class="min-w-0">
              <div class="phish-from">${cur.from}</div>
              <div class="phish-subject">${cur.subject}</div>
            </div>
            <span class="badge-muted shrink-0">#${idx+1}</span>
          </div>
          <div class="phish-body">${cur.body.replace(/</g,'&lt;')}</div>
        </div>
        <div class="phish-actions">
          <button type="button" class="phish-btn-phish btn-sm" data-ans="phish">${lang==='id'?'Phishing':'Phishing'} ⛳</button>
          <button type="button" class="phish-btn-legit btn-sm" data-ans="legit">Legit ✓</button>
        </div>
        <div id="phish-feedback" class="hidden"></div>
      </div>
    `;
    el.querySelectorAll('[data-ans]').forEach(b => b.addEventListener('click', () => handle(b.dataset.ans)));
  }

  function handle(ans) {
    if (answered) return;
    answered = true;
    const cur = scenarios[idx];
    const isPhishAns = ans === 'phish';
    const correct = (isPhishAns === cur.isPhish);
    if (correct) score++;
    const fb = document.getElementById('phish-feedback');
    fb.className = 'phish-feedback ' + (correct ? 'is-correct' : 'is-wrong');
    fb.innerHTML = `
      <p class="phish-feedback-title">${correct ? T.correct : T.wrong} — ${cur.isPhish ? 'Phishing' : 'Legit'}</p>
      <p class="text-sm m-0 leading-relaxed ${correct ? 'text-shasec-muted' : 'text-shasec-muted'}">${cur.why}</p>
      <button type="button" class="btn-primary btn-sm mt-3" id="phish-next">${idx+1 < scenarios.length ? T.next : T.result}</button>
    `;
    fb.classList.remove('hidden');
    el.querySelectorAll('[data-ans]').forEach(b => b.disabled = true);
    document.getElementById('phish-next').addEventListener('click', () => {
      answered = false;
      if (idx+1 < scenarios.length) { idx++; render(); }
      else { finish(); }
    });
  }

  function finish() {
    const pct = Math.round(score/scenarios.length*100);
    let msg = pct===100 ? (lang==='id'?'Sempurna — mata elang!':'Perfect — eagle eye!') : pct>=75 ? (lang==='id'?'Bagus — tinggal poles sedikit.':'Great — almost there.') : pct>=50 ? (lang==='id'?'Lumayan — latih lagi pola domain.':'Not bad — practice domain patterns.') : (lang==='id'?'Perlu latihan — phishing makin halus.':'Needs practice — phishing gets subtle.');
    try {
      const k='shasec_best_phishing';
      const prev = parseInt(localStorage.getItem(k)||'0',10);
      if (score>prev) localStorage.setItem(k, String(score));
    } catch {}
    const best = (()=>{ try{ return localStorage.getItem('shasec_best_phishing')||'-'; }catch{ return '-'; }})();
    el.innerHTML = `
      <div class="phish-wrap text-center">
        <p class="font-mono text-2xs uppercase tracking-[0.16em] text-shasec-primary mb-2">${T.result}</p>
        <p class="text-4xl font-bold text-shasec-text-bright mb-1">${score} / ${scenarios.length}</p>
        <p class="text-sm text-shasec-muted mb-1">${pct}% — ${msg}</p>
        <p class="font-mono text-2xs text-shasec-muted-soft mb-6">${T.best}: ${best} / ${scenarios.length}</p>
        <div class="flex flex-wrap justify-center gap-2">
          <button type="button" class="btn-primary btn-sm" id="phish-restart">${T.restart}</button>
          <button type="button" class="btn-outline btn-sm" id="phish-share">${T.share}</button>
        </div>
        <p class="font-mono text-2xs text-shasec-muted-soft mt-6">${lang==='id'?'Tips: cek domain, hover link, dan jangan klik APK/OTP via chat.':'Tip: check domain, hover links, never tap APK/OTP via chat.'}</p>
      </div>
    `;
    document.getElementById('phish-restart').addEventListener('click', ()=>{ idx=0; score=0; answered=false; render(); });
    document.getElementById('phish-share').addEventListener('click', async ()=>{
      const txt = lang==='id' ? `Skor Phishing Spotter saya ${score}/${scenarios.length} di ShaSec Games — coba kalahkan!` : `My Phishing Spotter score ${score}/${scenarios.length} on ShaSec Games — beat me!`;
      const url = location.href;
      if (navigator.share) { try{ await navigator.share({title: document.title, text: txt, url}); }catch{} }
      else if (navigator.clipboard) { await navigator.clipboard.writeText(txt+' '+url); const b=document.getElementById('phish-share'); const o=b.textContent; b.textContent='✓ Copied'; setTimeout(()=>b.textContent=o,1500); }
    });
  }

  render();
})();
