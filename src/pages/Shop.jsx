import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { t, getProductTitle } from '../i18n/translations';
import StarRating from '../components/StarRating';
import ShopPagination from '../components/ShopPagination';
import ShopSidebar from '../components/ShopSidebar';
import MusicPlayer from '../components/MusicPlayer';
import './Shop.css';

const PER_PAGE = 9;

const CAT_MAP = {
  All:        'cat_all',
  Books:      'cat_books',
  Souvenirs:  'cat_souvenirs',
  Clothing:   'cat_clothes',
  Music:      'cat_music',
  Китептер:   'cat_books',
  Сувенирлер: 'cat_souvenirs',
  Кийим:      'cat_clothes',
  Музыка:     'cat_music',
};

// Возрастные группы для фильтра
const AGE_GROUPS = [
  { key: 'all',    ky: 'Баары',            ru: 'Все',          en: 'All ages',    min: 0,  max: 99 },
  { key: 'baby',   ky: '0–5 жаш',          ru: '0–5 лет',      en: '0–5 years',   min: 0,  max: 5  },
  { key: 'kids',   ky: '6–11 жаш',         ru: '6–11 лет',     en: '6–11 years',  min: 6,  max: 11 },
  { key: 'teen',   ky: '12–15 жаш',        ru: '12–15 лет',    en: '12–15 years', min: 12, max: 15 },
  { key: 'youth',  ky: '16+ жаш',          ru: '16+ лет',      en: '16+ years',   min: 16, max: 99 },
];

