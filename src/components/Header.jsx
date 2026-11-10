import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { t } from '../i18n/translations';
import LogoSVG from './LogoSVG';
import LangSwitcher from './LangSwitcher';
import './Header.css';

const NAV = [
  { labelKey: 'nav_home',    path: '/'        },
  { labelKey: 'nav_history', path: '/history' },
  { labelKey: 'nav_heroes',  path: '/heroes'  },
  { labelKey: 'nav_shop',    path: '/shop'    },
  { labelKey: 'nav_reviews', path: '/reviews' },
];

export default function Header() {
  const navigate = useNavigate();
  const {
    theme, toggleTheme,
    lang, gtLang, setLanguage,
    user, logout, cartCount,
  } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  // Текущий язык для LangSwitcher (если GT активен — показываем GT-язык)
  const currentLangCode = gtLang || lang;

  return (
    <header className="header" data-light={theme === 'light' ? 'true' : undefined}>
      <div className="header__inner">

        {/* Логотип */}
        <div className="header__logo"
          onClick={() => { navigate('/'); close(); }}
          role="button" tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && navigate('/')}>
          <LogoSVG size={36} />
          <span className="header__logo-text">{t('logo_name', lang)}</span>
        </div>

        {/* Навигация */}
        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          {NAV.map(link => (
            <NavLink key={link.path} to={link.path} end={link.path === '/'}
              className={({ isActive }) =>
                `header__nav-link${isActive ? ' header__nav-link--active' : ''}`}
              onClick={close}>
              {t(link.labelKey, lang)}
            </NavLink>
          ))}
        </nav>

        {/* Управление */}
        <div className="header__controls">

          {/* Переключатель языков с флагами */}
          <LangSwitcher
            currentLang={currentLangCode}
            onChangeLang={setLanguage}
            displayLang={lang}
          />

          {/* Тема */}
          <button className="header__ctrl-btn" onClick={toggleTheme} title="Theme">
            {theme === 'dark' ? '☀' : '🌙'}
          </button>

          {/* Корзина */}
          <button className="header__cart-btn"
            onClick={() => { navigate('/cart'); close(); }}
            aria-label={t('nav_cart', lang)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {cartCount > 0 && <span className="header__cart-badge">{cartCount}</span>}
          </button>

          {/* Пользователь */}
          {user ? (
            <div className="header__user">
              <button className="header__user-btn"
                onClick={() => { if (user.role === 'admin') { navigate('/admin'); close(); } }}
                title={user.name}
                style={{ cursor: user.role === 'admin' ? 'pointer' : 'default' }}>
                <span className={`header__user-avatar${user.role === 'admin' ? ' header__user-avatar--admin' : ''}`}>
                  {user.name[0]?.toUpperCase()}
                </span>
              </button>
              <button className="header__ctrl-btn header__logout"
                onClick={logout}
                title={t('nav_logout', lang)}>
                ⏻
              </button>
            </div>
          ) : (
            <button className="header__ctrl-btn header__login-btn"
              onClick={() => { navigate('/auth'); close(); }}>
              {t('nav_login', lang)}
            </button>
          )}
        </div>

        {/* Бургер */}
        <button
          className={`header__burger ${menuOpen ? 'header__burger--open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Menu">
          <span /><span /><span />
        </button>

      </div>
    </header>
  );
}
