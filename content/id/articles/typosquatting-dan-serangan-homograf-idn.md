---
translationKey: "typosquatting-homograph"
title: "Typosquatting dan Serangan Homograf IDN"
date: 2026-07-11
draft: false
categories:
 - Keamanan Siber
tags:
 - keamanan siber
 - phishing
 - keamanan jaringan
summary: "Pahami bagaimana penyerang memanfaatkan domain typosquatting dan karakter homograf Unicode untuk memalsukan situs web resmi, dan pelajari cara mengidentifikasi penipuan Punycode."
cover: "/images/articles/typosquatting-homograph.webp"
---

Ketika Anda membuka browser web untuk mengakses email, akun sosial, atau portal keuangan, Anda mempercayai nama domain yang ditampilkan di bilah alamat. Jika Anda melihat `paypal.com` atau `bankofamerica.com`, Anda menganggap Anda sedang berkomunikasi dengan penyedia layanan yang sah.

Penyerang mengeksploitasi kepercayaan kognitif alami ini melalui dua teknik pemalsuan domain yang canggih: **Typosquatting** dan **International Domain Name (IDN) Homograph Attacks**.

Metode ini melibatkan pendaftaran nama domain yang terlihat identik atau sangat mirip dengan merek sah. Jika Anda mengetik alamat web dengan sedikit kesalahan ejaan, atau mengeklik tautan yang berisi huruf non-Latin yang secara visual tidak dapat dibedakan, Anda memasuki portal phishing tiruan yang dirancang untuk mencuri kredensial Anda, menangkap sesi Anda, dan menginfeksi mesin Anda dengan malware.

Panduan ini merinci pelaksanaan teknis eksploitasi typosquatting dan homograf. Ini menjelaskan mekanisme penerjemahan Punycode, merinci risiko rendering tingkat browser, dan memberikan pedoman defensif yang dapat ditindaklanjuti untuk mengidentifikasi dan memblokir penipuan tingkat domain.

---

## Matematika Jarak Damerau-Levenshtein dalam Pembuatan Tipografi

Untuk memahami bagaimana penyerang secara sistematis menghasilkan domain typosquatting, mari kita periksa konsep matematika dari **Jarak Damerau-Levenshtein**. Algoritma ini mengukur jarak edit antara dua string karakter.

### 1. Logika Matematika
Jarak Damerau-Levenshtein antara string $a$ dan string $b$ adalah jumlah minimum operasi yang diperlukan untuk mengubah satu string menjadi string lainnya. Operasi ini terbatas pada:
- **Penyisipan (Insertion):** Menambahkan satu karakter (misalnya, `chase.com` menjadi `chases.com`).
- **Penghapusan (Deletion):** Menghapus satu karakter (misalnya, `google.com` menjadi `gogle.com`).
- **Substitusi:** Mengganti satu karakter dengan karakter lain (misalnya, `apple.com` menjadi `app1e.com`).
- **Transposisi:** Menukar dua karakter yang berdekatan (misalnya, `netflix.com` berubah menjadi `netflxi.com`).

### 2. Pembuatan Sistematis
Penyerang menggunakan skrip otomatis (seperti DNSTwist) yang menghitung semua kemungkinan mutasi dalam jarak edit $d=1$ atau $d=2$ untuk merek target. Skrip ini menanyakan basis data pendaftaran domain untuk memeriksa apakah domain bermutasi ini tersedia untuk didaftarkan. Dengan secara sistematis membeli domain dengan jarak edit terendah, penyerang menjamin mereka menangkap persentase tertinggi dari kesalahan pengetikan manusia yang alami.

---

## Studi Kasus Sejarah: Salah Arah Phishing Equifax (2017)

Contoh nyata yang menonjol dari typosquatting terjadi selama respons terhadap pelanggaran data besar-besaran Equifax pada tahun 2017.

Untuk membantu konsumen memeriksa apakah data mereka terekspos, Equifax menyiapkan portal resmi terpisah bernama:
`equifaxsecurity2017.com`

Struktur domain ini merupakan kesalahan keamanan yang besar. Ia melatih konsumen untuk memasukkan data pribadi dan nomor jaminan sosial mereka pada nama domain tidak dikenal yang tidak menggunakan awalan resmi `equifax.com`.

Seorang peneliti keamanan independen dengan cepat menyadari bahaya tersebut dan mendaftarkan domain typosquatting:
`equihax2017.com`

