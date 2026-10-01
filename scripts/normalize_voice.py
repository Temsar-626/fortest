#!/usr/bin/env python3
"""Lift and level the narration so it sits clearly above the music bed.

The raw edge-tts clips arrive at wildly different levels (RMS ~2100–2500 with
peaks near full scale). This script decodes each clip, brings every line to the
same RMS, and soft-limits the peaks so nothing clips once mixed.

Output: public/audio/vo-<n>.wav  (44.1 kHz 16-bit mono)
"""
import json
import os
import subprocess
import sys
import wave

import numpy as np

SR = 44100
TARGET_RMS = 4000.0  # ~0.122 FS — leaves ~9 dB of headroom over the music bed
CEILING = 0.95

HERE = os.path.dirname(os.path.abspath(__file__))
AUDIO = os.path.join(HERE, "..", "public", "audio")


def ffmpeg_path():
    out = subprocess.run(
        ["node", "-e", "console.log(require('ffmpeg-static'))"],
        capture_output=True,
        text=True,
        cwd=os.path.join(HERE, ".."),
    )
    path = out.stdout.strip()
    if not path or not os.path.exists(path):
        sys.exit("could not locate the ffmpeg-static binary")
    return path


def decode(ffmpeg, src, dst):
    subprocess.run(
        [ffmpeg, "-y", "-loglevel", "error", "-i", src,
         "-ac", "1", "-ar", str(SR), "-c:a", "pcm_s16le", dst],
        check=True,
    )


def read_wav(path):
    with wave.open(path, "rb") as w:
        assert w.getnchannels() == 1, "expected mono"
        return np.frombuffer(w.readframes(w.getnframes()), dtype="<i2").astype(np.float64)


def write_wav(path, samples):
    pcm = (np.clip(samples, -1.0, 1.0) * 32767).astype("<i2")
    with wave.open(path, "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())


def soft_limit(x):
    """tanh knee above ~0.7 — tames peaks without hard clipping artefacts."""
    knee = 0.7
    head = np.clip(x, -knee, knee)
    tail = x - head
    return head + np.tanh(tail / (CEILING - knee)) * (CEILING - knee)


def main():
    ffmpeg = ffmpeg_path()
    tmp = "/tmp/vo-decode.wav"
    with open(os.path.join(AUDIO, "voice.json"), encoding="utf-8") as f:
        meta = json.load(f)

    print(f"normalising narration to RMS {TARGET_RMS:.0f} ->")
    for m in meta:
        src = os.path.join(AUDIO, m["file"])
        if not os.path.exists(src):
            print(f"  !! missing {src}")
            continue
        decode(ffmpeg, src, tmp)
        raw = read_wav(tmp)
        rms = float(np.sqrt(np.mean(raw**2))) or 1.0
        gain = TARGET_RMS / rms
        peak_before = float(np.max(np.abs(raw))) / 32767
        # work in ±1 units so the limiter knee means what it says
        y = soft_limit((raw / 32767.0) * gain)
        out_name = m["file"].replace(".mp3", ".wav")
        write_wav(os.path.join(AUDIO, out_name), y)
        print(
            f"  {m['file']:10s} rms {rms:6.0f} peak {peak_before:.2f}FS "
            f"-> gain {gain:4.2f}x -> rms {np.sqrt(np.mean(y**2))*32767:6.0f} "
            f"peak {np.max(np.abs(y)):.2f}FS  => {out_name}"
        )


if __name__ == "__main__":
    main()
