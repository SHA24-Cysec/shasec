---
translationKey: "pdp-breach-notification-umkm"
title: "SOP Notifikasi Pelanggaran Data UU PDP 72 Jam untuk UMKM: Template dan Checklist"
date: 2026-07-05
draft: false
categories:
  - Keamanan Digital
  - Kepatuhan
tags:
  - UU PDP
  - data breach
  - notifikasi 72 jam
  - UMKM
  - kepatuhan
  - SOP
summary: "Panduan praktis SOP notifikasi pelanggaran data pribadi 72 jam sesuai UU PDP untuk UMKM: kapan wajib lapor, ke siapa, isi notifikasi, template email ke pelanggan, dan checklist dokumentasi untuk audit."
cover: "/images/articles/pdp-breach-notification-umkm.webp"
---

UU PDP Indonesia 2022 mewajibkan pengendali data pribadi lapor pelanggaran data ke otoritas dalam 72 jam sejak sadar pelanggaran. Untuk UMKM yang kelola data pelanggan ribuan, kewajiban ini bukan teori. Denda administratif dan reputasi jadi taruhannya.

Banyak UMKM belum punya SOP. Saat breach terjadi, pemilik bingung apa yang harus dilapor, ke siapa, dengan bahasa apa. Artikel ini kasih SOP praktis 72 jam yang bisa Anda pakai langsung, dengan template.

## Dasar hukum singkat yang perlu Anda tahu

UU No 27 Tahun 2022 tentang Pelindungan Data Pribadi pasal 14 dan pasal 46 mengatur kewajiban notifikasi.

Poin kunci:

- **Wajib lapor dalam 72 jam** sejak pengendali sadar terjadi pelanggaran data pribadi.
- Lapor ke otoritas (Lembaga Pelindungan Data Pribadi yang akan dibentuk) dan ke subjek data jika risiko tinggi.
- Isi notifikasi harus jelas: jenis data, jumlah subjek terdampak, dampak, langkah yang sudah dilakukan, dan kontak DPO.
- Sanksi administratif: peringatan tertulis, penghentian pemrosesan, penghapusan data, denda hingga 2 persen pendapatan tahunan.

Aturan teknis turunan masih proses, tapi prinsip 72 jam mengacu pada GDPR yang sudah jadi praktik global. Jika Anda patuh prinsip GDPR 72 jam, Anda sudah siap untuk aturan Indonesia.

## Apa yang dianggap pelanggaran data

Tidak semua insiden adalah pelanggaran data.

**Pelanggaran yang wajib lapor:**

- Database pelanggan toko online di-download hacker dan beredar di forum.
- File Excel berisi NIK dan nomor HP pelanggan ter-upload ke Google Drive shareable publik karena salah setting.
- Email massal ke pelanggan dengan CC bukan BCC, sehingga alamat email pelanggan terlihat semua.
- Laptop admin toko hilang dan tidak ada enkripsi, berisi data 5.000 pelanggan.
- Ransomware enkripsi server dan pelaku minta tebusan dengan ancaman sebar data.

**Bukan pelanggaran yang wajib lapor (tapi tetap perbaiki):**

- Percobaan login gagal yang diblokir WAF dan tidak berhasil akses data.
- Email phising masuk tapi tidak ada yang klik dan tidak ada data keluar.
- Server down karena hosting maintenance, bukan breach.

Kunci: apakah ada akses tidak sah ke data pribadi atau data pribadi hilang permanen? Jika ya, masuk kategori pelanggaran.

## Jenis data yang bikin risiko tinggi

Tidak semua data sama risiko.

**Risiko tinggi:** NIK, foto KTP, foto selfie, data biometric, password hash, data finansial (rekening, kartu), data anak, data kesehatan.

**Risiko sedang:** Email, nomor HP, alamat rumah, tanggal lahir, riwayat belanja.

**Risiko rendah:** Nama panggilan saja tanpa data lain.

Jika breach Anda berisi NIK plus foto KTP, Anda wajib notifikasi ke subjek data secepat mungkin, bukan hanya ke otoritas. Karena NIK bisa dipakai untuk pinjol dan SIM swap.

## Tim dan peran yang Anda butuh untuk UMKM kecil

Anda tidak butuh tim 20 orang. Cukup 3 peran.

