import {useCurrentFrame} from 'remotion';
import {faStyle} from '../utils/rtl';
import {enter, fadeIn, progress} from '../utils/animation';
import {IgProfile} from '../components/IgProfile';
import {CaptionPill, SceneFrame} from '../components/SceneFrame';

/** Hand-drawn style arrow that draws itself towards the Profile tab. */
const CurvedArrow: React.FC<{draw: number; bob: number}> = ({draw, bob}) => {
  const len = 430;
  return (
    <svg
      viewBox="0 0 300 300"
      style={{
        width: 300,
        height: 300,
        transform: `translateY(${bob}px) rotate(-4deg)`,
        overflow: 'visible',
      }}
    >
      <defs>
        <linearGradient id="arrowGrad" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FCAF45" />
          <stop offset="55%" stopColor="#E1306C" />
          <stop offset="100%" stopColor="#833AB4" />
        </linearGradient>
      </defs>
      <path
        d="M286 16C206 26 84 90 44 232"
        fill="none"
        stroke="url(#arrowGrad)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={len}
        strokeDashoffset={len * (1 - draw)}
      />
      <path
        d="M14 196c10 16 22 30 36 40M14 196c18 0 34 4 48 10"
        fill="none"
        stroke="url(#arrowGrad)"
        strokeWidth="10"
        strokeLinecap="round"
        style={{opacity: draw > 0.88 ? 1 : 0}}
      />
    </svg>
  );
};

/** 3 – 7s · Reassurance: you never have to log out of your current account. */
export const Scene2Intro: React.FC = () => {
  const frame = useCurrentFrame();

  const arrowDraw = progress(frame, 24, 28);
  const arrowBob = Math.sin(frame / 12) * 10;
  const arrowO = fadeIn(frame, 22, 12);
  const labelIn = enter(frame, {delay: 40, dur: 14, distance: 24});

  return (
    <SceneFrame
      title={
        <>
          لازم نیست از اکانت{' '}
          <span
            style={{
              background: 'linear-gradient(120deg,#FCAF45,#E1306C)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            فعلیت خارج بشی
          </span>
          !
        </>
      }
      zoomFrom={1.05}
      zoomTo={1.0}
      phoneGlow={0.24}
      phoneContent={<IgProfile profileTabGlow={0.4} />}
      rotateY={-8}
      rotateX={3}
      caption={<CaptionPill>فقط از داخل همین اپ جابه‌جا می‌شی</CaptionPill>}
      overlay={
        <div style={{position: 'absolute', left: 40, top: 1290, opacity: arrowO}}>
          <CurvedArrow draw={arrowDraw} bob={arrowBob} />
          <div
            style={{
              ...faStyle(),
              marginTop: -34,
              marginRight: 12,
              textAlign: 'center',
              fontSize: 34,
              fontWeight: 800,
              color: '#fff',
              textShadow: '0 10px 28px rgba(0,0,0,0.75)',
              ...labelIn,
            }}
          >
            بخش پروفایل
          </div>
        </div>
      }
    />
  );
};
