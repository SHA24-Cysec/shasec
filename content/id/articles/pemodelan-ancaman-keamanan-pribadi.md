---
translationKey: "threat-modeling-personal"
title: "Pemodelan Ancaman untuk Keamanan Pribadi: Framework Praktis"
date: 2026-07-24
draft: false
categories:
 - Keamanan Siber
 - Manajemen Risiko
tags:
 - threat modeling
 - keamanan pribadi
 - penilaian risiko
 - stride
 - attack surface
 - perencanaan keamanan
 - operational security
summary: "Nasihat keamanan tanpa konteks adalah noise. Threat modeling kasih Anda peta: apa yang dilindungi, dari siapa dilindungi, bagaimana mereka mungkin menyerang, dan apa yang Anda lakukan. Panduan ini adapt threat modeling profesional (STRIDE, attack trees, kill chains) untuk individu dan keluarga. Background keamanan tidak required."
cover: "/images/articles/threat-modeling-personal.webp"
---

Kebanyakan nasihat keamanan adalah daftar taktik. Pakai password manager. Aktifkan 2FA. Update software. Jangan klik link phishing. Pakai VPN. Bekukan kredit. List bagus. Taktik bekerja. Tapi tanpa framework, Anda tidak bisa prioritas. Anda tidak bisa jelasin kenapa Anda lakukan X tapi tidak Y. Anda tidak bisa adapt saat situasi berubah. Akhirnya Anda lakukan semuanya setengah-tengah atau tidak sama sekali.

Threat modeling ubah itu. Itu cara terstruktur berpikir soal keamanan. Dia tanya empat pertanyaan: Apa yang saya lindungi? Dari siapa saya lindungi? Bagaimana mereka bisa dapat? Apa yang saya mau lakukan soal itu? Jawabannya kasih Anda rencana personal. Anda habiskan effort di mana yang matter. Anda terima risiko di mana yang tidak. Anda tidur lebih nyaman karena tahu kenapa Anda bikin setiap pilihan.

Artikel ini ajarin metode threat modeling praktis diadaptasi dari framework profesional (STRIDE, attack trees, MITRE ATT&CK, kill chains) tapi dibuang jargon dan diskala untuk individu dan keluarga. Anda tidak butuh gelar keamanan. Anda butuh kejujuran soal aset, musuh, dan constraint Anda. Outputnya adalah living document yang Anda review kuartal. Proses butuh dua jam pertama kali, tiga puluh menit kemudian.

## Framework Empat Pertanyaan

Setiap threat model berdiri pada empat pilar. Tulis. Simpan visible.

### 1. Apa Yang Dilindungi? (Aset)

Aset adalah hal yang Anda value. Kategori berbeda, sensitivitas berbeda, konsekuensi beda kalau hilang.

**Aset finansial**: Rekening bank, brokerage, dompet kripto, payment app, catatan pajak, laporan kredit. Hilang = kerugian uang langsung, identity theft, kerusakan kredit.

**Aset identitas**: ID pemerintah, paspor, nomor Social Security, akte kelahiran, nomor SIM. Hilang = identity theft, akun fraudulent, nightmares hukum.

**Kredensial akun**: Email (master key), password manager, media sosial, cloud storage, domain registrar, hosting, GitHub, AWS. Hilang = cascade compromise, impersonation, pencurian data, ransomware.

**Komunikasi pribadi**: Pesan terenkripsi (Signal, WhatsApp), konten email, direct message, voice memo. Hilang = malu pribadi, kerusakan hubungan, harm profesional, blackmail.

**Data pribadi**: Riwayat lokasi, data kesehatan, biometrik, riwayat pencarian, riwayat belanja, kontak, kalender. Hilang = profiling, stalking, diskriminasi, targeted attacks.

**Perangkat**: Telepon, laptop, tablet, hardware keys, external drive, backup. Hilang = akses data, biaya hardware, risiko supply chain kalau replace.

**Kekayaan intelektual**: Hasil kerja, creative writing, kode, riset, desain, ide unpublished. Hilang = kerugian kompetitif, pencurian, kehilangan atribusi.

**Reputasi**: Professional standing, social standing, kreditworthiness, online presence. Hilang = kerugian karir, harm sosial, kerugian finansial.

**Kontinuitas**: Kemampuan kerja, komunikasi, akses uang, buktiin identitas, recover dari bencana. Hilang = cascade failure across all di atas.

