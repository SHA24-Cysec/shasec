---
translationKey: "nfc-contactless-skimming"
title: "Skimming NFC dan Tap-to-Pay di Indonesia: Cara Kerja Kartu Contactless dan Cara Anda Lindungi Dompet"
date: 2026-08-01
draft: false
categories:
  - Keamanan Finansial
  - Privasi
tags:
  - nfc
  - contactless
  - tap to pay
  - skimming
  - e-money
  - flazz
  - tapcash
  - brizzi
  - qris tap
  - rfid
summary: "Tap kartu terasa cepat, tapi link nirkabel NFC juga buka celah skimming. Pelajari cara kerja kartu contactless dan e-money, data apa yang bisa dan tidak bisa dicuri, serta langkah praktis yang Anda lakukan untuk amankan dompet di Indonesia."
cover: "/images/articles/nfc-contactless-skimming.webp"
---

Anda tap Flazz di gate commuter. Anda tap e-Money di gerbang tol. Anda tap TapCash di minimarket. Reader bunyi bip. Gate buka. Transaksi selesai dalam kurang dari satu detik.

Kecepatan itu datang dari NFC, Near Field Communication. Kartu dan reader bicara lewat radio 13,56 MHz. Kartu tidak pernah lepas dari tangan. Link nirkabel bikin bayar cepat. Link nirkabel juga ajukan pertanyaan yang perlu Anda jawab untuk dompet Anda. Data apa yang kartu pancar. Siapa bisa dengar. Apa yang bisa orang dengan reader tersembunyi curi di kerumunan. Apa yang tidak bisa mereka curi. Dan langkah apa yang potong risiko tanpa Anda buang kenyamanan tap.

Panduan ini jawab pertanyaan itu untuk pakai harian di Indonesia. Anda pelajari cara kerja NFC, di mana risiko skimming itu nyata, di mana rasa takut lebih besar dari fakta, dan apa yang Anda lakukan hari ini dengan kartu, ponsel, dan dompet yang sudah Anda punya.

## Cara kerja tap NFC di balik kartu Anda

Kartu contactless simpan antena tembaga kecil dan chip aman. Chip simpan token bayar, tanggal kedaluwarsa, dan generator cryptogram. Chip tidak punya baterai. Reader beri daya ke chip sekejap lewat medan elektromagnetik.

Anda dekatkan kartu dalam 2 sampai 4 sentimeter ke reader. Medan reader hidupkan chip. Chip bangun dan kirim cryptogram sekali pakai untuk transaksi itu. Reader teruskan cryptogram itu ke jaringan bank. Bank cek cryptogram dan setujui atau tolak bayar.

Tiga detail penting untuk keamanan.

Pertama, kartu tidak pernah kirim PIN lewat NFC. Anda ketik PIN di terminal atau Anda lewati PIN untuk transaksi kecil di bawah batas issuer.

Kedua, cryptogram ganti tiap tap. Rekaman satu tap tidak beri penyerang replay yang bank terima. Bank harap cryptogram baru dengan counter baru.

Ketiga, jangkau NFC pendek karena desain. Anda butuh dekat dan sejajar. Reader 10 sentimeter jauh kesulitan hidupkan chip. Reader seberang ruangan tidak bisa.

Tap lewat ponsel seperti Apple Pay, Google Pay, atau Samsung Pay tambah lapisan lain. Ponsel tidak simpan nomor kartu asli di chip NFC. Ponsel simpan token perangkat. Ponsel juga minta biometrik atau kode sebelum aktifkan tap. Ponsel terkunci tidak pancar data bayar.

## Apa yang bisa dan tidak bisa penyerang curi dengan reader tersembunyi

Anda berdiri di bus TransJakarta penuh. Orang senggol Anda dengan tas yang sembunyi reader. Apa yang terjadi.

Reader tersembunyi bisa hidupkan kartu di saku jika kartu duduk dalam 3 sampai 4 sentimeter dan dompet tidak blokir sinyal. Kulit atau kain saja tidak blokir sinyal. Logam, foil, atau sleeve RFID yang dirancang baru blokir.

