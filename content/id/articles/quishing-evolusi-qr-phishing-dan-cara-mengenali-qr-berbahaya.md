---
translationKey: "quishing-qr-phishing-evolution"
title: "Quishing: Evolusi QR Phishing dan Cara Mengenali QR Code Berbahaya di 2025"
date: 2026-07-08
draft: false
categories:
  - Keamanan Digital
  - Phishing
tags:
  - quishing
  - qr phishing
  - qr code
  - phishing
  - keamanan digital
  - penipuan qr
summary: "Deep dive quishing di 2025: modus QR palsu di parkir, surat tilang, invoice, dan email HRD. Cara kerja serangan, kenapa filter email gagal deteksi, dan checklist 10 detik untuk scan QR dengan aman."
cover: "/images/articles/quishing-qr-phishing-evolution.webp"
---

Anda scan QR code di meja kafe untuk lihat menu. Atau scan QR di surat tilang parkir yang menempel di kaca mobil. Dua detik kemudian, HP buka website yang mirip e-wallet dan minta login. Anda baru kena quishing.

Quishing adalah phishing lewat QR code. Laporan Unit 42 Palo Alto 2024 mencatat kenaikan 1.200 persen serangan QR phishing dalam setahun. Karena QR tidak bisa dibaca mata manusia, filter email dan mata Anda sama-sama buta.

Artikel ini bedah evolusi quishing 2025, modus di Indonesia, dan cara aman scan QR tanpa jadi korban.

## Kenapa QR code jadi senjata phishing yang efektif

QR code dirancang untuk cepat, bukan aman. Tidak ada verifikasi asal di dalam QR itu sendiri. QR hanya berisi teks atau link. Perangkat Anda yang putuskan apa yang dilakukan dengan link itu.

Tiga alasan quishing naik.

**Filter email buta.** Email phising biasa pakai link teks yang bisa di-scan antivirus. Quishing pakai gambar QR. Filter email lihat gambar, bukan link. Link phising sembunyi di dalam piksel QR, lolos filter.

**Mata manusia buta.** Manusia tidak bisa bedakan QR asli dan QR palsu dengan lihat visual. QR sama-sama kotak hitam putih. Anda harus scan dulu untuk tahu isinya.

**HP langsung buka browser tanpa preview.** Banyak kamera HP langsung buka link setelah scan tanpa tunjukkan URL lengkap. Anda tidak sempat cek domain.

Kombinasi tiga buta ini bikin quishing efektif bahkan untuk karyawan yang sudah training anti-phising.

## Modus quishing yang terjadi di Indonesia dan global 2024-2025

### 1. QR parkir palsu dan surat tilang palsu

Modus yang viral di awal 2025 di Jakarta, Surabaya, dan Bali. Pelaku tempel stiker QR palsu di atas QR asli mesin parkir atau di surat tilang yang ditaruh di kaca mobil.

Korban scan, masuk ke website pembayaran parkir palsu yang minta input kartu kredit atau e-wallet. Situs palsu langsung charge dan curi data kartu.

Ciri: domain pakai nama mirip tapi ada tambahan seperti `bayar-parkir-jakarta.shop` bukan `jakarta.go.id`, tidak ada HTTPS yang valid dengan nama instansi, dan minta data kartu bukan QRIS.

### 2. Invoice dan dokumen HRD dengan QR verifikasi

Serangan ke karyawan UMKM dan korporat. Email dari atasan atau HRD dengan subject "Slip gaji" atau "Invoice PT XYZ" berisi PDF. Di dalam PDF ada QR code dengan tulisan "Scan untuk verifikasi dokumen" atau "Scan untuk lihat file lengkap".

Saat karyawan scan pakai HP, link buka halaman login Microsoft 365 palsu. Karena karyawan sudah login Microsoft di HP, halaman palsu minta password lagi dan 2FA code.

Laporan Proofpoint 2024: 10 persen email phising di kuartal 3 pakai QR sebagai vektor utama. Angka ini naik dari 1 persen tahun sebelumnya.

### 3. QR di meja restoran yang ditimpa stiker

