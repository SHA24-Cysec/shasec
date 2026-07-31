---
translationKey: "email-alias-hide-my-email"
title: "Cara Pakai Email Alias dan Hide My Email untuk Cegah Spam dan Kebocoran Data"
date: 2026-07-12
draft: false
categories:
  - Keamanan Digital
  - Privasi
tags:
  - email alias
  - hide my email
  - privasi email
  - anti spam
  - keamanan digital
  - breach prevention
summary: "Panduan lengkap pakai email alias dan Hide My Email untuk belanja online, daftar layanan, dan newsletter tanpa bongkar email utama. Kurangi spam, cegah credential stuffing, dan mudah matikan alias yang bocor."
cover: "/images/articles/email-alias-hide-my-email.webp"
---

Email utama Anda dipakai di mana-mana: toko online, pinjol, newsletter, forum, e-wallet. Satu breach di satu toko membuat email Anda masuk daftar spam dan percobaan login di tempat lain.

Solusi yang ringan dan efektif adalah email alias. Artikel ini tunjukkan cara kerja, layanan yang bagus, dan kebiasaan pakai alias agar email utama tetap bersih.

## Apa itu email alias

Email alias adalah alamat email tambahan yang meneruskan pesan ke email utama Anda tanpa perlu buat akun baru.

Contoh: email utama Anda `budi@gmail.com`. Anda buat alias `budi+shopee@gmail.com` atau `random123@youralias.duck.com` yang tetap masuk ke inbox utama.

Jika alias bocor atau dapat spam, Anda matikan alias tersebut tanpa ganti email utama.

Beda dengan email tambahan biasa, alias tidak butuh password baru. Pengelolaan di satu inbox.

## Kenapa alias mengurangi risiko breach

Tiga alasan.

**Isolasi.** Tiap layanan dapat alias beda. Shopee dapat alias A, TikTok Shop dapat alias B. Jika alias A bocor di breach Shopee, Anda tahu sumber bocor dan cukup matikan alias A. Email utama tetap aman.

**Anti credential stuffing.** Pelaku yang dapat email plus password dari breach Shopee akan coba login di bank dengan email yang sama. Jika Anda pakai alias beda per layanan, pelaku tidak tahu email bank Anda.

**Anti spam dan tracking.** Layanan jual data email ke pengiklan. Jika Anda pakai alias unik per layanan, Anda bisa lacak siapa jual data Anda. Banyak pengguna lapor dapat spam judi setelah daftar di layanan tertentu, dan alias membantu buktikan sumber.

Alias bukan sihir. Alias tetap perlu password kuat dan 2FA di email utama. Alias hanya mengurangi paparan.

## Jenis email alias yang Anda bisa pakai

### 1. Plus addressing Gmail

Gmail support plus addressing. `nama+shopee@gmail.com` tetap masuk ke `nama@gmail.com`.

Cara pakai: saat daftar di Shopee, tulis `budi+shopee@gmail.com`. Di filter Gmail, buat label otomatis untuk tiap alias.

Kelebihan: gratis dan mudah. Kekurangan: pelaku tahu cara hapus + dan dapat email utama. Beberapa website menolak alamat dengan tanda +.

### 2. Hide My Email Apple

Jika Anda pakai iPhone dan iCloud+ (Rp 15 ribu per bulan), Apple kasih fitur Hide My Email.

Cara kerja: buka Settings > iCloud > Hide My Email > Create New Address. Apple buat alamat acak `@icloud.com` yang forward ke inbox Anda. Anda bisa buat ratusan alias dan matikan kapan pun.

Contoh: `x7y9z@icloud.com` untuk daftar Tokopedia. Jika Tokopedia breach, matikan alias itu, tidak ganggu email utama.

Hide My Email juga terintegrasi di Safari saat daftar website, jadi Anda tidak perlu ketik manual.

### 3. Firefox Relay

Firefox Relay kasih 5 alias gratis, unlimited jika berlangganan premium sekitar $1 per bulan. Alamat format `@relay.firefox.com`.

Cara pakai: install add-on Firefox Relay, klik icon Relay di kolom email saat daftar, pilih Generate Alias.

Relay juga bisa hapus tracker dari email sebelum forward, plus telpon alias untuk lindungi nomor HP.

