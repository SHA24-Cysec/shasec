---
translationKey: "nfc-contactless-skimming"
title: "NFC Contactless Skimming in Indonesia: How Tap-to-Pay Cards and e-Money Get Targeted and How You Protect Them"
date: 2026-08-01
draft: false
categories:
  - Financial Security
  - Privacy
tags:
  - nfc
  - contactless payment
  - tap to pay
  - skimming
  - e-money
  - flazz
  - qris tap
  - rfid protection
summary: "Tap your card and go sounds fast, but NFC wireless also opens a skimming window. Learn how contactless cards and e-money work, what an attacker can and cannot steal, and the exact steps you take to protect your wallet in Indonesia."
cover: "/images/articles/nfc-contactless-skimming.webp"
---

You tap your BCA Flazz at the gate. You tap your Mandiri e-Money at the toll. You tap your BNI TapCash at the minimarket. The reader beeps. The gate opens. The transaction finishes in less than a second.

That speed comes from NFC, Near Field Communication. Your card and the reader talk over radio at 13.56 MHz. The card never leaves your hand. The wireless link makes payment fast. The wireless link also creates questions you should answer for your own wallet. What does the card broadcast. Who can listen. What can a person with a hidden reader steal in a crowd. What can they not steal. And what steps reduce risk without giving up tap convenience.

This guide answers those questions for daily use in Indonesia. You learn how NFC payment works, where skimming risk is real, where fear outpaces fact, and what you do today with cards, phones, and wallets you already own.

## How NFC tap-to-pay works under your card

Your contactless card holds a small copper antenna and a secure chip. The chip stores a payment token, an expiry date, and a cryptogram generator. The chip has no battery. The reader powers the chip for a moment with an electromagnetic field.

You bring the card within 2 to 4 centimeters of the reader. The reader field powers the chip. The chip wakes and sends a one-time cryptogram for that transaction. The reader forwards that cryptogram to the bank network. The bank checks the cryptogram and approves or declines the payment.

Three details matter for security.

First, the card never sends your PIN over NFC. You enter the PIN on the terminal or you skip the PIN for low-value transactions under the issuer limit.

Second, the cryptogram changes each time you tap. A recording of one tap does not give an attacker a replay that the bank accepts. The bank expects a fresh cryptogram with a fresh counter.

Third, NFC range is short by design. You need proximity. The antenna must sit close and aligned. A reader 10 centimeters away struggles to power the chip. A reader across the room cannot.

Phone-based tap such as Apple Pay, Google Pay, or Samsung Pay adds another layer. Your phone stores no raw card number on the NFC chip. Your phone stores a device token. Your phone also requires biometric or passcode to authorize the tap. A locked phone does not broadcast payment data.

## What attackers can and cannot steal with a hidden reader

You stand in a crowded TransJakarta bus. A person brushes past with a bag that hides a reader. What happens.

The hidden reader can power a card in your pocket if the card sits within 3 to 4 centimeters and the wallet does not block the signal. Leather or fabric alone does not block the signal. Metal, foil, or a designed RFID sleeve does.

If the reader succeeds, the reader captures data the card broadcasts for that transaction attempt. For a standard Visa or Mastercard contactless card, that data can include the card number, expiry date, and a one-time cryptogram and transaction counter. Some Indonesian e-money cards such as Flazz or e-Money broadcast card balance and recent transaction log without cardholder name.

The attacker cannot capture your CVV, your PIN, or your name from most contactless payment cards in the way they appear on the magnetic stripe. Indonesian e-money products also store no cardholder name on the chip. The attacker cannot clone a working chip from that single tap capture because the cryptogram is single-use and the card needs a secure element to generate the next valid one.

Risk shifts when you consider relay attacks. In a relay attack, two attackers work as a pair. Attacker A stands near you with a reader. Attacker B stands near a real payment terminal. A streams your card data to B in real time. B taps at the terminal while you stand far away. The card you carry thinks it talks to a reader nearby, but the transaction completes at a distant shop. Relay works even with one-time cryptograms because the real card generates the fresh cryptogram for the real terminal through the relay link. Distance still limits the first hop, and you and the terminal need to be targeted at the same moment.

Bank research in 2024 and 2025 tested relay on emulated setups. Teams powered cards through wallets and through jeans pockets, and they succeeded only at very short gaps and with careful antenna alignment. Teams failed through metal wallets and failed at 7 centimeters. Practical relay in a busy market requires skill, equipment, and timing. It is possible, but you see far more NFC fraud through lost or stolen cards than through covert wallet reading.

## The Indonesian context: Flazz, e-Money, TapCash, Brizzi, and QRIS Tap

Indonesia uses stored-value cards with chip and NFC more than many countries use open-loop Visa tap. You carry Mandiri e-Money, BCA Flazz, BNI TapCash, or BRI Brizzi for tolls, parking, and commuter line gates. These cards hold value on the card itself, offline. You top up at an ATM or at Indomaret, you tap to deduct.

