#!/usr/bin/env bash
#
# Full rebuild: regenerate audio assets, render the Reel, normalise the
# delivery file and run QC.
#
#   sh scripts/render.sh
#
set -euo pipefail

cd "$(dirname "$0")/.."

PY="${PYTHON:-python3}"
DELIVERY="${OUT:-out/reel-second-account.mp4}"
MASTER="out/.master.mp4"

echo "==> 1/5  background music (numpy synth, 120 BPM)"
"$PY" scripts/make_music.py

echo "==> 2/5  UI / transition sound effects"
"$PY" scripts/make_sfx.py

echo "==> 3/5  Persian voice-over (edge-tts, fa-IR-FaridNeural)"
"$PY" scripts/make_voice.py

echo "==> 4/5  rendering master (1080x1920 · 30fps · H.264 + AAC)"
mkdir -p out
npx remotion render src/index.ts Reel "$MASTER" --crf=18 --log=info

echo "==> 5/5  normalising to yuv420p / BT.709 + faststart"
node scripts/finalize.mjs "$MASTER" "$DELIVERY"

echo
echo "done -> $DELIVERY"
node scripts/verify_output.mjs "$DELIVERY"
