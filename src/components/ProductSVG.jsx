import React from 'react';

const COLORS = {
  book:'#3a2a10', book2:'#1a2a3a', book3:'#1a3a2a', book4:'#2a1a3a',
  book5:'#3a1a2a', book6:'#2a3a1a',
  souvenir:'#2a1a10', horse:'#1a2010', cloth:'#3a1a1a',
  poster:'#1a1a3a', ornament:'#2a2a10', mug:'#1a3a3a',
  music:'#2a1a2a', scarf:'#3a1a2a',
};

export default function ProductSVG({ type }) {
  const bg = COLORS[type] || '#1a1510';
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 160" fill="none">
      <rect width="200" height="160" fill={bg}/>
      <rect x="0" y="0" width="200" height="160" fill="url(#prodG)"/>
      {type?.startsWith('book') ? (
        <>
          <rect x="55" y="20" width="90" height="120" rx="4" fill="#c9a84c" opacity="0.15"/>
          <rect x="60" y="25" width="80" height="110" rx="3" fill="#c9a84c" opacity="0.1"/>
          <rect x="68" y="35" width="64" height="6" rx="2" fill="#c9a84c" opacity="0.5"/>
          <rect x="68" y="50" width="50" height="3" rx="1" fill="#c9a84c" opacity="0.25"/>
          <rect x="68" y="60" width="58" height="3" rx="1" fill="#c9a84c" opacity="0.25"/>
          <rect x="68" y="70" width="45" height="3" rx="1" fill="#c9a84c" opacity="0.25"/>
          <rect x="68" y="80" width="55" height="3" rx="1" fill="#c9a84c" opacity="0.2"/>
          <line x1="55" y1="20" x2="55" y2="140" stroke="#c9a84c" strokeWidth="4" opacity="0.3"/>
          {/* Цвет корешка по типу книги */}
          <rect x="55" y="20" width="6" height="120" fill="#c9a84c" opacity={type==='book'?0.3:type==='book2'?0.25:type==='book3'?0.35:type==='book4'?0.2:type==='book5'?0.4:0.3}/>
        </>
      ) : type === 'horse' ? (
        <>
          <ellipse cx="115" cy="105" rx="50" ry="20" fill="#c9a84c" opacity="0.15"/>
          <path d="M75 112 Q90 85 105 80 Q122 76 135 86 Q148 96 145 110 Q138 120 120 123 Q98 126 82 117 Z" fill="#c9a84c" opacity="0.2"/>
          <path d="M135 87 Q148 78 155 84 Q158 90 152 95 Q144 97 137 90Z" fill="#c9a84c" opacity="0.18"/>
          <line x1="82" y1="123" x2="78" y2="142" stroke="#c9a84c" strokeWidth="5" strokeLinecap="round" opacity="0.3"/>
          <line x1="100" y1="126" x2="98" y2="144" stroke="#c9a84c" strokeWidth="5" strokeLinecap="round" opacity="0.3"/>
          <line x1="122" y1="124" x2="120" y2="142" stroke="#c9a84c" strokeWidth="5" strokeLinecap="round" opacity="0.3"/>
        </>
      ) : type === 'cloth' || type === 'scarf' ? (
        <>
          <path d="M70 40 L100 30 L130 40 L140 130 L60 130Z" fill="#c9a84c" opacity="0.12"/>
          <path d="M85 40 Q100 35 115 40" stroke="#c9a84c" strokeWidth="2" fill="none" opacity="0.4"/>
          {[55,70,85,100].map((y,i)=><rect key={i} x="70" y={y} width="60" height="2" rx="1" fill="#c9a84c" opacity="0.15"/>)}
        </>
      ) : (
        <>
          <circle cx="100" cy="80" r="40" fill="#c9a84c" opacity="0.1"/>
          <path d="M100 50 L104 67 L122 67 L108 77 L113 94 L100 84 L87 94 L92 77 L78 67 L96 67 Z" fill="#c9a84c" opacity="0.35"/>
        </>
      )}
      <defs>
        <linearGradient id="prodG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(0,0,0,0)"/>
          <stop offset="1" stopColor="rgba(0,0,0,0.4)"/>
        </linearGradient>
      </defs>
    </svg>
  );
}
