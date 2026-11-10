import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { t } from '../i18n/translations';
import StarRating from '../components/StarRating';
import './Reviews.css';

export default function Reviews() {
  const navigate = useNavigate();
  const { products, getReviews, addReview, deleteReview, user, lang } = useApp();

  const [filterProduct, setFilterProduct] = useState('all');
  const [form,     setForm]     = useState({ name: '', rating: 5, text: '' });
  const [sent,     setSent]     = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [hover,    setHover]    = useState(0);

  /* ── Собираем все отзывы из всех товаров ── */
  const allReviews = useMemo(() => {
    const list = [];
    products.forEach(p => {
      const revs = getReviews(p.id);
      const title = lang === 'ru' ? (p.titleRu || p.title)
                  : lang === 'en' ? (p.titleEn || p.titleRu || p.title)
                  : p.title;
      revs.forEach(r => list.push({ ...r, productTitle: title, productId: p.id }));
    });
    return list.sort((a, b) =>
      new Date(b.createdAt || b.date || 0) - new Date(a.createdAt || a.date || 0)
    );
  }, [products, getReviews, lang]);

  /* ── Отфильтрованные ── */
  const filtered = filterProduct === 'all'
    ? allReviews
    : allReviews.filter(r => String(r.productId) === filterProduct);

  /* ── Список книг/товаров у которых есть отзывы ── */
  const productsWithReviews = useMemo(() => {
    const seen = new Set();
    return allReviews
      .filter(r => { if (seen.has(r.productId)) return false; seen.add(r.productId); return true; })
      .map(r => ({ id: r.productId, title: r.productTitle }));
  }, [allReviews]);

  /* ── Отправка отзыва ── */
  const handleSubmit = e => {
    e.preventDefault();
    if (!form.text.trim()) return;
    // Если фильтр стоит на конкретном товаре — оставляем отзыв к нему, иначе к первому в магазине
    const targetId = filterProduct !== 'all' ? filterProduct
      : (products.find(p => p.category === 'Китептер')?.id || products[0]?.id);
    if (!targetId) return;
    addReview(targetId, {
      userId:   user?.id   || null,
      userName: user?.name || form.name || t('guest', lang),
      rating:   form.rating,
      text:     form.text.trim(),
    });
    setForm({ name: '', rating: 5, text: '' });
    setSent(true);
    setTimeout(() => setSent(false), 2500);
  };

  const canDelete = r =>
    user?.role === 'admin' || (user && String(r.userId) === String(user?.id));

  /* ── Средний рейтинг ── */
  const avgRating = allReviews.length
    ? (allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length).toFixed(1)
    : '—';

  const lbl = {
    title:      { ky: 'Бардык пикирлер',       ru: 'Все отзывы',        en: 'All Reviews' },
    sub:        { ky: 'Сайт жөнүндө пикирлер', ru: 'Отзывы о сайте',    en: 'Site reviews' },
    filter_all: { ky: 'Баары',                  ru: 'Все',               en: 'All' },
    filter_lbl: { ky: 'Китеп боюнча:',          ru: 'По книге:',         en: 'By book:' },
    leave:      { ky: 'Пикир калтыруу',         ru: 'Оставить отзыв',    en: 'Leave a review' },
    name_ph:    { ky: 'Атыңыз',                 ru: 'Ваше имя',          en: 'Your name' },
    text_ph:    { ky: 'Пикириңизди жазыңыз...', ru: 'Напишите отзыв...', en: 'Write your review...' },
    send:       { ky: 'Жөнөтүү',               ru: 'Отправить',         en: 'Submit' },
    sent_ok:    { ky: 'Пикириңиз кошулду!',     ru: 'Отзыв добавлен!',   en: 'Review added!' },
    empty:      { ky: 'Азырынча пикир жок',     ru: 'Отзывов пока нет',  en: 'No reviews yet' },
    total:      { ky: 'жалпы пикир',            ru: 'всего отзывов',     en: 'total reviews' },
    avg:        { ky: 'орточо баа',             ru: 'средняя оценка',    en: 'average rating' },
    contact:    { ky: 'Байланыш:',             ru: 'Контакт:',          en: 'Contact:' },
    del:        { ky: 'Өчүрүү',                ru: 'Удалить',           en: 'Delete' },
    back:       { ky: '← Башкы бет',           ru: '← Главная',         en: '← Home' },
    rating_lbl: { ky: 'Баа:',                  ru: 'Оценка:',           en: 'Rating:' },
    signin_req: { ky: 'Пикир үчүн кириңиз',    ru: 'Войдите для отзыва', en: 'Sign in to review' },
    or_name:    { ky: 'же атыңызды жазыңыз',   ru: 'или укажите имя',   en: 'or enter your name' },
  };
  const L = k => lbl[k]?.[lang] || lbl[k]?.en || k;

  return (
    <main className="reviews-page">
      <div className="reviews-container">

        {/* ── Шапка ── */}
        <div className="reviews-header">
          <span className="inner-page__breadcrumb" onClick={() => navigate('/')}>
            {L('back')}
          </span>
          <h1 className="reviews-title">{L('title')}</h1>
          <p className="reviews-sub">{L('sub')}</p>

          {/* Статистика */}
          <div className="reviews-stats">
            <div className="reviews-stat">
              <span className="reviews-stat__num">{allReviews.length}</span>
              <span className="reviews-stat__label">{L('total')}</span>
            </div>
            <div className="reviews-stat">
              <span className="reviews-stat__num">{avgRating}</span>
              <span className="reviews-stat__label">{L('avg')}</span>
            </div>
            <div className="reviews-stat">
              <div className="reviews-avg-stars">
                {[1,2,3,4,5].map(n => (
                  <span key={n} className={n <= Math.round(parseFloat(avgRating)||0) ? 'star star--on' : 'star'} style={{fontSize:18}}>★</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="reviews-body">

          {/* ── Левая колонка: фильтр + форма ── */}
          <aside className="reviews-aside">

            {/* Фильтр по книге */}
            {productsWithReviews.length > 0 && (
              <div className="reviews-filter">
                <h3>{L('filter_lbl')}</h3>
                <button
                  className={`rev-filter-btn ${filterProduct === 'all' ? 'active' : ''}`}
                  onClick={() => setFilterProduct('all')}
                >
                  {L('filter_all')} ({allReviews.length})
                </button>
                {productsWithReviews.map(p => (
                  <button
                    key={p.id}
                    className={`rev-filter-btn ${filterProduct === String(p.id) ? 'active' : ''}`}
                    onClick={() => setFilterProduct(String(p.id))}
                  >
                    {p.title} ({allReviews.filter(r => String(r.productId) === String(p.id)).length})
                  </button>
                ))}
              </div>
            )}

            {/* Форма отзыва */}
            <div className="reviews-form-box">
              <h3>{L('leave')}</h3>
              <form onSubmit={handleSubmit} className="reviews-form">

                {/* Имя — если не залогинен */}
                {!user ? (
                  <div className="rev-form-field">
                    <input
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder={`${L('name_ph')} (${L('or_name')})`}
                      maxLength={50}
                      className="rev-input"
                    />
                  </div>
                ) : (
                  <p className="rev-user-info">✓ <strong>{user.name}</strong></p>
                )}

                {/* Звёзды */}
                <div className="rev-form-field">
                  <label className="rev-label">{L('rating_lbl')}</label>
                  <div className="rev-stars-pick">
                    {[1,2,3,4,5].map(n => (
                      <span key={n}
                        className={n <= (hover || form.rating) ? 'star star--on' : 'star'}
                        style={{ fontSize: 28, cursor: 'pointer' }}
                        onMouseEnter={() => setHover(n)}
                        onMouseLeave={() => setHover(0)}
                        onClick={() => setForm(f => ({ ...f, rating: n }))}
                      >★</span>
                    ))}
                  </div>
                </div>

                {/* Текст */}
                <div className="rev-form-field">
                  <textarea
                    value={form.text}
                    onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
                    placeholder={L('text_ph')}
                    rows={4}
                    required
                    maxLength={500}
                    className="rev-textarea"
                  />
                  <span className="rev-counter">{form.text.length}/500</span>
                </div>

                {sent && <p className="rev-sent">✓ {L('sent_ok')}</p>}

                <button type="submit" className="btn-gold rev-submit">{L('send')}</button>
              </form>
            </div>
          </aside>

          {/* ── Правая колонка: список отзывов ── */}
          <div className="reviews-list-wrap">
            {filtered.length === 0 ? (
              <div className="rev-empty">
                <span style={{ fontSize: 40 }}>💬</span>
                <p>{L('empty')}</p>
              </div>
            ) : (
              <div className="reviews-list">
                {filtered.map(review => (
                  <article className="review-card" key={review.id}>
                    <div className="review-card__head">
                      {/* Аватар */}
                      <div className="review-card__avatar">
                        {(review.userName || '?')[0].toUpperCase()}
                      </div>

                      {/* Имя + дата */}
                      <div className="review-card__meta">
                        <strong className="review-card__name">
                          {review.userName || t('guest', lang)}
                        </strong>
                        <span className="review-card__date">{review.date}</span>
                      </div>

                      {/* Звёзды */}
                      <div className="review-card__stars">
                        <StarRating value={review.rating} size={15}/>
                        <span className="review-card__rating-val">{review.rating}.0</span>
                      </div>

                      {/* Книга */}
                      {review.productTitle && (
                        <span className="review-card__book">📖 {review.productTitle}</span>
                      )}

                      {/* Кнопка удаления */}
                      {canDelete(review) && (
                        <div className="review-card__del-wrap">
                          {deleteId === review.id ? (
                            <>
                              <button className="admin-btn-confirm" onClick={() => { deleteReview(review.productId, review.id); setDeleteId(null); }}>✓</button>
                              <button className="admin-btn-cancel" onClick={() => setDeleteId(null)}>✕</button>
                            </>
                          ) : (
                            <button className="admin-btn-del" onClick={() => setDeleteId(review.id)} title={L('del')}>🗑</button>
                          )}
                        </div>
                      )}
                    </div>

                    <p className="review-card__text">{review.text}</p>
                  </article>
                ))}
              </div>
            )}

            {/* ── Контактный номер ── */}
            <div className="reviews-contact">
              <span className="reviews-contact__label">{L('contact')}</span>
              <a href="tel:+996706415872" className="reviews-contact__phone">
                📞 +996 706 415 872
              </a>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
