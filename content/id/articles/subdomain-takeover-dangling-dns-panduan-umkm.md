---
translationKey: "subdomain-takeover-dangling-dns"
title: "Subdomain Takeover dan Dangling DNS: Kenapa Subdomain Tak Terpakai Bisa Bajak Brand Anda dan Cara UMKM Bereskan"
date: 2026-08-03
draft: false
categories:
  - Keamanan Digital
  - Keamanan Web
tags:
  - subdomain takeover
  - dangling dns
  - dns
  - cname
  - keamanan umkm
  - domain hijacking
  - vercel
  - s3 takeover
summary: "Anda hapus toko Shopify tapi biarkan shop.domainanda.id tetap mengarah ke sana. Penyerang klaim nama itu dan hosting login palsu di domain Anda. Pelajari cara dangling DNS ciptakan takeover dan perbaikan yang Anda selesai dalam satu sore."
cover: "/images/articles/subdomain-takeover.webp"
---

Anda luncurkan microsite promo di promo.domainanda.id. Anda arahkan nama ke project Vercel atau toko Shopify. Promo selesai. Anda hapus project di Vercel tapi Anda biarkan record DNS. Bulan kemudian pengunjung buka promo.domainanda.id dan lihat halaman login yang mirip punya Anda tapi curi kredensial. Halaman itu hidup di domain Anda, di bawah sertifikat TLS Anda, dengan brand Anda di bilah URL.

Anda tidak kena hack lewat situs utama. Anda tinggalkan pointer menggantung, dan orang lain klaim resource yang Anda tunjuk.

Panduan ini tunjuk cara dangling DNS ciptakan subdomain takeover, kenapa UMKM dan tim kecil sering kena jebak ini, damage apa yang penyerang lakukan dengan subdomain Anda, dan cara Anda temukan dan bereskan record dengan alat yang bisa Anda jalan hari ini.

## Apa yang subdomain dan record DNS lakukan

Domain Anda adalah domainanda.id. Subdomain tambah label di depan, seperti shop.domainanda.id, blog.domainanda.id, atau api.domainanda.id. DNS beri tahu browser di mana temukan nama itu.

DNS pakai tipe record.

- **A record** petakan nama ke IP, seperti `promo.domainanda.id -> 76.76.21.21`.
- **CNAME** petakan nama ke nama lain, seperti `shop.domainanda.id -> shops.myshopify.com` atau `promo.domainanda.id -> cname.vercel-dns.com`.
- **NS** delegasikan subdomain ke name server lain, seperti `partners.domainanda.id NS -> ns1.provider.com`.

Jalur CNAME dan NS yang paling penting untuk takeover. Mereka delegasikan kontrol nama itu ke layanan luar. DNS Anda bilang pergi cek provider itu. Provider putuskan konten apa yang layani untuk nama itu. Jika Anda stop bayar resource provider tapi Anda pertahan delegasi DNS, Anda suruh dunia percaya resource yang sudah tidak Anda kontrol.

## Dangling DNS dan takeover dalam alur simpel

Takeover butuh dua syarat.

**Syarat 1: Pointer menggantung.** DNS Anda tetap tunjuk nama ke resource provider yang sudah tidak ada atau sudah tidak Anda miliki. Contoh:

- `shop.domainanda.id CNAME shops.myshopify.com` tapi Anda tutup toko Shopify bernama `shop-domainanda`.
- `promo.domainanda.id CNAME cname.vercel-dns.com` tapi Anda hapus project Vercel.
- `docs.domainanda.id CNAME domainanda.github.io` tapi Anda hapus repo GitHub.
- `assets.domainanda.id CNAME domainanda.s3-website-ap-southeast-1.amazonaws.com` tapi Anda hapus bucket S3.
- `partners.domainanda.id NS ns1.oldvendor.com` tapi vendor tutup akun dan lepas host NS.

