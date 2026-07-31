---
translationKey: "pdp-breach-notification-umkm"
title: "PDP Breach Notification 72-Hour SOP for Small Business: Template and Checklist"
date: 2026-07-05
draft: false
categories:
  - Cybersecurity
  - Compliance
tags:
  - Indonesia PDP Law
  - data breach
  - 72 hour notification
  - small business
  - compliance
  - SOP
summary: "Practical SOP for 72-hour personal data breach notification under Indonesia PDP Law for small business: when you must report, to whom, what to include, customer email template, and audit documentation checklist."
cover: "/images/articles/pdp-breach-notification-umkm.webp"
---

Indonesia PDP Law 2022 requires data controllers to report personal data breach to authority within 72 hours since awareness. For small business managing thousands customer data, duty is not theory. Administrative fine and reputation at stake.

Many small businesses have no SOP. When breach happens, owner confused what must be reported, to whom, in what language. This article gives practical 72-hour SOP you can use directly, with templates.

## Brief legal basis you need to know

Law No 27 of 2022 on Personal Data Protection article 14 and 46 regulates notification duty.

Key points:

- **Must report within 72 hours** since controller aware of personal data breach.
- Report to authority (Personal Data Protection Institution to be established) and to data subjects if high risk.
- Notification content must be clear: data type, number subjects affected, impact, steps done, DPO contact.
- Administrative sanctions: written warning, termination of processing, data deletion, fine up to 2 percent annual revenue.

Technical derivative rules still in process, but 72-hour principle refers to GDPR already global practice. If you comply with GDPR 72-hour principle, you ready for Indonesia rule.

## What counts as data breach

Not all incidents are data breach.

**Breach must be reported:**

- Customer database of online shop downloaded by hacker and circulating in forum.
- Excel file containing ID and phone numbers uploaded to public Google Drive shareable due to misconfiguration.
- Mass email to customers with CC not BCC, so customer email addresses visible to all.
- Admin laptop lost and not encrypted, containing 5,000 customer data.
- Ransomware encrypting server and actor demanding ransom threatening to spread data.

**Not breach must be reported (but still fix):**

- Failed login attempts blocked by WAF and no data access success.
- Phishing email arrives but no one clicks and no data leaves.
- Server down due to hosting maintenance, not breach.

Key: is there unauthorized access to personal data or permanent loss of personal data? If yes, breach category.

## Data types making high risk

Not all data same risk.

**High risk:** National ID, ID photo, selfie, biometric, password hash, financial data (bank account, card), child data, health data.

**Medium risk:** Email, phone, home address, birth date, shopping history.

**Low risk:** Nickname alone without other data.

If your breach contains ID plus ID photo, you must notify data subjects as soon as possible, not only authority. Because ID can be used for illegal loans and SIM swap.

## Team and roles you need for small business

You do not need 20 people team. Enough 3 roles.

**Incident Chief:** Owner or ops manager. Task decide when declare breach and when report.

**Technical:** Person managing website/hosting. Task isolate server, collect logs, close gap.

**Communication:** CS admin. Task contact customers and answer questions.

If you only 2 people, double roles. Important note who decides what and at what time.

Note emergency contacts: hosting support, website developer, legal consultant if any, and bank call center numbers if financial data involved.

## 72-hour SOP step by step

### Hour 0-1: Detection and triage

You get alert from hosting: weird file, or customer reports getting loan SMS under your shop name.

1.  Note detection time. Time becomes 72-hour baseline.
2.  Verify whether truly breach. Check access logs, files, accounts.
3.  Determine what data type affected and estimate number subjects. Example: 1,200 rows customer data with name, email, phone, address.
4.  Do not delete logs. Save original logs.

### Hour 1-4: Isolation and securing

1.  Isolate affected system: turn off public access, change hosting password, revoke leaked API keys.
2.  Backup logs and affected files to safe storage for forensics.
3.  Close gap used for entry, example update plugin or remove access of resigned employee still having account.
4.  Document all steps with time.

### Hour 4-24: Impact assessment and evidence collection

1.  Make list: what data, how many people, data source, whether high risk data.
2.  Assess risk: can data be used for identity fraud? Any child in data?
3.  Prepare draft notifications to authority and to customers.
4.  Brief legal consult if you have. If not, use templates in this article.

### Hour 24-72: Official notification

1.  Send initial notification to authority within 72 hours even if investigation not finished. Initial notification can be completed later.
2.  If high risk, prepare notification to affected customers with clear language without jargon.
3.  Prepare channel for customer questions: dedicated email `security@yourshop.com` or dedicated WA number.
4.  Save proof of notification sending: screenshot sent email, logs.

After 72 hours: further investigation, remediation, and closing report.

## Content of notification to authority required

Per GDPR and draft PDP rules, notification must include:

1.  Data controller identity: small business name, address, DPO contact.
2.  Time of incident and time of detection.
3.  Personal data types affected: email, ID, etc.
4.  Estimated number affected subjects.
5.  Likely impact: spam, phishing, identity theft.
6.  Steps already done: isolation, password change, gap closing.
7.  Steps to be done: notification to subjects, security fixes, audit.
8.  Contact for further info.

