import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Shop.css';

const CATEGORIES = ['Баары', 'Китептер', 'Сувенирлер', 'Кийим', 'Музыка'];
const CATEGORIES_RU = ['Все', 'Книги', 'Сувениры', 'Одежда', 'Музыка'];
const SORT_OPTIONS = [
  { value: 'default', ky: 'Демейки', ru: 'По умолчанию' },
  { value: 'price_asc', ky: 'Баа: арзан', ru: 'Цена: дешевле' },
  { value: 'price_desc', ky: 'Баа: кымбат', ru: 'Цена: дороже' },
  { value: 'rating', ky: 'Рейтинг', ru: 'Рейтинг' },
];
const PER_PAGE = 6;

function StarRating({ value, onChange, readonly = false }) {
  return (
    <div className="stars" style={{ cursor: readonly ? 'default' : 'pointer' }}>
      {[1,2,3,4,5].map(n => (
        <span
          key={n}
          className={n <= Math.round(value) ? 'star star--on' : 'star'}
          onClick={() => !readonly && onChange && onChange(n)}
        >★</span>
      ))}
    </div>
  );
}

function ProductSVG({ type }) {
  const colors = { book: '#3a2a10', book2: '#1a2a3a', book3: '#1a3a2a', book4: '#2a1a3a', souvenir: '#2a1a10', horse: '#1a2010', cloth: '#3a1a1a', poster: '#1a1a3a', ornament: '#2a2a10', mug: '#1a3a3a', music: '#2a1a2a', scarf: '#3a1a2a' };
  const bg = colors[type] || '#1a1510';
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 160" fill="none">
      <rect width="200" height="160" fill={bg}/>
      <rect x="0" y="0" width="200" height="160" fill="url(#prodGrad)"/>
      {type?.startsWith('book') ? (
        <>
          <rect x="55" y="20" width="90" height="120" rx="4" fill="#c9a84c" opacity="0.15"/>
          <rect x="60" y="25" width="80" height="110" rx="3" fill="#c9a84c" opacity="0.1"/>
          <rect x="68" y="35" width="64" height="6" rx="2" fill="#c9a84c" opacity="0.5"/>
          <rect x="68" y="50" width="50" height="3" rx="1" fill="#c9a84c" opacity="0.25"/>
          <rect x="68" y="60" width="58" height="3" rx="1" fill="#c9a84c" opacity="0.25"/>
          <rect x="68" y="70" width="45" height="3" rx="1" fill="#c9a84c" opacity="0.25"/>
          <line x1="55" y1="20" x2="55" y2="140" stroke="#c9a84c" strokeWidth="4" opacity="0.3"/>
        </>
      ) : type === 'horse' ? (
        <>
          <ellipse cx="115" cy="105" rx="50" ry="20" fill="#c9a84c" opacity="0.15"/>
          <path d="M75 112 Q90 85 105 80 Q122 76 135 86 Q148 96 145 110 Q138 120 120 123 Q98 126 82 117 Z" fill="#c9a84c" opacity="0.2"/>
          <path d="M135 87 Q148 78 155 84 Q158 90 152 95 Q144 97 137 90Z" fill="#c9a84c" opacity="0.18"/>
          <line x1="82" y1="123" x2="78" y2="142" stroke="#c9a84c" strokeWidth="5" strokeLinecap="round" opacity="0.3"/>
          <line x1="100" y1="126" x2="98" y2="144" stroke="#c9a84c" strokeWidth="5" strokeLinecap="round" opacity="0.3"/>
          <line x1="122" y1="124" x2="120" y2="142" stroke="#c9a84c" strokeWidth="5" strokeLinecap="round" opacity="0.3"/>
        </>
      ) : type === 'cloth' || type === 'scarf' ? (
        <>
          <path d="M70 40 L100 30 L130 40 L140 130 L60 130Z" fill="#c9a84c" opacity="0.12"/>
          <path d="M85 40 Q100 35 115 40" stroke="#c9a84c" strokeWidth="2" fill="none" opacity="0.4"/>
          {[55,70,85,100].map((y,i)=><rect key={i} x="70" y={y} width="60" height="2" rx="1" fill="#c9a84c" opacity="0.15"/>)}
        </>
      ) : (
        <>
          <circle cx="100" cy="80" r="40" fill="#c9a84c" opacity="0.1"/>
          <path d="M100 50 L104 67 L122 67 L108 77 L113 94 L100 84 L87 94 L92 77 L78 67 L96 67 Z" fill="#c9a84c" opacity="0.35"/>
        </>
      )}
      <defs>
        <linearGradient id="prodGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(0,0,0,0)" />
          <stop offset="1" stopColor="rgba(0,0,0,0.4)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Shop() {
  const navigate = useNavigate();
  const { products, productsLoading, productsError, addToCart, toggleFavorite, isFavorite, lang } = useApp();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Баары');
  const [sort, setSort] = useState('default');
  const [page, setPage] = useState(1);
  const [addedId, setAddedId] = useState(null);

  const ky = lang === 'ky';

  const cats = ky ? CATEGORIES : CATEGORIES_RU;
  const catMap = Object.fromEntries(CATEGORIES.map((k, i) => [k, CATEGORIES_RU[i]]));

  const filtered = useMemo(() => {
    let list = [...products];
    const catKy = ky ? category : (CATEGORIES[CATEGORIES_RU.indexOf(category)] || 'Баары');
    if (catKy !== 'Баары') list = list.filter(p => p.category === catKy);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.titleRu?.toLowerCase().includes(q)
      );
    }
    if (sort === 'price_asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price_desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [products, category, search, sort, ky]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleAddCart = (p) => {
    addToCart(p);
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const T = (ky, ru) => lang === 'ky' ? ky : ru;

  return (
    <main className="shop-page">
      {/* Banner */}
      <section className="shop-banner">
        <div className="shop-banner__content">
          <span className="inner-page__breadcrumb" onClick={() => navigate('/')}>
            ← {T('Башкы бет', 'Главная')}
          </span>
          <h1>{T('Манас Дүкөнү', 'Магазин Манас')}</h1>
          <p>{T('Кыргыз маданиятынын сымбаттары', 'Символы кыргызской культуры')}</p>
        </div>
      </section>

      <div className="shop-body">
        {/* Sidebar */}
        <aside className="shop-sidebar">
          <h3>{T('Категориялар', 'Категории')}</h3>
          {cats.map((cat, i) => {
            const kycat = CATEGORIES[i];
            const active = ky ? category === kycat : category === cat;
            return (
              <button
                key={cat}
                className={`shop-cat-btn ${active ? 'active' : ''}`}
                onClick={() => { setCategory(ky ? kycat : cat); setPage(1); }}
              >
                {cat}
                <span className="shop-cat-count">
                  {kycat === 'Баары'
                    ? products.length
                    : products.filter(p => p.category === kycat).length}
                </span>
              </button>
            );
          })}

          <h3 style={{marginTop: 28}}>{T('Иреттөө', 'Сортировка')}</h3>
          {SORT_OPTIONS.map(opt => (
            <button
              key={opt.value}
              className={`shop-cat-btn ${sort === opt.value ? 'active' : ''}`}
              onClick={() => { setSort(opt.value); setPage(1); }}
            >
              {ky ? opt.ky : opt.ru}
            </button>
          ))}
        </aside>

        {/* Main */}
        <div className="shop-main">
          {/* Search */}
          <div className="shop-search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder={T('Издөө...', 'Поиск...')}
            />
            {search && <button className="shop-search__clear" onClick={() => setSearch('')}>✕</button>}
          </div>

          <p className="shop-count">
            {T(`${filtered.length} товар табылды`, `Найдено: ${filtered.length} товаров`)}
          </p>

          {/* Загрузка / ошибка */}
          {productsLoading && (
            <div className="shop-skeleton">
              {Array.from({ length: 6 }).map((_, i) => (
                <div className="shop-skeleton__card" key={i}>
                  <div className="shop-skeleton__img" />
                  <div className="shop-skeleton__line" />
                  <div className="shop-skeleton__line shop-skeleton__line--short" />
                </div>
              ))}
            </div>
          )}

          {productsError && (
            <div className="shop-error">
              ⚠ {T('Маалыматтарды жүктөө ката кетти', 'Ошибка загрузки данных')}: {productsError}
            </div>
          )}

          {!productsLoading && !productsError && paginated.length === 0 && (
            <div className="shop-empty">
              <p>{T('Товар табылган жок', 'Товаров не найдено')}</p>
            </div>
          )}

          {!productsLoading && !productsError && paginated.length > 0 && (
            <div className="shop-grid">
              {paginated.map(product => (
                <div className="product-card" key={product.id}>
                  <div
                    className="product-card__img"
                    onClick={() => navigate(`/shop/${product.id}`)}
                  >
                    <ProductSVG type={product.image} />
                    <button
                      className={`product-card__fav ${isFavorite(product.id) ? 'active' : ''}`}
                      onClick={e => { e.stopPropagation(); toggleFavorite(product); }}
                      title={T('Тандамалга', 'В избранное')}
                    >♥</button>
                    {product.stock < 5 && (
                      <span className="product-card__badge">
                        {T('Аз калды', 'Мало')}
                      </span>
                    )}
                  </div>
                  <div className="product-card__body">
                    <span className="product-card__cat">{ky ? product.category : catMap[product.category]}</span>
                    <h3
                      className="product-card__title"
                      onClick={() => navigate(`/shop/${product.id}`)}
                    >
                      {ky ? product.title : (product.titleRu || product.title)}
                    </h3>
                    <div className="product-card__rating">
                      <StarRating value={product.rating} readonly />
                      <span>{product.rating.toFixed(1)}</span>
                      <span className="product-card__reviews">({product.reviews})</span>
                    </div>
                    <div className="product-card__footer">
                      <span className="product-card__price">{product.price} {T('сом', 'сом')}</span>
                      <button
                        className={`product-card__add ${addedId === product.id ? 'added' : ''}`}
                        onClick={() => handleAddCart(product)}
                      >
                        {addedId === product.id ? '✓' : '+'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="shop-pagination">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>←</button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={page === i + 1 ? 'active' : ''}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>→</button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
