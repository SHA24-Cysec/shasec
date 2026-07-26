---
translationKey: "quantum-computing-cybersecurity"
title: "Quantum Computing and Cybersecurity: Why Your Encryption Could Become Fragile Within Years"
date: 2026-07-26
draft: false
categories:
 - Technology
 - Cybersecurity
tags:
 - quantum computing
 - post-quantum cryptography
 - encryption
 - harvest now decrypt later
 - NIST
 - digital security
 - cybersecurity
summary: "Quantum computers powerful enough to break RSA encryption don't exist today. But cybercriminals are already collecting your encrypted data now to decrypt later. Understand the harvest-now-decrypt-later threat and the concrete steps you can take."
cover: "/images/articles/quantum-computing-cybersecurity.webp"
---

A quantum computer powerful enough to break RSA encryption does not exist today. That fact leads many people to dismiss the quantum threat as distant. That assumption is wrong.

Cybercriminals are not waiting for quantum computers to be built. They are collecting encrypted data now. Data you send today through email, VPN, or cloud services may already be stored by parties waiting for quantum technology to mature. This strategy goes by the name *harvest now, decrypt later*.

NIST, the U.S. National Institute of Standards and Technology, finalized post-quantum encryption standards in August 2024. These standards cover ML-KEM (FIPS 203) for key exchange, ML-DSA (FIPS 204) for digital signatures, and SLH-DSA (FIPS 205) as a backup. RSA-2048 and ECC P-256 will be removed from NIST standards by 2035. Cloudflare shifted its target for full post-quantum security to 2029 following research breakthroughs from Google and Oratomic.

The DigiCert Quantum Readiness Outlook 2026, surveying 1,001 IT security leaders, found 87% of organizations are planning post-quantum cryptography migration, but only 7% have broadly deployed it. 84% of organizations believe at least some of their encrypted data is already vulnerable to harvest now, decrypt later attacks. The global cost of PQC migration is estimated at $15 billion, and the longer organizations delay, the more expensive it becomes.

This article explains why you need to pay attention to this threat now, not later.

## What Quantum Computers Are and Why Classical Encryption Faces Risk

Classical computers process information in bits: 0 or 1. Quantum computers use qubits, which can exist in a superposition of 0 and 1 simultaneously. This capability allows quantum computers to perform certain calculations far faster than classical machines.

Shor's algorithm, developed by mathematician Peter Shor in 1994, showed that a sufficiently large quantum computer could solve integer factorization in polynomial time. This problem underpins RSA, the encryption algorithm protecting most digital communications. The same algorithm threatens elliptic curve cryptography (ECC) and Diffie-Hellman, two key schemes used in TLS, digital signatures, and online banking.

Quantum computers large enough to run Shor's algorithm do not yet exist. The largest quantum processors today, such as China's Zuchongzhi-3 with 105 qubits, fall far short of what is needed. Experts project that a cryptographically relevant quantum computer (CRQC) will arrive in 15-25 years. But that estimate can shift. In April 2026, Cloudflare moved its target forward to 2029 after research breakthroughs.

## The Harvest Now, Decrypt Later Threat Is Already Happening

The core issue is not when quantum computers arrive. The core issue is that data you encrypt today will remain sensitive for years to come.

Consider a business contract that remains in force for 10 years. Medical records that must stay confidential for a lifetime. Financial data that provides competitive advantage for years. If this data gets intercepted today in encrypted form, and the interceptor waits until quantum computing can crack it open, your encryption protection ends when the math breaks.

NIST states in its transition guidance: "Encrypted data remains at risk because of the harvest now, decrypt later threat in which adversaries collect encrypted data now with the goal of decrypting it once quantum technology matures."

Who does this? Nation-state intelligence agencies and advanced cybercriminal groups. They have the resources to store data at scale and the patience to wait. Analysis shows that 98-100% of healthcare records and 95-100% of government-classified data encrypted today are candidates for retroactive decryption if intercepted.

