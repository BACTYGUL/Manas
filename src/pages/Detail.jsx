import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Detail.css';

function StarPicker({ value, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="star-picker">
      {[1,2,3,4,5].map(n => (
        <span
          key={n}
          className={n <= (hover || value) ? 'star star--on' : 'star'}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(n)}
        >★</span>
      ))}
    </div>
  );
}

export default function Detail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const productId = Number(id);
  const { products, addToCart, toggleFavorite, isFavorite, addReview, getReviews, user, lang } = useApp();

  const product = products.find(p => p.id === productId);
  const reviews = getReviews(productId);

  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, text: '' });
  const [reviewSent, setReviewSent] = useState(false);

  const T = (ky, ru) => lang === 'ky' ? ky : ru;

  if (!product) return (
    <main className="detail-page">
      <div className="inner-page__container" style={{ paddingTop: 120 }}>
        <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>
          {T('Товар табылган жок', 'Товар не найден')}
        </p>
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <button className="btn-gold" onClick={() => navigate('/shop')}>
            {T('Дүкөнгө кайтуу', 'Вернуться в магазин')}
          </button>
        </div>
      </div>
    </main>
  );

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : product.rating.toFixed(1);

  const handleAddCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleReview = (e) => {
    e.preventDefault();
    if (!reviewForm.text.trim()) return;
    addReview(productId, {
      user: user ? user.name : T('Мейман', 'Гость'),
      rating: reviewForm.rating,
      text: reviewForm.text,
    });
    setReviewForm({ rating: 5, text: '' });
    setReviewSent(true);
    setTimeout(() => setReviewSent(false), 2000);
  };

  const catMap = { 'Китептер': 'Книги', 'Сувенирлер': 'Сувениры', 'Кийим': 'Одежда', 'Музыка': 'Музыка' };

  return (
    <main className="detail-page">
      <div className="detail-container">
        <nav className="detail-breadcrumb">
          <span onClick={() => navigate('/')}>
            {T('Башкы бет', 'Главная')}
          </span>
          <span>›</span>
          <span onClick={() => navigate('/shop')}>
            {T('Дүкөн', 'Магазин')}
          </span>
          <span>›</span>
          <span>{T(product.title, product.titleRu || product.title)}</span>
        </nav>

        {/* Main block */}
        <div className="detail-main">
          {/* Image */}
          <div className="detail-image">
            <svg width="100%" height="100%" viewBox="0 0 400 320" fill="none">
              <rect width="400" height="320" fill="var(--bg-secondary)"/>
              {product.image?.startsWith('book') ? (
                <>
                  <rect x="100" y="30" width="200" height="260" rx="6" fill="#c9a84c" opacity="0.12"/>
                  <rect x="108" y="38" width="184" height="244" rx="4" fill="#c9a84c" opacity="0.08"/>
                  <rect x="124" y="60" width="152" height="12" rx="3" fill="#c9a84c" opacity="0.4"/>
                  <rect x="124" y="85" width="120" height="6" rx="2" fill="#c9a84c" opacity="0.2"/>
                  <rect x="124" y="100" width="140" height="6" rx="2" fill="#c9a84c" opacity="0.2"/>
                  <rect x="124" y="115" width="100" height="6" rx="2" fill="#c9a84c" opacity="0.2"/>
                  <rect x="124" y="130" width="135" height="6" rx="2" fill="#c9a84c" opacity="0.2"/>
                  <line x1="100" y1="30" x2="100" y2="290" stroke="#c9a84c" strokeWidth="6" opacity="0.25"/>
                </>
              ) : (
                <>
                  <circle cx="200" cy="160" r="80" fill="#c9a84c" opacity="0.08"/>
                  <path d="M200 100 L208 128 L238 128 L214 146 L222 174 L200 158 L178 174 L186 146 L162 128 L192 128 Z" fill="#c9a84c" opacity="0.3"/>
                </>
              )}
            </svg>
            <button
              className={`detail-fav ${isFavorite(product.id) ? 'active' : ''}`}
              onClick={() => toggleFavorite(product)}
            >
              ♥ {T('Тандамал', 'Избранное')}
            </button>
          </div>

          {/* Info */}
          <div className="detail-info">
            <span className="detail-cat">
              {T(product.category, catMap[product.category] || product.category)}
            </span>
            <h1 className="detail-title">
              {T(product.title, product.titleRu || product.title)}
            </h1>

            <div className="detail-rating">
              <div className="stars">
                {[1,2,3,4,5].map(n => (
                  <span key={n} className={n <= Math.round(parseFloat(avgRating)) ? 'star star--on' : 'star'}>★</span>
                ))}
              </div>
              <span className="detail-rating__val">{avgRating}</span>
              <span className="detail-rating__count">
                ({reviews.length || product.reviews} {T('пикир', 'отзывов')})
              </span>
            </div>

            <p className="detail-desc">
              {T(product.desc, product.descRu || product.desc)}
            </p>

            <div className="detail-stock">
              {product.stock > 0 ? (
                <span className="in-stock">✓ {T('Барда бар', 'В наличии')} ({product.stock} {T('даана', 'шт.')})</span>
              ) : (
                <span className="out-stock">✕ {T('Жок', 'Нет в наличии')}</span>
              )}
            </div>

            <div className="detail-price">{product.price} {T('сом', 'сом')}</div>

            <div className="detail-qty">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => Math.min(product.stock, q + 1))}>+</button>
            </div>

            <div className="detail-actions">
              <button
                className={`btn-gold detail-cart-btn ${added ? 'added' : ''}`}
                onClick={handleAddCart}
                disabled={product.stock === 0}
              >
                {added
                  ? `✓ ${T('Кошулду!', 'Добавлено!')}`
                  : T('Корзинага кошуу', 'В корзину')}
              </button>
              <button className="btn-outline" onClick={() => navigate('/shop')}>
                {T('← Артка', '← Назад')}
              </button>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <section className="detail-reviews">
          <h2>{T('Пикирлер', 'Отзывы')} ({reviews.length})</h2>

          {/* Review form */}
          <form className="review-form" onSubmit={handleReview}>
            <h3>{T('Пикир калтыруу', 'Оставить отзыв')}</h3>
            <StarPicker
              value={reviewForm.rating}
              onChange={r => setReviewForm(f => ({ ...f, rating: r }))}
            />
            <textarea
              value={reviewForm.text}
              onChange={e => setReviewForm(f => ({ ...f, text: e.target.value }))}
              placeholder={T('Пикириңизди жазыңыз...', 'Напишите ваш отзыв...')}
              rows={3}
              required
            />
            {reviewSent && <p className="review-success">{T('Пикириңиз кошулду!', 'Отзыв добавлен!')}</p>}
            <button type="submit" className="btn-gold">
              {T('Жөнөтүү', 'Отправить')}
            </button>
          </form>

          {/* Review list */}
          <div className="review-list">
            {reviews.length === 0 ? (
              <p className="review-empty">
                {T('Азырынча пикир жок', 'Отзывов пока нет')}
              </p>
            ) : (
              reviews.map(r => (
                <div className="review-item" key={r.id}>
                  <div className="review-item__header">
                    <div className="review-avatar">{r.user[0]?.toUpperCase()}</div>
                    <div>
                      <strong>{r.user}</strong>
                      <span className="review-date">{r.date}</span>
                    </div>
                    <div className="stars" style={{ marginLeft: 'auto' }}>
                      {[1,2,3,4,5].map(n => (
                        <span key={n} className={n <= r.rating ? 'star star--on' : 'star'}>★</span>
                      ))}
                    </div>
                  </div>
                  <p className="review-text">{r.text}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
