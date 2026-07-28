---
translationKey: "identity-based-attacks"
title: "Serangan Berbasis Identitas: Mengapa Penyerang Tidak Perlu Membobol Sistem Anda Lagi"
date: 2026-07-23
draft: false
categories:
 - Keamanan Siber
 - Perlindungan Diri
tags:
 - credential stuffing
 - MFA bypass
 - session hijacking
 - token theft
 - identity security
 - keamanan digital
 - cybersecurity
summary: "Penyerang tidak lagi membobol sistem dari luar. Mereka masuk dengan kredensial yang sah. Credential stuffing, token theft, dan MFA fatigue mengubah identitas Anda menjadi titik lemah utama keamanan."
cover: "/images/articles/identity-based-attacks.webp"
---

Peneliti keamanan dari tiga laporan independen, Verizon DBIR, IBM X-Force, dan CrowdStrike, mencapai kesimpulan yang sama pada 2026: kredensial yang dicuri adalah vektor serangan dominan. Penyerang tidak membobol sistem. Mereka masuk dengan login yang sah.

Verizon DBIR menunjukkan kredensial yang dicuri menyumbang 22% pelanggaran awal, vektor akses awal paling umum. Token theft menyumbang 31% pelanggaran di Microsoft 365. CrowdStrike melaporkan 82% deteksi pada 2025 bebas malware. Microsoft melacak 600 juta serangan identitas harian, lebih dari 99% berbasis kata sandi. 24 miliar pasang kredensial yang dicuri beredar di database underground (BioProfileMe 2026). 26 miliar upaya credential stuffing per bulan secara global (MojoAuth/Akamai). 276 juta cookie sesi yang dicuri yang beredar di dark web pada 2025 (Recorded Future), memungkinkan penyerang melewati MFA sepenuhnya. 70% pengguna yang terekspos dalam pelanggaran menggunakan ulang kata sandi lama yang sudah dikompromikan (SpyCloud 2025).

Ini mengubah cara kita memikirkan keamanan. Pertanyaannya bukan "Apakah sistem Anda cukup kuat?" melainkan "Apakah identitas Anda sudah terlindungi?"

## Apa Itu Serangan Berbasis Identitas

Serangan berbasis identitas menargetkan sistem autentikasi, kredensial, dan infrastruktur identitas, bukan kode aplikasi atau enkripsi. Penyerang tidak mencoba menemukan kerentanan di sistem Anda. Mereka mencoba masuk dengan kredensial yang sudah mereka miliki.

Kredensial ini bisa berasal dari:
- Pelanggaran data di layanan lain yang Anda pakai
- Malware infostealer yang mengumpulkan kata sandi dari perangkat Anda
- Phishing yang menipu Anda untuk memasukkan kredensial di situs palsu
- Data yang dijual di pasar gelap dark web
- Rekayasa sosial yang memanipulasi Anda untuk memberikan kode OTP

Setelah penyerang punya kredensial yang sah, semua lapisan pertahanan lain menjadi kurang relevan. Firewall membiarkan mereka masuk karena lalu lintas terlihat normal. Sistem deteksi intrusi tidak berbunyi karena aktivitas menyerupai pengguna biasa. Autentikasi dua faktor pun bisa dilewati.

## Credential Stuffing: Serangan Massal dengan Kata Sandi Bocor

Credential stuffing adalah serangan otomatis di mana penyerang mengambil kombinasi nama pengguna dan kata sandi dari satu pelanggaran data, lalu mengujinya di ratusan layanan lain. Serangan ini berhasil karena banyak orang memakai kata sandi yang sama di beberapa akun.

Statistik menunjukkan credential stuffing menyumbang 22% pelanggaran data secara global pada 2024-2025. Alat serangan tersedia secara komersial di pasar gelap, lengkap dengan proxy untuk menghindari deteksi dan solver CAPTCHA untuk melewati perlindungan.

Perbedaan antara credential stuffing dan brute force: brute force mencoba kombinasi acak pada satu akun. Credential stuffing mencoba kombinasi yang sudah diketahui pernah berhasil di ribuan akun sekaligus. Efisiensinya jauh lebih tinggi.

### Bagaimana Melindungi Diri dari Credential Stuffing

