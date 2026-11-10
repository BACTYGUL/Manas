import React from 'react';
import { t } from '../i18n/translations';

const NAV_ITEMS = [
  { id: 'dashboard', labelKey: 'admin_dashboard' },
  { id: 'products',  labelKey: 'admin_products_tab' },
  { id: 'orders',    labelKey: 'admin_orders_tab' },
  { id: 'users',     labelKey: 'admin_users_tab' },
  { id: 'reviews',   labelKey: 'admin_reviews_tab' },
];

export default function AdminSidebar({ lang, tab, onTab, user }) {
  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <div className="brand-mark">M</div>
        <span>{t('admin_brand', lang)}</span>
      </div>
      <nav className="admin-nav">
        {NAV_ITEMS.map(item => (
          <button key={item.id} type="button"
            className={`admin-nav__item ${tab===item.id ? 'active' : ''}`}
            onClick={() => onTab(item.id)}>
            {t(item.labelKey, lang)}
          </button>
        ))}
      </nav>
      <div className="admin-userbox">
        <div className="admin-userbox__avatar">{user?.name?.[0]?.toUpperCase() || 'A'}</div>
        <div>
          <strong>{user?.name}</strong>
          <small>{user?.role === 'admin' ? t('role_admin', lang) : t('role_user', lang)}</small>
        </div>
      </div>
    </aside>
  );
}
