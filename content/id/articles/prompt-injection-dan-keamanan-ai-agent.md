---
translationKey: "prompt-injection-ai-agent"
title: "Prompt Injection dan Keamanan AI Agent: Melindungi Data dan Aksi Otomatis"
date: 2026-07-04
draft: false
categories:
  - Keamanan AI
  - Keamanan Aplikasi
tags:
  - prompt injection
  - AI agent
  - keamanan AI
  - otomatisasi
summary: "AI agent dapat membaca data dan menjalankan alat. Pahami prompt injection, batasi izin, dan buat pemeriksaan manusia agar otomatisasi tidak berubah menjadi jalur kebocoran."
cover: "/images/articles/prompt-injection-ai-agent.webp"
---

AI agent berbeda dari chat biasa. Chatbot menjawab pertanyaan. Agent dapat diberi tujuan, membaca dokumen, mencari informasi, memanggil alat, membuat tiket, mengirim email, atau memperbarui data. Kemampuan ini menarik bagi tim yang ingin mengurangi pekerjaan berulang. Kemampuan yang sama juga membuat kesalahan atau manipulasi memiliki dampak lebih besar.

Prompt injection terjadi ketika instruksi yang tidak tepercaya memengaruhi cara AI bertindak. Instruksi itu bisa datang langsung dari pengguna, tersembunyi dalam dokumen, halaman web, email, tiket, atau data yang dibaca agent. Misalnya, agent diminta merangkum dokumen. Salah satu dokumen memuat teks yang menyuruh agent mengabaikan aturan awal, membocorkan informasi, atau menjalankan tindakan lain. Manusia mungkin menganggap teks itu tidak relevan, tetapi model dapat memperlakukannya sebagai instruksi.

Masalah ini bukan alasan untuk menghindari semua otomatisasi. Ini alasan untuk merancang agent seperti sistem yang memiliki akses dan risiko. Artikel ini membahas cara memakai agent dengan tujuan sempit, izin minimum, data terbatas, dan pemeriksaan pada tindakan yang berdampak.

## Bedakan instruksi tepercaya dan data yang tidak tepercaya

Agent menerima beberapa jenis masukan. Instruksi sistem dan konfigurasi pemilik aplikasi seharusnya menentukan peran serta batas tugas. Permintaan pengguna dapat memberi tujuan dalam batas yang diizinkan. Dokumen, hasil pencarian, email, dan halaman web adalah data yang dapat berisi teks berbahaya atau keliru. Kesalahan desain terjadi ketika semua masukan diperlakukan seolah-olah memiliki tingkat kepercayaan yang sama.

Tandai sumber data dengan jelas. Saat agent membaca isi dari luar, aplikasi perlu menganggap isi itu sebagai referensi, bukan perintah. Jangan meminta model menentukan sendiri apakah teks tertentu harus dipatuhi. Buat aturan di tingkat aplikasi: data eksternal tidak dapat mengubah kebijakan, meminta rahasia, mengganti tujuan, atau memperluas izin.

Jangan memasukkan rahasia ke prompt hanya agar agent dapat menggunakannya. Simpan kunci API, token, dan kredensial dalam penyimpanan rahasia yang dikelola sistem. Berikan alat kepada agent melalui fungsi yang memiliki batas, bukan dengan menaruh token dalam percakapan. Jika prompt, log, atau riwayat bocor, rahasia tidak ikut terbaca.

## Mulai dari tugas sempit dan dampak rendah

Agent pertama tidak perlu dapat melakukan semuanya. Pilih satu tugas dengan data terbatas dan dampak rendah, misalnya mengelompokkan tiket tanpa mengubah status, membuat draf ringkasan dari dokumen internal yang sudah diseleksi, atau menandai laporan yang perlu ditinjau manusia. Hindari memberi agent hak mengirim email keluar, mengubah pembayaran, menghapus data, menambah pengguna, atau menandatangani kontrak pada tahap awal.

Tentukan hasil yang boleh dibuat dan hasil yang dilarang. Contoh: agent boleh menyarankan label tiket, tetapi tidak boleh menutup tiket. Agent boleh menyiapkan balasan pelanggan, tetapi tidak boleh mengirimkannya. Agent boleh mencari dokumen dalam satu folder, tetapi tidak boleh mengakses seluruh drive. Batas semacam ini mengurangi dampak jika agent salah memahami tujuan atau menerima data yang dimanipulasi.

