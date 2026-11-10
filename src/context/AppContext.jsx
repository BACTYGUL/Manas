import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  fetchProducts,
  createProduct,
  updateProduct as apiUpdateProduct,
  deleteProduct as apiDeleteProduct,
  fetchOrders,
  createOrder as apiCreateOrder,
  updateOrder as apiUpdateOrder,
} from '../api/productsApi';
import {
  fetchUsers,
  findUserByEmail,
  createUser,
  deleteUser as apiDeleteUser,
} from '../api/usersApi';
import {
  getReviewsByProduct,
  addReview as apiAddReview,
  deleteReview as apiDeleteReview,
  getAllReviews,
} from '../api/reviewsApi';
import {
  getMessages, getAllChats, sendMessage, markRead, countUnread, totalAdminUnread,
} from '../api/chatApi';
import {
  enableGoogleTranslate,
  disableGoogleTranslate,
  hideGoogleTranslateToolbar,
} from '../utils/googleTranslate';


const AppContext = createContext();

// ─── Учётные данные admin из .env ───────────────────────────────────────────
const ADMIN_EMAIL    = import.meta.env.VITE_ADMIN_EMAIL;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;
const ADMIN_NAME     = import.meta.env.VITE_ADMIN_NAME ?? 'Администратор';

const statusPriority = {
  'Новый': 0,
  'В обработке': 1,
  'Подтвержден': 2,
  'Готово': 3,
  'Отменён': 4,
};

const sortOrders = (list = []) => [...list].sort((a, b) => {
  const aDate = new Date(a.createdAt || a.date || 0).getTime();
  const bDate = new Date(b.createdAt || b.date || 0).getTime();

  if (bDate !== aDate) return bDate - aDate;
  return (statusPriority[a.status] ?? 99) - (statusPriority[b.status] ?? 99);
});

