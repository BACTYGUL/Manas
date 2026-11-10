import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { t } from '../i18n/translations';
import InnerPageHero from '../components/InnerPageHero';
import './InnerPage.css';

const FACTS = [
  { num:'01', titleKey:'f1_title', textKey:'f1_text', catKey:'fcat_num' },
  { num:'02', titleKey:'f2_title', textKey:'f2_text', catKey:'fcat_struct' },
  { num:'03', titleKey:'f3_title', textKey:'f3_text', catKey:'fcat_numeric' },
  { num:'04', titleKey:'f4_title', textKey:'f4_text', catKey:'fcat_recog' },
  { num:'05', titleKey:'f5_title', textKey:'f5_text', catKey:'fcat_culture' },
  { num:'06', titleKey:'f6_title', textKey:'f6_text', catKey:'fcat_people' },
  { num:'07', titleKey:'f7_title', textKey:'f7_text', catKey:'fcat_world' },
  { num:'09', titleKey:'f9_title', textKey:'f9_text', catKey:'fcat_symbol' },
];
const CAT_KEYS = ['fcat_all','fcat_num','fcat_struct','fcat_numeric','fcat_recog','fcat_culture','fcat_people','fcat_world','fcat_history','fcat_symbol'];
const QUOTES = [
  { textKey:'fq1_text', srcKey:'fq1_src' },
  { textKey:'fq2_text', srcKey:'fq2_src' },
  { textKey:'fq3_text', srcKey:'fq3_src' },
  { textKey:'fq4_text', srcKey:'fq4_src' },
];

export default function Facts() {
  const { lang } = useApp();
  const [activeCat, setActiveCat] = useState('fcat_all');

  const filtered = activeCat === 'fcat_all'
    ? FACTS
    : FACTS.filter(f => f.catKey === activeCat);

  return (
    <main className="inner-page">
      <InnerPageHero variant="facts" lang={lang}
        title={t('facts_title', lang)} subtitle={t('facts_sub', lang)}/>

      <section className="inner-page__section inner-page__section--dark">
        <div className="inner-page__container">
          <div className="facts-stats">
            {[
              { num:'500K+', key:'stat_verses_short' },
              { num:'1000+', key:'stat_history_short' },
              { num:'40+',   key:'stat_languages_short' },
              { num:'70+',   key:'stat_manaschi' },
            ].map(s => (
              <div className="facts-stat" key={s.key}>
                <span className="facts-stat__num">{s.num}</span>
                <span className="facts-stat__label">{t(s.key, lang)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="inner-page__section">
        <div className="inner-page__container">
          <div className="facts-filter">
            {CAT_KEYS.map(ck => (
              <button key={ck}
                className={`facts-filter__btn ${activeCat===ck ? 'facts-filter__btn--active' : ''}`}
                onClick={() => setActiveCat(ck)}>
                {t(ck, lang)}
              </button>
            ))}
          </div>
          <div className="facts-grid">
            {filtered.map(f => (
              <div className="fact-card" key={f.num}>
                <div className="fact-card__num">{f.num}</div>
                <span className="fact-card__category">{t(f.catKey, lang)}</span>
                <h3 className="fact-card__title">{t(f.titleKey, lang)}</h3>
                <p className="fact-card__text">{t(f.textKey, lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="inner-page__section inner-page__section--dark">
        <div className="inner-page__container">
          <h2 className="inner-page__section-title">{t('facts_quotes_title', lang)}</h2>
          <div className="quotes-grid">
            {QUOTES.map(q => (
              <div className="quote-card" key={q.textKey}>
                <svg width="24" height="20" viewBox="0 0 24 20" fill="none" style={{marginBottom:12}}>
                  <path d="M0 20 L0 10 Q0 0 10 0 L10 4 Q4 4 4 10 L8 10 L8 20 Z" fill="#c9a84c" opacity="0.4"/>
                  <path d="M14 20 L14 10 Q14 0 24 0 L24 4 Q18 4 18 10 L22 10 L22 20 Z" fill="#c9a84c" opacity="0.4"/>
                </svg>
                <p>{t(q.textKey, lang)}</p>
                <cite>— {t(q.srcKey, lang)}</cite>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
