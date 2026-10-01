import type {CSSProperties, ReactNode} from 'react';
import {fa, faStyle} from '../utils/rtl';
import {COLORS, GRADIENT_IG} from '../theme';
import {
  BatteryIcon,
  HomeIcon,
  ProfileIcon,
  ReelsIcon,
  SearchIcon,
  ShopIcon,
  SignalIcon,
  WifiIcon,
} from './Icons';

export const StatusBar: React.FC<{time?: string}> = ({time = '9:41'}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '22px 40px 6px',
      color: '#fff',
    }}
  >
    <div style={{...faStyle(), fontSize: 32, fontWeight: 700, letterSpacing: 0.5}}>
      {fa(time)}
    </div>
    <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
      <SignalIcon size={26} />
      <WifiIcon size={26} />
      <BatteryIcon size={34} />
    </div>
  </div>
);

/** Deterministic, abstract "photo" fill so the grid never looks like lorem. */
export const PhotoTile: React.FC<{seed: number; radius?: number; showReel?: boolean}> = ({
  seed,
  radius = 0,
  showReel = false,
}) => {
  const h1 = (seed * 47) % 360;
  const h2 = (h1 + 48) % 360;
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        borderRadius: radius,
        overflow: 'hidden',
        background: `linear-gradient(${120 + (seed % 5) * 24}deg, hsl(${h1} 62% 46%) 0%, hsl(${h2} 70% 30%) 100%)`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: `${18 + (seed % 4) * 14}%`,
          top: `${26 + (seed % 3) * 16}%`,
          width: '58%',
          height: '58%',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.22)',
          filter: 'blur(14px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: `${10 + (seed % 3) * 12}%`,
          bottom: `${8 + (seed % 4) * 10}%`,
          width: '34%',
          height: '34%',
          borderRadius: '42% 58% 55% 45%',
          background: 'rgba(0,0,0,0.28)',
          filter: 'blur(8px)',
        }}
      />
      {showReel ? (
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            opacity: 0.9,
            color: '#fff',
          }}
        >
          <ReelsIcon size={26} />
        </div>
      ) : null}
    </div>
  );
};

export const Avatar: React.FC<{
  size: number;
  seed?: number;
  ring?: boolean;
  ringThickness?: number;
}> = ({size, seed = 3, ring = true, ringThickness = 5}) => {
  const inner = size - (ring ? ringThickness * 2 + 10 : 0);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        padding: ring ? ringThickness : 0,
        background: ring ? GRADIENT_IG : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: inner,
          height: inner,
          borderRadius: '50%',
          padding: ring ? 5 : 0,
          background: '#0d0d12',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            overflow: 'hidden',
          }}
        >
          <PhotoTile seed={seed} />
        </div>
      </div>
    </div>
  );
};

export const TabBar: React.FC<{active: 'home' | 'search' | 'reels' | 'shop' | 'profile'}> = ({
  active,
}) => {
  const items: {key: typeof active; node: ReactNode}[] = [
    {key: 'home', node: <HomeIcon size={46} />},
    {key: 'search', node: <SearchIcon size={46} />},
    {key: 'reels', node: <ReelsIcon size={46} />},
    {key: 'shop', node: <ShopIcon size={46} />},
    {key: 'profile', node: <ProfileIcon size={46} />},
  ];
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '18px 26px 30px',
        borderTop: `1px solid ${COLORS.line}`,
        background: 'rgba(10,10,15,0.92)',
      }}
    >
      {items.map((it) => (
        <div
          key={it.key}
          style={{
            color: it.key === active ? '#fff' : 'rgba(255,255,255,0.42)',
            padding: 8,
            display: 'flex',
          }}
        >
          {it.node}
        </div>
      ))}
    </div>
  );
};

export const ScreenHeader: React.FC<{
  title: string;
  style?: CSSProperties;
  onBack?: boolean;
}> = ({title, style, onBack = true}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 28px 14px',
      ...style,
    }}
  >
    <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
      <ProfileIcon size={38} color="rgba(255,255,255,0.85)" />
      {onBack ? (
        <svg viewBox="0 0 24 24" style={{width: 34, height: 34}} fill="none">
          <path
            d="M15 5 8 12l7 7"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </div>
    <div style={{...faStyle(), fontSize: 34, fontWeight: 700, color: '#fff'}}>{title}</div>
    <svg viewBox="0 0 24 24" style={{width: 34, height: 34}} fill="rgba(255,255,255,0.85)">
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
    </svg>
  </div>
);