Peneliti menyiapkan tiruan visual yang sempurna dari situs pelanggaran resmi Equifax.
- **Hasil Terduga:** Alih-alih mencuri kredensial, situs tiruan menampilkan peringatan: *\"Sistem keamanan Anda lemah. Ini adalah tes edukasi.\"*
- **Kegagalan Sistem:** Karena domainnya sangat mirip, bahkan perwakilan layanan pelanggan resmi Equifax secara tidak sengaja memposting tautan ke alamat typosquatting `equihax2017.com` di akun Twitter resmi mereka yang terverifikasi beberapa kali, mengarahkan ribuan konsumen yang cemas ke situs peringatan peneliti alih-alih portal resmi.

Insiden ini membuktikan bahwa staf profesional yang sangat terlatih pun tidak dapat membedakan domain typosquatting dengan andal ketika merek mengabaikan konvensi penamaan keamanan URL standar.

---

## Analisis Teknis Typosquatting

Typosquatting (juga disebut pembajakan URL) bergantung pada kesalahan mekanis manusia selama pengetikan keyboard.

Ketika Anda mengetik dengan cepat di keyboard, jari-jari Anda melakukan kesalahan yang dapat diprediksi. Penyerang mendaftarkan ribuan variasi ejaan salah dari nama domain populer untuk menangkap lalu lintas yang tidak disengaja ini.

### Jenis Mutasi Typosquatting

Penyerang menganalisis domain target dan mendaftarkan mutasi di beberapa kategori:

| Jenis Mutasi | Logika Mekanis | Contoh Sah | Contoh Typosquatted |
| :--- | :--- | :--- | :--- |
| **Penghapusan Karakter** | Melewati huruf saat mengetik cepat. | `google.com` | `gogle.com` |
| **Kesalahan Jari (Fat-Finger)** | Mengetik tombol yang berdekatan dengan huruf tujuan. | `netflix.com` | `netfljx.com` (U berada di samping J / I dekat J) |
| **Transposisi** | Menukar urutan dua huruf yang berdekatan. | `wikipedia.org` | `wiikpedia.org` / `wikpeida.org` |
| **Substitusi Fonetik** | Mengganti huruf dengan suara serupa. | `chase.com` | `chace.com` |
| **TLD Alternatif** | Mendaftarkan domain yang sama di bawah ekstensi asing. | `microsoft.com` | `microsoft.co` / `microsoft.cm` |
| **Combosquatting** | Menambahkan kata bantu seperti \"keamanan\" atau \"login\". | `paypal.com` | `paypal-login-portal.com` |

Ketika Anda mendarat di domain typosquatted, penyerang tidak menampilkan halaman kesalahan. Mereka menyajikan tiruan visual yang sempurna dari layar masuk situs web target. Anda memasukkan kata sandi, sistem mencatat kredensial, dan penyerang mengarahkan Anda ke situs web asli untuk menyembunyikan intrusi.

---

## Analisis Teknis Serangan Homograf IDN

Meskipun typosquatting bergantung pada kesalahan mekanis pengguna, International Domain Name (IDN) Homograph Attack bergantung pada penipuan visual. Serangan ini mengeksploitasi sistem yang menampilkan karakter non-Inggris di alamat web.

### Asal-usul International Domain Names (IDN)
Secara historis, Domain Name System (DNS) hanya mendukung karakter ASCII (alfabet bahasa Inggris standar, angka, dan tanda hubung).

Untuk membuat internet dapat diakses secara global, Internet Engineering Task Force (IETF) memperkenalkan International Domain Names pada tahun 2003. Standar ini memungkinkan orang untuk mendaftarkan nama domain dalam aksara non-Latin, termasuk Sirilik, Yunani, Ibrani, Arab, dan Mandarin.

### Kerentanan Homograf
Banyak karakter dalam aksara Sirilik, Yunani, dan Latin terlihat identik pada layar komputer resolusi tinggi. Karakter yang secara visual identik ini disebut **homoglif** (homoglyph).

Sebagai contoh:
- Huruf kecil Latin standar **`а`** (nilai ASCII `97`).
- Huruf kecil Sirilik **`а`** (nilai Unicode `U+0430`).

Bagi mata Anda, kedua karakter ini terlihat identik. Namun, bagi komputer dan DNS, mereka adalah karakter yang sama sekali berbeda dengan representasi matematis yang berbeda.

Penyerang dapat mendaftarkan nama domain `аpple.com` di mana huruf `а` adalah Sirilik, dan huruf-huruf lainnya `pple.com` adalah Latin. Ini adalah nama domain yang sama sekali terpisah dari `apple.com` yang asli dan sepenuhnya Latin.

Jika Anda mengeklik tautan yang berisi variasi Sirilik, browser Anda menampilkan `apple.com` di bilah alamat. Tampilan visualnya identik, tetapi Anda terhubung ke server penyerang.