Modus di kafe dan restoran. QR asli di meja untuk menu diganti stiker QR pelaku. Korban scan menu, malah download APK "Menu.apk" yang ternyata malware.

Modus APK palsu ini mirip fake APK scam yang sudah ShaSec bahas, tapi vektornya QR, bukan link chat.

### 4. QR untuk WiFi gratis yang jebak portal phising

QR di bandara, hotel, atau kafe bertuliskan "Scan untuk WiFi gratis". Setelah scan, korban masuk portal captive palsu yang minta login Facebook atau Google. Kredensial dicuri.

WiFi asli biasanya tidak minta login sosial media, hanya agree terms atau input kamar.

### 5. QR donation dan amal palsu

Saat bencana, pelaku sebar poster QR donation palsu di grup WhatsApp. QR menuju e-wallet pelaku, bukan donasi resmi. Donatur tidak bisa lacak karena QRIS e-wallet tidak tampilkan nama organisasi besar.

## Cara kerja teknis quishing

Alur serangan sederhana tapi efektif.

1.  Pelaku buat website phising mirip login Microsoft, Google, atau e-wallet. Domain pakai `microsoft-login-security.com` atau `g00gle.com`.
2.  Pelaku generate QR code dari link phising pakai tool gratis QR generator.
3.  Pelaku kirim QR via email sebagai gambar, atau cetak stiker untuk ditempel fisik.
4.  Korban scan pakai kamera HP. Kamera buka browser ke link phising.
5.  Korban isi kredensial, pelaku dapat password plus 2FA token jika halaman phising pakai proxy adversary-in-the-middle seperti Evilginx.

Versi advanced pakai QR dinamis. QR statis isi link langsung, QR dinamis isi link shortener yang redirect ke link phising berganti-ganti agar tidak diblokir. Jika satu link diblokir, pelaku ganti redirect di shortener tanpa ganti QR cetak.

Ada juga QR yang tidak pakai link sama sekali, tapi pakai perintah `WIFI:T:WPA;S:FakeWiFi;P:password;;` untuk paksa HP join WiFi jahat, atau `mailto:` untuk kirim email ke pelaku.

## Kenapa filter dan antivirus sering gagal deteksi

Email gateway seperti Microsoft Defender dan Google deteksi link phising dengan cek domain dan reputasi. QR code menyimpan domain di dalam gambar, jadi gateway harus OCR dulu QR untuk dapat link, baru cek reputasi. Banyak gateway belum lakukan OCR real-time karena beban CPU.

Selain itu, pelaku pakai layanan QR generator legit seperti qr-code-generator.com. Link awal QR adalah domain legit shortener, bukan domain phising. Gateway lihat domain legit, kasih lewat. Setelah lewat, shortener redirect ke domain phising.

Di sisi fisik, tidak ada filter. QR stiker di mesin parkir tidak punya antivirus. Satu-satunya pertahanan adalah mata dan kebiasaan Anda.

## Checklist 10 detik sebelum scan QR apa pun

Simpan checklist ini di HP.

1.  **Lihat fisik QR.** Apakah stiker ditempel di atas QR asli? Apakah ada bekas lem atau QR ganda? QR resmi biasanya dicetak rapi, bukan stiker kertas tipis ditempel miring.
2.  **Cek konteks.** Apakah masuk akal ada QR di situ? Surat tilang resmi DKI Jakarta pakai QRIS atau QR dengan logo resmi, bukan link ke .shop.
3.  **Pakai scanner yang tunjukkan URL dulu.** Jangan pakai kamera yang langsung buka link. Pakai Google Lens atau scanner bawaan iPhone yang tampilkan preview link. Baca domain sebelum tap Buka.
4.  **Cek domain.** Jika preview tunjukkan `parkir-jakarta-pay.site` bukan `jakarta.go.id`, jangan buka. Jika minta input kartu kredit untuk bayar parkir Rp 5 ribu, curiga.
5.  **Jangan input kredensial setelah scan QR tak dikenal.** QR menu restoran tidak perlu login Google. QR parkir tidak perlu login e-wallet dengan password, cukup QRIS.
6.  **Matikan auto-open QR di kamera.** Di iPhone Settings > Camera > matikan Scan QR code auto open jika Anda mau kontrol. Di Android, pakai Lens untuk preview.
7.  **Jika QR dari email kantor, verifikasi lewat jalur lain.** Email dari HRD dengan QR verifikasi slip gaji tapi pengirim alamat Gmail, bukan domain perusahaan, itu janggal. Chat HRD via Slack untuk konfirmasi.

