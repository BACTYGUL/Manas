/**
 * API для отзывов.
 * Отзывы хранятся в localStorage (ключ: manas_reviews).
 * Структура: { [productId]: Review[] }
 *
 * Review: { id, productId, userId, userName, rating, text, date }
 *
 * Если в будущем добавить ресурс /reviews в mockapi —
 * достаточно раскомментировать блок с fetch и удалить localStorage-версию.
 */

const STORAGE_KEY = 'manas_reviews';

function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { return {}; }
}

function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/** Получить все отзывы для конкретного товара */
export function getReviewsByProduct(productId) {
  const all = load();
  return all[String(productId)] || [];
}

/** Добавить отзыв */
export function addReview(productId, review) {
  const all = load();
  const key = String(productId);
  const newReview = {
    ...review,
    id: String(Date.now()),
    productId: String(productId),
    date: new Date().toLocaleDateString('ru-RU'),
    createdAt: new Date().toISOString(),
  };
  all[key] = [newReview, ...(all[key] || [])];
  save(all);
  return newReview;
}

/** Удалить отзыв по id */
export function deleteReview(productId, reviewId) {
  const all = load();
  const key = String(productId);
  all[key] = (all[key] || []).filter(r => r.id !== reviewId);
  save(all);
}

/** Получить все отзывы (для admin) */
export function getAllReviews() {
  return load();
}