### 4. SimpleLogin (Proton)

SimpleLogin adalah layanan alias open source yang sekarang dimiliki Proton. Gratis 15 alias, premium unlimited plus custom domain.

Kelebihan: bisa pakai domain sendiri contoh `@alias.tokosaya.com` sehingga terlihat profesional. Cocok untuk UMKM yang butuh email berbeda untuk supplier, pembeli, dan newsletter.

SimpleLogin juga support PGP encryption untuk forward.

### 5. DuckDuckGo Email Protection

Gratis, format `@duck.com`. DuckDuckGo hapus tracker tersembunyi di email dan forward ke email utama. Tidak perlu ekstensi, cukup daftar di duckduckgo.com/email.

Kelebihan: privasi tinggi dan gratis. Kekurangan: belum sefleksibel SimpleLogin untuk custom domain.

### 6. Addy.io (AnonAddy)

Mirip SimpleLogin, support banyak alias dan custom domain. Gratis 20 shared alias.

Pilih satu layanan dan konsisten. Jangan buat alias di 5 layanan berbeda karena Anda akan bingung matikan di mana.

## Skenario pakai alias untuk sehari-hari

Bayangkan Anda punya email utama `budi.utama@gmail.com`.

Buat pola alias:

- Belanja: `budi+belanja-shopee@gmail.com` atau alias relay `budi-shop-xyz@relay.firefox.com`
- Pinjol dan finansial: JANGAN pakai alias. Pakai email utama yang paling aman dengan 2FA hardware, karena bank butuh verifikasi identitas kuat.
- Newsletter dan promo: `budi+promo@gmail.com` atau alias DuckDuckGo. Matikan jika spam.
- Forum dan trial gratis: alias sekali pakai yang langsung dimatikan setelah trial.
- Kerja freelance: `budi+client-nama@` agar Anda tahu client mana spam.

Simpan daftar alias di password manager. Contoh di Bitwarden, pada entry Shopee isi username dengan alias yang Anda pakai, bukan email utama. Saat breach terjadi, Anda tahu alias mana yang bocor.

## Langkah setup 15 menit untuk pemula

1.  Buka password manager, buat folder Email Alias.
2.  Daftar satu layanan alias, contoh Firefox Relay gratis.
3.  Buat 3 alias pertama: untuk belanja, newsletter, dan trial.
4.  Uji: daftar di layanan dengan alias, cek apakah email verifikasi masuk ke inbox utama.
5.  Buat filter: di Gmail Settings > Filters > buat filter jika to: alias belanja, beri label Belanja.
6.  Catat di sheet sederhana: alias, layanan, tanggal buat.

Setelah 1 minggu, Anda akan terbiasa pakai alias untuk setiap daftar baru.

## Respons saat alias bocor dan dapat spam

Anda dapat spam judi di alias yang hanya Anda pakai untuk satu toko.

Langkah:

1.  Buka dashboard alias (Relay, SimpleLogin, iCloud).
2.  Blokir atau nonaktifkan alias tersebut. Email ke alias itu tidak lagi diteruskan.
3.  Ganti email di layanan terkait ke alias baru, atau hapus akun jika layanan tidak penting.
4.  Cek HaveIBeenPwned apakah email utama juga muncul di breach yang sama. Jika ya, ganti password di layanan itu dan layanan lain dengan password sama.
5.  Jika alias pakai plus addressing Gmail, Anda tidak bisa nonaktifkan, jadi buat filter untuk auto-hapus email ke alias tersebut.

Blokir alias lebih cepat daripada ganti email utama di 50 layanan. Anda hemat waktu berjam-jam.

## Email alias untuk UMKM kecil

UMKM sering pakai satu email `tokosaya@gmail.com` untuk semua supplier, marketplace, dan pelanggan. Jika email itu bocor, spam masuk dan risiko phishing naik.

Pakai alias untuk pisah fungsi:

- `order@alias.tokosaya.com` untuk terima pesanan marketplace via SimpleLogin custom domain.
- `supplier@alias.tokosaya.com` untuk komunikasi supplier.
- `promo@alias.tokosaya.com` untuk daftar tool gratis.

