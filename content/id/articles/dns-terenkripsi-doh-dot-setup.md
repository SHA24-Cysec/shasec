---
translationKey: "encrypted-dns-doh-dot"
title: "Setup DNS Terenkripsi (DoH/DoT): Melindungi Query DNS Anda dari Penyadapan"
date: 2026-07-25
draft: false
categories:
 - Keamanan Siber
 - Privasi
 - Jaringan
tags:
 - encrypted dns
 - dns over https
 - dns over tls
 - doh
 - dot
 - cloudflare
 - google dns
 - quad9
 - nextdns
 - privasi
 - isp tracking
summary: "ISP Anda melihat setiap domain yang Anda kunjungi. Operator WiFi publik juga. DNS Terenkripsi (DoH dan DoT) menyembunyikan query Anda di dalam TLS, mencegah surveilans, sensorship, dan tampering. Panduan ini membandingkan provider, menjelaskan setup di router, perangkat, dan browser, serta tradeoffs yang perlu Anda ketahui."
cover: "/images/articles/encrypted-dns-doh-dot.webp"
---

Setiap kali Anda ketik domain, klik link, atau load gambar, perangkat Anda tanya ke DNS resolver: "Apa alamat IP untuk nama ini?" Pertanyaan itu travel dalam plain text. ISP Anda lihat. WiFi kopi lihat. Jaringan hotel lihat. Device mana pun di path lihat. Mereka log. Mereka jual. Mereka blokir. Mereka injek iklan. Mereka redirect.

DNS Terenkripsi ubah itu. DNS over HTTPS (DoH) dan DNS over TLS (DoT) bungkus query Anda di TLS, enkripsi yang sama yang lindungi sesi banking Anda. Resolver tetap jawab, tapi jaringan antara Anda dan resolver hanya lihat encrypted traffic ke IP known. Mereka tahu Anda pakai encrypted DNS. Mereka TIDAK tahu domain apa yang Anda tanyakan.

Ini bukan teoritis. 2017, Kongres AS cabut aturan privasi broadband FCC, eksplisit izinkan ISP menjual history browsing. 2021, ISP besar AS tertangkap injek iklan ke halaman HTTP. 2023, banyak negara mandasikan blocking level DNS situs "tidak sah." Operator WiFi publik rutin intercept DNS untuk enforce captive portal atau filter konten. Malware pakai DNS untuk command-and-control. Encrypted DNS address semua ini.

Tapi ini bukan magic shield. Dia shift trust dari ISP ke DNS provider Anda. Dia pecah beberapa fitur jaringan lokal. Dia bisa diblokir. Dia bocor di konfigurasi tertentu. Panduan ini cover protokol, provider, setup di setiap platform, tradeoffs, dan konfigurasi advanced yang bikin itu jalan reliable.

## Masalah: Plaintext DNS

DNS (Domain Name System) dirancang 1983. No encryption. No authentication. No integrity. Query keluar lewat UDP port 53. Jawaban balik. Siapapun di path bisa baca, modifikasi, blokir, atau redirect.

Yang jaringan lihat:
- Setiap domain yang Anda resolve (example.com, tracker.adnetwork.com, cdn.malware.site)
- Timing dan frequency (korelasikan ke aktivitas Anda)
- Client subnet (EDNS Client Subnet) reveal lokasi approximate Anda
- Tipe query (A, AAAA, MX, TXT, HTTPS) reveal intent

Yang jaringan bisa lakukan:
- **Log dan profil**: Bangun history setiap situs yang Anda kunjungi. Jual ke data broker. Share ke law enforcement tanpa warrant (di banyak yurisdiksi).
- **Blokir**: Return NXDOMAIN atau block page untuk domain di list pemerintah atau korporat.
- **Redirect**: Return IP untuk captive portal, ad injector, situs phishing, atau warning page pemerintah.
- **Throttle**: Perlambat domain spesifik (streaming, gaming, VPN).
- **Injeksi**: Modifikasi response HTTP tidak terenkripsi (iklan, tracking, malware).

DNSSEC validasi *jawaban* (tanda tangan kriptografis di zone). Dia TIDAK enkripsi *query*. Jaringan tetap lihat apa yang Anda tanyakan. DNSSEC + plaintext DNS kayak kirim surat tersegel di amplop transparan.

