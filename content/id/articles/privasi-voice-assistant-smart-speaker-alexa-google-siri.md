---
translationKey: "voice-assistant-smart-speaker-privacy"
title: "Privasi Voice Assistant dan Smart Speaker: Apa yang Alexa, Google Assistant, dan Siri Rekam dan Cara Anda Batasi"
date: 2026-08-05
draft: false
categories:
  - Privasi
  - Keamanan Smart Home
tags:
  - voice assistant
  - smart speaker
  - alexa
  - google assistant
  - siri
  - privasi
  - smart home
  - perlindungan data
summary: "Smart speaker dengar kata bangun, tapi juga simpan apa yang ia dengar. Pelajari apa yang Alexa, Google Assistant, dan Siri simpan, di mana Anda temukan rekaman itu, dan cara Anda set batas yang pas untuk keluarga."
cover: "/images/articles/voice-assistant-privacy.webp"
---

Anda minta Google set timer untuk mie. Anda minta Alexa putar lagu anak. Anda minta Siri matikan lampu ruang tamu. Speaker jawab cepat. Mic tetap hidup dan tunggu kata bangun berikut.

Kenyamanan itu tukarkan sepotong privasi. Speaker butuh mic buka untuk dengar kata bangun. Speaker kirim audio ke cloud untuk paham minta Anda. Cloud simpan transkrip dan sering klip audio. Anda bisa pertahan kenyamanan dan pangkas jejak. Panduan ini tunjuk apa yang tiap assistant simpan, di mana Anda hapus, dan cara Anda set perangkat untuk rumah dengan orang tua, anak, dan tamu.

## Apa yang speaker lakukan langkah demi langkah

Smart speaker jalan model lokal kecil yang awasi kata bangun. Untuk Alexa model dengar Alexa, untuk Google dengar Hey Google, untuk Siri dengar Hey Siri atau Siri. Model lokal jalan di perangkat dan buang banyak audio yang tidak cocok dengan kata bangun.

Saat model kira ia dengar kata bangun, perangkat rekam buffer pendek, tambah beberapa detik setelah kata bangun, dan kirim klip itu ke cloud. Cloud jalan speech-to-text, cari maksud, dan kirim balik jawab. Cloud catat klip, transkrip, waktu, dan ID perangkat. App tunjuk entri itu di riwayat Anda.

Dua kasus tepi ubah jumlah data yang simpan.

**Bangun palsu.** Model lokal bisa salah kira baris TV atau frasa anak sebagai kata bangun. Perangkat lalu kirim audio yang seharusnya tidak. Anda lihat entri riwayat yang mirip chatter TV acak. Cloud simpan sampai Anda atau aturan hapus otomatis buang.

**Dengar lanjutan.** Beberapa perangkat buka mic 8 sampai 10 detik setelah jawab untuk tangkap lanjut. Selama jendela itu perangkat bisa tangkap tanya kedua tanpa kata bangun. Tanya kedua itu juga pergi ke cloud.

**Tinjau manusia, dulu dan kini.** Amazon dan Google dulu pakai peninjau manusia untuk cek sebagian kecil klip untuk perbaiki model. Di bawah kebijakan kini di 2026, keduanya beri Anda opt-out dari tinjau manusia, dan Apple pakai proses on-device untuk banyak minta Siri dengan differential privacy untuk sisa. Default tetap izinkan sampel kecil kecuali Anda ubah.

## Apa yang tiap ekosistem simpan dan di mana Anda temukan

Anda kontrol privasi di akun dan di perangkat. Paham jalur untuk tiap.

### Alexa (Amazon Echo, Echo Show)

Alexa simpan riwayat suara sebagai audio plus transkrip. Anda lihat dan hapus entri di alexa.amazon.com > Settings > Privacy > Review Voice History. Anda juga kelola di app Alexa > More > Settings > Alexa Privacy.

Alexa simpan:

- Klip audio untuk tiap minta, kecuali Anda matikan simpan.
- Transkrip kait ke akun Amazon Anda.
- Event perangkat seperti timer, perintah smart home, dan pakai skill.
- Data enroll profil suara jika Anda set Alexa Voice ID.

Amazon beri hapus otomatis setelah 3 bulan, 18 bulan, atau tidak pernah. Amazon juga beri opsi jangan simpan rekaman sama sekali, tapi itu matikan voice ID dan beberapa personalisasi.

### Google Assistant (Nest Mini, Nest Hub, ponsel Android)

Google simpan aktivitas Assistant di bawah Akun Google Anda. Buka myactivity.google.com > Aktivitas lain > Assistant atau Assistant > Settings > You > Assistant activity. Anda juga kelola di app Google Home > Settings > Privacy.

Google simpan:

