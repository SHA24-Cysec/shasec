---
translationKey: "domain-hijacking"
title: "Domain Hijacking: Cara Melindungi Domain, DNS, dan Akun Registrar"
date: 2026-08-05
draft: false
categories:
 - Keamanan Siber
tags:
 - Domain security
 - DNS
 - registrar
 - account takeover
summary: "Langkah praktis untuk mencegah pengambilalihan domain yang dapat mengubah website, email, dan seluruh layanan digital Anda."
cover: "/images/articles/domain-hijacking.webp"
---

Satu akun registrar yang diretas dapat mengubah nameserver, mengalihkan website, menerima email reset password, atau memblokir pemilik sah dari domain. Domain hijacking berbeda dari defacement: penyerang menguasai registrasi atau DNS, bukan hanya file website.

## Peta aset yang harus diamankan

Catat registrar, registry, DNS provider, hosting, email, CDN, akun billing, kontak administratif, dan domain mirip. Identifikasi siapa yang dapat mengubah nameserver, transfer lock, dan data pemulihan. Jangan menganggap hosting dan registrar adalah akun yang sama.

## Kontrol utama

### Kunci akun registrar
Gunakan password unik, MFA tahan phishing bila tersedia, notifikasi login, dan akun administrator terpisah dari akun billing. Simpan recovery code di vault. Batasi akses berdasarkan peran dan hapus akun mantan admin.

### Aktifkan registrar lock
Transfer lock mencegah perpindahan domain tanpa pelepasan kunci. Untuk aset kritis, tanyakan registry lock atau layanan setara. Lock bukan pengganti MFA. Admin yang sudah masuk masih dapat mengubah DNS.

### Lindungi DNS
Gunakan DNSSEC bila registrar dan DNS provider mendukungnya. Simpan DS record dan prosedur pemulihan. Pantau nameserver, MX, TXT, CNAME, dan A record. Perubahan MX sangat berbahaya karena dapat mengalihkan email pemulihan akun.

### Pisahkan jalur pemulihan
Email pemulihan registrar tidak boleh hanya bergantung pada domain yang sedang dilindungi. Gunakan alamat terpisah dengan MFA. Simpan kontak registrar, bukti kepemilikan, invoice, dan tanggal perpanjangan di tempat aman.

## Monitoring yang masuk akal

Pasang alert untuk login baru, perubahan nameserver, perubahan DNS, transfer request, perubahan kontak, dan kegagalan pembayaran. Periksa certificate transparency untuk sertifikat baru pada domain Anda. Uji dari jaringan luar apakah website, MX, dan DNS masih mengarah ke infrastruktur yang benar.

## Saat domain dicurigai diambil alih

1. Jangan menghapus bukti atau mengganti banyak record tanpa mencatat kondisi awal.
2. Hubungi registrar melalui kanal resmi dan minta pembekuan transfer serta perubahan.
3. Amankan email registrar dan akun DNS dari perangkat tepercaya.
4. Bandingkan nameserver, DNSSEC, MX, dan kontak dengan baseline yang tersimpan.
5. Cabut sesi, token, dan password yang mungkin menerima reset melalui email yang dialihkan.
6. Beri tahu pelanggan melalui kanal lain bila website atau email berubah.
7. Dokumentasikan waktu, screenshot, header email, log, tiket dukungan, dan nomor laporan.

## Checklist bulanan

- [ ] MFA registrar dan DNS aktif.
- [ ] Transfer lock aktif.
- [ ] Kontak pemulihan masih benar.
- [ ] Nameserver dan MX cocok dengan baseline.
- [ ] Domain mendekati masa perpanjangan terpantau.
- [ ] Hanya admin yang memerlukan akses yang masih aktif.

## Sumber

- [ICANN: Transfer Policy](https://www.icann.org/resources/pages/transfer-policy-2016-06-01-en)
- [ICANN: DNSSEC](https://www.icann.org/resources/pages/dnssec-qaa-2017-11-07-en)
- [CISA: Securing Network Infrastructure Devices](https://www.cisa.gov/resources-tools/resources/securing-network-infrastructure-devices)

> Catatan: Untuk domain bernilai tinggi, minta registrar menjelaskan prosedur emergency lock sebelum insiden terjadi.


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
