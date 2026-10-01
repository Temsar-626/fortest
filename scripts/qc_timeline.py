#!/usr/bin/env python3
"""Verify the timeline of the rendered MP4 by detecting scene cuts.

The video is sampled at 8 fps, consecutive frames are compared, and the
largest changes are reported as cut positions. Expected cuts:
3 / 7 / 12 / 17 / 22 / 27 s.
"""
import glob
import os
import subprocess
import sys

from PIL import Image

EXPECTED = [3, 7, 12, 17, 22, 27]


def sample(mp4, outdir, fps=8):
    os.makedirs(outdir, exist_ok=True)
    for f in glob.glob(os.path.join(outdir, "*.png")):
        os.remove(f)
    ffmpeg = __import__("subprocess").run(
        [
            "node",
            "-e",
            "console.log(require('ffmpeg-static'))",
        ],
        capture_output=True,
        text=True,
    ).stdout.strip()
    subprocess.run(
        [ffmpeg, "-y", "-loglevel", "error", "-i", mp4, "-vf", f"fps={fps}", os.path.join(outdir, "%05d.png")],
        check=True,
    )
    return sorted(glob.glob(os.path.join(outdir, "*.png"))), fps


def main(mp4, outdir="/tmp/qc-frames"):
    frames, fps = sample(mp4, outdir)
    print(f"sampled {len(frames)} frames @ {fps}fps from {mp4}")
    prev = None
    diffs = []
    for i, p in enumerate(frames):
        im = Image.open(p).convert("L").resize((96, 170), Image.BOX)
        cur = list(im.getdata())
        if prev is not None:
            d = sum(abs(a - b) for a, b in zip(cur, prev)) / len(cur)
            diffs.append((i / fps, d))
        prev = cur

    # local maxima above a floor
    peaks = []
    for i in range(1, len(diffs) - 1):
        t, d = diffs[i]
        if d > 3.0 and d >= diffs[i - 1][1] and d >= diffs[i + 1][1] and d > 6.0:
            peaks.append((round(t, 3), round(d, 1)))

    strongest = sorted(peaks, key=lambda x: -x[1])[:8]
    print("\nstrongest content changes (t, magnitude):")
    for t, d in sorted(strongest, key=lambda x: x[0]):
        print(f"   {t:6.3f}s  {d}")

    print("\nexpected cuts:", EXPECTED)
    ok = True
    for want in EXPECTED:
        hit = min((t for t, _ in strongest), key=lambda t: abs(t - want), default=None)
        good = hit is not None and abs(hit - want) <= 0.30
        ok = ok and good
        print(f"   expect {want:2d}.0 s -> nearest strong change {hit}s  {'OK' if good else 'MISS'}")

    print("\ntimeline QC:", "PASS" if ok else "REVIEW")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1] if len(sys.argv) > 1 else "out/reel-second-account.mp4"))
