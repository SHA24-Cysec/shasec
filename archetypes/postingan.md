---
# ============================================================
# ARTIKEL BARU (multibahasa ID + EN)
# ------------------------------------------------------------
# Buat file:
#   hugo new content/id/articles/slug-artikel.md --kind postingan
#   hugo new content/en/articles/article-slug.md --kind postingan
#
# WAJIB sama di ID & EN:
#   translationKey  → penghubung terjemahan (unik per topik)
#
# Cover (opsional):
#   taruh file di static/images/covers/
#   cover: "/images/covers/nama-file.jpg"
#   kosongkan cover jika belum ada (fallback ikon otomatis)
# ============================================================

translationKey: "article-{{ .File.ContentBaseName }}"
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ .Date }}
draft: true
categories:
  - Cybersecurity
tags: []
summary: ""
cover: ""
# author: "Nama Penulis"   # opsional; default: params.author di hugo.toml
---

Tulis ringkasan/pembuka di sini (boleh 1–2 paragraf).

## Pendahuluan

Konten artikel…

## Poin utama

- …

## Penutup

…