- Klip audio jika Anda hidupkan Aktivitas Suara dan Audio.
- Transkrip untuk kebanyakan minta Assistant bahkan saat Anda matikan simpan audio.
- Konteks perangkat dan lokasi untuk perintah kontrol rumah.
- Model Voice Match jika Anda enroll Voice Match.

Google beri hapus otomatis untuk Web & App Activity dan untuk data Assistant, dengan pilihan 3 bulan, 18 bulan, 36 bulan.

### Siri (HomePod, HomePod mini, iPhone, iPad)

Apple simpan riwayat Siri beda. Di HomePod dengan iOS 17 dan lewat, banyak minta proses di perangkat saat kontrol aksesori rumah. Saat Siri butuh cloud, Apple kirim identifier acak, bukan Apple ID Anda. Retensi audio Siri pendek default, dan Apple tidak simpan riwayat audio yang bisa Anda telusuri dengan cara sama Amazon dan Google. Anda kelola di Setelan iPhone > Siri > Riwayat Siri & Dikte > Hapus. HomePod warisi setelan Siri dari iPhone pemilik.

Apple tidak minta opt-in untuk tinjau manusia klip Siri di bawah kebijakan terbaru; Apple minta opt-in eksplisit jika butuh sampel.

## Apa yang assistant pelajari soal rumah Anda di luar suara

Klip suara hanya satu tipe data. Platform speaker juga lihat:

- **Graf perangkat.** Speaker tahu lampu, colok, kamera, dan TV mana yang Anda hubung. Perintah seperti matikan lampu kamar tunjuk nama ruang Anda ke cloud.
- **Rutin dan jadwal.** Rutin seperti selamat malam jam 22:00 atau bangunkan anak jam 06:30 ungkap pola rumah.
- **Selera media.** Minta musik dan video bangun profil selera kait ke akun atau rumah.
- **Suara tamu.** Tamu yang bicara ke speaker buat entri kait ke akun utama, bahkan tamu tidak pernah lihat prompt privasi.
- **Konteks lokasi.** Tanya cuaca bawa kota atau jalan. Perintah navigasi pakai alamat.

Anda batasi jejak itu dengan kontrol yang duduk dekat data.

## Sepuluh langkah yang Anda lakukan untuk pertahan bantu dan potong simpan

Anda tidak perlu cabut speaker. Anda set perangkat untuk bantu di mana Anda mau dan lupa di mana Anda tidak.

### 1. Mulai dengan mute fisik untuk momen privat

Tiap speaker bawa tombol mute mic yang putus daya ke array mic. Tombol nyala merah. Pakai mute selama obrol privat, selama call PR dengan guru, selama tamu menginap. Anggap mute sebagai kunci pintu yang Anda pakai malam. Anda tekan satu tombol, Anda dapat hening penuh, tidak butuh setelan software.

### 2. Hidupkan hapus otomatis untuk riwayat suara di jendela terpendek

Di Alexa, set Alexa Privacy > Manage Your Alexa Data > Automatically delete recordings > after 3 months. Di Google, set My Activity > Auto-delete > 3 months untuk Assistant dan untuk Web & App Activity. Untuk Siri iPhone, hapus riwayat tiap bulan dengan tombol Delete Siri History. Hapus otomatis beri Anda jalan tengah tanpa hapus manual tiap minggu.

### 3. Matikan simpan suara di mana bisa, simpan transkrip di mana perlu

Di Alexa, hidupkan Do not save recordings di bawah Manage Your Alexa Data. Alexa tetap simpan transkrip untuk fungsi app tapi buang audio. Di Google, jeda Voice and Audio Activity di bawah Data & Privacy. Google tetap simpan transkrip, tapi buang klip audio. Untuk kamar anak, pilih mode buang audio ini.

### 4. Bangun profil suara hanya untuk orang yang butuh hasil personal

Voice Match dan Voice ID beri speaker panggil Anda dengan nama dan ambil kalender Anda. Enroll hanya orang tua yang butuh akses kalender. Jangan enroll anak di bawah 13, dan jangan enroll tamu. Sedikit suara ter enroll berarti sedikit template biometrik simpan dan sedikit log personal kait ke individu.

### 5. Set speaker untuk rumah, bukan satu orang

Di Google Home, buat struktur home dengan tiap orang tua sebagai anggota home, dengan alamat benar. Di Alexa, buat Amazon Household hanya jika Anda percaya bagi itu, jika tidak pertahan satu akun utama dan pakai profil suara. Struktur household putuskan siapa bisa tambah perangkat dan siapa bisa tinjau riwayat. Setup pemilik tunggal sering sembunyi aktivitas dari orang tua kedua, yang blokir tinjau.