10 detik cek ini menghemat jam bersih-bersih setelah akun kena phising.

## Cara aman scan QR di Android dan iPhone

**iPhone:**

- Buka Camera, arahkan ke QR. iPhone tampilkan pop-up kuning dengan link. Tap tahan pop-up untuk lihat preview full URL, bukan langsung tap Buka.
- Alternatif: pakai Live Text di Control Center > Code Scanner yang tunjukkan URL lebih jelas.
- Matikan auto-follow di Settings > Safari > matikan Open Links jika Anda mau cek dulu.

**Android:**

- Pakai Google Lens, bukan kamera langsung. Buka Lens, scan QR, Lens tampilkan link plus informasi keamanan jika terdeteksi phising.
- Di Chrome, aktifkan Safe Browsing Enhanced Protection: Settings > Privacy and security > Safe Browsing > Enhanced. Fitur ini cek link QR real-time dengan Google.
- Jika Anda pakai Samsung, scanner bawaan Samsung Internet punya warning phising.

**Tips tambahan:**

- Jangan download APK via QR. Menu restoran harus buka website, bukan suruh download APK.
- Jika QR minta izin akses kamera, mikrofon, atau kontak setelah scan, tolak. Website legit tidak butuh izin itu.

## Apa yang harus dilakukan toko, kafe, dan UMKM untuk cegah QR diganti pelaku

Jika Anda pemilik kafe dengan QR menu di meja, Anda juga bertanggung jawab jaga QR Anda tidak diganti.

1.  **Cetak QR di bahan yang susah diganti.** Pakai akrilik atau frame, bukan stiker kertas yang mudah ditempel ulang.
2.  **Tambah logo dan frame branded.** QR dengan logo tengah dan frame warna kafe lebih susah ditiru pelaku yang pakai QR hitam putih polos.
3.  **Cek QR tiap pagi.** SOP buka toko harus cek semua QR meja masih asli dan scan test ke website resmi.
4.  **Gunakan QR dinamis milik sendiri, bukan statis.** QR dinamis via layanan seperti QR Code Generator Pro dengan domain Anda sendiri bisa Anda ganti tujuan tanpa ganti cetakan, dan bisa Anda pantau berapa kali discan plus lokasi. Jika scan naik tiba-tiba dari negara asing, bisa jadi QR Anda sudah disebar di forum phising.
5.  **Edukasi kasir.** Kasir harus tahu modus tempel stiker dan harus lapor jika lihat orang mencurigakan dekat QR.

Contoh nyata: jaringan kafe di Bali kena quishing karena pelaku tempel QR palsu di 10 meja. Satu pelanggan kena curi data kartu dan lapor di Google Review. Reputasi kafe turun. Solusi kafe ganti semua QR ke akrilik dengan logo.

## Cara lapor dan tangani jika sudah scan QR berbahaya

Anda sudah scan dan isi password.

1.  Putuskan internet HP, aktifkan mode pesawat untuk stop sesi yang mungkin masih aktif.
2.  Dari perangkat lain yang aman, ganti password akun yang Anda isi di halaman palsu.
3.  Logout semua sesi: di Google myaccount.google.com > Security > Your devices > Sign out all. Di Microsoft account.microsoft.com > Security > Sign out everywhere.
4.  Aktifkan 2FA dengan authenticator app jika belum.
5.  Scan HP dengan Play Protect atau antivirus. Jika Anda download APK dari QR, hapus APK dan scan.
6.  Lapor link phising ke Google Safe Browsing https://safebrowsing.google.com/safebrowsing/report_phish/ dan ke patrolisiber.id dengan bukti screenshot QR dan URL.
7.  Jika Anda input data kartu kredit, hubungi bank untuk blokir kartu dan minta ganti kartu baru.