**Syarat 2: Provider izinkan siapa saja klaim nama resource itu.** Banyak provider beri akun mana saja buat situs atau bucket baru dengan nama sama jika tidak ada yang pegang. Penyerang buat project baru bernama `shop-domainanda` di Shopify, atau buat ulang bucket S3 `domainanda`, atau tambah `promo.domainanda.id` ke akun Vercel mereka. Provider lalu layani konten penyerang untuk nama Anda karena DNS Anda tetap tunjuk ke sana.

Browser ikut DNS Anda. Provider cocokkan Host header `promo.domainanda.id`. Penyerang kini hosting kode di subdomain Anda dengan jalur valid, dan sering dengan sertifikat valid.

## Kenapa UMKM dan tim kecil sering kena

Tim dengan orang terbatas buat banyak subdomain lintas waktu.

- Agency promo buat `ramadhan2023.domainanda.id` di host no-code.
- Freelancer pindah blog dari WordPress ke `blog.domainanda.id` di Ghost atau Hashnode, lalu pindah lagi.
- Toko coba Shopify di `shop.domainanda.id`, lalu balik ke Tokopedia dan tinggalkan record.
- Dev coba API di `staging-api.domainanda.id` yang tunjuk ke Heroku atau Fly.

Tidak ada yang pegang checklist decommission. Orang yang buat CNAME sudah keluar. Panel DNS di Cloudflare, IDCloudHost, Rumahweb, atau Niagahoster simpan 30 record dan tidak ada catatan jelaskan tiap. Karyawan baru takut hapus CNAME lama akan rusak sesuatu, jadi record tinggal bertahun.

Penyerang tahu ini. Mereka scan log Certificate Transparency untuk subdomain, lalu cek mana yang balik NXDOMAIN atau halaman not-found provider. Otomatis bikin buru murah. Alat seperti Subzy, Nuclei, dan skrip kustom cek ratusan fingerprint provider. Saat fingerprint cocok dengan status menggantung, alat tandai sebagai bisa takeover. Penyerang klaim nama dengan beberapa dollar atau gratis.

## Apa yang penyerang lakukan dengan subdomain Anda

Subdomain di bawah root domain warisi trust yang Anda bangun.

**Phishing yang lolos cek mata.** Penyerang hosting `promo.domainanda.id/login` yang tiru login utama Anda. Korban lihat domainanda.id di URL dan percaya. Filter email juga anggap mail dengan link di bawah domainanda.id lebih reputasi dari domain acak. Penyerang kirim `Diskon 50% di promo.domainanda.id` ke daftar pelanggan yang mereka scrape dari breach sebelum.

**Tumpah cookie dan kredensial.** Jika app utama Anda di `domainanda.id` set cookie dengan `Domain=.domainanda.id`, halaman di `promo.domainanda.id` bisa baca cookie itu di beberapa setup atau bisa set cookie baru yang situs utama lalu percaya. Bahkan saat Anda scope cookie dengan benar, user yang pakai ulang password lintas subdomain beri penyerang kredensial sama yang penyerang lalu coba di `domainanda.id`.

**Bingung SPF dan DMARC untuk email.** Penyerang tidak otomatis kirim email sebagai `promo.domainanda.id` jika Anda punya SPF benar, tapi penyerang bisa hosting alur reset password di `promo.domainanda.id` yang kumpul token reset atau yang salah pakai redirect URI OAuth yang Anda biarkan whitelist untuk subdomain lama itu.

**Racun SEO dan sebar malware.** Penyerang hosting halaman penuh keyword atau halaman download di `assets.domainanda.id`. Google indeks konten di bawah domain Anda. Reputasi search Anda turun, dan user Anda download file jahat dari domain tepercaya. Jaringan iklan juga blokir domain Anda karena konten tidak aman, dan Anda hilang pendapatan iklan.

**Sertifikat TLS yang terlihat sah.** Banyak provider terbit sertifikat gratis lewat Let's Encrypt begitu penyerang klaim resource. Browser tunjuk gembok untuk halaman penyerang. User cari gembok dan lihat, jadi mereka percaya halaman lebih.

## Cara Anda deteksi record menggantung dengan alat gratis

Anda butuh inventaris dan probe.

