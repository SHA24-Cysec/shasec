---
translationKey: "edr-endpoint-protection"
title: "EDR and Modern Antivirus: Choosing Endpoint Protection"
date: 2026-08-05
draft: false
categories:
 - Cybersecurity
tags:
 - EDR
 - antivirus
 - endpoint security
 - malware
summary: "A guide to evaluating antivirus, EPP, and EDR for laptops and PCs used for work and sensitive data."
cover: "/images/articles/edr-endpoint-protection.webp"
---

Antivirus, endpoint protection platforms (EPP), and endpoint detection and response (EDR) are related but different. Antivirus identifies malware. EPP adds prevention and device controls. EDR collects telemetry and supports investigation and endpoint isolation.

## Capabilities to compare

Look for behavioral detection, tamper protection, device isolation, USB controls, centralized management, support for your operating systems, and log export. A useful EDR should help answer: which process ran, which file was created, which connection occurred, and which account was used.

Do not judge a product by detection-count claims alone. Review update speed, false positives, rollback, support quality, telemetry privacy, and whether the license supports incident response.

## Endpoint baseline

Enable automatic updates, a firewall, disk encryption, screen lock, and non-admin accounts for daily work. Install software from official sources. Remove unused applications. Make sure backups are not permanently connected to endpoints.

## When a detection appears

Do not delete a file immediately if you need evidence. Record hostname, user, time, alert, hash, parent process, and connections. Isolate the device when the indication is active. From a trusted device, revoke sessions, rotate secrets used on it, and check other endpoints. Reimaging is safer than deleting one file when persistence is not understood.

## EDR limitations

EDR does not replace patching, MFA, backups, least privilege, or training. Sensors can also be bypassed when an attacker has administrator rights, a device is offline, or exclusions are too broad. Test alerts with safe scenarios and review exclusions regularly.

## Buying and operations checklist

- [ ] Every endpoint appears in the console.
- [ ] Tamper protection and policy lock are enabled.
- [ ] An administrator receives priority alerts.
- [ ] Device isolation has been tested.
- [ ] Every exclusion has a reason and expiry date.
- [ ] Reimage and recovery procedures exist.

## Sources

- [CISA: Ransomware Guide](https://www.cisa.gov/stopransomware/ransomware-guide)
- [NIST SP 800-61 Rev. 2](https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final)
- [NIST SP 800-83 Rev. 1](https://csrc.nist.gov/publications/detail/sp/800-83/rev-1/final)

> Note: Use a lab or safe test file. Never test active malware on a production device.


## Applying controls without disrupting operations

Make changes in stages. Record the starting state before changing configuration. Keep the owner, change time, and rollback method. This prevents a team from chasing an ideal configuration while putting a working service at risk.

Start with assets that affect money, identity, and customer data. Assign one owner, one reviewer, and one communication channel. After enabling a control, test it with a test account or non-production device. Check the result from both the user side and the log side.

### Create a comparable baseline

A baseline contains approved configuration, its owner, the last change time, and the reason for each exception. Store it in a restricted repository. Never store secrets, tokens, private keys, or customer data in the baseline. Screenshots help, but structured notes are easier to review.

### Treat exceptions as debt

Exceptions may be necessary for compatibility. Give every exception a reason, owner, risk, compensating control, and expiry date. Review exceptions in an operational meeting. An exception without an expiry becomes forgotten permanent configuration.

### Measure outcomes with simple questions

Ask whether the control reduces misuse, speeds detection, or limits incident impact. Measure time to notice a change, time to revoke access, accounts without MFA, alerts that received a response, and expired exceptions. These numbers help a business owner choose the next task.

### Protect reader and user privacy

A security control is not permission to collect unlimited data. Define purpose, limit access, and delete operational data when it is no longer needed. When a checklist touches customer data, involve the privacy owner and document the processing basis.

## Conclusion

Good defense has an owner, evidence, and a review schedule. Choose one change you can test this week, document the result, and move to the next asset.

> Editorial disclosure: This article was written for ShaSec from public documentation and defensive security practice. It does not endorse a specific vendor, ask readers to click ads, or promise that one control can prevent every incident.