## NIST's Post-Quantum Cryptography Standards

NIST completed its eight-year standardization process in August 2024. Three official standards resulted:

**ML-KEM (FIPS 203)**, formerly known as CRYSTALS-Kyber. This algorithm handles key encapsulation, providing key exchange secure against quantum attacks. ML-KEM replaces RSA and ECDH for key exchange.

**ML-DSA (FIPS 204)**, formerly known as CRYSTALS-Dilithium. This algorithm handles digital signatures. ML-DSA replaces RSA signatures and ECDSA.

**SLH-DSA (FIPS 205)**, formerly known as SPHINCS+. This is a hash-based backup scheme that does not depend on lattice-based mathematical problems. It serves as insurance in case weaknesses emerge in the lattice approach.

NIST also selected HQC (Hamming Quasi-Cyclic) as a secondary code-based key mechanism in 2025. FIPS 206 (FN-DSA, based on FALCON) is in progress and expected between 2026-2027.

## What Has Already Changed on the Internet

The transition to post-quantum encryption has begun. It is not a future plan.

By late October 2025, more than half of browser traffic passing through Cloudflare used post-quantum key exchange. Apple implemented PQ3, its post-quantum protocol, in iMessage before the end of 2024. Signal adopted PQXDH, a post-quantum key exchange protocol, in 2024. VPNs including Mullvad, ProtonVPN, and NordVPN already support ML-KEM in their tunnels.

Chrome and Firefox support TLS with post-quantum key exchange experimentally. These changes happen at the protocol layer invisible to ordinary users, but the impact is significant: data passing through these connections gains additional protection against harvest now, decrypt later attacks.

## Why This Matters to You

You might think: "I am not a nation-state intelligence target. Why should I care?"

First, you do not know who is storing your internet traffic. Every time you send data through public Wi-Fi, a cellular network, or a home connection, that data can be intercepted. Internet traffic surveillance is not rare. Interception devices can be installed at network infrastructure by various parties.

Second, data you consider unimportant today may become important later. Communication histories, health records, financial information, and even personal conversations hold value for whoever collects them.

Third, harvest now, decrypt later attacks do not require direct access to your device. Intercepting encrypted traffic as it passes through the network is sufficient.

## Concrete Steps You Can Take

### Use Services That Already Support Post-Quantum

The most direct action: switch to services that have implemented post-quantum encryption.

- **Signal** has used PQXDH since 2024. It is the most secure messaging application available to the public.
- **VPNs with ML-KEM**: Mullvad, ProtonVPN, and NordVPN already support post-quantum key exchange in their tunnels.
- **Browsers**: Make sure you use the latest version of Chrome or Firefox. Both browsers already support post-quantum TLS experimentally.

### Update Systems and Applications

Security patches for encryption-based systems are as important as any other software patches. Security vendors continue updating their cryptographic implementations. Make sure all your devices and applications receive regular updates.

### Check Your Service Providers

Cloud, email, and storage services you use need a post-quantum migration roadmap. If your provider has not addressed this topic, ask them. Services handling sensitive, long-lived data should be migration priorities.

### Store Sensitive Data with Layered Encryption

For data that must remain confidential for years, consider layered encryption. Encrypt files locally before uploading to the cloud. Use a password manager with strong encryption. Data that never crosses a public network faces no harvest now, decrypt later threat.

### Learn About Crypto-Agility

Crypto-agility is the ability of a system to switch from one cryptographic algorithm to another without replacing the entire infrastructure. For organizations, this means building systems that can accept new algorithms as standards change. For individuals, this means choosing services and software that demonstrate commitment to cryptographic updates.

## What Happens Next

The U.S. government issued an Executive Order in 2026 mandating a federal transition to post-quantum encryption. NSA's CNSA 2.0 requires PQC for new national security systems by 2027. NIST will remove quantum-vulnerable algorithms from its standards by 2035.