## Solusi: DoH dan DoT

Dua protokol enkripsi traffic DNS di dalam TLS. Dua-duanya pakai port standar (443 untuk DoH, 853 untuk DoT). Dua-duanya provide confidentiality dan integrity. Dua-duanya autentikasi resolver (verifikasi sertifikat).

### DNS over TLS (DoT)

Distandardkan di RFC 7858 (2016). Pesan DNS diframe over persistent TLS connection di port 853. Client initiate TCP, lakukan TLS handshake, verifikasi sertifikat, kirim query DNS sebagai length-prefixed messages.

Karakteristik:
- Port dedicated (853)   mudah diidentifikasi dan diblokir
- Latency lebih rendah setelah connection established (persistent connection)
- Native OS support di Android 9+, iOS 14+, Windows 11, Linux (systemd-resolved, stubby)
- Pemisahan jelas dari traffic HTTP

### DNS over HTTPS (DoH)

Distandardkan di RFC 8484 (2018). Pesan DNS di-encode sebagai HTTPS request (GET atau POST) ke HTTPS endpoint. Pakai port standar 443. Tidak bisa dibedakan dari traffic HTTPS regular oleh observer casual.

Karakteristik:
- Port 443   sulit diblokir tanpa blokir HTTPS
- Latency lebih tinggi per query (koneksi baru atau HTTP/2 multiplexing)
- Browser-native support (Firefox, Chrome, Edge, Brave, Safari)
- Bisa leverage HTTP/2, HTTP/3 (QUIC) untuk performance
- Support JSON wire format (application/dns-json) dan binary (application/dns-message)

### DoH vs DoT: Pilih Mana?

**Pakai DoT saat**: Anda konfigurasi di level OS atau router. Anda mau integrasi native. Anda prefer kejelasan port dedicated. Anda pakai Android, iOS, Windows 11, atau Linux dengan systemd-resolved/stubby.

**Pakai DoH saat**: Anda konfigurasi di browser. Butuh bypass port blocking (captive portals, firewall restriktif). Mau performance HTTP/3. Anda pakai browser yang support baik (Firefox, Chrome, Edge, Brave).

**Pakai keduanya**: Router/OS pakai DoT untuk semua traffic sistem. Browser pakai DoH sebagai backup/override. Ini pendekatan belt-and-suspenders.

## Perbandingan Provider: Siapa Yang Anda Trust?

Encrypted DNS shift trust dari ISP ke DNS provider Anda. Provider lihat SETIAP domain yang Anda resolve. Mereka bisa log, blokir, redirect, atau jual. Pilih hati-hati.

### Cloudflare (1.1.1.1 / 1.0.0.1)

**DoH**: `https://cloudflare-dns.com/dns-query`
**DoT**: `1dot1dot1dot1.cloudflare-dns.com` (IP: 1.1.1.1, 1.0.0.1)

Pros: Jaringan anycast global tercepat. Privacy policy kuat: no IP logs retained > 24h, no jual data, audit KPMG tahunan. Validasi DNSSEC. Opsi blocking malware/phishing (1.1.1.2 / 1.0.0.2). Opsi family blocking (1.1.1.3 / 1.0.0.3). Integrasi WARP VPN. Support ECH (Encrypted Client Hello).

Cons: Perusahaan AS (subjek NSL/FISA). Anycast terpusat (single entity kontrol resolusi). Beberapa jaringan blokir 1.1.1.1 karena misuse Cisco legacy.

Best untuk: General use, speed, trust di audit + policy.

### Google Public DNS (8.8.8.8 / 8.8.4.4)

**DoH**: `https://dns.google/dns-query`
**DoT**: `dns.google` (IP: 8.8.8.8, 8.8.4.4)

Pros: Infrastruktur masif. Validasi DNSSEC. Support ECH. Reliable. No malware blocking (pure resolution). Halaman privacy detail.

Cons: Google (perusahaan iklan). Log IP + query 24-48h, lalu aggregated anonymized retained lebih lama. Subjek proses hukum AS. Tied ke incentive ecosystem Google.