Daftar aset Anda. Spesifik. "Email" bukan aset. "Akun Proton Mail (personal), Google Workspace (kerja), iCloud Mail (keluarga)" adalah aset. Masing-masing punya recovery path beda, musuh beda, nilai beda.

### 2. Dari Siapa Dilindungi? (Adversaries)

Adversaries punya capabilities, motivations, dan access. Mereka tidak sama. Rank by likelihood dan impact untuk *Anda*.

**Kriminal oportunistik**: Tool otomatis, credential stuffing, phishing kit, ransomware-as-a-service, info-stealer malware. Motivasi: uang cepat. Capability: rendah ke medium. Access: remote, internet-scale. Target: semua orang. Ini baseline threat semua orang hadapi.

**Kriminal targeted**: Stalker, mantan partner, karyawan tidak senang, pencuri lokal, scammer yang research Anda. Motivasi: harm spesifik ke Anda. Capability: medium. Access: physical proximity, social engineering, perangkat Anda. Target: Anda spesifik.

**Surveillance korporat**: Ad network, data broker, platform tech, employer, asuransi. Motivasi: profit, risk assessment, compliance. Capability: tinggi (legal, pervasive). Access: browsing Anda, apps, devices, public records. Target: populasi including Anda.

**Aktor tingkat negara**: Intelijen, law enforcement, unit cyber militer. Motivasi: national security, espionage, suppression dissent. Capability: sangat tinggi (zero-day, supply chain, legal compulsion). Access: infrastructure, vendor, kabel internasional. Target: individual high-value, organisasi, kadang bycatch.

**Insider threat**: Anggota keluarga, roommate, partner, household staff, teknisi repair. Motivasi: rasa ingin tahu, kontrol, gain finansial, kecelakaan. Capability: physical access, shared accounts, trust. Target: perangkat dan akun Anda di rumah.

**Kehilangan accidental**: Hardware failure, lost device, lupa password, service shutdown, bencana alam, kematian. Motivasi: none. Capability: N/A. Access: barang Anda. Target: kontinuitas Anda.

Anda tidak defend terhadap semua adversaries sama. Jurnalis di negara autoriter model state actors sebagai primary. Crypto holder model targeted criminals sebagai primary. Pensiunan model opportunistic criminals dan accidental loss sebagai primary. Jujur soal profil Anda.

### 3. Bagaimana Mereka Bisa Dapat? (Attack Vectors)

Untuk setiap pair aset-adversary, trace jalur. Di sinilah STRIDE bantu. STRIDE adalah mnemonic untuk enam kategori ancaman. Terapkan ke setiap aset.

**Spoofing**: Adversary pura-pura jadi Anda. Phishing, SIM swap, session hijacking, deepfake voice/video, stolen credentials, dokumen palsu.

**Tampering**: Adversary modifikasi data Anda. Enkripsi ransomware, ekstensi browser berbahaya inject transaksi, backup kompromikan, dokumen diubah, DNS hijacking.

**Repudiation**: Adversary deny aksi yang Anda lakukan, atau Anda tidak bisa buktiin Anda lakukan. Missing audit logs, pesan terhapus, no cryptographic receipts, plausible deniability.

**Information Disclosure**: Adversary lihat yang tidak seharusnya. Data breach, shoulder surfing, screen recording, cloud misconfig, malware exfiltration, backup tidak terenkripsi, metadata leakage.

**Denial of Service**: Adversary bikin aset unavailable. Account lockout, DDoS di site Anda, ransomware, SIM swap potong 2FA, domain expired, cloud account suspension.

**Elevation of Privilege**: Adversary dapat akses lebih dari intended. Local privilege escalation, container escape, admin token theft, OAuth scope creep, sudo bypass, rootkit.

Map ke aset Anda. Contoh: "Email saya (aset) vs kriminal oportunistik (adversary). Spoofing: credential stuffing pada password reuse. Tampering: email forwarding rule ke penyerang. Info disclosure: breach di provider. DoS: password reset lockout. Elevation: email dipakai reset password bank."

### 4. Apa Yang Saya Mau Lakukan? (Mitigasi dan Penerimaan)

Setiap mitigasi punya cost: uang, waktu, convenience, friction, kompleksitas. Anda punya budget untuk masing-masing. Threat modeling bikin tradeoffs eksplisit.

**Eliminasi**: Hapus aset atau vector. Hapus akun lama. Berhenti pakai layanan. Pakai cash bukan kartu. Tidak selalu possible.