Cryptographic transitions in enterprise environments take 5-10 years. NIST itself describes 5-15 years as the realistic horizon. Organizations that start in 2030 may not have enough time.

For individuals, the timeline is more flexible but cannot stretch indefinitely. Every day that passes without post-quantum encryption means more data accumulating in the hands of parties waiting for Q-Day.

## Real Scenarios: How Your Data Could Be Threatened

To understand this threat concretely, consider the following scenarios.

### Scenario 1: Medical Records

You undergo a medical examination at a hospital that uses electronic systems. Lab results, diagnoses, prescriptions, and your medical history are sent to the hospital server through an encrypted connection. This data must remain confidential for decades.

If that connection is intercepted by parties applying the *harvest now, decrypt later* strategy, your medical data is stored in encrypted form. In 10-15 years, when quantum computers are powerful enough, that data can be unlocked. At that point, your health information could be used for extortion, insurance fraud, or sold on the dark market.

### Scenario 2: Business Communications

You send emails containing business strategies, contract negotiations, or trade secrets through encrypted email services. This information holds competitive value for years. If those emails are stored by parties waiting for quantum technology, your business secrets could be exposed when the encryption breaks.

### Scenario 3: Financial Data

Transaction histories, bank account information, and investment data are sent through encrypted connections every time you access online banking services. Financial data has a long sensitivity lifespan. Account information valid 10 years ago can still be used for identity theft or fraud today.

### Scenario 4: Blockchain and Cryptocurrency

Blockchain networks like Bitcoin face unique exposure. Entire transaction histories are public, permanent, and based on cryptography that quantum computers could eventually break. Unlike traditional databases, blockchain records cannot be deleted or retroactively encrypted. A Federal Reserve study warns that crypto assets protected by classical cryptography face long-term risk.

## Comparing Classical and Post-Quantum Encryption

To understand why this transition matters, here is a comparison of key characteristics:

**Classical encryption (RSA, ECC):**
- Based on integer factorization and elliptic curve discrete logarithm problems
- Secure against classical computers
- Vulnerable to Shor's algorithm on quantum computers
- Relatively small keys (2048-4096 bits for RSA)
- Widely supported by all devices and services

**Post-quantum encryption (ML-KEM, ML-DSA):**
- Based on mathematical problems hard for both quantum and classical computers (such as lattice problems)
- Secure against both classical and quantum computers
- Larger keys (several kilobytes)
- Supported by NIST standards since 2024
- Being adopted by major services

The key size difference means post-quantum implementations require more bandwidth and storage. But this difference is insignificant for most modern use cases. Cloudflare reports that the overhead of post-quantum encryption on their web traffic is "negligible" in terms of performance.

## What Happens Behind the Scenes

When you visit a website that supports post-quantum TLS, the following process occurs invisibly:

1. Your browser and the web server perform a cryptographic handshake
2. If both parties support post-quantum, they use ML-KEM for key exchange
3. The session is encrypted with a key generated from the post-quantum exchange
4. Data passing through this session gains protection against *harvest now, decrypt later* attacks

You do not need to do anything. This process happens automatically at the protocol layer. The only thing you need to ensure: your browser is updated to the latest version.

## Summary

Quantum computers that can break classical encryption do not exist today. But the threat is real because of the harvest now, decrypt later strategy. Data you encrypt now can be opened later.

## Resources for Further Information

**NIST Post-Quantum Cryptography (csrc.nist.gov).** Official source for post-quantum standards. Includes technical specifications and migration guidance.

**Cloudflare Research Blog.** Latest information on post-quantum implementation across the internet. Cloudflare is a pioneer in post-quantum adoption.

**Quantum Economic Development Consortium (quantumconsortium.org).** Consortium developing the quantum computing ecosystem and its security.

**PQShield (pqshield.com).** Company focused on post-quantum cryptography solutions. Their blog contains in-depth analysis of PQC transition.