**Ketua Insiden:** Pemilik atau manajer operasional. Bertugas putuskan kapan nyatakan breach dan kapan lapor.

**Teknis:** Orang yang kelola website/hosting. Bertugas isolasi server, ambil log, dan tutup celah.

**Komunikasi:** Admin CS. Bertugas hubungi pelanggan dan jawab pertanyaan.

Jika Anda hanya 2 orang, rangkap peran. Yang penting ada catatan siapa putuskan apa dan jam berapa.

Catat kontak darurat: hosting support, developer website, konsultan hukum jika ada, dan nomor call center bank jika data finansial terlibat.

## SOP 72 jam langkah demi langkah

### Jam 0-1: Deteksi dan triase

Anda dapat alert dari hosting: ada file aneh, atau pelanggan lapor dapat SMS pinjol atas nama toko Anda.

1.  Catat jam deteksi. Jam ini jadi patokan 72 jam.
2.  Verifikasi apakah benar breach. Cek log akses, file, dan akun.
3.  Tentukan jenis data apa yang terdampak dan perkiraan jumlah subjek. Contoh: 1.200 baris data pelanggan dengan nama, email, nomor HP, dan alamat.
4.  Jangan hapus log. Simpan log asli.

### Jam 1-4: Isolasi dan amankan

1.  Isolasi sistem terdampak: matikan akses publik, ganti password hosting, cabut API key yang bocor.
2.  Backup log dan file terdampak ke storage aman untuk forensik.
3.  Tutup celah yang dipakai masuk, contoh update plugin atau cabut akses karyawan yang resign tapi masih punya akun.
4.  Dokumentasi semua langkah dengan jam.

### Jam 4-24: Penilaian dampak dan kumpulkan bukti

1.  Buat daftar: data apa, berapa orang, dari mana sumber data, apakah ada data risiko tinggi.
2.  Nilai risiko: apakah data bisa dipakai untuk penipuan identitas? Apakah ada anak di dalam data?
3.  Siapkan draft notifikasi ke otoritas dan ke pelanggan.
4.  Konsultasi hukum singkat jika Anda punya. Jika tidak, pakai template di artikel ini.

### Jam 24-72: Notifikasi resmi

1.  Kirim notifikasi awal ke otoritas dalam 72 jam meski investigasi belum selesai. Notifikasi awal bisa dilengkapi nanti.
2.  Jika risiko tinggi, siapkan notifikasi ke pelanggan terdampak dengan bahasa jelas tanpa jargon.
3.  Siapkan channel untuk pertanyaan pelanggan: email khusus `security@tokosaya.com` atau nomor WA khusus.
4.  Simpan bukti pengiriman notifikasi: screenshot email terkirim, log.

Setelah 72 jam: investigasi lanjutan, perbaikan, dan laporan penutup.

## Isi notifikasi ke otoritas yang wajib ada

Menurut GDPR dan draf aturan PDP, notifikasi harus berisi:

1.  Identitas pengendali data: nama UMKM, alamat, kontak DPO.
2.  Waktu kejadian dan waktu deteksi.
3.  Jenis data pribadi yang terdampak: email, NIK, dll.
4.  Jumlah subjek terdampak perkiraan.
5.  Dampak yang mungkin terjadi: spam, penipuan, pencurian identitas.
6.  Langkah yang sudah dilakukan: isolasi, ganti password, tutup celah.
7.  Langkah yang akan dilakukan: pemberitahuan ke subjek, perbaikan keamanan, audit.
8.  Kontak untuk info lebih lanjut.

Pakai bahasa Indonesia baku dan jelas.

## Template notifikasi ke otoritas (versi awal 72 jam)