Jika reader berhasil, reader tangkap data yang kartu pancar untuk percobaan transaksi itu. Untuk kartu contactless Visa atau Mastercard, data itu bisa masuk nomor kartu, tanggal kedaluwarsa, dan cryptogram sekali pakai plus counter. Beberapa kartu e-money Indonesia seperti Flazz atau e-Money pancar ID kartu, saldo, dan log transaksi terbaru tanpa nama pemegang.

Penyerang tidak tangkap CVV, PIN, atau nama dari kebanyakan kartu bayar contactless dengan cara yang ada di magnetic stripe. Produk e-money Indonesia juga tidak simpan nama di chip. Penyerang tidak kloning chip kerja dari satu tangkapan itu karena cryptogram hanya untuk sekali pakai dan kartu butuh secure element untuk buat yang berikut yang valid.

Risiko pindah saat Anda lihat serangan relay. Di serangan relay, dua penyerang kerja sebagai pasangan. Penyerang A berdiri dekat Anda dengan reader. Penyerang B berdiri dekat terminal bayar yang asli. A teruskan data kartu Anda ke B secara real time. B tap di terminal sementara Anda berdiri jauh. Kartu yang Anda bawa kira ia bicara dengan reader dekat, tapi transaksi selesai di toko jauh. Relay kerja bahkan dengan cryptogram sekali pakai karena kartu asli buat cryptogram baru untuk terminal asli lewat link relay. Jarak tetap batasi lompatan pertama, dan Anda dan terminal perlu jadi target di saat yang sama.

Riset bank di 2024 dan 2025 uji relay di setup emulasi. Tim hidupkan kartu lewat dompet dan lewat saku jeans, dan mereka berhasil hanya di celah sangat pendek dan dengan penjajaran antena yang hati-hati. Tim gagal lewat dompet logam dan gagal di 7 sentimeter. Relay praktis di pasar ramai butuh skill, peralatan, dan waktu yang pas. Relay mungkin, tapi Anda lihat lebih banyak fraud NFC lewat kartu hilang atau curi daripada lewat baca dompet diam-diam.

## Konteks Indonesia: Flazz, e-Money, TapCash, Brizzi, dan QRIS Tap

Indonesia pakai kartu stored-value dengan chip dan NFC lebih banyak dari banyak negara yang pakai tap Visa open-loop. Anda bawa Mandiri e-Money, BCA Flazz, BNI TapCash, atau BRI Brizzi untuk tol, parkir, dan gate commuter. Kartu ini simpan nilai di kartu itu sendiri, offline. Anda top up di ATM atau di Indomaret, Anda tap untuk potong.

Kartu ini tunjuk data beda saat reader tanya. Peneliti di komunitas sekuriti Indonesia dan lab kampus di 2023 sampai 2025 baca e-Money dan Flazz dengan reader umum ACR122U dan NFC ponsel. Mereka lihat ID kartu, saldo, dan 10 sampai 20 rekam transaksi terakhir. Mereka tidak lihat nama lengkap, alamat, atau link rekening bank.

Saldo offline dan log itu bawa risiko privasi lebih dari curi uang langsung. Orang yang baca kartu Anda di antrean tahu di mana Anda tap terakhir dan berapa saldo Anda pegang. Orang yang senggol Anda dua kali bisa tebak rute harian Anda antara gate tol. Jalur curi uang tetap butuh kartu beri otorisasi bayar di terminal asli, dan terminal dan bank acquirer catat ID merchant, waktu, dan jumlah. Merchant yang terima bayar relay tanpa cek tinggalkan jejak.

QRIS Tap, yang meluas di 2024 sampai 2025, ubah campuran. Anda tap ponsel yang simpan token QRIS lewat NFC. Token ponsel kait ke sumber dana. QRIS Tap pakai tokenisasi mirip Apple Pay. Ponsel tidak pancar nomor rekening bank asli.

Bank Indonesia set batas contactless untuk kartu open-loop. Di atas batas, terminal minta PIN atau suruh Anda masukkan chip. Minta PIN itu blokir relay nilai kecil jadi drain nilai besar tanpa PIN.

## Uji kartu Anda tanpa beli alat lab

Anda bisa cek apa yang kartu Anda pancar dengan alat yang sudah Anda punya.

Ambil ponsel Android. Hidupkan NFC. Pasang app reader seperti NFC Tools, TagInfo by NXP, atau Credit Card Reader (versi free ada, cek izin sebelum pasang). Tap kartu ke punggung ponsel. App tunjuk tipe tag, ID kartu, dan rekam yang tersedia.

