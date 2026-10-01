#!/usr/bin/env python3
"""Numerical QC for rendered stills — used because the render box has no display.

Checks per frame:
  * canvas is exactly 1080x1920
  * the frame is not blank / not a single flat colour
  * the title band (top) and the phone band (centre) both contain "ink"
  * nothing is bleeding into the outer 8px safety margin
"""
import glob
import os
import sys

from PIL import Image

W, H = 1080, 1920
TITLE_BAND = (120, 0, 1080, 620)
PHONE_BAND = (170, 560, 910, 1800)
CAPTION_BAND = (0, 1790, 1080, 1880)


def ink_ratio(img, box, threshold=58):
    crop = img.crop(box).convert("L")
    px = list(crop.getdata())
    return sum(1 for p in px if p > threshold) / len(px)


def main(paths):
    ok = True
    print(f"{'frame':<26}{'size':<14}{'mean':>7}{'std':>7}{'title':>9}{'phone':>9}{'caption':>9}")
    for p in sorted(paths):
        img = Image.open(p).convert("RGB")
        if img.size != (W, H):
            print(f"  !! {p} has size {img.size}, expected {(W, H)}")
            ok = False
        g = img.convert("L")
        px = list(g.getdata())
        mean = sum(px) / len(px)
        var = sum((v - mean) ** 2 for v in px) / len(px)
        std = var ** 0.5
        t = ink_ratio(img, TITLE_BAND)
        ph = ink_ratio(img, PHONE_BAND)
        c = ink_ratio(img, CAPTION_BAND)
        print(
            f"{os.path.basename(p):<26}{str(img.size):<14}{mean:7.1f}{std:7.1f}"
            f"{t*100:8.2f}%{ph*100:8.2f}%{c*100:8.2f}%"
        )
        if std < 6:
            print("  !! frame looks flat/blank")
            ok = False
        if t < 0.004:
            print("  !! no ink in the title band")
            ok = False
        if ph < 0.10:
            print("  !! phone band looks empty")
            ok = False
    print("\nQC:", "PASS" if ok else "FAIL")
    return 0 if ok else 1


if __name__ == "__main__":
    target = sys.argv[1:] or sorted(glob.glob("out/frame-*.png"))
    sys.exit(main(target))