function BookImage({ product }) {
  const [imgErr, setImgErr] = useState(false);

  if (product.imageUrl && !imgErr) {
    return (
      <img
        src={product.imageUrl}
        alt={product.titleEn || product.title}
        className="product-img-real"
        onError={() => setImgErr(true)}
        loading="lazy"
      />
    );
  }

  // Fallback SVG
  const colors = {
    book: '#3a2a10', book2: '#1a2a3a', book3: '#1a3a2a', book4: '#2a1a3a',
    book5: '#3a1a2a', book6: '#2a3a1a',
    souvenir: '#2a1a10', horse: '#1a2010', cloth: '#3a1a1a',
    poster: '#1a1a3a', ornament: '#2a2a10', mug: '#1a3a3a',
    music: '#2a1a2a', scarf: '#3a1a2a',
  };
  const bg = colors[product.image] || '#1a1510';
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 160" fill="none">
      <rect width="200" height="160" fill={bg}/>
      {product.image?.startsWith('book') ? (
        <>
          <rect x="55" y="15" width="90" height="130" rx="4" fill="#c9a84c" opacity="0.15"/>
          <rect x="60" y="20" width="80" height="120" rx="3" fill="#c9a84c" opacity="0.1"/>
          <rect x="68" y="32" width="64" height="7" rx="2" fill="#c9a84c" opacity="0.5"/>
          <rect x="68" y="48" width="50" height="3" rx="1" fill="#c9a84c" opacity="0.25"/>
          <rect x="68" y="58" width="58" height="3" rx="1" fill="#c9a84c" opacity="0.25"/>
          <rect x="68" y="68" width="45" height="3" rx="1" fill="#c9a84c" opacity="0.25"/>
          <line x1="55" y1="15" x2="55" y2="145" stroke="#c9a84c" strokeWidth="4" opacity="0.3"/>
        </>
      ) : (
        <>
          <circle cx="100" cy="80" r="40" fill="#c9a84c" opacity="0.1"/>
          <path d="M100 50 L104 67 L122 67 L108 77 L113 94 L100 84 L87 94 L92 77 L78 67 L96 67 Z" fill="#c9a84c" opacity="0.35"/>
        </>
      )}
      <defs>
        <linearGradient id={`pg_${product.id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(0,0,0,0)"/>
          <stop offset="1" stopColor="rgba(0,0,0,0.45)"/>
        </linearGradient>
      </defs>
      <rect width="200" height="160" fill={`url(#pg_${product.id})`}/>
    </svg>
  );
}

export default function Shop() {
  const navigate = useNavigate();
  const {
    products, productsLoading, productsError,
    addToCart, toggleFavorite, isFavorite, lang,
  } = useApp();

  const [search,    setSearch]    = useState('');
  const [category,  setCategory]  = useState('Баары');
  const [sort,      setSort]      = useState('default');
  const [ageKey,    setAgeKey]    = useState('all');
  const [page,      setPage]      = useState(1);
  const [addedId,   setAddedId]   = useState(null);
  const [nowPlaying, setNowPlaying] = useState(null); // { src, title }

  const ageGroup = AGE_GROUPS.find(g => g.key === ageKey) || AGE_GROUPS[0];

  const filtered = useMemo(() => {
    let list = [...products];

    // Категория
    if (category !== 'Баары') {
      list = list.filter(p => p.category === category);
    }

    // Поиск
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        (p.title   || '').toLowerCase().includes(q) ||
        (p.titleRu || '').toLowerCase().includes(q) ||
        (p.titleEn || '').toLowerCase().includes(q)
      );
    }

    // Возраст — только если выбрана не «Все»
    if (ageKey !== 'all') {
      list = list.filter(p => {
        const min = Number(p.ageMin ?? 0);
        return min >= ageGroup.min && min <= ageGroup.max;
      });
    }

    // Сортировка
    if (sort === 'price_asc')  list.sort((a, b) => a.price - b.price);
    if (sort === 'price_desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'rating')     list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [products, category, search, sort, ageKey, ageGroup]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleAddCart = p => {
    addToCart(p);
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const getTitle = p => getProductTitle(p, lang);

  return (
    <main className="shop-page">
      {/* Банер */}
      <section className="shop-banner">
        <div className="shop-banner__content">
          <h1>{t('shop_title', lang)}</h1>
          <p>{t('shop_subtitle', lang)}</p>
        </div>
      </section>

      <div className="shop-body">
        {/* Боковая панель */}
        <ShopSidebar
          lang={lang}
          products={products}
          category={category}
          sort={sort}
          onCategory={cat => { setCategory(cat); setPage(1); }}
          onSort={s => { setSort(s); setPage(1); }}
        />

        {/* Основное */}
        <div className="shop-main">

          {/* Поиск */}
          <div className="shop-search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder={t('shop_search', lang)}
            />
            {search && (
              <button className="shop-search__clear" onClick={() => { setSearch(''); setPage(1); }}>✕</button>
            )}
          </div>

          {/* Фильтр по возрасту */}
          <div className="age-filter">
            <span className="age-filter__label">
              {t('age_label', lang)}
            </span>
            {AGE_GROUPS.map(g => (
              <button
                key={g.key}
                className={`age-filter__btn ${ageKey === g.key ? 'active' : ''}`}
                onClick={() => { setAgeKey(g.key); setPage(1); }}
              >
                {g[lang] || g.en}
              </button>
            ))}
          </div>

          {/* Счётчик */}
          <p className="shop-count">
            {t('shop_found_pre', lang)}{filtered.length}{t('shop_found_post', lang)}
          </p>

          {/* Скелетон загрузки */}
          {productsLoading && (
            <div className="shop-skeleton">
              {Array.from({ length: 6 }).map((_, i) => (
                <div className="shop-skeleton__card" key={i}>
                  <div className="shop-skeleton__img"/>
                  <div className="shop-skeleton__line"/>
                  <div className="shop-skeleton__line shop-skeleton__line--short"/>
                </div>
              ))}
            </div>
          )}

          {productsError && (
            <div className="shop-error">⚠ {t('shop_error', lang)}: {productsError}</div>
          )}

          {!productsLoading && !productsError && paginated.length === 0 && (
            <div className="shop-empty"><p>{t('shop_empty', lang)}</p></div>
          )}

          {!productsLoading && !productsError && paginated.length > 0 && (
            <div className={`shop-grid ${category === 'Музыка' ? 'shop-grid--music' : ''}`}>
              {paginated.map(product => {
                const isMusic = product.isMusic || product.category === 'Музыка';
                const isPlaying = nowPlaying?.id === product.id;

                return (
                  <div className={`product-card ${isMusic ? 'product-card--music' : ''} ${isPlaying ? 'product-card--playing' : ''}`} key={product.id}>
                    <div
                      className="product-card__img"
                      onClick={() => isMusic ? null : navigate(`/shop/${product.id}`)}
                      style={{ cursor: isMusic ? 'default' : 'pointer' }}
                    >
                      <BookImage product={product}/>

                      {/* Оверлей воспроизведения для музыки */}
                      {isMusic && (
                        <button
                          className={`music-play-overlay ${isPlaying ? 'playing' : ''}`}
                          onClick={e => {
                            e.stopPropagation();
                            if (isPlaying) {
                              setNowPlaying(null);
                            } else {
                              setNowPlaying({ id: product.id, src: product.audioUrl, title: getTitle(product) });
                            }
                          }}
                        >
                          {isPlaying ? '⏸' : '▶'}
                        </button>
                      )}

                      {!isMusic && (
                        <button
                          className={`product-card__fav ${isFavorite(product.id) ? 'active' : ''}`}
                          onClick={e => { e.stopPropagation(); toggleFavorite(product); }}
                          title={t('shop_fav', lang)}
                        >♥</button>
                      )}

                      {Number(product.stock) < 5 && !isMusic && (
                        <span className="product-card__badge">{t('shop_few', lang)}</span>
                      )}
                      {product.ageMin > 0 && !isMusic && (
                        <span className="product-card__age">{product.ageMin}+</span>
                      )}
                      {isMusic && product.duration && (
                        <span className="music-duration">🕐 {product.duration}</span>
                      )}
                    </div>

                    <div className="product-card__body">
                      <span className="product-card__cat">
                        {t(CAT_MAP[product.category] || 'cat_all', lang)}
                      </span>
                      <h3
                        className="product-card__title"
                        onClick={() => isMusic ? null : navigate(`/shop/${product.id}`)}
                        style={{ cursor: isMusic ? 'default' : 'pointer' }}
                      >
                        {getTitle(product)}
                      </h3>
                      <div className="product-card__rating">
                        <StarRating value={Number(product.rating) || 0} size={13}/>
                        <span>{Number(product.rating || 0).toFixed(1)}</span>
                        <span className="product-card__reviews">({product.reviews || 0})</span>
                      </div>
                      <div className="product-card__footer">
                        {isMusic ? (
                          <button
                            className={`music-listen-btn ${isPlaying ? 'playing' : ''}`}
                            onClick={() => {
                              if (isPlaying) setNowPlaying(null);
                              else setNowPlaying({ id: product.id, src: product.audioUrl, title: getTitle(product) });
                            }}
                          >
                            {isPlaying
                              ? (lang === 'en' ? '⏸ Pause' : lang === 'ru' ? '⏸ Пауза' : '⏸ Токтот')
                              : (lang === 'en' ? '▶ Listen' : lang === 'ru' ? '▶ Слушать' : '▶ Угу')
                            }
                          </button>
                        ) : (
                          <>
                            <span className="product-card__price">
                              {product.price} {t('som', lang)}
                            </span>
                            <button
                              className={`product-card__add ${addedId === product.id ? 'added' : ''}`}
                              onClick={() => handleAddCart(product)}
                            >
                              {addedId === product.id ? '✓' : '+'}
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <ShopPagination page={page} totalPages={totalPages} onPage={setPage}/>
        </div>
      </div>

      {/* Музыкальный плеер — фиксированный внизу */}
      {nowPlaying && (
        <MusicPlayer
          src={nowPlaying.src}
          title={nowPlaying.title}
          onClose={() => setNowPlaying(null)}
        />
      )}
    </main>
  );
}
