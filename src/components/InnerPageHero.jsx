import React from 'react';
import Breadcrumb from './Breadcrumb';

/**
 * InnerPageHero — баннер для внутренних страниц (История, Персонажи, Конь, Факты).
 * @param {string} variant  — 'history' | 'heroes' | 'horse' | 'facts'
 * @param {string} title    — заголовок
 * @param {string} subtitle — подзаголовок
 * @param {string} lang     — текущий язык
 */
export default function InnerPageHero({ variant, title, subtitle, lang }) {
  return (
    <section className={`inner-page__hero inner-page__hero--${variant}`}>
      <div className="inner-page__hero-overlay"/>
      <div className="inner-page__hero-content">
        <Breadcrumb lang={lang}/>
        <h1 className="inner-page__hero-title">{title}</h1>
        {subtitle && <p className="inner-page__hero-sub">{subtitle}</p>}
      </div>
    </section>
  );
}