Best untuk: Reliability, kompatibilitas, user sudah di ecosystem Google.

### Quad9 (9.9.9.9 / 149.112.112.112)

**DoH**: `https://dns.quad9.net/dns-query`
**DoT**: `dns.quad9.net` (IP: 9.9.9.9, 149.112.112.112)

Pros: Yayasan Swiss (hukum privasi kuat). Non-profit. Threat intelligence blocking (malware, phishing, botnet) dari 20+ feed. No logging IP atau query. Validasi DNSSEC. Anycast global. Support ECH. Variasi unblocked (9.9.9.10) tanpa filtering.

Cons: Blocking bisa false positive (jarang). Lebih lambat di beberapa region vs Cloudflare/Google. Yurisdiksi Swiss bantu tapi tidak absolut.

Best untuk: User security-focused, threat blocking, privacy jurisdiction.

### NextDNS (Custom endpoints per konfigurasi)

**DoH**: `https://dns.nextdns.io/<config-id>`
**DoT**: `<config-id>.dns.nextdns.io`

Pros: **Fully configurable**. Per-profile blocklists (iklan, tracker, malware, porn, gambling, custom). Allow/deny lists. Analytics dashboard (apa yang diblokir, kapan, device mana). Rewrites (local domain overrides). DNSSEC. ECH. Multiple profiles per account. CLI, apps, router configs. Log retention configurable (0 hingga 2 tahun). Endpoint Swiss dan AS.

Cons: Free tier: 300k queries/bulan (cukup untuk 1-2 orang). Bayar: $1.99/bulan unlimited. Butuh akun. Kompleksitas konfigurasi. Service terpusat (single point of trust).

Best untuk: Power users, keluarga, ad/tracker blocking di level DNS, kontrol granular, analytics.

### Control D (Mirip NextDNS)

**DoH/DoT**: Per-profile endpoints.

Pros: Granular rules, geo-unblocking (streaming), multi-profile, analytics, rewrite, DNSSEC. Pricing kompetitif.

Cons: Lebih baru, jaringan lebih kecil. Kurang history audit.

### Mullvad DNS (Provider VPN privacy-focused)

**DoH**: `https://doh.mullvad.net/dns-query`
**DoT**: `doh.mullvad.net` (IP: 194.242.2.2, 2a07:e340::2)

Pros: No account. No logging. Yurisdiksi Swedia. Variasi blocking malware/iklan/tracker (base, adblock, base+adblock+malware). Integrasi WireGuard VPN. Simpel.

Cons: No customization. No analytics. Anycast limited (sedikit POP).

Best untuk: User Mullvad VPN, zero-config privacy.

### Cisco Umbrella / OpenDNS

**DoH**: `https://doh.opendns.com/dns-query`
**DoT**: `doh.opendns.com`

Pros: Enterprise-grade threat intel. FamilyShield (porn blocking). Reliable.

Cons: Cisco (korporat AS). Logging untuk security analytics. Kurang privacy-focused.

### Self-Hosted (Unbound, Pi-hole, AdGuard Home, Technitium)

**DoH/DoT**: Domain Anda, server Anda.

Pros: Full control. No third-party logs. Custom blocklists. Resolusi lokal (LAN hosts). Validasi DNSSEC. Bisa forward ke multiple upstreams dengan DoT/DoH. Jalankan di Raspberry Pi, VPS, home server.

Cons: Anda maintain. Uptime = tanggung jawab Anda. Target DDoS. No anycast (single location). Manajemen sertifikat. Kalau VPS, provider lihat traffic. Kalau home, ISP lihat encrypted traffic ke VPS Anda (tapi tidak query).

Best untuk: User teknis, homelab, kontrol maksimal, resolusi domain lokal.

## Framework Pemilihan Provider

| Prioritas | Recommended |
|----------|-------------|
| Speed + audit + simplicitas | Cloudflare |
| Reliability + ecosystem | Google |
| Security blocking + Swiss privacy | Quad9 |
| Kontrol granular + analytics + keluarga | NextDNS |
| Zero config + VPN integration | Mullvad |
| Full control + resolusi lokal | Self-hosted (Pi-hole/AdGuard) |
| Streaming geo-unblock | Control D |

