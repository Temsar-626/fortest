#!/usr/bin/env python3
"""Locate bright text lines in a rendered frame and report their geometry.

Used to sanity-check type size and placement without a display.
"""
import sys

from PIL import Image

THR = 165


def lines(path, x0=0, x1=1080, y0=0, y1=1920, min_h=8, min_w=14):
    im = Image.open(path).convert("L")
    px = im.load()

    def rowcount(y):
        return sum(1 for x in range(x0, x1, 2) if px[x, y] > THR)

    found = []
    start = None
    for y in range(y0, y1):
        c = rowcount(y)
        if c >= 3 and start is None:
            start = y
        elif c < 3 and start is not None:
            if y - start >= min_h:
                found.append((start, y - 1))
            start = None
    if start is not None and y1 - start >= min_h:
        found.append((start, y1 - 1))

    print(f"\n{path}  text lines (y0,y1,height,x0,x1,width):")
    for (a, b) in found:
        xs = [x for x in range(x0, x1) for y in range(a, b + 1) if px[x, y] > THR]
        if not xs:
            continue
        w = max(xs) - min(xs) + 1
        if w < min_w:
            continue
        print(
            f"   y {a:4d}-{b:<4d} h={b-a+1:<4d} x {min(xs):4d}-{max(xs):<4d} w={w:<5d}"
            f" center_x={(min(xs)+max(xs))//2}"
        )


if __name__ == "__main__":
    args = sys.argv[1:]
    for p in args:
        lines(p)
