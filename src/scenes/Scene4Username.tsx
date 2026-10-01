import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS} from '../theme';
import {faStyle} from '../utils/rtl';
import {enter, fadeIn, progress, pulse, springIn} from '../utils/animation';
import {TapRipple, TouchDot} from '../components/Bits';
import {IgProfile} from '../components/IgProfile';
import {CaptionPill, SceneFrame} from '../components/SceneFrame';
import {ChevronLeft, PlusCircle, UserSquare} from '../components/Icons';

const USERNAME = {x: 540, y: 669};
const START = {x: 540, y: 1268};

const MenuRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  reveal: number;
  highlighted?: boolean;
}> = ({icon, label, reveal, highlighted}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      padding: '22px 24px',
      borderRadius: 18,
      background: highlighted ? 'rgba(225,48,108,0.14)' : 'rgba(255,255,255,0.05)',
      border: highlighted
        ? '1.5px solid rgba(225,48,108,0.5)'
        : '1.5px solid rgba(255,255,255,0.08)',
      opacity: reveal,
      transform: `translateY(${(1 - reveal) * 16}px)`,
    }}
  >
    <div style={{color: '#fff', display: 'flex'}}>{icon}</div>
    <div style={{flex: 1, ...faStyle({fontSize: 31, fontWeight: 700, color: '#fff'})}}>{label}</div>
    <ChevronLeft size={30} color="rgba(255,255,255,0.55)" />
  </div>
);

/** 12 – 17s · Step 2: tap your username. */
export const Scene4Username: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const move = progress(frame, 18, 24);
  const pressUp = progress(frame, 38, 4);
  const pressDown = progress(frame, 42, 6);
  const pressed = pressUp * (1 - pressDown);
  const ripple = progress(frame, 40, 20);

  const hit = fadeIn(frame, 43, 10);
  const usernameGlow = hit * (0.6 + 0.4 * pulse(frame, fps, 0.85, 43));

  // compact popover that will expand into the full sheet in the next scene
  const pop = springIn(frame, fps, {delay: 74, damping: 15, stiffness: 150});
  const popO = fadeIn(frame, 74, 10);
  const r1 = progress(frame, 78, 12);
  const r2 = progress(frame, 86, 12);

  const dotStyle: React.CSSProperties = {
    left: START.x + (USERNAME.x - START.x) * move - 59,
    top: START.y + (USERNAME.y - START.y) * move - 59,
    opacity: fadeIn(frame, 14, 8) * interpolate(frame, [96, 120], [1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  };

  return (
    <SceneFrame
      step={2}
      title={
        <>
          روی{' '}
          <span
            style={{
              background: 'linear-gradient(120deg,#833AB4,#E1306C)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            نام کاربری
          </span>{' '}
          بزن
        </>
      }
      badgeGlow={fadeIn(frame, 6, 12) * (0.55 + 0.45 * pulse(frame, fps, 0.95, 6))}
      phoneDelay={4}
      zoomFrom={1.05}
      zoomTo={1.0}
      phoneGlow={0.2 + 0.35 * usernameGlow}
      phoneContent={<IgProfile usernameGlow={usernameGlow} />}
      rotateY={4}
      rotateX={2}
      caption={<CaptionPill>بالای پروفایل، اسم خودت رو بزن</CaptionPill>}
      captionDelay={20}
      overlay={
        <>
          <TouchDot
            pressed={pressed}
            style={{...dotStyle, zIndex: 14}}
          />
          <TapRipple
            progress={ripple}
            size={160}
            style={{left: USERNAME.x - 80, top: USERNAME.y - 80, zIndex: 12}}
          />

          {/* username callout */}
          <div
            style={{
              position: 'absolute',
              left: USERNAME.x + 130,
              top: USERNAME.y - 36,
              padding: '14px 26px',
              borderRadius: 20,
              background: 'rgba(12,12,18,0.92)',
              border: '1px solid rgba(255,255,255,0.16)',
              ...enter(frame, {delay: 60, dur: 14, distance: 24}),
              opacity:
                fadeIn(frame, 60, 12) *
                interpolate(frame, [98, 118], [1, 0], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
              ...faStyle({fontSize: 30, fontWeight: 700, color: '#fff'}),
            }}
          >
            نام کاربری
          </div>

          {/* compact add-account popover */}
          <div
            style={{
              position: 'absolute',
              left: 288,
              top: 752,
              width: 504,
              padding: '22px 22px 20px',
              borderRadius: 28,
              background: 'linear-gradient(180deg,#1E1E28 0%,#15151E 100%)',
              border: '1px solid rgba(255,255,255,0.13)',
              boxShadow: '0 40px 90px rgba(0,0,0,0.7)',
              opacity: popO,
              transform: `translateY(${(1 - pop) * -22}px) scale(${0.9 + 0.1 * pop})`,
              transformOrigin: '50% 0%',
              zIndex: 16,
            }}
          >
            <div
              style={{
                ...faStyle({fontSize: 27, fontWeight: 700, color: COLORS.textDim}),
                marginBottom: 14,
                paddingRight: 6,
              }}
            >
              افزودن حساب
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
              <MenuRow
                icon={<UserSquare size={34} />}
                label="ورود به حساب موجود"
                reveal={r1}
              />
              <MenuRow
                icon={<PlusCircle size={36} />}
                label="ساخت حساب جدید"
                reveal={r2}
                highlighted
              />
            </div>
          </div>
        </>
      }
    />
  );
};