### 6. Audit skill, action, dan sambung rumah tiap kuartal

Buka Alexa > Skills & Games > Your Skills. Hapus skill yang Anda pakai sekali untuk kampanye. Buka Google Home > Automations > Household routines. Hapus rutin yang sudah tidak perlu. Buka Home > Settings > Works with Google. Lepas vendor yang sudah Anda tinggal. Tiap skill atau link bisa baca event perangkat dan bisa simpan log sendiri di luar provider.

### 7. Pindah minta sensitif ke ponsel, bukan speaker berbagi

Speaker berbagi kait riwayat ke rumah, bukan ke satu orang. Minta seperti apa hasil tes darah saya atau hubungi bank pantas di ponsel dengan kunci layar. Ajar keluarga pakai assistant ponsel untuk kesehatan, keuangan, atau admin sekolah, dan pakai speaker ruang tamu untuk timer, lampu, musik, dan cuaca.

### 8. Pakai mode tamu dan set pembelian tertutup

Di Alexa, hidupkan Amazon Kids untuk speaker anak atau hidupkan PIN pembelian suara. Di Google, set kontrol Purchase > Require voice match atau matikan belanja. Hidupkan Guest Mode di Google untuk pengunjung jadi tanya tamu tidak simpan ke riwayat Anda. Tamu dapat bantu tanpa tambah ke profil Anda.

### 9. Tempat dan nama speaker dengan ingat privasi

Jangan taruh speaker di kamar tidur di mana obrol privat terjadi atau dekat TV yang picu bangun palsu. Taruh speaker di meja dapur atau rak ruang. Nama ruang secara generik. Pakai lampu 1 ganti kamar Siti. Nama generik bocorkan lebih sedikit soal siapa tinggal di mana jika log perangkat pernah bocor.

### 10. Tinjau riwayat dengan keluarga sekali sebulan lima menit

Buka daftar riwayat dan scroll 20 entri terakhir. Anda lihat bangun palsu, Anda lihat minta anak yang ungkap nama sekolah, Anda lihat skill yang catat di jam aneh. Hapus entri yang tidak perlu. Cek lima menit itu ajar anak cara perangkat kerja dan tunjuk Anda kelola data.

## Cara Anda cek apa yang speaker dengar minggu ini

Lakukan sekali di tiap platform yang Anda punya.

**Alexa:** Buka app Alexa > More > Settings > Alexa Privacy > Review Voice History. Filter berdasar tanggal, perangkat, dan profil. Putar satu klip. Perhatikan transkrip dan skill yang tangani minta. Hapus satu entri dan lihat transkrip hilang.

**Google:** Buka myactivity.google.com > Filter berdasar produk > Assistant. Putar satu klip jika simpan audio hidup. Perhatikan baris transkrip di bawah Details. Cek Google Home > Privacy > Home activity untuk event perangkat.

**Siri HomePod:** Buka Setelan iPhone > Siri & Search > Siri & Dictation History. Perhatikan tanggal hapus terakhir. Di HomePod, cek Home app > Home Settings > Siri History kait ke pemilik.

Anda belajar dua hal cepat. Pertama, berapa entri keluarga Anda buat per hari. Kedua, minta mana bawa konteks ekstra yang tidak Anda duga.

## Saat ungkap sensitif terjadi

Anda tanya soal medis di speaker ruang tamu karena kebiasaan. Atau tamu sebut nomor kartu kredit keras dan speaker tangkap. Gerak cepat.

- Mute speaker.
- Buka daftar riwayat untuk hari itu. Cari klip atau transkrip.
- Hapus entri tunggal itu, lalu bersihkan cache assistant di ponsel jika assistant simpan transkrip di sana.
- Jika Anda sebut password, nomor bank, atau kode sekali pakai, ganti kredensial itu di sumber. Klip simpan adalah salinan yang bisa Anda hapus, tapi Anda anggap ungkap sebagai catatan tinggal di meja.
- Jika anak tanya hal sensitif yang ingin Anda jaga privat, hapus entri itu dan bicara dengan anak soal pakai perangkat personal untuk topik itu lain kali.
- Untuk tanya kesehatan atau hukum, pertimbangkan pakai browse dengan mode privat di ponsel dan bukan speaker berbagi ke depan.

Anda tidak perlu hapus seluruh riwayat untuk perbaiki satu ungkap. Hapus item tunggal, lalu kencangkan kontrol jadi kelas ungkap itu tidak berulang.

## Kasus khusus untuk anak dan untuk rumah Indonesia dengan helper

Anak eksplor dengan suara. Mereka tanya acak, mereka coba hubungi kontak, mereka coba beli barang dengan suara. Helper dan tamu juga pakai speaker siang hari. Dua langkah ekstra bantu.

