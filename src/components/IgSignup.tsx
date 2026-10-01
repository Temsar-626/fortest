import type {ReactNode} from 'react';
import {COLORS, GRADIENT_IG} from '../theme';
import {faStyle} from '../utils/rtl';
import {MailIcon, LockIcon, ProfileIcon} from './Icons';

const Field: React.FC<{
  icon: ReactNode;
  label: string;
  value: string;
  reveal: number;
  active?: boolean;
  valueDir?: 'rtl' | 'ltr';
  caret?: boolean;
}> = ({icon, label, value, reveal, active = false, valueDir = 'rtl', caret = false}) => (
  <div
    style={{
      opacity: reveal,
      transform: `translateY(${(1 - reveal) * 30}px) scale(${0.985 + 0.015 * reveal})`,
      filter: reveal < 1 ? `blur(${(1 - reveal) * 5}px)` : undefined,
      willChange: 'transform, opacity, filter',
    }}
  >
    <div
      style={{
        ...faStyle(),
        fontSize: 27,
        fontWeight: 600,
        color: active ? '#fff' : COLORS.textDim,
        marginBottom: 10,
        paddingRight: 6,
      }}
    >
      {label}
    </div>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        height: 92,
        padding: '0 24px',
        borderRadius: 20,
        background: 'rgba(255,255,255,0.05)',
        border: `2px solid ${
          active ? 'rgba(225,48,108,0.85)' : 'rgba(255,255,255,0.09)'
        }`,
        boxShadow: active ? '0 0 30px rgba(225,48,108,0.35)' : 'none',
      }}
    >
      <div style={{color: active ? '#fff' : COLORS.textMuted, display: 'flex'}}>{icon}</div>
      <div
        style={{
          flex: 1,
          fontSize: 32,
          fontWeight: 600,
          color: '#fff',
          direction: valueDir,
          unicodeBidi: 'isolate',
          fontFamily: 'inherit',
          letterSpacing: valueDir === 'ltr' ? 0.3 : undefined,
        }}
      >
        {value}
        {caret ? (
          <span
            style={{
              display: 'inline-block',
              width: 3,
              height: 34,
              marginRight: 2,
              marginLeft: 2,
              background: '#E1306C',
              verticalAlign: 'middle',
              boxShadow: '0 0 12px rgba(225,48,108,0.9)',
            }}
          />
        ) : null}
      </div>
    </div>
  </div>
);

/**
 * The "new account" form. Fields appear one after another and the username
 * types itself in so nothing ever pops in abruptly.
 */
export const IgSignup: React.FC<{
  fieldReveal: [number, number, number];
  username: string;
  titleReveal?: number;
  caret?: boolean;
}> = ({fieldReveal, username, titleReveal = 1, caret = false}) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(180deg, #0a0a10 0%, #0e0e16 100%)',
      padding: '0 40px',
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '30px 0 18px',
        opacity: titleReveal,
        transform: `translateY(${(1 - titleReveal) * 18}px)`,
      }}
    >
      <svg viewBox="0 0 24 24" style={{width: 36, height: 36}} fill="none">
        <path
          d="M9 5l7 7-7 7"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div style={{...faStyle(), fontSize: 36, fontWeight: 800, color: '#fff'}}>
        ساخت حساب جدید
      </div>
      <div style={{width: 36}} />
    </div>

    <div
      style={{
        ...faStyle(),
        fontSize: 26,
        color: COLORS.textDim,
        lineHeight: 1.6,
        marginBottom: 26,
        opacity: titleReveal,
      }}
    >
      یک نام کاربری و رمز عبور انتخاب کن. بعداً می‌تونی پروفایلت رو کامل کنی.
    </div>

    <div style={{display: 'flex', flexDirection: 'column', gap: 24}}>
      <Field
        icon={<ProfileIcon size={36} />}
        label="نام کاربری"
        value={username}
        valueDir="ltr"
        reveal={fieldReveal[0]}
        caret={caret}
        active={fieldReveal[0] > 0.6 && fieldReveal[1] < 0.4}
      />
      <Field
        icon={<LockIcon size={34} />}
        label="رمز عبور"
        value="••••••••••"
        reveal={fieldReveal[1]}
        active={fieldReveal[1] > 0.6 && fieldReveal[2] < 0.4}
      />
      <Field
        icon={<MailIcon size={34} />}
        label="ایمیل یا شماره موبایل"
        value="example@mail.com"
        valueDir="ltr"
        reveal={fieldReveal[2]}
      />
    </div>

    <div
      style={{
        marginTop: 34,
        height: 96,
        borderRadius: 22,
        background: GRADIENT_IG,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...faStyle(),
        fontSize: 36,
        fontWeight: 800,
        color: '#fff',
        opacity: fieldReveal[2],
        transform: `translateY(${(1 - fieldReveal[2]) * 22}px)`,
        boxShadow: '0 18px 44px rgba(225,48,108,0.35)',
      }}
    >
      ادامه
    </div>

    <div
      style={{
        ...faStyle(),
        marginTop: 20,
        textAlign: 'center',
        fontSize: 24,
        color: COLORS.textMuted,
        opacity: fieldReveal[2] * 0.9,
      }}
    >
      اطلاعات تو محرمانه می‌مونه
    </div>
  </div>
);