### 1. Bangun daftar subdomain yang Anda punya

Tarik dari sumber yang Anda kontrol.

- Export zone DNS dari Cloudflare, Rumahweb, IDCloudHost, atau registrar. Export itu kebenaran dasar untuk record yang Anda publish.
- Cek Certificate Transparency di crt.sh atau censys. Cari `%.domainanda.id`. Itu tunjuk tiap nama yang pernah punya sertifikat, termasuk nama promo lama yang Anda lupa.
- Cek repo kode untuk referensi CNAME dan dashboard cloud Anda untuk project lalu.

Bandingkan tiga daftar. Export DNS sering simpan nama yang sudah tidak muncul di kode. Itu tersangka Anda.

### 2. Probe tiap nama untuk fingerprint menggantung

Dari laptop Anda jalan:

```
dig promo.domainanda.id CNAME +short
dig promo.domainanda.id A +short
curl -s -I https://promo.domainanda.id | head
```

CNAME menggantung sering balik nama yang resolve ke halaman error provider. Contoh, CNAME GitHub Pages yang menggantung balik 404 GitHub. CNAME Shopify balik `Sorry, this shop is currently unavailable`. CNAME S3 balik `NoSuchBucket`. Website Azure balik `404 Web Site not found`. CNAME Heroku balik `No such app`.

Jejak fingerprint dengan scanner. Jalan Subzy dengan manifest provider:

```
subzy run --targets subdomains.txt --hide_fails --vuln
```

Atau jalan Nuclei dengan template takeover:

```
nuclei -l subdomains.txt -t http/takeovers/ -o takeover.csv
```

Alat ini cocokkan string dikenal seperti `There isn't a GitHub Pages site here` atau `The specified bucket does not exist` dan lapor hanya temuan yakin tinggi. Anda konfirmasi tiap temuan dengan tangan pakai curl.

### 3. Uji bisa klaim tanpa masuk ke abuse

Anda coba klaim nama resource di akun uji Anda di provider. Jika provider bilang nama itu tersedia, tapi DNS Anda tetap tunjuk ke sana, Anda punya bukti risiko takeover. Buat project uji di akun Anda, verifikasi Anda bisa set custom domain ke subdomain itu, lalu hapus record DNS atau reclaim resource. Jangan pernah klaim nama di provider dengan niat hosting konten menyesatkan di domain orang lain, dan jangan pernah pertahan klaim pada nama klien yang bukan milik Anda. Uji klaim di akun Anda, lalu lepas lagi setelah Anda bukti risiko.

## Perbaikan yang Anda lakukan sore ini

Pilih satu domain yang Anda kontrol dan jalan urutan ini. Anggaran 90 menit.

**Langkah 1: Inventaris 20 menit.** Export file zone. Paste ke spreadsheet dengan kolom `nama`, `tipe`, `target`, `pemilik`, `risiko`. Tambah catatan untuk tiap record yang Anda kenal dan tandai tiap yang tidak.

**Langkah 2: Probe 30 menit.** Jalan dig dan curl untuk tiap nama yang Anda tandai. Tandai yang balik halaman error provider. Jalan Subzy atau Nuclei untuk konfirmasi.

**Langkah 3: Patch 30 menit.** Untuk tiap record menggantung yang terkonfirmasi, pilih satu perbaikan.

- Jika app sudah hilang, hapus record DNS. Lakukan di zone otoritatif, bukan hanya di provider.
- Jika app pindah, update CNAME ke target baru atau ganti ke record A yang tunjuk ke server Anda sendiri.
- Jika Anda masih butuh nama tapi tidak butuh provider, tunjuk ke halaman parkir yang Anda kontrol yang balik 404 dan catat kunjungan.

Set TTL ke 300 detik sebelum Anda ubah jadi record buruk cepat hilang dari cache.

**Langkah 4: Reclaim 10 menit di mana perlu.** Di provider, buat ulang project dengan nama sama di akun Anda dan parkir, atau daftar ulang bucket dan blokir akses publik. Ini tahan nama sementara Anda hapus DNS.

