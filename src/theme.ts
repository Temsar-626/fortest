export const COLORS = {
  bg: '#0B0B10',
  bgSoft: '#101018',
  card: '#15151D',
  cardAlt: '#1B1B25',
  text: '#FFFFFF',
  textDim: '#A2A2B4',
  textMuted: '#6C6C7E',
  line: 'rgba(255,255,255,0.09)',
  lineStrong: 'rgba(255,255,255,0.18)',
} as const;

/** Instagram brand hues — used sparingly as accents. */
export const IG = {
  purple: '#833AB4',
  pink: '#E1306C',
  red: '#FD1D1D',
  orange: '#F77737',
  yellow: '#FCAF45',
} as const;

export const GRADIENT_IG =
  'linear-gradient(135deg, #833AB4 0%, #E1306C 42%, #F77737 76%, #FCAF45 100%)';

export const GRADIENT_IG_SOFT =
  'linear-gradient(135deg, rgba(131,58,180,0.28) 0%, rgba(225,48,108,0.26) 45%, rgba(247,119,55,0.22) 78%, rgba(252,175,69,0.18) 100%)';

/** Vazirmatn first, Noto Color Emoji as fallback for 👀 / 🎉. */
export const FONT = "'Vazirmatn', 'Noto Color Emoji', sans-serif";

export const PHONE = {
  width: 640,
  radius: 74,
  bezel: 16,
} as const;