## Frequently Asked Questions

### How long would it take a quantum computer to break RSA-2048?

Experts estimate that a quantum computer with 4,000 stable (logical) qubits would be needed to break RSA-2048 in a reasonable time. The largest quantum processors today have around 1,000 physical qubits, but physical qubits are not the same as logical qubits. It takes approximately 1,000 physical qubits to produce 1 stable logical qubit. This means roughly 4 million physical qubits would be needed to break RSA-2048.

### Is AES encryption also threatened?

AES (Advanced Encryption Standard) faces a smaller threat from quantum. Grover's algorithm, a quantum search algorithm, theoretically reduces AES security. AES-128 becomes equivalent to AES-64 in security against quantum. But AES-256 remains secure because its security only reduces to the equivalent of AES-128. So if you use AES-256, your data is relatively safe against quantum attacks.

### Are VPNs already safe from quantum attacks?

Not all VPNs are safe. Only VPNs that have implemented post-quantum encryption provide protection against *harvest now, decrypt later*. Mullvad, ProtonVPN, and NordVPN already support ML-KEM. VPNs that still use RSA or ECDH for key exchange remain vulnerable.

### Do I need to change all my passwords?

No. Passwords are not directly threatened by quantum computing in the same way as public key encryption. Passwords are protected by hashing (such as bcrypt or Argon2), which is not vulnerable to Shor's algorithm. But if your password is tied to a system that uses classical encryption for transmission, the data protected by that password could be threatened in transit.

### Is Bitcoin blockchain safe from quantum attacks?

Bitcoin uses ECDSA (Elliptic Curve Digital Signature Algorithm) for transaction signatures. ECDSA is vulnerable to quantum attacks. If a sufficiently powerful quantum computer becomes available, attackers could derive the private key from Bitcoin addresses that have already made transactions. Addresses that have never transacted (and therefore have not exposed their public key) are safer. The Bitcoin community is developing post-quantum solutions, but implementation is not yet complete.

### How do I check if my browser supports post-quantum TLS?

Chrome version 124 and above supports post-quantum key agreement by default. Firefox supports it through experimental settings. To check, open `chrome://flags` in Chrome and search for "post-quantum" or check whether connections to PQ-supporting sites use the appropriate algorithm.

## Action Checklist for Readers

Here is a summary of steps you can take now:

1. **Update your browser** to the latest version for post-quantum TLS support
2. **Use Signal** for post-quantum encrypted communication
3. **Choose a VPN with ML-KEM** (Mullvad, ProtonVPN, or NordVPN)
4. **Check your cloud service provider** for post-quantum migration plans
5. **Encrypt sensitive data locally** before uploading to the cloud
6. **Monitor developments** in post-quantum standards from NIST
7. **Update router firmware** and network devices
8. **Use a password manager** with strong encryption

Each step above reduces the window of vulnerability your data faces. You do not need to do everything at once. Start with the easiest actions and improve gradually.

## Final Summary

The transition to post-quantum cryptography is not a single event. It is a gradual process that has already begun and will continue for years. Every step you take now reduces the window of vulnerability your data faces.

Start with the easiest actions: update your browser, use Signal, choose a VPN with ML-KEM. Then check your service providers and make sure they have a post-quantum migration plan. Your data is too valuable to leave waiting for Q-Day without protection.

NIST has finalized post-quantum standards. The technology is available. Popular services have already adopted it. The transition has begun across the internet.

You do not need to become a cryptographer. Start with practical steps: use Signal, choose a VPN with ML-KEM, update your browsers, and check your service providers. Each small step reduces the window of vulnerability your data faces against this evolving threat.

> **Editorial note:** Quantum computing and post-quantum standards evolve rapidly. This article reflects conditions at the time of writing. Check the latest developments from NIST and your security vendors. Adjust protective measures to your needs.
