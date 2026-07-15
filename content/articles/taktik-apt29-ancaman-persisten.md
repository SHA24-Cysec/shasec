---
title: "Di Balik Taktik APT29: Ancaman yang Persisten"
date: 2026-07-04
draft: false
categories:
  - APT Groups
tags:
  - apt29
  - ttp
  - threat-hunting
summary: "Ringkasan TTP APT29 dan cara memetakannya ke deteksi untuk infrastruktur kritis serta organisasi target intelijen."
cover: "/images/covers/apt29-tactics.jpg"
---

Kelompok yang sering dikaitkan dengan label **APT29** dikenal dengan operasi jangka panjang, penekanan pada stealth, dan pemanfaatan rantai pasok atau identitas yang sah.

## Pola TTP (ringkas)

- **Initial access:** spear-phishing, kompromi rantai pasok, atau token/identitas yang bocor.
- **Execution & persistence:** living-off-the-land, backdoor ringan, valid account.
- **Defense evasion:** menyamarkan traffic, menyalahgunakan cloud/OAuth bila relevan.
- **Collection & exfil:** data mail, dokumen sensitif, atau akses ke lingkungan cloud.

## Apa artinya bagi defender

1. Fokus pada **identitas** sama pentingnya dengan malware signature.
2. Logging yang konsisten (auth, email, endpoint, proxy) adalah prasyarat hunting.
3. Asumsi breach mendorong segmentasi dan least privilege.

## Hunting ideas (tinggi level)

- Login anomali (geo, device, jam) pada akun admin/service.
- Consent OAuth mencurigakan ke aplikasi pihak ketiga.
- Beacon ke domain yang baru terdaftar / low-reputation.

## Mitigasi prioritas

- MFA tahan-phish untuk akun berisiko tinggi.
- Review conditional access & session lifetime.
- Hardening email + lampiran/url sandboxing.
- Latihan tabletop untuk skenario persistensi jangka panjang.

Artikel ini merangkum pola publik untuk **edukasi blue team**, bukan atribusi hukum terhadap entitas tertentu.