**Reduksi**: Turunkan likelihood atau impact. Password unik + password manager kurangi credential stuffing. Hardware 2FA kurangi phishing. Backup terenkripsi kurangi impact ransomware. Signal kurangi disclosure pesan.

**Transfer**: Geser risiko. Asuransi (cyber, identity theft). Layanan custodial (exchange pegang kripto, tapi tambah counterparty risk). Struktur legal (LLC untuk portofolio domain).

**Terima**: Akui risiko. Tidak lakukan extra. "Kalau akun Netflix saya di-hack, saya reset. Tidak worth hardware key." Dokumentasikan penerimaan. Revisit kuartal.

Output langkah ini adalah prioritized action list. Bukan "lakukan semuanya." Lakukan item high-impact, low-cost dulu. Terima sisanya dengan sadar.

## Bangun Threat Model Pribadi Anda: Step by Step

### Langkah 1: Inventaris Aset (30 menit)

Buat spreadsheet. Kolom: Aset, Kategori, Sensitivitas (Tinggi/Sedang/Rendah), Kesulitan Recovery (Tinggi/Sedang/Rendah), Proteksi Saat Ini, Gap.

Sensitivitas: Tinggi = kebangkrutan finansial, identity theft, kehilangan karir, bahaya fisik. Sedang = hassle signifikan, kerugian finansial < $10k, pelanggaran privasi. Rendah = annoyance, recoverable dalam jam.

Kesulitan Recovery: Tinggi = tidak ada jalur recovery, proses hukum, irreversible (kripto, identitas). Sedang = hari ke minggu, support ticket, beberapa data loss. Rendah = menit ke jam, self-service reset.

Isi. Teliti. Masukkan: setiap email, setiap akun finansial, setiap cloud storage, setiap domain, setiap perangkat, setiap backup, setiap dokumen ID, setiap channel komunikasi, setiap langganan dengan payment tersimpan.

Contoh baris:
- Aset: Proton Mail (personal)
- Kategori: Kredensial akun / Komunikasi pribadi
- Sensitivitas: Tinggi
- Kesulitan Recovery: Sedang (recovery phrase + support)
- Proteksi Saat Ini: Hardware 2FA, recovery phrase di safe, no phone recovery
- Gap: Legacy contact tidak terkonfigurasi

### Langkah 2: Ranking Adversary (15 menit)

Daftar adversary Anda. Rank 1-5 by concern. Untuk masing-masing, catat: Capability (Rendah/Sedang/Tinggi), Motivasi (Opportunistik/Targeted/Incidental), Access (Remote/Physical/Legal).

Contoh:
1. Kriminal oportunistik (Credential stuffing, phishing) - Capability: Sedang, Motivasi: Opportunistik, Access: Remote
2. Kehilangan accidental (Hardware failure, lost phone) - Capability: N/A, Motivasi: Incidental, Access: Physical
3. Surveillance korporat (Google, Meta, data broker) - Capability: Tinggi, Motivasi: Profit, Access: Remote/Legal
4. Kriminal targeted (SIM swap, stalking) - Capability: Sedang, Motivasi: Targeted, Access: Remote/Physical
5. Aktor negara - Capability: Tinggi, Motivasi: Targeted, Access: Legal/Infrastructure (Low concern untuk saya)

Ranking Anda drive prioritas. Kalau #1 adalah kriminal oportunistik, password manager + hardware 2FA + credit freeze adalah top. Kalau #2 adalah accidental loss, backup + testing recovery adalah top. Kalau #3 adalah surveillance korporat, de-Googling + hardened browser + VPN adalah top.

### Langkah 3: Attack Tree untuk Top Aset (45 menit)

Pilih 3-5 aset teratas by (Sensitivitas × Kesulitan Recovery). Untuk masing-masing, gambar attack tree. Root node: "Aset kompromikan." Child nodes: attack vectors. Grandchildren: teknik spesifik. Leaves: aksi atomik.

Contoh: "Dompet hardware kripto kompromikan"
- Pencurian fisik device
  - Pencurian rumah
  - Pickpocket / mugging
  - Evil maid (kamar hotel)
- Kompromi seed phrase
  - Backup kertas ditemukan
  - Foto seed di telepon
  - Cloud backup seed
  - Social engineering keluarga
- Supply chain attack device
  - Firmware berbahaya pre-installed
  - Evil maid modifikasi device