Anda bisa mix. Router pakai NextDNS (blocking + analytics). Telepon pakai Mullvad (privasi mobile). Browser pakai Cloudflare (speed). Laptop pakai self-hosted (local LAN). Query pergi ke provider berbeda. Tidak satu provider lihat semuanya.

## Setup per Platform

### Level Router (Cover Semua Perangkat)

Best untuk: Proteksi whole-home, IoT, tamu, perangkat yang tidak bisa dikonfigurasi.

**Asus (Asuswrt-Merlin / Stock)**
1. Web UI → WAN → DNS Filter → Enable DNS over TLS
2. Tambah: `1.1.1.1` (Cloudflare) atau `dns.quad9.net` (Quad9) atau hostname DoT NextDNS Anda
3. Aktifkan mode "Strict" (fail closed kalau DoT unavailable)
4. Nonaktifkan "Enable DNS Rebind Protection" kalau pakai local hostnames (atau tambah exception)

**OpenWrt**
```bash
opkg update
opkg install stubby ca-bundle
# Edit /etc/stubby/stubby.yml
# Set upstream: Cloudflare, Quad9, atau NextDNS DoT
# Enable dns_transport: GETDNS_TRANSPORT_TLS
# tls_authentication: GETDNS_AUTHENTICATION_REQUIRED
# tls_query_padding_blocksize: 128
/etc/init.d/stubby enable
/etc/init.d/stubby start
# Point dnsmasq ke 127.0.0.1#53 (stubby listen di 53)
```

**Ubiquiti UniFi (UDM/UDM-Pro/Cloud Gateway)**
1. Settings → Networks → WAN → DNS → Custom DNS
2. Aktifkan "Use DNS over TLS"
3. Masukkan hostname DoT (contoh: `dns.quad9.net`) atau IP dengan verifikasi hostname
4. Catatan: Support DoT UniFi limited; pertimbangkan EdgeRouter atau resolver eksternal

**pfSense / OPNsense**
1. Services → Unbound DNS → Enable
2. Unbound → Forwarding Mode → Enable
3. Forwarders: Tambah upstream DoT (Cloudflare, Quad9, NextDNS)
4. TLS: Enable, verifikasi sertifikat, hostname
5. Outgoing Interface: WAN (atau interface VPN)
6. DHCP: Berikan IP router sebagai DNS

**GL.iNet / Flint / Beryl / Slate (Travel Routers)**
1. Admin UI → Network → DNS → Encrypted DNS
2. Pilih provider atau custom DoT/DoH
3. Aktifkan "Force Encrypted DNS"
4. Bagus untuk hotel/kopi: colok, semua perangkat terproteksi

**Generic: Router Mana Pun yang Jalanin AdGuard Home / Pi-hole**
1. Install AdGuard Home atau Pi-hole di Raspberry Pi / VM / NAS
2. Konfigurasi upstreams sebagai DoT/DoH (keduanya support multiple)
3. Aktifkan DNSSEC
4. Point router DHCP ke IP Pi-hole/AdGuard
5. Bonus: Ad/tracker blocking, local DNS, analytics

### Windows 11

**Native DoT (Settings)**
1. Settings → Network & Internet → Advanced Network Settings → Hardware Properties (adapter Anda)
2. DNS Server Assignment → Edit → Manual → IPv4
3. Preferred DNS: `1.1.1.1` (atau 9.9.9.9, 8.8.8.8)
4. Alternate DNS: `1.0.0.1`
5. DNS over HTTPS: "On (automatic template)" atau "On (manual template)"
6. Manual template: `https://cloudflare-dns.com/dns-query` (atau provider DoH)
7. Fallback ke plaintext: Off (strict)

**PowerShell (untuk otomatisasi)**
```powershell
Set-DnsClientServerAddress -InterfaceAlias "Wi-Fi" -ServerAddresses 1.1.1.1,1.0.0.1
Set-DnsClientGlobalSetting -DnsOverHttpsMode 2 -DnsOverHttpsTemplate "https://cloudflare-dns.com/dns-query"
```

**Catatan**: Windows 10 support DoH hanya via manual registry atau tool third-party (YogaDNS, Simple DNSCrypt). Windows 11 native preferred.

