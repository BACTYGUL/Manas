import React from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from '../i18n/translations';
import './WelcomeBlock.css';

export default function WelcomeBlock({ lang }) {
  const navigate = useNavigate();
  return (
    <section className="welcome-block">
      <div className="welcome-block__inner">
        <div className="welcome-block__ornament">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="30" r="28" stroke="#c9a84c" strokeWidth="1.5" opacity="0.4"/>
            <path d="M30 10 L32 22 L44 22 L35 30 L38 42 L30 35 L22 42 L25 30 L16 22 L28 22 Z" fill="#c9a84c" opacity="0.6"/>
          </svg>
        </div>
        <div className="welcome-block__text">
          <p className="welcome-block__tag">{t('welcome_tag', lang)}</p>
          <h1 className="welcome-block__greet">{t('welcome_greet', lang)}</h1>
          <h2 className="welcome-block__sub">{t('welcome_sub', lang)}</h2>
          <p className="welcome-block__desc">{t('welcome_desc', lang)}</p>
          <button className="welcome-block__btn" onClick={() => navigate('/shop')}>
            {t('welcome_btn', lang)}
          </button>
        </div>
        <div className="welcome-block__deco">
          <svg viewBox="0 0 300 300" fill="none" width="100%" height="100%">
            <circle cx="150" cy="150" r="120" stroke="#c9a84c" strokeWidth="1" opacity="0.15"/>
            <circle cx="150" cy="150" r="80"  stroke="#c9a84c" strokeWidth="1" opacity="0.12"/>
            <path d="M150 30 L155 65 L190 65 L162 85 L172 120 L150 100 L128 120 L138 85 L110 65 L145 65 Z" fill="#c9a84c" opacity="0.25"/>
            <path d="M0 240 L60 150 L120 220 L180 130 L240 200 L300 110 L300 300 L0 300Z" fill="#c9a84c" opacity="0.05"/>
          </svg>
        </div>
      </div>
    </section>
  );
}