export function AppProvider({ children }) {

  // Скрываем GT toolbar сразу при монтировании
  useEffect(() => { hideGoogleTranslateToolbar(); }, []);

  // ── Тема ─────────────────────────────────────────────────────────────────
  const [theme, setTheme] = useState(
    () => localStorage.getItem('manas_theme') || 'dark'
  );
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('manas_theme', theme);
  }, [theme]);
  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  // ── Язык ──────────────────────────────────────────────────────────────────
  // Три встроенных языка (ky/ru/en) — через собственный t().
  // Остальные 40+ языков — через Google Translate (gtLang).
  const NATIVE_LANGS = ['ky', 'ru', 'en'];

  const [lang, setLang] = useState(
    () => localStorage.getItem('manas_lang') || 'ky'
  );

  // gtLang — код для Google Translate (null = встроенный перевод)
  const [gtLang, setGtLang] = useState(
    () => {
      const saved = localStorage.getItem('manas_gt_lang');
      return saved || null;
    }
  );

  // При изменении gtLang — активируем/деактивируем Google Translate
  useEffect(() => {
    if (!gtLang) {
      // Убираем Google Translate
      disableGoogleTranslate();
    } else {
      // Активируем Google Translate
      enableGoogleTranslate(gtLang);
    }
  }, [gtLang]);

  const setLanguage = useCallback((code) => {
    if (NATIVE_LANGS.includes(code)) {
      // Встроенный язык — отключаем GT, ставим свой
      setLang(code);
      setGtLang(null);
      localStorage.setItem('manas_lang', code);
      localStorage.removeItem('manas_gt_lang');
      disableGoogleTranslate();
    } else {
      // Внешний язык — активируем GT, ставим базовый en для t()
      setLang('en');
      setGtLang(code);
      localStorage.setItem('manas_lang', 'en');
      localStorage.setItem('manas_gt_lang', code);
      enableGoogleTranslate(code);
    }
  }, []);

  const toggleLang = () => {
    const order = ['ky', 'ru', 'en'];
    const next = order[(order.indexOf(lang) + 1) % order.length];
    setLanguage(next);
  };

  // ── Авторизация ───────────────────────────────────────────────────────────
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('manas_user')); } catch { return null; }
  });

  // Список пользователей (загружается из API — нужен только для Admin)
  const [users, setUsers] = useState([]);

  const loadUsers = useCallback(async () => {
    try {
      const data = await fetchUsers();
      // Фильтруем пустые записи (старые артефакты mockapi)
      setUsers(data.filter(u => u.email));
    } catch { /* тихо — не критично */ }
  }, []);

  useEffect(() => { loadUsers(); }, [loadUsers]);

  /** Регистрация — сохраняет пользователя в mockapi */
  const register = async (name, email, password, extra = {}) => {
    if (email === ADMIN_EMAIL) return { errorKey: 'auth_email_taken' };
    try {
      const existing = await findUserByEmail(email);
      if (existing) return { errorKey: 'auth_email_taken' };
    } catch {
      return { errorKey: 'auth_server_err' };
    }
    try {
      const created = await createUser({
        name, email, password, role: 'user',
        phone:       extra.phone       || '',
        countryCode: extra.countryCode || '',
        passportImg: extra.passportImg || null,
      });
      const { password: _, ...safe } = created;
      setUser(safe);
      localStorage.setItem('manas_user', JSON.stringify(safe));
      setUsers(prev => [...prev, created]);
      return { success: true };
    } catch {
      return { errorKey: 'auth_server_err' };
    }
  };

  /** Логин — ищет пользователя в mockapi по email */
  const login = async (email, password) => {
    // Admin из .env — без запроса к API
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser = { id: 'admin', name: ADMIN_NAME, email: ADMIN_EMAIL, role: 'admin' };
      setUser(adminUser);
      localStorage.setItem('manas_user', JSON.stringify(adminUser));
      return { success: true };
    }

    // Обычный пользователь — ищем в mockapi
    try {
      const found = await findUserByEmail(email);
      if (!found || found.password !== password) {
        return { errorKey: 'auth_wrong_creds' };
      }
      const { password: _, ...safe } = found;
      setUser(safe);
      localStorage.setItem('manas_user', JSON.stringify(safe));
      return { success: true };
    } catch {
      return { errorKey: 'auth_server_err' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('manas_user');
  };

  /** Удалить пользователя (только для admin) */
  const deleteUserById = async (id) => {
    await apiDeleteUser(id);
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  // ── Корзина ───────────────────────────────────────────────────────────────
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('manas_cart') || '[]'); } catch { return []; }
  });
  useEffect(() => {
    localStorage.setItem('manas_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => setCart(prev => {
    const existing = prev.find(i => i.id === product.id);
    if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
    return [...prev, { ...product, qty: 1 }];
  });
  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id);
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };
  const clearCart = () => setCart([]);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  // ── Избранное ─────────────────────────────────────────────────────────────
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('manas_favorites') || '[]'); } catch { return []; }
  });
  useEffect(() => {
    localStorage.setItem('manas_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (product) => setFavorites(prev => {
    const exists = prev.find(i => i.id === product.id);
    return exists ? prev.filter(i => i.id !== product.id) : [...prev, product];
  });
  const isFavorite = (id) => favorites.some(i => i.id === id);

  // ── Заказы ────────────────────────────────────────────────────────────────
  const [orders, setOrders] = useState(() => {
    try { return JSON.parse(localStorage.getItem('manas_orders') || '[]'); } catch { return []; }
  });

  const loadOrders = useCallback(async () => {
    try {
      const data = sortOrders(await fetchOrders());
      setOrders(data);
      localStorage.setItem('manas_orders', JSON.stringify(data));
    } catch {
      const localOrders = sortOrders(JSON.parse(localStorage.getItem('manas_orders') || '[]'));
      setOrders(localOrders);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('manas_orders', JSON.stringify(sortOrders(orders)));
  }, [orders]);

  useEffect(() => { loadOrders(); }, [loadOrders]);

  const createOrder = async (orderData) => {
    const newOrder = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: 'new',
      ...orderData,
    };
    try {
      const saved = await apiCreateOrder(newOrder);
      const nextOrders = sortOrders([saved, ...orders]);
      setOrders(nextOrders);
      localStorage.setItem('manas_orders', JSON.stringify(nextOrders));
      return saved;
    } catch {
      const nextOrders = sortOrders([newOrder, ...orders]);
      setOrders(nextOrders);
      localStorage.setItem('manas_orders', JSON.stringify(nextOrders));
      return newOrder;
    }
  };

  /** Обновление статуса заказа (admin) */
  const updateOrderStatus = async (orderId, newStatus) => {
    const order = orders.find(o => String(o.id) === String(orderId));
    if (!order) return;
    const updated = { ...order, status: newStatus };
    try { await apiUpdateOrder(orderId, updated); } catch { /* fallback localStorage */ }
    const next = sortOrders(orders.map(o => String(o.id)===String(orderId) ? updated : o));
    setOrders(next);
    localStorage.setItem('manas_orders', JSON.stringify(next));
    // Добавляем уведомление пользователю
    if (order.userId) {
      addNotification(order.userId, { type:'order', orderId, status: newStatus, ts: new Date().toISOString() });
    }
  };

  // ── Товары — хранятся в mockapi ───────────────────────────────────────────
  const [products, setProducts]     = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError]     = useState(null);

  // Загрузка при монтировании
  const loadProducts = useCallback(async () => {
    setProductsLoading(true);
    setProductsError(null);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setProductsError(err.message);
    } finally {
      setProductsLoading(false);
    }
  }, []);

  useEffect(() => { loadProducts(); }, [loadProducts]);

  // Добавить товар → POST
  const addProduct = async (p) => {
    const created = await createProduct({
      ...p,
      price:   Number(p.price),
      stock:   Number(p.stock),
      rating:  0,
      reviews: 0,
    });
    setProducts(prev => [...prev, created]);
    return created;
  };

  // Обновить товар → PUT
  const updateProduct = async (id, data) => {
    const updated = await apiUpdateProduct(id, {
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
    });
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
    return updated;
  };

  // Удалить товар → DELETE
  const deleteProduct = async (id) => {
    await apiDeleteProduct(id);
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // ── Отзывы ────────────────────────────────────────────────────────────────
  // Держим в стейте для реактивности, синхронизируем с reviewsApi (localStorage)
  const [allReviews, setAllReviews] = useState(() => getAllReviews());

  const addReview = (productId, review) => {
    const saved = apiAddReview(productId, review);
    setAllReviews(getAllReviews());
    return saved;
  };

  const deleteReview = (productId, reviewId) => {
    apiDeleteReview(productId, reviewId);
    setAllReviews(getAllReviews());
  };

  const getReviews = (productId) => allReviews[String(productId)] || [];

  // ── Уведомления ──────────────────────────────────────────────────────────
  const [notifications, setNotifications] = useState(() => {
    try { return JSON.parse(localStorage.getItem('manas_notif') || '[]'); } catch { return []; }
  });

  const addNotification = (userId, notif) => {
    setNotifications(prev => {
      const next = [{ ...notif, id: Date.now(), userId: String(userId), read: false }, ...prev];
      localStorage.setItem('manas_notif', JSON.stringify(next));
      return next;
    });
  };

  const markNotifRead = (id) => {
    setNotifications(prev => {
      const next = prev.map(n => n.id === id ? { ...n, read: true } : n);
      localStorage.setItem('manas_notif', JSON.stringify(next));
      return next;
    });
  };

  const userNotifications = user
    ? notifications.filter(n => String(n.userId) === String(user.id))
    : [];

  // ── Чат ──────────────────────────────────────────────────────────────────
  const [chatState, setChatState] = useState(() => getAllChats());

  const refreshChat = useCallback(() => { setChatState(getAllChats()); }, []);

  const chatSend = (userId, from, text) => {
    sendMessage(userId, from, text);
    refreshChat();
  };

  const chatGetMessages = (userId) => getMessages(userId);

  const chatMarkRead = (userId, from) => {
    markRead(userId, from);
    refreshChat();
  };

  const chatUnreadForUser  = (uid) => countUnread(uid, 'user');
  const chatUnreadForAdmin = ()    => totalAdminUnread();

  return (
    <AppContext.Provider value={{
      // Тема
      theme, toggleTheme,
      // Язык
      lang, gtLang, setLanguage, toggleLang,
      // Авторизация
      user, users, login, register, logout, loadUsers, deleteUserById,
      // Корзина
      cart, addToCart, removeFromCart, updateQty, clearCart, cartTotal, cartCount,
      // Избранное
      favorites, toggleFavorite, isFavorite,
      // Заказы
      orders, createOrder, updateOrderStatus,
      // Товары (async)
      products, productsLoading, productsError,
      addProduct, updateProduct, deleteProduct, loadProducts,
      // Отзывы
      addReview, deleteReview, getReviews,
      // Уведомления
      notifications, userNotifications, addNotification, markNotifRead,
      // Чат
      chatState, chatSend, chatGetMessages, chatMarkRead,
      chatUnreadForUser, chatUnreadForAdmin, refreshChat,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