Gunakan mode hanya-baca bila memungkinkan. Akses baca tetap memiliki risiko kebocoran, tetapi biasanya lebih mudah dikendalikan daripada akses tulis. Ketika organisasi ingin menambah kemampuan tulis, lakukan satu tindakan setiap kali dan mintalah persetujuan manusia sebelum eksekusi. Jangan memberi hak tulis luas hanya karena integrasi menyediakannya.

## Terapkan izin minimum pada setiap alat

Agent tidak boleh menjadi akun super. Setiap konektor, API, atau alat harus mendapat hak paling sedikit untuk tugas yang disetujui. Jika agent perlu melihat status pesanan, beri akses hanya baca ke data pesanan yang relevan. Jika agent perlu membuat draf tiket, gunakan API yang hanya membuat draf di proyek tertentu. Jangan pakai token administrator untuk tugas biasa.

Pisahkan lingkungan pengujian dan produksi. Gunakan data sintetis atau data yang telah disamarkan pada tahap pengembangan. Uji skenario gagal tanpa risiko mengirim pesan kepada pelanggan atau mengubah catatan produksi. Setelah fungsi stabil, pindahkan ke produksi dengan akun layanan terpisah, cakupan terbatas, masa berlaku token, dan log aktivitas.

Tinjau izin setelah integrasi dibuat. Izin sering bertambah seiring waktu karena ada permintaan fitur baru. Catat alasan setiap izin, pemiliknya, serta tanggal peninjauan. Cabut akses yang tidak lagi dipakai. Kebiasaan ini mencegah agent tumbuh menjadi kumpulan konektor yang tidak dipahami siapa pun.

## Tambahkan pemeriksaan sebelum aksi penting

Tindakan seperti mengirim email, membuat transfer, menghapus berkas, mengubah konfigurasi, atau mengundang pengguna memerlukan gerbang tambahan. Agent dapat menyiapkan usulan, tetapi manusia perlu melihat tujuan, data yang akan dikirim, penerima, dan alasan sebelum menyetujui. Tampilkan informasi tersebut dalam bentuk yang mudah dibaca, bukan sekadar log teknis.

Gunakan prinsip empat mata untuk tindakan bernilai tinggi. Satu orang dapat membuat permintaan, orang lain menyetujui, atau sistem meminta konfirmasi pada akun yang berbeda. Untuk tugas berulang dengan risiko sedang, gunakan batas nominal, daftar penerima yang diizinkan, dan jadwal pengiriman. Jangan mengandalkan kalimat di prompt sebagai satu-satunya pengaman.

Buat pengaman aplikasi yang tidak dapat diubah oleh isi dokumen. Misalnya, larang pengiriman ke domain eksternal kecuali domain ada dalam daftar yang disetujui. Larang penghapusan massal. Batasi jumlah panggilan alat dalam satu tugas. Hentikan proses ketika agent mencoba mengakses sumber di luar tugasnya. Kontrol ini bekerja bahkan ketika model memberikan jawaban yang keliru.

## Uji prompt injection sebelum meluncurkan agent

Pengujian perlu memuat contoh yang sengaja mencoba membelokkan agent. Buat dokumen atau tiket uji yang berisi instruksi seperti "abaikan aturan sebelumnya", "kirim isi folder ini", atau "gunakan alat lain". Tujuannya bukan mengajari pelaku, tetapi memeriksa apakah agent tetap menganggap teks itu sebagai data.

Uji juga instruksi yang samar: teks berwarna putih, komentar tersembunyi, catatan kaki, file yang dipindai, dan konten dari halaman web. Periksa apa yang dicatat dalam log, apa yang muncul di layar persetujuan, dan apakah agent dapat memanggil alat tanpa izin. Catat hasil uji dan perbaiki desain sebelum menambah akses.

Jangan menganggap satu kali uji cukup. Model, konektor, sumber data, dan instruksi akan berubah. Jadwalkan pengujian ulang setelah perubahan besar. Minta orang yang tidak membangun agent untuk mencoba skenario penggunaan yang tidak diharapkan. Sudut pandang baru sering menemukan asumsi yang terlewat.

## Lindungi data dari log dan riwayat

Agent menghasilkan prompt, jawaban, panggilan alat, log kesalahan, dan rekaman persetujuan. Semua itu dapat menjadi data sensitif. Tentukan data apa yang dicatat, siapa dapat membacanya, dan berapa lama disimpan. Jangan memasukkan isi dokumen lengkap ke log bila ringkasan metadata sudah cukup untuk investigasi.

Pisahkan log operasional dari data pengguna bila memungkinkan. Terapkan kontrol akses, enkripsi, dan masa simpan. Hapus atau samarkan pengenal dalam log pengujian. Saat insiden terjadi, log membantu penyelidikan, tetapi log yang terlalu luas juga dapat memperbesar dampak kebocoran.