- **Gunakan kata sandi unik untuk setiap akun.** Jika satu layanan mengalami pelanggaran, akun lain tetap aman. Password manager membuat langkah ini mudah.
- **Aktifkan 2FA dengan aplikasi authenticator.** Bahkan jika kata sandi Anda bocor, penyerang masih membutuhkan kode kedua.
- **Pantau apakah email Anda bocor.** Gunakan layanan seperti Have I Been Pwned untuk memeriksa apakah kredensial Anda pernah terekspos.
- **Ganti kata sandi segera setelah pelanggaran terdeteksi.** Jangan menunggu.

## Token Theft: Membypass MFA Tanpa Menembusnya

Ini adalah ancaman yang paling sedikit dipahami oleh pengguna biasa. Setelah Anda berhasil login dengan 2FA, layanan mengeluarkan token sesi. Token ini yang menjaga Anda tetap login, bukan kata sandi Anda.

Penyerang yang mencuri token sesi bisa meniru Anda tanpa perlu kata sandi atau kode 2FA. MFA sudah selesai divalidasi saat token diterbitkan. Penyerang hanya perlu mengimpor token itu ke browser mereka, dan situs web menganggap mereka adalah Anda.

### Bagaimana Token Dicuri

**Infostealer malware.** Malware yang terpasang di perangkat Anda mengumpulkan cookie dan token sesi dari browser. Data ini kemudian dieksfiltrasi dan dijual atau dipakai langsung. Verizon DBIR 2026 menunjukkan infostealer menyumbang 31% pelanggaran di Microsoft 365.

**Serangan APT pada infrastruktur jaringan.** Pada 2026, kelompok intelijen militer Rusia APT28 mengeksploitasi lebih dari 18.000 router untuk mencegat token OAuth Microsoft Office. Kampanye ini mempengaruhi lebih dari 200 organisasi dan 5.000 perangkat konsumen pada puncaknya. Mereka tidak phish kredensial atau mengalahkan MFA. Mereka menunggu token diterbitkan.

**Jaringan Wi-Fi yang dikompromikan.** Penyerang yang mengontrol jaringan Wi-Fi bisa mencegat token sesi yang dikirim dalam bentuk tidak terenkripsi.

### Bagaimana Melindungi Diri dari Token Theft

- **Perbarui perangkat dan aplikasi secara teratur.** Patch keamanan menutup celah yang digunakan infostealer.
- **Jangan simpan kata sandi di browser.** Gunakan password manager yang terdedikasi.
- **Hindari Wi-Fi publik untuk aktivitas sensitif.** Jika harus menggunakan, gunakan VPN.
- **Periksa sesi aktif di akun Anda.** Banyak layanan menampilkan daftar perangkat yang terhubung. Putuskan sesi yang tidak dikenal.
- **Logout dari layanan sensitif setelah selesai.** Jangan biarkan sesi aktif tanpa pengawasan.

## MFA Fatigue: Membombardir Anda Sampai Anda Menyerah

MFA fatigue, juga dikenal sebagai *prompt bombing*, terjadi ketika penyerang yang sudah memiliki kata sandi Anda terus mengirim permintaan persetujuan push notification ke perangkat Anda. Tujuannya: membuat Anda menyetujui salah satu dari kelelahan atau kebingungan.

Serangan ini terbukti efektif. Insiden Uber pada 2022 dimulai dengan MFA fatigue. Penyerang mengirim puluhan permintaan persetujuan, lalu menghubungi korban melalui WhatsApp menyamar sebagai dukungan IT, meminta korban menyetujui permintaan tersebut.

Verizon DBIR menunjukkan MFA fatigue dan prompt bombing menyumbang 22% pelanggaran di Microsoft 365 pada 2026. Upaya bypass MFA meningkat 218% pada 2025 (MojoAuth). 80% pelanggaran yang melibatkan bypass MFA terjadi melalui pencurian token sesi (Microsoft Digital Defense Report 2025).

### Bagaimana Melindungi Diri dari MFA Fatigue

- **Gunakan aplikasi authenticator yang menghasilkan kode berbasis waktu**, bukan push notification. Kode berbasis waktu tidak bisa dimanipulasi melalui bombardir.
- **Jika menggunakan push notification, jangan pernah menyetujui permintaan yang tidak Anda inisiasi.** Tidak masalah berapa banyak permintaan yang datang.
- **Gunakan passkey atau security key hardware** jika layanan mendukungnya. Metode ini kebal terhadap MFA fatigue karena memerlukan interaksi fisik.

## Adversary-in-the-Middle: Menyadap Kredensial Secara Real-Time

