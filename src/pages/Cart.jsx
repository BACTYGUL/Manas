import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Cart.css';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQty, clearCart, cartTotal, user, lang, createOrder } = useApp();
  const [ordered, setOrdered] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', phone: '', address: '', comment: '' });

  const T = (ky, ru) => lang === 'ky' ? ky : ru;

  const handleOrder = (e) => {
    e.preventDefault();
    createOrder({
      customerName: form.name,
      phone: form.phone,
      address: form.address,
      comment: form.comment,
      total: cartTotal,
      items: cart.map(item => ({
        id: item.id,
        title: item.title,
        qty: item.qty,
        price: item.price,
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
          <h2>{T('Заказыңыз кабыл алынды!', 'Заказ принят!')}</h2>
          <p>{T('Биз жакын арада сизге байланышабыз.', 'Мы свяжемся с вами в ближайшее время.')}</p>
          <button className="btn-gold" onClick={() => navigate('/shop')}>
            {T('Дүкөнгө кайтуу', 'Вернуться в магазин')}
          </button>
        </div>
      </div>
    </main>
  );

  return (
    <main className="cart-page">
      <div className="cart-container">
        <span className="inner-page__breadcrumb" onClick={() => navigate('/')}>
          ← {T('Башкы бет', 'Главная')}
        </span>
        <h1 className="cart-title">
          {T('Корзина', 'Корзина')} ({cart.length})
        </h1>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty__icon">🛒</div>
            <p>{T('Корзина бош', 'Корзина пуста')}</p>
            <button className="btn-gold" onClick={() => navigate('/shop')}>
              {T('Дүкөнгө өтүү', 'Перейти в магазин')}
            </button>
          </div>
        ) : (
          <div className="cart-layout">
            {/* Items */}
            <div className="cart-items">
              {cart.map(item => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item__img">
                    <svg viewBox="0 0 80 80" fill="none" width="80" height="80">
                      <rect width="80" height="80" fill="var(--bg-secondary)"/>
                      <path d="M40 20 L43 30 L54 30 L45 37 L48 47 L40 41 L32 47 L35 37 L26 30 L37 30 Z" fill="#c9a84c" opacity="0.4"/>
                    </svg>
                  </div>
                  <div className="cart-item__info">
                    <h4>{lang === 'ky' ? item.title : (item.titleRu || item.title)}</h4>
                    <span className="cart-item__price">{item.price} {T('сом', 'сом')}</span>
                  </div>
                  <div className="cart-item__qty">
                    <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                  </div>
                  <div className="cart-item__subtotal">
                    {item.price * item.qty} {T('сом', 'сом')}
                  </div>
                  <button className="cart-item__remove" onClick={() => removeFromCart(item.id)}>✕</button>
                </div>
              ))}
              <button className="cart-clear" onClick={clearCart}>
                {T('Баарын тазалоо', 'Очистить корзину')}
              </button>
            </div>

            {/* Order form */}
            <div className="cart-checkout">
              <div className="cart-summary">
                <h3>{T('Буйрутма жыйынтыгы', 'Итого')}</h3>
                <div className="cart-summary__row">
                  <span>{T('Товарлар', 'Товары')} ({cart.reduce((s,i)=>s+i.qty,0)})</span>
                  <span>{cartTotal} {T('сом', 'сом')}</span>
                </div>
                <div className="cart-summary__row">
                  <span>{T('Жеткирүү', 'Доставка')}</span>
                  <span style={{color:'#55a855'}}>{T('Акысыз', 'Бесплатно')}</span>
                </div>
                <div className="cart-summary__total">
                  <span>{T('Баардыгы', 'Всего')}</span>
                  <span>{cartTotal} {T('сом', 'сом')}</span>
                </div>
              </div>

              <form className="order-form" onSubmit={handleOrder}>
                <h3>{T('Маалымат', 'Данные')}</h3>
                <input
                  placeholder={T('Аты-жөнүңүз', 'Ваше имя')}
                  value={form.name}
                  onChange={e => setForm(f=>({...f,name:e.target.value}))}
                  required
                />
                <input
                  placeholder={T('Телефон номериңиз', 'Номер телефона')}
                  value={form.phone}
                  onChange={e => setForm(f=>({...f,phone:e.target.value}))}
                  required
                />
                <input
                  placeholder={T('Дарегиңиз', 'Адрес доставки')}
                  value={form.address}
                  onChange={e => setForm(f=>({...f,address:e.target.value}))}
                  required
                />
                <textarea
                  placeholder={T('Комментарий (милдеттүү эмес)', 'Комментарий (необязательно)')}
                  value={form.comment}
                  onChange={e => setForm(f=>({...f,comment:e.target.value}))}
                  rows={2}
                />
                <button type="submit" className="btn-gold order-btn">
                  {T('Заказ берүү', 'Оформить заказ')}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
