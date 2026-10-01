import {useCurrentFrame, useVideoConfig} from 'remotion';
import {fadeIn, progress, pulse} from '../utils/animation';
import {IgSignup} from '../components/IgSignup';
import {CaptionPill, SceneFrame} from '../components/SceneFrame';

const FULL_USERNAME = 'my_new_account';

/** 22 – 27s · Step 4: username, password, email. */
export const Scene6Form: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const p1 = progress(frame, 8, 14);
  const p2 = progress(frame, 46, 14);
  const p3 = progress(frame, 84, 14);

  const typed = progress(frame, 16, 44);
  const chars = Math.max(0, Math.min(FULL_USERNAME.length, Math.round(typed * FULL_USERNAME.length)));

  const carets = typed < 1 && typed > 0.02;

  return (
    <SceneFrame
      step={4}
      title={
        <>
          اطلاعات{' '}
          <span
            style={{
              background: 'linear-gradient(120deg,#F77737,#FCAF45)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            اکانت جدیدت
          </span>{' '}
          رو وارد کن
        </>
      }
      badgeGlow={fadeIn(frame, 2, 12) * (0.55 + 0.45 * pulse(frame, fps, 0.95, 2))}
      phoneDelay={2}
      zoomFrom={1.045}
      zoomTo={1.0}
      phoneGlow={0.22}
      phoneContent={
        <IgSignup
          fieldReveal={[p1, p2, p3]}
          username={FULL_USERNAME.slice(0, chars)}
          caret={carets}
          titleReveal={progress(frame, 0, 12)}
        />
      }
      rotateY={3}
      rotateX={1}
      caption={<CaptionPill>همه‌چیز آماده‌ست</CaptionPill>}
      captionDelay={92}
    />
  );
};
