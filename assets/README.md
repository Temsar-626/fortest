# assets/

Remotion resolves `staticFile(...)` (and CSS/`FontFace` URLs) from the **`public/`**
directory, so every runtime asset this Reel loads at render time lives there:

| logical asset | actual path              | produced by                  |
| ------------- | ------------------------ | ---------------------------- |
| fonts         | `public/fonts/*.woff2`   | `@fontsource/vazirmatn`      |
| music         | `public/audio/music.wav` | `scripts/make_music.py`      |
| sound effects | `public/audio/sfx-*.wav` | `scripts/make_sfx.py`        |
| voice-over    | `public/audio/vo-*.mp3`  | `scripts/make_voice.py`      |

Everything here is generated except the fonts (Vazirmatn, SIL OFL — see
`public/fonts/Vazirmatn-LICENSE.txt`); nothing is a downloaded placeholder.
Any icon the design needs is an inline SVG component in `src/components/Icons.tsx`.
