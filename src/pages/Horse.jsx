import React from 'react';
import { useApp } from '../context/AppContext';
import { t } from '../i18n/translations';
import InnerPageHero from '../components/InnerPageHero';
import BigQuote from '../components/BigQuote';
import './InnerPage.css';

const TRAITS = [
  { icon:'⚡', labelKey:'tr1_label', descKey:'tr1_desc' },
  { icon:'🛡️', labelKey:'tr2_label', descKey:'tr2_desc' },
  { icon:'🧠', labelKey:'tr3_label', descKey:'tr3_desc' },
  { icon:'✨', labelKey:'tr4_label', descKey:'tr4_desc' },
];
const LEGENDS = [
  { titleKey:'leg1_title', textKey:'leg1_text' },
  { titleKey:'leg2_title', textKey:'leg2_text' },
  { titleKey:'leg3_title', textKey:'leg3_text' },
  { titleKey:'leg4_title', textKey:'leg4_text' },
];

export default function Horse() {
  const { lang } = useApp();
  return (
    <main className="inner-page">
      <InnerPageHero variant="horse" lang={lang}
        title={t('horse_title', lang)} subtitle={t('horse_sub', lang)}/>

      <section className="inner-page__section">
        <div className="inner-page__container">
          <div className="horse-intro">
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
                <path d="M0 200 L80 100 L160 180 L220 80 L300 170 L380 60 L400 120 L400 300 L0 300Z" fill="#1a1510" opacity="0.8"/>
                <g transform="translate(60,80)">
                  <ellipse cx="145" cy="165" rx="90" ry="32" fill="#e8e2d8" opacity="0.9"/>
                  <path d="M55 178 Q80 128 115 118 Q150 110 180 128 Q210 146 205 172 Q192 188 165 192 Q128 196 98 183 Q68 172 55 178Z" fill="#f0ece4"/>
                  <path d="M180 128 Q208 112 222 122 Q228 132 218 140 Q205 144 185 132Z" fill="#e8e2d8"/>
                  <line x1="95" y1="188" x2="88" y2="225" stroke="#d8d2c8" strokeWidth="9" strokeLinecap="round"/>
                  <line x1="118" y1="194" x2="115" y2="230" stroke="#d8d2c8" strokeWidth="9" strokeLinecap="round"/>
                  <line x1="155" y1="193" x2="153" y2="228" stroke="#d8d2c8" strokeWidth="9" strokeLinecap="round"/>
                  <line x1="178" y1="187" x2="182" y2="224" stroke="#d8d2c8" strokeWidth="9" strokeLinecap="round"/>
                  <path d="M148 118 Q172 112 188 124" stroke="#c9a84c" strokeWidth="2.5" fill="none"/>
                  <circle cx="165" cy="115" r="5" fill="#c9a84c"/>
                </g>
              </svg>
            </div>
            <div className="horse-intro__text">
              <h2>{t('horse_about', lang)}</h2>
              <p>{t('horse_p1', lang)}</p>
              <p>{t('horse_p2', lang)}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="inner-page__section inner-page__section--dark">
        <div className="inner-page__container">
          <h2 className="inner-page__section-title">{t('horse_traits', lang)}</h2>
          <div className="traits-grid">
            {TRAITS.map(tr => (
              <div className="trait-card" key={tr.labelKey}>
                <span className="trait-card__icon">{tr.icon}</span>
                <h3>{t(tr.labelKey, lang)}</h3>
                <p>{t(tr.descKey, lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="inner-page__section">
        <div className="inner-page__container">
          <h2 className="inner-page__section-title">{t('horse_legends', lang)}</h2>
          <div className="legends-list">
            {LEGENDS.map((leg, i) => (
              <div className="legend-item" key={leg.titleKey}>
                <div className="legend-item__num">{String(i+1).padStart(2,'0')}</div>
                <div className="legend-item__body">
                  <h3>{t(leg.titleKey, lang)}</h3>
                  <p>{t(leg.textKey, lang)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="inner-page__section inner-page__section--quote">
        <div className="inner-page__container">
          <BigQuote text={t('horse_quote', lang)} cite={t('horse_cite', lang)}/>
        </div>
      </section>
    </main>
  );
}