```
Kepada Yth,
Lembaga Pelindungan Data Pribadi / Otoritas Terkait

Perihal: Notifikasi Awal Pelanggaran Data Pribadi – PT Toko Saya

Kami, PT Toko Saya, alamat Jl. Contoh No 123 Batam, email dpo@tokosaya.com, 
memberitahukan dugaan pelanggaran data pribadi yang kami deteksi pada:

Waktu deteksi: 2026-07-05 08:00 WIB
Waktu kejadian perkiraan: 2026-07-04 22:00 – 2026-07-05 05:00 WIB
Sistem terdampak: Website WordPress tokosaya.com di hosting XYZ
Jenis data terdampak: Nama, email, nomor HP, alamat pengiriman (1.200 subjek)
                        Tidak ada NIK, KTP, atau data kartu (sudah kami enkripsi)
Dampak potensial: Risiko spam dan percobaan phising mengatasnamakan toko
Langkah yang sudah dilakukan:
- Isolasi website, ganti password hosting dan admin WordPress jam 09:00 WIB
- Tutup plugin rentan (plugin XYZ versi lama)
- Backup log dan file untuk analisis
- Blokir IP pelaku di WAF

Langkah selanjutnya:
- Notifikasi ke pelanggan terdampak dalam 24 jam ke depan via email
- Audit file dan user, reset semua sesi admin
- Ganti API key dan aktifkan 2FA wajib untuk semua admin

Kontak DPO: Budi, dpo@tokosaya.com, HP 62xxx

Notifikasi ini akan kami lengkapi dengan laporan rinci dalam 72 jam berikutnya.

Hormat kami,
PT Toko Saya
```

Simpan template ini di Google Docs dan siap pakai.

## Template notifikasi ke pelanggan terdampak

Bahasa ke pelanggan harus empati, jelas, tanpa menyembunyikan.

```
Subject: Informasi Penting – Keamanan Data di TokoSaya

Halo [Nama Pelanggan],

Kami menemukan insiden keamanan pada tanggal 5 Juli 2026 yang berdampak pada data Anda.

Data apa yang terdampak:
- Nama, email, nomor HP, alamat pengiriman yang Anda pakai belanja di TokoSaya
- Tidak ada data KTP, password, atau kartu kredit (data tersebut terenkripsi dan tidak terdampak)

Apa yang sudah kami lakukan:
- Menutup celah keamanan dan mengamankan website
- Melaporkan insiden ke otoritas terkait
- Mengaktifkan monitoring dan 2FA untuk semua admin

Apa yang perlu Anda lakukan:
- Waspada email atau WA yang mengatasnamakan TokoSaya dan minta transfer atau OTP
- Ganti password jika Anda pakai password yang sama di layanan lain
- Hubungi kami di security@tokosaya.com jika dapat pesan mencurigakan

Kami minta maaf atas kejadian ini dan berkomitmen perbaiki keamanan.

Terima kasih,
Tim TokoSaya
security@tokosaya.com | WA 62xxx
```

Jangan pakai bahasa hukum berbelit. Pelanggan tidak paham pasal. Mereka butuh tahu apa yang bocor dan apa yang harus dilakukan.

## Dokumentasi untuk audit

Otoritas akan minta bukti bahwa Anda punya SOP dan menjalankannya.

Simpan folder `PDP_Breach_20260705` berisi:

- Kronologi dengan jam lengkap
- Log akses asli (jangan edit)
- Screenshot langkah isolasi (ganti password, WAF block)
- Daftar data terdampak (jumlah, jenis, tanpa data pribadi lengkap di laporan awal)
- Bukti notifikasi ke otoritas dan pelanggan (email log, screenshot)
- Tindakan perbaikan (update plugin, 2FA, audit user)

Simpan minimal 2 tahun. Ini bukti akuntabilitas.

## Pencegahan agar tidak breach lagi

Setelah insiden, lakukan hardening.

1.  Update WordPress, plugin, tema tiap minggu.
2.  Aktifkan 2FA wajib untuk semua admin dan hapus admin tidak aktif.
3.  Enkripsi data sensitif di database, bukan plain text.
4.  Backup 3-2-1 dan uji restore.
5.  Batasi akses: kasir hanya lihat order, tidak bisa export data pelanggan massal.
6.  Training 30 menit tiap bulan tentang phising dan password.

Biaya hardening lebih murah daripada denda dan kehilangan kepercayaan pelanggan.

## Checklist kesiapan PDP untuk UMKM sebelum breach

Lakukan sebelum breach terjadi.

- [ ] Apakah Anda tahu data apa yang Anda simpan dan di mana?
- [ ] Apakah Anda punya DPO atau penanggung jawab data, meski owner sendiri?
- [ ] Apakah Anda punya SOP 72 jam tertulis dan sudah test simulasi?
- [ ] Apakah hosting dan plugin update otomatis atau manual terjadwal?
- [ ] Apakah data sensitif dienkripsi dan backup teruji?
- [ ] Apakah karyawan tahu beda CC dan BCC saat kirim email massal?
- [ ] Apakah Anda punya template notifikasi ke pelanggan dan otoritas?

