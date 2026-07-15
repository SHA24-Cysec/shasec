---
# Archetype section "articles" — sama dengan postingan.md
# Pemakaian: hugo new content/id/articles/slug.md
#            hugo new content/en/articles/slug.md

translationKey: "article-{{ .File.ContentBaseName }}"
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ .Date }}
draft: true
categories:
  - Cybersecurity
tags: []
summary: ""
cover: ""
# author: "Author Name"   # optional; default: params.author in hugo.toml
---

Tulis ringkasan/pembuka di sini.

## Pendahuluan

Konten artikel…
