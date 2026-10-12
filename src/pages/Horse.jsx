import React from 'react';
import { useNavigate } from 'react-router-dom';
import './InnerPage.css';

const traits = [
  { icon: '⚡', label: 'Ылдамдык', desc: 'Аккула желдей учат — бир суткада миң чакырым жол басат деп айтылат.' },
  { icon: '🛡️', label: 'Коргоо', desc: 'Манасты душмандардан коргоп, кооптуу учурларда өз ба ашын тооруктун алдына коет.' },
  { icon: '🧠', label: 'Акыл', desc: 'Аккула адам сыяктуу акылдуу — коркунучту алдын ала сезип, Манасты эскертет.' },
  { icon: '✨', label: 'Сыйкыр', desc: 'Анын жалы алтындай жаркырайт, туяктарынан учкун чачырайт деп баяндалат.' },
];

const legends = [
  {
    title: 'Аккуланын туулушу',
    text: 'Аккула жарыкка биринчи келгенде эле өзгөчө болгон. Жылкы эмес, асман тарабынан жиберилген ыйык жан катары тааныла баштаган.',
  },
  {
    title: 'Манас менен жолугушуу',
    text: 'Жаш Манас Аккуланы биринчи жолу тепсең бастыра албай турган жерден тапкан. Бирок баатыр аны боорукердик менен жакындап, атты өзүнө ынандырган.',
  },
  {
    title: 'Чоң жортуулда',
    text: 'Пекинге жасалган улуу жортуулда Аккула жүздөгөн кырдаал жолугуштуруп, Манасты аман алып чыккан. Бул — эки жандын өчпөс бирдигинин символу.',
  },
  {
    title: 'Символдук мааниси',
    text: 'Аккула — тек ат эмес, эркиндиктин, күчтүн жана берилгендиктин символу. Кыргыз маданиятында ак жылкы ыйык санала берет.',
  },
];

