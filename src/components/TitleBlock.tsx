import type {CSSProperties, ReactNode} from 'react';
import {COLORS} from '../theme';
import {faStyle} from '../utils/rtl';
import {Headline, Kicker, StepBadge} from './Bits';

export const TitleBlock: React.FC<{
  step?: number;
  kicker?: ReactNode;
  children: ReactNode;
  badgeGlow?: number;
  style?: CSSProperties;
  titleStyle?: CSSProperties;
}> = ({step, kicker, children, badgeGlow = 0, style, titleStyle}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 22,
      ...style,
    }}
  >
    {kicker ? <Kicker>{kicker}</Kicker> : null}
    <div
      dir="rtl"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 26,
      }}
    >
      {typeof step === 'number' ? (
        <StepBadge step={step} size={92} glow={badgeGlow} />
      ) : null}
      <Headline style={{...titleStyle, textAlign: 'center'}}>{children}</Headline>
    </div>
  </div>
);

/** Small caption used under the phone in a couple of scenes. */
export const Caption: React.FC<{children: ReactNode; style?: CSSProperties}> = ({
  children,
  style,
}) => (
  <div
    style={{
      ...faStyle({
        fontSize: 28,
        color: COLORS.textDim,
        textAlign: 'center',
      }),
      ...style,
    }}
  >
    {children}
  </div>
);
