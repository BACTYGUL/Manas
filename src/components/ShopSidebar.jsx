import React from 'react';
import { t } from '../i18n/translations';

// value — реальное значение category в API (кыргызский ключ)
const CAT_KEYS = [
  { value: 'Баары',      key: 'cat_all' },
  { value: 'Китептер',   key: 'cat_books' },
  { value: 'Сувенирлер', key: 'cat_souvenirs' },
  { value: 'Кийим',      key: 'cat_clothes' },
  { value: 'Музыка',     key: 'cat_music' },
];

const SORT_OPTS = [
  { value: 'default',    key: 'sort_default' },
  { value: 'price_asc',  key: 'sort_cheap' },
  { value: 'price_desc', key: 'sort_expensive' },
  { value: 'rating',     key: 'sort_rating' },
];

export default function ShopSidebar({ lang, products, category, sort, onCategory, onSort }) {
  return (
    <aside className="shop-sidebar">
      <h3>{t('categories', lang)}</h3>
      {CAT_KEYS.map(c => (
        <button key={c.value}
          className={`shop-cat-btn ${category === c.value ? 'active' : ''}`}
          onClick={() => onCategory(c.value)}>
          {t(c.key, lang)}
          <span className="shop-cat-count">
            {c.value === 'Баары'
              ? products.length
              : products.filter(p => p.category === c.value).length}
          </span>
        </button>
      ))}
      <h3 style={{ marginTop: 28 }}>{t('sorting', lang)}</h3>
      {SORT_OPTS.map(o => (
        <button key={o.value}
          className={`shop-cat-btn ${sort === o.value ? 'active' : ''}`}
          onClick={() => onSort(o.value)}>
          {t(o.key, lang)}
        </button>
      ))}
    </aside>
  );
}
