import React from 'react';
import { useNavigate } from 'react-router-dom';
import { t } from '../i18n/translations';
import HomeCardImage from './HomeCardImage';

const CARDS = [
  { id:1, titleKey:'card_history', descKey:'card_history_desc', image:'history', page:'history' },
  { id:2, titleKey:'card_heroes',  descKey:'card_heroes_desc',  image:'heroes',  page:'heroes'  },
  { id:3, titleKey:'card_horse',   descKey:'card_horse_desc',   image:'horse',   page:'horse'   },
  { id:4, titleKey:'card_facts',   descKey:'card_facts_desc',   image:'facts',   page:'facts'   },
];

export default function HomeCards({ lang }) {
  const navigate = useNavigate();
  return (
    <section className="cards-section">
      <div className="cards-section__grid">
        {CARDS.map(card => (
          <div className="card" key={card.id}
            onClick={() => navigate(`/${card.page}`)}
            role="button" tabIndex={0}
            onKeyDown={e => e.key==='Enter' && navigate(`/${card.page}`)}
            style={{cursor:'pointer'}}>
            <div className="card__image"><HomeCardImage type={card.image}/></div>
            <div className="card__body">
              <h3 className="card__title">{t(card.titleKey, lang)}</h3>
              <p  className="card__desc">{t(card.descKey, lang)}</p>
              <span className="card__link">{t('more', lang)} →</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
