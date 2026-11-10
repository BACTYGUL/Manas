import React from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from '../i18n/translations';

export default function HeroSection({ lang }) {
  const navigate = useNavigate();
  return (
    <section className="hero">
      <div className="hero__bg">
        <div className="hero__ornament hero__ornament--left">
          <svg width="60" height="400" viewBox="0 0 60 400" fill="none">
            <path d="M30 0 L30 400" stroke="#c9a84c" strokeWidth="1" opacity="0.4"/>
            {[40,100,160,220,280,340].map((y,i)=>(
              <g key={i} transform={`translate(30,${y})`}>
                <path d="M0 0 L-15 -15 L-15 15 L0 0 L15 -15 L15 15 Z" fill="#c9a84c" opacity="0.35"/>
                <circle cx="0" cy="0" r="4" fill="#c9a84c" opacity="0.5"/>
              </g>
            ))}
          </svg>
        </div>
        <div className="hero__scene">
          <svg width="100%" height="100%" viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid slice" fill="none">
            <defs>
              <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                <stop offset="0" stopColor="#1a2a4a"/>
                <stop offset="0.5" stopColor="#2a4a6a"/>
                <stop offset="1" stopColor="#4a6a3a"/>
              </linearGradient>
              <linearGradient id="groundGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#1a2a0a"/>
                <stop offset="1" stopColor="#0a1505"/>
              </linearGradient>
              <linearGradient id="heroOverlay" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#0e0b08" stopOpacity="0.85"/>
                <stop offset="0.45" stopColor="#0e0b08" stopOpacity="0.3"/>
                <stop offset="1" stopColor="#0e0b08" stopOpacity="0.1"/>
              </linearGradient>
              <radialGradient id="sunGlow" cx="75%" cy="30%" r="30%">
                <stop offset="0" stopColor="#f0a030" stopOpacity="0.6"/>
                <stop offset="1" stopColor="transparent" stopOpacity="0"/>
              </radialGradient>
            </defs>
            <rect width="1200" height="520" fill="url(#skyGrad)"/>
            <rect width="1200" height="520" fill="url(#sunGlow)"/>
            <ellipse cx="900" cy="80" rx="120" ry="35" fill="white" opacity="0.12"/>
            <ellipse cx="820" cy="65" rx="80" ry="25" fill="white" opacity="0.1"/>
            <ellipse cx="1050" cy="100" rx="90" ry="28" fill="white" opacity="0.08"/>
            <ellipse cx="700" cy="90" rx="70" ry="22" fill="white" opacity="0.07"/>
            <path d="M400 520 L600 180 L700 300 L800 150 L950  L1050 200 L1200 380 L1200 520Z" fill="#2a3a1a" opacity="0.6"/>
            <path d="M500 520 L680 200 L760 320 L860 170 L1000 360 L1100 220 L1200 400 L1200 520Z" fill="#1e2e10" opacity="0.5"/>
            <path d="M700 520 L850 250 L950 380 L1050 260 L1200 420 L1200 520Z" fill="#172410" opacity="0.8"/>
            <path d="M750 520 L880 270 L960 390 L1080 280 L1200 440 L1200 520Z" fill="#0e1a08" opacity="0.9"/>
            <path d="M850 250 L865 270 L835 270Z" fill="white" opacity="0.5"/>
            <path d="M1050 260 L1062 278 L1038 278Z" fill="white" opacity="0.4"/>
            {[550,620,680,740,800,850].map((x,i)=>(
              <g key={i} transform={`translate(${x},380)`} opacity="0.7">
                <path d={`M0 40 Q${15+i*2} 0 ${30+i*2} 40Z`} fill="#3a2e1a"/>
                <rect x="10" y="30" width="12" height="10" fill="#1a1208"/>
              </g>
            ))}
            <path d="M0 420 Q200 400 400 415 Q600 430 800 410 Q1000 395 1200 420 L1200 520 L0 520Z" fill="url(#groundGrad2)"/>
            <g transform="translate(620,200)" opacity="0.9">
              <ellipse cx="90" cy="160" rx="75" ry="30" fill="#d8d0c5" opacity="0.9"/>
              <path d="M30 180 Q50 130 75 120 Q105 112 130 128 Q155 144 148 170 Q138 185 112 188 Q80 192 55 183 Q35 176 30 180Z" fill="#e8e0d5"/>
              <path d="M130 128 Q155 112 168 120 Q174 130 166 138 Q152 142 136 133Z" fill="#ddd6ca"/>
              <path d="M122 112 Q128 94 134 88 Q139 98 136 115" fill="#c8c0b5"/>
              <line x1="55" y1="188" x2="48" y2="215" stroke="#c8c0b5" strokeWidth="7" strokeLinecap="round"/>
              <line x1="75" y1="192" x2="72" y2="218" stroke="#c8c0b5" strokeWidth="7" strokeLinecap="round"/>
              <line x1="105" y1="190" x2="103" y2="216" stroke="#c8c0b5" strokeWidth="7" strokeLinecap="round"/>
              <line x1="125" y1="185" x2="130" y2="212" stroke="#c8c0b5" strokeWidth="7" strokeLinecap="round"/>
              <path d="M30 178 Q8 165 3 148 Q14 145 28 162" fill="#c8c0b5"/>
              <path d="M100 118 Q125 112 140 122" stroke="#c9a84c" strokeWidth="2.5" fill="none"/>
              <circle cx="115" cy="115" r="5" fill="#c9a84c" opacity="0.8"/>
            </g>
            <g transform="translate(720,120)">
              <ellipse cx="60" cy="60" rx="22" ry="24" fill="#2e1e0e"/>
              <path d="M40 62 Q60 30 80 62" fill="#3e2814"/>
              <path d="M56 34 L60 15 L64 34" fill="#c9a84c" opacity="0.9"/>
              <rect x="40" y="82" width="40" height="60" rx="8" fill="#2a1a0a"/>
              <path d="M45 90 L75 90" stroke="#c9a84c" strokeWidth="1.5" opacity="0.4"/>
              <path d="M42 84 Q10 140 8 210" stroke="#8b1515" strokeWidth="12" fill="none" strokeLinecap="round" opacity="0.9"/>
              <path d="M40 90 L15 120" stroke="#2e1e0e" strokeWidth="10" strokeLinecap="round"/>
              <path d="M80 90 L100 115" stroke="#2e1e0e" strokeWidth="10" strokeLinecap="round"/>
              <line x1="100" y1="20" x2="108" y2="200" stroke="#5a3e22" strokeWidth="4"/>
              <path d="M96 20 L104 20 L101 5 Z" fill="#c9a84c"/>
            </g>
            <g transform="translate(950,60)" opacity="0.7">
              <path d="M0 20 Q20 0 40 20" stroke="#8b7355" strokeWidth="3" fill="none"/>
              <path d="M40 20 Q60 0 80 20" stroke="#8b7355" strokeWidth="3" fill="none"/>
              <ellipse cx="40" cy="22" rx="10" ry="8" fill="#6b5535"/>
            </g>
            <rect width="1200" height="520" fill="url(#heroOverlay)"/>
          </svg>
        </div>
      </div>
      <div className="hero__content">
        <div className="hero__text-block">
          <h1 className="hero__title">{t('hero_title', lang)}</h1>
          <p className="hero__subtitle">{t('hero_subtitle', lang)}</p>
          <p className="hero__desc">{t('hero_desc', lang)}</p>
          <div className="hero__btns">
            <a href="/history" className="hero__btn" onClick={e => { e.preventDefault(); navigate('/history'); }}>
              {t('hero_read', lang)} <span>→</span>
            </a>
            <button className="hero__btn hero__btn--outline" onClick={() => navigate('/shop')}>
              {t('hero_shop', lang)}
            </button>
          </div>
        </div>
        <div className="hero__quote">
          <p>{t('hero_quote', lang)}</p>
          <div className="hero__quote-ornament">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 4 L18 12 L26 12 L20 17 L22 25 L16 20 L10 25 L12 17 L6 12 L14 12 Z" fill="#c9a84c" opacity="0.6"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
