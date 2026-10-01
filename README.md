# fortest · ریلز اینستاگرام: «چطور یک اکانت دوم اینستاگرام بسازیم؟»

> یک ویدئوی عمودی ۳۰ ثانیهای، کاملاً ساختهشده با کد — از صفر تا فایل MP4 نهایی.
> این ریدمی هم راهنمای پروژه است و هم گزارش کامل مسیر ساخت، چالشها و نکتهها.

```bash
npm install && pip install -r requirements.txt
sh scripts/render.sh        # → out/reel-second-account.mp4
```

---

## فهرست

1. [این پروژه چیست](#۱-این-پروژه-چیست)
2. [مشخصات ویدئوی نهایی](#۲-مشخصات-ویدئوی-نهایی)
3. [پیشنیازها](#۳-پیشنیازها)
4. [ساختار پروژه](#۴-ساختار-پروژه)
5. [تایملاین](#۵-تایملاین)
6. [ساخت از صفر، گامبهگام](#۶-ساخت-از-صفر-گامبهگام)
7. [چالشها و راهحلها](#۷-چالشها-و-راهحلها)
8. [نکتههای کلیدی](#۸-نکتههای-کلیدی)
9. [سفارشیسازی](#۹-سفارشیسازی)
10. [کنترل کیفیت](#۱۰-کنترل-کیفیت)
11. [مجوز و اعتبارها](#۱۱-مجوز-و-اعتبارها)
12. [محدودیتها و کارهای بعدی](#۱۲-محدودیتها-و-کارهای-بعدی)

---

## ۱. این پروژه چیست؟

یک **Reel عمودی ۹:۱۶** به زبان فارسی که در ۳۰ ثانیه یاد میدهد چطور یک اکانت دوم
به اینستاگرام اضافه کنیم. هدف، «اسلاید PowerPoint» نیست؛ موشنگرافیک واقعی است.

نکتهی مهم: **هیچ فایل ویدئویی، تصویری یا صوتی آمادهای استفاده نشده.**
هر عنصر بصری با `HTML/CSS/SVG` بازسازی شده، هر افکت صوتی با `numpy` سینتز شده،
و موزیک و وویساور هم تولید کد هستند. فقط فونت از یک پکیج رسمی میآید.

**چرا Remotion؟** چون خروجی آن واقعاً یک مرورگر headless (Chrome) است:

| نیاز | چرا Remotion جواب میدهد |
| --- | --- |
| شکلدهی صحیح فارسی (حروف چسبیده + RTL) | موتور مرورگر خودش شکلدهی عربی/فارسی را انجام میدهد؛ نیازی به کتابخانهی shaping نیست |
| موشنگرافیک باکیفیت | همان CSS/Canvas/SVG که در وب بلدی، بهعلاوه `spring` و `interpolate` |
| رمزگذاری MP4 | Remotion خودش ffmpeg را همراه دارد؛ لازم نیست دستی نصب کنی |
| کنترل فریمبهفریم | `useCurrentFrame()` یعنی هر انیمیشن قطعی (deterministic) است |

---

## ۲. مشخصات ویدئوی نهایی

| ویژگی | مقدار |
| --- | --- |
| مسیر فایل | `out/reel-second-account.mp4` |
| مدت | **۳۰.۰۰۰ ثانیه** (۹۰۰ فریم) |
| ابعاد | **۱۰۸۰×۱۹۲۰** (۹:۱۶) |
| نرخ فریم | **۳۰ fps** |
| ویدئو | H.264 High Profile، `yuv420p`، BT.709، محدودهی TV |
| صدا | AAC، ۴۸ kHz، استریو |
| حجم | ~۱۳.۸ مگابایت |
| آماده برای | Instagram Reels / Stories (سازگار با تلگرام، واتساپ و پلیرهای معمول) |

آمار عبور از کنترل کیفیت:

```
PASS  video stream present
PASS  audio stream present
PASS  duration == 30.00s             30.000s
PASS  width == 1080                  1080
PASS  height == 1920                 1920
PASS  fps == 30                      30
PASS  video codec == h264            h264
PASS  audio codec == aac             aac
PASS  pixel format == yuv420p        yuv420p
PASS  audio sample rate >= 44100     48000
PASS  file < 100 MB                  13.8 MB
```

---

## ۳. پیشنیازها

| ابزار | نسخهای که تست شده | برای چه |
| --- | --- | --- |
| Node.js | ۲۲.۲۳.۲ (حداقل ۱۸) | Remotion، باندل، رندر |
| npm | ۱۰.۹.۸ | نصب پکیجها |
| Python | ۳.۱۰.۱۲ (حداقل ۳.۹) | ساخت موزیک، افکت صوتی، وویساور، کنترل کیفیت |
| ffmpeg | همراه `ffmpeg-static` | انکود نهایی (نصب جدا لازم نیست) |

کتابخانههای پایتون:

```bash
pip install -r requirements.txt     # numpy · edge-tts · Pillow
```

> **نکتهی محیط لینوکسی:** Chrome Headless روی یک سیستم تازه به چند کتابخانهی
> سیستمی نیاز دارد. اگر خطای
> `error while loading shared libraries: libnspr4.so` گرفتی:
> ```bash
> sudo apt-get install -y libnspr4 libnss3 libatk1.0-0 libatk-bridge2.0-0 \
>   libcups2 libdrm2 libxkbcommon0 libxcomposite1 libxdamage1 libxfixes3 \
>   libxrandr2 libgbm1 libpango-1.0-0 libcairo2 libasound2 libatspi2.0-0
> ```
> و اگر متن ویدئو ایموجی دارد (👀 / 🎉) و بهجای آن مربع میبینی:
> ```bash
> sudo apt-get install -y fonts-noto-color-emoji
> ```

---

## ۴. ساختار پروژه

```
.
├── src/
│   ├── index.ts                 # registerRoot (نقطهی ورود Remotion)
│   ├── Root.tsx                 # ثبت <Composition id="Reel"> + راهاندازی فونت
│   ├── Reel.tsx                 # تایملاین اصلی: ترنزیشنها، موزیک، وویس، افکتها
│   ├── theme.ts                 # رنگها، گرادیانها، پشتهی فونت
│   ├── fonts.ts                 # بارگذاری Vazirmatn با delayRender + FontFace
│   ├── scenes/
│   │   ├── Scene1Hook.tsx       # ۰–۳s   قلاب: سؤال + کارت پروفایل
│   │   ├── Scene2Intro.tsx      # ۳–۷s   «لازم نیست خارج بشی» + فلش
│   │   ├── Scene3Profile.tsx    # ۷–۱۲s  ۱. برو روی پروفایل
│   │   ├── Scene4Username.tsx   # ۱۲–۱۷s ۲. روی نام کاربری بزن
│   │   ├── Scene5AddAccount.tsx # ۱۷–۲۲s ۳. Add account رو بزن
│   │   ├── Scene6Form.tsx       # ۲۲–۲۷s ۴. اطلاعات اکانت جدید
│   │   └── Scene7Outro.tsx      # ۲۷–۳۰s پایانی + CTA
│   ├── components/
│   │   ├── Background.tsx       # پسزمینهی متحرک (لکههای نوری، گرید، گرین، وینیت)
│   │   ├── Phone.tsx            # قاب موبایل با پرسپکتیو، سایه و هایلایت شیشه
│   │   ├── IgProfile.tsx        # صفحهی پروفایل اینستاگرام (RTL)
│   │   ├── IgSheet.tsx          # باتمشیت «افزودن حساب» با دو گزینه
│   │   ├── IgSignup.tsx         # فرم ساخت حساب جدید
│   │   ├── IgChrome.tsx         # نوار وضعیت، تببار، آواتار، کاشیهای «عکس»
│   │   ├── SceneFrame.tsx       # اسکلت مشترک صحنهها + زوم دوربین
│   │   ├── TitleBlock.tsx       # تیتر + بج شمارهی مرحله
│   │   ├── ProgressBar.tsx      # نوار پیشرفت سگمنتی (استایل استوری)
│   │   ├── Bits.tsx             # GlowHalo، TapRipple، TouchDot، StepBadge
│   │   └── Icons.tsx            # تمام آیکونها بهصورت SVG درونخطی
│   ├── utils/
│   │   ├── timeline.ts          # منبع حقیقت تایملاین: فریم شروع/برش هر صحنه
│   │   ├── animation.ts         # enter / springIn / fadeIn / pulse / maskReveal
│   │   └── rtl.ts               # استایل متن فارسی + تبدیل ارقام لاتین به فارسی
│   └── styles/main.css          # ریست سراسری
├── scripts/
│   ├── make_music.py            # موزیک ۳۰ ثانیهای، ۱۲۰ BPM
│   ├── make_sfx.py              # tap / click / pop / whoosh / swipe / transition / success
│   ├── make_voice.py            # وویساور فارسی با edge-tts
│   ├── normalize_voice.py       # هموارسازی بلندی + لیمیتر نریشن
│   ├── finalize.mjs             # انکود تحویلدهی (yuv420p + faststart)
│   ├── render.sh                # ساخت کامل در یک فرمان
│   ├── verify_output.mjs        # QC فایل MP4
│   ├── qc_timeline.py           # تشخیص خودکار برشها روی MP4
│   ├── measure_text.py          # اندازهگیری جعبهی هر خط متن
│   └── ascii_preview.py         # نمایش فریم بهصورت ASCII
├── public/
│   ├── fonts/                   # Vazirmatn (woff2) + لایسنس
│   └── audio/                   # music.wav، sfx-*.wav، vo-*.wav
├── requirements.txt
├── remotion.config.ts
└── tsconfig.json
```

`public/` دایرکتوری استاتیک Remotion است؛ به همین دلیل فونتها و صداها آنجا
هستند و `staticFile()` آنها را پیدا میکند (توضیح در `assets/README.md`).

---

## ۵. تایملاین

| صحنه | روی صفحه | محتوا |
| --- | --- | --- |
| `Scene1Hook` | ۰–۳s | «میخوای یه اکانت دوم اینستاگرام داشته باشی؟ 👀» + کارت پروفایل با تببار درخشان |
| `Scene2Intro` | ۳–۷s | «لازم نیست از اکانت فعلیت خارج بشی!» + فلش متحرک به سمت بخش پروفایل |
| `Scene3Profile` | ۷–۱۲s | ۱. برو روی پروفایل — اشارهگر روی آیکون پروفایل tap میکند |
| `Scene4Username` | ۱۲–۱۷s | ۲. روی نام کاربری بزن — هایلایت نام کاربری + باز شدن منوی کوچک |
| `Scene5AddAccount` | ۱۷–۲۲s | ۳. Add account رو بزن — باتمشیت، «ساخت حساب جدید» درخشان میشود |
| `Scene6Form` | ۲۲–۲۷s | ۴. اطلاعات اکانت جدیدتو وارد کن — نام کاربری / رمز / ایمیل |
| `Scene7Outro` | ۲۷–۳۰s | «تموم شد! 🎉» + «حالا دو اکانت روی یه گوشی داری.» + CTA |

برشها دقیقاً روی **۳ / ۷ / ۱۲ / ۱۷ / ۲۲ / ۲۷ ثانیه** و طول ترنزیشن ۱۰ فریم (۰.۳۳s) است.

### چرا مدتزمان صحنهها عددهای عجیب مثل ۱۳۰ و ۱۶۰ دارند؟

با `<TransitionSeries>` هر صحنه ۱۰ فریم با صحنهی بعدی همپوشانی دارد، پس:

```
start(i) = start(i-1) + duration(i-1) - T        (T = ۱۰ فریم)
cut(i)   = start(i)   + T/2                       ← برشی که کاربر میبیند
```

یعنی نمیتوانی بگویی «هر صحنه ۵ ثانیه». باید معادله را از آخر به اول حل کنی:

```
cut(0) = 90   → duration(0) = 95
cut(1) = 210  → duration(1) = 130
cut(2) = 360  → duration(2) = 160
cut(3) = 510  → duration(3) = 160
cut(4) = 660  → duration(4) = 160
cut(5) = 810  → duration(5) = 160
```

مجموع شش صحنهی اول = `95+130+160+160+160+160 = 865`، پس:

```
start(6) = 865 − 6×10 = 805
طول کل باید ۹۰۰ باشد ⇒ duration(6) = 900 − 805 = 95
```

مجموع = ۹۶۰ ؛ منهای `6 × 10` = **دقیقاً ۹۰۰ فریم = ۳۰.۰۰۰ ثانیه**.

این محاسبه در `src/utils/timeline.ts` کد شده و `COMPUTED_LENGTH` صحتش را چک میکند.

---

## ۶. ساخت از صفر، گامبهگام

### گام ۱ — راهاندازی و انتخاب نسخهها

```bash
npm init -y
npm i remotion@4.0.531 @remotion/cli@4.0.531 @remotion/transitions@4.0.531 \
      @remotion/fonts@4.0.531 react@19 react-dom@19
npm i -D typescript @types/react @types/react-dom ffmpeg-static ffprobe-static
```

> ⚠️ **نسخهی React را حتماً با Remotion هماهنگ کن.** جزئیات در بخش چالشها.

`remotion.config.ts` تنظیمات پیشفرض رندر را نگه میدارد:

```ts
import {Config} from '@remotion/cli/config';
Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(95);
Config.setCodec('h264');
Config.setCrf(18);
Config.setPixelFormat('yuv420p');
Config.setOverwriteOutput(true);
```

### گام ۲ — فارسی و RTL

اینجا هیچ کتابخانهی text-shaping لازم نیست؛ اما **باید مطمئن شوی فونت قبل از
فریم اول لود شده**، وگرنه متن با فونت جانشین (و در نهایت مربع) رندر میشود:

```ts
// src/fonts.ts
const handle = delayRender('Loading Vazirmatn');
ensureFonts()                              // FontFace(...).load() برای هر وزن
  .then(() => continueRender(handle))
  .catch(() => continueRender(handle));
```

و استایل پایهی هر متن فارسی:

```ts
// src/utils/rtl.ts
export const faStyle = (extra?: CSSProperties): CSSProperties => ({
  fontFamily: FONT,
  direction: 'rtl',
  unicodeBidi: 'plaintext',   // الگوریتم bidi مرورگر، چسبیدن حروف درست انجام میشود
  fontKerning: 'normal',
  ...extra,
});
```

قواعدی که رعایت شد:

- هیچوقت رشتهی فارسی را برای انیمیشن به کاراکتر تقسیم نکن — همیشه کل رشته را
  عبور بده و روی `opacity/transform` انیمیت کن.
- روی متن فارسی `letter-spacing` نگذار (چسبیدن حروف را خراب میکند).
- ارقام را با هلپر به فارسی تبدیل کن: `fa(48)` → `۴۸`.
- کل رابط اینستاگرام برای RTL آینه شد: آواتار سمت راست، فلش بازگشت به راست،
  نوار پیشرفت استوری از راست به چپ، و ردیفهای باتمشیت `dir="rtl"`.

### گام ۳ — سیستم طراحی

- رنگها و گرادیان در یک جا: `src/theme.ts`
  (`#0B0B10` پسزمینه، `#15151D` کارت، گرادیان اینستاگرام `#833AB4 → #E1306C → #F77737 → #FCAF45`).
- همهی آیکونها SVG درونخطی با `currentColor` (`src/components/Icons.tsx`) — بدون آیکون آماده.
- «عکس»های گرید پروفایل با یک تابع قطعی ساخته میشوند (`PhotoTile({seed})`) و
  هرگز تصویر placeholder نیستند.

### گام ۴ — پسزمینهی مشترک

پسزمینه **بیرون** از `TransitionSeries` رندر میشود. اگر داخل صحنهها باشد،
هر کراسفید به سیاهی میافتد. پس لایهها اینطور چیده شدند:

```tsx
<AbsoluteFill>
  <Background />                    {/* دائمی، روی همهی ۳۰ ثانیه */}
  <TransitionSeries>{...}</TransitionSeries>
  <ProgressBar />
  <Audio src={staticFile('audio/music.wav')} volume={MUSIC_VOLUME} />
</AbsoluteFill>
```

### گام ۵ — صحنهها و انیمیشن

هر صحنه روی «اسکلت» مشترک `SceneFrame` سوار است: تیتر بالا، موبایل در مرکز،
پیشنویس/زیرنویس پایین، و یک زوم آرام دوربین که نمیگذارد صحنه ساکن به نظر برسد.

کتابخانهی انیمیشن (`src/utils/animation.ts`) همهی ورودها را یکدست میکند:

```ts
export const enter = (frame, {delay = 0, dur = 14, distance = 46, blurFrom = 0}) => {
  const p = progress(frame, delay, dur);
  return {
    opacity: interpolate(p, [0, 0.25, 1], [0, 0.9, 1]),
    transform: `translate3d(0, ${(1 - p) * distance}px, 0)`,
    filter: blurFrom ? `blur(${(1 - p) * blurFrom}px)` : undefined,
  };
};
```

الگوهای استفادهشده: `Fade`، `Slide Up`، `Scale`، `Spring`، `Blur`، `Glow`،
`Pulse`، `Mask Reveal` و «زوم آرام دوربین». هدف: هیچ عنصر مهمی ناگهانی ظاهر نشود.

### گام ۶ — صدا

**موزیک** (`scripts/make_music.py`) — ۳۰ ثانیه، ۱۲۰ BPM، پیشروی Am–F–C–G،
با kick، clap، hi-hat، باس هشتم، آرپ ۱۶م و پد. همه با numpy:

```python
def kick():
    n = int(0.42 * SR)
    t = np.arange(n) / SR
    f = 150.0 * np.exp(-t * 28.0) + 46.0          # سوئیپ فرکانس ۱۵۰ → ۴۶ هرتز
    phase = 2 * np.pi * np.cumsum(f) / SR          # انتگرال فرکانس = فاز
    body = np.sin(phase) * np.exp(-t * 7.5)
    click = rng.normal(0, 1, n) * np.exp(-t * 220.0) * 0.35
    return (body + click) * 0.95
```

**افکت صوتی** (`scripts/make_sfx.py`) — هفت افکت: `tap`, `click`, `pop`,
`whoosh`, `swipe`, `transition`, `success`. هر کدام چند میلیثانیه و ساختهشده
از نویز + سینوس با پاکت نمایی.

**وویساور** (`scripts/make_voice.py`) — با `edge-tts` و صدای `fa-IR-FaridNeural`.
مهمترین تصمیم: **هر صحنه یک کلیپ جدا**، نه یک فایل ۳۰ ثانیهای. اینطور
میشود دقیقاً روی برش همان صحنه گذاشتش و زمانبندی قطعی است.

```python
LINES = [
    (1, 0.10, 2.60, "+30%", "میخوای یه اکانت دوم اینستاگرام داشته باشی؟"),
    (2, 3.15, 3.40, "+10%", "لازم نیست از اکانت فعلیت خارج بشی."),
    ...
]
```

برای هر خط `start` و `window` تعریف شد، بعد با `ffprobe` طول واقعی هر کلیپ
اندازهگیری و چک شد که داخل پنجرهاش جا میشود (اگر نه، `rate` را بالا میبریم).

### گام ۷ — میکس و مسترینگ

`scripts/normalize_voice.py` هر کلیپ را به **RMS یکسان (۴۰۰۰)** میرساند و با
یک soft-limiter (زانوی `tanh`) پیکها را مهار میکند — بدون کلیک و اعوجاج.

```python
TARGET_RMS = 4000.0
y = soft_limit((raw / 32767.0) * gain)    # gain = TARGET_RMS / rms
```

و موزیک روی `MUSIC_VOLUME = 0.2` مینشیند تا نریشن حدود **۹ دسیبل** بالاتر از
بستر موسیقی باشد.

### گام ۸ — رندر

```bash
# مرحلهی ۱: مستر (کیفیت بالا، حجم بزرگتر)
npx remotion render src/index.ts Reel out/.master.mp4 --crf=18

# مرحلهی ۲: انکود تحویلدهی
node scripts/finalize.mjs out/.master.mp4 out/reel-second-account.mp4
```

مرحلهی دوم لازم است چون پایپلاین JPEG در Remotion ویدئوی **full-range**
(`yuvj420p`) میسازد؛ پلتفرمهای اجتماعی `yuv420p` با محدودهی TV و تگهای
BT.709 میخواهند. `finalize.mjs` همان را تضمین میکند و `+faststart` هم
میگذارد تا ویدئو در مرورگر سریع شروع شود.

### گام ۹ — کنترل کیفیت

هر بار بعد از رندر:

```bash
node scripts/verify_output.mjs out/reel-second-account.mp4   # مشخصات فنی
python3 scripts/qc_timeline.py out/reel-second-account.mp4    # درستی برشها
```

---

## ۷. چالشها و راهحلها

چیزهایی که واقعاً در مسیر ساخت گیر کردند — با علامت، علت و راهحل.

### ۷.۱ ناسازگاری React 18 با Remotion 4.0.531

**علامت:** باندل fail میشد:

```
Error: export '__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE'
(imported as 'React2') was not found in 'react'
```

**علت:** نسخهی Remotion 4.0.531 روی React 19 کامپایل شده و به APIهای داخلی
React 19 وابسته است.

**راهحل:** ارتقا به `react@19` و `react-dom@19` (+ تایپهای `19`). این اولین
چیزی است که باید قبل از کد نوشتن چک کنی.

### ۷.۲ تایملاین با `TransitionSeries` جابهجا میشد

**علامت:** صحنهها طول درستی داشتند، ولی صحنهی ۶ روی فریم ۶۳۵ شروع میشد
نه ۶۶۰ — یعنی حدود ۰.۸ ثانیه انحراف، و خروجی هم ۹۰۰ فریم نبود.

**علت:** فرض کرده بودم شروع هر صحنه جمع مدتزمانهای قبلی است. در واقع هر
ترنزیشن ۱۰ فریم همپوشانی ایجاد میکند:

```
start(i) = start(i-1) + duration(i-1) - T
```

**راهحل:** مدتزمانها را از روی نقاط برشِ مطلوب **از آخر به اول** حل کردم
(بخش تایملاین را ببین). برای اطمینان، `scripts/qc_timeline.py` روی خود MP4
نهایی برشها را تشخیص میدهد و با مقادیر موردانتظار مقایسه میکند:

```
expect  3.0 s -> nearest strong change 2.875s  OK
expect  7.0 s -> nearest strong change 7.125s  OK
expect 12.0 s -> nearest strong change 11.875s OK
expect 17.0 s -> nearest strong change 17.125s OK
expect 22.0 s -> nearest strong change 21.875s OK
expect 27.0 s -> nearest strong change 27.125s OK
```

### ۷.۳ موزیک، وویساور را میپوشاند

**علامت:** ویدئو رندر شد و همهچیز «درست» بود، ولی نریشن زیر موزیک گم بود.
عدد گرفتن معلوم کرد:

```
mean VO RMS    : 2756
mean music RMS : 2738
voice/music ratio: 1.01x      ← فاجعه
```

منابع: `music.wav` با RMS ۶۷۳۷ و پیک ۸۲٪، و کلیپهای `edge-tts` با
RMS فقط ۱۴۰۰–۲۵۰۰ و پیکهای پراکنده.

**راهحل:** دولایه —
۱) `normalize_voice.py` همهی خطوط را به RMS ۴۰۰۰ رساند و با soft-limiter
پیکها را مهار کرد؛
۲) `MUSIC_VOLUME` از ۰.۳۸ به ۰.۲ آمد.

نتیجهی اندازهگیری روی MP4 نهایی:

```
mean voice window RMS : 3233
mean music-only RMS   : 1457
voice vs bed          : +6.9 dB
peak                  : 28563 (87.2% FS)   ← ۱۳٪ هدروم، بدون کلیپینگ
```

### ۷.۴ خروجی `yuvj420p` بهجای `yuv420p`

**علامت:** با اینکه `--pixel-format=yuv420p` پاس شده بود، ffprobe میگفت
`yuvj420p` (محدودهی full).

**راهحل:** یک پاس انکود نهایی با تگهای رنگ صریح
(`-color_range tv -colorspace bt709`) در `scripts/finalize.mjs`. خروجی حالا
استاندارد پخش است و روی پلیرهای سختگیر «واشده» دیده نمیشود.

### ۷.۵ حروف جدا یا مربع (tofu) در فارسی

**نکتهی مهم:** مرورگر حروف فارسی را **همیشه** درست میچسباند. خطر واقعی این
است که فونت لود نشود و متن با فونت جانشین (بدون پوشش فارسی) رندر شود.

**راهحل:** بارگذاری فونت با `delayRender` تا فریم اول، و بعد **تست تفاضلی**
برای اثبات اینکه فونت واقعاً اعمال میشود: یک فریم با فونت و یک فریم بدون
پوشهی `public/fonts` رندر شد و اختلاف در ناحیهی تیتر اندازهگیری شد:

```
title-band pixels differing >40: 23745 = 6.35%   (max diff 240)
```

اگر فونت اعمال نمیشد، این عدد نزدیک صفر بود.

### ۷.۶ جعبهی متنی و اندازهگیری بلندی

دو باگ کوچک ولی واقعی در همان مسیر:

- در `normalize_voice.py` اول روی نمونههای خام محدودسازی زدم
  (`clip(x, -0.7, 0.7)` روی مقادیر ±۳۲۷۶۷) و خروجی عملاً سکوت شد.
  راهحل: اول به محدودهی ±۱ نرمال کن، بعد گین و لیمیتر.
- اموجیها (👀 🎉) بدون `fonts-noto-color-emoji` مربع میشدند.

### ۷.۷ افکتهای سنگین روی یک هستهی CPU

**علامت:** محیط رندر فقط ۱ هسته داشت. `Config.setConcurrency(2)` باعث خطای
`Maximum for --concurrency is 1` میشد، و لکههای پسزمینه با `filter: blur(130px)`
رندر را غیرقابلتحمل میکردند.

**راهحل:**
- حذف `setConcurrency` تا خودش با تعداد هستهها تنظیم شود.
- جای `blur(130px)` روی سه لایهی بزرگ، از `radial-gradient` با falloff بلند
  استفاده شد (ظاهر مشابه، هزینهی بسیار کمتر).
- `backdropFilter` حذف شد.
- نتیجه: حدود **۰.۴ ثانیه به ازای هر فریم** ⇒ کل رندر حدود ۷ دقیقه.

### ۷.۸ رندر طولانی و محدودیت ترمینال

**علامت:** ترمینال هر فرمان را حداکثر ۱۸۰ ثانیه نگه میدارد؛ رندر ۹۰۰ فریمی
بیشتر طول میکشد.

**راهحل:** رندر بهصورت job پسزمینه با لاگ در فایل، و polling با `tail`.
مهم: بعد از تمام شدن رندر، `finalize` و `verify` را جدا اجرا کن.

### ۷.۹ رندر «کور» — بدون نمایشگر

**چالش اصلی این پروژه:** هیچ راهی برای دیدن فریمها نبود. برای همین یک
جعبهی ابزار کنترل کیفیت عددی ساختم:

| اسکریپت | چه چیزی را چک میکند |
| --- | --- |
| `ascii_preview.py` | فریم را به ASCII تبدیل میکند تا چیدمان قابل خواندن باشد |
| `measure_text.py` | جعبهی هر خط متن را میدهد (y0,y1,h و x0,x1,w و مرکز) |
| `qc_stills.py` | نسبت «جوهر» در باندهای تیتر/موبایل/زیرنویس |
| `qc_timeline.py` | برشها را روی MP4 نهایی پیدا میکند |
| `verify_output.mjs` | مدت، ابعاد، fps، کدک، پیکسلفرمت، نرخ نمونه |

مثال واقعی از `measure_text.py` روی صحنهی پایانی:

```
y  876-985  h=110  x 291-795  w=505  center_x=543   ← «تموم شد! 🎉» (فونت ۹۴)
y 1015-1059 h=45   x 255-826  w=572  center_x=540   ← «حالا دو اکانت…» (فونت ۴۴)
y 1399-1478 h=80   x 287-839  w=553  center_x=563   ← پیل CTA
```

`center_x ≈ 540` یعنی متن دقیقاً وسط است، و ارتفاعها با اندازهی فونت تعریفشده
میخوانند. همینطور `qc_timeline.py` یک باگ تایملاین را گرفت که با چشم هم
احتمالاً دیرتر پیدا میشد.

---

## ۸. نکتههای کلیدی

**فارسی و RTL**

- شکلدهی فارسی کار مرورگر است؛ تو فقط باید فونت را تضمین کنی.
- هیچوقت رشته را به کاراکتر نشکن. همیشه `opacity/transform/filter` را انیمیت کن.
- `direction: rtl` + `unicode-bidi: plaintext` برای متن خالص، و `isolate` برای
  متن مخلوط (مثل «Add account» در جملهی فارسی).
- روی فارسی `letter-spacing` نگذار.
- `word-break: keep-all` در CSS سراسری کمک میکند کلمهی فارسی وسط شکسته نشود.

**موشن**

- `background` را بیرون از `TransitionSeries` بگذار تا کراسفیدها به سیاهی نیفتند.
- `spring` برای ورودهای «جاندار»، `interpolate` با easing برای حرکتهای خطی.
- هر صحنه یک «زوم آرام دوربین» بده (`scale` از ۱.۰۴ به ۱.۰) — ارزان ولی مؤثر.
- تصادفیبودن باید قطعی باشد: از `random(seed)` خود Remotion استفاده کن، وگرنه
  ذرات هر فریم جابهجا میشوند و ویدئو «نویزی» دیده میشود.

**صدا**

- برای هر صحنه یک کلیپ جدا بساز؛ همگامسازی را بینهایت ساده میکند.
- همیشه طول واقعی کلیپها را با `ffprobe` اندازه بگیر و داخل پنجرهی صحنه چک کن.
- قبل از تحویل، RMS نریشن و موزیک را جدا اندازه بگیر. عدد، جای حدس را میگیرد.

**رندر**

- روی ماشین کمهسته، افکتهای `blur`/`backdrop-filter` را جدی بگیر.
- `--crf=18` برای شبکههای اجتماعی کافی است؛ `16` حجم را بالا میبرد بدون سود دیدهشدنی.
- همیشه یک پاس انکود نهایی برای پیکسلفرمت و رنگ بزن.

---

## ۹. سفارشیسازی

| میخواهی چه چیزی را عوض کنی | کجا |
| --- | --- |
| متنها و تیترها | فایل همان صحنه در `src/scenes/SceneN*.tsx` |
| رنگها و گرادیانها | `src/theme.ts` |
| نقاط برش صحنهها | `DURATIONS` و `META` در `src/utils/timeline.ts` |
| سرعت موزیک | `BPM` در `scripts/make_music.py` |
| حالت موزیک | `PROG` (آکوردها) و بخش `arrangement` در `scripts/make_music.py` |
| صدای گوینده و متن نریشن | `VOICE` و `LINES` در `scripts/make_voice.py` |
| بلندی نریشن | `TARGET_RMS` در `scripts/normalize_voice.py` |
| بلندی موزیک | `MUSIC_VOLUME` در `src/utils/timeline.ts` |
| زمانبندی افکتهای صوتی | `SFX_CUES` در `src/utils/timeline.ts` |
| نقاط tap / اشارهگر | ثابتهای `TAB` / `USERNAME` / `ROW2` در صحنهها |

بعد از هر تغییر ساختاری، تایپچک و رندر:

```bash
npm run typecheck
sh scripts/render.sh
```

اگر میخواهی فقط سریع پیشنمایش بگیری: `npm run studio`.

---

## ۱۰. کنترل کیفیت

```bash
# ۱) تایپچک
npm run typecheck

# ۲) رندر + انکود + QC در یک فرمان
sh scripts/render.sh

# ۳) جداگانه
npm run verify                                          # مشخصات فنی MP4
python3 scripts/qc_timeline.py out/reel-second-account.mp4   # برشها
python3 scripts/qc_stills.py                            # (اختیاری) روند فریمها
```

خروجی موفق:

```
total frames = 900  ·  1080x1920  ·  30fps  ·  30.00s
RESULT: PASS
```

چکلیستی که قبل از انتشار باید سبز باشد:

- [ ] مدت دقیقاً ۳۰ ثانیه
- [ ] ابعاد ۱۰۸۰×۱۹۲۰
- [ ] نرخ فریم ۳۰
- [ ] فارسی RTL و حروف چسبیده
- [ ] هیچ متن انگلیسی ناخواسته (فقط `Add account` که عمدی است و `my_new_account` که نام کاربری است)
- [ ] همهی صحنهها کامل
- [ ] ترنزیشنها روان
- [ ] صدا همگام با تصویر
- [ ] MP4 بدون مشکل پخش میشود

---

## ۱۱. مجوز و اعتبارها

| منبع | وضعیت |
| --- | --- |
| **Vazirmatn** | فونت آزاد تحت SIL OFL — لایسنس در `public/fonts/Vazirmatn-LICENSE.txt` |
| **Remotion** | لایسنس Remotion (برای استفادهی تجاری شرایط خودش را دارد — قبل از انتشار تجاری چک کن) |
| **edge-tts** | دسترسی به سرویس TTS مایکروسافت؛ وویساور تولیدی را قبل از استفادهی تجاری از نظر شرایط سرویس بررسی کن |
| **موزیک، SFX، UI، آیکونها** | کاملاً تولید این پروژه — بدون دارایی ثالث |

---

## ۱۲. محدودیتها و کارهای بعدی

- **سرعت رندر:** روی یک هسته حدود ۷ دقیقه. با `--concurrency` بالاتر روی ماشین
  چند هستهای خیلی سریعتر میشود.
- **زیرنویس سوخته:** فعلاً نریشن هست ولی زیرنویس روی تصویر نیامده. اگر ویدئو
  بیصدا دیده شود، افزودن زیرنویس همگام ارزش زیادی دارد.
- **نسخههای ۶۰fps:** ساختار آماده است، فقط `FPS` در `timeline.ts` و مدتزمانها
  باید ضربدر ۲ شوند.
- **نسخهی انگلیسی:** با تغییر `LINES`/صحنهها و برگرداندن `direction` به `ltr`
  قابل ساخت است.
- **Git LFS:** فایل MP4 در ریپو کامیت شده (۱۳.۸ مگابایت). با زیاد شدن ویدئوها
  بهتر است به Git LFS یا GitHub Releases منتقل شود.
- **پیشنمایش/دیپلوی:** این یک پایپلاین رندر است، نه اپ وب؛ به همین دلیل
  `dist/` و سرور پیشنمایش ندارد. خروجی، خود فایل MP4 است.

---

ساختهشده با [Remotion](https://remotion.dev) · فونت [Vazirmatn](https://github.com/rastikerdar/vazirmatn)
