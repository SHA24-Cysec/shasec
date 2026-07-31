---
translationKey: "digital-evidence-collection-fraud"
title: "How to Collect Digital Evidence for Online Fraud to File a Strong Police Report"
date: 2026-07-24
draft: false
categories:
  - Cybersecurity
  - Guide
tags:
  - digital evidence
  - online fraud
  - police report
  - digital forensics
  - scam prevention
  - incident response
summary: "Practical guide to collect digital evidence for online fraud so your police report stands strong: forensic screenshots, transfer trails, chat headers, link preservation, and a timeline template investigators accept."
cover: "/images/articles/digital-evidence-collection-fraud.webp"
---

You realize you lost $150 after transferring to a fake shop. Seller gone, number inactive, website down. First step is not angry comments. First step is to secure evidence.

Investigators need verifiable evidence, not stories. This guide shows how you collect digital evidence neatly, defensibly, and in a form investigators understand, without destroying originals.

## Principles of valid digital evidence

Digital evidence changes easily. Screenshots can be edited. Chats can be deleted. Links can disappear. Investigators judge evidence by three things.

**Integrity.** Evidence stays unchanged since you saved it. You keep original file, not over-cropped edited version.

**Chronology.** Investigators look at time order. When you chatted, when you transferred, when account vanished.

**Traceability.** Investigators can trace owner of bank account, phone number, domain, and account.

Your job is not to become a forensic professional. Your job is to preserve trail before it disappears, in a way that keeps integrity.

## Tools you prepare in 10 minutes

You do not need expensive apps.

1.  Second phone or laptop for documentation.
2.  Empty cloud storage or specific folder on laptop named Evidence_Fraud_Date.
3.  Time note app: use automatic phone clock, do not change manually.
4.  Built-in screen recorder on phone to record scrolling chat.
5.  Password manager or secure notes to store links, transaction IDs, and file hashes.

Turn off beautify or filter when taking screenshots. Investigators need raw view, not filtered result.

## Step 1: Secure chat and social media of actor

Actors often delete accounts after getting money. Secure before that happens.

### Record screen from top to bottom

Open chat with actor in WhatsApp, Telegram, Instagram DM, or marketplace.

1.  Start screen recorder.
2.  Scroll slowly from first message to last. Hold 2 seconds on each important part.
3.  Show actor profile: tap photo, show username, phone number, bio, join date if available.
4.  Stop recording, save as `01_chat_record_YYYYMMDD_HHMM.mp4`.

Screen recording holds stronger than screenshot because it shows context and scroll process hard to fake.

### Forensic screenshots one by one

After recording, take screenshots.

- Each screenshot must show time and date in status bar.
- Include URL bar if chat is on web.
- Do not crop. Let app name stay visible.
- Save in order: `02_chat_01.png`, `02_chat_02.png`, etc.

On Android, show detail info in Settings. Important part: keep original screenshot without edit.

### Save actor profile links

Copy Instagram, TikTok Shop, Facebook, or marketplace store profile links. Save in text file `03_actor_links.txt`. Example format:

```
Platform: Instagram
Username: @cheap_electronics_shop99
Link: https://instagram.com/cheap_electronics_shop99
Accessed: 2026-07-24 14:32 WIB
Chat ID: 62xxxx
```

Use archive service like web.archive.org to save snapshot. Open https://web.archive.org, paste link, click Save Page. Save archive URL too.

## Step 2: Secure transfer and transaction evidence

This part is most critical for tracing.

### Bank or e-wallet transfer proof

1.  Open bank app, find mutation.
2.  Tap transaction, show detail: reference number, recipient name, amount, date, time.
3.  Screenshot detail.
4.  Download transfer proof PDF if bank provides.
5.  Export CSV mutation for last 7 days if possible.

Save as `04_transfer_bca_20260724_1435.pdf`.

If you used QRIS, save Merchant ID and Merchant Name shown in app. QRIS holds merchant trace.

If you used e-wallet like PayPal, Dana, OVO, screenshot transaction page plus email notification. Email notification often contains transaction ID not shown in app.

### Marketplace invoice or email

Screenshot invoice. Save confirmation email as .eml or forward to personal email. Do not delete original email. Original email holds full header.

In Gmail, open email > three dots > Show original > Download Original. The .eml file contains sender IP and server trail.

## Step 3: Secure fraud website or link evidence

Fraud website usually lives only few days.

1.  Open link in desktop browser, not only phone.
2.  Record screen process opening website until checkout page.
3.  Save page as PDF: Ctrl+P > Save as PDF.
4.  Screenshot WHOIS domain: open https://who.is, enter domain, screenshot registration date, registrar, and country.
5.  Screenshot SSL certificate: click lock in address bar, see issued to.

Many fraud sites use free .shop or imitation .my.id domains. WHOIS info helps investigators see pattern.

Do not try to hack back actor website. Focus on preservation, not retaliation.

## Step 4: Build clear written timeline

Investigators read hundreds of reports. Clear timeline speeds process.

