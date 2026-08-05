---
translationKey: "spf-dkim-dmarc-bimi"
title: "SPF, DKIM, dan DMARC: Cara Mencegah Domain Dipakai untuk Phishing"
date: 2026-08-05
draft: false
categories:
 - Keamanan Siber
tags:
 - Email Security
 - DMARC
 - SPF
 - DKIM
 - BIMI
summary: "Panduan teknis untuk pemilik domain dan admin email dalam mengurangi pemalsuan alamat email dan meningkatkan kepercayaan pengiriman."
cover: "/images/articles/spf-dkim-dmarc-bimi.webp"
---

Pemalsuan alamat pengirim membuat email penipuan terlihat berasal dari domain yang Anda kenal. SPF, DKIM, dan DMARC memberi server penerima cara memeriksa apakah pesan memang dikirim oleh layanan yang Anda izinkan. BIMI menambah lapisan identitas visual, tetapi bukan pengganti autentikasi.

## Empat mekanisme yang berbeda

### SPF memeriksa server pengirim
Sender Policy Framework menyimpan daftar server yang boleh mengirim email untuk domain Anda dalam record TXT DNS. SPF membantu penerima mengenali server yang tidak sah. Gunakan satu record SPF untuk setiap domain. Terlalu banyak mekanisme `include` dapat melewati batas pencarian DNS dan menyebabkan pemeriksaan gagal.

### DKIM menandatangani pesan
DomainKeys Identified Mail menambahkan tanda tangan kriptografis pada header pesan. Server penerima mengambil public key dari DNS lalu memeriksa apakah pesan berubah selama pengiriman. Simpan private key di penyedia email, rotasi key sesuai kemampuan layanan, dan gunakan selector yang terdokumentasi.

### DMARC menentukan kebijakan
Domain-based Message Authentication, Reporting, and Conformance menghubungkan pemeriksaan SPF atau DKIM dengan domain pada header From. DMARC juga menentukan tindakan ketika pemeriksaan gagal dan mengirim laporan agregat ke alamat yang Anda tetapkan. Mulai dengan `p=none` untuk melihat sumber pengiriman yang sah, lalu naikkan ke `quarantine` dan `reject` setelah semua layanan diverifikasi.

### BIMI menampilkan identitas brand
Brand Indicators for Message Identification memungkinkan logo tampil pada klien email yang mendukungnya. Implementasi biasanya membutuhkan DMARC dengan kebijakan penegakan serta sertifikat VMC atau CMC, bergantung pada persyaratan penyedia. Anggap BIMI sebagai fitur brand dan anti-impersonation tambahan.

## Urutan implementasi yang aman

1. Inventarisasi semua layanan yang mengirim email: mailbox, website, CRM, newsletter, invoice, dan ticketing.
2. Publikasikan SPF dengan daftar pengirim yang benar. Jangan menyalin record SPF kedua.
3. Aktifkan DKIM pada setiap layanan dan catat selector-nya.
4. Tambahkan DMARC seperti `v=DMARC1; p=none; rua=mailto:dmarc@contoh.id`.
5. Tinjau laporan selama beberapa siklus pengiriman. Pisahkan layanan sah dari spoofing dan konfigurasi lama.
6. Perbaiki layanan sah, lalu ubah kebijakan ke `quarantine` dan akhirnya `reject` bila cakupan sudah jelas.
7. Monitor perubahan DNS dan kedaluwarsa sertifikat atau key.

## Kesalahan yang sering terjadi

- Memasang dua record SPF pada domain yang sama.
- Mengaktifkan `p=reject` sebelum memetakan vendor pengirim.
- Menganggap DMARC melindungi email masuk dari semua domain palsu. Kebijakan itu terutama mengatur penyalahgunaan domain Anda.
- Mengirim laporan DMARC ke mailbox pribadi tanpa retensi atau analisis.
- Mengizinkan vendor mengirim memakai domain utama tanpa DKIM dan alignment yang benar.

## Checklist audit

