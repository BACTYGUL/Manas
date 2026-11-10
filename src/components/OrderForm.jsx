import React, { useState, useRef, useMemo, useEffect } from 'react';
import { t } from '../i18n/translations';
import COUNTRIES, { countryName, groupByContinent, CONTINENTS, validatePhone } from '../data/countries';

const CONT_ORDER = ['asia','europe','north_america','south_america','africa','oceania'];

export default function OrderForm({ lang, cart, cartTotal, form, setForm, onOrder }) {
  const [showDrop,    setShowDrop]    = useState(false);
  const [dropSearch,  setDropSearch]  = useState('');
  const [errors,      setErrors]      = useState({});
  const dropRef = useRef(null);

  // Закрыть дропдаун при клике вне
  useEffect(() => {
    const handler = e => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setShowDrop(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selectedCountry = COUNTRIES.find(c => c.code === (form.countryCode || 'KG')) || COUNTRIES[0];

  const filtered = useMemo(() => {
    const q = dropSearch.toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(c =>
      countryName(c, lang).toLowerCase().includes(q) ||
      c.dial.includes(q) || c.code.toLowerCase().includes(q)
    );
  }, [dropSearch, lang]);

  const grouped = useMemo(() => groupByContinent(filtered), [filtered]);

  const handleCountry = code => {
    setForm(f => ({ ...f, countryCode: code, phone: '' }));
    setErrors(e => ({ ...e, phone: '' }));
    setShowDrop(false);
    setDropSearch('');
  };

  // Валидация полей
  const validate = () => {
    const errs = {};

    if (!form.name.trim()) {
      errs.name = t('name_required', lang);
    }

    if (!form.phone.trim()) {
      errs.phone = t('phone_required', lang);
    } else if (!validatePhone(form.phone, selectedCountry)) {
      errs.phone = t('phone_invalid', lang);
    }

    if (!form.address.trim() || form.address.trim().length < 5) {
      errs.address = t('address_required', lang);
    }

    return errs;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    onOrder(e);
  };

  // Сброс ошибки при вводе
  const field = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: '' }));
  };

  return (
    <div className="cart-checkout">

      {/* ── Итого ── */}
      <div className="cart-summary">
        <h3>{t('cart_summary', lang)}</h3>
        <div className="cart-summary__row">
          <span>{t('cart_items', lang)} ({cart.reduce((s, i) => s + i.qty, 0)})</span>
          <span>{cartTotal} {t('som', lang)}</span>
        </div>
        <div className="cart-summary__row">
          <span>{t('cart_delivery', lang)}</span>
          <span style={{ color: '#55a855' }}>{t('cart_free', lang)}</span>
        </div>
        <div className="cart-summary__total">
          <span>{t('cart_total', lang)}</span>
          <span>{cartTotal} {t('som', lang)}</span>
        </div>
      </div>

      {/* ── Форма ── */}
      <form className="order-form" onSubmit={handleSubmit} noValidate>
        <h3>{t('order_data', lang)}</h3>

        {/* Имя */}
        <div className="order-field">
          <input
            placeholder={t('order_name', lang)}
            value={form.name}
            onChange={e => field('name', e.target.value)}
            className={errors.name ? 'field-error' : ''}
          />
          {errors.name && <p className="field-err-msg">⚠ {errors.name}</p>}
        </div>

        {/* Телефон с выбором страны */}
        <div className="order-field" ref={dropRef}>
          <div className={`order-phone-row ${errors.phone ? 'field-error' : ''}`}>
            {/* Кнопка страны */}
            <button
              type="button"
              className="order-phone-country"
              onClick={() => setShowDrop(d => !d)}
            >
              <span>{selectedCountry.flag}</span>
              <span className="opc-dial">{selectedCountry.dial}</span>
              <span className="opc-arrow">{showDrop ? '▲' : '▼'}</span>
            </button>
            <div className="order-phone-divider"/>
            {/* Поле номера */}
            <input
              type="tel"
              inputMode="numeric"
              className="order-phone-input"
              placeholder={`${t('order_phone', lang)} (${selectedCountry.minLen}–${selectedCountry.maxLen} ${t('phone_digits', lang)})`}
              value={form.phone}
              onChange={e => field('phone', e.target.value.replace(/\D/g, ''))}
              onBlur={() => {
                if (form.phone && !validatePhone(form.phone, selectedCountry)) {
                  setErrors(e => ({ ...e, phone: t('phone_invalid', lang) }));
                }
              }}
              maxLength={selectedCountry.maxLen + 2}
            />
          </div>
          {errors.phone && <p className="field-err-msg">⚠ {errors.phone}</p>}

          {/* Дропдаун стран */}
          {showDrop && (
            <div className="order-phone-dropdown">
              <div className="opd-search-wrap">
                <input
                  autoFocus
                  value={dropSearch}
                  onChange={e => setDropSearch(e.target.value)}
                  placeholder={t('search_country', lang)}
                  className="opd-search"
                />
              </div>
              <div className="opd-list">
                {CONT_ORDER.map(cont => {
                  const list = grouped[cont];
                  if (!list?.length) return null;
                  return (
                    <div key={cont}>
                      <div className="opd-continent">
                        {CONTINENTS[cont][lang] || CONTINENTS[cont].en}
                      </div>
                      {list.map(c => (
                        <button
                          key={c.code}
                          type="button"
                          className={`opd-option ${form.countryCode === c.code ? 'selected' : ''}`}
                          onClick={() => handleCountry(c.code)}
                        >
                          <span className="opd-flag">{c.flag}</span>
                          <span className="opd-name">{countryName(c, lang)}</span>
                          <span className="opd-dial">{c.dial}</span>
                        </button>
                      ))}
                    </div>
                  );
                })}
                {!CONT_ORDER.some(c => grouped[c]?.length) && (
                  <p className="opd-empty">{t('search_no_result', lang)}</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Адрес */}
        <div className="order-field">
          <input
            placeholder={t('order_address', lang)}
            value={form.address}
            onChange={e => field('address', e.target.value)}
            className={errors.address ? 'field-error' : ''}
          />
          {errors.address && <p className="field-err-msg">⚠ {errors.address}</p>}
        </div>

        {/* Комментарий */}
        <textarea
          placeholder={t('order_comment', lang)}
          value={form.comment}
          onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
          rows={2}
        />

        <button type="submit" className="btn-gold order-btn">
          {t('order_btn', lang)}
        </button>
      </form>
    </div>
  );
}
