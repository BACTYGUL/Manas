import React from 'react';

export default function HomeCardImage({ type }) {
  const s = { width:'100%', height:'100%' };
  if (type === 'history') return (
    <svg {...s} viewBox="0 0 320 200" fill="none">
      <rect width="320" height="200" fill="#1a1208"/>
      <rect x="60" y="30" width="140" height="170" rx="4" fill="#3d2e1a" transform="rotate(-8 60 30)"/>
      <rect x="70" y="25" width="140" height="170" rx="4" fill="#2a1f0e" transform="rotate(-3 70 25)"/>
      <rect x="80" y="20" width="145" height="175" rx="4" fill="#4a3520"/>
      <rect x="88" y="30" width="129" height="8" rx="2" fill="#c9a84c" opacity="0.6"/>
      <rect x="88" y="48" width="100" height="4" rx="2" fill="#8b7355" opacity="0.5"/>
      <rect x="88" y="60" width="115" height="4" rx="2" fill="#8b7355" opacity="0.5"/>
      <rect x="88" y="72" width="90"  height="4" rx="2" fill="#8b7355" opacity="0.5"/>
      <rect x="88" y="84" width="110" height="4" rx="2" fill="#8b7355" opacity="0.5"/>
      <rect x="88" y="96" width="80"  height="4" rx="2" fill="#8b7355" opacity="0.5"/>
      <path d="M200 120 Q230 80 260 100 Q290 120 280 160" stroke="#c9a84c" strokeWidth="1.5" opacity="0.4" fill="none"/>
      <rect x="0" y="0" width="320" height="200" fill="url(#hGrad)"/>
      <defs>
        <linearGradient id="hGrad" x1="0" y1="0" x2="320" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2a1f0e" stopOpacity="0.6"/>
          <stop offset="1" stopColor="#0d0900" stopOpacity="0.2"/>
        </linearGradient>
      </defs>
    </svg>
  );
  if (type === 'heroes') return (
    <svg {...s} viewBox="0 0 320 200" fill="none">
      <rect width="320" height="200" fill="#150e08"/>
      <ellipse cx="160" cy="70" rx="22" ry="24" fill="#3a2510"/>
      <path d="M140 68 Q160 40 180 68" fill="#4a3218"/>
      <path d="M155 44 L160 30 L165 44" fill="#c9a84c" opacity="0.8"/>
      <rect x="142" y="92" width="36" height="55" rx="6" fill="#2e1e0e"/>
      <path d="M145 95 Q120 130 118 170" stroke="#8b1a1a" strokeWidth="8" fill="none" strokeLinecap="round"/>
      <path d="M142 100 L118 125" stroke="#3a2510" strokeWidth="8" strokeLinecap="round"/>
      <path d="M178 100 L195 115" stroke="#3a2510" strokeWidth="8" strokeLinecap="round"/>
      <line x1="195" y1="40" x2="200" y2="170" stroke="#5a3e22" strokeWidth="3"/>
      <path d="M192 40 L198 40 L196 28 Z" fill="#c9a84c" opacity="0.9"/>
      <path d="M20 20 Q40 10 60 20 Q40 30 20 20Z" fill="#c9a84c" opacity="0.3"/>
      <rect x="0" y="0" width="320" height="200" fill="url(#hGrad2)"/>
      <defs>
        <linearGradient id="hGrad2" x1="0" y1="0" x2="320" y2="200">
          <stop offset="0" stopColor="#1a0e05" stopOpacity="0.3"/>
          <stop offset="1" stopColor="#000" stopOpacity="0.5"/>
        </linearGradient>
      </defs>
    </svg>
  );
  if (type === 'horse') return (
    <svg {...s} viewBox="0 0 320 200" fill="none">
      <rect width="320" height="200" fill="#111820"/>
      <path d="M0 140 L60 60 L120 140 L160 80 L220 140 L280 50 L320 120 L320 200 L0 200Z" fill="#1e2535" opacity="0.8"/>
      <path d="M0 160 L80 100 L150 160 L200 110 L260 160 L320 130 L320 200 L0 200Z" fill="#161e2a" opacity="0.9"/>
      <path d="M120 160 Q140 120 160 115 Q185 108 205 120 Q225 132 220 155 Q210 165 190 168 Q165 170 145 163 Q128 158 120 160Z" fill="#e8e0d5" opacity="0.9"/>
      <path d="M205 122 Q225 110 235 118 Q240 125 233 132 Q222 135 210 128Z" fill="#ddd5c8"/>
      <path d="M175 115 Q195 110 210 118" stroke="#c9a84c" strokeWidth="2" fill="none"/>
      <rect x="0" y="0" width="320" height="200" fill="url(#hGrad3)"/>
      <defs>
        <linearGradient id="hGrad3" x1="0" y1="0" x2="0" y2="200">
          <stop offset="0" stopColor="#0d1520" stopOpacity="0.4"/>
          <stop offset="1" stopColor="#000" stopOpacity="0.6"/>
        </linearGradient>
      </defs>
    </svg>
  );
  return (
    <svg {...s} viewBox="0 0 320 200" fill="none">
      <rect width="320" height="200" fill="#1a1208"/>
      <path d="M80 160 Q160 80 240 160Z" fill="#2a1e0e"/>
      <path d="M90 160 Q160 90 230 160Z" fill="#3a2c14"/>
      <rect x="140" y="145" width="40" height="15" rx="2" fill="#1a1208"/>
      <circle cx="160" cy="88" r="8" fill="#c9a84c" opacity="0.6"/>
      <line x1="160" y1="80" x2="160" y2="70" stroke="#c9a84c" strokeWidth="2" opacity="0.8"/>
      <path d="M0 120 L50 60 L100 120 L150 70 L200 120 L250 50 L320 100 L320 165 L0 165Z" fill="#261a0a" opacity="0.6"/>
      <circle cx="30" cy="30" r="1.5" fill="#c9a84c" opacity="0.7"/>
      <circle cx="290" cy="20" r="1.5" fill="#c9a84c" opacity="0.7"/>
      <rect x="0" y="0" width="320" height="200" fill="url(#hGrad4)"/>
      <defs>
        <linearGradient id="hGrad4" x1="0" y1="0" x2="320" y2="200">
          <stop offset="0" stopColor="#1a1208" stopOpacity="0.2"/>
          <stop offset="1" stopColor="#0d0900" stopOpacity="0.5"/>
        </linearGradient>
      </defs>
    </svg>
  );
}