- Koersi
  - Duress PIN (kalau supported)
  - Ancaman fisik ke holder

Untuk setiap leaf, catat: Adversary (dari Langkah 2), Likelihood (Tinggi/Sedang/Rendah), Impact (Tinggi/Sedang/Rendah), Mitigasi Saat Ini, Gap.

Ini jantung model. Memaksa Anda lihat full attack surface. Anda akan temukan gap yang kelewat.

### Langkah 4: Perencanaan Mitigasi (30 menit)

Untuk setiap gap di Langkah 3, usulkan mitigasi. Estimasi: Cost ($), Time (jam), Friction (Tinggi/Sedang/Rendah), Effectiveness (Tinggi/Sedang/Rendah).

Contoh:
- Gap: Seed phrase backup kertas di laci meja
- Mitigasi: Pindah ke safe tahan api di lokasi tersembunyi
- Cost: $50 (safe), Time: 1 jam, Friction: Rendah, Effectiveness: Tinggi
- Keputusan: Lakukan akhir pekan ini.

- Gap: Tidak ada duress PIN di hardware wallet
- Mitigasi: Upgrade ke wallet support duress (Trezor, Coldcard) atau terima risiko
- Cost: $150, Time: 2 jam migrasi, Friction: Sedang, Effectiveness: Tinggi
- Keputusan: Jadwalkan bulan depan.

- Gap: Telepon punya foto seed (dihapus tapi recoverable)
- Mitigasi: Factory reset telepon, restore dari backup bersih
- Cost: $0, Time: 2 jam, Friction: Tinggi, Effectiveness: Tinggi
- Keputusan: Lakukan malam ini.

Prioritaskan by (Effectiveness × Likelihood × Impact) / (Cost + Friction). Lakukan item high-ratio dulu.

### Langkah 5: Register Penerimaan (15 menit)

Daftar setiap gap yang Anda putuskan TIDAK mitigasi. Untuk masing-masing: Aset, Adversary, Vector, Alasan (Cost terlalu tinggi / Friction terlalu tinggi / Likelihood terlalu rendah / Impact acceptable / Out of scope).

Contoh:
- Aset: Akun Netflix
- Adversary: Kriminal oportunistik
- Vector: Credential stuffing
- Alasan: Impact rendah (reset password), friction hardware key tidak worth untuk streaming. Terima.

Review register ini kuartal. Keadaan berubah. Yang Anda terima tahun lalu mungkin unacceptable hari ini.

### Langkah 6: Living Document

Gabungkan Langkah 1-5 jadi satu dokumen (encrypted note, printed binder, password manager secure note). Struktur:

1. **Inventaris Aset** (tabel)
2. **Ranking Adversary** (list dengan rationale)
3. **Attack Trees** (untuk 5 aset teratas)
4. **Rencana Mitigasi** (tabel prioritas dengan status: Done / In Progress / Planned / Accepted)
5. **Register Penerimaan** (tabel)
6. **Log Review** (tanggal, perubahan, next review date)

Set reminder kalender: Review kuartal. 30 menit. Update aset. Re-rank adversary. Cek status mitigasi. Test satu recovery. Tambah gap baru. Hapus yang resolved.

## Menerapkan Framework Profesional Secara Ringan

### STRIDE per Aset

Anda sudah pakai STRIDE di Langkah 3. Untuk setiap aset, tulis enam kategori STRIDE dan satu-kalimat ancaman. Ini memastikan coverage.

### Kill Chain Mapping

Cyber Kill Chain (Recon → Weaponization → Delivery → Exploitation → Installation → C2 → Actions) map ke personal attacks juga.

- **Recon**: Penyerang temukan email Anda di LinkedIn, telepon di breach, alamat di public records.
- **Weaponization**: Penyerang buat phishing email dengan logo bank Anda, beli jasa SIM swap, siapkan malware.
- **Delivery**: Email dikirim, SMS dikirim, link berbahaya diposting, USB ditinggal.
- **Exploitation**: Anda masukkan kredensial, SIM swapped, Anda buka file, Anda colok USB.
- **Installation**: Malware persist, penyerang tambah forwarding rule, penyerang enroll 2FA mereka.
- **C2**: Penyerang baca email, curi kripto, posting asli Anda, enkripsi file.
- **Actions**: Uang dipindah, data dijual, akun di-ransom, reputasi hancur.