Use formal and clear Indonesian language.

## Template notification to authority (initial 72-hour version)

```
To,
Personal Data Protection Institution / Relevant Authority

Subject: Initial Notification of Personal Data Breach – PT Toko Saya Shop

We, PT Toko Saya Shop, address Jl. Example No 123 Batam, email dpo@tokosaya.com,
hereby notify suspected personal data breach we detected on:

Detection time: 2026-07-05 08:00 WIB
Estimated incident time: 2026-07-04 22:00 – 2026-07-05 05:00 WIB
Affected system: WordPress website tokosaya.com at XYZ hosting
Affected data types: Name, email, phone, shipping address (1,200 subjects)
                        No ID, KTP, or card data (we encrypted those)
Potential impact: Spam risk and phishing attempts impersonating shop
Steps already done:
- Isolation of website, change of hosting and admin WordPress password at 09:00
- Closing vulnerable plugin (XYZ plugin old version)
- Backup of logs and files for analysis
- Blocking actor IP in WAF

Next steps:
- Notification to affected customers within next 24 hours via email
- File and user audit, reset all admin sessions
- Changing API keys and enabling mandatory 2FA for all admins

DPO Contact: Budi, dpo@tokosaya.com, Phone 62xxx

This notification will be completed with detailed report within next 72 hours.

Regards,
PT Toko Saya
```

Keep template in Google Docs ready to use.

## Template notification to affected customers

Language to customers must be empathetic, clear, not hiding.

```
Subject: Important Information – Data Security at TokoSaya

Hello [Customer Name],

We found security incident on July 5 2026 affecting your data.

What data affected:
- Name, email, phone, shipping address you used shopping at TokoSaya
- No ID, password, or credit card data (those encrypted and not affected)

What we already did:
- Closed security gap and secured website
- Reported incident to relevant authorities
- Enabled monitoring and 2FA for all admins

What you need to do:
- Beware of email or WA impersonating TokoSaya asking transfer or OTP
- Change password if you use same password in other services
- Contact us at security@tokosaya.com if you get suspicious messages

We apologize for this incident and commit to improve security.

Thank you,
TokoSaya Team
security@tokosaya.com | WA 62xxx
```

Do not use convoluted legal language. Customers do not understand articles. They need to know what leaked and what to do.

## Documentation for audit

Authority will ask proof that you have SOP and run it.

Keep folder `PDP_Breach_20260705` containing:

- Timeline with full time
- Original access logs (do not edit)
- Screenshot isolation steps (password change, WAF block)
- List affected data (number, type, without full personal data in initial report)
- Proof notifications to authority and customers (email logs, screenshots)
- Remediation actions (plugin update, 2FA, user audit)

Keep at least 2 years. This is accountability evidence.

## Prevention to avoid breach again

After incident, do hardening.

1.  Update WordPress, plugins, themes weekly.
2.  Enforce mandatory 2FA for all admins and delete inactive admins.
3.  Encrypt sensitive data in database, not plain text.
4.  Backup 3-2-1 and test restore.
5.  Limit access: cashier only sees orders, cannot bulk export customer data.
6.  30-minute training each month about phishing and password.

Hardening cost cheaper than fines and loss of customer trust.

## Readiness checklist for PDP for small business before breach

Do before breach happens.

- [ ] Do you know what data you store and where?
- [ ] Do you have DPO or data person in charge, even owner yourself?
- [ ] Do you have written 72-hour SOP and tested simulation?
- [ ] Is hosting and plugin auto-update or manually scheduled?
- [ ] Is sensitive data encrypted and backup tested?
- [ ] Do employees know difference CC and BCC when sending mass email?
- [ ] Do you have customer and authority notification templates?

If 3 of 7 not yet, start this week.

## Sources and regulations

