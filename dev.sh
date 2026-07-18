#!/bin/bash
# ============================================================
# dev.sh — ShaSec dev server (Tailwind watch + Hugo)
# Versi anti-cache untuk localhost: perubahan selalu muncul.
# ============================================================
set -e

echo "🎨 Tailwind CSS (watch mode)..."
# Watch main.css -> main.bundle.css. Kalau mati, CSS tidak ter-update.
npm run dev:css &
TAILWIND_PID=$!

echo "🚀 Hugo Server (livereload + tanpa cache)..."
hugo server \
  -D `# sertakan draft` \
  --bind 0.0.0.0 `# akses dari perangkat lain di jaringan lokal` \
  --navigateToChanged `# browser otomatis pindah ke file yang sedang diedit` \
  --disableFastRender `# render ulang penuh tiap perubahan (bukan parsial)` \
  --noHTTPCache `# matikan HTTP cache internal Hugo` \
  --ignoreCache `# abaikan cache resource (Hugo Pipes: minify/fingerprint CSS)` \
  &
HUGO_PID=$!

trap "echo -e '\n🛑 Mematikan server...'; kill $TAILWIND_PID $HUGO_PID 2>/dev/null; exit" SIGINT SIGTERM

wait $TAILWIND_PID $HUGO_PID
