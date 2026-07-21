---
translationKey: "ai-chatbot-privacy"
title: "AI Chatbot Privacy: What Data Should You Keep Out of Prompts"
date: 2026-07-20
draft: false
categories:
 - Digital Security
tags:
 - AI
 - privacy
 - personal data
 - digital security
summary: "A practical guide to using AI chatbots without exposing work secrets, identities, or other people’s data."
cover: "/images/articles/ai-chatbot-privacy.webp"
---

AI chatbots can summarize documents, explain code, and produce drafts. Because the interaction feels like an ordinary conversation, people often paste raw material without checking what it contains. That is where privacy risk starts. A prompt may include a customer name, an identity number, a contract, source code, or health details that should remain inside a controlled system. You do not have to avoid AI to protect privacy. Treat a prompt like a message sent to an online service: provide what the task needs, remove identifying details, and understand the service settings before using sensitive material.

## Start with the task, not the full document

Define the work you want done. If you need a summary, the chatbot does not need every person’s full name. Replace names with labels such as [CUSTOMER A], remove phone numbers, and keep only the section needed for the task. A safer example is: “Summarize these customer complaints into three main issues,” after removing names and order numbers. The output can remain useful while the amount of data sent is smaller.

## Four kinds of data to keep out

### Access secrets

Do not enter passwords, tokens, API keys, recovery codes, private keys, or configuration contents that grant access. When asking for code help, replace secrets with a placeholder such as `EXAMPLE_TOKEN`.

### Identity and financial data

Identity numbers, full addresses, bank numbers, card details, payslips, and tax documents can connect a prompt to a real person. Remove or mask them before copying text.

### Internal information

Unpublished contracts, pricing plans, incident reports, and company source code belong to an organisation and its access rules. Confirm that your organisation permits the service. A paid account is not automatically suitable for every kind of data.

### Other people’s data

You may have access to customer or colleague data, but access does not always mean permission to send it to another service. Ask for consent or use an anonymized version that still supports the task.

## Review settings and workflow

Read the privacy settings of the service you use. Check whether conversations are stored, how long they are retained, who can access the account, and whether history can be deleted. Use an organisational account only within company policy. Create a simple rule: general brainstorming may use a public service, while confidential data must stay with an approved tool. Keep personal and work accounts separate as well. Separation makes history, permissions, and responsibility easier to trace.

## Check the answer before using it

Privacy is not the only concern. A chatbot can invent citations, guess, or combine inaccurate information. Do not put its output into a customer email, report, production code, or important decision without human review. Keep only the output you need. Delete conversations or temporary files according to policy. If you accidentally send an access secret, treat it as exposed: revoke the token, change the credential, and record the incident. The best habit is not writing the shortest prompt. It is providing enough context without handing over identities and secrets the task never required.