- [ ] Domain memiliki satu SPF yang valid.
- [ ] Semua layanan pengirim memiliki DKIM aktif.
- [ ] DMARC memiliki alamat laporan yang dipantau.
- [ ] Subdomain pengiriman memiliki kebijakan yang jelas.
- [ ] Perubahan DNS memerlukan MFA dan persetujuan.
- [ ] Kebijakan DMARC naik setelah laporan ditinjau.

## Sumber

- [CISA: Implement SPF, DKIM, and DMARC](https://www.cisa.gov/eviction-strategies-tool/info-countermeasures/CM0055)
- [RFC 7208: SPF](https://www.rfc-editor.org/rfc/rfc7208)
- [RFC 6376: DKIM](https://www.rfc-editor.org/rfc/rfc6376)
- [RFC 7489: DMARC](https://www.rfc-editor.org/rfc/rfc7489)

> Catatan: Uji perubahan pada domain atau subdomain pengujian bila layanan Anda kritis. Kesalahan DNS dapat menghentikan email yang sah.


## Cara menerapkan kontrol tanpa mengganggu operasi

Buat perubahan secara bertahap. Catat kondisi awal sebelum mengubah konfigurasi. Simpan pemilik keputusan, waktu perubahan, dan cara mengembalikan pengaturan. Pendekatan ini mencegah tim mengejar konfigurasi ideal sambil mengorbankan layanan yang sedang berjalan.

Mulai dari aset yang paling memengaruhi uang, identitas, dan data pelanggan. Tetapkan satu orang yang bertanggung jawab, satu orang yang meninjau, dan satu kanal komunikasi. Setelah kontrol aktif, lakukan uji kecil dengan akun uji atau perangkat nonproduksi. Periksa hasilnya dari sisi pengguna dan sisi log.

### Buat baseline yang dapat dibandingkan

Baseline berisi konfigurasi yang disetujui, pemiliknya, waktu perubahan terakhir, dan alasan pengecualian. Simpan baseline di repositori dengan akses terbatas. Jangan menyimpan rahasia, token, private key, atau data pelanggan di dalamnya. Screenshot dapat membantu, tetapi catatan terstruktur lebih mudah ditinjau.

### Perlakukan pengecualian sebagai utang

Pengecualian kadang dibutuhkan untuk kompatibilitas. Beri setiap pengecualian alasan, pemilik, risiko, kompensasi, dan tanggal kedaluwarsa. Review pengecualian pada rapat operasional. Pengecualian tanpa tanggal akan berubah menjadi konfigurasi permanen yang dilupakan.

### Ukur hasil dengan pertanyaan sederhana

Tanyakan apakah kontrol menurunkan peluang penyalahgunaan, mempercepat deteksi, atau memperkecil dampak insiden. Ukur waktu menemukan perubahan, waktu mencabut akses, jumlah akun tanpa MFA, jumlah alert yang ditindaklanjuti, dan jumlah pengecualian yang sudah kedaluwarsa. Angka itu membantu pemilik usaha memilih pekerjaan berikutnya.

### Jaga privasi pembaca dan pengguna

Kontrol keamanan tidak memberi izin untuk mengumpulkan data tanpa batas. Tetapkan tujuan, batasi akses, dan hapus data operasional ketika tidak lagi diperlukan. Jika artikel atau checklist diterapkan pada data pelanggan, libatkan penanggung jawab privasi dan dokumentasikan dasar pemrosesannya.

## Kesimpulan

Pertahanan yang baik memiliki pemilik, bukti, dan jadwal tinjauan. Pilih perubahan yang dapat diuji minggu ini, dokumentasikan hasilnya, lalu lanjutkan ke aset berikutnya.

> Disclosure editorial: Artikel ini ditulis khusus untuk ShaSec berdasarkan dokumentasi publik dan praktik keamanan defensif. Artikel tidak mempromosikan vendor tertentu, tidak meminta pembaca mengklik iklan, dan tidak menjamin bahwa satu kontrol dapat mencegah seluruh insiden.
