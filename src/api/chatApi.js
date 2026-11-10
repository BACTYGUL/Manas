/**
 * chatApi — чат между пользователями и администратором.
 * Хранение: localStorage (ключ: manas_chat).
 * Структура: { [userId]: Message[] }
 * Message: { id, from ('user'|'admin'), text, ts (ISO), read }
 */

const KEY = 'manas_chat';

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; }
}
function save(data) { localStorage.setItem(KEY, JSON.stringify(data)); }

export function getMessages(userId) {
  return (load()[String(userId)] || []);
}

export function getAllChats() {
  return load(); // { [userId]: Message[] }
}

export function sendMessage(userId, from, text) {
  const all = load();
  const key = String(userId);
  const msg = { id: String(Date.now()), from, text: text.trim(), ts: new Date().toISOString(), read: false };
  all[key] = [...(all[key] || []), msg];
  save(all);
  return msg;
}

export function markRead(userId, from) {
  // Отмечаем как прочитанные все сообщения от `from`
  const all = load();
  const key = String(userId);
  if (!all[key]) return;
  all[key] = all[key].map(m => m.from === from ? { ...m, read: true } : m);
  save(all);
}

export function countUnread(userId, readerRole) {
  // readerRole: 'user' — считаем непрочитанные от 'admin'
  //             'admin' — считаем непрочитанные от 'user'
  const msgs = getMessages(userId);
  const from = readerRole === 'admin' ? 'user' : 'admin';
  return msgs.filter(m => m.from === from && !m.read).length;
}

export function totalAdminUnread() {
  const all = load();
  return Object.values(all).reduce((sum, msgs) =>
    sum + msgs.filter(m => m.from === 'user' && !m.read).length, 0);
}
