import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Home.css';

const cards = [
  {
    id: 1,
    title: 'Эпостун тарыхы',
    desc: 'Манас эпосунун келип чыгышы, жазылыш тарыхы жана улантуулары тууралуу.',
    color: '#1a1510',
    image: 'history',
    page: 'history',
  },
  {
    id: 2,
    title: 'Каармандар',
    desc: 'Манас, Семетей, Сейтек жана башка баатырлардын образы жана ролу.',
    color: '#1a1510',
    image: 'heroes',
    page: 'heroes',
  },
  {
    id: 3,
    title: 'Манастын тулпары',
    desc: 'Аккула ат жана анын эрдиктери — эпостун өзгөчö бөлүгу.',
    color: '#1a1510',
    image: 'horse',
    page: 'horse',
  },
  {
    id: 4,
    title: 'Кызыктуу маалыматтар',
    desc: 'Манас эпосу жөнүндө кызыктуу фактылар, сан, цитаталар жана башкалар.',
    color: '#1a1510',
    image: 'facts',
    page: 'facts',
  },
];

/* SVG-иконки для карточек */
function CardImage({ type }) {
  const common = { width: '100%', height: '100%' };

  if (type === 'history') return (
    <svg {...common} viewBox="0 0 320 200" fill="none">
      <rect width="320" height="200" fill="#1a1208"/>
      <rect x="60" y="30" width="140" height="170" rx="4" fill="#3d2e1a" transform="rotate(-8 60 30)"/>
      <rect x="70" y="25" width="140" height="170" rx="4" fill="#2a1f0e" transform="rotate(-3 70 25)"/>
      <rect x="80" y="20" width="145" height="175" rx="4" fill="#4a3520"/>
      <rect x="88" y="30" width="129" height="8" rx="2" fill="#c9a84c" opacity="0.6"/>
      <rect x="88" y="48" width="100" height="4" rx="2" fill="#8b7355" opacity="0.5"/>
      <rect x="88" y="60" width="115" height="4" rx="2" fill="#8b7355" opacity="0.5"/>
      <rect x="88" y="72" width="90" height="4" rx="2" fill="#8b7355" opacity="0.5"/>
      <rect x="88" y="84" width="110" height="4" rx="2" fill="#8b7355" opacity="0.5"/>
      <rect x="88" y="96" width="80" height="4" rx="2" fill="#8b7355" opacity="0.5"/>
      <path d="M200 120 Q230 80 260 100 Q290 120 280 160" stroke="#c9a84c" strokeWidth="1.5" opacity="0.4" fill="none"/>
      <circle cx="245" cy="90" r="20" fill="#c9a84c" opacity="0.05"/>
      <rect x="0" y="0" width="320" height="200" fill="url(#histGrad)"/>
      <defs>
        <linearGradient id="histGrad" x1="0" y1="0" x2="320" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2a1f0e" stopOpacity="0.6"/>
          <stop offset="1" stopColor="#0d0900" stopOpacity="0.2"/>
        </linearGradient>
      </defs>
    </svg>
  );

  if (type === 'heroes') return (
    <svg {...common} viewBox="0 0 320 200" fill="none">
      <rect width="320" height="200" fill="#150e08"/>
      <ellipse cx="160" cy="220" rx="120" ry="60" fill="#1a0e05" opacity="0.8"/>
      {/* Силуэт воина */}
      <ellipse cx="160" cy="70" rx="22" ry="24" fill="#3a2510"/>
      {/* Шлем */}
      <path d="M140 68 Q160 40 180 68" fill="#4a3218"/>
      <path d="M155 44 L160 30 L165 44" fill="#c9a84c" opacity="0.8"/>
      {/* Тело */}
      <rect x="142" y="92" width="36" height="55" rx="6" fill="#2e1e0e"/>
      {/* Накидка */}
      <path d="M145 95 Q120 130 118 170" stroke="#8b1a1a" strokeWidth="8" fill="none" strokeLinecap="round"/>
      {/* Руки */}
      <path d="M142 100 L118 125" stroke="#3a2510" strokeWidth="8" strokeLinecap="round"/>
      <path d="M178 100 L195 115" stroke="#3a2510" strokeWidth="8" strokeLinecap="round"/>
      {/* Копьё */}
      <line x1="195" y1="40" x2="200" y2="170" stroke="#5a3e22" strokeWidth="3"/>
      <path d="M192 40 L198 40 L196 28 Z" fill="#c9a84c" opacity="0.9"/>
      {/* Орнамент */}
      <path d="M20 20 Q40 10 60 20 Q40 30 20 20Z" fill="#c9a84c" opacity="0.3"/>
      <rect x="0" y="0" width="320" height="200" fill="url(#heroGrad)"/>
      <defs>
        <linearGradient id="heroGrad" x1="0" y1="0" x2="320" y2="200">
          <stop offset="0" stopColor="#1a0e05" stopOpacity="0.3"/>
          <stop offset="1" stopColor="#000" stopOpacity="0.5"/>
        </linearGradient>
      </defs>
    </svg>
  );

  if (type === 'horse') return (
    <svg {...common} viewBox="0 0 320 200" fill="none">
      <rect width="320" height="200" fill="#111820"/>
      {/* Горы */}
      <path d="M0 140 L60 60 L120 140 L160 80 L220 140 L280 50 L320 120 L320 200 L0 200Z" fill="#1e2535" opacity="0.8"/>
      <path d="M0 160 L80 100 L150 160 L200 110 L260 160 L320 130 L320 200 L0 200Z" fill="#161e2a" opacity="0.9"/>
      {/* Конь (силуэт) */}
      <ellipse cx="170" cy="145" rx="60" ry="25" fill="#d4cfc8" opacity="0.15"/>
      <path d="M120 160 Q140 120 160 115 Q185 108 205 120 Q225 132 220 155 Q210 165 190 168 Q165 170 145 163 Q128 158 120 160Z" fill="#e8e0d5" opacity="0.9"/>
      {/* Голова */}
      <path d="M205 122 Q225 110 235 118 Q240 125 233 132 Q222 135 210 128Z" fill="#ddd5c8"/>
      {/* Грива */}
      <path d="M195 110 Q200 95 205 90 Q210 100 207 112" fill="#c8bfb0"/>
      {/* Ноги */}
      <line x1="145" y1="168" x2="140" y2="192" stroke="#c8bfb0" strokeWidth="5" strokeLinecap="round"/>
      <line x1="160" y1="170" x2="158" y2="194" stroke="#c8bfb0" strokeWidth="5" strokeLinecap="round"/>
      <line x1="182" y1="169" x2="180" y2="193" stroke="#c8bfb0" strokeWidth="5" strokeLinecap="round"/>
      <line x1="198" y1="166" x2="200" y2="190" stroke="#c8bfb0" strokeWidth="5" strokeLinecap="round"/>
      {/* Хвост */}
      <path d="M120 158 Q100 145 95 130 Q105 128 118 142" fill="#c8bfb0"/>
      {/* Сбруя */}
      <path d="M175 115 Q195 110 210 118" stroke="#c9a84c" strokeWidth="2" fill="none"/>
      <rect x="0" y="0" width="320" height="200" fill="url(#horseGrad)"/>
      <defs>
        <linearGradient id="horseGrad" x1="0" y1="0" x2="0" y2="200">
          <stop offset="0" stopColor="#0d1520" stopOpacity="0.4"/>
          <stop offset="1" stopColor="#000" stopOpacity="0.6"/>
        </linearGradient>
      </defs>
    </svg>
  );

  // facts
  return (
    <svg {...common} viewBox="0 0 320 200" fill="none">
      <rect width="320" height="200" fill="#1a1208"/>
      {/* Юрта */}
      <path d="M80 160 Q160 80 240 160Z" fill="#2a1e0e"/>
      <path d="M90 160 Q160 90 230 160Z" fill="#3a2c14"/>
      <rect x="140" y="145" width="40" height="15" rx="2" fill="#1a1208"/>
      {/* Украшение купола */}
      <circle cx="160" cy="88" r="8" fill="#c9a84c" opacity="0.6"/>
      <line x1="160" y1="80" x2="160" y2="70" stroke="#c9a84c" strokeWidth="2" opacity="0.8"/>
      {/* Горы на фоне */}
      <path d="M0 120 L50 60 L100 120 L150 70 L200 120 L250 50 L320 100 L320 165 L0 165Z" fill="#261a0a" opacity="0.6"/>
      {/* Флаги */}
      <line x1="240" y1="160" x2="240" y2="100" stroke="#5a3e22" strokeWidth="2"/>
      <path d="M240 100 L265 110 L240 120Z" fill="#8b1a1a" opacity="0.8"/>
      <line x1="80" y1="160" x2="80" y2="110" stroke="#5a3e22" strokeWidth="2"/>
      <path d="M80 110 L55 118 L80 126Z" fill="#8b1a1a" opacity="0.8"/>
      {/* Звёзды */}
      <circle cx="30" cy="30" r="1.5" fill="#c9a84c" opacity="0.7"/>
      <circle cx="290" cy="20" r="1.5" fill="#c9a84c" opacity="0.7"/>
      <circle cx="250" cy="35" r="1" fill="#c9a84c" opacity="0.5"/>
      <circle cx="50" cy="15" r="1" fill="#c9a84c" opacity="0.5"/>
      <rect x="0" y="0" width="320" height="200" fill="url(#factsGrad)"/>
      <defs>
        <linearGradient id="factsGrad" x1="0" y1="0" x2="320" y2="200">
          <stop offset="0" stopColor="#1a1208" stopOpacity="0.2"/>
          <stop offset="1" stopColor="#0d0900" stopOpacity="0.5"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { lang } = useApp();
  const T = (ky, ru) => lang === 'ky' ? ky : ru;
  return (
    <main className="home">

      {/* ─── HERO ─── */}
      <section className="hero">
        <div className="hero__bg">
          {/* Орнамент слева */}
          <div className="hero__ornament hero__ornament--left">
            <svg width="60" height="400" viewBox="0 0 60 400" fill="none">
              <path d="M30 0 L30 400" stroke="#c9a84c" strokeWidth="1" opacity="0.4"/>
              {[40, 100, 160, 220, 280, 340].map((y, i) => (
                <g key={i} transform={`translate(30, ${y})`}>
                  <path d="M0 0 L-15 -15 L-15 15 L0 0 L15 -15 L15 15 Z" fill="#c9a84c" opacity="0.35"/>
                  <circle cx="0" cy="0" r="4" fill="#c9a84c" opacity="0.5"/>
                </g>
              ))}
            </svg>
          </div>

          {/* Фоновое изображение — горы, богатырь, белый конь — SVG-имитация */}
          <div className="hero__scene">
            <svg width="100%" height="100%" viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid slice" fill="none">
              {/* Небо */}
              <defs>
                <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                  <stop offset="0" stopColor="#1a2a4a"/>
                  <stop offset="0.5" stopColor="#2a4a6a"/>
                  <stop offset="1" stopColor="#4a6a3a"/>
                </linearGradient>
                <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
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

              {/* Облака */}
              <ellipse cx="900" cy="80" rx="120" ry="35" fill="white" opacity="0.12"/>
              <ellipse cx="820" cy="65" rx="80" ry="25" fill="white" opacity="0.1"/>
              <ellipse cx="1050" cy="100" rx="90" ry="28" fill="white" opacity="0.08"/>
              <ellipse cx="700" cy="90" rx="70" ry="22" fill="white" opacity="0.07"/>

              {/* Горы задний план */}
              <path d="M400 520 L600 180 L700 300 L800 150 L950 350 L1050 200 L1200 380 L1200 520Z" fill="#2a3a1a" opacity="0.6"/>
              <path d="M500 520 L680 200 L760 320 L860 170 L1000 360 L1100 220 L1200 400 L1200 520Z" fill="#1e2e10" opacity="0.5"/>

              {/* Горы ближний план */}
              <path d="M700 520 L850 250 L950 380 L1050 260 L1200 420 L1200 520Z" fill="#172410" opacity="0.8"/>
              <path d="M750 520 L880 270 L960 390 L1080 280 L1200 440 L1200 520Z" fill="#0e1a08" opacity="0.9"/>

              {/* Снег на горах */}
              <path d="M850 250 L865 270 L835 270Z" fill="white" opacity="0.5"/>
              <path d="M1050 260 L1062 278 L1038 278Z" fill="white" opacity="0.4"/>

              {/* Юрты */}
              {[550, 620, 680, 740, 800, 850].map((x, i) => (
                <g key={i} transform={`translate(${x}, 380)`} opacity="0.7">
                  <path d={`M0 40 Q${15 + i * 2} ${0} ${30 + i * 2} 40Z`} fill="#3a2e1a"/>
                  <rect x="10" y="30" width="12" height="10" fill="#1a1208"/>
                </g>
              ))}

              {/* Трава/земля */}
              <path d="M0 420 Q200 400 400 415 Q600 430 800 410 Q1000 395 1200 420 L1200 520 L0 520Z" fill="url(#groundGrad)"/>

              {/* Белый конь (силуэт) */}
              <g transform="translate(620, 200)" opacity="0.9">
                <ellipse cx="90" cy="160" rx="75" ry="30" fill="#d8d0c5" opacity="0.9"/>
                <path d="M30 180 Q50 130 75 120 Q105 112 130 128 Q155 144 148 170 Q138 185 112 188 Q80 192 55 183 Q35 176 30 180Z" fill="#e8e0d5"/>
                <path d="M130 128 Q155 112 168 120 Q174 130 166 138 Q152 142 136 133Z" fill="#ddd6ca"/>
                <path d="M122 112 Q128 94 134 88 Q139 98 136 115" fill="#c8c0b5"/>
                <line x1="55" y1="188" x2="48" y2="215" stroke="#c8c0b5" strokeWidth="7" strokeLinecap="round"/>
                <line x1="75" y1="192" x2="72" y2="218" stroke="#c8c0b5" strokeWidth="7" strokeLinecap="round"/>
                <line x1="105" y1="190" x2="103" y2="216" stroke="#c8c0b5" strokeWidth="7" strokeLinecap="round"/>
                <line x1="125" y1="185" x2="130" y2="212" stroke="#c8c0b5" strokeWidth="7" strokeLinecap="round"/>
                <path d="M30 178 Q8 165 3 148 Q14 145 28 162" fill="#c8c0b5"/>
                {/* Сбруя */}
                <path d="M100 118 Q125 112 140 122" stroke="#c9a84c" strokeWidth="2.5" fill="none"/>
                <circle cx="115" cy="115" r="5" fill="#c9a84c" opacity="0.8"/>
              </g>

              {/* Воин (силуэт) */}
              <g transform="translate(720, 120)">
                {/* Голова + шлем */}
                <ellipse cx="60" cy="60" rx="22" ry="24" fill="#2e1e0e"/>
                <path d="M40 62 Q60 30 80 62" fill="#3e2814"/>
                <path d="M56 34 L60 15 L64 34" fill="#c9a84c" opacity="0.9"/>
                {/* Тело */}
                <rect x="40" y="82" width="40" height="60" rx="8" fill="#2a1a0a"/>
                {/* Доспехи — линии */}
                <path d="M45 90 L75 90" stroke="#c9a84c" strokeWidth="1.5" opacity="0.4"/>
                <path d="M45 100 L75 100" stroke="#c9a84c" strokeWidth="1" opacity="0.3"/>
                {/* Красная накидка */}
                <path d="M42 84 Q10 140 8 210" stroke="#8b1515" strokeWidth="12" fill="none" strokeLinecap="round" opacity="0.9"/>
                {/* Руки */}
                <path d="M40 90 L15 120" stroke="#2e1e0e" strokeWidth="10" strokeLinecap="round"/>
                <path d="M80 90 L100 115" stroke="#2e1e0e" strokeWidth="10" strokeLinecap="round"/>
                {/* Копьё */}
                <line x1="100" y1="20" x2="108" y2="200" stroke="#5a3e22" strokeWidth="4"/>
                <path d="M96 20 L104 20 L101 5 Z" fill="#c9a84c"/>
              </g>

              {/* Орёл вверху */}
              <g transform="translate(950, 60)" opacity="0.7">
                <path d="M0 20 Q20 0 40 20" stroke="#8b7355" strokeWidth="3" fill="none"/>
                <path d="M40 20 Q60 0 80 20" stroke="#8b7355" strokeWidth="3" fill="none"/>
                <ellipse cx="40" cy="22" rx="10" ry="8" fill="#6b5535"/>
              </g>

              {/* Тёмный overlay слева для текста */}
              <rect width="1200" height="520" fill="url(#heroOverlay)"/>
            </svg>
          </div>
        </div>

        {/* Контент поверх */}
        <div className="hero__content">
          <div className="hero__text-block">
            <h1 className="hero__title">{T('МАНАС ЭПОСУ', 'МАНАС ЭПОСУ')}</h1>
            <p className="hero__subtitle">{T('«Эл үчүн, жер үчүн, эркиндик үчүн!»', '«За народ, за землю, за свободу!»')}</p>
            <p className="hero__desc">
              {T(
                'Манас эпосу — кыргыз элинин улуттук каада-салты, тарыхы, баатырдыгы жана асыл рухунун чагылдырылышы.',
                'Эпос Манас — отражение национальных традиций, истории и духа кыргызского народа.'
              )}
            </p>
            <div className="hero__btns">
              <a href="/history" className="hero__btn" onClick={(e) => { e.preventDefault(); navigate('/history'); }}>
                {T('Эпосту окуу', 'Читать эпос')} <span>→</span>
              </a>
              <button className="hero__btn hero__btn--outline" onClick={() => navigate('/shop')}>
                {T('Дүкөн', 'Магазин')}
              </button>
            </div>
          </div>

          <div className="hero__quote">
            <p>«Манас — кыргыз элинин түбөлүк руху»</p>
            <div className="hero__quote-ornament">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 4 L18 12 L26 12 L20 17 L22 25 L16 20 L10 25 L12 17 L6 12 L14 12 Z" fill="#c9a84c" opacity="0.6"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CARDS ─── */}
      <section className="cards-section">
        <div className="cards-section__grid">
          {cards.map((card) => (
            <div className="card" key={card.id} onClick={() => navigate(`/${card.page}`)} role="button" tabIndex={0} style={{cursor:'pointer'}}>
              <div className="card__image">
                <CardImage type={card.image} />
              </div>
              <div className="card__body">
                <h3 className="card__title">{card.title}</h3>
                <p className="card__desc">{card.desc}</p>
                <span className="card__link">Көбүрөөк →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section className="about-section" id="about">
        <div className="about-section__inner">
          {/* Левая текстовая часть */}
          <div className="about-section__text">
            <h2 className="about-section__title">Манас эпосу деген эмне?</h2>
            <p className="about-section__body">
              Манас — дүйнөдөгү эң чоң эпостордун бири. Ал кыргыз элинин тарыхын,
              баатырдык өнөрүн, элдик акылмандыгын жана адамдык баалуулуктарын камтыйт.
              Эпос муундан муунга оозеки түрдö сакталып, бүгүнкү күндө да жашап келет.
            </p>
            <a href="#" className="about-section__btn">
              Толук маалымат →
            </a>
          </div>

          {/* Цитата */}
          <div className="about-section__quote">
            <p className="about-section__quote-text">
              «Манас – өлбөс элдин өлбөс дастаны»
            </p>
            <div className="about-section__quote-decor">
              <svg width="40" height="4" viewBox="0 0 40 4">
                <rect width="40" height="4" rx="2" fill="#c9a84c" opacity="0.6"/>
              </svg>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2 L11.5 7.5 L17 7.5 L12.5 11 L14 16.5 L10 13.5 L6 16.5 L7.5 11 L3 7.5 L8.5 7.5 Z" fill="#c9a84c" opacity="0.7"/>
              </svg>
              <svg width="40" height="4" viewBox="0 0 40 4">
                <rect width="40" height="4" rx="2" fill="#c9a84c" opacity="0.6"/>
              </svg>
            </div>
          </div>

          {/* Правый иллюстрационный силуэт */}
          <div className="about-section__illustration">
            <svg width="100%" height="100%" viewBox="0 0 400 300" fill="none">
              <defs>
                <linearGradient id="aboutBg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#e8dfc8" stopOpacity="0.08"/>
                  <stop offset="1" stopColor="#e8dfc8" stopOpacity="0"/>
                </linearGradient>
              </defs>
              {/* Горы (штриховой стиль) */}
              <path d="M0 220 L80 100 L160 200 L220 80 L300 180 L380 60 L400 130 L400 300 L0 300Z" fill="#c8bfaa" opacity="0.07"/>
              <path d="M0 240 L80 100 L160 200 L220 80 L300 180 L380 60 L400 130" stroke="#c8bfaa" strokeWidth="1.5" fill="none" opacity="0.2"/>
              <path d="M40 240 L100 150 L160 215 L225 110 L290 195 L350 90 L400 160" stroke="#c8bfaa" strokeWidth="1" fill="none" opacity="0.12"/>

              {/* Воин на коне силуэт (штриховой) */}
              <g transform="translate(220, 60)" opacity="0.25" stroke="#c8bfaa" strokeWidth="1.5" fill="none">
                {/* Конь */}
                <ellipse cx="70" cy="150" rx="60" ry="22" fill="#c8bfaa" fillOpacity="0.2"/>
                <path d="M25 162 Q40 128 60 120 Q82 114 100 124 Q118 136 114 154 Q105 165 85 168 Q60 171 42 163 Q28 157 25 162Z"/>
                <path d="M100 124 Q120 112 130 120 Q134 128 126 135 Q116 138 103 128Z"/>
                <line x1="42" y1="168" x2="36" y2="194" strokeLinecap="round"/>
                <line x1="60" y1="171" x2="58" y2="196" strokeLinecap="round"/>
                <line x1="85" y1="170" x2="84" y2="195" strokeLinecap="round"/>
                <line x1="100" y1="166" x2="104" y2="192" strokeLinecap="round"/>
                {/* Воин */}
                <ellipse cx="90" cy="78" rx="14" ry="15"/>
                <path d="M78 82 Q90 58 102 82" fill="none"/>
                <path d="M88 62 L90 50 L92 62" strokeWidth="2"/>
                <rect x="76" y="92" width="28" height="38" rx="4"/>
                <path d="M78 94 Q60 124 58 156" strokeWidth="7" strokeLinecap="round"/>
                <path d="M76 98 L60 118" strokeWidth="6" strokeLinecap="round"/>
                <path d="M104 98 L116 112" strokeWidth="6" strokeLinecap="round"/>
                <line x1="116" y1="40" x2="120" y2="170" strokeWidth="2.5"/>
                <path d="M113 40 L119 40 L116 28Z" fill="#c8bfaa" fillOpacity="0.4" stroke="none"/>
              </g>
            </svg>
          </div>
        </div>
      </section>

    </main>
  );
}
