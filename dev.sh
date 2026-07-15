#!/bin/bash
# Script untuk menjalankan Tailwind CSS (watch) dan Hugo Server secara bersamaan

echo "🚀 Memulai Tailwind CSS (watch mode)..."
npm run dev:css &
TAILWIND_PID=$!

echo "🚀 Memulai Hugo Server..."
hugo server -D --bind 0.0.0.0 &
HUGO_PID=$!

# Pastikan proses dimatikan ketika user menekan Ctrl+C
trap "echo -e '\n🛑 Mematikan server...'; kill $TAILWIND_PID $HUGO_PID; exit" SIGINT SIGTERM

# Biarkan script berjalan sampai user menghentikannya
wait $TAILWIND_PID $HUGO_PID