### macOS (14 Sonoma / 15 Sequoia)

**Native DoT (via Configuration Profile)**
macOS tidak expose DoT/DoH di System Settings GUI. Pakai `.mobileconfig` profile.

Buat `encrypted-dns.mobileconfig`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>PayloadContent</key>
  <array>
    <dict>
      <key>PayloadType</key>
      <string>com.apple.dnsSettings.managed</string>
      <key>PayloadVersion</key>
      <integer>1</integer>
      <key>PayloadIdentifier</key>
      <string>com.user.encrypted-dns</string>
      <key>PayloadUUID</key>
      <string>GENERATE-UUID-HERE</string>
      <key>PayloadDisplayName</key>
      <string>Encrypted DNS</string>
      <key>PayloadDescription</key>
      <string>DoT/DoH untuk semua interface</string>
      <key>DNSSettings</key>
      <dict>
        <key>ServerAddresses</key>
        <array>
          <string>1.1.1.1</string>
          <string>1.0.0.1</string>
        </array>
        <key>DOH</key>
        <true/>
        <key>DOHServerURL</key>
        <string>https://cloudflare-dns.com/dns-query</string>
      </dict>
    </dict>
  </array>
  <key>PayloadType</key>
  <string>Configuration</string>
  <key>PayloadVersion</key>
  <integer>1</integer>
  <key>PayloadIdentifier</key>
  <string>com.user.encrypted-dns.config</string>
  <key>PayloadUUID</key>
  <string>GENERATE-ANOTHER-UUID</string>
  <key>PayloadDisplayName</key>
  <string>Encrypted DNS Profile</string>
</dict>
</plist>
```
Install: System Settings → General → Profiles → Download → Install.

**Alternatif: Third-party Apps**
- **AdGuard for Mac**: System-wide DoT/DoH, filtering, easy UI.
- **NextDNS App**: Resmi, per-profile, analytics.
- **Mullvad VPN App**: Termasuk toggle Mullvad DNS.
- **1Password / Bitwarden**: No DNS, tapi bisa pakai CLI tools.

### iOS / iPadOS (17 / 18)

**Native DoH/DoT (Settings)**
1. Settings → General → VPN & Device Management → DNS
2. Tidak langsung exposed. Pakai Configuration Profile (sama macOS) atau...

**Palmud: NextDNS / AdGuard / 1.1.1.1 Apps**
- **1.1.1.1 App (Cloudflare)**: Toggle WARP (VPN) atau cuma DNS. Pakai DoH. Gratis.
- **NextDNS App**: Install profile, pilih profile, done. Tunjukkan analytics.
- **AdGuard**: Install profile, aktifkan protection, pilih DNS server.
- **Mullvad VPN App**: Aktifkan "Mullvad DNS" di settings.

**Manual Profile (untuk custom provider)**
Generate `.mobileconfig` via Apple `profiles` tool atau pakai web generator (contoh: `https://dns.nextdns.io/` → "Setup Guide" → "iOS Profile"). Install via Settings → General → VPN & Device Management.

### Android (9+ / 10+ / 14 / 15)

**Native Private DNS (DoT)**
1. Settings → Network & Internet → Private DNS
2. Pilih "Private DNS provider hostname"
3. Masukkan: `dns.quad9.net` atau `1dot1dot1dot1.cloudflare-dns.com` atau `dns.nextdns.io` (config ID Anda).dns.nextdns.io
4. Save.

**Catatan**:
- Android 9+: DoT only. No native DoH.
- Mode "Automatic" pakai DoT kalau server support (Google DNS, Cloudflare).
- Beberapa carrier/OEM sembunyikan Private DNS. Pakai ADB: `settings put global private_dns_mode hostname` dan `settings put global private_dns_specifier dns.quad9.net`.

**Apps untuk DoH / Advanced**
- **NextDNS App**: DoH, profiles, analytics.
- **RethinkDNS**: Firewall + DNS (DoH/DoT), open source, no root.
- **Personal DNS Filter**: Open source, DoH/DoT, blocklists.
- **Mullvad VPN App**: Mullvad DNS.
- **1.1.1.1 App**: Cloudflare DoH + WARP.

