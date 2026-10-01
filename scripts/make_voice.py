#!/usr/bin/env python3
"""Generate the Persian voice-over, one clip per scene, so it can be
placed on the exact scene boundary in the master timeline.

Voice: fa-IR-FaridNeural (Microsoft neural TTS, Persian).
"""
import asyncio
import os
import json
import edge_tts

VOICE = "fa-IR-FaridNeural"
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "audio")

# scene index -> (scene start seconds, window seconds, rate, text)
LINES = [
    (1, 0.10, 2.90, "+30%", "می‌خوای یه اکانت دوم اینستاگرام داشته باشی؟"),
    (2, 3.15, 3.40, "+10%", "لازم نیست از اکانت فعلیت خارج بشی."),
    (3, 7.20, 9.00, "+10%", "برو روی پروفایل و روی نام کاربریت بزن."),
    (5, 17.20, 4.30, "+10%", "بعد اَد اَکانت رو انتخاب کن."),
    (6, 22.20, 4.40, "+8%", "ساخت حساب جدید رو بزن و اطلاعات اکانتتو وارد کن."),
    (7, 27.00, 3.00, "+30%", "تموم شد! دو تا اکانت داری."),
]


async def synth(idx, start, window, rate, text):
    path = os.path.join(OUT, f"vo-{idx}.mp3")
    comm = edge_tts.Communicate(text, VOICE, rate=rate, volume="+0%")
    await comm.save(path)
    print(f"  vo-{idx}.mp3  start={start:5.2f}s window={window:.2f}s rate={rate}  {text}")
    return {"index": idx, "start": start, "window": window, "text": text,
            "file": f"vo-{idx}.mp3"}


async def main():
    os.makedirs(OUT, exist_ok=True)
    print(f"generating voice-over ({VOICE}) ->")
    meta = []
    for idx, start, window, rate, text in LINES:
        meta.append(await synth(idx, start, window, rate, text))
    with open(os.path.join(OUT, "voice.json"), "w", encoding="utf-8") as f:
        json.dump(meta, f, ensure_ascii=False, indent=2)

    # Level every line to the same loudness so the narration always sits
    # clearly above the music bed.
    import subprocess

    subprocess.run(
        ["python3", os.path.join(os.path.dirname(__file__), "normalize_voice.py")],
        check=False,
    )


if __name__ == "__main__":
    asyncio.run(main())