- Taruh speaker anak di mode Kids di mana ada. Alexa Kids filter konten, blokir pembelian suara, dan simpan riwayat anak terpisah dengan kontrol orang tua. Profil Kids Google batasi personalisasi.
- Beri helper aturan jelas. Speaker ruang adalah untuk timer, lampu, dan musik. Minta personal pergi ke ponsel personal. Aturan itu lindungi helper dan rumah.

Cek dukung perangkat lokal. Nest Mini dan Nest Hub umum di Indonesia, Alexa kurang umum tapi tumbuh, HomePod lebih jarang. Smart Speaker Xiaomi dengan Google Assistant ikut aturan Google. Perangkat Bardi yang link lewat Google Home warisi privasi Google Home, jadi log saklar Bardi duduk dengan Google.

## Mitos umum yang buang waktu dan fakta yang bantu

**Mitos: Speaker rekam seharian seperti bug.** Tidak. Speaker buffer lokal dan buang audio yang tidak cocok model bangun. Bangun palsu terjadi, tapi perangkat tidak stream seharian ke cloud. Uji pantau jaringan di 2023 sampai 2025 tunjuk lonjakan hanya setelah kata bangun.

**Mitos: Mute palsu dan mic tetap dengar.** Di speaker besar tombol mute putus daya mic di hardware. Lampu merah tandai rel mic mati. Uji yang ukur tarik daya konfirmasi jalur mic turun.

**Mitos: Hapus klip sembunyikan dari provider selamanya seketika.** Provider simpan data hapus untuk retensi pendek untuk tangani hold hukum dan bersihkan backup. Hapus buang entri dari lihat Anda dan dari latih aktif cepat, tapi backup kedaluwarsa sesuai jadwal.

**Fakta: Tumpahan privasi paling umum di rumah bukan hacker.** Anggota rumah atau tamu yang tinjau riwayat di app dan lihat tanya dari anggota lain. Anggota rumah sering lupa riwayat berbagi di bawah akun utama.

## Setup yang kerja untuk apartemen keluarga Jakarta

Anda taruh Nest Mini di rak dapur, jauh dari TV. Anda hidupkan Voice Match untuk dua orang tua, Anda lewati Voice Match untuk anak. Anda set hapus otomatis ke 3 bulan. Anda jeda Voice and Audio Activity jadi Google simpan transkrip tapi buang klip audio. Anda mute saat tamu menginap semalam. Anda lepas tiga skill Bardi lama yang Anda coba tahun lalu.

Di kamar tidur Anda pakai tidak ada speaker. Di kamar anak Anda pakai speaker kecil dengan mode Kids dan pembelian blokir. Anda tinjau riwayat lima menit tiap Minggu. Anda hapus beberapa bangun palsu dan satu minta musik yang tag lokasi salah.

Anda pertahan timer, lampu, dan musik di suara, dan Anda pindah bank, kesehatan, dan admin sekolah ke ponsel. Pisahan itu beri Anda cepat di mana suara bantu dan privasi di mana suara berisiko.

## Checklist yang Anda jalan malam ini dalam 10 menit

- Anda tekan mute dan unmute untuk lihat jalur lampu merah.
- Anda buka daftar riwayat untuk 7 hari terakhir dan hitung entri.
- Anda set hapus otomatis ke 3 bulan.
- Anda jeda Voice and Audio Activity atau hidupkan Do not save recordings.
- Anda cek profil suara mana yang ter enroll dan hapus tamu atau anak.
- Anda audit skill dan link rumah dan hapus yang sudah tidak pakai.
- Anda set PIN pembelian atau blokir pembelian suara.
- Anda set mode tamu di mana ada.
- Anda pilih spot baru untuk speaker jauh dari TV.
- Anda set pengingat kalender untuk tinjau riwayat tiap bulan.

## Sumber dan di mana Anda cek lebih jauh

- Halaman Bantuan Privasi Alexa Amazon soal Review Voice History dan hapus otomatis
- Bantuan My Activity Google soal data Assistant dan Voice and Audio Activity
- Panduan Keamanan Platform Apple soal proses on-device Siri dan randomisasi
- Tinjau privasi smart speaker Mozilla Foundation 2023 sampai 2025
- Riset jaringan universitas soal positif palsu kata bangun dan lonjakan traffic
- Panduan Electronic Frontier Foundation soal hardening perangkat smart home

> Anda pertahan speaker untuk apa yang ia lakukan terbaik, tugas waktu dan kontrol rumah, dan Anda pindah obrol privat ke perangkat yang hanya Anda kontrol. Beberapa toggle plus scroll bulanan jaga riwayat rumah tetap pendek dan keluarga paham apa yang tinggal dan apa yang pergi.

