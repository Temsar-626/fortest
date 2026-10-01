import type {CSSProperties} from 'react';
import {Easing, interpolate, spring} from 'remotion';

const easeOut = Easing.out(Easing.cubic);
const easeInOut = Easing.inOut(Easing.quad);

const put = (frame: number, from: number, to: number, easing = easeOut) =>
  interpolate(frame, [0, 1], [from, to], {
    easing,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }) as number;

/** 0 → 1 fade with an out-cubic ease. */
export const fadeIn = (frame: number, delay = 0, dur = 12): number =>
  interpolate(frame, [delay, delay + dur], [0, 1], {
    easing: easeOut,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/** 1 → 0 fade. */
export const fadeOut = (frame: number, start: number, dur = 10): number =>
  interpolate(frame, [start, start + dur], [1, 0], {
    easing: Easing.in(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/** Generic 0→1 progress with custom easing. */
export const progress = (
  frame: number,
  delay: number,
  dur: number,
  easing: (t: number) => number = easeOut,
): number =>
  interpolate(frame, [delay, delay + dur], [0, 1], {
    easing,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

export const inOut = (frame: number, delay: number, dur: number): number =>
  progress(frame, delay, dur, easeInOut);

type SpringOpts = {
  damping?: number;
  stiffness?: number;
  mass?: number;
  delay?: number;
  durationInFrames?: number;
};

/** Springy 0 → ~1 entrance (slight overshoot by default). */
export const springIn = (
  frame: number,
  fps: number,
  opts: SpringOpts = {},
): number =>
  spring({
    frame: frame - (opts.delay ?? 0),
    fps,
    config: {
      damping: opts.damping ?? 15,
      stiffness: opts.stiffness ?? 130,
      mass: opts.mass ?? 0.85,
    },
    durationInFrames: opts.durationInFrames,
  });

export type EnterOpts = {
  delay?: number;
  dur?: number;
  distance?: number;
  scaleFrom?: number;
  blurFrom?: number;
  easing?: (t: number) => number;
};

/**
 * Standard "kinetic" entrance: slide + fade + optional blur & scale.
 * Returns ready-to-spread CSS properties.
 */
export const enter = (frame: number, o: EnterOpts = {}): CSSProperties => {
  const delay = o.delay ?? 0;
  const dur = o.dur ?? 14;
  const distance = o.distance ?? 46;
  const scaleFrom = o.scaleFrom ?? 1;
  const blurFrom = o.blurFrom ?? 0;
  const p = progress(frame, delay, dur, o.easing ?? easeOut);
  const opacity = interpolate(p, [0, 0.25, 1], [0, 0.9, 1]);
  return {
    opacity,
    transform: `translate3d(0, ${(1 - p) * distance}px, 0) scale(${
      scaleFrom + (1 - scaleFrom) * p
    })`,
    filter: blurFrom ? `blur(${(1 - p) * blurFrom}px)` : undefined,
    willChange: 'transform, opacity, filter',
  };
};

/** Entrance with a scale-pop (used for badges / chips). */
export const pop = (
  frame: number,
  fps: number,
  delay: number,
  from = 0.6,
): CSSProperties => {
  const p = springIn(frame, fps, {delay, damping: 12, stiffness: 180, mass: 0.7});
  const opacity = fadeIn(frame, delay, 8);
  return {
    opacity,
    transform: `scale(${from + (1 - from) * p})`,
    willChange: 'transform, opacity',
  };
};

/** Mask-reveal: content is wiped in from one side. */
export const maskReveal = (
  frame: number,
  delay = 0,
  dur = 16,
  direction: 'right' | 'left' | 'up' = 'right',
): CSSProperties => {
  const p = progress(frame, delay, dur, Easing.out(Easing.cubic));
  const closed =
    direction === 'up'
      ? `inset(0 0 ${100 - p * 100}% 0)`
      : direction === 'right'
        ? `inset(0 0 0 ${100 - p * 100}%)`
        : `inset(0 ${100 - p * 100}% 0 0)`;
  return {
    clipPath: p >= 1 ? 'none' : closed,
    WebkitClipPath: p >= 1 ? 'none' : closed,
    willChange: 'clip-path',
  };
};

/** Exponential ease for continuous camera moves. */
export const drift = (
  frame: number,
  from: number,
  to: number,
  delay: number,
  dur: number,
): number => progress(frame, delay, dur, Easing.inOut(Easing.quad)) * (to - from) + from;

export const pulse = (frame: number, fps: number, period = 1.1, delay = 0): number => {
  const t = ((frame - delay) / fps) / period;
  return 0.5 + 0.5 * Math.sin(t * Math.PI * 2);
};

export {put};