### Linux (systemd-resolved / NetworkManager / stubby)

**systemd-resolved (Ubuntu 20.04+, Fedora, Arch, Debian 11+)**
1. Edit `/etc/systemd/resolved.conf`:
```ini
[Resolve]
DNS=1.1.1.1 1.0.0.1
DNSOverTLS=yes
# Atau untuk DoH:
# DNSOverTLS=yes
# DOH=yes
# DOHPolicy=strict
# DOHTemplate=https://cloudflare-dns.com/dns-query
```
2. `systemctl restart systemd-resolved`
3. Verifikasi: `resolvectl status` tunjukkan "TLS" atau "HTTPS" di Current DNS Server.

**NetworkManager (GUI/TUI)**
1. `nm-connection-editor` → IPv4 → DNS → Masukkan IPs
2. DNS over TLS: "Yes" (butuh NM 1.32+)
3. Atau CLI: `nmcli con mod "Wired connection 1" ipv4.dns "1.1.1.1,1.0.0.1" ipv4.dns-over-tls yes`

**stubby (Standalone DoT)**
```bash
# Install stubby
# Edit /etc/stubby/stubby.yml dengan upstreams
# systemctl enable --now stubby
# Point /etc/resolv.conf ke 127.0.0.1 (atau konfigurasi dnsmasq)
```

**Pi-hole / AdGuard Home di Linux**
Sama seperti setup router. Best untuk local network + blocking.

### Browser (DoH Override)

Browser DoH bypass OS DNS. Berguna saat Anda tidak bisa kontrol OS (laptop kerja, device terkunci) atau mau provider berbeda per browser.

**Firefox**
1. Settings → General → Network Settings → Settings
2. Enable DNS over HTTPS → Pilih provider (Cloudflare, NextDNS, Custom)
3. Custom: `https://dns.nextdns.io/<config-id>` atau `https://cloudflare-dns.com/dns-query`
4. `about:config` → `network.trr.mode` = 3 (strict, no fallback)

**Chrome / Edge / Brave / Vivaldi / Opera**
1. Settings → Privacy & Security → Security → Use secure DNS
2. Pilih "With" → Pilih provider atau Custom
3. Custom: paste DoH URL
4. Flags untuk strict: `chrome://flags/#dns-over-https` → "Strict"

**Safari (macOS/iOS)**
Pakai system DNS (DoT via profile). No separate browser DoH setting.

**Tor Browser**
Pakai Tor network untuk DNS. JANGAN aktifkan DoH (pecah isolation).

## Verifikasi: Apakah Bekerja?

**Web Tests**
- `https://1.1.1.1/help` (Cloudflare)   tunjukkan protokol, TLS, DNSSEC
- `https://dnsleaktest.com/`   jalankan test standard dan extended
- `https://dns.nextdns.io/`   tunjukkan config Anda, protokol, enkripsi
- `https://quad9.net/test/`   halaman test Quad9
- `https://www.dns-oarc.net/oarc/services/dnsentropy`   test entropy

**Command Line**
```bash
# Cek resolver
dig @1.1.1.1 example.com +tls
# Atau dengan kdig (knot-dnsutils)
kdig @1.1.1.1 +tls example.com

# Cek system resolver
resolvectl query example.com  # systemd
scutil --dns  # macOS
Get-DnsClientServerAddress  # PowerShell

# Cek browser
# Kunjungi chrome://net-internals/#dns (Chrome)
# Kunjungi about:networking#dns (Firefox)
```

**Wireshark**
Capture di port 53 (harus nol), 853 (DoT), 443 (DoH). Verifikasi TLS handshake ke IP resolver.

## Konfigurasi Advanced

### Split Horizon (Lokal + Terenkripsi)

Anda mau encrypted DNS untuk internet, tapi resolusi lokal untuk `home.arpa`, `local`, `lan`, Pi-hole Anda, NAS Anda.

**systemd-resolved**:
```ini
[Resolve]
DNS=1.1.1.1
DNSOverTLS=yes
Domains=~home.arpa ~local ~lan
```
`~` berarti "route domain ini ke resolver lokal (127.0.0.53), sisanya ke upstream DoT."