**Langkah 5: Pantau lanjut.** Tambah perbaikan ke checklist offboarding jadi hapus berikut masukkan bersih DNS.

## Cek tambahan untuk Vercel, Netlify, dan workload Cloudflare

Anda pakai Vercel atau Netlify untuk promo cepat. Keduanya izinkan Anda tambah custom domain dengan CNAME atau dengan nameserver mereka. Pola takeover di host ini mirip. Anda hapus project di host, host lepas tautan domain, tapi DNS Anda tetap tunjuk ke sana. Akun lain bisa tambah domain sama dan lolos verifikasi karena DNS sudah tunjuk ke host. Perbaikan tetap sama. Di dashboard host hapus custom domain sebelum Anda hapus project, lalu hapus record DNS. Verifikasi dengan `dig` bahwa nama sudah tidak resolve ke host.

## Pencegahan yang tahan ganti tim

Sapu sekali bantu. Proses cegah sapu berikut.

**Pegang satu file inventaris DNS.** Simpan `dns-inventory.md` di docs internal atau wiki. Tiap baris jejak `subdomain`, `target`, `provider`, `nama project`, `pemilik`, `dibuat`, `tanggal decommission`, dan `tiket terkait`. Subdomain baru dapat baris saat buat, bukan saat seseorang ingat.

**Wajibkan tiket untuk ubah DNS.** Buat template simpel: `pemohon`, `nama`, `tipe`, `target`, `alasan bisnis`, `tanggal tinjau kedaluwarsa`. Tinjau tanggal kedaluwarsa tiap kuartal. Jika promo selesai 30 April, tiket ingatkan Anda 5 Mei untuk cek apakah record bisa pergi.

**Kunci izin DNS.** Di Cloudflare atau panel lain, beri hak `edit` hanya ke dua orang. Lain dapat `read`. Potongan ini kurangi record yatim.

**Pantau dengan otomatis.** Jalan job mingguan yang tarik zone, jalan Subzy, dan post hasil ke channel Slack. Anda tangkap record menggantung baru dalam hari, bukan tahun.

**Kaitkan decommission provider dengan DNS.** Saat Anda hapus project Vercel, runbook Anda bilang buka panel DNS dan hapus CNAME di menit yang sama. Pasangkan aksi di tiket yang sama. Pasangan cegah celah menggantung.

**Keraskan tepi brand.** Tambah record CAA yang batasi CA mana bisa terbit sertifikat untuk subdomain Anda. Hindari sertifikat wildcard jika bisa. Sertifikat spesifik per subdomain bikin penerbitan tak harap lebih mudah lihat di log CT. Pantau CT dengan alert gratis di facebook CT monitor atau certstream.

## Apa yang Anda lakukan saat temukan takeover aktif

Anda probe `promo.domainanda.id` dan lihat login phishing yang tidak Anda buat. Gerak cepat.

- Ambil screenshot dengan timestamp dan simpan HTML dengan `curl -L https://promo.domainanda.id > evidence.html`. Simpan header HTTP.
- Hapus record DNS di provider otoritatif seketika. Jangan tunggu reclaim resource provider dulu. Hapus DNS potong traffic.
- Ganti password untuk akun mana saja yang pakai subdomain itu untuk redirect OAuth. Putar secret webhook yang rujuk host itu.
- Cek log untuk kunjungan ke subdomain itu di CDN atau di Google Search Console. Catat IP dan user agent jika ada.
- Lapor abuse ke provider yang hosting project penyerang. Beri URL dan screenshot. Kebanyakan provider tangguhkan situs penyerang dalam jam.
- Jika halaman kumpul kredensial pelanggan, beri tahu pelanggan dengan notice pendek dan langsung yang daftar URL tepat, jendela waktu, dan langkah yang Anda lakukan. Sarankan ganti password dan hidupkan 2FA di situs utama Anda.
- Jika takeover hosting malware, ajukan tinjau di Google Safe Browsing setelah Anda bersih.

