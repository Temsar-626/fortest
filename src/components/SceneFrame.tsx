import type {CSSProperties, ReactNode} from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS} from '../theme';
import {faStyle} from '../utils/rtl';
import {drift, enter, fadeIn, springIn} from '../utils/animation';
import {Phone} from './Phone';
import {TitleBlock} from './TitleBlock';

export const LAYOUT = {
  titleTop: 150,
  phoneTop: 546,
  phoneWidth: 600,
  captionBottom: 92,
} as const;

/** Bottom caption pill. */
export const CaptionPill: React.FC<{children: ReactNode; style?: CSSProperties}> = ({
  children,
  style,
}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 14,
      padding: '17px 34px',
      borderRadius: 999,
      background: 'rgba(255,255,255,0.08)',
      border: `1px solid ${COLORS.line}`,
      ...faStyle({fontSize: 30, fontWeight: 600, color: '#EBEBF5'}),
      ...style,
    }}
  >
    {children}
  </div>
);

type SceneFrameProps = {
  title: ReactNode;
  step?: number;
  kicker?: ReactNode;
  badgeGlow?: number;
  titleDelay?: number;
  phoneDelay?: number;
  phoneContent: ReactNode;
  phoneGlow?: number;
  phoneWidth?: number;
  rotateY?: number;
  rotateX?: number;
  zoomFrom?: number;
  zoomTo?: number;
  dim?: number;
  caption?: ReactNode;
  captionDelay?: number;
  /** Absolutely-positioned overlay drawn on top of everything (touch dots, arrows…). */
  overlay?: ReactNode;
};

/**
 * Shared scene skeleton: title block on top, phone mockup in the centre,
 * optional caption and overlay, all inside a slow camera zoom so no scene
 * ever feels static.
 */
export const SceneFrame: React.FC<SceneFrameProps> = ({
  title,
  step,
  kicker,
  badgeGlow = 0,
  titleDelay = 0,
  phoneDelay = 8,
  phoneContent,
  phoneGlow = 0.25,
  phoneWidth = LAYOUT.phoneWidth,
  rotateY = 0,
  rotateX = 0,
  zoomFrom = 1.04,
  zoomTo = 1.0,
  dim = 0,
  caption,
  captionDelay = 24,
  overlay,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const zoom = drift(frame, zoomFrom, zoomTo, 0, 140);
  const titleStyle = enter(frame, {delay: titleDelay, dur: 15, distance: 58, blurFrom: 13});
  const phoneS = springIn(frame, fps, {delay: phoneDelay, damping: 15, stiffness: 112});
  const phoneO = fadeIn(frame, phoneDelay, 14);
  const capO = enter(frame, {delay: captionDelay, dur: 13, distance: 28});

  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', inset: 0, transform: `scale(${zoom})`}}>
        <div
          style={{
            position: 'absolute',
            top: LAYOUT.titleTop,
            left: 0,
            right: 0,
            padding: '0 84px',
            ...titleStyle,
          }}
        >
          <TitleBlock step={step} kicker={kicker} badgeGlow={badgeGlow}>
            {title}
          </TitleBlock>
        </div>

        <div
          style={{
            position: 'absolute',
            top: LAYOUT.phoneTop,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            opacity: phoneO,
            transform: `translateY(${(1 - phoneS) * 100}px) scale(${
              0.87 + 0.13 * phoneS
            })`,
          }}
        >
          <Phone width={phoneWidth} rotateY={rotateY} rotateX={rotateX} glow={phoneGlow}>
            {phoneContent}
            {dim > 0 ? (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `rgba(0,0,0,${0.55 * dim})`,
                  zIndex: 20,
                }}
              />
            ) : null}
          </Phone>
        </div>

        {caption ? (
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: LAYOUT.captionBottom,
              display: 'flex',
              justifyContent: 'center',
              ...capO,
            }}
          >
            {caption}
          </div>
        ) : null}

        {overlay}
      </div>
    </AbsoluteFill>
  );
};