---

## Punycode: Bagaimana Komputer Menangani Domain Unicode

Untuk memungkinkan infrastruktur DNS lama yang hanya mendukung ASCII menyelesaikan nama domain Unicode tanpa kesalahan, pengembang menciptakan sistem penerjemahan yang disebut **Punycode**.

Punycode menerjemahkan string Unicode ke dalam format ASCII-Compatible Encoding (ACE). Semua domain Punycode dimulai dengan awalan unik **`xn--`**.

```
[Domain Sirilik: аpple.com] ──(Terjemahan Punycode)──> [Domain ASCII: xn--pple-43d.com]
```

### Proses Penerjemahan
Ketika penyerang mendaftarkan domain homograf `аpple.com` (menggunakan Sirilik `а`):
1. Basis data pendaftaran mendaftarkan domain sebagai **`xn--pple-43d.com`**.
2. Ketika Anda mengeklik tautan, browser Anda menerjemahkan string ASCII `xn--pple-43d.com` dan menampilkan string Unicode yang dirender `apple.com` di bilah alamat.
3. Jika browser Anda gagal menerapkan pertahanan homograf, Anda melihat `apple.com` di layar Anda, sementara permintaan jaringan di bawahnya dialihkan langsung ke alamat IP yang terkait dengan server `xn--pple-43d.com`.

---

## Pertahanan Rendering Tingkat Browser

Browser web modern telah menerapkan pertahanan untuk mencegah serangan homograf dirender sebagai teks Latin biasa di bilah alamat.

### Mesin Deteksi Campuran Aksara (Mixed-Script Detection)
Browser menggunakan algoritma deteksi aksara campuran. Jika nama domain mencampur karakter dari aksara yang berbeda dalam satu label (misalnya, menggabungkan huruf Latin dengan karakter Sirilik tunggal seperti `аpple.com`), browser mengenali potensi penipuan tersebut.
- Browser menolak merender karakter Unicode.
- Browser menampilkan string Punycode mentah yang diterjemahkan langsung di bilah alamat (misalnya, `xn--pple-43d.com`).
- Ini segera mengungkapkan penipuan kepada pengguna, karena tidak ada perusahaan sah yang mengoperasikan situs web yang dimulai dengan `xn--`.

### Tantangan Spoofing Aksara Utuh (Whole-Script Spoofing)
Namun, jika penyerang mendaftarkan nama domain menggunakan karakter secara eksklusif dari satu aksara non-Latin yang cocok dengan merek Latin (misalnya, mendaftarkan seluruh kata `pаypаl` menggunakan karakter Sirilik di mana setiap karakter memiliki rekan homoglif), beberapa browser mungkin masih merender aksara Unicode jika pengaturan sistem operasi lokal atau wilayah pengguna menggunakan bahasa tersebut. Variasi ini membuat verifikasi pengguna independen menjadi sangat penting.

---

## Panduan Pengerasan: Cara Melindungi Jaringan Anda

Terapkan protokol keamanan ini untuk melindungi lingkungan rumah dan bisnis Anda dari penipuan tingkat domain.

### Tindakan 1: Manfaatkan Kekuatan Pengelola Kata Sandi (Password Manager)
Pengelola kata sandi Anda adalah pertahanan paling efektif terhadap serangan typosquatting dan homograf.

- **Cara kerjanya:** Pengelola kata sandi tidak menganalisis tampilan visual situs web. Ia mencocokkan kredensial Anda yang tersimpan dengan nama domain ASCII terdaftar yang tepat yang disimpan dalam basis datanya.
- **Pemblokiran Pengisian Otomatis (Autofill):** Jika Anda mendarat di domain typosquatted (seperti `netfljx.com`) atau domain homograf IDN (yang diselesaikan secara internal sebagai `xn--pple-43d.com`), fitur pengisian otomatis pengelola kata sandi Anda akan tetap **dinonaktifkan**. Ia akan menolak untuk menyarankan nama pengguna atau kata sandi Anda karena domain aktif tidak cocok dengan catatan ASCII yang sah (seperti `netflix.com` atau `apple.com`).
- **Aturan Pertahanan:** Jika pengelola kata sandi Anda menolak untuk mengisi otomatis kredensial Anda di halaman login, perlakukan situs web tersebut sebagai situs web penipuan. Jangan mengetik kata sandi Anda secara manual. Segera tutup tab tersebut.

### Tindakan 2: Konfigurasikan Pengaturan Punycode Browser Tingkat Lanjut
Anda dapat memaksa browser web Anda untuk selalu menampilkan Punycode mentah di bilah alamat, sepenuhnya menghilangkan penipuan homograf visual.