Create file `05_timeline.txt` with this format.

```
Online Fraud Timeline
Reporter: Full Name as ID
Reporter Phone: 62xxxx
Date: 2026-07-24

08:15 - Saw cheap phone ad on Instagram @cheap_shop. Price $150.
08:20 - DMed actor, asked stock. Actor sent catalog via WhatsApp 62xxxx.
08:35 - Actor asked transfer to BCA account 1234567890 under name A. N. and promised receipt at 10.
09:00 - Transferred $150 via BCA Mobile. Ref ID 987654321.
09:05 - Sent transfer proof to actor.
09:30 - Actor no reply. Double gray check.
10:15 - Actor number inactive. Instagram account gone.
10:20 - Started collecting evidence and screen record.

Loss: $150
Method: Bank transfer
Platform: Instagram + WhatsApp
Actor account: BCA 1234567890 under A. N.
```

Write with time, not words like morning or afternoon. Time makes flow easy to verify with bank log.

Include your location during incident. Some reports need location for jurisdiction.

## Step 5: Keep file integrity

So evidence does not look edited, do simple steps.

1.  Do not edit photo. Do not add stickers, scribbles, or filters.
2.  If you need to redact ID or sensitive data, make copy. Keep original without redaction and copy with redaction separate. Name clearly: `original_` and `redacted_`.
3.  Create simple checksum. On Windows, right click file > Properties > note size and date. On Mac/Linux, run `sha256sum file.png` and save result in `06_checksum.txt`. Checksum proves file unchanged after that date.
4.  Backup all evidence to two places: laptop and private Google Drive folder, not shareable public link.

Avoid uploading evidence to social media. Public upload can be seen as personal data spread and damage legal process.

## Step 6: Prepare report package for police

Come to office with neat package speeds report acceptance.

Prepare physical and digital map.

**Physical map contains:**

- Copy of ID reporter
- Printed timeline (1-2 pages)
- Printed transfer proof (mini bank statement)
- Printed key screenshots (max 10 pages, pick clearest)

**Flashdisk or private Drive link contains:**

- Folder Evidence_Fraud_Date with all original files
- Combined PDF timeline + evidence

At front desk or cyber unit, ask for police report number. Note investigator name and contact number. Ask whether additional report to bank needed for account blocking.

## Platform-specific preservation techniques

Each platform needs different save method.

**WhatsApp:** Open actor chat, tap three dots > More > Export chat > Without media first to get txt. Then export again with media to get all photos. WhatsApp export keeps original date. Save both files. Do not delete chat after export. Archive only.

**Telegram:** Telegram has export via Desktop. Open Telegram Desktop > Settings > Data and Storage > Export Telegram Data. Choose only actor chat. Export result is JSON plus media folder. JSON keeps time metadata richer than screenshot.

**Instagram DM:** Open instagram.com on desktop, open DM, click info conversation, see profile detail. Screenshot plus copy profile link. Instagram does not give per-user DM export on mobile app, but you can request Download Your Information in Settings > Privacy > Download Data. Download file contains all DMs.

**Marketplace Shopee/Tokopedia:** Open order detail, screenshot order status, seller chat, and store info. Save order number and invoice. Marketplace keeps chat log on their servers, but you still save your version in case store gets deleted.

**Fraud website:** Besides Wayback Machine, use archive.today or archive.ph for second snapshot. Two archives stronger than one. Save HAR file too. In Chrome, open DevTools F12 > Network > reload page > right click > Save all as HAR with content. HAR file saves full request and response.

### How to save evidence on Android and iPhone without root

**Android:** Use file manager, create folder Evidence. Move screenshots and recordings to that folder. In Google Photos, turn off backup for Evidence folder so it does not auto-sync to public cloud that may compress. Compression damages metadata. Use Hash Checker app to create checksum if comfortable.

**iPhone:** iPhone screenshots keep metadata in Photos. Move to Files app > Evidence folder. Save screen recording in Files, not only Photos. When AirDrop to laptop, choose original, not edited result. On iPhone, do not use Markup to scribble original evidence. Use duplicate.

### Simple chain of custody for regular users

Professional forensics uses term chain of custody to record who handled evidence when. You can make simple version.

Create file `07_custody.txt`.

```
Custody Log
File: 04_transfer_bca_20260724.pdf
Obtained: 2026-07-24 09:15 from BCA Mobile on Redmi Note
Stored: Acer laptop, folder Evidence_Fraud_20260724
Backed up: Private Google Drive 2026-07-24 11:00
Accessed by: Myself only
SHA256 Hash: abc123...
```

Simple log like this shows you guard evidence in orderly way. Investigators respect neatness because it reduces doubt about editing.

## Example evidence package that helped investigation

A victim in Jakarta reported fake investment fraud $1000. Victim came with neat folder: 3-minute Telegram conversation screen recording, chat export, 4 transfer proofs with different references, domain WHOIS screenshot, and two Wayback archive links.

