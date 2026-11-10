import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { t, getProductTitle } from '../i18n/translations';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import StarRating from '../components/StarRating';
import './Detail.css';

const CAT_MAP = { Китептер:'cat_books', Сувенирлер:'cat_souvenirs', Кийим:'cat_clothes', Музыка:'cat_music' };

/* Данные глав для 6 книг по id */
const BOOK_CHAPTERS = {
  '13': {
    ky: ['Баш сөз', 'Манаснын туулушу', 'Жаш Манас', 'Алмамбет менен достугу', 'Каныкей менен үйлөнүшү', 'Кырк чоро', 'Чоң казат — Бейжинге жортуул', 'Манаснын каза болушу'],
    ru: ['Предисловие', 'Рождение Манаса', 'Юный Манас', 'Дружба с Алмамбетом', 'Женитьба на Каныкей', 'Сорок богатырей', 'Великий поход на Пекин', 'Гибель Манаса'],
    en: ['Foreword', 'Birth of Manas', 'Young Manas', 'Friendship with Almambet', 'Marriage to Kanikey', 'The Forty Warriors', 'Great Campaign to Beijing', 'Death of Manas'],
  },
  '14': {
    ky: ['Семетейдин туулушу', 'Эне менен качуу', 'Жаш Семетей', 'Кыялга үйлөнүшү', 'Душмандар менен күрөш', 'Атасынын өчүн', 'Акыркы салгылашуу'],
    ru: ['Рождение Семетея', 'Бегство с матерью', 'Юный Семетей', 'Женитьба на Кыял', 'Борьба с врагами', 'Месть за отца', 'Последняя битва'],
    en: ['Birth of Semetey', 'Flight with Mother', 'Young Semetey', 'Marriage to Kyal', 'Battle with Enemies', 'Avenging His Father', 'Final Battle'],
  },
  '15': {
    ky: ['Сейтектин туулушу', 'Ата-баба рухтары', 'Жаш Сейтек', 'Элге тынчтык', 'Душмандарды жеңүү', 'Акыркы жеңиш'],
    ru: ['Рождение Сейтека', 'Духи предков', 'Юный Сейтек', 'Мир народу', 'Победа над врагами', 'Последняя победа'],
    en: ['Birth of Seitek', 'Spirits of Ancestors', 'Young Seitek', 'Peace to the People', 'Defeating Enemies', 'Final Victory'],
  },
  '16': {
    ky: ['Алмамбеттин жашоосу', 'Душман жагында', 'Манаска кошулуу', 'Берилгендиги', 'Сыйкырдуу күчтөрү', 'Чоң жортуулда каза'],
    ru: ['Жизнь Алмамбета', 'На стороне врага', 'Переход к Манасу', 'Преданность', 'Магические силы', 'Гибель в великом походе'],
    en: ["Almambet's Life", 'On the Enemy Side', 'Joining Manas', 'Devotion', 'Magical Powers', 'Death in the Great Campaign'],
  },
  '17': {
    ky: ['Каныкейдин жашоосу', 'Манаска берилгендиги', 'Акылмандуулугу', 'Семетейди тарбиялоо', 'Элди коргоо', 'Улуу эненин образы'],
    ru: ['Жизнь Каныкей', 'Преданность Манасу', 'Мудрость', 'Воспитание Семетея', 'Защита народа', 'Образ великой матери'],
    en: ["Kanikey's Life", 'Devotion to Manas', 'Wisdom', 'Raising Semetey', 'Protecting the People', 'Image of the Great Mother'],
  },
  '18': {
    ky: ['Чыйырдынын жашоосу', 'Жакыптын аялы', 'Манаска мээрими', 'Баатырдын энеси', 'Дубасы жана колдоосу', 'Элдик символ'],
    ru: ['Жизнь Чыйырды', 'Жена Жакыпа', 'Любовь к Манасу', 'Мать героя', 'Молитвы и поддержка', 'Народный символ'],
    en: ["Chiyirdi's Life", "Jakyp's Wife", 'Love for Manas', "Mother of the Hero", 'Prayers and Support', 'National Symbol'],
  },
};