Defense di setiap stage:
- Recon: Minimalkan public footprint. Opt out data broker. Pakai alias.
- Weaponization: Tidak defendable (sisi penyerang).
- Delivery: Email filtering, SMS awareness, no random USB, hardened browser.
- Exploitation: Hardware 2FA (phishing gagal), password manager (no reuse), no admin daily driver.
- Installation: EDR/AV, restricted execution, app allowlisting.
- C2: Network monitoring, DNS filtering, egress firewall.
- Actions: Backup immutable, transaction alert, account recovery prep.

Anda tidak bisa stop semua stage. Pilih mana invest based on adversary ranking.

### MITRE ATT&CK untuk Mobile/Cloud

MITRE ATT&CK punya matrix untuk Mobile, Cloud, Enterprise. Browse Mobile matrix (attack.mitre.org/matrices/mobile). Lihat teknik: "Phishing: SMS," "Exploit Public-Facing Application," "Valid Accounts," "OS Credential Dumping." Match ke attack trees Anda. Kasih vocab untuk research defensa spesifik.

## Threat Model Pribadi Umum

### Crypto Holder

**Top Aset**: Hardware wallet, akun exchange, seed phrases, email (recovery), telepon (SIM).
**Top Adversaries**: Kriminal targeted (SIM swap, phishing, fisik), Kriminal oportunistik (credential stuffing), Insider (keluarga/roommate).
**Key Vectors**: SIM swap → email reset → exchange drain. Phishing → malware → clipboard hijack → seed theft. Physical theft → seed extraction. Supply chain → malicious firmware.
**Priority Mitigations**: Hardware 2FA di email/exchanges (no SMS). No seed photos. Seed di safe (Shamir split). Duress wallet. Telepon terpisah untuk 2FA (no SIM). Exchange withdrawal whitelists. Multi-sig untuk holding besar.

### Jurnalis / Aktivis

**Top Aset**: Identitas sumber, karya unpublished, komunikasi, lokasi, devices, akun.
**Top Adversaries**: Aktor negara (legal compulsion, zero-day, supply chain), Kriminal targeted (doxxing, harassment), Surveillance korporat (subpoenas).
**Key Vectors**: Device seizure di border. Spyware (Pegasus, Predator). Subpoena ke cloud provider. Phishing dengan lure tailored. Network interception. Analisis metadata.
**Priority Mitigations**: Signal (disappearing messages). GrapheneOS atau Lockdown Mode. No cloud backup data sensitif. VeraCrypt hidden volumes. Kontak lawyer pre-arranged. Akun pseudonim untuk riset. Burner devices untuk meeting high-risk. No biometrics (compellable). Duress passwords.

### Remote Worker / Digital Nomad

**Top Aset**: Kredensial kerja, data klien, akses kode, akun finansial, devices, connectivity.
**Top Adversaries**: Kriminal oportunistik (public WiFi, credential stuffing), Surveillance korporat (employer monitoring), Kehilangan accidental (pencurian, kerusakan, seizure border), Kriminal targeted (spear phishing untuk akses korporat).
**Key Vectors**: Hotel WiFi MITM. Shoulder surfing di cafe. Pencurian laptop dari Airbnb. Employer MDM / spyware. Phishing target corporate VPN. Border device search.
**Priority Mitigations**: WireGuard VPN ke trusted exit (self-hosted atau Mullvad/AzirVPN). Privacy screen. Encrypted disk (BitLocker/FileVault/LUKS). Hardware 2FA untuk semua akun kerja. Perangkat kerja/personal terpisah. Travel dengan data minimal. Cloud-only workflow (no local secrets). Border crossing protocol (power off, nomor lawyer).

### Family Manager

**Top Aset**: Foto keluarga, identitas anak, akun finansial, catatan medis, akun sekolah, smart home, lokasi.
**Top Adversaries**: Kriminal oportunistik (family phishing, credential stuffing), Surveillance korporat (data anak, mainan smart), Kehilangan accidental (lost phone, lupa password, kematian), Insider (anak install malware, ex-partner).
**Key Vectors**: Anak klik link berbahaya → malware → keylogger → bank orang tua. Mainan smart breach → voice/lokasi anak. Breach platform sekolah → SSN. Ex-partner retain akses ke shared accounts. Orang tua meninggal → no akses ke apapun.
**Priority Mitigations**: Family password manager (1Password Families, Bitwarden Organizations). Parental controls + approved app list. Credit freeze anak. Shared photo library (iCloud/Google). Digital estate plan (legacy contacts, emergency access). Guest network untuk IoT. Regular "security Sunday" dengan anak.