Jika supplier bocor dan alias supplier dapat spam, Anda ganti alias supplier saja, tanpa ganggu alur order.

Custom domain alias juga bangun kepercayaan. Pelanggan lihat email dari domain toko, bukan Gmail random.

Biaya SimpleLogin custom domain sekitar €25 per tahun. Lebih murah daripada biaya bersihkan inbox spam manual.

## Kesalahan umum pakai alias

**Pakai alias untuk recovery bank.** Bank butuh email stabil yang bisa verifikasi KTP. Jika Anda matikan alias recovery bank, Anda kunci diri sendiri. Untuk bank dan email utama, pakai email utama yang paling aman.

**Lupa catat alias.** Daftar dengan alias acak tanpa simpan di password manager. Saat mau login, Anda lupa alias apa yang dipakai. Selalu simpan alias di password manager entry yang sama.

**Buat alias yang mudah ditebak polanya.** `budi+shopee`, `budi+tokopedia` mudah ditebak pelaku yang tahu plus addressing. Lebih baik alias acak dari Relay atau SimpleLogin untuk keamanan lebih tinggi.

**Pakai alias di layanan yang tolak alias.** Beberapa layanan tolak domain `@relay.firefox.com` atau `@duck.com`. Untuk layanan itu, pakai plus addressing Gmail atau Hide My Email iCloud yang lebih diterima karena domain `@icloud.com`.

**Tidak aktifkan 2FA di dashboard alias.** Dashboard alias itu sendiri jadi target. Jika akun Relay Anda jebol, pelaku lihat semua alias dan forward. Aktifkan 2FA di akun Relay/SimpleLogin.

## Setup custom domain alias untuk UMKM dalam 30 menit

Jika Anda punya domain toko seperti `tokosaya.com`, Anda bisa buat alias `order@tokosaya.com` yang forward ke Gmail.

Langkah dengan SimpleLogin:

1.  Beli domain atau pakai subdomain `mail.tokosaya.com`.
2.  Di Cloudflare, tambah MX record sesuai instruksi SimpleLogin.
3.  Di SimpleLogin, pilih Add Custom Domain, ikuti verifikasi TXT.
4.  Buat alias pertama di domain kustom, contoh `order@tokosaya.com`.
5.  Uji kirim email ke alias tersebut, cek masuk ke inbox utama.
6.  Aktifkan catch-all agar semua alamat di domain masuk, atau matikan catch-all untuk kontrol ketat.

Keuntungan custom domain: jika suatu saat Anda pindah provider alias dari SimpleLogin ke Addy.io, alamat email pelanggan tetap sama karena domain milik Anda. Anda tidak perlu ganti kartu nama.

Biaya: domain ~ Rp 150 ribu per tahun, SimpleLogin premium €30 per tahun. Untuk UMKM dengan 20 supplier, investasi ini kembali dalam waktu yang dihemat untuk urus spam.

Catat di dokumentasi internal cara ganti alias supplier jika bocor. Dokumentasi 1 halaman lebih berguna daripada ingatan.

## Studi kasus: toko online kurangi spam 80 persen dengan alias

Sebuah toko online di Bandung pakai satu Gmail untuk daftar 40 layanan: marketplace, jasa kirim, tool desain, supplier.

Inbox penuh promo, spam judol, dan email phising mengatasnamakan jasa kirim. Karyawan hampir klik link phising karena email phising bercampur dengan email order asli.

Pemilik toko migrasi ke Firefox Relay dan SimpleLogin custom domain dalam 2 minggu.

- Semua pendaftaran baru pakai alias Relay acak.
- Email supplier penting pakai `supplier@tokosaya.com` via SimpleLogin.
- Email order marketplace pakai `order@tokosaya.com`.
- Filter Gmail otomatis label per alias.

Hasil setelah 1 bulan: spam di inbox utama turun 80 persen karena spam masuk ke alias promo yang bisa dimatikan. Phising jasa kirim mudah dikenali karena pengirim tidak pakai alias order resmi. Karyawan dilatih cek label email.

Pelajaran: isolasi via alias bikin triase email lebih cepat dan kurangi risiko klik phising.

## Kebijakan retensi dan legalitas alias di Indonesia