#### Untuk Mozilla Firefox
1. Buka tab baru Firefox.
2. Ketik **`about:config`** di bilah alamat dan tekan `Enter`.
3. Terima perintah peringatan untuk mengakses panel pengaturan lanjutan.
4. Di kotak pencarian, ketik **`network.IDN_show_punycode`**.
5. Temukan pengaturan tersebut. Secara default, ia diatur ke `false`.
6. Klik tombol sakelar untuk mengubah nilai menjadi **`true`**.

Setelah diaktifkan, Firefox akan melewati rendering Unicode secara keseluruhan untuk semua nama domain internasional, menampilkan string ASCII mentah yang dimulai dengan `xn--` di bilah alamat, memperlihatkan domain homograf secara instan.

### Tindakan 3: Gunakan Pemecah DNS (DNS Resolver) Aman dengan Filter Phishing
Konfigurasikan sistem operasi router atau perangkat Anda untuk menggunakan pemecah Domain Name System (DNS) aman yang memblokir domain typosquatting, phishing, dan berbahaya yang diketahui sebelum dimuat.

Atur pengaturan DNS utama dan sekunder Anda ke penyedia publik terverifikasi berikut:

| Penyedia DNS | IPv4 Utama | IPv4 Sekunder | Perlindungan Pemfilteran |
| :--- | :--- | :--- | :--- |
| **Cloudflare Security** | `1.1.1.2` | `1.0.0.2` | Memblokir domain malware dan phishing yang diketahui. |
| **Quad9 Security** | `9.9.9.9` | `149.112.112.112` | Menyaring host berbahaya menggunakan intelijen ancaman global. |
| **AdGuard Home** | `94.140.14.14` | `94.140.15.15` | Memblokir pelacak, iklan, dan portal pengalihan berbahaya. |

### Tindakan 4: Terapkan Bookmark dan Jalur Pencarian yang Aman
Kurangi ketergantungan Anda pada mengetik URL yang rumit secara manual:

