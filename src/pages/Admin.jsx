import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Admin.css';

const EMPTY = { title: '', titleRu: '', category: 'Китептер', price: '', stock: '', desc: '', descRu: '', image: 'book' };
const CATS = ['Китептер', 'Сувенирлер', 'Кийим', 'Музыка'];
const NAV = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'products', label: 'Products' },
  { id: 'orders', label: 'Orders' },
  { id: 'users', label: 'Users' },
];

export default function Admin() {
  const navigate = useNavigate();
  const {
    user,
    users = [],
    products = [],
    productsLoading,
    productsError,
    addProduct,
    updateProduct,
    deleteProduct,
    orders = [],
    lang,
    loadUsers,
    deleteUserById,
  } = useApp();

  const T = (ky, ru) => (lang === 'ky' ? ky : ru);

  const [tab, setTab] = useState('dashboard');
  const [search, setSearch] = useState('');
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [message, setMessage] = useState('');

  // RequireAdmin в router.jsx уже гарантирует что сюда попадает только admin.
  // Дополнительная проверка на случай прямого использования компонента:
  if (!user || user.role !== 'admin') {
    return null; // RequireAdmin сделает редирект, это просто страховка
  }

  const filteredProducts = useMemo(() => {
    const q = search.toLowerCase();
    return products.filter((item) => {
      const title = (item.title || '').toLowerCase();
      const ru = (item.titleRu || '').toLowerCase();
      return title.includes(q) || ru.includes(q);
    });
  }, [products, search]);

  const totalRevenue = products.reduce((sum, p) => sum + Number(p.price || 0) * Number(p.reviews || 0), 0);
  const totalStock = products.reduce((sum, p) => sum + Number(p.stock || 0), 0);

  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({ ...EMPTY, ...product });
    setTab('products');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const data = { ...form, price: Number(form.price), stock: Number(form.stock) };

    if (editingId) {
      await updateProduct(editingId, data);
      setMessage(T('Сакталды!', 'Saved!'));
    } else {
      await addProduct(data);
      setMessage(T('Товар кошулду', 'Product added'));
    }

    setForm(EMPTY);
    setEditingId(null);
    setTimeout(() => setMessage(''), 1400);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setDeleteId(null);
  };

  const sortedOrders = useMemo(
    () => [...orders].sort((a, b) => {
      const aDate = new Date(a.createdAt || a.date || 0).getTime();
      const bDate = new Date(b.createdAt || b.date || 0).getTime();
      if (bDate !== aDate) return bDate - aDate;
      const statusPriority = { 'Новый': 0, 'В обработке': 1, 'Подтвержден': 2, 'Готово': 3, 'Отменён': 4 };
      return (statusPriority[a.status] ?? 99) - (statusPriority[b.status] ?? 99);
    }),
    [orders]
  );

  const summaryCards = [
    { label: T('Товарлар', 'Products'), value: products.length, tone: 'teal' },
    { label: T('Заказы', 'Orders'), value: sortedOrders.length, tone: 'gold' },
    { label: T('Пользователи', 'Users'), value: users.length, tone: 'blue' },
    { label: T('Запас', 'Stock'), value: totalStock, tone: 'orange' },
  ];

  return (
    <main className="admin-page">
      <div className="admin-shell">
        <aside className="admin-sidebar">
          <div className="admin-brand">
            <div className="brand-mark">M</div>
            <span>Manas Admin</span>
          </div>

          <nav className="admin-nav">
            {NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`admin-nav__item ${tab === item.id ? 'active' : ''}`}
                onClick={() => setTab(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="admin-userbox">
            <div className="admin-userbox__avatar">{user.name?.[0]?.toUpperCase() || 'A'}</div>
            <div>
              <strong>{user.name}</strong>
              <small>{user.role === 'admin' ? 'Admin' : 'User'}</small>
            </div>
          </div>
        </aside>

        <section className="admin-main">
          <header className="admin-topbar">
            <div className="admin-page-title">
              <span className="inner-page__breadcrumb" onClick={() => navigate('/')}>
                ← {T('Башкы бет', 'Главная')}
              </span>
              <h1>{T('Админ панель', 'Admin panel')}</h1>
            </div>
          </header>

          {tab === 'dashboard' && (
            <>
              <div className="admin-hero">
                <h2>{T('Dashboard', 'Dashboard')}</h2>
                <p>{T('Обзор магазина', 'Store overview')}</p>
              </div>

              <div className="admin-stats-grid">
                {summaryCards.map((card) => (
                  <div key={card.label} className={`admin-stat-card admin-stat-card--${card.tone}`}>
                    <div className="admin-stat-card__label">{card.label}</div>
                    <div className="admin-stat-card__value">{card.value}</div>
                  </div>
                ))}
              </div>

              <div className="admin-dashboard-row">
                <div className="admin-panel">
                  <h3>{T('Товары', 'Products')}</h3>
                  <div className="mini-list">
                    {products.slice(0, 5).map((item) => (
                      <div key={item.id} className="mini-row">
                        <span>{item.title}</span>
                        <strong>{Number(item.price || 0)} сом</strong>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="admin-panel">
                  <h3>{T('Заказы', 'Orders')}</h3>
                  <div className="mini-list">
                    {sortedOrders.slice(0, 5).map((item) => (
                      <div key={item.id} className="mini-row">
                        <span>{item.customerName || 'Клиент'}</span>
                        <strong>{Number(item.total || 0)} сом</strong>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="admin-panel">
                  <h3>{T('Пользователи', 'Users')}</h3>
                  <div className="mini-list">
                    {users.slice(0, 5).map((item) => (
                      <div key={item.id || item.email} className="mini-row">
                        <span>{item.name || item.email}</span>
                        <strong>{item.role || 'user'}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {tab === 'products' && (
            <div className="admin-content-panel">
              <div className="admin-section-header">
                <h2>{T('Товары', 'Products')}</h2>
                <div className="admin-toolbar">
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={T('Поиск...', 'Search...')}
                  />
                </div>
              </div>

              {productsLoading && <div className="admin-empty">{T('Загрузка...', 'Loading...')}</div>}
              {productsError && <div className="admin-error">{productsError}</div>}

              {!productsLoading && !productsError && (
                <div className="admin-products-grid">
                  <div className="admin-form-wrap">
                    <form className="admin-form" onSubmit={handleSave}>
                      <h3>{editingId ? T('Редактировать товар', 'Edit product') : T('Добавить товар', 'Add product')}</h3>

                      <div className="admin-form-grid">
                        <div className="admin-form-field">
                          <label>{T('Название (кырг.)', 'Name (ky)')}</label>
                          <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required />
                        </div>
                        <div className="admin-form-field">
                          <label>{T('Название (рус.)', 'Name (ru)')}</label>
                          <input value={form.titleRu} onChange={(e) => setForm((f) => ({ ...f, titleRu: e.target.value }))} />
                        </div>
                        <div className="admin-form-field">
                          <label>{T('Категория', 'Category')}</label>
                          <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                            {CATS.map((item) => <option key={item} value={item}>{item}</option>)}
                          </select>
                        </div>
                        <div className="admin-form-field">
                          <label>{T('Тип картинки', 'Image type')}</label>
                          <select value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}>
                            {['book', 'book2', 'book3', 'book4', 'souvenir', 'horse', 'cloth', 'poster', 'ornament', 'mug', 'music', 'scarf'].map((item) => (
                              <option key={item} value={item}>{item}</option>
                            ))}
                          </select>
                        </div>
                        <div className="admin-form-field">
                          <label>{T('Цена', 'Price')}</label>
                          <input type="number" min="0" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} required />
                        </div>
                        <div className="admin-form-field">
                          <label>{T('Остаток', 'Stock')}</label>
                          <input type="number" min="0" value={form.stock} onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))} required />
                        </div>
                        <div className="admin-form-field admin-form-field--full">
                          <label>{T('Описание (кырг.)', 'Description (ky)')}</label>
                          <textarea rows={3} value={form.desc} onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))} />
                        </div>
                        <div className="admin-form-field admin-form-field--full">
                          <label>{T('Описание (рус.)', 'Description (ru)')}</label>
                          <textarea rows={3} value={form.descRu} onChange={(e) => setForm((f) => ({ ...f, descRu: e.target.value }))} />
                        </div>
                      </div>

                      {message && <p className="admin-saved">{message}</p>}

                      <div className="admin-form-btns">
                        <button type="submit" className="btn-gold">
                          {editingId ? T('Сохранить', 'Save') : T('Добавить', 'Add')}
                        </button>
                        {editingId && (
                          <button type="button" className="btn-outline" onClick={() => { setEditingId(null); setForm(EMPTY); }}>
                            {T('Отмена', 'Cancel')}
                          </button>
                        )}
                      </div>
                    </form>
                  </div>

                  <div className="admin-list-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>{T('Товар', 'Product')}</th>
                          <th>{T('Категория', 'Category')}</th>
                          <th>{T('Цена', 'Price')}</th>
                          <th>{T('Остаток', 'Stock')}</th>
                          <th>{T('Действия', 'Actions')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts.map((item) => (
                          <tr key={item.id}>
                            <td>#{item.id}</td>
                            <td>{lang === 'ky' ? item.title : (item.titleRu || item.title)}</td>
                            <td>{item.category}</td>
                            <td>{item.price} сом</td>
                            <td>{item.stock}</td>
                            <td>
                              <div className="admin-actions">
                                <button type="button" className="admin-btn-edit" onClick={() => handleEdit(item)}>✏</button>
                                {deleteId === item.id ? (
                                  <>
                                    <button type="button" className="admin-btn-confirm" onClick={() => handleDelete(item.id)}>✓</button>
                                    <button type="button" className="admin-btn-cancel" onClick={() => setDeleteId(null)}>✕</button>
                                  </>
                                ) : (
                                  <button type="button" className="admin-btn-del" onClick={() => setDeleteId(item.id)}>🗑</button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === 'orders' && (
            <div className="admin-content-panel">
              <div className="admin-section-header">
                <h2>{T('Заказы', 'Orders')}</h2>
              </div>

              <div className="admin-list-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>{T('Клиент', 'Customer')}</th>
                      <th>{T('Телефон', 'Phone')}</th>
                      <th>{T('Адрес', 'Address')}</th>
                      <th>{T('Сумма', 'Total')}</th>
                      <th>{T('Статус', 'Status')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedOrders.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="admin-empty">{T('Заказов пока нет', 'No orders yet')}</td>
                      </tr>
                    ) : (
                      sortedOrders.map((item) => (
                        <tr key={item.id}>
                          <td>#{item.id}</td>
                          <td>{item.customerName || 'Client'}</td>
                          <td>{item.phone || '-'}</td>
                          <td>{item.address || '-'}</td>
                          <td>{Number(item.total || 0)} сом</td>
                          <td><span className="status-tag">{item.status || 'Новый'}</span></td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === 'users' && (
            <div className="admin-content-panel">
              <div className="admin-section-header">
                <h2>{T('Пользователи', 'Users')}</h2>
              </div>

              <div className="admin-list-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>{T('Имя', 'Name')}</th>
                      <th>Email</th>
                      <th>{T('Роль', 'Role')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((item) => (
                      <tr key={item.id || item.email}>
                        <td>{item.id || '—'}</td>
                        <td>{item.name || '—'}</td>
                        <td>{item.email}</td>
                        <td>{item.role || 'user'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

