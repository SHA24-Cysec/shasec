---
translationKey: "api-key-security"
title: "How to Store API Keys and Secrets Without Leaking Them"
date: 2026-06-18
draft: false
categories:
 - Digital Security
tags:
 - developer
 - API security
 - secure coding
 - privacy
summary: "Safer habits for developers who work with API keys, tokens, and secrets on laptops and in repositories."
cover: "/images/articles/api-key-security.webp"
---

An API key looks like a random string, but its value can equal a house key. Applications use it to reach email, payments, storage, or AI services. When a key enters a public repository, CI log, or screenshot, someone else may use it before you notice. This does not happen only because a developer is careless. A local configuration file is convenient and gets committed. A debugging log helps explain an error but prints an Authorization header without masking it. Clear working habits close both paths.

## Separate code from secrets

Code can live in a repository. Secrets should arrive through environment variables, a secret manager, or an approved injection method. A local `. Env` file can help during development, but add it to `. Gitignore` and provide an `. Env. Example` containing variable names only. Do not put secrets in comments, branch names, issues, wikis, or commit messages. Removing a line from the latest version does not remove it from Git history. Treat a repository as an archive, not a place for something you want hidden.

## Limit each key’s capability

Create separate keys for development, staging, and production. Grant the smallest useful permission set. A key that reads objects does not need to delete a bucket. A key for one service does not need access to every project. Set an expiration when the platform supports it. Rotation becomes easier when applications do not share one key. Record the owner, service, environment, creation date, and revocation method without writing down the secret value.

## Protect logs and work tools

Filter headers, URLs, and payloads before they enter logs. Many libraries support redaction. Use synthetic data for debugging. Take care when uploading terminal screenshots or pasting errors into a forum or chatbot. Enable secret scanning in the repository and pipeline. It can find strings that resemble keys, but it is not a replacement for process. When the scanner warns, stop the workflow and inspect the key.

## If a key has leaked

Revoke or disable it first. Do not wait to confirm whether someone used it. Create a new key with the same or narrower permissions, install it through a safe path, and review usage logs from the time of exposure. Look for copies in commit history, issues, logs, and developer machines. Remove unnecessary traces according to organisational procedure, but remember that deletion does not replace revocation. Record the impact, time, service, and recovery steps.

## A pre-push checklist

- No token appears in source code or screenshots.
- The local `. Env` is not tracked by Git.
- Production uses an approved secret store.
- Keys have sensible permissions and lifetimes.
- Logs do not print sensitive headers or payloads.
- A tested rotation method exists. A good secret is not one that never changes. It is one you can limit, monitor, and revoke without shutting down the whole system.
