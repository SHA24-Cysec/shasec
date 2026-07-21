---
translationKey: "ransomware-readiness-smb"
title: "Ransomware Readiness for Small Businesses"
date: 2026-05-08
draft: false
categories:
 - Digital Safety
tags:
 - digital safety
 - privacy
 - online security
summary: "Reduce ransomware impact through backups, limited access, updates, and a response plan that can be practiced."
cover: "/images/articles/ransomware-readiness-smb.webp"
---

Ransomware encrypts your business data and then demands payment to unlock it. For a small business, a single attack can halt operations for days and drain money that simply is not there. What saves you is almost never the ransom, but a backup that did not get encrypted and access that was limited from the start.

## Why small businesses are targeted
Small businesses often hold valuable data (finance, customers) yet have thin protection: one admin account shared by many, no backups, and Remote Desktop exposed to the internet. Attackers know this profile and target it automatically. Readiness is not about expensive tools but about closing the gaps most often used.

## Practical steps for ransomware readiness
Build from what saves you most. Each step reduces the impact of one attack.

### 1. Apply 3-2-1 backup and test recovery
Keep at least three copies of your data, on two types of media, with one copy offline or offsite. A backup that stays connected can be encrypted along with the rest when ransomware spreads. More important: test recovery regularly. A backup never tested is hope, not assurance.

### 2. Limit privileges and close remote doors
Give admin rights to few people, and separate admin accounts from everyday work accounts. Disable Remote Desktop (RDP) exposed to the internet, or restrict it behind a VPN. Most small-business attacks enter through RDP with a weak password.

### 3. Update systems and install endpoint protection
Turn on automatic updates for operating systems and key applications. Install a modern antivirus, ideally with endpoint detection (EDR) that can block suspicious processes. Security patches close the holes ransomware uses to get in.

### 4. Segment the network and isolate critical machines
Separate the office network from production or finance networks. The machine holding bookkeeping or customer data should not sit on the same subnet as a general browsing computer. Segmentation slows the spread when one machine is hit.

### 5. Prepare a simple response plan
Write down who to contact, how to isolate a device (unplug the network cable), and where backups are stored. Run it once with the team. When an attack hits, alertness drops; a written plan keeps the response orderly under pressure.

## Example: a small shop saved by an offline backup
A small shop is hit by ransomware through a phishing attachment a staff member opens. Within hours, bookkeeping files and customer data are encrypted. Because the owner routinely backs up to an external hard drive that is unplugged after the job finishes, the owner can restore from a copy made the day before the attack. The shop stops for only one day. Without an offline backup, the owner would face a choice between ransom and data loss.

## If an attack hits
Isolate the infected device at once by unplugging the network cable or turning off Wi-Fi, but do not power off without thought, since evidence can be lost. Contact someone who can help with forensics and report to the authorities. Restore from a clean backup after the system is confirmed safe. Paying the ransom is generally not advised: there is no guarantee data comes back, and payment funds the next attack.

## Common mistakes to avoid
- **Paying the ransom as a shortcut.** Many pay and still receive no key.
- **Keeping backups always connected.** Ransomware that encrypts the system will also encrypt connected online backups.
- **Exposing RDP to the internet without protection.** This is the most common entry point for small-business attacks.

## Frequently asked questions

### Should we pay the ransom?
Not advised. There is no guarantee data is returned, and payment funds the next attack. Backup and recovery are the main path.

### How often should we back up?
Daily for active data, with at least one offline copy. What matters: test recovery regularly, not only create backups.

### Is antivirus enough?
Modern antivirus helps, but add EDR, routine updates, and backups. No single tool closes every gap.

## Sources and further reading
- [CISA:StopRansomwareGuide](https://www.Cisa.Gov/stopransomware/ransomware-guide)
- [CISA:SecureYourBusiness](https://www.Cisa.Gov/audiences/small-and-medium-businesses/secure-your-business)
> **Editorial note:** This article is educational and defensive. For an actual incident response, involve a professional and the authority that applies in your region.