UU PDP Indonesia tidak melarang alias. Alias tetap dianggap data pribadi jika bisa dikaitkan ke individu, jadi kewajiban jaga tetap ada.

Jika Anda UMKM kelola data pelanggan, jangan simpan alias pelanggan lebih lama dari perlu tanpa tujuan jelas. Jika pelanggan minta hapus data, hapus alias dan forward.

Jangan pakai alias untuk hindari KYC perbankan atau pinjol. Bank butuh email yang bisa diverifikasi identitas. Pakai email utama untuk layanan keuangan.

Untuk karyawan, jelaskan kebijakan alias di SOP. Karyawan boleh pakai alias untuk daftar tool trial, tapi wajib pakai email perusahaan untuk komunikasi resmi ke pelanggan.

Dokumentasi kebijakan alias 1 halaman membantu audit internal dan edukasi karyawan baru.

## Checklist bulanan email alias

- [ ] Berapa alias aktif? Matikan yang tidak dipakai 3 bulan.
- [ ] Apakah ada alias yang terima spam tiba-tiba? Blokir dan ganti.
- [ ] Apakah password manager sudah simpan semua alias dengan benar?
- [ ] Apakah email utama masih bersih tanpa spam? Jika spam naik, audit alias mana yang bocor.
- [ ] Apakah dashboard alias sudah aktifkan 2FA?
- [ ] Apakah custom domain alias masih valid dan tidak expired?
- [ ] Apakah ada layanan yang tolak alias dan perlu diganti ke Hide My Email?
- [ ] Apakah karyawan baru sudah training cara pakai alias untuk trial tool?

Cetak checklist dan simpan di folder keamanan digital. Ajak tim admin untuk review bersama tiap awal bulan, jadi kebersihan email jadi tanggung jawab bersama.

## Sumber dan tools