Anda lihat satu dari dua pola. Kartu bayar tunjuk identifier aplikasi bayar dan tag yang app label sebagai EMV. Kartu e-money tunjuk applet stored-value dan field saldo. Anda tidak lihat PIN. Anda tidak lihat CVV.

Taruh kartu di dompet yang Anda pakai tiap hari. Coba lagi lewat dompet. Perhatikan jarak ubah hasil baca. Coba lagi dengan kartu lain tumpuk di atas. Jangkau baca menyusut. Coba lagi dengan sleeve RFID atau pouch foil. Baca gagal. Uji simpel itu tunjuk apa yang reader tersembunyi hadapi di kerumunan.

iPhone batasi baca data kartu langsung lewat app yang sama, tapi Anda tetap bisa pakai iPhone untuk uji perilaku Apple Pay. Set kartu di Wallet, dekatkan ponsel ke reader tanpa buka kunci, dan perhatikan ponsel minta Face ID. Gerbang kunci itu intinya.

## Tujuh langkah yang Anda lakukan untuk pertahan kenyamanan tap dan potong risiko

Anda tidak perlu matikan NFC atau bungkus tiap kartu dengan foil. Anda butuh beberapa kebiasaan yang pas dengan rutin harian.

### 1. Pakai token ponsel ganti kartu plastik untuk bayar open-loop

Tambah kartu Visa atau Mastercard contactless Anda ke Google Pay atau Apple Pay. Bayar dengan ponsel. Ponsel pakai token dan minta biometrik sebelum medan NFC hidup. Penyerang dekat saku Anda dapat tidak ada data dari ponsel terkunci. Bank Anda juga beri Anda kunci token dari app bank jika Anda hilang ponsel.

Simpan kartu plastik untuk gate tol atau untuk e-money di mana tap ponsel belum terima.

### 2. Bawa kartu stored-value terpisah dan lindungi hanya saat perlu

Kartu e-money di gate commuter butuh akses cepat, jadi Anda bawa kartu aktif di depan dompet atau di holder kartu. Taruh kartu lain yang tidak Anda tap harian di sleeve dengan blokir RFID. Anda tidak butuh dompet RFID penuh untuk tiap slot. Satu sleeve untuk kartu cadangan cukup.

Sleeve yang baik pakai lapisan serat logam. Uji sekali dengan ponsel. Jika ponsel tidak bisa baca kartu lewat sleeve, sleeve itu kerja.

### 3. Set batas contactless rendah dan hidupkan tiap notifikasi

Buka app bank. Cari kontrol kartu. Set batas contactless per transaksi yang pas dengan pakai. Untuk belanja minimarket harian Anda bisa set 500 ribu rupiah. Untuk tol dan parkir Anda jarang butuh lebih.

Hidupkan notifikasi transaksi untuk tiap debit, bukan hanya di atas ambang. Anda lihat tap aneh dalam detik. Anda bekukan kartu dari app sebelum tap kedua.

### 4. Jaga kartu terpisah dan hadapkan logam ke luar

Dua kartu tumpuk langsung bersama ganggu satu sama lain. Reader tersembunyi kesulitan pilih satu. Jika Anda bawa Flazz dan e-Money, taruh kartu non-NFC atau pemisah logam di antara. Beberapa pengguna commuter taruh kartu tap aktif di slot luar terpisah. Slot itu tap cepat di gate dan tetap jauh dari chip lain saat Anda jalan.

### 5. Kunci kartu hilang cepat dan paham alur sengketa

Jika Anda hilang kartu contactless, Anda tidak tunggu lihat apakah orang pakai. Anda kunci kartu di app, hubungi call center bank, dan minta blokir. Untuk kartu stored-value, saldo tetap di chip yang hilang, dan pulihkan itu susah. Untuk debit atau kredit contactless bank, bank bisa sengketa tap yang tidak Anda beri izin. Simpan foto nomor kartu dan call center di catatan aman. Anda butuh itu saat plastik hilang.

### 6. Tangani PIN dan perilaku terminal dengan niat

