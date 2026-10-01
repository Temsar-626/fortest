import {AbsoluteFill, interpolate, random, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, GRADIENT_IG} from '../theme';
import {faStyle} from '../utils/rtl';
import {enter, fadeIn, progress, springIn} from '../utils/animation';
import {Avatar} from '../components/IgChrome';
import {ProfileIcon, SparkleIcon} from '../components/Icons';
import {Phone} from '../components/Phone';
import {IgProfile} from '../components/IgProfile';

const BADGE = {x: 540, y: 690, size: 268};

const Rings: React.FC<{start: number}> = ({start}) => {
  const frame = useCurrentFrame();
  return (
    <>
      {[0, 1, 2].map((i) => {
        const p = progress(frame, start + i * 8, 34);
        if (p <= 0 || p >= 1) {
          return null;
        }
        const eased = 1 - Math.pow(1 - p, 2.4);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: BADGE.x - BADGE.size / 2,
              top: BADGE.y - BADGE.size / 2,
              width: BADGE.size,
              height: BADGE.size,
              borderRadius: '50%',
              border: `4px solid rgba(247,119,55,${(1 - eased) * 0.75})`,
              transform: `scale(${1 + eased * 2.8})`,
              opacity: 1 - eased,
            }}
          />
        );
      })}
    </>
  );
};

const Confetti: React.FC<{start: number}> = ({start}) => {
  const frame = useCurrentFrame();
  const p = progress(frame, start, 34);
  if (p <= 0 || p >= 1) {
    return null;
  }
  const eased = 1 - Math.pow(1 - p, 3);
  const palette = ['#833AB4', '#E1306C', '#F77737', '#FCAF45', '#ffffff'];
  return (
    <>
      {new Array(30).fill(true).map((_, i) => {
        const angle = (i / 30) * Math.PI * 2 + random(`ca${i}`) * 0.4;
        const dist = 240 + random(`cd${i}`) * 420;
        const size = 8 + random(`cs${i}`) * 14;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: BADGE.x + Math.cos(angle) * dist * eased,
              top: BADGE.y + Math.sin(angle) * dist * eased,
              width: size,
              height: size,
              borderRadius: i % 3 === 0 ? 2 : '50%',
              background: palette[i % palette.length],
              opacity: (1 - eased) * 0.9,
              transform: `rotate(${eased * 260 + i * 12}deg)`,
            }}
          />
        );
      })}
    </>
  );
};

/** 27 – 30s · Outro: everything collapses into a profile icon + call to action. */
export const Scene7Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const collapse = progress(frame, 0, 18);
  const badgeS = springIn(frame, fps, {delay: 4, damping: 13, stiffness: 150, mass: 0.8});
  const badgeO = fadeIn(frame, 4, 10);

  const title = enter(frame, {delay: 12, dur: 14, distance: 56, blurFrom: 16});
  const sub = enter(frame, {delay: 20, dur: 14, distance: 40, blurFrom: 10});
  const avatars = enter(frame, {delay: 26, dur: 14, distance: 34, blurFrom: 8});
  const cta = enter(frame, {delay: 34, dur: 16, distance: 40, blurFrom: 10});

  const ctaPulse = 0.5 + 0.5 * Math.sin(frame / 9);

  return (
    <AbsoluteFill>
      {/* the mockup collapses away */}
      <div
        style={{
          position: 'absolute',
          top: 546,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          opacity: 1 - collapse,
          transform: `translateY(${collapse * 90}px) scale(${1 - collapse * 0.32})`,
          filter: `blur(${collapse * 10}px)`,
        }}
      >
        <Phone width={600} rotateY={0} rotateX={0} glow={0.2}>
          <IgProfile profileTabGlow={0.5} />
        </Phone>
      </div>

      <Rings start={8} />
      <Confetti start={10} />

      {/* success badge */}
      <div
        style={{
          position: 'absolute',
          left: BADGE.x - BADGE.size / 2,
          top: BADGE.y - BADGE.size / 2,
          width: BADGE.size,
          height: BADGE.size,
          borderRadius: '50%',
          background: GRADIENT_IG,
          padding: 7,
          opacity: badgeO,
          transform: `scale(${badgeS})`,
          boxShadow: `0 0 ${60 + 40 * ctaPulse}px rgba(225,48,108,${0.45 + 0.25 * ctaPulse})`,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: '#0C0C12',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ProfileIcon size={128} color="#fff" />
        </div>
        <div
          style={{
            position: 'absolute',
            right: -6,
            top: -6,
            width: 74,
            height: 74,
            borderRadius: '50%',
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
            transform: `scale(${0.6 + 0.4 * badgeS})`,
          }}
        >
          <SparkleIcon size={44} color="#E1306C" />
        </div>
      </div>

      {/* headline */}
      <div
        style={{
          position: 'absolute',
          top: 862,
          left: 0,
          right: 0,
          textAlign: 'center',
          ...faStyle({
            fontSize: 94,
            fontWeight: 900,
            color: '#fff',
            textShadow: '0 14px 44px rgba(0,0,0,0.7)',
          }),
          ...title,
        }}
      >
        تموم شد! 🎉
      </div>

      <div
        style={{
          position: 'absolute',
          top: 1004,
          left: 0,
          right: 0,
          textAlign: 'center',
          ...faStyle({fontSize: 44, fontWeight: 600, color: '#D8D8E6', lineHeight: 1.6}),
          ...sub,
        }}
      >
        حالا دو اکانت روی یه گوشی داری.
      </div>

      {/* two accounts */}
      <div
        style={{
          position: 'absolute',
          top: 1128,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 22,
          ...avatars,
        }}
      >
        <Avatar size={132} seed={11} />
        <div
          style={{
            width: 58,
            height: 58,
            borderRadius: '50%',
            background: GRADIENT_IG,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 40,
            fontWeight: 900,
            color: '#fff',
            fontFamily: 'inherit',
            lineHeight: 1,
          }}
        >
          +
        </div>
        <Avatar size={132} seed={21} />
      </div>

      {/* CTA */}
      <div
        style={{
          position: 'absolute',
          top: 1372,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          ...cta,
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 16,
            padding: '24px 46px',
            borderRadius: 999,
            background: GRADIENT_IG,
            ...faStyle({fontSize: 38, fontWeight: 800, color: '#fff'}),
            boxShadow: `0 20px 50px rgba(225,48,108,${0.35 + 0.2 * ctaPulse})`,
            transform: `scale(${1 + 0.02 * ctaPulse})`,
          }}
        >
          برای آموزش‌های بیشتر فالو کن
          <span style={{transform: 'translateY(-2px)'}}>←</span>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 120,
          left: 0,
          right: 0,
          textAlign: 'center',
          ...faStyle({fontSize: 28, color: COLORS.textMuted}),
          opacity: fadeIn(frame, 50, 16),
        }}
      >
        ذخیره کن تا یادت نره
      </div>
    </AbsoluteFill>
  );
};
