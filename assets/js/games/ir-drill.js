(() => {
  const el = document.getElementById('ir-app');
  if (!el) return;
  const lang = el.dataset.lang === 'en' ? 'en' : 'id';
  const T = lang === 'id' ? {
    progress:(c,t)=>`Langkah ${c} / ${t}`,
    next:'Lanjut →', finish:'Lihat skor →', result:'Skor akhir', best:'Terbaik', restart:'Main lagi', share:'Bagikan skor',
    easy:'Easy', medium:'Medium', hard:'Hard',
    correct:'Tepat!', wrong:'Kurang tepat', why:'Kenapa'
  } : {
    progress:(c,t)=>`Step ${c} / ${t}`,
    next:'Next →', finish:'See score →', result:'Final score', best:'Best', restart:'Play again', share:'Share score',
    easy:'Easy', medium:'Medium', hard:'Hard',
    correct:'Spot on!', wrong:'Not quite', why:'Why'
  };

  const qs = lang==='id' ? [
    { lvl:'Easy', q:'Ransomware terdeteksi di 1 host keuangan. Langkah pertama paling benar?', opts:['Isolasi host dari jaringan (cabut LAN/WiFi, jangan matikan)','Langsung bayar tebusan','Share ke grup WA kantor','Reboot paksa'], a:0, why:'Isolasi cegah lateral movement, tapi jangan matikan agar volatile evidence (RAM) tidak hilang.'},
    { lvl:'Easy', q:'Setelah isolasi, apa next?', opts:['Hapus malware langsung','Amankan bukti volatile: memory dump & log','Restore backup secepatnya','Posting di sosmed'],'a':1, why:'Preservasi bukti dulu sebelum eradication — untuk forensik & hukum.'},
    { lvl:'Easy', q:'C2 IP teridentifikasi 203.0.113.45. Tindakan containment?', opts:['Blok IP di firewall/WAF & EDR','Ignore 1 IP kecil','Ganti password user saja','Update wallpaper'],'a':0, why:'Blok C2 putus kendali attacker.'},
    { lvl:'Medium', q:'Setelah kontainment sukses, urutan benar?', opts:['Recovery → Eradication','Eradication → Recovery','Notifikasi publik dulu','Tutup ticket'],'a':1, why:'Eradikasi (hapus persistence, patch) dulu baru recovery (restore clean backup).'},
    { lvl:'Medium', q:'Breach data pribadi terkonfirmasi. Kewajiban PDP Indonesia (72 jam) — kapan notifikasi?', opts:['Dalam 72 jam setelah identifikasi ke pengendali & jika risiko tinggi ke subjek','Tunggu 1 bulan','Hanya jika media heboh','Tidak perlu lapor'],'a':0, why:'PDP: notifikasi ke pengendali & subjek jika risiko tinggi, garis besar 72 jam.'},
    { lvl:'Medium', q:'Komunikasi insiden: siapa dulu?', opts:['Publik di Twitter','Tim internal: IT, Legal, Manajemen','Kompetitor','Random'],a:1, why:'Internal & legal dulu untuk koordinasi, baru eksternal terukur.'},
    { lvl:'Hard', q:'Backup ada tapi belum pernah diuji restore. Apa?', opts:['Restore langsung ke produksi','Verifikasi integritas & test di isolated env dulu','Hapus backup lama','Bayar saja biar cepat'],'a':1, why:'Restore tanpa verifikasi bisa bawa balik malware / backup corrupt.'},
    { lvl:'Hard', q:'Pasca-recovery, lessons learned terbaik?', opts:['Lupakan saja','Update playbook, patch, tabletop, monitoring','Ganti nama server','Libur tim'],'a':1, why:'Closed-loop: update playbook & hardening agar tidak terulang.'},
  ] : [
    { lvl:'Easy', q:'Ransomware on 1 finance host. First step?', opts:['Isolate host (pull LAN/WiFi, don’t power off)','Pay ransom','Share in WA group','Force reboot'], a:0, why:'Isolate to stop lateral, keep power for volatile evidence.'},
    { lvl:'Easy', q:'After isolate, next?', opts:['Delete malware','Preserve volatile: memory dump & logs','Restore backup','Post on social'],a:1, why:'Preserve before eradication for forensics.'},
    { lvl:'Easy', q:'C2 IP 203.0.113.45 found. Contain?', opts:['Block at firewall/WAF & EDR','Ignore','Change user pw only','Update wallpaper'],a:0, why:'Block C2 to cut control.'},
    { lvl:'Medium', q:'After containment, order?', opts:['Recovery → Eradication','Eradication → Recovery','Public notify first','Close ticket'],a:1, why:'Eradicate persistence then recover.'},
    { lvl:'Medium', q:'Personal data breach — when notify?', opts:['Within 72h after ID to DPA & high-risk subjects','Wait a month','Only if press','No need'],a:0, why:'72h rule for high-risk.'},
    { lvl:'Medium', q:'Comms: who first?', opts:['Public Twitter','Internal: IT, Legal, Mgmt','Competitor','Random'],a:1, why:'Internal/legal first.'},
    { lvl:'Hard', q:'Untested backup. Do?', opts:['Restore to prod now','Verify in isolated env first','Delete old','Pay'],a:1, why:'Verify integrity before restore.'},
    { lvl:'Hard', q:'Post-recovery lessons?', opts:['Forget','Update playbook, patch, tabletop, monitor','Rename server','Holiday'],a:1, why:'Update playbook & harden.'},
  ];

  let idx=0, score=0, picked=null;

  function render(){
    const q=qs[idx];
    el.innerHTML=`
      <div class="quiz-wrap">
        <div class="flex items-center justify-between gap-2 mb-2">
          <span class="font-mono text-2xs uppercase tracking-widest ${q.lvl==='Easy'?'text-shasec-primary':q.lvl==='Medium'?'text-shasec-warning':'text-shasec-danger'}">${q.lvl}</span>
          <span class="font-mono text-2xs text-shasec-muted">${T.progress(idx+1, qs.length)}</span>
        </div>
        <div class="h-1.5 rounded-full bg-shasec-border overflow-hidden mb-4"><div class="h-full bg-shasec-primary transition-all" style="width:${(idx/qs.length*100)}%"></div></div>
        <p class="quiz-q">${idx+1}. ${q.q}</p>
        <div class="quiz-opts" id="ir-opts">
          ${q.opts.map((o,i)=>`<button type="button" class="quiz-opt" data-i="${i}"><span class="font-mono text-2xs opacity-60 mr-2">${String.fromCharCode(65+i)}.</span>${o}</button>`).join('')}
        </div>
        <div id="ir-explain" class="hidden"></div>
      </div>
    `;
    el.querySelectorAll('[data-i]').forEach(b=> b.addEventListener('click', ()=> choose(parseInt(b.dataset.i,10))));
  }

  function choose(i){
    if(picked!==null) return;
    picked=i;
    const q=qs[idx];
    const ok=i===q.a;
    if(ok) score++;
    el.querySelectorAll('[data-i]').forEach(b=>{
      const bi=parseInt(b.dataset.i,10);
      b.disabled=true;
      if(bi===q.a) b.classList.add('is-correct');
      else if(bi===i && !ok) b.classList.add('is-wrong');
    });
    const ex=document.getElementById('ir-explain');
    ex.className='quiz-explain';
    ex.innerHTML=`
      <p class="font-mono text-2xs uppercase tracking-widest ${ok?'text-shasec-primary':'text-shasec-danger'} mb-1">${ok?T.correct:T.wrong} — ${T.why}</p>
      <p class="m-0">${q.why}</p>
      <button type="button" class="btn-primary btn-sm mt-3" id="ir-next">${idx+1 < qs.length ? T.next : T.finish}</button>
    `;
    ex.classList.remove('hidden');
    document.getElementById('ir-next').addEventListener('click', ()=>{
      picked=null;
      if(idx+1 < qs.length){ idx++; render(); } else finish();
    });
  }

  function finish(){
    const pct=Math.round(score/qs.length*100);
    let msg=pct===100?(lang==='id'?'Sempurna — komandan IR!':'Perfect — IR Commander!'):pct>=75?'Great':pct>=50?'Not bad':(lang==='id'?'Latihan lagi':'Practice');
    try{ const k='shasec_best_ir'; const p=parseInt(localStorage.getItem(k)||'0',10); if(score>p) localStorage.setItem(k,String(score)); }catch{}
    const best=(()=>{try{return localStorage.getItem('shasec_best_ir')||'-'}catch{return '-'}})();
    el.innerHTML=`
      <div class="quiz-wrap text-center">
        <p class="font-mono text-2xs uppercase tracking-[0.16em] text-shasec-primary mb-2">${T.result} • ${score}/${qs.length}</p>
        <p class="text-4xl font-bold text-shasec-text-bright mb-1">${pct}%</p>
        <p class="text-sm text-shasec-muted mb-1">${msg}</p>
        <p class="font-mono text-2xs text-shasec-muted-soft mb-6">${T.best}: ${best} / ${qs.length}</p>
        <div class="flex flex-wrap justify-center gap-2">
          <button type="button" class="btn-primary btn-sm" id="ir-restart">${T.restart}</button>
          <button type="button" class="btn-outline btn-sm" id="ir-share">${T.share}</button>
        </div>
      </div>
    `;
    document.getElementById('ir-restart').addEventListener('click', ()=>{ idx=0; score=0; picked=null; render(); });
    document.getElementById('ir-share').addEventListener('click', async ()=>{
      const txt= lang==='id'?`Skor IR Drill ${score}/${qs.length} di ShaSec Games!`:`My IR Drill ${score}/${qs.length} on ShaSec Games!`;
      const url=location.href;
      if(navigator.share){ try{ await navigator.share({title:document.title, text:txt, url}); }catch{} }
      else if(navigator.clipboard){ await navigator.clipboard.writeText(txt+' '+url); const b=document.getElementById('ir-share'); const o=b.textContent; b.textContent='✓ Copied'; setTimeout(()=>b.textContent=o,1200); }
    });
  }
  render();
})();
