import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, GRADIENT_IG} from '../theme';
import {fa, faStyle} from '../utils/rtl';
import {drift, enter, fadeIn, pulse, springIn} from '../utils/animation';
import {Avatar, PhotoTile} from '../components/IgChrome';
import {GlowHalo} from '../components/Bits';
import {HomeIcon, ProfileIcon, ReelsIcon, SearchIcon, ShopIcon} from '../components/Icons';

const MiniTabBar: React.FC<{glow: number}> = ({glow}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingTop: 22,
      borderTop: `1px solid ${COLORS.line}`,
      position: 'relative',
    }}
  >
    <HomeIcon size={44} color="rgba(255,255,255,0.4)" />
    <SearchIcon size={44} color="rgba(255,255,255,0.4)" />
    <ReelsIcon size={44} color="rgba(255,255,255,0.4)" />
    <ShopIcon size={44} color="rgba(255,255,255,0.4)" />

    <div style={{position: 'relative', display: 'flex'}}>
      <GlowHalo
        intensity={glow}
        size={110}
        style={{
          left: '50%',
          top: '50%',
          marginLeft: 0,
          marginTop: 0,
          zIndex: 0,
        }}
      />
      <ProfileIcon size={46} color="#fff" style={{position: 'relative', zIndex: 1}} />
    </div>
  </div>
);

/** 0 – 3s · Hook: a big question, then a real-looking profile UI with a glowing Profile tab. */
export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const zoom = drift(frame, 1.0, 1.075, 0, 95);
  const kickerStyle = enter(frame, {delay: 0, dur: 12, distance: 26});
  const l1 = enter(frame, {delay: 4, dur: 14, distance: 62, blurFrom: 14});
  const l2 = enter(frame, {delay: 10, dur: 14, distance: 62, blurFrom: 14});
  const sub = enter(frame, {delay: 15, dur: 12, distance: 34, blurFrom: 8});

  const cardSpring = springIn(frame, fps, {delay: 19, damping: 14, stiffness: 118, mass: 0.9});
  const cardOpacity = fadeIn(frame, 19, 12);
  const glow = pulse(frame, fps, 0.95, 24) * fadeIn(frame, 26, 14) * 0.95;
  const bob = Math.sin(frame / 13) * 7;

  return (
    <AbsoluteFill style={{padding: 0}}>
      <div style={{position: 'absolute', inset: 0, transform: `scale(${zoom})`}}>
        {/* kicker */}
        <div
          style={{
            position: 'absolute',
            top: 186,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            ...kickerStyle,
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              padding: '13px 30px',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.08)',
              border: `1px solid ${COLORS.line}`,
              ...faStyle({fontSize: 30, fontWeight: 600, color: '#E9E9F2'}),
            }}
          >
            <span
              style={{
                width: 13,
                height: 13,
                borderRadius: 999,
                background: GRADIENT_IG,
                boxShadow: '0 0 16px rgba(225,48,108,0.95)',
              }}
            />
            آموزش اینستاگرام · خیلی سریع
          </div>
        </div>

        {/* headline */}
        <div style={{position: 'absolute', top: 268, left: 0, right: 0, padding: '0 58px'}}>
          <div
            style={faStyle({
              fontSize: 74,
              fontWeight: 900,
              lineHeight: 1.38,
              textAlign: 'center',
              color: '#fff',
              textShadow: '0 12px 40px rgba(0,0,0,0.65)',
              ...l1,
            })}
          >
            می‌خوای یه{' '}
            <span
              style={{
                background: GRADIENT_IG,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              اکانت دوم
            </span>
          </div>
          <div
            style={faStyle({
              fontSize: 74,
              fontWeight: 900,
              lineHeight: 1.38,
              textAlign: 'center',
              color: '#fff',
              textShadow: '0 12px 40px rgba(0,0,0,0.65)',
              ...l2,
            })}
          >
            اینستاگرام داشته باشی؟ 👀
          </div>
        </div>

        {/* profile card */}
        <div
          style={{
            position: 'absolute',
            top: 872 + bob,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            opacity: cardOpacity,
            transform: `translateY(${(1 - cardSpring) * 90}px) scale(${
              0.88 + 0.12 * cardSpring
            })`,
            filter: `blur(${(1 - cardSpring) * 8}px)`,
          }}
        >
          <div
            style={{
              width: 828,
              borderRadius: 44,
              background: 'linear-gradient(168deg, #1C1C26 0%, #141420 62%, #101018 100%)',
              border: `1px solid ${COLORS.line}`,
              padding: '36px 38px 32px',
              boxShadow:
                '0 50px 110px rgba(0,0,0,0.66), 0 0 0 1px rgba(255,255,255,0.04) inset',
            }}
          >
            <div dir="rtl" style={{display: 'flex', alignItems: 'center', gap: 24}}>
              <Avatar size={132} seed={11} />
              <div style={{flex: 1, ...faStyle()}}>
                <div
                  style={{
                    fontSize: 40,
                    fontWeight: 800,
                    color: '#fff',
                    direction: 'ltr',
                    unicodeBidi: 'isolate',
                    textAlign: 'right',
                  }}
                >
                  my_account
                </div>
                <div style={{fontSize: 28, color: COLORS.textDim, marginTop: 4}}>
                  علی رضایی · تهران
                </div>
              </div>
              <div
                style={{
                  padding: '12px 22px',
                  borderRadius: 999,
                  background: 'rgba(225,48,108,0.16)',
                  border: '1px solid rgba(225,48,108,0.45)',
                  ...faStyle({fontSize: 26, fontWeight: 700, color: '#FFD9E5'}),
                }}
              >
                حساب دوم
              </div>
            </div>

            <div
              dir="rtl"
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                marginTop: 30,
                padding: '24px 0',
                borderRadius: 26,
                background: 'rgba(255,255,255,0.045)',
              }}
            >
              {[
                {v: fa(48), l: 'پست'},
                {v: fa('2.4K'), l: 'فالوور'},
                {v: fa(312), l: 'فالووینگ'},
              ].map((s) => (
                <div key={s.l} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <div style={{fontSize: 38, fontWeight: 800, color: '#fff'}}>{s.v}</div>
                  <div style={{...faStyle(), fontSize: 27, color: COLORS.textDim, marginTop: 2}}>
                    {s.l}
                  </div>
                </div>
              ))}
            </div>

            <div style={{display: 'flex', gap: 12, marginTop: 22}}>
              {[3, 9, 15].map((s) => (
                <div key={s} style={{flex: 1, aspectRatio: '1 / 1', borderRadius: 20, overflow: 'hidden'}}>
                  <PhotoTile seed={s} showReel={s === 9} />
                </div>
              ))}
            </div>

            <MiniTabBar glow={glow} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