**NextDNS / AdGuard Home / Pi-hole**:
Konfigurasi "Rewrites" atau "Local DNS" untuk domain LAN Anda. Set sebagai upstream untuk router. Router pakai DoT ke NextDNS. NextDNS resolve internet. Domain lokal di-resolve Pi-hole.

**Browser**:
Firefox `network.trr.excluded-domains` = `home.arpa, local, lan, your.local.domain`

### Multiple Profiles (Kerja / Personal / Anak)

**NextDNS**: Buat profiles: "Adults" (iklan/tracker diblokir), "Kids" (iklan + porn + gambling + media sosial diblokir), "Work" (minimal blocking). Install profile berbeda di device berbeda. Router pakai profile "Adults". Tablet anak pakai profile "Kids".

**AdGuard Home**: Multiple users dengan filter lists berbeda. Not se-polished NextDNS untuk per-device profiles.

**Router VLANs**: Pisahkan VLAN untuk Kids, IoT, Tamu, Main. Setiap VLAN DHCP point ke DNS berbeda (profile NextDNS berbeda, atau provider berbeda).

### VPN + Encrypted DNS

**VPN Tunnel**: Provider VPN mungkin push DNS mereka sendiri. Encrypted DNS di dalam VPN tunnel = double encryption (VPN + DoT/DoH). Bagus.

**Split Tunnel**: Beberapa traffic di luar VPN. Traffic itu pakai system DNS (encrypted kalau dikonfigurasi). Bagus.

**VPN Provider DNS**: Mullvad, IVPN, Proton, Windscribe offer encrypted DNS. Aktifkan di app. Kalau Anda trust VPN lebih dari standalone DNS, pakai VPN DNS.

**Self-Hosted VPN (WireGuard) + Pi-hole**: VPS jalanin WireGuard + Pi-hole. Device Anda connect ke VPS. Pi-hole resolve via DoT ke Quad9/Cloudflare. Anda kontrol full chain.

### Encrypted Client Hello (ECH)

ECH enkripsi SNI (Server Name Indication) di TLS handshake. Kombinasi dengan DoH/DoT, jaringan lihat hanya: encrypted DNS ke resolver IP, lalu encrypted TLS ke destination IP dengan encrypted SNI. Mereka tahu Anda bicara ke Cloudflare/Google/Quad9 untuk DNS. Mereka tahu Anda bicara ke beberapa IP untuk HTTPS. Mereka TIDAK tahu domain di kedua langkah.

**Support**: Cloudflare, Google, Quad9, NextDNS, Firefox (enabled by default), Chrome (behind flag), Safari (experimental). Butuh DNS HTTPS RR (SVCB) records.

**Aktifkan di Firefox**: `about:config` → `network.dns.echconfig.enabled` = true.

### Penanganan Captive Portal

Encrypted DNS pecah captive portal detection (hotel, bandara, kopi). Portal redirect DNS ke login page. DoT/DoH gagal atau timeout. Browser tidak bisa load portal.

**Solusi**:
- **Firefox**: `network.captive-portal-service.enabled` = true (pakai plaintext DNS untuk detection)
- **Chrome**: Automatic fallback (deteksi captive portal, disable DoH sementara)
- **Android**: Private DNS mode "Automatic" fallback
- **iOS**: Captive portal detection pakai plaintext DNS otomatis
- **Router**: Disable encrypted DNS sementara, atau pakai travel router dengan toggle (GL.iNet punya tombol)
- **Manual**: Disable Private DNS / DoH, autentikasi, re-enable

## Troubleshooting

**"DNS tidak resolve"**
- Cek hostname DoT/DoH resolve (chicken-egg). Pakai IP + verifikasi hostname.
- Firewall blokir 853 atau 443 ke IP resolver.
- Validasi sertifikat gagal (hostname salah, sertifikat expired, MITM).
- Provider down (jarang). Punya fallback.

**"Resolusi lambat"**
- DoH latency lebih tinggi dari DoT (koneksi baru). Pakai HTTP/2/3.
- Resolver jauh dari Anda. Pilih provider dengan POP lokal.
- Masalah IPv6. Disable IPv6 DNS kalau broken.