Serangan *adversary-in-the-middle* (AitM) menggunakan proxy terbalik yang menampilkan replika halaman login yang persis sama dengan aslinya. Anda memasukkan kata sandi dan kode 2FA seperti biasa. Proxy meneruskan semuanya ke penyedia identitas asli dan menerima token sesi yang sah.

Sebelas platform phishing-as-a-service komersial sekarang menjual toolkit AitM, termasuk Evilginx, Modlishka, dan Muraena. Toolkit ini memungkinkan penyerang tanpa keterampilan pengembangan untuk menerapkan pembajakan sesi dalam skala besar.

### Bagaimana Melindungi Diri dari AitM

- **Gunakan passkey atau security key hardware.** Metode ini tidak bisa disadap oleh proxy karena kriptografi terikat pada domain asli.
- **Periksa URL sebelum memasukkan kredensial.** Pastikan Anda berada di domain yang benar.
- **Jangan klik tautan dari email atau pesan yang meminta Anda login.** Buka situs langsung dari browser.

## SIM Swap: Ketika Nomor Telepon Anda Dibajak

SIM swap adalah serangan di mana penyerang meyakinkan operator seluler untuk mentransfer nomor telepon Anda ke SIM baru yang mereka kontrol. Setelah berhasil, semua panggilan dan SMS yang ditujukan ke nomor Anda, termasuk kode OTP, masuk ke perangkat penyerang.

SIM swap menjadi ancaman serius karena banyak layanan masih mengandalkan SMS untuk verifikasi. Bahkan layanan yang menggunakan 2FA berbasis SMS bisa dikompromikan melalui serangan ini.

Cara melindungi diri dari SIM swap:
- Gunakan PIN atau password pada akun operator seluler Anda
- Mintalah operator untuk menambahkan catatan keamanan tambahan pada akun Anda
- Hindari menggunakan SMS sebagai metode 2FA utama
- Pertimbangkan menggunakan nomor virtual atau aplikasi perpesanan yang tidak terikat nomor telepon

## Passwordless: Menghapus Targetnya

Jawaban jangka panjang terhadap serangan berbasis identitas adalah menghapus kata sandi sama sekali. Passkey (FIDO2) menggunakan kriptografi asimetris: kunci privat tidak pernah meninggalkan perangkat. Bahkan dalam serangan phishing, tidak ada yang bisa dicegat dan dipakai ulang oleh penyerang.

Google, Microsoft, dan Apple sudah mendukung passkey secara native di sistem operasi mereka sejak 2024. Perpindahan membutuhkan upaya: penyedia identitas harus mendukung FIDO2, perangkat harus kompatibel, dan pengguna perlu pelatihan. Tapi manfaatnya jelas: jika 97% serangan berbasis identitas memakai kata sandi, passwordless menghilangkan 97% vektor serangan.

## Identity Threat Detection and Response (ITDR)

Kategori produk baru yang muncul pada 2026: ITDR. Sistem ini mendeteksi anomali berbasis identitas yang tidak ditangkap oleh alat keamanan tradisional. ITDR memantau pola login yang tidak biasa, perangkat baru yang tiba-tiba mengakses akun, perubahan metode pemulihan, dan aktivitas yang menunjukkan kompromi kredensial.

Untuk individu, setara ITDR adalah memanfaatkan fitur keamanan bawaan layanan yang Anda pakai: notifikasi login dari perangkat baru, verifikasi email untuk perubahan kata sandi, dan pemantauan aktivitas mencurigakan.

## Langkah Praktis untuk Melindungi Identitas Digital Anda

1. **Gunakan password manager** dengan kata sandi master yang kuat dan unik. Vault yang hanya dijaga satu kata sandi menjadi titik gagal tunggal bagi seluruh akun Anda.
2. **Aktifkan 2FA di semua akun penting.** Prioritas: email utama, perbankan, media sosial, dan layanan cloud. Gunakan aplikasi authenticator, bukan SMS.
3. **Beralih ke passkey** saat layanan mendukungnya. Passkey menghilangkan kata sandi dan membuat serangan phishing serta credential stuffing tidak efektif.
4. **Pantau kebocoran data.** Daftarkan email Anda di Have I Been Pwned. Ganti kata sandi segera setelah pelanggaran terdeteksi.
5. **Periksa sesi aktif secara berkala.** Putuskan perangkat yang tidak dikenal dari akun Anda.
6. **Hindari memasukkan kredensial di perangkat umum.** Jika terpaksa, gunakan mode penyamaran dan logout segera setelah selesai.

## Data Breach Marketplace: Ekonomi Kredensial yang Dicuri

