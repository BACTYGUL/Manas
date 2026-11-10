import React from 'react';
import { t } from '../i18n/translations';
import StarRating from './StarRating';

export default function ReviewForm({ lang, user, form, setForm, sent, onSubmit }) {
  return (
    <div className="review-form-wrap">
      <h3>{t('leave_review', lang)}</h3>
      <form className="review-form" onSubmit={onSubmit}>
        {!user && (
          <div className="review-form__field">
            <label>{t('auth_name', lang)}</label>
            <input
              value={form.name}
              onChange={e => setForm(f => ({...f, name: e.target.value}))}
              placeholder={t('review_name_placeholder', lang)}
              maxLength={50}
            />
          </div>
        )}
        {user && (
          <p className="review-form__user">
            ✓ {user.name}
            {user.role === 'admin' && <span className="review-form__admin-badge">admin</span>}
          </p>
        )}
        <div className="review-form__field">
          <label>{t('rating_label', lang)}</label>
          <StarRating value={form.rating} size={28} onChange={r => setForm(f => ({...f, rating: r}))}/>
        </div>
        <div className="review-form__field">
          <label>{t('leave_review', lang)}</label>
          <textarea
            value={form.text}
            onChange={e => setForm(f => ({...f, text: e.target.value}))}
            placeholder={t('review_placeholder', lang)}
            rows={3} required maxLength={500}
          />
          <span className="review-form__counter">{form.text.length}/500</span>
        </div>
        {sent && <p className="review-success">✓ {t('review_sent', lang)}</p>}
        <button type="submit" className="btn-gold">{t('send', lang)}</button>
      </form>
    </div>
  );
}