**"Host lokal tidak resolve"**
- Split horizon missing. Tambah exception domain lokal.
- Router DNS rebind protection blokir. Disable atau tambah exception.

**"Diblokir jaringan"**
- Port 853 diblokir. Switch ke DoH (443).
- DoH diblokir (DPI). Pakai DoH di path non-standard, atau pakai VPN/Proxy.
- SNI filtering. Pakai ECH atau VPN.

**"Android Private DNS tidak save"**
- Restriksi carrier/OEM. Pakai ADB atau third-party app (RethinkDNS).

## Tradeoffs Yang Anda Terima

**Shift trust**: Anda trust Cloudflare/Google/Quad9/NextDNS lebih dari ISP. Itu pilihan. Audit policy mereka. Watch untuk perubahan.

**Centralisasi**: DoH/DoT konsentrasi DNS di sedikit provider. Ini bikin target surveilans. Self-hosted mitigate tapi tambah beban operasional.

**Breakage**: Resolusi lokal, captive portals, split-tunnel VPN, beberapa enterprise network, parental control appliances, IoT devices dengan hardcoded DNS. Test environment Anda.

**Evasion blocking**: Encrypted DNS bypass network-level blocks (parental controls, corporate policy, government censorship). Ini feature untuk Anda, bug untuk mereka. Sadari implikasi policy/legal.

**Rasa aman palsu**: Encrypted DNS sembunyikan query. Dia TIDAK sembunyikan destination IPs (SNI masih visible tanpa ECH). Dia TIDAK sembunyikan volume/timing traffic. Dia TIDAK enkripsi konten (pakai HTTPS). Itu satu layer.

## Checklist Migrasi

**Minggu 1: Test**
1. Pilih provider (Cloudflare untuk speed, Quad9 untuk security, NextDNS untuk control).
2. Aktifkan DoH di Firefox. Browse seminggu. Catat breakage.
3. Jalankan dnsleaktest.com. Verifikasi no ISP DNS.

**Minggu 2: Level OS**
1. Aktifkan Private DNS (DoT) di Android.
2. Install 1.1.1.1 atau NextDNS app di iOS.
3. Konfigurasi Windows 11 native DoH/DoT.
4. Buat macOS/iOS profile untuk DoT.

**Minggu 3: Level Router**
1. Kalau router support DoT: aktifkan.
2. Kalau tidak: deploy Pi-hole/AdGuard Home di Raspberry Pi. Konfigurasi upstream DoT.
3. Point router DHCP ke Pi-hole.
4. Test semua device: telepon, laptop, TV, IoT.

**Minggu 4: Advanced**
1. Konfigurasi split horizon untuk domain lokal.
2. Setup NextDNS profiles untuk anggota keluarga.
3. Aktifkan ECH di Firefox.
4. Dokumentasikan config Anda (provider, hostnames, IPs, fallback).
5. Jadwalkan review kuartal: cek policy provider, test fallback, verifikasi logs.

## Bottom Line

Query DNS Anda adalah peta kehidupan digital Anda. Plaintext DNS serahkan peta itu ke setiap network yang Anda sentuh. Encrypted DNS masukin peta ke amplop tersegel yang diaddress ke resolver yang Anda pilih. Jaringan lihat amplop. Mereka TIDAK lihat peta.

Butuh tiga puluh menit enable di telepon dan laptop. Butuh satu jam deploy di router. Cost nol dollar (kecuali pilih NextDNS paid). Privacy gain immediate dan continuous.

Mulai dengan browser. Lalu telepon. Lalu router. Setiap step cover lebih banyak device. Setiap step kurangi jumlah entity yang pegang history browsing Anda.

Anda tidak bisa enkripsi seluruh internet. Tapi Anda bisa enkripsi pertanyaan yang memulai setiap koneksi. Lakukan hari ini.

> **Catatan editorial:** Policy provider, endpoints, dan fitur berubah. Verifikasi URL DoH/DoT terkini, hostname, dan privacy policy sebelum konfigurasi. Environment jaringan bervariasi; test thoroughly sebelum andalkan encrypted DNS untuk akses kritis. Beberapa yurisdiksi batasi encrypted DNS; pahami hukum lokal.