Pasar gelap dark web berfungsi sebagai bursa kredensial yang dicuri. Ekonomi ini terstruktur dan efisien:

**Kredensial segar.** Data yang baru bocor dari pelanggaran terbaru dijual dengan harga premium. Kredensial yang belum dipakai dalam serangan bernilai lebih tinggi karena kemungkinan masih aktif.

**Kredensial terverifikasi.** Beberapa penjual menyertakan verifikasi bahwa kredensial masih berfungsi. Pembeli tidak perlu menguji sendiri.

**Paket kredensial massal.** Jutaan kombinasi email dan kata sandi dijual dalam paket besar dengan harga rendah per kredensial. Volume, bukan kualitas, menjadi nilai jual.

**Layanan cek kredensial.** Platform yang memungkinkan penyerang memeriksa apakah kredensial tertentu sudah ada di database kebocoran.

**Session cookies dan token.** Selain kredensial login, cookie sesi dan token OAuth juga diperdagangkan. Kredensial ini memungkinkan akses tanpa perlu kata sandi atau MFA.

Harga kredensial di pasar gelap bervariasi:
- Email dan kata sandi biasa: $0,50-$5 per akun
- Akun perbankan dengan saldo terverifikasi: $50-$500
- Akun korporat dengan akses VPN: $500-$5.000
- Kredensial admin sistem: $1.000-$20.000+

Volume kredensial yang tersedia sangat besar. Laporan SpyCloud menunjukkan lebih dari 24 miliar kombinasi nama pengguna dan kata sandi tersedia di pasar gelap pada 2025.

## Perbandingan Metode Serangan dan Efektivitasnya

Berikut perbandingan metode serangan berbasis identitas dari segi efektivitas dan prevalensi:

**Credential stuffing.** Prevalensi: sangat tinggi. Efektivitas: sedang. Rasio keberhasilan tipikal: 0,1-2%. Tapi pada skala jutaan akun, bahkan 0,1% menghasilkan ribuan akun yang dikompromikan.

**Phishing kredensial.** Prevalensi: sangat tinggi. Efektivitas: tinggi. Tergantung pada kualitas pesan dan kesadaran korban. AI meningkatkan efektivitas.

**Token theft.** Prevalensi: sedang. Efektivitas: sangat tinggi. Token yang dicuri memberikan akses penuh tanpa perlu kredensial tambahan. Bypass MFA otomatis.

**MFA fatigue.** Prevalensi: rendah-menengah. Efektivitas: sedang. Bergantung pada kesabaran penyerang dan kelelahan korban.

**AitM.** Prevalensi: rendah. Efektivitas: sangat tinggi. Menangkap kredensial dan token sekaligus. Memerlukan infrastruktur lebih kompleks.

## Bagaimana Layanan Melindungi Identitas Anda

Penyedia layanan utama sudah menerapkan berbagai perlindungan. Pahami apa yang mereka lakukan dan apa yang masih menjadi tanggung jawab Anda:

**Google.** Advanced Protection Program untuk akun berisiko tinggi. Deteksi anomali login berbasis AI. Passkey support sejak 2024. Verifikasi perangkat tepercaya.

**Microsoft.** Passwordless authentication melalui Microsoft Authenticator. Conditional Access berbasis risiko. Token binding untuk sesi sensitif.

**Apple.** Passkey terintegrasi di seluruh ekosistem. Sign in with Apple yang menyembunyikan email asli. Private Relay untuk browsing.

**Bank dan layanan keuangan.** Transaksi mencurigakan memerlukan verifikasi tambahan. Batas transaksi harian. Notifikasi real-time.

Meskipun perlindungan ini ada, tanggung jawab terakhir tetap pada Anda. Sistem paling canggih pun bisa gagal jika Anda memakai kata sandi yang sama di beberapa akun atau menyetujui permintaan MFA dari kelelahan.

## Ringkasan

Serangan berbasis identitas mengubah keamanan dari masalah teknis menjadi masalah manusia. Penyerang tidak perlu menemukan kerentanan di sistem Anda. Mereka hanya perlu kredensial yang sudah bocor, token sesi yang bisa dicuri, atau Anda yang menyetujui permintaan MFA dari kelelahan.

## Pertanyaan yang Sering Ditanyakan

### Apakah 2FA benar-benar melindungi saya?