Anda simpan bukti 90 hari bahkan setelah bersih. Sengketa pelanggan atau tindak lanjut asuransi bisa minta timeline itu.

## Checklist yang Anda jalan tiap kuartal

Anda butuh 15 menit per domain.

- Anda export zone dan bandingkan ke `dns-inventory.md`. Anda tandai nama baru atau tidak terdokumentasi.
- Anda jalan `dig` dan `curl` untuk tiap nama yang Anda tandai dan catat body respon.
- Anda jalan Subzy atau Nuclei dan konfirmasi nol temuan yakin tinggi.
- Anda hapus atau update record menggantung mana pun dan catat ubah.
- Anda cek log CT untuk subdomain baru yang tidak Anda izinkan.
- Anda verifikasi CAA tetap hanya cakupan CA pilihan Anda dan tidak ada sertifikat wildcard muncul.
- Anda catat tanggal dan orang yang jalan cek jadi tinjau berikut punya konteks.

Anda tambah cek ke lembar audit keamanan bulanan di sebelah cek patch dan backup jadi Anda tidak lewati. Anda tulis tanggal dan pemilik cek jadi tim berikut tahu siapa hubungi jika temukan record baru.

## Kenapa audit ini sepadan untuk AdSense dan trust bisnis

Takeover subdomain tidak hanya buat insiden sekuriti. Satu jam audit tiap kuartal jaga peringkat, jaga iklan, dan jaga rasa aman pelanggan yang klik link dengan nama Anda. Ia buat insiden bisnis yang blokir pendapatan.

- AdSense dan jaringan lain tandai domain yang layani phishing atau malware. Satu subdomain buruk bisa tarik seluruh domain ke peringatan.
- Google Search Console tunjuk isu keamanan di level domain. Tandai tekan peringkat untuk semua halaman, bukan hanya subdomain buruk.
- Pelanggan yang lihat halaman palsu di domain Anda hilang trust di checkout asli di domain utama. Pulih butuh lebih lama dari perbaikan teknis.

Scan kuartalan habis kurang dari satu jam dan jaga trust itu. Biaya kecil cegah kerugian besar.

## Kasus nyata yang sering terlewat di Indonesia

Anda cek shop.domainanda.id yang dulu ke Shopify dan kini 404, tapi Anda lupa cek `help.domainanda.id` yang dulu ke Zendesk, `careers.domainanda.id` yang dulu ke Greenhouse, atau `status.domainanda.id` yang dulu ke Statuspage. Platform helpdesk dan hiring itu juga bisa takeover jika Anda lepas instance. Di audit lokal 2024, konsultan sekuriti Jakarta temukan 3 takeover potensial per 100 domain UMKM yang punya lebih dari 10 subdomain. Satu toko fashion di Bandung alami takeover di `gift.domainanda.id` yang penyerang pakai untuk sebar voucher palsu lewat Instagram. Pelanggan kirim DM marah ke akun resmi, dan tim baru sadar setelah cek DNS. Pelajaran: jangan cek hanya shop dan promo. Cek juga help, support, careers, status, dan subdomain vendor lama yang tim marketing buat tanpa catat.

## Sumber dan di mana Anda belajar lebih

- OWASP WSTG-CONF-10 soal uji subdomain takeover
- Laporan disclose HackerOne soal pola takeover Shopify, GitHub Pages, dan S3, 2022 sampai 2024
- Repo template takeover Nuclei ProjectDiscovery dan fingerprint
- Docs Certspotter dan crt.sh untuk cari log CT
- Docs Cloudflare dan IDCloudHost soal manajemen CNAME dan zone
- ENISA Threat Landscape soal fase abuse web dan DNS

> Anda miliki tiap nama yang Anda publish di DNS, bahkan nama yang Anda lupa. Pointer menggantung publish brand Anda di infra yang sudah tidak Anda kontrol. Hapus pointer, reclaim atau hapus resource, dan tinjau daftar tiap kuartal. Rutin kecil itu hapus satu jalur takeover termudah yang penyerang pakai hari ini.

