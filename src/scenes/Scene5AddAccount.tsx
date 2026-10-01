import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {faStyle} from '../utils/rtl';
import {fadeIn, progress, pulse} from '../utils/animation';
import {TapRipple, TouchDot} from '../components/Bits';
import {IgProfile} from '../components/IgProfile';
import {IgSheet} from '../components/IgSheet';
import {CaptionPill, SceneFrame} from '../components/SceneFrame';

const ROW2 = {x: 540, y: 1598};
const START = {x: 540, y: 1122};

/** 17 – 22s · Step 3: the action sheet, then "ساخت حساب جدید". */
export const Scene5AddAccount: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const reveal = progress(frame, 8, 20);
  const dim = progress(frame, 8, 20) * 0.82;
  const r1 = progress(frame, 22, 12);
  const r2 = progress(frame, 32, 12);

  const move = progress(frame, 16, 26);
  const pressUp = progress(frame, 48, 4);
  const pressDown = progress(frame, 52, 6);
  const pressed = pressUp * (1 - pressDown);
  const ripple = progress(frame, 50, 22);

  const hit = fadeIn(frame, 51, 8);
  const highlight = hit * (0.6 + 0.4 * pulse(frame, fps, 0.9, 51));

  const dotStyle: React.CSSProperties = {
    left: START.x + (ROW2.x - START.x) * move - 59,
    top: START.y + (ROW2.y - START.y) * move - 59,
    zIndex: 30,
    opacity: fadeIn(frame, 12, 8) * interpolate(frame, [96, 120], [1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  };

  return (
    <SceneFrame
      step={3}
      title={
        <>
          گزینهٔ{' '}
          <span
            style={{
              background: 'linear-gradient(120deg,#833AB4,#E1306C)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              direction: 'ltr',
              unicodeBidi: 'isolate',
              fontWeight: 900,
            }}
          >
            Add account
          </span>{' '}
          رو بزن
        </>
      }
      badgeGlow={fadeIn(frame, 4, 12) * (0.55 + 0.45 * pulse(frame, fps, 0.95, 4))}
      phoneDelay={3}
      zoomFrom={1.05}
      zoomTo={1.0}
      phoneGlow={0.18 + 0.4 * highlight}
      phoneContent={
        <>
          <IgProfile />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `rgba(0,0,0,${0.52 * dim})`,
              zIndex: 5,
            }}
          />
          <IgSheet reveal={reveal} highlight={highlight} rowReveal={[r1, r2]} />
        </>
      }
      rotateY={-4}
      rotateX={1}
      caption={<CaptionPill>دو راه داری؛ حساب جدید بساز</CaptionPill>}
      captionDelay={40}
      overlay={
        <>
          <TapRipple
            progress={ripple}
            size={170}
            style={{left: ROW2.x - 85, top: ROW2.y - 85, zIndex: 26}}
          />
          <TouchDot pressed={pressed} style={dotStyle} />

          <div
            style={{
              position: 'absolute',
              left: 96,
              top: ROW2.y - 30,
              padding: '14px 26px',
              borderRadius: 20,
              background: 'rgba(12,12,18,0.94)',
              border: '1px solid rgba(247,119,55,0.5)',
              boxShadow: '0 18px 44px rgba(0,0,0,0.6)',
              opacity: fadeIn(frame, 62, 12),
              transform: `translateX(${(1 - fadeIn(frame, 62, 14)) * -22}px)`,
              zIndex: 30,
              ...faStyle({fontSize: 30, fontWeight: 800, color: '#fff'}),
            }}
          >
            اینو بزن
          </div>
        </>
      }
    />
  );
};
