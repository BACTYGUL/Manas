import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InnerPage.css';

const facts = [
  {
    num: '01',
    title: '500 000+ ыр сабы',
    text: 'Манас эпосу дүйнөдөгү эң узун оозеки эпос. Ал Илиада жана Одиссеяны чогуу алганда 20 эсе, Махабхаратадан 2.5 эсе чоң.',
    category: 'Сан',
  },
  {
    num: '02',
    title: '3 бөлүктөн турат',
    text: 'Эпос үч бөлүктөн турат: Манас, Семетей жана Сейтек — үч муундун баатырдык жолу.',
    category: 'Курулуш',
  },
  {
    num: '03',
    title: '40 чоро',
    text: '"Кырк чоро" — Манаска берилген 40 баатыр жолдош. Кыргыз санариптик маданиятында "кырк" — толуктуктун символу.',
    category: 'Санарип',
  },
  {
    num: '04',
    title: 'ЮНЕСКО — 1995',
    text: '1995-жылы Манас эпосунун 1000 жылдыгы ЮНЕСКО тарабынан белгиленген. Бул Кыргызстандын эл аралык аренадагы чоң жеңиши.',
    category: 'Таанылуу',
  },
  {
    num: '05',
    title: 'Манасчылар',
    text: 'Манасчы — эпосту жатка билген касиеттүү жомокчу. Алар эпосту түш аркылуу үйрөнгөн деп ишенишет. Бүгүн 70дөн ашуун манасчы бар.',
    category: 'Маданият',
  },
  {
    num: '06',
    title: 'Сагымбай Орозбаков',
    text: 'XIX–XX к. манасчы Сагымбай Орозбаков эпостун эң чоң вариантын айткан — 400 000 ыр сабынан ашуун. Ал "эпостун алтын дааналары" деп аталат.',
    category: 'Инсандар',
  },
  {
    num: '07',
    title: '40+ тилге которулган',
    text: 'Эпос дүйнөнүн 40дан ашуун тилине которулган. Орус, кытай, англис, немец, француз жана башка тилдерде окуй аласыз.',
    category: 'Дүйнө',
  },
  {
    num: '08',
    title: 'Чокан Валиханов — 1856',
    text: 'Биринчи жазылып алынган текст: орус-казак окумуштуусу Чокан Валиханов 1856-жылы "Кокөтөйдүн ашы" бөлүгүн жазып алган.',
    category: 'Тарых',
  },
  {
    num: '09',
    title: 'Кыргызстандын символу',
    text: 'Манас — Кыргызстандын расмий символдорунун бири. Бишкекте Манаска эстелик бар, анын аты менен аэропорт аталган.',
    category: 'Символ',
  },
];

const categories = ['Баары', 'Сан', 'Курулуш', 'Санарип', 'Таанылуу', 'Маданият', 'Инсандар', 'Дүйнө', 'Тарых', 'Символ'];

const quotes = [
  { text: 'Эл үчүн өлгөн өлбөйт.', src: 'Манас эпосунан' },
  { text: 'Баатырдын жүрөгү — темирден, акылы — алтындан.', src: 'Манас эпосунан' },
  { text: 'Кыргыз элинин жүрөгү — Манас.', src: 'Чыңгыз Айтматов' },
  { text: 'Аккула учса — асманда, жүгүрсө — жерде жок.', src: 'Манас эпосунан' },
];

export default function Facts({ }) {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Баары');

  const filtered = activeCategory === 'Баары'
    ? facts
    : facts.filter(f => f.category === activeCategory);

  return (
    <main className="inner-page">
      {/* Hero banner */}
      <section className="inner-page__hero inner-page__hero--facts">
        <div className="inner-page__hero-overlay" />
        <div className="inner-page__hero-content">
          <span className="inner-page__breadcrumb" onClick={() => navigate('/')}>
            ← Башкы бет
          </span>
          <h1 className="inner-page__hero-title">Кызыктуу маалыматтар</h1>
          <p className="inner-page__hero-sub">
            Манас эпосу жөнүндө таң калыштуу фактылар, цитаталар жана сандар
          </p>
        </div>
      </section>

      {/* Stats row */}
      <section className="inner-page__section inner-page__section--dark">
        <div className="inner-page__container">
          <div className="facts-stats">
            {[
              { num: '500K+', label: 'ыр сабы' },
              { num: '1000+', label: 'жыл тарых' },
              { num: '40+', label: 'тилге которулган' },
              { num: '70+', label: 'манасчы бар' },
            ].map((s, i) => (
              <div className="facts-stat" key={i}>
                <span className="facts-stat__num">{s.num}</span>
                <span className="facts-stat__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter + Facts */}
      <section className="inner-page__section">
        <div className="inner-page__container">
          <div className="facts-filter">
            {categories.map(cat => (
              <button
                key={cat}
                className={`facts-filter__btn ${activeCategory === cat ? 'facts-filter__btn--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="facts-grid">
            {filtered.map((fact, i) => (
              <div className="fact-card" key={i}>
                <div className="fact-card__num">{fact.num}</div>
                <span className="fact-card__category">{fact.category}</span>
                <h3 className="fact-card__title">{fact.title}</h3>
                <p className="fact-card__text">{fact.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quotes */}
      <section className="inner-page__section inner-page__section--dark">
        <div className="inner-page__container">
          <h2 className="inner-page__section-title">Цитаталар</h2>
          <div className="quotes-grid">
            {quotes.map((q, i) => (
              <div className="quote-card" key={i}>
                <svg width="24" height="20" viewBox="0 0 24 20" fill="none" style={{marginBottom: 12}}>
                  <path d="M0 20 L0 10 Q0 0 10 0 L10 4 Q4 4 4 10 L8 10 L8 20 Z" fill="#c9a84c" opacity="0.4"/>
                  <path d="M14 20 L14 10 Q14 0 24 0 L24 4 Q18 4 18 10 L22 10 L22 20 Z" fill="#c9a84c" opacity="0.4"/>
                </svg>
                <p>{q.text}</p>
                <cite>— {q.src}</cite>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
