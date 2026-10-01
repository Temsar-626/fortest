import type {CSSProperties} from 'react';
import {COLORS, GRADIENT_IG} from '../theme';
import {fa, faStyle} from '../utils/rtl';
import {Avatar, PhotoTile, StatusBar, TabBar} from './IgChrome';
import {GridIcon, LockIcon, PlusCircle, ReelGridIcon} from './Icons';

const Stat: React.FC<{value: string; label: string}> = ({value, label}) => (
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2}}>
    <div style={{fontFamily: 'inherit', fontSize: 36, fontWeight: 700, color: '#fff'}}>{value}</div>
    <div style={{...faStyle(), fontSize: 27, color: COLORS.textDim}}>{label}</div>
  </div>
);

const Highlight: React.FC<{seed: number; label: string}> = ({seed, label}) => (    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, width: 104}}>
    <div
      style={{
        width: 92,
        height: 92,
        borderRadius: '50%',
        padding: 4,
        background: 'rgba(255,255,255,0.16)',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          padding: 4,
          background: '#0a0a10',
        }}
      >
        <div style={{width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden'}}>
          <PhotoTile seed={seed} />
        </div>
      </div>
    </div>
    <div
      style={{
        ...faStyle(),
        fontSize: 22,
        color: COLORS.textDim,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: 104,
      }}
    >
      {label}
    </div>
  </div>
);

export type IgProfileProps = {
  /** 0..1 glow applied to the header username (step 2). */
  usernameGlow?: number;
  /** 0..1 pulse applied to the profile tab icon (step 1). */
  profileTabGlow?: number;
  /** dim the whole screen while a sheet is open. */
  dim?: number;
  username?: string;
  children?: React.ReactNode;
};

export const IgProfile: React.FC<IgProfileProps> = ({
  usernameGlow = 0,
  profileTabGlow = 0,
  dim = 0,
  username = 'my_account',
  children,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(180deg, #0a0a10 0%, #0d0d14 100%)',
      }}
    >
      <StatusBar />

      {/* header with the tappable username */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '12px 26px 16px',
          position: 'relative',
        }}
      >
        <div style={{position: 'absolute', right: 28, display: 'flex', color: '#fff'}}>
          <svg viewBox="0 0 24 24" style={{width: 36, height: 36}} fill="none">
            <path
              d="M9 5l7 7-7 7"
              stroke="rgba(255,255,255,0.9)"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 24px',
            borderRadius: 22,
            background: usernameGlow > 0 ? 'rgba(225,48,108,0.16)' : 'transparent',
            boxShadow:
              usernameGlow > 0
                ? `0 0 0 ${2 * usernameGlow}px rgba(225,48,108,${
                    0.55 * usernameGlow
                  }), 0 0 ${34 * usernameGlow}px rgba(247,119,55,${0.4 * usernameGlow})`
                : 'none',
          }}
        >
          <LockIcon size={28} color="rgba(255,255,255,0.75)" />
          <div
            style={{
              fontFamily: 'inherit',
              direction: 'ltr',
              unicodeBidi: 'isolate',
              fontSize: 36,
              fontWeight: 700,
              color: '#fff',
              letterSpacing: 0.2,
            }}
          >
            {username}
          </div>
          <svg viewBox="0 0 24 24" style={{width: 26, height: 26}} fill="none">
            <path
              d="m6 10 6 6 6-6"
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* body */}
      <div style={{flex: 1, overflow: 'hidden', padding: '0 30px'}}>
        <div
          dir="rtl"
          style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}
        >
          <Avatar size={172} seed={11} />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 46,
              flex: 1,
              justifyContent: 'space-evenly',
            }}
          >
            <Stat value={fa(48)} label="پست" />
            <Stat value={fa('2.4K')} label="فالوور" />
            <Stat value={fa(312)} label="فالووینگ" />
          </div>
        </div>

        <div style={{...faStyle(), marginTop: 20, display: 'flex', flexDirection: 'column', gap: 4}}>
          <div style={{fontSize: 30, fontWeight: 700, color: '#fff'}}>علی رضایی</div>
          <div style={{fontSize: 27, color: COLORS.textDim, lineHeight: 1.45}}>
            عاشق عکاسی و سفر · تهران
          </div>
        </div>

        <div style={{display: 'flex', gap: 14, marginTop: 22}}>
          <div
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '14px 0',
              borderRadius: 14,
              background: GRADIENT_IG,
              ...faStyle(),
              fontSize: 28,
              fontWeight: 700,
              color: '#fff',
            }}
          >
            دنبال کردن
          </div>
          <div
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '14px 0',
              borderRadius: 14,
              background: 'rgba(255,255,255,0.1)',
              ...faStyle(),
              fontSize: 28,
              fontWeight: 700,
              color: '#fff',
            }}
          >
            پیام
          </div>
          <div
            style={{
              width: 72,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 14,
              background: 'rgba(255,255,255,0.1)',
              color: '#fff',
            }}
          >
            <PlusCircle size={38} />
          </div>
        </div>

        {/* highlights */}
        <div style={{display: 'flex', gap: 18, marginTop: 24, paddingBottom: 4}}>
          <Highlight seed={2} label="سفر" />
          <Highlight seed={5} label="کار" />
          <Highlight seed={8} label="ورزش" />
          <Highlight seed={13} label="غذا" />
        </div>

        {/* tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            borderTop: `1px solid ${COLORS.line}`,
            marginTop: 14,
            paddingTop: 14,
          }}
        >
          <GridIcon size={38} color="#fff" />
          <ReelGridIcon size={38} color="rgba(255,255,255,0.4)" />
        </div>

        {/* grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 4,
            marginTop: 12,
          }}
        >
          {new Array(9).fill(true).map((_, i) => (
            <div key={i} style={{position: 'relative', aspectRatio: '1 / 1'}}>
              <PhotoTile seed={i * 7 + 3} showReel={i === 1} />
              <div
                style={{
                  position: 'absolute',
                  left: 8,
                  bottom: 6,
                  color: '#fff',
                  fontSize: 24,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  opacity: 0.92,
                }}
              >
                <svg viewBox="0 0 24 24" style={{width: 26, height: 26}} fill="#fff">
                  <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                </svg>
                {(i + 3) * 137}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{position: 'relative'}}>
        <TabBar active="profile" />
        {profileTabGlow > 0 ? (
          <div
            style={{
              position: 'absolute',
              right: 34,
              bottom: 26,
              width: 92,
              height: 92,
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(225,48,108,${
                0.65 * profileTabGlow
              }) 0%, rgba(247,119,55,0) 70%)`,
              filter: 'blur(6px)',
              pointerEvents: 'none',
            }}
          />
        ) : null}
      </div>

      {dim > 0 ? (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `rgba(0,0,0,${0.62 * dim})`,
          }}
        />
      ) : null}

      {children}
    </div>
  );
};

export const Label: React.FC<{children: React.ReactNode; style?: CSSProperties}> = ({
  children,
  style,
}) => (
  <div style={{...faStyle({fontSize: 28, color: COLORS.textDim}), ...style}}>{children}</div>
);
