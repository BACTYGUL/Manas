import React from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from '../i18n/translations';

/**
 * Breadcrumb — хлебная крошка «← Башкы бет / Главная / Home».
 * @param {string} lang — текущий язык
 * @param {string} to   — куда переходить (default: '/')
 */
export default function Breadcrumb({ lang, to = '/' }) {
  const navigate = useNavigate();

  return (
    <span
      className="inner-page__breadcrumb"
      onClick={() => navigate(to)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && navigate(to)}
      style={{ cursor: 'pointer' }}
    >
      ← {t('breadcrumb_home', lang)}
    </span>
  );
}
