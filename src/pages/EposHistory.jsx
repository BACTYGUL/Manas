import React from 'react';
import { useApp } from '../context/AppContext';
import { t } from '../i18n/translations';
import InnerPageHero from '../components/InnerPageHero';
import BigQuote from '../components/BigQuote';
import './InnerPage.css';

const TIMELINE = [
  { year_key:'tl_1_year', title_key:'tl_1_title', desc_key:'tl_1_desc' },
  { year_key:'tl_2_year', title_key:'tl_2_title', desc_key:'tl_2_desc' },
  { year_key:'tl_3_year', title_key:'tl_3_title', desc_key:'tl_3_desc' },
  { year_key:'tl_4_year', title_key:'tl_4_title', desc_key:'tl_4_desc' },
  { year_key:'tl_5_year', title_key:'tl_5_title', desc_key:'tl_5_desc' },
  { year_key:'tl_6_year', title_key:'tl_6_title', desc_key:'tl_6_desc' },
];

export default function EposHistory() {
  const { lang } = useApp();
  return (
    <main className="inner-page">
      <InnerPageHero variant="history" lang={lang}
        title={t('history_title', lang)} subtitle={t('history_sub', lang)}/>

      <section className="inner-page__section">
        <div className="inner-page__container">
          <div className="inner-page__intro">
            <div className="inner-page__intro-text">
              <h2>{t('history_what_title', lang)}</h2>
              <p>{t('history_p1', lang)}</p>
              <p>{t('history_p2', lang)}</p>
            </div>
            <div className="inner-page__intro-stat">
              {[
                { num:'500 000+', key:'stat_verses' },
                { num:'40+',      key:'stat_languages' },
                { num:'1000+',    key:'stat_history' },
              ].map(s => (
                <div className="stat-box" key={s.key}>
                  <span className="stat-box__num">{s.num}</span>
                  <span className="stat-box__label">{t(s.key, lang)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="inner-page__section inner-page__section--dark">
        <div className="inner-page__container">
          <h2 className="inner-page__section-title">{t('timeline_title', lang)}</h2>
          <div className="timeline">
            {TIMELINE.map((item, i) => (
              <div className="timeline__item" key={i}>
                <div className="timeline__year">{t(item.year_key, lang)}</div>
                <div className="timeline__dot"/>
                <div className="timeline__content">
                  <h3>{t(item.title_key, lang)}</h3>
                  <p>{t(item.desc_key, lang)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="inner-page__section inner-page__section--quote">
        <div className="inner-page__container">
          <BigQuote text={t('history_quote', lang)} cite={t('history_cite', lang)}/>
        </div>
      </section>
    </main>
  );
}
