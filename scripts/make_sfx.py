#!/usr/bin/env python3
"""Synthesize the UI/transition sound effects used across the Reel."""
import numpy as np
import wave
import os

SR = 44100
rng = np.random.default_rng(77)
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "audio")
os.makedirs(OUT, exist_ok=True)


def write(name, sig, gain=0.9):
    sig = np.asarray(sig, dtype=float)
    peak = np.max(np.abs(sig)) or 1.0
    sig = np.tanh(sig / peak * 1.2) * gain
    pcm = (np.clip(sig, -1, 1) * 32767).astype("<i2")
    path = os.path.join(OUT, name)
    with wave.open(path, "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())
    print(f"  {name:18s} {len(sig)/SR:5.2f}s")


def t_of(n):
    return np.arange(n) / SR


def noise(n):
    return rng.normal(0, 1, n)


# --- tap ---------------------------------------------------------------------
def tap():
    n = int(0.10 * SR)
    t = t_of(n)
    body = np.sin(2 * np.pi * 900 * t) * np.exp(-t * 55.0)
    click = np.diff(noise(n), prepend=0.0) * np.exp(-t * 320.0) * 0.5
    return (body + click) * 0.9


# --- ui click ----------------------------------------------------------------
def ui_click():
    n = int(0.07 * SR)
    t = t_of(n)
    a = np.sign(np.sin(2 * np.pi * 1400 * t)) * np.exp(-t * 90.0)
    b = np.sin(2 * np.pi * 2100 * t) * np.exp(-t * 120.0)
    return (a * 0.35 + b * 0.5)


# --- pop ---------------------------------------------------------------------
def pop():
    n = int(0.20 * SR)
    t = t_of(n)
    f = 1100 * np.exp(-t * 16.0) + 260
    ph = 2 * np.pi * np.cumsum(f) / SR
    return (np.sin(ph) * np.exp(-t * 22.0) + noise(n) * np.exp(-t * 160.0) * 0.2)


# --- whoosh ------------------------------------------------------------------
def whoosh():
    n = int(0.45 * SR)
    t = t_of(n)
    nz = np.diff(noise(n), 2, prepend=np.zeros(2))
    # sweeping band emphasis via amplitude-modulated resonant tones
    sweep = np.sin(2 * np.pi * (300 + 3400 * (t / t[-1]) ** 2) * t)
    env = np.sin(np.pi * np.clip(t / t[-1], 0, 1)) ** 1.6
    return (nz * 0.6 + sweep * 0.35) * env


# --- transition (riser down / impact) ----------------------------------------
def transition():
    n = int(0.55 * SR)
    t = t_of(n)
    f = 2200 * np.exp(-t * 3.2) + 70
    ph = 2 * np.pi * np.cumsum(f) / SR
    tone = np.sin(ph) * np.exp(-t * 4.5)
    sub = np.sin(2 * np.pi * 58 * t) * np.exp(-t * 5.0)
    nz = np.diff(noise(n), prepend=0.0) * np.exp(-t * 9.0) * 0.35
    return tone * 0.5 + sub * 0.7 + nz


# --- success ----------------------------------------------------------------
def success():
    out = np.zeros(int(0.95 * SR))
    notes = [72, 76, 79, 84]  # C E G C
    for i, m in enumerate(notes):
        f = 440 * 2 ** ((m - 69) / 12)
        at = int(i * 0.085 * SR)
        n = int(0.55 * SR)
        t = t_of(n)
        tone = (
            np.sin(2 * np.pi * f * t)
            + 0.4 * np.sin(2 * np.pi * 2 * f * t)
            + 0.15 * np.sin(2 * np.pi * 3 * f * t)
        ) * np.exp(-t * 6.0)
        out[at : at + n] += tone * 0.5
    return out


# --- swipe (add account sheet) ----------------------------------------------
def swipe():
    n = int(0.35 * SR)
    t = t_of(n)
    nz = np.diff(noise(n), 2, prepend=np.zeros(2))
    env = np.exp(-((t - 0.12) ** 2) / (2 * 0.055 ** 2))
    return nz * env * 0.9


print("synthesizing SFX ->")
write("sfx-tap.wav", tap())
write("sfx-click.wav", ui_click())
write("sfx-pop.wav", pop())
write("sfx-whoosh.wav", whoosh())
write("sfx-transition.wav", transition())
write("sfx-success.wav", success())
write("sfx-swipe.wav", swipe())
