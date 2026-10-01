import type {CSSProperties, ReactNode} from 'react';
import {COLORS, FONT, GRADIENT_IG} from '../theme';
import {fa, faStyle} from '../utils/rtl';

/** Big RTL headline with an optional gradient-highlighted word. */
export const Headline: React.FC<{
  children: ReactNode;
  style?: CSSProperties;
}> = ({children, style}) => (
  <div
    style={faStyle({
      fontSize: 62,
      fontWeight: 800,
      lineHeight: 1.42,
      color: COLORS.text,
      textAlign: 'center',
      textShadow: '0 8px 34px rgba(0,0,0,0.6)',
      ...style,
    })}
  >
    {children}
  </div>
);

export const GradientWord: React.FC<{children: ReactNode; style?: CSSProperties}> = ({
  children,
  style,
}) => (
  <span
    style={{
      background: GRADIENT_IG,
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent',
      fontWeight: 900,
      ...style,
    }}
  >
    {children}
  </span>
);

/** Small pill above the headline. */
export const Kicker: React.FC<{children: ReactNode; style?: CSSProperties}> = ({
  children,
  style,
}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 26px',
      borderRadius: 999,
      background: 'rgba(255,255,255,0.07)',
      border: `1px solid ${COLORS.line}`,
      ...faStyle({fontSize: 30, fontWeight: 600, color: COLORS.textDim}),
      ...style,
    }}
  >
    <span
      style={{
        width: 12,
        height: 12,
        borderRadius: 999,
        background: GRADIENT_IG,
        boxShadow: '0 0 16px rgba(225,48,108,0.9)',
      }}
    />
    {children}
  </div>
);

/** Circular step badge holding a Persian numeral. */
export const StepBadge: React.FC<{
  step: number;
  size?: number;
  glow?: number;
  style?: CSSProperties;
}> = ({step, size = 96, glow = 0, style}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      background: GRADIENT_IG,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: `0 ${size * 0.16}px ${size * 0.5}px rgba(225,48,108,${
        0.3 + 0.4 * glow
      }), 0 0 ${size * glow}px rgba(247,119,55,${0.5 * glow})`,
      transform: `scale(${1 + 0.06 * glow})`,
      flexShrink: 0,
      ...style,
    }}
  >
    <span
      style={{
        fontFamily: FONT,
        fontSize: size * 0.52,
        fontWeight: 900,
        color: '#fff',
        lineHeight: 1,
        transform: 'translateY(-2px)',
      }}
    >
      {fa(step)}
    </span>
  </div>
);

/** Expanding ripple used for taps. */
export const TapRipple: React.FC<{
  progress: number;
  size?: number;
  color?: string;
  style?: CSSProperties;
}> = ({progress, size = 190, color = 'rgba(255,255,255,0.85)', style}) => {
  if (progress <= 0 || progress >= 1) {
    return null;
  }
  const eased = 1 - Math.pow(1 - progress, 2);
  return (
    <div
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        border: `3px solid ${color}`,
        opacity: (1 - eased) * 0.85,
        transform: `scale(${0.3 + eased * 1.1})`,
        pointerEvents: 'none',
        ...style,
      }}
    />
  );
};

/** Pulsing halo, used to draw the eye to a control. */
export const GlowHalo: React.FC<{
  intensity: number;
  size?: number;
  hue?: [string, string];
  style?: CSSProperties;
}> = ({intensity, size = 220, hue = ['#E1306C', '#F77737'], style}) => {
  if (intensity <= 0) {
    return null;
  }
  return (
    <div
      style={{
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 0,
        height: 0,
        pointerEvents: 'none',
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: size * 1.7,
          height: size * 1.7,
          borderRadius: '50%',
          border: `2.5px solid ${hue[1]}`,
          opacity: 0.45 * intensity,
          transform: `translate(-50%, -50%) scale(${0.94 + 0.06 * intensity})`,
          left: '50%',
          top: '50%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${hue[0]} 0%, rgba(225,48,108,0.35) 34%, transparent 70%)`,
          opacity: 0.55 * intensity,
          transform: 'translate(-50%, -50%)',
          left: '50%',
          top: '50%',
        }}
      />
    </div>
  );
};

/** Animated arrow that points down at a target. */
export const ArrowDown: React.FC<{
  bob: number;
  height?: number;
  color?: string;
  style?: CSSProperties;
}> = ({bob, height = 120, color = '#fff', style}) => (
  <svg viewBox="0 0 40 100" style={{width: 46, height, transform: `translateY(${bob}px)`, ...style}}>
    <path
      d="M20 2v74"
      stroke={color}
      strokeWidth="7"
      strokeLinecap="round"
      strokeDasharray="10 12"
    />
    <path d="M20 98 4 66h32L20 98Z" fill={color} />
  </svg>
);

/** Rounded fake camera-style finger/touch indicator. */
export const TouchDot: React.FC<{
  pressed: number;
  size?: number;
  style?: CSSProperties;
}> = ({pressed, size = 118, style}) => (
  <div
    style={{
      position: 'absolute',
      width: size,
      height: size,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transform: `scale(${1 - pressed * 0.22})`,
      pointerEvents: 'none',
      ...style,
    }}
  >
    <div
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.18)',
        border: '2.5px solid rgba(255,255,255,0.85)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 26px rgba(255,255,255,0.35)',
      }}
    />
    <div
      style={{
        width: size * 0.3,
        height: size * 0.3,
        borderRadius: '50%',
        background: '#fff',
        boxShadow: '0 0 22px rgba(255,255,255,0.9)',
      }}
    />
  </div>
);
