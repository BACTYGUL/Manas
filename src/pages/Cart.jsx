import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { t } from '../i18n/translations';
import CartItem from '../components/CartItem';
import OrderForm from '../components/OrderForm';
import './Cart.css';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQty, clearCart, cartTotal, user, lang, createOrder } = useApp();
  const [ordered, setOrdered] = useState(false);
  const [form, setForm] = useState({ name:user?.name||'', phone:'', address:'', comment:'' });

  const handleOrder = () => {
    createOrder({
      customerName: form.name,
      phone:        `${(form.countryCode ? '' : '')}${form.phone}`,
      address:      form.address,
      comment:      form.comment,
      total:        cartTotal,
      userId:       user?.id || null,
      items: cart.map(i => ({
        id: i.id, title: i.title, titleRu: i.titleRu, titleEn: i.titleEn,
        qty: i.qty, price: i.price,
      })),
    });
    clearCart();
    setOrdered(true);
  };

  if (ordered) return (
    <main className="cart-page">
      <div className="cart-container">
        <div className="order-success">
          <div className="order-success__icon">✓</div>
          <h2>{t('order_success', lang)}</h2>
          <p>{t('order_msg', lang)}</p>
          <button className="btn-gold" onClick={() => navigate('/shop')}>{t('to_shop', lang)}</button>
        </div>
      </div>
    </main>
  );

  return (
    <main className="cart-page">
      <div className="cart-container">
        <span className="inner-page__breadcrumb" onClick={() => navigate('/')}>
          ← {t('breadcrumb_home', lang)}
        </span>
        <h1 className="cart-title">{t('cart_title', lang)} ({cart.length})</h1>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty__icon">🛒</div>
            <p>{t('cart_empty', lang)}</p>
            <button className="btn-gold" onClick={() => navigate('/shop')}>{t('cart_go_shop', lang)}</button>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {cart.map(item => (
                <CartItem key={item.id} item={item} lang={lang}
                  onUpdateQty={updateQty} onRemove={removeFromCart}/>
              ))}
              <button className="cart-clear" onClick={clearCart}>{t('cart_clear', lang)}</button>
            </div>
            <OrderForm lang={lang} cart={cart} cartTotal={cartTotal}
              form={form} setForm={setForm} onOrder={handleOrder}/>
          </div>
        )}
      </div>
    </main>
  );
}
