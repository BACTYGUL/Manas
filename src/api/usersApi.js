const BASE = `${import.meta.env.VITE_USERS_API_URL}/user`;

const headers = { 'Content-Type': 'application/json' };

/** GET /user — все пользователи */
export async function fetchUsers() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error(`GET /user failed: ${res.status}`);
  return res.json();
}

/** GET /user?email=xxx — найти по email (mockapi фильтрация) */
export async function findUserByEmail(email) {
  const res = await fetch(`${BASE}?email=${encodeURIComponent(email)}`);
  if (!res.ok) throw new Error(`GET /user?email failed: ${res.status}`);
  const list = await res.json();
  return list[0] ?? null;
}

/** POST /user — создать пользователя */
export async function createUser(data) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`POST /user failed: ${res.status}`);
  return res.json();
}

/** PUT /user/:id — обновить пользователя */
export async function updateUser(id, data) {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`PUT /user/${id} failed: ${res.status}`);
  return res.json();
}

/** DELETE /user/:id — удалить пользователя */
export async function deleteUser(id) {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`DELETE /user/${id} failed: ${res.status}`);
  return res.json();
}