export default function Detail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { products, addToCart, toggleFavorite, isFavorite,
          addReview, deleteReview, getReviews, user, lang } = useApp();

  const product = products.find(p => String(p.id) === String(id));
  const reviews = getReviews(id);
  const chapters = BOOK_CHAPTERS[String(id)];

  const [qty,       setQty]       = useState(1);
  const [added,     setAdded]     = useState(false);
  const [wanted,    setWanted]    = useState(() => {
    try { return (JSON.parse(localStorage.getItem('manas_wantread')||'[]')).includes(id); } catch { return false; }
  });
  const [form,      setForm]      = useState({ name:'', rating:5, text:'' });
  const [sent,      setSent]      = useState(false);
  const [deleteId,  setDeleteId]  = useState(null);
  const [showChaps, setShowChaps] = useState(false);

  if (!product) return (
    <main className="detail-page">
      <div className="detail-container" style={{paddingTop:120,textAlign:'center'}}>
        <p style={{color:'var(--text-muted)',marginBottom:20}}>{t('not_found',lang)}</p>
        <button className="btn-gold" onClick={()=>navigate('/shop')}>{t('to_shop',lang)}</button>
      </div>
    </main>
  );

  const title = getProductTitle(product, lang);
  const desc  = lang==='ru' ? (product.descRu||product.desc)
              : lang==='en' ? (product.descEn||product.descRu||product.desc)
              : product.desc;

  const avgRating = reviews.length
    ? (reviews.reduce((s,r)=>s+r.rating,0)/reviews.length).toFixed(1)
    : Number(product.rating||0).toFixed(1);

  const handleAddCart = () => {
    for (let i=0;i<qty;i++) addToCart(product);
    setAdded(true); setTimeout(()=>setAdded(false),1500);
  };

  const handleWantRead = () => {
    try {
      const list = JSON.parse(localStorage.getItem('manas_wantread')||'[]');
      if (!list.includes(id)) { list.push(id); localStorage.setItem('manas_wantread', JSON.stringify(list)); }
    } catch {}
    setWanted(true);
  };

  const handleSubmitReview = e => {
    e.preventDefault();
    if (!form.text.trim()) return;
    addReview(id, { userId:user?.id||null, userName:user?.name||form.name||t('guest',lang), rating:form.rating, text:form.text.trim() });
    setForm({name:'',rating:5,text:''}); setSent(true); setTimeout(()=>setSent(false),2500);
  };

  const isBook = product.category === 'Китептер';

  return (
    <main className="detail-page">
      <div className="detail-container">
        <nav className="detail-breadcrumb">
          <Link to="/">{t('breadcrumb_home',lang)}</Link>
          <span>›</span><Link to="/shop">{t('breadcrumb_shop',lang)}</Link>
          <span>›</span><span>{title}</span>
        </nav>

        <div className="detail-main">
          {/* Изображение */}
          <div className="detail-image">
            <svg width="100%" height="100%" viewBox="0 0 400 320" fill="none">
              <rect width="400" height="320" fill="var(--bg-secondary)"/>
              {isBook ? (
                <>
                  <rect x="95" y="25" width="210" height="270" rx="6" fill="#c9a84c" opacity="0.12"/>
                  <rect x="103" y="33" width="194" height="254" rx="4" fill="#c9a84c" opacity="0.08"/>
                  <rect x="95" y="25" width="8" height="270" fill="#c9a84c" opacity="0.28"/>
                  <rect x="120" y="55" width="160" height="14" rx="3" fill="#c9a84c" opacity="0.45"/>
                  <rect x="120" y="78" width="130" height="7" rx="2" fill="#c9a84c" opacity="0.22"/>
                  <rect x="120" y="94" width="150" height="7" rx="2" fill="#c9a84c" opacity="0.18"/>
                  <rect x="120" y="110" width="110" height="7" rx="2" fill="#c9a84c" opacity="0.18"/>
                  <rect x="120" y="126" width="140" height="7" rx="2" fill="#c9a84c" opacity="0.18"/>
                  <circle cx="200" cy="210" r="30" fill="#c9a84c" opacity="0.07"/>
                  <path d="M200 192 L204 206 L220 206 L207 215 L211 229 L200 221 L189 229 L193 215 L180 206 L196 206 Z" fill="#c9a84c" opacity="0.3"/>
                </>
              ) : (
                <>
                  <circle cx="200" cy="160" r="80" fill="#c9a84c" opacity="0.08"/>
                  <path d="M200 100 L208 128 L238 128 L214 146 L222 174 L200 158 L178 174 L186 146 L162 128 L192 128 Z" fill="#c9a84c" opacity="0.3"/>
                </>
              )}
            </svg>
            <button className={`detail-fav ${isFavorite(product.id)?'active':''}`} onClick={()=>toggleFavorite(product)}>
              ♥ {t('favorite',lang)}
            </button>
          </div>

          {/* Информация */}
          <div className="detail-info">
            <span className="detail-cat">{t(CAT_MAP[product.category]||'cat_all',lang)}</span>
            <h1 className="detail-title">{title}</h1>

            <div className="detail-rating">
              <StarRating value={parseFloat(avgRating)} size={20}/>
              <span className="detail-rating__val">{avgRating}</span>
              <span className="detail-rating__count">({reviews.length||product.reviews||0} {t('reviews_count',lang)})</span>
            </div>

            <p className="detail-desc">{desc}</p>

            {/* Информация о книге */}
            {isBook && (
              <div className="book-meta">
                <div className="book-meta__row"><span>{t('book_genre',lang)}:</span><strong>{t('book_genre_val',lang)}</strong></div>
                <div className="book-meta__row"><span>{t('book_author',lang)}:</span><strong>{lang==='en'?'Sagimbay Orozbakov / Sayakbay Karalaev':lang==='ru'?'Сагымбай Орозбаков / Саякбай Каралаев':'Сагымбай Орозбаков / Саякбай Каралаев'}</strong></div>
                <div className="book-meta__row"><span>{t('book_lang',lang)}:</span><strong>{lang==='en'?'Kyrgyz, Russian, English':lang==='ru'?'Кыргызский, Русский, Английский':'Кыргызча, Орусча, Англисче'}</strong></div>
              </div>
            )}

            <div className="detail-stock">
              {Number(product.stock)>0
                ? <span className="in-stock">✓ {t('in_stock',lang)} ({product.stock} {t('pieces',lang)})</span>
                : <span className="out-stock">✕ {t('out_stock',lang)}</span>
              }
            </div>
            <div className="detail-price">{product.price} {t('som',lang)}</div>

            <div className="detail-qty">
              <button onClick={()=>setQty(q=>Math.max(1,q-1))}>−</button>
              <span>{qty}</span>
              <button onClick={()=>setQty(q=>Math.min(Number(product.stock),q+1))}>+</button>
            </div>

            <div className="detail-actions">
              <button className={`btn-gold detail-cart-btn ${added?'added':''}`}
                onClick={handleAddCart} disabled={Number(product.stock)===0}>
                {added ? `✓ ${t('added',lang)}` : t('add_cart',lang)}
              </button>
              <button className="btn-outline" onClick={()=>navigate('/shop')}>{t('back',lang)}</button>
            </div>

            {/* Кнопка «Хочу прочитать» */}
            {isBook && (
              <button
                className={`btn-want-read ${wanted?'active':''}`}
                onClick={handleWantRead}
                disabled={wanted}
              >
                {wanted ? `✓ ${t('book_wanted',lang)}` : t('book_want_read',lang)}
              </button>
            )}
          </div>
        </div>

        {/* Главы книги */}
        {isBook && chapters && (
          <section className="book-chapters">
            <button className="chapters-toggle" onClick={()=>setShowChaps(v=>!v)}>
              📖 {t('book_chapters',lang)} {showChaps?'▲':'▼'}
            </button>
            {showChaps && (
              <ol className="chapters-list">
                {(chapters[lang]||chapters.ky).map((ch,i)=>(
                  <li key={i}><span className="ch-num">{String(i+1).padStart(2,'0')}</span>{ch}</li>
                ))}
              </ol>
            )}
          </section>
        )}

        {/* Отзывы */}
        <section className="detail-reviews">
          <h2>{t('reviews',lang)} <span className="reviews-count-badge">({reviews.length})</span></h2>
          <ReviewForm lang={lang} user={user} form={form} setForm={setForm} sent={sent} onSubmit={handleSubmitReview}/>
          <ReviewList lang={lang} reviews={reviews} user={user}
            deleteId={deleteId} setDeleteId={setDeleteId}
            onDelete={rid=>{deleteReview(id,rid);setDeleteId(null);}}/>

          {/* Контактный номер под отзывами */}
          <div className="detail-contact-phone">
            <a href="tel:+996706415872">📞 +996 706 415 872</a>
          </div>
        </section>
      </div>
    </main>
  );
}
