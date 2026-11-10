const API_URL = import.meta.env.VITE_API_URL;
const BASE = `${API_URL}/products`;
const ORDERS_BASE = `${API_URL}/orders`;

const headers = { 'Content-Type': 'application/json' };

function normalizeProduct(product = {}) {
  const title = String(product.title ?? '').trim();
  const titleRu = String(product.titleRu ?? '').trim();
  const titleEn = String(product.titleEn ?? '').trim();
  const desc = String(product.desc ?? '').trim();
  const descRu = String(product.descRu ?? '').trim();
  const descEn = String(product.descEn ?? '').trim();
  const imageUrl = String(product.imageUrl ?? '').trim();
  const maybeUrl = typeof product.image === 'string' && /^https?:\/\//i.test(product.image)
    ? product.image
    : '';

  return {
    ...product,
    title: title || product.titleKy || '',
    titleRu: titleRu || title || '',
    titleEn: titleEn || product.titleEn || title || titleRu || '',
    desc: desc || product.descKy || '',
    descRu: descRu || desc || '',
    descEn: descEn || product.descEn || desc || descRu || '',
    imageUrl: imageUrl || maybeUrl || '',
  };
}

/** GET /products — получить все товары */
export async function fetchProducts() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error(`GET /products failed: ${res.status}`);
  const data = await res.json();
  return Array.isArray(data) ? data.map(normalizeProduct) : [];
}

/** POST /products — создать товар */
export async function createProduct(data) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`POST /products failed: ${res.status}`);
  return res.json();
}

/** PUT /products/:id — обновить товар */
export async function updateProduct(id, data) {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`PUT /products/${id} failed: ${res.status}`);
  return res.json();
}

/** DELETE /products/:id — удалить товар */
export async function deleteProduct(id) {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`DELETE /products/${id} failed: ${res.status}`);
  return res.json();
}

/** GET /orders — получить все заказы */
export async function fetchOrders() {
  const res = await fetch(ORDERS_BASE);
  if (!res.ok) throw new Error(`GET /orders failed: ${res.status}`);
  return res.json();
}

/** POST /orders — создать заказ */
export async function createOrder(data) {
  const res = await fetch(ORDERS_BASE, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`POST /orders failed: ${res.status}`);
  return res.json();
}

/** PUT /orders/:id — обновить заказ (статус и т.д.) */
export async function updateOrder(id, data) {
  const res = await fetch(`${ORDERS_BASE}/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`PUT /orders/${id} failed: ${res.status}`);
  return res.json();
}
