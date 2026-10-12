const API_URL = import.meta.env.VITE_API_URL;
const BASE = `${API_URL}/products`;
const ORDERS_BASE = `${API_URL}/orders`;

const headers = { 'Content-Type': 'application/json' };

/** GET /products — получить все товары */
export async function fetchProducts() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error(`GET /products failed: ${res.status}`);
  return res.json();
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