Di minimarket, Anda tidak serah kartu ke kasir untuk tap di luar lihat. Anda pegang kartu dan tap sendiri. Anda lihat jumlah di terminal sebelum tap. Anda tutup keypad saat ketik PIN untuk tap di atas batas. Tap yang gagal dua kali lalu kasir minta Anda masukkan chip dan ketik PIN itu normal. Tap yang terminal paksa ke PIN di jumlah kecil tetap bisa normal jika terminal capai counter offline, tapi Anda bisa tanya kenapa.

### 7. Update ponsel dan cek izin app tap

Serangan NFC di ponsel jarang incar radio. Mereka incar app yang kelola data tap. Jaga Android atau iOS tetap update. Jaga app bank tetap update. Cek app mana pegang izin NFC di Android di Setelan > Aplikasi > Akses khusus > NFC. Sedikit app butuh NFC. Cabut izin dari app yang tidak ada alasan pegang.

## Apa yang Anda lakukan jika curiga skim atau relay

Anda lihat tap kecil yang tidak Anda buat. Atau Anda lihat log gate commuter yang tidak pas dengan travel Anda. Jalan dengan urutan ini.

Pertama, kunci kartu. Pakai toggle di app bank. Jika app punya fitur bekukan, pakai. Itu stop tap berikut seketika.

Kedua, screenshot notifikasi. Catat waktu, jumlah, nama merchant, dan lokasi. Untuk e-money, buka app bank atau e-money dan screenshot daftar transaksi terakhir dan saldo. Anda butuh rekam itu untuk sengketa.

Ketiga, hubungi bank. Tanya jalur sengketa. Untuk kartu debit atau kredit bank, bank buka sengketa dan terbit kartu ganti. Untuk kartu stored-value, tanya apakah issuer bisa blokir ID kartu dari top-up atau pakai gate berikut. Beberapa issuer bisa blacklist ID.

Keempat, cek kartu lain. Jika satu kartu kena kontak, kartu lain di dompet yang sama kena kontak yang sama. Cek daftar transaksi mereka.

Kelima, ganti setup dompet. Pindah kartu sisa ke sleeve, turunkan batas, dan pindah bayar open-loop ke token ponsel.

Anda tidak perlu buat laporan polisi untuk tap gate 50 ribu rupiah, tapi untuk jumlah besar buat dan lampirkan screenshot dan nomor sengketa bank. Di Indonesia, Anda lapor di SPKT atau lewat kanal fraud bank yang teruskan ke tim fraud internal bank.

## Mitos yang buang uang dan fakta yang hemat

Anda lihat iklan untuk kartu, dompet, dan bahkan pakaian blokir RFID. Beberapa kerja, beberapa bikin bingung. Luruskan dengan uji.

**Mitos: Semua kartu NFC pancar nama dan alamat.** Tidak. Kartu stored-value Indonesia simpan ID kartu, saldo, dan log. Kartu bayar open-loop simpan nomor kartu dan kedaluwarsa untuk alur transaksi, tapi tidak simpan alamat jalan Anda. Token ponsel simpan bahkan lebih sedikit.

**Mitos: Reader bisa curi uang dari kartu lewat jeans dari satu meter.** Tidak. Jangkau NFC mentok di beberapa sentimeter lewat udara. Lewat kain jangkau tidak tumbuh. Lewat dompet tumpuk jangkau menyusut. Baca satu meter lawan kartu pasif langgar fisika tanpa antena kustom besar yang tidak muat di saku.

**Mitos: Kartu blokir RFID yang klaim jammer lindungi dua kartu di tiap sisi.** Kadang kartu jammer itu memang blokir baca untuk slot dekat, kadang ganggu tap gate Anda sendiri. Uji dengan ponsel. Jika ponsel tetap baca kartu di sebelah jammer, jammer tidak blokir.

**Fakta: Tokenisasi di ponsel kalahkan pelindung sleeve.** Ponsel yang minta Face ID sebelum NFC aktif tambah gerbang aktif. Sleeve tambah penghalang pasif yang harus Anda ingat pakai. Pakai dua jika mau, tapi utamakan gerbang aktif.

