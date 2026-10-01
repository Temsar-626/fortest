import type {CSSProperties} from 'react';
import {FONT} from '../theme';

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

/** Convert latin digits inside a string to Persian digits. */
export const fa = (input: string | number): string =>
  String(input).replace(/[0-9]/g, (d) => PERSIAN_DIGITS[Number(d)]);

/**
 * Base style for every visible piece of Persian copy.
 * `unicode-bidi: plaintext` lets the browser apply the Unicode bidi algorithm
 * and Arabic/Persian shaping, so letters always join correctly
 * (مرحله — never م ر ح ل ه).
 */
export const faStyle = (extra?: CSSProperties): CSSProperties => ({
  fontFamily: FONT,
  direction: 'rtl',
  unicodeBidi: 'plaintext',
  fontKerning: 'normal',
  WebkitFontSmoothing: 'antialiased',
  ...extra,
});

/** Same as `faStyle` but for mixed-script lines that must be isolated. */
export const faIsolate = (extra?: CSSProperties): CSSProperties => ({
  ...faStyle(extra),
  unicodeBidi: 'isolate',
});
