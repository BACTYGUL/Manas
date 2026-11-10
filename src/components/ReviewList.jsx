import React from 'react';
import { t } from '../i18n/translations';
import StarRating from './StarRating';

export default function ReviewList({ lang, reviews, user, deleteId, setDeleteId, onDelete }) {
  const canDelete = r => user?.role==='admin' || (user && String(r.userId)===String(user.id));

  if (reviews.length === 0) return (
    <div className="review-empty">
      <span>💬</span>
      <p>{t('review_empty', lang)}</p>
    </div>
  );

  return (
    <div className="review-list">
      {reviews.map(r => (
        <div className="review-item" key={r.id}>
          <div className="review-item__header">
            <div className="review-avatar">{(r.userName||r.user||'?')[0].toUpperCase()}</div>
            <div className="review-item__meta">
              <strong>{r.userName||r.user}</strong>
              <span className="review-date">{r.date}</span>
            </div>
            <StarRating value={r.rating} size={14}/>
            {canDelete(r) && (
              <div className="review-delete-wrap">
                {deleteId===r.id ? (
                  <>
                    <button className="review-delete-confirm" onClick={() => onDelete(r.id)}>✓</button>
                    <button className="review-delete-cancel" onClick={() => setDeleteId(null)}>✕</button>
                  </>
                ) : (
                  <button className="review-delete-btn" onClick={() => setDeleteId(r.id)} title={t('delete',lang)}>🗑</button>
                )}
              </div>
            )}
          </div>
          <p className="review-text">{r.text}</p>
        </div>
      ))}
    </div>
  );
}
