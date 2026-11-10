import React from 'react';
import { t, getProductTitle } from '../i18n/translations';

export default function CartItem({ item, lang, onUpdateQty, onRemove }) {
  const title = getProductTitle(item, lang);
  return (
    <div className="cart-item">
      <div className="cart-item__img">
        <svg viewBox="0 0 80 80" fill="none" width="80" height="80">
          <rect width="80" height="80" fill="var(--bg-secondary)"/>
          <path d="M40 20 L43 30 L54 30 L45 37 L48 47 L40 41 L32 47 L35 37 L26 30 L37 30 Z" fill="#c9a84c" opacity="0.4"/>
        </svg>
      </div>
      <div className="cart-item__info">
        <h4>{title}</h4>
        <span className="cart-item__price">{item.price} {t('som', lang)}</span>
      </div>
      <div className="cart-item__qty">
        <button onClick={() => onUpdateQty(item.id, item.qty-1)}>−</button>
        <span>{item.qty}</span>
        <button onClick={() => onUpdateQty(item.id, item.qty+1)}>+</button>
      </div>
      <div className="cart-item__subtotal">{item.price*item.qty} {t('som', lang)}</div>
      <button className="cart-item__remove" onClick={() => onRemove(item.id)}>✕</button>
    </div>
  );
}
