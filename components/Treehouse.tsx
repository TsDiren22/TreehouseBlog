import type { SVGProps } from "react";

export function Treehouse(props: SVGProps<SVGSVGElement>) {
  const { className = "", ...svgProps } = props;

  return (
    <svg
      viewBox="0 0 320 360"
      fill="none"
      aria-labelledby="treehouse-title"
      role="img"
      className={`treehouse-art ${className}`.trim()}
      {...svgProps}
    >
      <title id="treehouse-title">
        A small wooden treehouse nestled in a pine canopy, with a lit
        amber window and a ladder down the trunk.
      </title>

      <defs>
        <radialGradient id="windowGlow" cx="50%" cy="50%" r="60%">
          <stop offset="0%"  stopColor="#FFE4A8" />
          <stop offset="55%" stopColor="#FFB347" />
          <stop offset="100%" stopColor="#E58A1F" />
        </radialGradient>
        <radialGradient id="lanternGlow" cx="50%" cy="45%" r="55%">
          <stop offset="0%"  stopColor="#FFF1CC" />
          <stop offset="60%" stopColor="#FFB347" />
          <stop offset="100%" stopColor="#C86A10" />
        </radialGradient>
        <linearGradient id="roofGrain" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#4A2C2A" />
          <stop offset="100%" stopColor="#3A2120" />
        </linearGradient>
        <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#EED9B1" />
          <stop offset="100%" stopColor="#D2B48C" />
        </linearGradient>
      </defs>

      <circle className="treehouse-lit" cx="160" cy="210" r="110" fill="#FFB347" opacity="0.18" />

      <g>
        <circle cx="80"  cy="110" r="44" fill="#223D16" />
        <circle cx="240" cy="110" r="44" fill="#223D16" />
        <circle cx="160" cy="70"  r="52" fill="#223D16" />

        <circle cx="110" cy="95"  r="40" fill="#2D4F1E" />
        <circle cx="210" cy="95"  r="40" fill="#2D4F1E" />
        <circle cx="155" cy="90"  r="46" fill="#395B28" />
        <circle cx="70"  cy="140" r="30" fill="#2D4F1E" />
        <circle cx="250" cy="140" r="30" fill="#2D4F1E" />

        <circle cx="135" cy="80"  r="8"  fill="#7A9A5A" opacity="0.55" />
        <circle cx="185" cy="82"  r="6"  fill="#7A9A5A" opacity="0.55" />
        <circle cx="95"  cy="115" r="5"  fill="#7A9A5A" opacity="0.55" />
        <circle cx="225" cy="118" r="5"  fill="#7A9A5A" opacity="0.55" />
      </g>

      <rect x="150" y="190" width="20" height="150" fill="#4A2C2A" />
      <rect x="150" y="190" width="4"  height="150" fill="#3A2120" opacity="0.6" />
      <ellipse cx="160" cy="245" rx="3" ry="5" fill="#3A2120" />
      <ellipse cx="161" cy="300" rx="2.5" ry="4" fill="#3A2120" />

      <path
        d="M 150 205 C 130 200 110 195 85 192"
        stroke="#4A2C2A"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line x1="85" y1="192" x2="85" y2="218" stroke="#3A2120" strokeWidth="1.2" />

      <g>
        <rect x="78" y="218" width="14" height="2" fill="#3A2120" />
        <rect
          x="75" y="220" width="20" height="22" rx="2"
          fill="#4A2C2A" stroke="#3A2120" strokeWidth="0.8"
        />
        <rect x="78" y="223" width="14" height="16" fill="#5E4A37" />
        <rect className="treehouse-lit" x="78" y="223" width="14" height="16" fill="url(#lanternGlow)" />
        <line x1="85" y1="223" x2="85" y2="239" stroke="#3A2120" strokeWidth="0.6" opacity="0.5" />
        <rect x="80" y="242" width="10" height="2" fill="#3A2120" />
        <circle className="treehouse-lit" cx="85" cy="230" r="18" fill="#FFB347" opacity="0.22" />
      </g>

      <rect x="85" y="222" width="150" height="6" fill="#4A2C2A" />
      <line x1="110" y1="225" x2="110" y2="228" stroke="#3A2120" />
      <line x1="150" y1="225" x2="150" y2="228" stroke="#3A2120" />
      <line x1="190" y1="225" x2="190" y2="228" stroke="#3A2120" />

      <rect x="95" y="170" width="130" height="52" fill="url(#wall)" stroke="#4A2C2A" strokeWidth="1.5" />

      <line x1="95"  y1="184" x2="225" y2="184" stroke="#8C6A44" strokeWidth="0.6" opacity="0.55" />
      <line x1="95"  y1="198" x2="225" y2="198" stroke="#8C6A44" strokeWidth="0.6" opacity="0.55" />
      <line x1="95"  y1="212" x2="225" y2="212" stroke="#8C6A44" strokeWidth="0.6" opacity="0.55" />

      <rect x="117" y="182" width="36" height="30" fill="#6A5845" />
      <rect className="treehouse-lit" x="117" y="182" width="36" height="30" fill="url(#windowGlow)" />
      <rect x="117" y="182" width="36" height="30" fill="none" stroke="#4A2C2A" strokeWidth="1.5" />
      <line x1="135" y1="182" x2="135" y2="212" stroke="#4A2C2A" strokeWidth="1" />
      <line x1="117" y1="197" x2="153" y2="197" stroke="#4A2C2A" strokeWidth="1" />
      <rect x="114" y="211" width="42" height="3" fill="#4A2C2A" />
      <path className="treehouse-lit" d="M 117 212 L 100 224 L 170 224 L 153 212 Z" fill="#FFB347" opacity="0.25" />

      <rect x="178" y="190" width="24" height="32" fill="#4A2C2A" stroke="#3A2120" strokeWidth="1" />
      <rect x="180" y="192" width="20" height="28" fill="none" stroke="#8C6A44" strokeWidth="0.5" />
      <circle className="treehouse-lit" cx="197" cy="207" r="1.2" fill="#FFB347" />

      <path
        d="M 80 170 L 160 120 L 240 170 Z"
        fill="url(#roofGrain)"
        stroke="#3A2120"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M 80 170 L 160 120 L 160 130 L 88 173 Z"
        fill="#2B1818"
        opacity="0.35"
      />
      <line x1="160" y1="120" x2="160" y2="98" stroke="#3A2120" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M 160 100 L 176 103 L 160 108 Z" fill="#C17B5E" />

      <line x1="100" y1="228" x2="96"  y2="340" stroke="#4A2C2A" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="118" y1="228" x2="114" y2="340" stroke="#4A2C2A" strokeWidth="2.2" strokeLinecap="round" />
      {[244, 260, 276, 292, 308, 324].map((y, i) => (
        <line
          key={i}
          x1={99 - (y - 228) * 0.04}
          x2={119 - (y - 228) * 0.04}
          y1={y}
          y2={y}
          stroke="#4A2C2A"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      ))}

      <ellipse cx="160" cy="345" rx="80" ry="4" fill="#4A2C2A" opacity="0.2" />
      <path
        d="M 60 340 q 6 -10 12 0 q 6 -9 12 0"
        stroke="#2D4F1E" strokeWidth="1.6" strokeLinecap="round" fill="none"
      />
      <path
        d="M 240 340 q 5 -8 10 0 q 5 -9 10 0 q 5 -7 10 0"
        stroke="#2D4F1E" strokeWidth="1.6" strokeLinecap="round" fill="none"
      />
      <ellipse cx="210" cy="342" rx="6" ry="2" fill="#8C6A44" />
      <ellipse cx="220" cy="344" rx="4" ry="1.5" fill="#8C6A44" />

      <circle className="treehouse-lit" cx="60"  cy="170" r="1.3" fill="#FFB347" />
      <circle className="treehouse-lit" cx="262" cy="178" r="1.1" fill="#FFB347" />
      <circle className="treehouse-lit" cx="42"  cy="200" r="1"   fill="#FFB347" />
      <circle className="treehouse-lit" cx="280" cy="205" r="1"   fill="#FFB347" />
    </svg>
  );
}

export default Treehouse;
