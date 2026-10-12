import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InnerPage.css';

const heroes = [
  {
    id: 1,
    name: 'Манас',
    role: 'Улуу баатыр',
    color: '#8b1a1a',
    desc: 'Манас — эпостун башкы каарманы. Ал кыргыз элин бириктирип, душмандардан коргогон улуу баатыр. Анын күчү, акылмандыгы жана адилеттүүлүгү бүтүндөй элдин символуна айланган.',
    facts: [
      'Кырк чоро деп аталган 40 жолдошу болгон',
      'Аккула — анын сыйкырдуу ак аты',
      'Канымды сүйгөн аялы',
      'Алмамбет — эң жакын досу жана жолдошу',
    ],
  },
  {
    id: 2,
    name: 'Семетей',
    role: 'Манастын уулу',
    color: '#1a4a8b',
    desc: 'Семетей — Манастын баатыр уулу. Атасынын ишин улантып, элин коргоп, душмандарга каршы күрөшкөн. Ал да атасындай эрдик менен өмүр сүргөн.',
    facts: [
      'Кыял — анын сүйгөн жары',
      'Күлчорону жолдошу катары тапкан',
      'Чынкожо менен Токтобай — кас душмандары',
      'Атасынын өчүн алган',
    ],
  },
  {
    id: 3,
    name: 'Сейтек',
    role: 'Семетейдин уулу',
    color: '#1a6b2a',
    desc: 'Сейтек — үчүнчү муундун баатыры. Ал атасы Семетей менен чоң энеси Чыйырдынын ырыскысын улантып, элине тынчтык алып келген.',
    facts: [
      'Эпостун үчүнчү бөлүмүнүн башкы каарманы',
      'Ата-бабаларынын руху менен байланышы бар',
      'Элге тынчтык жана береке алып келген',
      'Эпостун финалын аяктаган баатыр',
    ],
  },
  {
    id: 4,
    name: 'Алмамбет',
    role: 'Манастын жолдошу',
    color: '#6b4a1a',
    desc: 'Алмамбет — Манаска эң берилген жолдош. Ал башында душман жагында болгон, бирок акыры Манаска кошулуп, анын эң ишенимдүү серигине айланган.',
    facts: [
      'Сыйкырдуу күчкө ээ болгон',
      'Хан тукумунан чыккан',
      'Манаска өзүн арнаган',
      'Чоң жортуулда каза тапкан',
    ],
  },
  {
    id: 5,
    name: 'Каныкей',
    role: 'Манастын аялы',
    color: '#6b1a6b',
    desc: 'Каныкей — Манаска берилген акылдуу жана батыл аял. Ал тек аялзат эмес, элинин инсандарын коргогон, Семетейди тарбиялаган улуу эне.',
    facts: [
      'Манасты жараланганда дайыма айыктырган',
      'Семетейди жашыруун өстүргөн',
      'Кыргыз аялынын символу',
      'Акылдуулугу менен Манасты сактаган',
    ],
  },
  {
    id: 6,
    name: 'Чыйырды',
    role: 'Манастын энеси',
    color: '#2a6b6b',
    desc: 'Чыйырды — Манаска жан тарткан мээримдүү эне. Уулунун эрдиктери үчүн сыймыктанып, ар дайым дубасын берип турган.',
    facts: [
      'Жакыптын аялы',
      'Манасты дүйнөгө алып келген',
      'Уулунун ар бир жеңишин сыймыктануу менен карттан',
      'Элдик аялдын ыйык образы',
    ],
  },
];

export default function Heroes() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  return (
    <main className="inner-page">
      {/* Hero banner */}
      <section className="inner-page__hero inner-page__hero--heroes">
        <div className="inner-page__hero-overlay" />
        <div className="inner-page__hero-content">
          <span className="inner-page__breadcrumb" onClick={() => navigate('/')}>
            ← Башкы бет
          </span>
          <h1 className="inner-page__hero-title">Каармандар</h1>
          <p className="inner-page__hero-sub">
            Манас эпосунун улуу баатырлары жана алардын баяндары
          </p>
        </div>
      </section>

      {/* Heroes grid */}
      <section className="inner-page__section">
        <div className="inner-page__container">
          <div className="heroes-grid">
            {heroes.map((hero) => (
              <div
                className={`hero-card ${selected?.id === hero.id ? 'hero-card--active' : ''}`}
                key={hero.id}
                onClick={() => setSelected(selected?.id === hero.id ? null : hero)}
                style={{ '--hero-color': hero.color }}
              >
                {/* Аватар */}
                <div className="hero-card__avatar">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <circle cx="40" cy="40" r="38" fill={hero.color} opacity="0.2" stroke={hero.color} strokeWidth="1.5"/>
                    <ellipse cx="40" cy="35" rx="14" ry="16" fill={hero.color} opacity="0.5"/>
                    <path d="M18 72 Q40 55 62 72" fill={hero.color} opacity="0.3"/>
                    <path d="M32 28 Q40 16 48 28" fill={hero.color} opacity="0.6"/>
                    <line x1="40" y1="20" x2="40" y2="12" stroke="#c9a84c" strokeWidth="2"/>
                    <path d="M37 12 L40 6 L43 12Z" fill="#c9a84c" opacity="0.8"/>
                  </svg>
                </div>
                <h3 className="hero-card__name">{hero.name}</h3>
                <span className="hero-card__role">{hero.role}</span>

                {/* Раскрытая панель */}
                {selected?.id === hero.id && (
                  <div className="hero-card__detail">
                    <p className="hero-card__desc">{hero.desc}</p>
                    <ul className="hero-card__facts">
                      {hero.facts.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <button className="hero-card__btn">
                  {selected?.id === hero.id ? 'Жабуу ↑' : 'Толук маалымат ↓'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="inner-page__section inner-page__section--quote">
        <div className="inner-page__container">
          <blockquote className="big-quote">
            <p>«Баатыр — өлбөйт, анын иши өлбөйт»</p>
            <cite>— Манас эпосунан</cite>
          </blockquote>
        </div>
      </section>
    </main>
  );
}