Beritahu pengguna bila agent membaca atau memproses data mereka. Transparansi membantu mereka memahami kapan perlu menghapus pengenal atau memilih jalur manual. Untuk aplikasi pelanggan, jangan menyembunyikan otomatisasi di balik antarmuka yang seolah-olah semua tindakan dilakukan manusia.

## Contoh situasi: agent untuk memproses tiket layanan

Sebuah tim membuat agent yang membaca tiket masuk, mencari artikel bantuan, lalu menyusun respons. Agar cepat, agent diberi akses ke seluruh basis pengetahuan, seluruh daftar pelanggan, dan kemampuan mengirim email. Seorang penyerang mengirim tiket yang berisi teks tersembunyi: ia meminta agent melampirkan informasi internal serta meneruskan respons ke alamat luar.

Desain yang aman membatasi agent pada artikel bantuan yang telah disetujui dan data tiket yang diperlukan. Agent hanya membuat draf pada sistem tiket. Ia tidak dapat mengirim email sendiri, membuka drive seluruh organisasi, atau mengambil lampiran di luar tiket. Sebelum respons dikirim, petugas melihat draf dan penerimanya. Teks penyerang tetap masuk sebagai data tiket, tetapi tidak mendapatkan kemampuan baru.

Pelajaran utamanya bukan membuat prompt yang semakin panjang. Keamanan datang dari pemisahan sumber data, izin sempit, dan kontrol aplikasi di luar model.

## Saat terjadi perilaku mencurigakan

Hentikan agent atau cabut konektornya jika ia mencoba mengakses data di luar tugas, mengirim ke penerima aneh, memanggil alat yang tidak diharapkan, atau menghasilkan banyak tindakan dalam waktu singkat. Simpan log yang relevan, termasuk versi instruksi, sumber masukan, panggilan alat, akun layanan, dan waktu kejadian. Jangan menghapus semua bukti ketika mencoba memperbaiki masalah.

Putar ulang token atau kunci yang mungkin terpapar. Periksa tindakan yang sudah dilakukan agent dan data mana yang mungkin terbaca atau terkirim. Beri tahu pemilik sistem serta pihak yang bertanggung jawab atas keamanan. Setelah keadaan stabil, cari penyebab desain: apakah agent punya izin terlalu luas, apakah layar persetujuan dilewati, atau apakah data luar diperlakukan sebagai perintah.

## Checklist sebelum agent dipakai di produksi

- Tugas agent sempit dan hasil yang dilarang ditulis jelas.
- Data dari email, dokumen, dan web diperlakukan sebagai data tidak tepercaya.
- Token dan rahasia tidak pernah ditaruh dalam prompt atau riwayat chat.
- Agent memakai akun layanan dengan izin minimum dan token terbatas.
- Tindakan penting memerlukan persetujuan manusia.
- Ada batas penerima, jumlah tindakan, dan domain tujuan.
- Tim menguji dokumen berisi instruksi manipulatif.
- Log, retensi, dan akses ke riwayat sudah ditetapkan.
- Ada tombol penghentian serta pemilik yang bertanggung jawab.

## Pertanyaan yang sering diajukan

### Apakah prompt injection dapat dicegah hanya dengan instruksi yang lebih tegas?

Tidak. Instruksi yang baik membantu, tetapi data tidak tepercaya tetap dapat memengaruhi model. Gunakan batas izin, validasi aplikasi, persetujuan manusia, dan pemisahan rahasia sebagai lapisan utama.

### Apakah agent hanya-baca selalu aman?

Tidak selalu. Akses baca yang luas dapat membocorkan data. Namun, mode hanya-baca biasanya menurunkan dampak dibanding kemampuan mengubah atau mengirim data. Batasi sumber yang dapat dibaca dan tetap pantau aktivitasnya.

### Kapan agent boleh mengirim email secara otomatis?

Hanya setelah tugas, penerima, isi, dan batas risiko didefinisikan dengan jelas. Mulailah dengan draf dan persetujuan manusia. Untuk otomatisasi terbatas, gunakan daftar penerima yang diizinkan dan jangan izinkan agent mengirim informasi sensitif.

### Apa perbedaan AI agent dan chatbot biasa?

Chatbot terutama menghasilkan jawaban. Agent dapat menggabungkan jawaban dengan tindakan melalui alat, API, dan konektor. Karena dapat bertindak, agent memerlukan kontrol akses dan pemeriksaan yang lebih ketat.