These cards show different data when a reader queries them. Researchers at Indonesian security communities and campus labs in 2023 to 2025 read e-Money and Flazz with off-the-shelf ACR122U readers and phone NFC. They saw card ID, balance, and last 10 to 20 transaction records. They saw no full name, no address, no bank account link.

That offline balance and log carry privacy risk more than direct money theft. A person who reads your card in a queue learns where you tapped last and how much balance you hold. A person who bumps you twice could estimate your daily route between toll gates. The money theft path still requires the card to authorize a payment at a real terminal, and the terminal and acquiring bank log merchant ID, time, and amount. A merchant who accepts relayed payments without scrutiny leaves a trace.

QRIS Tap, launched wider in 2024 to 2025, changes the mix. You tap your phone that holds a QRIS token over NFC. The phone token links to your source of funds. QRIS Tap uses tokenization similar to Apple Pay. The phone does not broadcast raw bank account numbers.

Indonesian banks set contactless limits for open-loop cards. Above the limit, the terminal asks for PIN or tells you to insert the chip. That PIN request blocks a hidden low-value relay from becoming a high-value drain without the PIN.

## Test your own cards without buying lab gear

You can check what your card broadcasts with tools you already own.

Take your Android phone. Turn on NFC. Install a reader app such as NFC Tools, TagInfo by NXP, or Credit Card Reader (free versions exist, check permissions before install). Tap your card to the phone back. The app shows tag type, card ID, and available records.

You see one of two patterns. A payment card shows a payment application identifier and a tag that the app labels as EMV. An e-money card shows a stored-value applet and a balance field. You see no PIN. You see no CVV.

Put the card in the wallet you use every day. Try again through the wallet. Note how distance changes the read. Try again with another card stacked on top. The read range shrinks. Try again with your RFID sleeve or foil pouch. The read fails. That simple test shows you what a hidden reader faces in a crowd.

iPhone restricts direct card data reads through the same apps, but you can still use iPhone to test Apple Pay behavior. Set up the card in Wallet, hold the phone near a reader without unlocking, and note that the phone asks for Face ID. The lock gate is the point.

## Seven steps you take to keep tap convenience and cut risk

You do not need to disable NFC or wrap every card in foil. You need a few habits that fit your daily routine.

### 1. Use your phone token instead of the plastic card for open-loop payments

Add your Visa or Mastercard contactless card to Google Pay or Apple Pay. Pay with the phone. The phone uses a token and requires biometric before the NFC field turns on. An attacker near your pocket gets no data from a locked phone. Your bank also lets you lock the token from the banking app if you lose the phone.

Keep the plastic card for toll gates or for e-money where phone tap is not yet accepted.

### 2. Carry stored-value cards separate and shielded only when you need it

E-money cards at commuter gates need fast access, so you carry the active card at the front of your wallet or in a card holder. Put other cards you do not tap daily in a sleeve with RFID blocking. You do not need a full RFID wallet for every slot. A single sleeve for backup cards is enough.

A well-built sleeve uses a metal fiber layer. Test it once with your phone. If your phone cannot read the card through the sleeve, the sleeve works.

### 3. Set low contactless limits and turn on every notification

Open your bank app. Find card controls. Set a per-transaction contactless limit that matches your use. For daily minimarket use you can set 500 thousand rupiah. For toll and parking you rarely need more.

Turn on transaction notifications for every debit, not just above a threshold. You spot a strange tap within seconds. You freeze the card from the app before a second tap.

### 4. Keep cards apart and face metal toward the outside

Two cards stacked directly together interfere with each other. A hidden reader struggles to select one. If you carry Flazz and e-Money, place a non-NFC card or a metal card separator between them. Some commuter regulars place the active tap card in a separate outer slot. That slot taps fast at the gate and stays away from other chips when you walk.

### 5. Lock lost cards fast and know the reversal flow

If you lose a contactless card, you do not wait to see if someone used it. You lock the card in the app, call the bank call center, and request a block. For stored-value cards, the balance stays on the lost chip, and recovery is hard. For bank debit or credit contactless, the bank can dispute taps you did not authorize. Keep a photo of the card number and call center in a secure note. You need that when the plastic is gone.

### 6. Handle PIN and terminal behavior with intent

At a minimarket, you do not hand your card to the cashier to tap out of sight. You hold the card and tap yourself. You watch the amount on the terminal before you tap. You cover the keypad when you enter PIN for above-limit taps. A tap that fails twice and then the cashier asks you to insert and enter PIN is normal. A tap that the terminal forces to PIN on a small amount can still be normal if the terminal reached its offline counter, but you can ask why.

### 7. Update your phone and review tap app permissions

NFC attacks on phones rarely target the radio. They target the app that handles tap data. Keep Android or iOS updated. Keep your banking apps updated. Review which apps hold NFC permission on Android under Settings > Apps > Special access > NFC. Few apps need NFC. Remove the permission from any app that has no reason to hold it.

## What you do if you suspect a skim or a relay

You notice a small tap you did not make. Or you notice a commuter gate log that does not match your travel. Act in this order.

First, lock the card. Use the bank app toggle. If the app has a freeze feature, use it. That stops the next tap instantly.

