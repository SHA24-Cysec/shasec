---
# ============================================================
# HALAMAN STATIS (About, Contact, dll.)
# ------------------------------------------------------------
# Buat pasangan ID + EN dengan translationKey yang SAMA:
#   hugo new content/id/nama-halaman.md --kind halaman
#   hugo new content/en/nama-halaman.md --kind halaman
# ============================================================

translationKey: "{{ .File.ContentBaseName }}"
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ .Date }}
draft: true
description: ""
layout: "page"
type: "page"
---