- [Firefox Relay](https://relay.firefox.com)
- [Apple Hide My Email](https://support.apple.com/en-us/102069)
- [SimpleLogin](https://simplelogin.io)
- [DuckDuckGo Email Protection](https://duckduckgo.com/email)
- [HaveIBeenPwned](https://haveibeenpwned.com)
- [CISA: Use Strong Passwords and Unique Emails](https://www.cisa.gov/secure-our-world/use-strong-passwords)

> **Catatan editorial:** Artikel ini defensif. Pilih satu layanan alias yang reputasinya jelas dan enkripsi. Jangan pakai layanan alias abal-abal yang minta password email utama Anda. Alias membantu privasi, tapi bukan pengganti password unik dan 2FA.

## Pertanyaan yang sering diajukan

### Apakah email alias legal?

Ya. Alias adalah fitur resmi dari provider email. Banyak perusahaan pakai alias untuk operasional.

### Apakah alias memperlambat email?

Tidak signifikan. Forward terjadi dalam detik. Untuk transaksi penting seperti OTP bank, sebaiknya pakai email utama agar tidak ada jeda.

### Bisa pakai alias untuk daftar pinjol?

Tidak disarankan. Pinjol butuh verifikasi KTP dan email yang match dengan data Dukcapil. Pakai email utama untuk layanan keuangan.

### Apa beda alias dan email kedua?

Email kedua butuh login terpisah, password terpisah, dan storage terpisah. Alias hanya forward ke email utama, lebih praktis.

### Apakah Gmail plus addressing aman?

Cukup aman untuk kurangi spam, tapi tidak untuk sembunyikan email utama dari attacker canggih karena attacker bisa hapus bagian +.

### Bagaimana jika layanan tolak alias Relay?

Gunakan Hide My Email Apple atau plus addressing Gmail. Dua opsi ini lebih diterima situs karena domain iCloud dan Gmail umum.

### Apakah alias bisa dipakai untuk balas email?

Bisa. Di SimpleLogin dan Relay premium, Anda bisa balas dari alias dan penerima lihat alias, bukan email utama. Cocok untuk jaga privasi saat kontak seller yang tidak dikenal.



## Konfigurasi SPF, DKIM, dan DMARC untuk custom domain alias

Jika Anda pakai custom domain untuk alias, konfigurasikan SPF dan DKIM agar email tidak masuk spam.

Di Cloudflare, tambah TXT record SPF:

```
v=spf1 include:_spf.google.com include:spf.simplelogin.co ~all
```

Untuk DKIM, SimpleLogin kasih kunci DKIM yang harus Anda tambah sebagai TXT record. Setelah itu, verifikasi di dashboard SimpleLogin.

DMARC membantu cegah pemalsuan:

```
v=DMARC1; p=quarantine; rua=mailto:dmarc@tokosaya.com
```

Tanpa SPF/DKIM, email dari alias custom domain sering masuk spam Gmail. Dengan konfigurasi benar, deliverability naik di atas 98 persen.

Catat konfigurasi di dokumentasi internal dan cek tiap 6 bulan.

## Peta jalan 90 hari untuk keluarga

Minggu 1-2: Daftar Firefox Relay, buat 3 alias pertama untuk belanja dan newsletter, simpan di password manager, buat filter Gmail.

Minggu 3-4: Migrasi 20 layanan lama yang masih pakai email utama ke alias baru. Mulai dari layanan yang sering spam. Nonaktifkan alias lama yang sudah bocor.

Bulan 2: Setup custom domain via SimpleLogin jika Anda UMKM. Edukasi tim admin cara bedakan email order asli dari phising yang pakai alias salah.

Bulan 3: Audit inbox, hitung berapa spam berkurang, dan buat laporan internal 1 halaman. Training karyawan baru tentang alias dan phising.

Peta jalan ini bikin migrasi tidak mengganggu operasional harian.

## Kesalahan yang bikin alias tidak efektif

Pakai alias sama untuk semua layanan. Jika Anda pakai `budi+promo@gmail.com` untuk 30 layanan, satu breach tetap buka semua. Pakai alias acak unik per layanan untuk isolasi maksimal.

Simpan alias di notes HP tanpa password manager. Jika HP hilang, daftar alias ikut hilang. Selalu simpan di password manager terenkripsi.

Lupa matikan alias yang sudah bocor. Alias yang dapat spam judi 50 email per hari harus dimatikan, bukan dibiarkan. Matikan dalam 5 menit via dashboard.

Pakai alias gratis dari layanan yang tidak jelas reputasinya. Layanan abal-abal bisa baca email Anda. Pilih layanan open source dengan audit.

Tidak edukasi keluarga. Keluarga tetap pakai email utama untuk daftar game online yang rawan breach. Ajak keluarga pakai alias untuk game dan forum.




## FAQ tambahan dan mitigasi lanjutan

Banyak orang tanya apakah solusi ini gratis. Sebagian besar gratis, sebagian butuh biaya kecil. Firefox Relay gratis 5 alias, SimpleLogin gratis 15 alias, iCloud Hide My Email butuh iCloud+ Rp 15 ribu. Untuk UMKM, biaya €30 per tahun untuk custom domain sepadan dengan waktu yang dihemat.

Apakah solusi ini tahan terhadap serangan canggih? Tidak ada solusi 100 persen. Tapi alias, passkey, dan isolasi IoT mengurangi 80 persen serangan opportunistik yang jadi mayoritas insiden UMKM. Serangan targeted APT butuh pertahanan lebih dalam.

Bagaimana jika karyawan menolak pakai SOP baru? Edukasi dengan contoh nyata lebih efektif daripada paksaan. Tunjukkan kasus kafe di Bali yang rating turun karena QR palsu, atau kos di Jogja yang video CCTV bocor. Kasus nyata membuat orang peduli.

Apakah perlu konsultan mahal? Untuk UMKM dengan data pelanggan di bawah 10 ribu, SOP 1 halaman plus checklist bulanan cukup. Konsultan diperlukan jika Anda kelola data sensitif seperti NIK, foto KTP, atau data finansial besar dan butuh DPIA sesuai UU PDP.

Bagaimana cara ukur keberhasilan? Hitung metrik sederhana: jumlah spam per minggu, jumlah percobaan login gagal, jumlah device IoT yang update. Catat di sheet tiap bulan. Jika angka turun, SOP bekerja.

Satu prinsip: keamanan bukan proyek sekali jadi, tapi kebiasaan bulanan 10-30 menit. Konsistensi lebih penting daripada alat mahal.