Jika 3 dari 7 belum, mulai dari situ minggu ini.

## Sumber dan regulasi

- [UU No 27 Tahun 2022 tentang Pelindungan Data Pribadi](https://peraturan.bpk.go.id/Details/229557/uu-no-27-tahun-2022)
- [GDPR Article 33 - Notification of personal data breach](https://gdpr.eu/article-33-notification-of-a-personal-data-breach/)
- [CISA: Data Breach Response Guide](https://www.cisa.gov/topics/cybersecurity/best-practices)
- [Kominfo: Panduan PDP](https://www.kominfo.go.id)
- [ENISA: Data Breach Notification](https://www.enisa.europa.eu/topics/data-protection)

> **Catatan editorial:** Artikel ini panduan umum, bukan nasihat hukum spesifik. Untuk kasus dengan data sensitif besar atau risiko tinggi, konsultasi ke konsultan hukum PDP. Simpan dokumentasi SOP sebagai bukti kepatuhan.

## Pertanyaan yang sering diajukan

### Apakah UMKM kecil wajib lapor 72 jam?

Ya. UU PDP tidak bedakan UMKM dan korporat besar sebagai pengendali data. Kewajiban tetap, meski skala dan denda proporsional.

### Ke siapa lapor di Indonesia saat ini jika lembaga PDP belum ada?

Sementara lembaga dibentuk, lapor ke Kominfo, BSSN untuk insiden siber, dan dokumentasikan internal sebagai bukti. Lapor juga ke pelanggan jika risiko tinggi. Pantau update pembentukan lembaga PDP di berita resmi Kominfo.

### Apakah harus lapor jika hanya 10 data bocor?

Tetap lapor jika data risiko tinggi atau bisa dipakai untuk penipuan identitas. Jumlah kecil tidak menghapus kewajiban jika dampak tinggi.

### Apakah email massal CC termasuk pelanggaran?

Ya jika menampilkan data pribadi subjek lain tanpa persetujuan. Contoh CC menampilkan email pelanggan lain. Itu pelanggaran kerahasiaan. Masuk kategori breach yang wajib evaluasi notifikasi.

### Bagaimana jika breach karena vendor hosting?

Anda tetap sebagai pengendali data tetap bertanggung jawab. Anda harus lapor dan tunjukkan Anda sudah pilih vendor dengan wajar dan punya kontrak yang jelas soal keamanan. Minta laporan insiden dari vendor untuk lampiran.

### Apakah perlu minta maaf di notifikasi pelanggan?

Ya. Minta maaf dengan tulus dan jelas tindakan yang sudah dilakukan membangun kepercayaan. Hindari bahasa menyalahkan vendor atau hacker tanpa tunjukkan langkah perbaikan.

### Berapa lama simpan dokumentasi breach?

Minimal 2-5 tahun sesuai kebijakan retensi dan kebutuhan audit. Simpan di storage aman terenkripsi dengan akses terbatas.



## Simulasi tabletop exercise 1 jam untuk UMKM

Ajak 3 orang: owner, teknisi, CS. Buat skenario: website tokosaya.com deface jam 10 malam, data 1.200 pelanggan bocor.

Jalankan simulasi:

- Jam 0: Siapa deteksi? Bagaimana catat jam deteksi?
- Jam 0-1: Siapa isolasi website? Bagaimana backup log?
- Jam 1-4: Siapa nilai dampak? Data apa yang bocor? Risiko tinggi atau sedang?
- Jam 4-24: Siapa buat draft notifikasi? Template mana dipakai?
- Jam 24-72: Siapa kirim notifikasi ke otoritas dan pelanggan?

Catat waktu tiap keputusan. Evaluasi apa yang lambat. Seringkali lambat di penilaian dampak karena tidak tahu data apa disimpan di mana.

Simulasi 1 jam tiap 6 bulan lebih murah daripada panik saat breach beneran.

## Cara buat inventory data sederhana untuk UMKM

Buat sheet dengan kolom:

- Nama sistem (WordPress, Google Sheet, Akulaku Excel)
- Jenis data (nama, email, NIK, alamat)
- Jumlah subjek
- Lokasi simpan (hosting XYZ, Drive, laptop)
- Enkripsi (ya/tidak)
- Retensi (berapa lama simpan)
- Akses (siapa bisa akses)

Inventory ini membantu saat breach, Anda cepat tahu apa yang bocor tanpa cari-cari file.

Contoh: jika inventory tunjukkan NIK disimpan di Excel tanpa enkripsi di laptop admin, Anda tahu risiko tinggi dan harus notifikasi cepat.

Update inventory tiap 3 bulan atau saat tambah sistem baru.

## Kesalahan yang bikin denda PDP membesar

Tidak punya SOP tertulis. Saat audit, otoritas tanya SOP Anda, Anda tidak punya. Ini dianggap kelalaian.

Hapus log setelah breach untuk tutupi jejak. Ini memperburuk keadaan dan dianggap menghambat investigasi.

Notifikasi ke pelanggan pakai bahasa menyalahkan hacker tanpa tunjukkan langkah perbaikan. Pelanggan anggap Anda tidak tanggung jawab dan lapor ke media.

Simpan data pelanggan selamanya tanpa retensi. UU PDP wajib hapus setelah tujuan selesai. Jika Anda simpan data 5 tahun tanpa alasan, ini pelanggaran prinsip minimisasi.

Tidak catat jam deteksi dan jam notifikasi. Otoritas nilai apakah Anda lapor dalam 72 jam dari bukti jam. Tanpa catatan jam, Anda sulit buktikan kepatuhan.




## FAQ tambahan dan mitigasi lanjutan

Banyak orang tanya apakah solusi ini gratis. Sebagian besar gratis, sebagian butuh biaya kecil. Firefox Relay gratis 5 alias, SimpleLogin gratis 15 alias, iCloud Hide My Email butuh iCloud+ Rp 15 ribu. Untuk UMKM, biaya €30 per tahun untuk custom domain sepadan dengan waktu yang dihemat.

Apakah solusi ini tahan terhadap serangan canggih? Tidak ada solusi 100 persen. Tapi alias, passkey, dan isolasi IoT mengurangi 80 persen serangan opportunistik yang jadi mayoritas insiden UMKM. Serangan targeted APT butuh pertahanan lebih dalam.

Bagaimana jika karyawan menolak pakai SOP baru? Edukasi dengan contoh nyata lebih efektif daripada paksaan. Tunjukkan kasus kafe di Bali yang rating turun karena QR palsu, atau kos di Jogja yang video CCTV bocor. Kasus nyata membuat orang peduli.

Apakah perlu konsultan mahal? Untuk UMKM dengan data pelanggan di bawah 10 ribu, SOP 1 halaman plus checklist bulanan cukup. Konsultan diperlukan jika Anda kelola data sensitif seperti NIK, foto KTP, atau data finansial besar dan butuh DPIA sesuai UU PDP.

Bagaimana cara ukur keberhasilan? Hitung metrik sederhana: jumlah spam per minggu, jumlah percobaan login gagal, jumlah device IoT yang update. Catat di sheet tiap bulan. Jika angka turun, SOP bekerja.

Satu prinsip: keamanan bukan proyek sekali jadi, tapi kebiasaan bulanan 10-30 menit. Konsistensi lebih penting daripada alat mahal.



Tambahan checklist: cek apakah password manager backup terenkripsi di cloud, cek apakah ada device IoT yang masih pakai Telnet port 23 terbuka, dan cek apakah email alias masih forward dengan benar. Tiga cek ini butuh 5 menit tapi cegah 3 vektor serangan utama: credential leak, botnet, dan mail misdelivery.

Untuk UMKM, buat kalender pengingat tiap Senin pagi: cek log admin, cek backup, cek update. Kalender otomatis lebih efektif daripada ingatan.

Edukasi pelanggan juga bagian dari tanggung jawab. Tempel poster kecil di kasir: "Kami tidak pernah minta OTP via WhatsApp, waspada QR palsu". Poster fisik mengingatkan pelanggan dan kurangi korban penipuan mengatasnamakan toko Anda.

Akhirnya, dokumentasi sederhana 1 halaman yang disimpan di Drive bersama lebih berguna daripada dokumen 20 halaman yang tidak dibaca. Mulai dengan 1 halaman, lalu perbaiki tiap bulan berdasarkan insiden atau simulasi.
