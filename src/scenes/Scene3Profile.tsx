import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {faStyle} from '../utils/rtl';
import {enter, fadeIn, progress, pulse, springIn} from '../utils/animation';
import {GlowHalo, TapRipple, TouchDot} from '../components/Bits';
import {IgProfile} from '../components/IgProfile';
import {CaptionPill, SceneFrame} from '../components/SceneFrame';

/** Centre of the Profile tab inside the 600px-wide phone at top = 546. */
const TAB = {x: 748, y: 1703};
const START = {x: 528, y: 1408};

/** 7 – 12s · Step 1: open your profile. */
export const Scene3Profile: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const move = progress(frame, 26, 26);
  const pressUp = progress(frame, 50, 4);
  const pressDown = progress(frame, 54, 6);
  const pressed = pressUp * (1 - pressDown);
  const ripple = progress(frame, 52, 22);
  const ripple2 = progress(frame, 62, 22);

  const hit = fadeIn(frame, 55, 10);
  const glow = hit * (0.55 + 0.45 * pulse(frame, fps, 0.95, 55)) * 0.95;
  const halo = hit * (0.6 + 0.4 * pulse(frame, fps, 1.25, 52));

  const dotStyle: React.CSSProperties = {
    left: START.x + (TAB.x - START.x) * move - 59,
    top: START.y + (TAB.y - START.y) * move - 59,
    opacity: fadeIn(frame, 22, 8) * interpolate(frame, [96, 120], [1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  };

  const label = enter(frame, {delay: 78, dur: 14, distance: 30});
  const labelO = fadeIn(frame, 78, 12);
  const badge = springIn(frame, fps, {delay: 4, stiffness: 150, damping: 14});
  const badgeGlow = fadeIn(frame, 50, 14) * (0.6 + 0.4 * pulse(frame, fps, 0.95, 50));

  return (
    <SceneFrame
      step={1}
      title={
        <>
          برو روی{' '}
          <span
            style={{
              background: 'linear-gradient(120deg,#E1306C,#FCAF45)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            پروفایل
          </span>
        </>
      }
      badgeGlow={badgeGlow}
      titleDelay={0}
      phoneDelay={6}
      zoomFrom={1.06}
      zoomTo={1.0}
      phoneGlow={0.18 + 0.4 * glow}
      phoneContent={<IgProfile profileTabGlow={glow} />}
      rotateY={-5}
      rotateX={2}
      caption={<CaptionPill>سمت راست پایین، آیکون پروفایل</CaptionPill>}
      captionDelay={22}
      overlay={
        <>
          <GlowHalo
            intensity={halo}
            size={150}
            style={{left: TAB.x, top: TAB.y, zIndex: 10}}
          />

          <TouchDot pressed={pressed} style={dotStyle} />
          <TapRipple progress={ripple} style={{left: TAB.x - 95, top: TAB.y - 95}} />
          <TapRipple
            progress={ripple2}
            size={150}
            color="rgba(247,119,55,0.75)"
            style={{left: TAB.x - 75, top: TAB.y - 75}}
          />

          {/* which tab is which */}
          <div
            style={{
              position: 'absolute',
              right: 96,
              top: 1120,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '16px 30px',
              borderRadius: 22,
              background: 'rgba(12,12,18,0.9)',
              border: '1px solid rgba(255,255,255,0.14)',
              opacity: labelO,
              ...label,
              ...faStyle({fontSize: 32, fontWeight: 700, color: '#fff'}),
            }}
          >
            <span style={{transform: `scale(${0.7 + badge * 0.3})`, display: 'flex'}}>👆</span>
            آیکون پروفایل
          </div>
        </>
      }
    />
  );
};
