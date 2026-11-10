import React, { useMemo, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { t, getProductTitle } from '../i18n/translations';
import AdminSidebar from '../components/AdminSidebar';
import AdminProductForm, { EMPTY } from '../components/AdminProductForm';
import AdminTable from '../components/AdminTable';
import './Admin.css';

const STATUS_KEYS = ['new','accepted','processing','shipped','done','cancelled'];
const STATUS_TRANS = {
  new:        'order_status_new',
  accepted:   'order_status_accepted',
  processing: 'order_status_processing',
  shipped:    'order_status_shipped',
  done:       'order_status_done',
  cancelled:  'order_status_cancelled',
};

function fmt(ts) {
  if (!ts) return '—';
  return new Date(ts).toLocaleString([], {day:'2-digit',month:'2-digit',year:'2-digit',hour:'2-digit',minute:'2-digit'});
}

export default function Admin() {
  const navigate = useNavigate();
  const {
    user, users=[], products=[], productsLoading, productsError,
    addProduct, updateProduct, deleteProduct, orders=[], lang,
    updateOrderStatus, chatState, chatSend, chatMarkRead,
    chatGetMessages, chatUnreadForAdmin, getReviews,
    addReview, deleteReview,
  } = useApp();

  const [tab,        setTab]        = useState('dashboard');
  const [search,     setSearch]     = useState('');
  const [form,       setForm]       = useState(EMPTY);
  const [editingId,  setEditingId]  = useState(null);
  const [deleteId,   setDeleteId]   = useState(null);
  const [message,    setMessage]    = useState('');
  // Чат
  const [chatUserId, setChatUserId] = useState(null);
  const [chatText,   setChatText]   = useState('');
  const chatBottomRef = useRef(null);
  // Отзывы
  const [reviewDelId, setReviewDelId] = useState(null);

  if (!user || user.role !== 'admin') return null;

  /* ── Фильтры ── */
  const filteredProducts = useMemo(() => {
    const q = search.toLowerCase();
    return products.filter(p =>
      (p.title||'').toLowerCase().includes(q) ||
      (p.titleRu||'').toLowerCase().includes(q));
  }, [products, search]);

  const totalStock = products.reduce((s,p)=>s+Number(p.stock||0),0);

  const sortedOrders = useMemo(()=>[...orders].sort((a,b)=>new Date(b.createdAt||0)-new Date(a.createdAt||0)),[orders]);

  /* ── Все отзывы ── */
  const allReviews = useMemo(() => {
    const res = [];
    products.forEach(p => {
      const revs = getReviews(p.id);
      revs.forEach(r => res.push({ ...r, productTitle: p.title, productId: p.id }));
    });
    return res.sort((a,b)=>new Date(b.createdAt||b.date||0)-new Date(a.createdAt||a.date||0));
  }, [products, getReviews]);

  /* ── Чат ── */
  const chatUserIds = Object.keys(chatState||{}).filter(uid=>chatState[uid]?.length>0);
  const chatMsgs    = chatUserId ? chatGetMessages(chatUserId) : [];
  const totalUnread = chatUnreadForAdmin();

  useEffect(()=>{ chatBottomRef.current?.scrollIntoView({behavior:'smooth'}); },[chatMsgs]);

  const handleSend = e => {
    e.preventDefault();
    if (!chatText.trim()||!chatUserId) return;
    chatSend(chatUserId, 'admin', chatText);
    setChatText('');
  };

  const openChat = uid => {
    setChatUserId(uid);
    chatMarkRead(uid, 'user');
  };

  /* ── Сохранение товара ── */
  const handleSave = async e => {
    e.preventDefault();
    const data = { ...form, price:Number(form.price), stock:Number(form.stock) };
    if (editingId) { await updateProduct(editingId, data); setMessage(t('admin_saved',lang)); }
    else           { await addProduct(data);               setMessage(t('admin_product_added',lang)); }
    setForm(EMPTY); setEditingId(null);
    setTimeout(()=>setMessage(''),1400);
  };

  const handleEdit = p => { setEditingId(p.id); setForm({...EMPTY,...p}); setTab('products'); };

  const summaryCards = [
    { label:t('admin_products_tab',lang), value:products.length,      tone:'teal'   },
    { label:t('admin_orders_tab',lang),   value:sortedOrders.length,  tone:'gold'   },
    { label:t('admin_users_tab',lang),    value:users.length,         tone:'blue'   },
    { label:t('chat_tab',lang),           value:totalUnread,          tone:'orange' },
  ];

  const getUserName = uid => {
    const u = users.find(u=>String(u.id)===String(uid));
    return u ? (u.name||u.email) : `User #${uid}`;
  };

  return (
    <main className="admin-page">
      <div className="admin-shell">
        <AdminSidebar lang={lang} tab={tab} onTab={setTab} user={user}/>

        <section className="admin-main">
          <header className="admin-topbar">
            <div className="admin-page-title">
              <span className="inner-page__breadcrumb" onClick={()=>navigate('/')}>
                ← {t('breadcrumb_home',lang)}
              </span>
              <h1>{t('admin_panel',lang)}</h1>
            </div>
          </header>

          {/* ── DASHBOARD ── */}
          {tab==='dashboard' && (
            <>
              <div className="admin-hero">
                <h2>{t('admin_dashboard',lang)}</h2>
                <p>{t('admin_overview',lang)}</p>
              </div>
              <div className="admin-stats-grid">
                {summaryCards.map(c=>(
                  <div key={c.label} className={`admin-stat-card admin-stat-card--${c.tone}`}>
                    <div className="admin-stat-card__label">{c.label}</div>
                    <div className="admin-stat-card__value">{c.value}</div>
                  </div>
                ))}
              </div>
              <div className="admin-dashboard-row">
                <div className="admin-panel">
                  <h3>{t('admin_products_tab',lang)}</h3>
                  <div className="mini-list">
                    {products.slice(0,5).map(p=>(
                      <div key={p.id} className="mini-row">
                        <span>{getProductTitle(p, lang)}</span>
                        <strong>{p.price} {t('som',lang)}</strong>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="admin-panel">
                  <h3>{t('admin_orders_tab',lang)}</h3>
                  <div className="mini-list">
                    {sortedOrders.slice(0,5).map(o=>(
                      <div key={o.id} className="mini-row">
                        <span>{o.customerName||t('admin_customer',lang)}</span>
                        <span className="status-tag-sm">{t(STATUS_TRANS[o.status]||'order_status_new',lang)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="admin-panel">
                  <h3>{t('admin_users_tab',lang)}</h3>
                  <div className="mini-list">
                    {users.slice(0,5).map(u=>(
                      <div key={u.id||u.email} className="mini-row">
                        <span>{u.name||u.email}</span>
                        <strong>{u.role||'user'}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── ТОВАРЫ ── */}
          {tab==='products' && (
            <div className="admin-content-panel">
              <div className="admin-section-header">
                <h2>{t('admin_products_tab',lang)}</h2>
                <div className="admin-toolbar">
                  <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t('admin_search',lang)}/>
                </div>
              </div>
              {productsLoading && <div className="admin-empty">{t('admin_loading',lang)}</div>}
              {productsError   && <div className="admin-error">{productsError}</div>}
              {!productsLoading && !productsError && (
                <div className="admin-products-grid">
                  <AdminProductForm lang={lang} form={form} setForm={setForm}
                    editingId={editingId} message={message} onSave={handleSave}
                    onCancel={()=>{setEditingId(null);setForm(EMPTY);}}/>
                  <AdminTable
                    columns={[
                      {key:'id',label:'ID',render:r=>`#${r.id}`},
                      {key:'title',label:t('admin_product_col',lang),render:r=>getProductTitle(r, lang)},
                      {key:'category',label:t('admin_category',lang),render:r=>t({
                        Books:'cat_books_short',
                        Souvenirs:'cat_sov_short',
                        Clothing:'cat_cloth_short',
                        Music:'cat_music_short',
                        'Китептер':'cat_books_short',
                        'Сувенирлер':'cat_sov_short',
                        'Кийим':'cat_cloth_short',
                        'Музыка':'cat_music_short',
                      }[r.category]||'cat_all',lang)},
                      {key:'price',label:t('admin_price',lang),render:r=>`${r.price} ${t('som',lang)}`},
                      {key:'stock',label:t('admin_stock_field',lang)},
                    ]}
                    rows={filteredProducts}
                    actions={item=>(
                      <div className="admin-actions">
                        <button type="button" className="admin-btn-edit" onClick={()=>handleEdit(item)}>✏</button>
                        {deleteId===item.id ? (
                          <>
                            <button type="button" className="admin-btn-confirm" onClick={async()=>{await deleteProduct(item.id);setDeleteId(null);}}>✓</button>
                            <button type="button" className="admin-btn-cancel" onClick={()=>setDeleteId(null)}>✕</button>
                          </>
                        ) : (
                          <button type="button" className="admin-btn-del" onClick={()=>setDeleteId(item.id)}>🗑</button>
                        )}
                      </div>
                    )}
                    emptyMsg={t('shop_empty',lang)}
                  />
                </div>
              )}
            </div>
          )}

          {/* ── ЗАКАЗЫ ── */}
          {tab==='orders' && (
            <div className="admin-content-panel">
              <div className="admin-section-header"><h2>{t('admin_orders_tab',lang)}</h2></div>
              <div className="orders-list">
                {sortedOrders.length===0
                  ? <p className="admin-empty">{t('admin_no_orders',lang)}</p>
                  : sortedOrders.map(o=>(
                    <div key={o.id} className="order-card">
                      <div className="order-card__head">
                        <span className="order-card__id">#{o.id}</span>
                        <span className="order-card__date">{fmt(o.createdAt)}</span>
                        <span className={`status-tag status-tag--${o.status||'new'}`}>
                          {t(STATUS_TRANS[o.status]||'order_status_new',lang)}
                        </span>
                      </div>
                      <div className="order-card__body">
                        <p><strong>{t('admin_customer',lang)}:</strong> {o.customerName||'—'} | {o.phone||'—'}</p>
                        <p><strong>{t('admin_address',lang)}:</strong> {o.address||'—'}</p>
                        <p><strong>{t('cart_total',lang)}:</strong> {Number(o.total||0)} {t('som',lang)}</p>
                      </div>
                      <div className="order-card__status">
                        <label>{t('order_change_status',lang)}:</label>
                        <select
                          value={o.status||'new'}
                          onChange={async e=>{ await updateOrderStatus(o.id, e.target.value); }}
                          className="status-select"
                        >
                          {STATUS_KEYS.map(s=>(
                            <option key={s} value={s}>{t(STATUS_TRANS[s],lang)}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          )}

          {/* ── ПОЛЬЗОВАТЕЛИ ── */}
          {tab==='users' && (
            <div className="admin-content-panel">
              <div className="admin-section-header"><h2>{t('admin_users_tab',lang)}</h2></div>
              <AdminTable
                columns={[
                  {key:'id',label:'ID',render:r=>r.id||'—'},
                  {key:'name',label:t('admin_name_col',lang),render:r=>r.name||'—'},
                  {key:'email',label:'Email'},
                  {key:'countryCode',label:t('auth_country',lang),render:r=>r.countryCode||'—'},
                  {key:'phone',label:t('auth_phone',lang),render:r=>r.phone||'—'},
                  {key:'role',label:t('admin_role',lang),render:r=>r.role||'user'},
                ]}
                rows={users}
                emptyMsg="—"
              />
            </div>
          )}

          {/* ── ОТЗЫВЫ ── */}
          {tab==='reviews' && (
            <div className="admin-content-panel">
              <div className="admin-section-header"><h2>{t('admin_reviews_tab',lang)}</h2></div>
              {allReviews.length===0
                ? <p className="admin-empty">{t('admin_no_reviews',lang)}</p>
                : (
                  <div className="reviews-admin-list">
                    {allReviews.map(r=>(
                      <div key={r.id} className="review-admin-card">
                        <div className="review-admin-card__head">
                          <div className="review-avatar">{(r.userName||'?')[0].toUpperCase()}</div>
                          <div>
                            <strong>{r.userName}</strong>
                            <span className="review-date">{r.date}</span>
                          </div>
                          <div className="ra-stars">{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</div>
                          <span className="ra-product">{r.productTitle}</span>
                          <div className="ra-actions">
                            {reviewDelId===r.id ? (
                              <>
                                <button className="admin-btn-confirm" onClick={()=>{deleteReview(r.productId,r.id);setReviewDelId(null);}}>✓</button>
                                <button className="admin-btn-cancel" onClick={()=>setReviewDelId(null)}>✕</button>
                              </>
                            ) : (
                              <button className="admin-btn-del" onClick={()=>setReviewDelId(r.id)}>🗑</button>
                            )}
                          </div>
                        </div>
                        <p className="review-text">{r.text}</p>
                      </div>
                    ))}
                  </div>
                )
              }
            </div>
          )}

          {/* ── ЧАТ ── */}
          {tab==='chat' && (
            <div className="admin-content-panel admin-chat-panel">
              <div className="admin-section-header"><h2>{t('chat_title',lang)} {totalUnread>0&&<span className="chat-unread-badge">{totalUnread}</span>}</h2></div>
              <div className="admin-chat-layout">
                {/* Список пользователей */}
                <div className="admin-chat-users">
                  <h4>{t('chat_all_chats',lang)}</h4>
                  {chatUserIds.length===0
                    ? <p className="admin-empty" style={{fontSize:13}}>{t('chat_empty',lang)}</p>
                    : chatUserIds.map(uid=>{
                      const msgs = chatGetMessages(uid);
                      const unread = msgs.filter(m=>m.from==='user'&&!m.read).length;
                      const last = msgs[msgs.length-1];
                      return (
                        <button key={uid}
                          className={`chat-user-btn ${chatUserId===uid?'active':''}`}
                          onClick={()=>openChat(uid)}>
                          <div className="chat-user-avatar">{getUserName(uid)[0]?.toUpperCase()||'U'}</div>
                          <div className="chat-user-info">
                            <strong>{getUserName(uid)}</strong>
                            <span>{last?.text?.slice(0,30)||''}</span>
                          </div>
                          {unread>0 && <span className="chat-unread-badge">{unread}</span>}
                        </button>
                      );
                    })
                  }
                </div>

                {/* Диалог */}
                <div className="admin-chat-dialog">
                  {!chatUserId
                    ? <p className="admin-empty" style={{margin:'auto'}}>{t('chat_select_user',lang)}</p>
                    : (
                      <>
                        <div className="admin-chat-msgs">
                          {chatMsgs.map(m=>(
                            <div key={m.id} className={`chat-msg chat-msg--${m.from}`}>
                              <div className="chat-bubble">
                                <p>{m.text}</p>
                                <span className="chat-time">{fmt(m.ts)}</span>
                              </div>
                            </div>
                          ))}
                          <div ref={chatBottomRef}/>
                        </div>
                        <form className="chat-input-row" onSubmit={handleSend}>
                          <input value={chatText} onChange={e=>setChatText(e.target.value)}
                            placeholder={t('chat_placeholder',lang)} className="chat-input"/>
                          <button type="submit" className="chat-send-btn" disabled={!chatText.trim()}>
                            {t('chat_send',lang)}
                          </button>
                        </form>
                      </>
                    )
                  }
                </div>
              </div>
            </div>
          )}

        </section>
      </div>
    </main>
  );
}
