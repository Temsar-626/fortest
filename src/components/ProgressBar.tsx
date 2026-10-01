import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {GRADIENT_IG} from '../theme';
import {SCENES} from '../utils/timeline';

/**
 * Instagram-story style segmented progress bar. Segments run right-to-left to
 * match the Persian reading direction.
 */
export const ProgressBar: React.FC<{top?: number; width?: number}> = ({
  top = 34,
  width = 1000,
}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const gap = 8;
  const segWidth = (width - gap * (SCENES.length - 1)) / SCENES.length;

  return (
    <div
      style={{
        position: 'absolute',
        top,
        left: '50%',
        transform: 'translateX(-50%)',
        width,
        display: 'flex',
        flexDirection: 'row-reverse',
        gap,
        zIndex: 60,
      }}
    >
      {SCENES.map((scene) => {
        const end = Math.min(durationInFrames, scene.cutOut);
        const p = interpolate(frame, [scene.visibleFrom, end], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        return (
          <div
            key={scene.id}
            style={{
              width: segWidth,
              height: 7,
              borderRadius: 999,
              background: 'rgba(255,255,255,0.16)',
              overflow: 'hidden',
              boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}
          >
            <div
              style={{
                width: `${p * 100}%`,
                height: '100%',
                borderRadius: 999,
                background: GRADIENT_IG,
                boxShadow: p > 0 && p < 1 ? '0 0 14px rgba(225,48,108,0.9)' : 'none',
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