### Pensiunan / User Non-Teknis

**Top Aset**: Rekening bank, Social Security, Medicare, email, foto, telepon, portal medis.
**Top Adversaries**: Kriminal oportunistik (grandparent scam, tech support scam, phishing), Kehilangan accidental (lupa password, lost phone, kematian), Insider (caregiver, family financial abuse).
**Key Vectors**: Phone scam ("IRS," "cucu di penjara"). Tech support scam ("komputer Anda ada virus"). Phishing email ("update kartu Medicare"). Malware dari software "gratis". Lupa password → lockout → no recovery.
**Priority Mitigations**: Password manager simpel (Bitwarden, Proton Pass) dengan emergency access untuk anak trusted. Hardware key (YubiKey Bio - sidik jari, no PIN). Credit freeze. Call blocking (carrier + app). No remote access software (TeamViewer, AnyDesk). Cheat sheet cetak: "Bank tidak pernah telepon minta password. Tutup. Telpon nomor di kartu." Digital estate plan.

## Tools untuk Threat Modeling

**Draw.io / diagrams.net**: Gratis, browser-based, save ke file lokal atau cloud. Bagus untuk attack trees.

**Threat Dragon (OWASP)**: Gratis, open source, web dan desktop. Guided STRIDE modeling. Export JSON.

**SeaSponge**: Gratis, web-based, attack tree focused. Simpel.

**Microsoft Threat Modeling Tool**: Gratis, Windows only, STRIDE-based, enterprise-oriented tapi usable.

**Pen dan kertas**: Tercepat untuk first pass. Foto. Digitize later.

**Password manager secure note**: Simpan living document terenkripsi. Accessible di semua devices.

## Ritual Review Kuartal

Jadwalkan 90 menit. Hari yang sama tiap kuartal (equinoxes/solstices works well).

1. **Tarik dokumen.** Baca. Masih reflect kehidupan Anda?
2. **Update aset.** Tambah akun baru. Hapus yang closed. Adjust sensitivitas.
3. **Cek adversaries.** Ancaman baru? (Pekerjaan baru, lokasi baru, event berita, perubahan keluarga.)
4. **Review mitigasi.** Tandai done. Pindah in-progress. Tambah gap baru dari life changes.
5. **Test satu recovery.** Pilih akun kritis. Simulasi kehapusan: hapus authenticator, pakai backup key, pakai recovery code. Verifikasi jalan. Dokumentasi waktu dan friction.
6. **Rotasi satu secret.** Ganti satu password. Rotasi satu API key. Re-enroll satu hardware key.
7. **Update register penerimaan.** Risiko yang diterima sekarang unacceptable? Yang unacceptable sekarang diterima?
8. **Log review.** Tanggal, perubahan, next date.

Review ADALAH model. Tanpa itu, dokumen busuk. Dengan itu, model evolve dengan Anda.

## Kapan Harus Minta Bantuan Profesional

Threat modeling scales. Untuk individu dan keluarga, framework ini cukup. Untuk UMKM, tambah: data flow diagrams, trust boundaries, regulatory requirements (GDPR, HIPAA, PCI), vendor risk, incident response plan. Untuk high-net-worth individuals, tambah: executive protection, physical security, travel security, family office coordination, kidnap/ransom insurance. Untuk organisasi, sewa security firm untuk formal threat modeling workshops.

Tapi core habit aset, adversary, vector, mitigasi, penerimaan tetap sama. Mulai personal. Kuasai kebiasaan. Scale saat needed.

## Model Pertama Anda Malam Ini

Jangan overthink. Buka spreadsheet. Daftar sepuluh aset. Rank tiga adversaries. Pilih aset #1 Anda. Gambar attack tree-nya di kertas. Temukan satu gap. Perbaiki minggu ini. Itu threat modeling. Sisanya refinement.

Keamanan bukan produk. Itu proses. Threat modeling adalah proses yang bikin proses jujur.

> **Catatan editorial:** Framework ini adapt metodologi established (STRIDE, kill chain, MITRE ATT&CK) untuk personal use. Bukan substitute untuk professional risk assessment di lingkungan regulated atau high-consequence. Tailor depth ke risk profile aktual Anda. Threat model terbaik adalah yang Anda actually maintain.