import {continueRender, delayRender, staticFile} from 'remotion';

/**
 * Persian text shaping is done natively by the browser engine, so the only
 * thing we must guarantee is that a real Persian-capable font is loaded
 * *before* the first frame is captured. We block the renderer with
 * `delayRender` until every Vazirmatn weight is ready.
 */
const WEIGHTS = [400, 500, 600, 700, 800, 900];

let loaded = false;
let promise: Promise<void> | null = null;

const loadOne = (family: string, file: string, weight: number) => {
  const face = new FontFace(family, `url(${staticFile(file)})`, {
    weight: String(weight),
    style: 'normal',
    display: 'block',
  });
  return face.load().then((f) => {
    document.fonts.add(f);
  });
};

export const ensureFonts = (): Promise<void> => {
  if (loaded) {
    return Promise.resolve();
  }
  if (promise) {
    return promise;
  }
  promise = Promise.all([
    ...WEIGHTS.map((w) => loadOne('Vazirmatn', `fonts/Vazirmatn-${w}.woff2`, w)),
    ...WEIGHTS.map((w) => loadOne('VazirmatnLatin', `fonts/VazirmatnLatin-${w}.woff2`, w)),
  ])
    .then(() => document.fonts.ready)
    .then(() => {
      loaded = true;
    })
    .catch((err) => {
      // Never block the render on a font hiccup — log and continue.
      console.warn('font load issue', err);
    });
  return promise;
};

/** Call once at module scope of the root component. */
export const blockUntilFontsReady = (): void => {
  const handle = delayRender('Loading Vazirmatn');
  ensureFonts()
    .then(() => continueRender(handle))
    .catch(() => continueRender(handle));
};