- **Buat Bookmark:** Buat folder bookmark \"Keuangan\" atau \"Akun Utama\" khusus di browser Anda. Simpan URL resmi yang terverifikasi untuk bank, portal email, dan layanan penting Anda. Selalu akses portal ini dengan mengeklik bookmark Anda yang tersimpan, melewati kesalahan pengetikan manual secara keseluruhan.
- **Hindari Klik Tautan Email:** Jika Anda menerima peringatan keamanan mendesak melalui email atau pesan teks SMS (misalnya, \"Akun Anda telah dikunci. Klik di sini untuk memverifikasi\"), jangan klik tautan yang disediakan. URL di bawahnya mungkin menggunakan homograf Sirilik atau typosquatting. Sebagai gantinya, buka browser Anda, gunakan bookmark Anda yang tersimpan, atau ketik domain utama yang terverifikasi secara langsung.

---

## Rencana Tindakan: Protokol Setelah Insiden untuk Kredensial yang Terkompromi

Jika Anda menyadari bahwa Anda memasukkan kata sandi pada domain typosquatted atau homograf, segera jalankan rencana penahanan ini:

### Langkah 1: Ubah Kata Sandi Segera
Buka tab browser baru yang aman. Buka langsung situs web resmi (menggunakan bookmark atau entri terverifikasi langsung) dan ubah kata sandi Anda. Gunakan kata sandi acak kuat yang dihasilkan oleh pengelola kata sandi Anda.

### Langkah 2: Cabut Sesi dan Token Aktif
Di pengaturan keamanan akun Anda:
- Temukan panel \"Tempat Anda masuk\" atau \"Sesi Aktif\".
- Pilih **Keluar dari semua sesi lain** untuk membatalkan cookie sesi apa pun yang dicuri oleh portal phishing penyerang.

### Langkah 3: Audit Kredensial Bersama
Jika Anda menggunakan kembali kata sandi yang dikompromikan itu pada akun lain (misalnya, menggunakan kata sandi yang sama untuk bank dan media sosial Anda), masuk ke akun sekunder tersebut dan segera ubah kredensialnya. Jangan pernah menggunakan kembali kata sandi di beberapa layanan.

### Langkah 4: Jalankan Pemindaian Malware Lokal
Beberapa domain typosquatting menyajikan \"drive-by downloads\" yang menginstal infostealer atau alat akses jarak jauh di mesin Anda. Jalankan pemindaian antivirus sistem lengkap untuk memastikan tidak ada file berbahaya yang dieksekusi di latar belakang.

---

## Audit Mandiri untuk Keamanan Tingkat Domain

Lakukan evaluasi ini dua kali setahun untuk memastikan pertahanan Anda tetap aktif:

- **Verifikasi perilaku Pengelola Kata Sandi:** Pastikan Anda menggunakan pengelola kata sandi tepercaya yang mencocokkan kredensial secara ketat berdasarkan nama domain ASCII.
- **Periksa konfigurasi DNS:** Jalankan tes DNS (seperti `dnsleaktest.com`) untuk memverifikasi sistem Anda menggunakan pemecah masalah pemfilteran yang aman seperti Cloudflare atau Quad9 alih-alih server ISP default yang tidak terlindungi.
- **Audit bookmark yang disimpan:** Tinjau bookmark browser Anda. Hapus tautan lama atau tidak aktif, pastikan hanya entri domain terenkripsi HTTPS yang terverifikasi yang tersisa.
- **Uji rendering browser:** Kunjungi halaman pengujian Punycode yang aman untuk memverifikasi browser Anda menampilkan awalan `xn--` untuk label aksara campuran alih-alih merender homograf yang menipu secara visual.

---

## Pertanyaan yang Sering Diajukan

### Mengapa HTTPS/SSL tidak melindungi dari typosquatting?
Sertifikat SSL (ikon gembok di bilah alamat Anda) hanya memverifikasi bahwa koneksi Anda ke nama domain yang ditampilkan dienkripsi. Ia tidak memverifikasi niat atau legitimasi pemilik domain. Penyerang dapat dengan mudah memperoleh sertifikat SSL gratis yang valid (dari layanan seperti Let's Encrypt) untuk domain typosquatted apa pun (seperti `netfljx.com`) atau domain homograf yang mereka daftarkan. Ikon gembok hanya berarti koneksi aman; ia tidak berarti situs web tersebut aman.

### Apakah mendaftarkan domain typosquatted ilegal?
Di banyak yurisdiksi, mendaftarkan domain typosquatted dengan niat jahat untuk mendapatkan keuntungan dari merek dagang adalah ilegal di bawah undang-undang seperti Anticybersquatting Consumer Protection Act (ACPA). Pemilik merek dagang dapat mengajukan sengketa melalui Uniform Domain-Name Dispute-Resolution Policy (UDRP) untuk menyita domain ini, tetapi prosesnya memakan waktu, dan penyerang terus-menerus mendaftarkan variasi baru lebih cepat daripada tindakan hukum yang dapat menutupnya.

### Apakah penyerang dapat melakukan serangan homograf pada alamat email?
Ya. Alamat email menggunakan infrastruktur DNS yang sama. Penyerang dapat mendaftarkan domain homograf seperti `аpple.com` dan mengirim email dari alamat seperti `support@аpple.com`. Bagi klien email dan mata Anda, alamat pengirim terlihat identik dengan saluran dukungan resmi, membuat email phishing sangat meyakinkan.

### Apakah Safari melindungi dari serangan homograf?
Ya. Browser web Safari dan iOS Apple menggunakan aturan rendering yang ketat. Jika domain berisi karakter dari aksara yang tidak cocok dengan pengaturan bahasa pilihan pengguna, atau jika ia mencampur aksara, Safari menampilkan alamat Punycode mentah `xn--` di bilah URL untuk mencegah penipuan.

### Apa itu combosquatting?
Combosquatting adalah variasi dari typosquatting di mana penyerang menggabungkan nama merek sah dengan kata kunci lain, seperti `security-paypal.com`, `chase-update-verification.com`, atau `netflix-billing-alert.com`. Karena domain ini berisi ejaan merek yang benar, mereka dapat melewati pemeriksaan ejaan sederhana, tetapi mereka adalah domain berbahaya yang sepenuhnya terpisah.

---

## Sumber dan Referensi

- [CISA: Identifying and Mitigating Phishing and Domain Spoofing](https://www.cisa.gov/news-events/news/avoiding-social-engineering-and-phishing-attacks)
- [NIST: Security Guidance on DNS Infrastructure and Domain Integrity](https://csrc.nist.gov/publications/detail/sp/800-81/rev-2/final)
- [Unicode Consortium: Technical Report #39 - Unicode Security Mechanisms](https://www.unicode.org/reports/tr39/)

> **Catatan Editorial:** Artikel ini berfungsi untuk tujuan edukasi. Browser, algoritma, dan kebijakan pendaftaran domain sering dimodifikasi untuk memerangi pemalsuan. Rujuk ke dokumentasi resmi produsen perangkat lunak Anda untuk memverifikasi pengaturan keamanan terbaru. Jaga agar browser web Anda tetap diperbarui untuk mempertahankan standar deteksi aksara campuran tetap aktif.
