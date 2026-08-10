(() => {
  const el = document.getElementById('soc-app');
  if (!el) return;
  const lang = el.dataset.lang === 'en' ? 'en' : 'id';
  const L = lang==='id' ? {
    progress:(c,t)=>`Antrian ${c} / ${t}`, correct:'Prioritas tepat!', wrong:'Meleset', next:'Lanjut →', result:'Skor akhir', best:'Terbaik', restart:'Main lagi', share:'Bagikan skor',
    tap:'Pilih alert prioritas tertinggi — tangani dulu'
  } : {
    progress:(c,t)=>`Queue ${c} / ${t}`, correct:'Right call!', wrong:'Off', next:'Next →', result:'Final score', best:'Best', restart:'Play again', share:'Share score',
    tap:'Pick highest priority alert first'
  };

  const scenarios = [
    { title:'Ransomware vs Phishing vs Scan', alerts:[
      {t:' Ransomware — encryption in progress on DC01', sev:'CRITICAL', why:'Encryption active — seconds matter, isolate now', pri:3},
      {t:'Phishing — user reported suspicious email', sev:'HIGH', why:'User reported, not yet clicked', pri:2},
      {t:'Vuln scan — external scanner detected', sev:'LOW', why:'Recon, no exploit yet', pri:1},
    ], a:0 },
    { title:'Data exfiltration vs Failed login', alerts:[
      {t:'Exfil — 2GB out to 185.220.101.1 via DNS tunnel', sev:'CRITICAL', why:'Data leaving — contain egress', pri:3},
      {t:'Failed login — 1x wrong password', sev:'LOW', why:'Single fail, likely typo', pri:0},
      {t:'Phishing — link clicked but blocked', sev:'HIGH', why:'Clicked but blocked, need user + IOC', pri:2},
    ], a:0 },
    { title:'Insider vs Malware', alerts:[
      {t:'Insider — HR staff bulk download 10k HR files at 02:00', sev:'CRITICAL', why:'Possible data theft off-hours', pri:3},
      {t:'Malware — adware popups on 1 marketing host', sev:'MEDIUM', why:'Adware, not ransomware', pri:1},
      {t:'Brute force — 5 fails on VPN', sev:'HIGH', why:'5 fails, need block but not yet breach', pri:2},
    ], a:0 },
    { title:'Supply chain vs Phishing', alerts:[
      {t:'Supply chain — new npm package with obfuscated postinstall', sev:'CRITICAL', why:'Postinstall can steal env, block deploy', pri:3},
      {t:'Phishing — email with .html attachment', sev:'HIGH', why:'HTML smuggling possible', pri:2},
      {t:'Info — TLS cert expiry in 30 days', sev:'LOW', why:'30 days, plan renewal', pri:0},
    ], a:0 },
    { title:'DDoS vs Ransomware', alerts:[
      {t:'DDoS — 500k req/s to public web', sev:'HIGH', why:'Degraded but not data loss', pri:2},
      {t:'Ransomware — note found on file server', sev:'CRITICAL', why:'Ransom note = already encrypted', pri:3},
      {t:'Spam — 20 phishing emails in quarantine', sev:'MEDIUM', why:'Quarantined, not delivered', pri:1},
    ], a:1 },
    { title:'C2 beacon vs Vuln', alerts:[
      {t:'C2 beacon — host 10.0.2.15 every 60s to 45.33.22.5', sev:'CRITICAL', why:'Beacon = compromised', pri:3},
      {t:'Vuln — CVE-2024 low on test host', sev:'LOW', why:'Low, test env', pri:0},
      {t:'Phishing — 2 users reported same email', sev:'HIGH', why:'Multiple reports, need hunt', pri:2},
    ], a:0 },
    { title:'Hard: 4 alerts', alerts:[
      {t:'Brute force — 100 fails/min to O365', sev:'HIGH', why:'High, but still auth fail', pri:2},
      {t:'Ransomware — shadow copies deletion vssadmin', sev:'CRITICAL', why:'Deletion = pre-encryption stage', pri:3},
      {t:'Insider — USB inserted on finance host', sev:'MEDIUM', why:'USB, policy but not yet exfil', pri:1},
      {t:'Info — new login from new device', sev:'LOW', why:'New device, verify but low', pri:0},
    ], a:1 },
    { title:'Hard: 4 alerts 2', alerts:[
      {t:'Phishing — CFO whaling email with wire request $50k', sev:'CRITICAL', why:'BEC whaling CFO = immediate financial risk', pri:3},
      {t:'Malware — coinminer on dev host', sev:'MEDIUM', why:'Miner, not data theft', pri:1},
      {t:'DDoS — WAF blocking, site still up', sev:'HIGH', why:'Mitigated DDoS', pri:2},
      {t:'Scan — port scan from Shodan', sev:'LOW', why:'Internet-wide scan', pri:0},
    ], a:0 },
  ];

  let idx=0, score=0, picked=null;

  function render(){
    const sc=scenarios[idx];
    el.innerHTML=`
      <div class="log-wrap">
        <div class="flex items-center justify-between gap-2 mb-2">
          <span class="font-mono text-2xs uppercase tracking-widest text-shasec-muted">${L.progress(idx+1, scenarios.length)} • ${sc.title}</span>
          <span class="font-mono text-2xs text-shasec-primary">${score}/${scenarios.length}</span>
        </div>
        <div class="h-1.5 rounded-full bg-shasec-border overflow-hidden mb-3"><div class="h-full bg-shasec-primary" style="width:${(idx/scenarios.length*100)}%"></div></div>
        <p class="font-mono text-2xs uppercase tracking-widest text-shasec-muted-soft mb-2">${L.tap}</p>
        <div class="flex flex-col gap-2" id="soc-list">
          ${sc.alerts.map((al,i)=>`<button type="button" class="soc-alert" data-i="${i}"><span class="soc-sev sev-${al.sev.toLowerCase()}">${al.sev}</span><span class="soc-text">${al.t}</span></button>`).join('')}
        </div>
        <div id="soc-feedback" class="hidden mt-4 rounded-xl border p-4"></div>
      </div>
    `;
    el.querySelectorAll('[data-i]').forEach(b=> b.addEventListener('click', ()=> choose(parseInt(b.dataset.i,10))));
  }

  function choose(i){
    if(picked!==null) return;
    picked=i;
    const sc=scenarios[idx];
    const ok=i===sc.a;
    if(ok) score++;
    el.querySelectorAll('[data-i]').forEach(b=>{
      const bi=parseInt(b.dataset.i,10);
      b.disabled=true;
      if(bi===sc.a) b.classList.add('is-correct');
      else if(bi===i && !ok) b.classList.add('is-wrong');
    });
    const fb=document.getElementById('soc-feedback');
    const al=sc.alerts[sc.a];
    fb.className='rounded-xl border p-4 '+(ok?'border-shasec-primary/40 bg-shasec-primary-soft':'border-shasec-danger/40 bg-[#ff5c5c0f]');
    fb.innerHTML=`
      <p class="font-mono text-xs uppercase tracking-widest m-0 mb-1 ${ok?'text-shasec-primary':'text-shasec-danger'}">${ok?L.correct:L.wrong} — ${al.sev}</p>
      <p class="text-sm text-shasec-muted m-0 leading-relaxed">${al.why}</p>
      <button type="button" class="btn-primary btn-sm mt-3" id="soc-next">${idx+1 < scenarios.length ? L.next : L.result}</button>
    `;
    fb.classList.remove('hidden');
    document.getElementById('soc-next').addEventListener('click', ()=>{
      picked=null;
      if(idx+1 < scenarios.length){ idx++; render(); } else finish();
    });
  }

  function finish(){
    const pct=Math.round(score/scenarios.length*100);
    let msg=pct===100?(lang==='id'?'Sempurna — Triase dewa!':'Perfect — triage god!'):pct>=75?'Great':pct>=50?'Not bad':(lang==='id'?'Latihan triase lagi':'More triage drills');
    try{ const k='shasec_best_soc'; const p=parseInt(localStorage.getItem(k)||'0',10); if(score>p) localStorage.setItem(k,String(score)); }catch{}
    const best=(()=>{try{return localStorage.getItem('shasec_best_soc')||'-'}catch{return '-'}})();
    el.innerHTML=`
      <div class="log-wrap text-center">
        <p class="font-mono text-2xs uppercase tracking-[0.16em] text-shasec-primary mb-2">${L.result} • ${score}/${scenarios.length}</p>
        <p class="text-4xl font-bold text-shasec-text-bright mb-1">${pct}%</p>
        <p class="text-sm text-shasec-muted mb-1">${msg}</p>
        <p class="font-mono text-2xs text-shasec-muted-soft mb-6">${L.best}: ${best} / ${scenarios.length}</p>
        <div class="flex flex-wrap justify-center gap-2">
          <button type="button" class="btn-primary btn-sm" id="soc-restart">${L.restart}</button>
          <button type="button" class="btn-outline btn-sm" id="soc-share">${L.share}</button>
        </div>
      </div>
    `;
    document.getElementById('soc-restart').addEventListener('click', ()=>{ idx=0; score=0; picked=null; render(); });
    document.getElementById('soc-share').addEventListener('click', async ()=>{
      const txt= lang==='id'?`Skor SOC Rush ${score}/${scenarios.length} di ShaSec Games!`:`My SOC Rush ${score}/${scenarios.length} on ShaSec Games!`;
      const url=location.href;
      if(navigator.share){ try{ await navigator.share({title:document.title, text:txt, url}); }catch{} }
      else if(navigator.clipboard){ await navigator.clipboard.writeText(txt+' '+url); const b=document.getElementById('soc-share'); const o=b.textContent; b.textContent='✓ Copied'; setTimeout(()=>b.textContent=o,1200); }
    });
  }
  render();
})();
