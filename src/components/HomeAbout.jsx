import React from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from '../i18n/translations';

export default function HomeAbout({ lang }) {
  const navigate = useNavigate();
  return (
    <section className="about-section" id="about">
      <div className="about-section__inner">
        <div className="about-section__text">
          <h2 className="about-section__title">{t('about_title', lang)}</h2>
          <p  className="about-section__body">{t('about_text', lang)}</p>
          <a href="#" className="about-section__btn"
            onClick={e => { e.preventDefault(); navigate('/history'); }}>
            {t('about_btn', lang)} →
          </a>
        </div>
        <div className="about-section__quote">
          <p className="about-section__quote-text">{t('about_quote', lang)}</p>
          <div className="about-section__quote-decor">
            <svg width="40" height="4" viewBox="0 0 40 4"><rect width="40" height="4" rx="2" fill="#c9a84c" opacity="0.6"/></svg>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2 L11.5 7.5 L17 7.5 L12.5 11 L14 16.5 L10 13.5 L6 16.5 L7.5 11 L3 7.5 L8.5 7.5 Z" fill="#c9a84c" opacity="0.7"/>
            </svg>
            <svg width="40" height="4" viewBox="0 0 40 4"><rect width="40" height="4" rx="2" fill="#c9a84c" opacity="0.6"/></svg>
          </div>
        </div>
        <div className="about-section__illustration">
          <svg width="100%" height="100%" viewBox="0 0 400 300" fill="none">
            <path d="M0 220 L80 100 L160 200 L220 80 L300 180 L380 60 L400 130 L400 300 L0 300Z" fill="#c8bfaa" opacity="0.07"/>
            <path d="M0 240 L80 100 L160 200 L220 80 L300 180 L380 60 L400 130" stroke="#c8bfaa" strokeWidth="1.5" fill="none" opacity="0.2"/>
            <g transform="translate(220,60)" opacity="0.2" stroke="#c8bfaa" strokeWidth="1.5" fill="none">
              <ellipse cx="70" cy="150" rx="60" ry="22" fill="#c8bfaa" fillOpacity="0.2"/>
              <path d="M25 162 Q40 128 60 120 Q82 114 100 124 Q118 136 114 154 Q105 165 85 168 Q60 171 42 163 Q28 157 25 162Z"/>
              <path d="M100 124 Q120 112 130 120 Q134 128 126 135 Q116 138 103 128Z"/>
              <ellipse cx="90" cy="78" rx="14" ry="15"/>
              <rect x="76" y="92" width="28" height="38" rx="4"/>
              <path d="M78 94 Q60 124 58 156" strokeWidth="7" strokeLinecap="round"/>
              <line x1="116" y1="40" x2="120" y2="170" strokeWidth="2.5"/>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
