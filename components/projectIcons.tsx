import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function ApiIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor"
         strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
         {...props}>
      <path d="M11 6c-3 0-4 2-4 4v3c0 1.5-1 3-3 3 2 0 3 1.5 3 3v3c0 2 1 4 4 4" />
      <path d="M21 6c3 0 4 2 4 4v3c0 1.5 1 3 3 3-2 0-3 1.5-3 3v3c0 2-1 4-4 4" />
      <path d="M16 19v-5" />
      <path d="M16 14c-1.5-1.5-1.5-4 0-5.5 1.5 1.5 1.5 4 0 5.5Z" fill="currentColor" className="opacity-70" />
    </svg>
  );
}

export function FernIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor"
         strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
         {...props}>
      <path d="M8 26 C 10 16, 16 10, 24 8" />
      <path d="M10 22 C 12 20, 15 19, 17 20" />
      <path d="M13 18 C 15 16, 17 15, 19 16" />
      <path d="M16 14 C 18 13, 20 12, 21 13" />
      <path d="M19 11 C 20 10, 21 10, 22 10" />
      <circle cx="24" cy="8" r="1.8" fill="currentColor" className="opacity-60" />
    </svg>
  );
}

export function KnotIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor"
         strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
         {...props}>
      <path d="M10 10 C 6 14, 6 18, 10 22 C 14 26, 18 26, 22 22" />
      <path d="M22 10 C 26 14, 26 18, 22 22 C 18 26, 14 26, 10 22" opacity="0.55" />
      <path d="M10 10 C 14 6, 18 6, 22 10" />
      <circle cx="16" cy="16" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function FoxIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor"
         strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
         {...props}>
      <path d="M8 8 L 12 14 L 10 16 Z"  fill="currentColor" className="opacity-25" />
      <path d="M24 8 L 20 14 L 22 16 Z" fill="currentColor" className="opacity-25" />
      <path d="M8 8 L 12 14 C 14 16 18 16 20 14 L 24 8 L 24 16 C 24 22 20 25 16 25 C 12 25 8 22 8 16 Z"
            fill="currentColor" className="opacity-10" />
      <path d="M8 8 L 12 14 C 14 16 18 16 20 14 L 24 8 L 24 16 C 24 22 20 25 16 25 C 12 25 8 22 8 16 Z" />
      <path d="M13 20 L 16 23 L 19 20" />
      <circle cx="12.5" cy="17" r="0.9" fill="currentColor" />
      <circle cx="19.5" cy="17" r="0.9" fill="currentColor" />
      <circle cx="16" cy="21" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function LanternSmallIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor"
         strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
         {...props}>
      <path d="M16 3 V 6" />
      <path d="M11 8 H 21 L 19 11 H 13 Z" />
      <rect x="10" y="11" width="12" height="13" rx="2" />
      <circle cx="16" cy="17" r="2.5" fill="currentColor" className="opacity-70" />
      <path d="M13 26 H 19" />
      <path d="M16 24 V 28" />
      <path d="M8 16 L 6 14 M24 16 L 26 14 M8 20 L 6 22 M24 20 L 26 22"
            strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

export function NeedlesIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor"
         strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
         {...props}>
      <path d="M16 28 V 6" />
      <path d="M16 12 L 9  7" />
      <path d="M16 12 L 23 7" />
      <path d="M16 17 L 7  13" />
      <path d="M16 17 L 25 13" />
      <path d="M16 22 L 9  20" />
      <path d="M16 22 L 23 20" />
      <circle cx="16" cy="6" r="1" fill="currentColor" />
    </svg>
  );
}

// Rope is drawn above the body so the transform-origin at the rope-tip
// gives a natural pivot when the card-lantern swings.
export function HangingLanternIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 40 68" fill="none" {...props}>
      <line x1="20" y1="0" x2="20" y2="20" stroke="#3A2120" strokeWidth="1.1" />
      <circle cx="20" cy="1" r="1" fill="#3A2120" />
      <path d="M14 20 H 26 L 24 24 H 16 Z" fill="#4A2C2A" />
      <rect x="12" y="24" width="16" height="22" rx="2"
            fill="#4A2C2A" stroke="#3A2120" strokeWidth="1" />
      <rect x="14" y="26" width="12" height="18" fill="url(#hangLanternGlow)" />
      <line x1="20" y1="26" x2="20" y2="44" stroke="#3A2120" strokeWidth="0.7" opacity="0.5" />
      <rect x="15" y="46" width="10" height="2.5" fill="#3A2120" />
      <rect x="17" y="48.5" width="6" height="2" fill="#3A2120" />
      <circle cx="20" cy="34" r="18" fill="#FFB347" opacity="0.25" />

      <defs>
        <radialGradient id="hangLanternGlow" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#FFF2CC" />
          <stop offset="60%" stopColor="#FFB347" />
          <stop offset="100%" stopColor="#C86A10" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export const PROJECT_ICONS = {
  api:     ApiIcon,
  fern:    FernIcon,
  knot:    KnotIcon,
  fox:     FoxIcon,
  lantern: LanternSmallIcon,
  needles: NeedlesIcon,
} as const;

export type ProjectIconKey = keyof typeof PROJECT_ICONS;
