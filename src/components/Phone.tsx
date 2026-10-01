import type {CSSProperties, ReactNode} from 'react';
import {PHONE} from '../theme';

type PhoneProps = {
  children: ReactNode;
  width?: number;
  rotateY?: number;
  rotateX?: number;
  z?: number;
  style?: CSSProperties;
  screenStyle?: CSSProperties;
  glow?: number;
};

/**
 * Vertical phone mockup: rounded corners, real depth (perspective rotation),
 * layered shadows and a glass highlight. Everything inside is rebuilt from
 * HTML/CSS — no third-party assets.
 */
export const Phone: React.FC<PhoneProps> = ({
  children,
  width = PHONE.width,
  rotateY = 0,
  rotateX = 0,
  z = 0,
  style,
  screenStyle,
  glow = 0,
}) => {
  const scale = width / PHONE.width;
  const radius = PHONE.radius * scale;
  const bezel = PHONE.bezel * scale;
  const height = width * 2.055;
  const innerRadius = radius - bezel;

  return (
    <div
      style={{
        perspective: 2400,
        perspectiveOrigin: '50% 45%',
        ...style,
      }}
    >
      <div
        style={{
          position: 'relative',
          width,
          height,
          borderRadius: radius,
          padding: bezel,
          background: 'linear-gradient(158deg, #2a2a36 0%, #15151d 34%, #0b0b11 100%)',
          transform: `translate3d(0,0,${z}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
          transformStyle: 'preserve-3d',
          boxShadow: [
            '0 70px 130px rgba(0,0,0,0.72)',
            '0 26px 50px rgba(0,0,0,0.55)',
            '0 0 0 1px rgba(255,255,255,0.07)',
            'inset 0 2px 1px rgba(255,255,255,0.16)',
            'inset 0 -2px 1px rgba(255,255,255,0.05)',
            glow > 0
              ? `0 0 ${70 * glow}px rgba(225,48,108,${0.32 * glow}), 0 0 ${
                  150 * glow
                }px rgba(131,58,180,${0.26 * glow})`
              : 'none',
          ].join(', '),
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: innerRadius,
            overflow: 'hidden',
            background: '#050508',
            ...screenStyle,
          }}
        >
          {children}

          {/* dynamic island */}
          <div
            style={{
              position: 'absolute',
              top: 14 * scale,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 128 * scale,
              height: 36 * scale,
              borderRadius: 22 * scale,
              background: '#000',
              zIndex: 40,
            }}
          />
        </div>

        {/* glass highlight */}
        <div
          style={{
            position: 'absolute',
            inset: bezel,
            borderRadius: innerRadius,
            background:
              'linear-gradient(122deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.03) 26%, rgba(255,255,255,0) 52%)',
            pointerEvents: 'none',
            zIndex: 50,
          }}
        />
      </div>
    </div>
  );
};