2FA meningkatkan keamanan, tapi bukan jaminan absolut. 2FA berbasis SMS rentan terhadap SIM swap. 2FA berbasis push notification rentan terhadap MFA fatigue. 2FA berbasis kode TOTP (Time-based One-Time Password) dari aplikasi authenticator jauh lebih aman. Passkey dan security key hardware adalah opsi paling aman.

### Apa bedanya passkey dan kata sandi?

Passkey menggunakan kriptografi asimetris. Kunci privat disimpan di perangkat Anda dan tidak pernah dikirim ke server. Kunci publik disimpan di server. Saat Anda login, perangkat Anda membuktikan kepemilikan kunci privat tanpa mengungkapkannya. Tidak ada kata sandi yang bisa dicuri, ditebak, atau disadap.

### Bagaimana cara tahu apakah akun saya sudah dikompromikan?

Tanda-tanda umum: email konfirmasi perubahan kata sandi yang tidak Anda lakukan, notifikasi login dari lokasi atau perangkat tidak dikenal, aktivitas yang tidak Anda kenali di akun, atau teman yang melaporkan pesan mencurigakan dari akun Anda. Daftarkan email Anda di Have I Been Pwned untuk pemberitahuan otomatis.

### Apakah password manager aman?

Password manager yang bereputasi baik (1Password, Bitwarden, KeePass) menggunakan enkripsi kuat untuk menyimpan kata sandi Anda. Risiko utama bukan dari enkripsi, tapi dari master password yang lemah atau kompromi perangkat. Gunakan master password yang kuat dan unik, aktifkan 2FA pada password manager, dan pastikan perangkat Anda aman.

### Apa yang harus dilakukan jika saya menerima permintaan MFA yang tidak saya inisiasi?

Jangan pernah menyetujui permintaan yang tidak Anda inisiasi. Segera ubah kata sandi akun tersebut dari perangkat lain. Periksa apakah ada aktivitas mencurigakan di akun. Jika permintaan terus berdatangan, hubungi dukungan layanan dan pertimbangkan untuk membekukan akun sementara.

### Apakah biometrik (sidik jari, wajah) lebih aman dari kata sandi?

Biometrik memberikan kenyamanan dan keamanan yang baik, tapi bukan tanpa kelemahan. Data biometrik tidak bisa diubah jika bocor (Anda tidak bisa mengganti sidik jari). Biometrik juga bisa dipalsukan dalam beberapa kasus (deepfake untuk pengenalan wajah). Gunakan biometrik sebagai salah satu faktor, bukan satu-satunya.

### Berapa sering saya harus mengganti kata sandi?

Jika tidak ada pelanggaran yang terdeteksi, tidak perlu mengganti kata sandi secara berkala. NIST merekomendasikan mengganti kata sandi hanya setelah pelanggaran terdeteksi atau jika ada indikasi kompromi. Mengganti kata sandi terlalu sering justru bisa berbahaya karena cenderung membuat orang memilih kata sandi yang lebih lemah.

## Ringkasan Akhir

Identitas digital Anda adalah pintu depan ke semua yang Anda miliki di dunia digital. Lindungi dengan kata sandi unik, 2FA yang kuat, passkey saat tersedia, pantauan kebocoran data, dan kebiasaan memeriksa sesi aktif. Jangan menunggu sampai akun Anda dikompromikan. Mulai lindungi identitas digital Anda hari ini.

## Sumber Daya untuk Pelaporan dan Pemantauan

**Have I Been Pwned (haveibeenpwned.com).** Periksa apakah email atau kata sandi Anda pernah terekspos dalam pelanggaran data.

**SpyCloud.** Layanan pemantauan kredensial yang memeriksa apakah data Anda ada di pasar gelap.

**Google Password Checkup.** Fitur bawaan Chrome yang memeriksa kata sandi Anda terhadap database kebocoran.

**Apple Security Recommendations.** Fitur bawaan iOS dan macOS yang memperingatkan kata sandi yang sudah terekspos.

Pertahanan terbaik: kata sandi unik, 2FA dengan authenticator app, passkey saat tersedia, pantauan kebocoran data, dan kebiasaan memeriksa sesi aktif. Identitas Anda adalah pintu depan ke semua yang Anda miliki digital. Saatnya membangun kunci yang lebih baik.

> **Cat editorial:** Serangan berbasis identitas berkembang cepat seiring munculnya teknik baru. Artikel ini mencerminkan kondisi saat penulisan berdasarkan laporan Verizon DBIR, IBM X-Force, dan CrowdStrike edisi 2026. Periksa sumber tepercaya untuk informasi terbaru.
