#!/usr/bin/env python3
"""Synthesize the 30s background music bed for the Reel.

Modern / upbeat electronic loop, 120 BPM, A-minor progression (Am - F - C - G).
Pure numpy (no external libs). Output: 44.1 kHz 16-bit stereo WAV.
"""
import numpy as np
import wave
import os

SR = 44100
BPM = 120.0
BEAT = 60.0 / BPM              # 0.5 s
BAR = BEAT * 4                 # 2.0 s
DURATION = 30.0
N = int(SR * DURATION)
rng = np.random.default_rng(20261001)

left = np.zeros(N)
right = np.zeros(N)


def midi(m):
    return 440.0 * (2.0 ** ((m - 69) / 12.0))


def add(buf_l, buf_r, sig, at, gain=1.0, pan=0.0):
    """Mix a mono signal into stereo buffers at time `at` (seconds)."""
    i = int(at * SR)
    if i >= N:
        return
    sig = sig[: N - i]
    l = np.sqrt(0.5 * (1.0 - pan))
    r = np.sqrt(0.5 * (1.0 + pan))
    buf_l[i : i + len(sig)] += sig * gain * l * 1.4142
    buf_r[i : i + len(sig)] += sig * gain * r * 1.4142


def exp_env(n, attack=0.002, decay=0.35, power=2.2):
    e = np.ones(n)
    a = max(1, int(attack * SR))
    e[: min(a, n)] = np.linspace(0, 1, min(a, n))
    tail = n - a
    if tail > 0:
        e[a:] = np.exp(-np.linspace(0, 1, tail) * (decay * 14.0)) ** power
    return e


def kick():
    n = int(0.42 * SR)
    t = np.arange(n) / SR
    f = 150.0 * np.exp(-t * 28.0) + 46.0
    phase = 2 * np.pi * np.cumsum(f) / SR
    body = np.sin(phase) * np.exp(-t * 7.5)
    click = rng.normal(0, 1, n) * np.exp(-t * 220.0) * 0.35
    return (body + click) * 0.95


def clap():
    n = int(0.30 * SR)
    t = np.arange(n) / SR
    noise = rng.normal(0, 1, n)
    noise = np.diff(noise, prepend=0.0)      # cheap high-pass
    e = np.zeros(n)
    for off, amp in ((0.0, 1.0), (0.011, 0.8), (0.023, 0.6)):
        i = int(off * SR)
        e[i:] += amp * np.exp(-np.arange(n - i) / SR * 34.0)
    return noise * e * 0.42


def hat(open_=False):
    n = int((0.14 if open_ else 0.055) * SR)
    t = np.arange(n) / SR
    noise = rng.normal(0, 1, n)
    noise = np.diff(noise, 2, prepend=np.zeros(2))   # sharper high-pass
    e = np.exp(-t * (18.0 if open_ else 70.0))
    return noise * e * 0.24


def bass(m, dur, amp=0.5):
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = midi(m)
    sig = (
        np.sin(2 * np.pi * f * t)
        + 0.45 * np.sin(2 * np.pi * 2 * f * t)
        + 0.18 * np.sin(2 * np.pi * 3 * f * t)
    )
    return sig * exp_env(n, 0.004, 0.5, 1.6) * amp * 0.55


def pluck(m, dur, amp=0.32, detune=1.0):
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = midi(m) * detune
    sig = (
        np.sin(2 * np.pi * f * t)
        + 0.35 * np.sin(2 * np.pi * 2.001 * f * t)
        + 0.14 * np.sin(2 * np.pi * 3.0 * f * t)
    )
    return sig * exp_env(n, 0.003, 0.28, 2.0) * amp


def pad(m, dur, amp=0.16):
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = midi(m)
    sig = np.zeros(n)
    for k, g in ((1, 1.0), (2.0, 0.35), (0.5, 0.3), (1.001, 0.6), (2.002, 0.25)):
        sig += g * np.sin(2 * np.pi * f * k * t + k)
    a = int(dur * 0.35 * SR)
    env = np.ones(n)
    env[:a] = np.linspace(0, 1, a) ** 1.5
    rel = int(0.25 * SR)
    env[-rel:] *= np.linspace(1, 0, rel)
    return sig * env * amp * 0.2


# --- arrangement -------------------------------------------------------------
# bar : (bass root midi, chord midi notes)
PROG = [
    (45, [57, 60, 64]),   # Am
    (41, [53, 57, 60]),   # F
    (48, [55, 60, 64]),   # C
    (43, [55, 59, 62]),   # G
]

bars = int(DURATION / BAR)          # 15 bars
arp_pattern = [0, 1, 2, 1, 0, 2, 1, 2]

for bar in range(bars):
    t0 = bar * BAR
    root, chord = PROG[bar % 4]
    section = bar // 4              # 0..3 (last is outro-ish)
    full = bar >= 2                 # drums enter at bar 3

    # pad
    for note in chord:
        add(left, right, pad(note, BAR * 1.02), t0, gain=1.0, pan=0.0)

    if full:
        # drums
        for b in range(4):
            add(left, right, kick(), t0 + b * BEAT, gain=0.95, pan=0.0)
        add(left, right, clap(), t0 + 1 * BEAT, gain=0.8, pan=-0.05)
        add(left, right, clap(), t0 + 3 * BEAT, gain=0.8, pan=0.05)
        for e in range(8):
            add(left, right, hat(open_=(e == 7)), t0 + e * BEAT / 2,
                gain=0.85 if e % 2 else 0.6, pan=0.25 if e % 2 else -0.25)
            if e % 2 == 1 and bar >= 6:
                add(left, right, hat(), t0 + e * BEAT / 2 + BEAT / 4,
                    gain=0.4, pan=0.35)

    # bass: driving 8ths
    if bar >= 1:
        for e in range(8):
            note = root + (12 if e in (3, 7) else 0)
            add(left, right, bass(note, BEAT / 2 * 0.92),
                t0 + e * BEAT / 2, gain=1.0, pan=0.0)

    # arp / pluck melody
    if bar >= 4:
        for step in range(16):
            note = chord[arp_pattern[step % len(arp_pattern)]] + 12
            if step % 2 == 0 or bar >= 8:
                add(left, right,
                    pluck(note, BEAT / 4 * 1.6, amp=0.30,
                          detune=1.0 + (step % 3) * 0.002),
                    t0 + step * BEAT / 4, gain=1.0,
                    pan=np.sin(step) * 0.4)

    # sparkle accents in later section
    if bar >= 10 and bar % 2 == 1:
        add(left, right, pluck(chord[2] + 24, 0.6, amp=0.16), t0 + BEAT * 2.5,
            gain=1.0, pan=0.5)

# --- global shaping ----------------------------------------------------------
stereo = np.stack([left, right], axis=1)

# intro fade-in / outro fade-out
fi = int(0.25 * SR)
stereo[:fi] *= np.linspace(0, 1, fi)[:, None]
fo = int(1.1 * SR)
stereo[-fo:] *= np.linspace(1, 0, fo)[:, None] ** 1.2

# gentle soft-clip + normalise headroom
stereo = np.tanh(stereo * 1.15)
peak = np.max(np.abs(stereo)) or 1.0
stereo = stereo / peak * 0.82

pcm = (np.clip(stereo, -1, 1) * 32767).astype("<i2")
out = os.path.join(os.path.dirname(__file__), "..", "public", "audio", "music.wav")
with wave.open(out, "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())
print("wrote", os.path.abspath(out), pcm.shape, f"{DURATION}s @ {SR}Hz")
