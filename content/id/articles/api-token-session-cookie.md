---
translationKey: "api-token-session-cookie"
title: "API Token dan Session Cookie: Mencegah Pengambilalihan Sesi"
date: 2026-08-05
draft: false
categories:
 - Keamanan Siber
tags:
 - API token
 - session cookie
 - OAuth
 - web security
summary: "Cara mengurangi risiko token API, refresh token, dan cookie sesi dicuri dari browser, log, source code, atau malware."
cover: "/images/articles/api-token-session-cookie.webp"
---

API key, access token, refresh token, dan session cookie memberi aplikasi cara mengenali permintaan. Jika penyerang mencuri salah satunya, ia mungkin tidak perlu mengetahui password. Dampaknya bergantung pada scope, masa berlaku, dan kemampuan revokasi token.

## Bedakan jenis kredensial

API key biasanya mengidentifikasi aplikasi atau integrasi. Access token memberi akses terbatas dan berumur pendek. Refresh token meminta access token baru. Session cookie mengikat browser dengan sesi server. Perlakukan semuanya sebagai secret, termasuk token yang tampak acak.

## Tempat token sering bocor

Cari token di source code, repository, file `.env`, log, URL, screenshot, tiket support, local storage, browser extension, dan backup. Jangan menaruh access token di URL karena URL dapat masuk ke history, proxy, analytics, dan header Referer.

## Kontrol untuk developer

Gunakan scope minimum, expiration pendek, rotasi, dan revokasi. Simpan secret server-side atau pada secret manager. Untuk cookie, gunakan `Secure`, `HttpOnly`, dan `SameSite` sesuai alur aplikasi. Lindungi perubahan email, MFA, dan pembayaran dengan reauthentication atau step-up authentication.

OAuth tidak otomatis aman. Validasi redirect URI secara ketat, gunakan PKCE untuk public client, validasi issuer dan audience, serta jangan menerima token yang diterbitkan untuk layanan lain. Jangan mencatat token mentah di log.

## Jika token dicurigai dicuri

1. Catat token, akun, scope, waktu, dan sumber dugaan tanpa menyebarkan nilainya.
2. Cabut token atau seluruh sesi.
3. Rotasi secret aplikasi bila token berasal dari server atau repository.
4. Periksa log pemakaian, lokasi, endpoint, dan perubahan data.
5. Ganti password bila token berasal dari browser yang terinfeksi.
6. Bersihkan repository dan history, lalu tambahkan secret scanning.

Logout lokal hanya menghapus cookie di perangkat. Ia belum tentu mencabut refresh token atau sesi perangkat lain. Sediakan halaman untuk meninjau dan mengeluarkan semua sesi aktif.

## Checklist audit

- [ ] Token memiliki scope minimum dan expiry.
- [ ] Refresh token dapat dicabut.
- [ ] Cookie memakai flag yang tepat.
- [ ] Token tidak muncul di URL, log, atau source code.
- [ ] OAuth memakai PKCE dan redirect URI yang ketat.
- [ ] Pengguna dapat mengeluarkan semua sesi.

## Sumber

- [OWASP: Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
- [OWASP: OAuth 2.0 Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/OAuth2_Cheat_Sheet.html)
- [RFC 9449: DPoP](https://www.rfc-editor.org/rfc/rfc9449)

> Catatan: Jangan menempelkan token asli ke issue tracker, chat, atau alat AI untuk dianalisis.


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
