import {COLORS, GRADIENT_IG, GRADIENT_IG_SOFT} from '../theme';
import {faStyle} from '../utils/rtl';
import {ChevronLeft, PlusCircle, UserSquare} from './Icons';

type RowProps = {
  icon: React.ReactNode;
  label: string;
  hint: string;
  reveal: number;
  highlighted: boolean;
  highlight: number;
};

const Row: React.FC<RowProps> = ({icon, label, hint, reveal, highlighted, highlight}) => (
  <div
    dir="rtl"
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 22,
      padding: '26px 28px',
      borderRadius: 24,
      background: highlighted ? GRADIENT_IG_SOFT : 'rgba(255,255,255,0.045)',
      border: `2px solid ${
        highlighted ? `rgba(247,119,55,${0.35 + 0.5 * highlight})` : 'rgba(255,255,255,0.07)'
      }`,
      opacity: reveal,
      transform: `translateY(${(1 - reveal) * 26}px) scale(${
        highlighted ? 1 + 0.035 * highlight : 1
      })`,
      boxShadow: highlighted
        ? `0 0 ${34 * highlight}px rgba(225,48,108,${0.45 * highlight}), 0 16px 40px rgba(0,0,0,0.5)`
        : '0 16px 40px rgba(0,0,0,0.35)',
      willChange: 'transform, opacity, box-shadow',
    }}
  >
    <div
      style={{
        width: 76,
        height: 76,
        borderRadius: 22,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: highlighted ? GRADIENT_IG : 'rgba(255,255,255,0.09)',
        color: '#fff',
        flexShrink: 0,
      }}
    >
      {icon}
    </div>

    <div style={{flex: 1, ...faStyle()}}>
      <div style={{fontSize: 34, fontWeight: 700, color: '#fff'}}>{label}</div>
      <div style={{fontSize: 26, color: COLORS.textDim, marginTop: 4}}>{hint}</div>
    </div>

    <ChevronLeft size={34} color="rgba(255,255,255,0.6)" />
  </div>
);

/**
 * The "Add account" action sheet that slides up from the bottom of the phone.
 * `reveal` 0..1 drives the slide, `highlight` 0..1 spotlights the second option.
 */
export const IgSheet: React.FC<{
  reveal: number;
  highlight: number;
  rowReveal?: [number, number];
}> = ({reveal, highlight, rowReveal = [1, 1]}) => {
  const y = (1 - reveal) * 110;
  const opacity = Math.min(1, Math.max(0, reveal * 1.4));
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        transform: `translateY(${y}%)`,
        opacity,
        background: 'linear-gradient(180deg, #1D1D27 0%, #121218 100%)',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        borderTop: '1px solid rgba(255,255,255,0.14)',
        padding: '18px 26px 34px',
        boxShadow: '0 -30px 80px rgba(0,0,0,0.7)',
        willChange: 'transform, opacity',
      }}
    >
      <div
        style={{
          width: 88,
          height: 8,
          borderRadius: 999,
          background: 'rgba(255,255,255,0.28)',
          margin: '0 auto 22px',
        }}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '0 8px 20px',
          ...faStyle(),
        }}
      >
        <PlusCircle size={40} color="#fff" />
        <div style={{fontSize: 40, fontWeight: 800, color: '#fff'}}>افزودن حساب</div>
      </div>

      <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
        <Row
          icon={<UserSquare size={40} />}
          label="ورود به حساب موجود"
          hint="با نام کاربری و رمز عبور"
          reveal={rowReveal[0]}
          highlighted={false}
          highlight={0}
        />
        <Row
          icon={<PlusCircle size={42} />}
          label="ساخت حساب جدید"
          hint="یک حساب تازه بساز"
          reveal={rowReveal[1]}
          highlighted
          highlight={highlight}
        />
      </div>

      <div
        style={{
          ...faStyle(),
          marginTop: 22,
          textAlign: 'center',
          fontSize: 25,
          color: COLORS.textMuted,
        }}
      >
        هر زمان می‌تونی بین حساب‌هات جابه‌جا بشی
      </div>
    </div>
  );
};