Second, screenshot the notification. Note time, amount, merchant name, and location. For e-money, open the bank or e-money app and screenshot the last transactions list and balance. You need that record for a dispute.

Third, call the bank. Ask for the dispute channel. For bank debit or credit cards, the bank opens a dispute and issues a replacement card. For stored-value cards, ask if the issuer can block the card ID from future top-ups or gate use. Some issuers can blacklist the ID.

Fourth, check other cards. If one card had contact, other cards in the same wallet had the same contact. Check their transaction lists.

Fifth, replace the wallet setup. Move the remaining cards to a sleeve, lower limits, and switch open-loop payments to phone token.

You do not need to file a police report for a 50 thousand rupiah gate tap, but for larger amounts file and attach the screenshot and the bank dispute number. In Indonesia, you file at SPKT or through the bank fraud channel that forwards to the bank internal fraud team.

## Myths that waste money and facts that save it

You see ads for RFID blocking cards, wallets, and underwear. Some work, some confuse you. Clarify with tests.

**Myth: All NFC cards broadcast your name and address.** No. Indonesian stored-value cards store card ID, balance, and logs. Open-loop payment cards store card number and expiry for the transaction flow, but not your street address. Your phone token stores even less.

**Myth: A reader can steal money from your card through your jeans from one meter away.** No. NFC range caps at a few centimeters through air. Through fabric the range does not grow. Through a stacked wallet the range shrinks. A one-meter read against a passive card breaks physics without a large custom antenna that does not fit in a pocket.

**Myth: An RFID blocking card that says it jams protects two cards on each side.** Sometimes the jamming card does block reads for nearby slots, sometimes it interferes with your own gate tap. Test with your phone. If the phone still reads the card next to the jammer, the jammer does not block.

**Fact: Tokenization on phones beats sleeve protection.** A phone that requires Face ID before NFC activation adds an active gate. A sleeve adds a passive barrier you must remember to use. Use both if you want, but prioritize the active gate.

**Fact: The biggest contactless loss path in Indonesia stays simple.** People lose a card or leave a card unblocked after loss. Someone finds it and taps for small amounts at convenience stores until the owner blocks it. That path accounts for more fraud value than covert reading, per bank internal disclosures shared at local fintech security briefings in 2024.

## A quick wallet setup that works for Jakarta, Surabaya, and anywhere you tap

You ride the commuter line, you drive through tolls, you buy coffee at a minimarket. You want fast taps with low risk.

Put the active e-money card you tap at gates in an outer slot for speed. Put backup e-money in a shielded sleeve. Move your Visa or Mastercard to your phone token and tap with Face ID. Set contactless limit to 500 thousand to 1 million rupiah per tap. Turn on notifications for all debits. Keep the bank freeze toggle on your home screen shortcut.

At the toll, you know the balance before you go. Top up at the bank app through NFC top-up, then check the balance read before you drive. At the minimarket, you hold the phone yourself, you check the amount, you wait for the green check.

You tested the sleeve once with your phone. You tested the wallet stacking once. You saw what blocks and what does not. You now trust the setup because you tested it, not because a product page claimed it.

## When you do need full shielding

You work a high-risk job, you carry multiple bank cards, you attend events with dense crowds and you cannot watch your bag. In that case, use a zip pouch with a certified RFID lining for all cards you do not need at the gate. Close the zip. Keep the active gate card outside the pouch. That pouch removes the hidden reader vector for the cards inside while you keep one card ready.

You travel abroad where tap limits are higher, and terminals often allow larger contactless without PIN. In that case, lower the limit in the app before you fly and raise it only when you need it. The app slider is your best control across borders.

## Checklist you can run in five minutes tonight

You do not need a weekend project. Run this tonight.

- You install a NFC reader app on Android and read your own cards. You note which cards show balance and which show EMV tags.
- You test your wallet and your sleeve. You note which setup blocks the phone read.
- You add your bank card to Apple Pay or Google Pay and test one small tap with biometric.
- You set contactless limit in the bank app and turn on all transaction notifications.
- You save bank call center and card freeze shortcut on your phone home screen.
- You photograph your e-money card IDs and save them in a password manager for fast blocking if you lose the wallet.

You now have a wallet you can explain to a friend. You can show the test, the limit, the notification, and the freeze toggle. That hands-on proof beats any claim on a product box.

## Sources and where you verify further

- NFC Forum technical specs for NFC-A and NFC-B at 13.56 MHz and 4 cm operating distance
- EMVCo Contactless Specifications for payment token and cryptogram flow
- Bank Indonesia and ASPI documents on QRIS Tap pilot and tokenization approach 2024 to 2025
- Visa and Mastercard contactless security guides for issuers and merchants
- Research demos by Indonesian campus security labs on e-Money and Flazz reads with ACR122U in 2023 to 2025, reported in local infosec meetups
- Bank fraud briefing notes shared at Jakarta fintech security forum 2024 on contactless loss causes

> You control tap risk with distance, limits, and tokens you test yourself. Technology helps, but your habit of checking amount, tapping yourself, and freezing fast makes the difference.