**Fakta: Jalur rugi contactless terbesar di Indonesia tetap simpel.** Orang hilang kartu atau biar kartu tidak blokir setelah hilang. Orang temukan dan tap untuk jumlah kecil di toko sampai pemilik blokir. Jalur itu sumbang nilai fraud lebih besar dari baca diam-diam, per ungkap internal bank yang bagi di briefing sekuriti fintech lokal di 2024.

## Setup dompet cepat yang kerja untuk Jakarta, Surabaya, dan di mana pun Anda tap

Anda naik commuter, Anda lewat tol, Anda beli kopi di minimarket. Anda mau tap cepat dengan risiko rendah.

Taruh kartu e-money aktif yang Anda tap di gate di slot luar untuk cepat. Taruh e-money cadangan di sleeve terlindung. Pindah Visa atau Mastercard Anda ke token ponsel dan tap dengan Face ID. Set batas contactless ke 500 ribu sampai 1 juta rupiah per tap. Hidupkan notifikasi untuk semua debit. Simpan toggle bekukan bank di shortcut layar utama.

Di tol, Anda tahu saldo sebelum jalan. Top up di app bank lewat top-up NFC, lalu cek baca saldo sebelum Anda jalan. Di minimarket, Anda pegang ponsel sendiri, Anda cek jumlah, Anda tunggu centang hijau.

Anda uji sleeve sekali dengan ponsel. Anda uji tumpuk dompet sekali. Anda lihat apa yang blokir dan apa yang tidak. Anda kini percaya setup karena Anda uji, bukan karena halaman produk klaim.

## Kapan Anda butuh pelindung penuh

Anda kerja di job risiko tinggi, Anda bawa banyak kartu bank, Anda hadir event dengan kerumunan padat dan Anda tidak bisa jaga tas. Dalam kasus itu, pakai pouch zip dengan lapisan RFID tersertifikasi untuk semua kartu yang tidak Anda butuh di gate. Tutup zip. Simpan kartu gate aktif di luar pouch. Pouch itu hapus vektor reader tersembunyi untuk kartu di dalam sementara Anda simpan satu kartu siap.

Anda travel luar negeri di mana batas tap lebih tinggi, dan terminal sering izinkan contactless lebih besar tanpa PIN. Dalam kasus itu, turunkan batas di app sebelum terbang dan naikkan hanya saat perlu. Slider di app adalah kontrol terbaik lintas batas.

## Checklist yang bisa Anda jalan dalam lima menit malam ini

Anda tidak butuh proyek akhir pekan. Jalan ini malam ini.

- Anda pasang app reader NFC di Android dan baca kartu Anda. Anda catat kartu mana tunjuk saldo dan mana tunjuk tag EMV.
- Anda uji dompet dan sleeve. Anda catat setup mana blokir baca ponsel.
- Anda tambah kartu bank ke Apple Pay atau Google Pay dan uji satu tap kecil dengan biometrik.
- Anda set batas contactless di app bank dan hidupkan semua notifikasi transaksi.
- Anda simpan call center bank dan shortcut bekukan kartu di layar utama ponsel.
- Anda foto ID kartu e-money dan simpan di password manager untuk blokir cepat jika hilang dompet.

Anda kini punya dompet yang bisa Anda jelaskan ke teman. Anda bisa tunjuk uji, batas, notifikasi, dan toggle bekukan. Bukti hands-on itu kalahkan klaim di kotak produk.

## Sumber dan di mana Anda cek lebih jauh

- Spesifikasi teknis NFC Forum untuk NFC-A dan NFC-B di 13,56 MHz dan jarak operasi 4 cm
- Spesifikasi EMVCo Contactless untuk token bayar dan alur cryptogram
- Dokumen Bank Indonesia dan ASPI soal pilot QRIS Tap dan pendekatan tokenisasi 2024 sampai 2025
- Panduan keamanan contactless Visa dan Mastercard untuk issuer dan merchant
- Demo riset oleh lab sekuriti kampus Indonesia soal baca e-Money dan Flazz dengan ACR122U di 2023 sampai 2025, lapor di meetup infosec lokal
- Catatan briefing fraud bank yang bagi di forum sekuriti fintech Jakarta 2024 soal sebab rugi contactless

> Anda kendali risiko tap dengan jarak, batas, dan token yang Anda uji sendiri. Teknologi bantu, tapi kebiasaan Anda cek jumlah, tap sendiri, dan bekukan cepat yang buat beda.

