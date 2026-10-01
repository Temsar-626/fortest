import type {CSSProperties} from 'react';
import {AbsoluteFill, interpolate, random, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, IG} from '../theme';

const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='160' height='160' filter='url(%23n)' opacity='0.5'/></svg>\")";

/**
 * Soft light blob.
 * Uses a long radial-gradient falloff instead of a CSS `blur()` — visually
 * equivalent for this purpose but dramatically cheaper to rasterise, which
 * matters a lot on a single-core render box.
 */
const Blob = ({style}: {style: CSSProperties}) => (
  <div
    style={{
      position: 'absolute',
      width: 1500,
      height: 1500,
      borderRadius: '50%',
      willChange: 'transform',
      ...style,
    }}
  />
);

/**
 * Persistent background: drifting Instagram-hued light blobs, a dot grid,
 * fine grain and a vignette. Kept *outside* the TransitionSeries so scene
 * cross-fades never dip to black.
 */
export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const t = frame / durationInFrames;

  const dx1 = Math.sin(t * Math.PI * 2.1) * 120;
  const dy1 = Math.cos(t * Math.PI * 1.7) * 150;
  const dx2 = Math.cos(t * Math.PI * 2.6) * 140;
  const dy2 = Math.sin(t * Math.PI * 2.2) * 180;

  const intensity = interpolate(t, [0, 0.06, 0.9, 1], [0, 1, 1, 0.6], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{backgroundColor: COLORS.bg, overflow: 'hidden'}}>
      <Blob
        style={{
          left: -520 + dx1,
          top: -480 + dy1,
          background: `radial-gradient(circle at 50% 50%, ${IG.purple} 0%, rgba(131,58,180,0.55) 22%, rgba(131,58,180,0) 62%)`,
          opacity: 0.62 * intensity,
        }}
      />
      <Blob
        style={{
          right: -560 + dx2,
          top: 120 + dy2,
          background: `radial-gradient(circle at 50% 50%, ${IG.pink} 0%, rgba(225,48,108,0.5) 20%, rgba(225,48,108,0) 60%)`,
          opacity: 0.55 * intensity,
        }}
      />
      <Blob
        style={{
          left: -480 + dx2 * 0.7,
          bottom: -560 + dy1 * 0.8,
          background: `radial-gradient(circle at 50% 50%, ${IG.orange} 0%, rgba(247,119,55,0.45) 20%, rgba(247,119,55,0) 60%)`,
          opacity: 0.45 * intensity,
        }}
      />

      {/* dot grid */}
      <AbsoluteFill
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.10) 1.6px, transparent 1.6px)',
          backgroundSize: '58px 58px',
          opacity: 0.5,
          maskImage: 'radial-gradient(circle at 50% 42%, #000 0%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 42%, #000 0%, transparent 78%)',
        }}
      />

      {/* floating dust particles */}
      {new Array(18).fill(true).map((_, i) => {
        const sx = random(`px${i}`) * 1080;
        const speed = 0.25 + random(`ps${i}`) * 0.6;
        const size = 2 + random(`pz${i}`) * 4;
        const y = ((random(`py${i}`) * 2100 - frame * speed) % 2100 + 2100) % 2100;
        const op = 0.1 + random(`po${i}`) * 0.35;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: sx,
              top: y - 90,
              width: size,
              height: size,
              borderRadius: '50%',
              background: i % 3 === 0 ? IG.yellow : '#ffffff',
              opacity: op * intensity,
            }}
          />
        );
      })}

      {/* vignette */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0) 42%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      <AbsoluteFill
        style={{
          backgroundImage: GRAIN,
          opacity: 0.05,
          backgroundSize: '160px 160px',
        }}
      />
    </AbsoluteFill>
  );
};
