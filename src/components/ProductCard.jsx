import React from 'react';
import { useNavigate } from 'react-router-dom';
import { t, getProductTitle } from '../i18n/translations';
import ProductSVG from './ProductSVG';
import StarRating from './StarRating';

const CAT_MAP = { Китептер:'cat_books', Сувенирлер:'cat_souvenirs', Кийим:'cat_clothes', Музыка:'cat_music' };

export default function ProductCard({ product, lang, isFav, added, onAddCart, onToggleFav }) {
  const navigate = useNavigate();
  const title = getProductTitle(product, lang);

  return (
    <div className="product-card">
      <div className="product-card__img" onClick={() => navigate(`/shop/${product.id}`)}>
        <ProductSVG type={product.image}/>
        <button
          className={`product-card__fav ${isFav ? 'active' : ''}`}
          onClick={e => { e.stopPropagation(); onToggleFav(product); }}
          title={t('shop_fav', lang)}
        >♥</button>
        {Number(product.stock) < 5 && (
          <span className="product-card__badge">{t('shop_few', lang)}</span>
        )}
      </div>
      <div className="product-card__body">
        <span className="product-card__cat">{t(CAT_MAP[product.category]||'cat_all', lang)}</span>
        <h3 className="product-card__title" onClick={() => navigate(`/shop/${product.id}`)}>
          {title}
        </h3>
        <div className="product-card__rating">
          <StarRating value={Number(product.rating)||0} size={13}/>
          <span>{Number(product.rating||0).toFixed(1)}</span>
          <span className="product-card__reviews">({product.reviews||0})</span>
        </div>
        <div className="product-card__footer">
          <span className="product-card__price">{product.price} {t('som', lang)}</span>
          <button
            className={`product-card__add ${added ? 'added' : ''}`}
            onClick={() => onAddCart(product)}
          >
            {added ? '✓' : '+'}
          </button>
        </div>
      </div>
    </div>
  );
}
