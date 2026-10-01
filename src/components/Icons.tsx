import type {CSSProperties} from 'react';

type IconProps = {size?: number; color?: string; style?: CSSProperties};

const base = (size: number, color: string, style?: CSSProperties): CSSProperties => ({
  width: size,
  height: size,
  display: 'block',
  color,
  flexShrink: 0,
  ...style,
});

export const HomeIcon = ({size = 40, color = '#fff', style}: IconProps) => (
  <svg viewBox="0 0 24 24" style={base(size, color, style)} fill="none">
    <path
      d="M3 9.6 12 3l9 6.6V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.6Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

export const SearchIcon = ({size = 40, color = '#fff', style}: IconProps) => (
  <svg viewBox="0 0 24 24" style={base(size, color, style)} fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
    <path d="m16.5 16.5 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const ReelsIcon = ({size = 40, color = '#fff', style}: IconProps) => (
  <svg viewBox="0 0 24 24" style={base(size, color, style)} fill="none">
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
    <path d="M3.4 8.5h17.2M8.6 3.3 11.4 8.4M15 3.3l2.8 5.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M10.4 12.2v4.4l3.9-2.2-3.9-2.2Z" fill="currentColor" />
  </svg>
);

export const ShopIcon = ({size = 40, color = '#fff', style}: IconProps) => (
  <svg viewBox="0 0 24 24" style={base(size, color, style)} fill="none">
    <path d="M4 8h16l-1 12H5L4 8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const ProfileIcon = ({size = 40, color = '#fff', style}: IconProps) => (
  <svg viewBox="0 0 24 24" style={base(size, color, style)} fill="none">
    <circle cx="12" cy="8.4" r="4.1" stroke="currentColor" strokeWidth="1.9" />
    <path
      d="M4.2 20.4c1.5-3.5 4.4-5.3 7.8-5.3s6.3 1.8 7.8 5.3"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
    />
  </svg>
);

export const HeartIcon = ({size = 36, color = '#fff', style}: IconProps) => (
  <svg viewBox="0 0 24 24" style={base(size, color, style)} fill="none">
    <path
      d="M12 20.3S3.8 15.6 3.8 9.9A4.4 4.4 0 0 1 12 7.4a4.4 4.4 0 0 1 8.2 2.5c0 5.7-8.2 10.4-8.2 10.4Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

export const CommentIcon = ({size = 36, color = '#fff', style}: IconProps) => (
  <svg viewBox="0 0 24 24" style={base(size, color, style)} fill="none">
    <path
      d="M21 11.6c0 4.3-4 7.7-9 7.7-1 0-2-.1-2.9-.4L4 21l1.3-3.6C3.9 16.1 3 14 3 11.6 3 7.3 7 3.9 12 3.9s9 3.4 9 7.7Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

export const SendIcon = ({size = 36, color = '#fff', style}: IconProps) => (
  <svg viewBox="0 0 24 24" style={base(size, color, style)} fill="none">
    <path d="M21.5 2.8 2.6 10.4l7.6 3.1 3.1 7.7 8.2-18.4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M10.2 13.5 21.5 2.8" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

export const BookmarkIcon = ({size = 36, color = '#fff', style}: IconProps) => (
  <svg viewBox="0 0 24 24" style={base(size, color, style)} fill="none">
    <path d="M6 3.5h12v17l-6-4.4-6 4.4v-17Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);

export const GridIcon = ({size = 36, color = '#fff', style}: IconProps) => (
  <svg viewBox="0 0 24 24" style={base(size, color, style)} fill="none">
    <rect x="3" y="3" width="7.5" height="7.5" rx="2" stroke="currentColor" strokeWidth="1.8" />
    <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" stroke="currentColor" strokeWidth="1.8" />
    <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" stroke="currentColor" strokeWidth="1.8" />
    <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

export const ReelGridIcon = ({size = 36, color = '#fff', style}: IconProps) => (
  <svg viewBox="0 0 24 24" style={base(size, color, style)} fill="none">
    <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.8" />
    <path d="M3.5 8h17M8.5 3.3 11 7.9M14.5 3.3 17 7.9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <path d="M10.6 12v4.6l4-2.3-4-2.3Z" fill="currentColor" />
  </svg>
);

export const ChevronRight = ({size = 34, color = '#fff', style}: IconProps) => (
  <svg viewBox="0 0 24 24" style={base(size, color, style)} fill="none">
    <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ChevronLeft = ({size = 34, color = '#fff', style}: IconProps) => (
  <svg viewBox="0 0 24 24" style={base(size, color, style)} fill="none">
    <path d="m15 5-7 7 7 7" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const MenuDots = ({size = 34, color = '#fff', style}: IconProps) => (
  <svg viewBox="0 0 24 24" style={base(size, color, style)} fill="currentColor">
    <circle cx="5" cy="12" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="19" cy="12" r="2" />
  </svg>
);

export const PlusCircle = ({size = 36, color = '#fff', style}: IconProps) => (
  <svg viewBox="0 0 24 24" style={base(size, color, style)} fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.9" />
    <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
  </svg>
);

export const UserSquare = ({size = 36, color = '#fff', style}: IconProps) => (
  <svg viewBox="0 0 24 24" style={base(size, color, style)} fill="none">
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="12" cy="10" r="2.8" stroke="currentColor" strokeWidth="1.7" />
    <path d="M6.8 19c1.2-2.2 3-3.3 5.2-3.3S16 16.8 17.2 19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

export const LockIcon = ({size = 34, color = '#fff', style}: IconProps) => (
  <svg viewBox="0 0 24 24" style={base(size, color, style)} fill="none">
    <rect x="4.5" y="10" width="15" height="10.5" rx="3" stroke="currentColor" strokeWidth="1.8" />
    <path d="M8 10V7.6a4 4 0 0 1 8 0V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const MailIcon = ({size = 34, color = '#fff', style}: IconProps) => (
  <svg viewBox="0 0 24 24" style={base(size, color, style)} fill="none">
    <rect x="3" y="5" width="18" height="14" rx="3.5" stroke="currentColor" strokeWidth="1.8" />
    <path d="m4.5 7.5 7.5 5.5 7.5-5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const CheckIcon = ({size = 30, color = '#fff', style}: IconProps) => (
  <svg viewBox="0 0 24 24" style={base(size, color, style)} fill="none">
    <path d="m5 12.5 4.6 4.6L19 7.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const WifiIcon = ({size = 28, color = '#fff', style}: IconProps) => (
  <svg viewBox="0 0 24 20" style={{...base(size * 1.15, color, style), height: size}} fill="currentColor">
    <path d="M12 16.6a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2Z" />
    <path d="M12 9.4c1.9 0 3.6.7 4.9 1.8l1.5-1.7A10 10 0 0 0 12 6.6a10 10 0 0 0-6.4 2.9l1.5 1.7A7.4 7.4 0 0 1 12 9.4Z" opacity="0.85" />
    <path d="M12 3.2c3.2 0 6.1 1.2 8.3 3.2l1.4-1.7A14 14 0 0 0 12 .2 14 14 0 0 0 2.3 4.7l1.4 1.7A12 12 0 0 1 12 3.2Z" opacity="0.7" />
  </svg>
);

export const SignalIcon = ({size = 26, color = '#fff', style}: IconProps) => (
  <svg viewBox="0 0 20 18" style={{...base(size * 1.1, color, style), height: size}} fill="currentColor">
    <rect x="0" y="10" width="3.2" height="7" rx="1.2" />
    <rect x="5.2" y="7" width="3.2" height="10" rx="1.2" />
    <rect x="10.4" y="4" width="3.2" height="13" rx="1.2" />
    <rect x="15.6" y="0" width="3.2" height="17" rx="1.2" opacity="0.45" />
  </svg>
);

export const BatteryIcon = ({size = 30, color = '#fff', style}: IconProps) => (
  <svg viewBox="0 0 30 16" style={{...base(size, color, style), height: size * 0.55}} fill="none">
    <rect x="1" y="1.5" width="24" height="13" rx="4" stroke="currentColor" strokeWidth="1.6" opacity="0.5" />
    <rect x="3" y="3.5" width="17" height="9" rx="2.4" fill="currentColor" />
    <path d="M27.5 6v4a2.4 2.4 0 0 0 0-4Z" fill="currentColor" opacity="0.5" />
  </svg>
);

export const EyeIcon = ({size = 40, color = '#fff', style}: IconProps) => (
  <svg viewBox="0 0 24 24" style={base(size, color, style)} fill="none">
    <path d="M2.6 12S6 5.8 12 5.8 21.4 12 21.4 12 18 18.2 12 18.2 2.6 12 2.6 12Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
  </svg>
);

export const SparkleIcon = ({size = 40, color = '#fff', style}: IconProps) => (
  <svg viewBox="0 0 24 24" style={base(size, color, style)} fill="currentColor">
    <path d="M12 2.6l1.8 5.2 5.2 1.8-5.2 1.8L12 16.6l-1.8-5.2L5 9.6l5.2-1.8L12 2.6Z" />
    <path d="M19 15l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9L19 15Z" opacity="0.75" />
  </svg>
);