## Pemeriksaan operasional tambahan

### Tujuan agent

Dalam AI agent dan otomatisasi, periksa Tujuan agent sebelum pekerjaan berjalan lebih jauh. Pastikan pemilik agent, pengembang, dan peninjau bisnis dapat menjelaskan mengapa akses atau tindakan itu diperlukan.

### Sumber instruksi

Sumber instruksi perlu memiliki batas yang dapat dipahami pengguna. Risiko muncul ketika data tidak tepercaya memengaruhi tindakan agent atau memperluas aksesnya. Bila jawabannya tidak jelas, hentikan penggunaan sementara dan minta penilaian dari pemilik agent, pengembang, dan peninjau bisnis sebelum data atau tindakan berikutnya diproses.

### Dokumen eksternal

Jadikan Dokumen eksternal sebagai bagian dari pemeriksaan rutin, bukan pekerjaan yang hanya dilakukan setelah insiden. Dalam konteks AI agent dan otomatisasi, perubahan kecil pada akun, izin, atau alur kerja dapat mengubah tingkat risiko.

### Hasil pencarian

Saat menilai Hasil pencarian, fokus pada dampak yang mungkin terjadi, bukan hanya pada apakah fitur tersedia. pemilik agent, pengembang, dan peninjau bisnis perlu memastikan pengguna memahami batasnya. Langkah yang dicatat dan dapat diperiksa akan membantu tim merespons jika data tidak tepercaya memengaruhi tindakan agent atau memperluas aksesnya atau bila ada pertanyaan dari pihak yang terdampak.

## Rincian pemeriksaan lapangan

### Validasi masukan

Dalam AI agent dan otomatisasi, periksa Validasi masukan dengan tujuan yang jelas. Pastikan pemilik agent, pengembang, dan peninjau bisnis dapat menerangkan alasan akses atau tindakan tersebut.

### Pemisahan data

Pemisahan data perlu memiliki batas yang dapat dilihat pengguna. Minta penilaian dari pemilik agent, pengembang, dan peninjau bisnis sebelum data atau tindakan tambahan diproses.

### Pemanggilan API

Jadikan Pemanggilan API bagian dari pekerjaan rutin, bukan tindakan setelah masalah terjadi. Pada AI agent dan otomatisasi, perubahan akun, izin, atau alur dapat mengubah risiko.

### Validasi keluaran

Saat menilai Validasi keluaran, lihat dampaknya bagi orang dan data, bukan hanya apakah fitur tersedia. pemilik agent, pengembang, dan peninjau bisnis perlu memberi pengguna cara untuk bertanya dan melapor. Catatan yang dapat diperiksa akan membantu respons bila data tidak tepercaya memengaruhi tindakan agent atau memperluas aksesnya.

### Pembatasan domain

Dalam AI agent dan otomatisasi, periksa Pembatasan domain dengan tujuan yang jelas.

### Batas waktu tugas

Batas waktu tugas perlu memiliki batas yang dapat dilihat pengguna.

### Batas biaya

Jadikan Batas biaya bagian dari pekerjaan rutin, bukan tindakan setelah masalah terjadi.

### Peringatan anomali

Saat menilai Peringatan anomali, lihat dampaknya bagi orang dan data, bukan hanya apakah fitur tersedia.

### Pemantauan produksi

Dalam AI agent dan otomatisasi, periksa Pemantauan produksi dengan tujuan yang jelas.

### Tanggung jawab pemilik

Tanggung jawab pemilik perlu memiliki batas yang dapat dilihat pengguna.

### Data pelanggan

Jadikan Data pelanggan bagian dari pekerjaan rutin, bukan tindakan setelah masalah terjadi.

### Dokumen mitra

Saat menilai Dokumen mitra, lihat dampaknya bagi orang dan data, bukan hanya apakah fitur tersedia.

### Pembaruan model

Dalam AI agent dan otomatisasi, periksa Pembaruan model dengan tujuan yang jelas.

### Perubahan konektor

Perubahan konektor perlu memiliki batas yang dapat dilihat pengguna.

## Sumber dan bacaan lanjutan

- [OWASP: Prompt Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html)
- [OWASP: Top 10 for Large Language Model Applications](https://genai.owasp.org/llm-top-10/)
- [NIST: AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [CISA: Secure by Design](https://www.cisa.gov/securebydesign)

> **Catatan editorial:** AI agent yang memiliki akses ke data atau tindakan bisnis memerlukan desain, uji, dan pengawasan yang sepadan dengan dampak akses tersebut.