Investigators did not need to ask for data again. Report moved to investigation phase because all account references recorded. Destination bank could be frozen same day because victim reported within 6 hours.

Compare with another victim who only brought one transfer screenshot without time and without profile link. Report still accepted, but tracing takes longer because data incomplete.

Difference not in money value, but in completeness of evidence package. Neat package also helps bank hold process. Bank needs clear reference.

## Pre-visit checklist 10 minutes before going to police station

Print this checklist and tick one by one.

- [ ] Original ID and copy
- [ ] Written timeline with full time
- [ ] Original transfer PDF plus screenshot with reference
- [ ] Screen recording plus sequential screenshots
- [ ] Actor profile link plus Wayback archive link
- [ ] Checksum file and custody log
- [ ] Flashdisk containing evidence folder
- [ ] Note bank call center numbers and actor bank numbers
- [ ] Note old police report numbers if you reported similar case before
- [ ] Bring Rp10.000 stamp if needed for statement letter

Checklist helps you avoid back-and-forth due to missing docs.

## How to protect yourself after becoming victim

Fraud victims often become second target. Actors sell victim data to other actors with money return assistance mode.

Beware if new number claims to be police, bank, or fund recovery service asking admin fee. Police do not ask fee via personal transfer. Bank does not ask OTP.

Change main email password. Enable 2FA. Check whether your ID used for illegal lending via credit bureau or contact civil registry if needed. Fraud often continues to identity theft.

Educate family. Same mode often hits people in close circle because actor sees contacts or referral.

## Sources and official contacts for Indonesia context, adaptable globally

- [Patroli Siber Polri: patrolisiber.id](https://patrolisiber.id)
- [Cek Rekening Kominfo: cekrekening.id](https://cekrekening.id)
- [Kominfo Content Complaint: aduankonten.id](https://aduankonten.id)
- [OJK Consumer Complaint 157](https://www.ojk.go.id)
- For global readers: FTC ReportFraud.ftc.gov, Action Fraud UK, Scamwatch Australia

> **Editorial note:** This article is educational and defensive. Guide does not replace professional legal advice. Procedure per police station may differ. Bring original ID and supporting documents when reporting. Do not perform investigation that breaks law like doxing or illegal access.

## Frequently asked questions

### Is screenshot alone enough?

Screenshot helps, but screen recording and original files hold stronger. Combination of three gives context and integrity.

### How long does blocking fraud account take?

Depends on bank and report speed. Report within first 1-2 hours has higher chance to hold funds. After 24 hours, funds usually already moved.

### Must I come directly to police station?

Coming directly to police front desk or cyber unit with physical evidence gets processed faster than online report alone. Bring flashdisk with original files.

### How if actor uses e-wallet not bank account?

Still collect transfer evidence and transaction ID. Report to e-wallet CS with transaction ID. E-wallet has KYC system that can help trace account owner.

### Can I report to Kominfo without police report?

You can for content blocking, but police report strengthens block request and opens criminal path. Handle both.

### Why need to save email header?

Email header saves IP trail and sender server trail. Investigators use header to verify whether email indeed from official domain or spoofing.

### Does reporting fraud online cost money?

Police report costs no fee. Beware of parties asking admin fee to help disburse money back. That mode is second fraud.

### What is total cost to prepare evidence package?

Only time and storage. You do not need to pay any tool. Free archive services and built-in screen record are enough.

## Building a reusable evidence kit for family and small team

You can turn this guide into a one-page SOP for home or small office.

Create shared folder template named Evidence_Template with subfolders:

- 01_recordings
- 02_screenshots
- 03_links_and_archives
- 04_transfers
- 05_timeline
- 06_hash_and_custody

Put empty template files inside: timeline template txt, custody log txt, and checklist pdf. When incident happens, duplicate template and fill quickly. Template reduces panic and missing steps.

Train family with 15-minute drill every 6 months. Show how to start screen recorder, how to export WhatsApp chat, and how to save transfer PDF. Drill looks trivial, but it saves time under stress.

For small business that handles customer payments via QRIS, add procedure to screenshot Merchant Dashboard transaction daily. Daily export creates baseline that helps you prove which transactions are legit and which are fake.

Keep evidence kit offline on encrypted USB for sensitive cases. Encrypt USB with VeraCrypt or BitLocker. Store password in password manager.

Small preparation steps like these turn a chaotic fraud incident into a manageable incident response.

## Why preserving evidence also protects other potential victims

When you report with complete evidence, you help authorities block same account before it hits others.

Indonesian CekRekening database and similar anti-fraud databases rely on reports from people like you. Your report with bank account number, phone number, and domain creates entry others can check before transferring.

In 2025, Kominfo reported that early reports within hours allowed banks to hold over 12% of reported fraud funds before withdrawal. Percentage looks small, but hold for one case can save next ten victims because account gets flagged.

Your neat package also shortens investigator workload. Shorter workload means investigators can handle more cases.

So evidence preservation is not only about your loss. It is about community defense.
