#!/usr/bin/env python3
"""Render a frame as ASCII art so layout can be inspected without a display."""
import glob
import sys

from PIL import Image

RAMP = " .:-=+*#%@"
COLS = 72


def preview(path, rows=None):
    img = Image.open(path).convert("L")
    w, h = img.size
    cols = COLS
    rows = rows or int(cols * h / w * 0.5)
    small = img.resize((cols, rows), Image.BOX)
    px = list(small.getdata())
    print(f"\n===== {path}  ({w}x{h}) =====")
    print("+" + "-" * cols + "+")
    for r in range(rows):
        line = "".join(RAMP[min(9, px[r * cols + c] * 10 // 256)] for c in range(cols))
        print("|" + line + "|")
    print("+" + "-" * cols + "+")


if __name__ == "__main__":
    args = sys.argv[1:] or sorted(glob.glob("out/frame-*.png"))
    for a in args:
        preview(a)