export default function Horse() {
  const navigate = useNavigate();
  return (
    <main className="inner-page">
      {/* Hero banner */}
      <section className="inner-page__hero inner-page__hero--horse">
        <div className="inner-page__hero-overlay" />
        <div className="inner-page__hero-content">
          <span className="inner-page__breadcrumb" onClick={() => navigate('/')}>
            ← Башкы бет
          </span>
          <h1 className="inner-page__hero-title">Манастын тулпары</h1>
          <p className="inner-page__hero-sub">
            Аккула — Манаска берилген сыйкырдуу ак тулпар
          </p>
        </div>
      </section>

      {/* About Akkula */}
      <section className="inner-page__section">
        <div className="inner-page__container">
          <div className="horse-intro">
            {/* SVG иллюстрация коня */}
            <div className="horse-intro__art">
              <svg viewBox="0 0 400 300" fill="none" width="100%" height="100%">
                <defs>
                  <radialGradient id="horseGlow" cx="50%" cy="60%" r="50%">
                    <stop offset="0" stopColor="#c9a84c" stopOpacity="0.15"/>
                    <stop offset="1" stopColor="#c9a84c" stopOpacity="0"/>
                  </radialGradient>
                </defs>
                <rect width="400" height="300" fill="#0e0b08"/>
                <rect width="400" height="300" fill="url(#horseGlow)"/>
                {/* Горы */}
                <path d="M0 200 L80 100 L160 180 L220 80 L300 170 L380 60 L400 120 L400 300 L0 300Z" fill="#1a1510" opacity="0.8"/>
                {/* Конь */}
                <g transform="translate(60, 80)">
                  <ellipse cx="145" cy="165" rx="90" ry="32" fill="#e8e2d8" opacity="0.9"/>
                  <path d="M55 178 Q80 128 115 118 Q150 110 180 128 Q210 146 205 172 Q192 188 165 192 Q128 196 98 183 Q68 172 55 178Z" fill="#f0ece4"/>
                  <path d="M180 128 Q208 112 222 122 Q228 132 218 140 Q205 144 185 132Z" fill="#e8e2d8"/>
                  <path d="M168 112 Q176 90 182 84 Q188 96 184 116" fill="#d8d2c8"/>
                  {/* Грива */}
                  <path d="M155 108 Q162 88 170 80 Q175 72 172 85 Q168 98 165 115" fill="#c8c2b8" opacity="0.8"/>
                  <path d="M162 110 Q168 92 175 86 Q178 95 174 112" fill="#d8d2c8" opacity="0.6"/>
                  {/* Ноги */}
                  <line x1="95" y1="188" x2="88" y2="225" stroke="#d8d2c8" strokeWidth="9" strokeLinecap="round"/>
                  <line x1="118" y1="194" x2="115" y2="230" stroke="#d8d2c8" strokeWidth="9" strokeLinecap="round"/>
                  <line x1="155" y1="193" x2="153" y2="228" stroke="#d8d2c8" strokeWidth="9" strokeLinecap="round"/>
                  <line x1="178" y1="187" x2="182" y2="224" stroke="#d8d2c8" strokeWidth="9" strokeLinecap="round"/>
                  {/* Хвост */}
                  <path d="M55 175 Q25 158 18 138 Q32 134 50 155" fill="#c8c2b8"/>
                  <path d="M55 178 Q30 162 22 145 Q28 140 48 162" fill="#d8d2c8" opacity="0.6"/>
                  {/* Сбруя — золотая */}
                  <path d="M148 118 Q172 112 188 124" stroke="#c9a84c" strokeWidth="2.5" fill="none"/>
                  <circle cx="165" cy="115" r="5" fill="#c9a84c"/>
                  <circle cx="178" cy="120" r="3.5" fill="#c9a84c" opacity="0.8"/>
                  <path d="M150 122 L148 135 L160 138 L162 122" stroke="#c9a84c" strokeWidth="1.5" fill="none"/>
                  {/* Блики */}
                  <ellipse cx="130" cy="148" rx="20" ry="8" fill="white" opacity="0.12" transform="rotate(-20 130 148)"/>
                  <ellipse cx="175" cy="130" rx="12" ry="5" fill="white" opacity="0.1" transform="rotate(-10 175 130)"/>
                </g>
                {/* Звёзды */}
                {[[30,20],[350,30],[20,80],[370,60],[200,15]].map(([x,y],i)=>(
                  <circle key={i} cx={x} cy={y} r="1.5" fill="#c9a84c" opacity="0.6"/>
                ))}
              </svg>
            </div>

            <div className="horse-intro__text">
              <h2>Аккула жөнүндө</h2>
              <p>
                Аккула — Манас эпосундагы улуу тулпар. "Ак" — таза, ыйык; "кула" — жылкынын
                түсү. Ал жөнөкөй жылкы эмес, Манаска берилген асман тартуусу катары
                баяндалат.
              </p>
              <p>
                Манас менен Аккуланын байланышы — адам менен жаратылыштын биримдигинин,
                берилгендик менен ишеничтин символу.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Traits */}
      <section className="inner-page__section inner-page__section--dark">
        <div className="inner-page__container">
          <h2 className="inner-page__section-title">Аккуланын касиеттери</h2>
          <div className="traits-grid">
            {traits.map((t, i) => (
              <div className="trait-card" key={i}>
                <span className="trait-card__icon">{t.icon}</span>
                <h3>{t.label}</h3>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legends */}
      <section className="inner-page__section">
        <div className="inner-page__container">
          <h2 className="inner-page__section-title">Легендалар</h2>
          <div className="legends-list">
            {legends.map((l, i) => (
              <div className="legend-item" key={i}>
                <div className="legend-item__num">{String(i + 1).padStart(2, '0')}</div>
                <div className="legend-item__body">
                  <h3>{l.title}</h3>
                  <p>{l.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="inner-page__section inner-page__section--quote">
        <div className="inner-page__container">
          <blockquote className="big-quote">
            <p>«Аккула — Манастын канаты, жаны жана эркиндиги»</p>
            <cite>— Манас эпосунан</cite>
          </blockquote>
        </div>
      </section>
    </main>
  );
}