Jangan coba balas dendam scan balik QR pelaku dengan tool aneh. Fokus pulihkan akun.

## Kebijakan untuk kantor kecil dan sekolah

Buat aturan 1 halaman:

- Dilarang kirim dokumen internal via QR tanpa verifikasi pengirim via chat kedua.
- Email HRD tidak akan pernah minta scan QR untuk verifikasi gaji atau password.
- Semua QR di kantor harus punya branding kantor.
- Karyawan wajib pakai scanner yang tampilkan preview URL, dilarang auto-open.

Training 15 menit tiap kuartal dengan simulasi email quishing meningkatkan kesadaran. Kirim email simulasi berisi QR ke halaman training, lihat berapa karyawan scan tanpa cek. Edukasi yang tidak menghukum lebih efektif daripada teguran.

## Sumber dan bacaan lanjutan

- [Unit42 Palo Alto: QR Code Phishing Surge 2024](https://unit42.paloaltonetworks.com/qr-code-phishing/)
- [Proofpoint: QR Code Threat Landscape Q3 2024](https://www.proofpoint.com/us/blog/threat-insight/qr-code-threats)
- [FBI IC3: QR Code Scams Advisory](https://www.ic3.gov/Media/Y2024/PSA240507)
- [CISA: Avoiding Social Engineering and Phishing](https://www.cisa.gov/secure-our-world/avoid-scams)
- [Google Safe Browsing: Report Phishing](https://safebrowsing.google.com/safebrowsing/report_phish/)

> **Catatan editorial:** QR code bukan musuh. QR sangat membantu UMKM. Risiko ada di penerapan tanpa verifikasi. Pakai QR dengan branding dan preview URL untuk jaga pelanggan.

## Pertanyaan yang sering diajukan

### Apakah semua QR berbahaya?

Tidak. QR dari sumber resmi dan dengan preview domain yang jelas aman. Risiko naik jika QR ditempel sembarangan atau dari email tidak dikenal.

### Bagaimana cara bedakan QR asli dan palsu secara visual?

Hampir tidak bisa tanpa scan. Karena itu cek fisik stiker, konteks, dan pakai scanner yang tunjukkan URL.

### Apakah antivirus bisa deteksi QR phising?

Sebagian bisa jika scanner pakai Safe Browsing. Kamera bawaan tanpa Safe Browsing tidak deteksi. Pakai Google Lens atau Chrome dengan Enhanced Protection lebih aman.

### Kenapa pelaku pakai QR bukan link langsung?

Karena QR lolos filter email dan tidak bisa dibaca mata manusia. Link phising langsung mudah diblokir filter.

### Apakah QRIS bisa kena quishing?

Bisa. Pelaku ganti QRIS asli toko dengan QRIS pribadi. Pembayaran masuk ke pelaku. Cek nama merchant di aplikasi e-wallet sebelum konfirmasi bayar.

### Bagaimana cara aman buat QR untuk toko saya?

Pakai generator dengan logo dan domain custom, cetak di akrilik, cek tiap hari, dan gunakan QR dinamis agar bisa ganti tujuan tanpa cetak ulang.

### Apakah saya harus berhenti pakai QR?

Tidak. QR tetap praktis. Cukup pakai scanner yang tampilkan preview URL dan jangan input password setelah scan QR publik.



## Studi kasus: kafe di Bali kena quishing dan review Google turun

Kafe di Ubud pakai QR kode menu di 20 meja, cetak di kertas biasa dilaminating. Pelaku tempel stiker QR palsu di 10 meja tengah malam. QR palsu menuju website `menu-cafe-ubud.site` yang minta login Instagram untuk lihat menu.

Seorang turis Jerman scan, input Instagram, akun diambil alih. Turis tulis review Google bintang 1: "QR menu mereka hack Instagram saya". Rating kafe turun dari 4.6 ke 4.2 dalam seminggu.

Pemilik kafe ganti semua QR jadi akrilik dengan logo, tambah frame branded, dan SOP cek QR tiap buka. Pemilik juga ganti QR dinamis dengan domain sendiri `menu.cafeubudbali.com` sehingga bisa pantau scan.

Setelah 1 bulan, tidak ada lagi laporan dan rating naik kembali.

Pelajaran: biaya akrilik Rp 20 ribu per meja lebih murah daripada kehilangan pelanggan dan reputasi.

## Peta jalan 90 hari untuk UMKM dengan QR

Minggu 1: Audit semua QR di toko, ganti yang kertas tipis ke akrilik berlogo, buat daftar QR resmi di sheet.

Minggu 2: Setup QR dinamis dengan domain sendiri via QR Code Generator Pro, aktifkan tracking scan untuk deteksi anomali.

Minggu 3-4: Training karyawan cara cek QR tiap pagi dan cara identifikasi stiker palsu, plus edukasi cara pakai scanner yang tampilkan URL.

Bulan 2: Pasang tanda kecil di meja: "QR resmi kami hanya domain cafeubudbali.com, jangan login Instagram untuk lihat menu". Edukasi pelanggan.

Bulan 3: Simulasi serangan quishing, tempel QR palsu dummy dan lihat berapa karyawan deteksi. Evaluasi SOP.

Peta jalan ini bikin QR tetap praktis tapi aman.

## Kesalahan yang bikin quishing terus berhasil

Pakai QR statis dari generator gratis tanpa logo dan tanpa monitoring. Pelaku mudah tiru dan Anda tidak tahu QR sudah disebar di forum.

Tidak cek QR fisik tiap hari. QR palsu bisa bertahan berminggu-minggu tanpa sadar sampai ada korban lapor.

Scanner auto-open tanpa preview URL. Karyawan dan pelanggan langsung buka link tanpa cek domain.

Minta login sosial media setelah scan QR menu atau parkir. Praktik ini ajari pelanggan untuk terbiasa input password setelah scan, sehingga saat QR palsu minta login, mereka anggap normal.

Share QR internal via WhatsApp tanpa verifikasi. Karyawan forward QR invoice palsu ke grup finance dan semua scan.

Tidak lapor QR palsu ke Google Safe Browsing. Link phising tetap aktif dan makan korban baru.




## FAQ tambahan dan mitigasi lanjutan

Banyak orang tanya apakah solusi ini gratis. Sebagian besar gratis, sebagian butuh biaya kecil. Firefox Relay gratis 5 alias, SimpleLogin gratis 15 alias, iCloud Hide My Email butuh iCloud+ Rp 15 ribu. Untuk UMKM, biaya €30 per tahun untuk custom domain sepadan dengan waktu yang dihemat.

Apakah solusi ini tahan terhadap serangan canggih? Tidak ada solusi 100 persen. Tapi alias, passkey, dan isolasi IoT mengurangi 80 persen serangan opportunistik yang jadi mayoritas insiden UMKM. Serangan targeted APT butuh pertahanan lebih dalam.

Bagaimana jika karyawan menolak pakai SOP baru? Edukasi dengan contoh nyata lebih efektif daripada paksaan. Tunjukkan kasus kafe di Bali yang rating turun karena QR palsu, atau kos di Jogja yang video CCTV bocor. Kasus nyata membuat orang peduli.

Apakah perlu konsultan mahal? Untuk UMKM dengan data pelanggan di bawah 10 ribu, SOP 1 halaman plus checklist bulanan cukup. Konsultan diperlukan jika Anda kelola data sensitif seperti NIK, foto KTP, atau data finansial besar dan butuh DPIA sesuai UU PDP.

Bagaimana cara ukur keberhasilan? Hitung metrik sederhana: jumlah spam per minggu, jumlah percobaan login gagal, jumlah device IoT yang update. Catat di sheet tiap bulan. Jika angka turun, SOP bekerja.

Satu prinsip: keamanan bukan proyek sekali jadi, tapi kebiasaan bulanan 10-30 menit. Konsistensi lebih penting daripada alat mahal.