- [Law No 27 of 2022 on Personal Data Protection](https://peraturan.bpk.go.id/Details/229557/uu-no-27-tahun-2022)
- [GDPR Article 33 - Notification of personal data breach](https://gdpr.eu/article-33-notification-of-a-personal-data-breach/)
- [CISA: Data Breach Response Guide](https://www.cisa.gov/topics/cybersecurity/best-practices)
- [Kominfo: PDP Guide](https://www.kominfo.go.id)
- [ENISA: Data Breach Notification](https://www.enisa.europa.eu/topics/data-protection)

> **Editorial note:** This article is general guidance, not specific legal advice. For cases with large sensitive data or high risk, consult PDP legal consultant. Keep SOP documentation as compliance evidence.

## Frequently asked questions

### Must small business report 72 hours?

Yes. PDP Law does not differentiate small and large corporations as data controllers. Duty remains, though scale and fine proportional.

### To whom report in Indonesia now if PDP institution not yet exists?

While institution being established, report to Kominfo, BSSN for cyber incidents, and document internally as evidence. Also report to customers if high risk. Monitor updates about PDP institution establishment in Kominfo official news.

### Must report if only 10 data leaked?

Still report if high risk data or usable for identity fraud. Small number does not erase duty if impact high.

### Is mass email CC data breach?

Yes if showing other subjects personal data without consent. Example CC showing other customer emails. That is confidentiality breach. Counts as breach requiring notification evaluation.

### How if breach due to hosting vendor?

You as data controller remain responsible. You must report and show you chose vendor reasonably and have contract clear about security. Ask incident report from vendor for attachment.

### Should apologize in customer notification?

Yes. Sincere apology and clear actions done builds trust. Avoid language blaming vendor or hacker without showing remediation steps.

### How long keep breach documentation?

At least 2-5 years per retention policy and audit need. Store in safe encrypted storage with limited access.

### Does notifying customers increase panic?

Clear, empathetic notification with action steps reduces panic compared to customers discovering breach themselves via spam. Transparency faster than cover up found later.



## Tabletop exercise simulation 1 hour for small business

Invite 3 people: owner, tech, CS. Create scenario: website yourshop.com defaced at 10 PM, data 1,200 customers leaked.

Run simulation:

- Hour 0: Who detects? How to note detection time?
- Hour 0-1: Who isolates website? How to backup logs?
- Hour 1-4: Who assesses impact? What data leaked? High or medium risk?
- Hour 4-24: Who drafts notification? Which template used?
- Hour 24-72: Who sends notification to authority and customers?

Note time each decision. Evaluate what slow. Often slow at impact assessment because not knowing what data stored where.

1-hour simulation every 6 months cheaper than panic during real breach.

## How to create simple data inventory for small business

Make sheet with columns:

- System name (WordPress, Google Sheet, Excel)
- Data type (name, email, ID, address)
- Number subjects
- Storage location (hosting XYZ, Drive, laptop)
- Encryption (yes/no)
- Retention (how long keep)
- Access (who can access)

Inventory helps during breach, you quickly know what leaked without searching files.

Example: if inventory shows ID stored in Excel without encryption on admin laptop, you know high risk and must notify fast.

Update inventory every 3 months or when adding new system.

## Mistakes making PDP fine larger

No written SOP. During audit, authority asks your SOP, you have none. Considered negligence.

Deleting logs after breach to cover trace. Worsens situation and considered obstructing investigation.

Customer notification using language blaming hacker without showing remediation steps. Customers think you not responsible and report to media.

Keeping customer data forever without retention. PDP Law requires deletion after purpose finished. If you keep data 5 years without reason, violation of minimization principle.

Not noting detection time and notification time. Authority evaluates whether you reported within 72 hours from time evidence. Without time notes, hard to prove compliance.




## Additional FAQ and advanced mitigation

Many ask whether solutions are free. Most are free, some need small fee. Firefox Relay free 5 aliases, SimpleLogin free 15, iCloud Hide My Email needs iCloud+ $0.99. For small business, €30 per year for custom domain worth time saved.

Does this hold against advanced attacks? No solution 100 percent. But alias, passkey, IoT isolation reduce 80 percent opportunistic attacks that become majority of small business incidents. Targeted APT attacks need deeper defense.

How if employees refuse new SOP? Education with real examples more effective than force. Show case of Bali cafe rating dropping because fake QR, or Jogja boarding house CCTV video leak. Real cases make people care.

Do you need expensive consultant? For small business with customer data under 10k, 1-page SOP plus monthly checklist enough. Consultant needed if you manage sensitive data like national ID, ID photo, or big financial data and need DPIA per PDP law.

How to measure success? Count simple metrics: spam per week, failed login attempts, number IoT devices updated. Note in sheet monthly. If numbers go down, SOP works.

One principle: security not one-time project, but monthly habit 10-30 minutes. Consistency more important than expensive tools.



Additional checklist: check whether password manager backup encrypted in cloud, check whether IoT device still has Telnet port 23 open, and check whether email alias still forwards correctly. Three checks take 5 minutes but prevent 3 main attack vectors: credential leak, botnet, and mail misdelivery.

For small business, make calendar reminder every Monday morning: check admin logs, check backup, check updates. Automatic calendar more effective than memory.

Customer education also part of responsibility. Put small poster at cashier: "We never ask OTP via WhatsApp, beware fake QR". Physical poster reminds customers and reduces fraud victims impersonating your shop.

Finally, simple 1-page documentation stored in shared Drive more useful than 20-page doc unread. Start with 1 page, then improve monthly based on incidents or simulations.



Additional checklist: check whether password manager backup encrypted in cloud, check whether IoT device still has Telnet port 23 open, and check whether email alias still forwards correctly. Three checks take 5 minutes but prevent 3 main attack vectors: credential leak, botnet, and mail misdelivery.

For small business, make calendar reminder every Monday morning: check admin logs, check backup, check updates. Automatic calendar more effective than memory.

Customer education also part of responsibility. Put small poster at cashier: "We never ask OTP via WhatsApp, beware fake QR". Physical poster reminds customers and reduces fraud victims impersonating your shop.

Finally, simple 1-page documentation stored in shared Drive more useful than 20-page doc unread. Start with 1 page, then improve monthly based on incidents or simulations.
