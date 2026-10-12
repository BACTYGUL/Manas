import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Header.css';

const NAV = [
  { label: { ky: 'Башкы бет',           ru: 'Главная' },       path: '/'        },
  { label: { ky: 'Эпостун тарыхы',      ru: 'История эпоса' }, path: '/history' },
  { label: { ky: 'Каармандар',          ru: 'Персонажи' },     path: '/heroes'  },
  { label: { ky: 'Дүкөн',              ru: 'Магазин' },       path: '/shop'    },
];

export default function Header() {
  const navigate = useNavigate();
  const { theme, toggleTheme, lang, toggleLang, user, logout, cartCount } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header" data-light={theme === 'light' ? 'true' : undefined}>
      <div className="header__inner">

        {/* Logo */}
        <div
          className="header__logo"
          onClick={() => { navigate('/'); closeMenu(); }}
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && navigate('/')}
        >
          <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="18" stroke="#c9a84c" strokeWidth="2"/>
            <path d="M20 6 L22 14 L30 14 L24 19 L26 27 L20 22 L14 27 L16 19 L10 14 L18 14 Z" fill="#c9a84c"/>
          </svg>
          <span className="header__logo-text">МАНАС ЭПОСУ</span>
        </div>

        {/* Nav — NavLink автоматически добавляет класс active */}
        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          {NAV.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}          /* exact match только для главной */
              className={({ isActive }) =>
                `header__nav-link${isActive ? ' header__nav-link--active' : ''}`
              }
              onClick={closeMenu}
            >
              {link.label[lang]}
            </NavLink>
          ))}
        </nav>

        {/* Controls */}
        <div className="header__controls">
          {/* Переключатель языка */}
          <button className="header__ctrl-btn" onClick={toggleLang} title="Тил / Язык">
            {lang === 'ky' ? 'RU' : 'КЫ'}
          </button>

          {/* Переключатель темы */}
          <button className="header__ctrl-btn" onClick={toggleTheme} title="Тема">
            {theme === 'dark' ? '☀' : '🌙'}
          </button>

          {/* Корзина */}
          <button
            className="header__cart-btn"
            onClick={() => { navigate('/cart'); closeMenu(); }}
            aria-label="Корзина"
          >
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
              {/* Аватар: admin → /admin, обычный → /profile (или просто показываем имя) */}
              <button
                className="header__user-btn"
                onClick={() => {
                  if (user.role === 'admin') {
                    navigate('/admin');
                    closeMenu();
                  }
                }}
                title={user.name}
                style={{ cursor: user.role === 'admin' ? 'pointer' : 'default' }}
              >
                <span className={`header__user-avatar ${user.role === 'admin' ? 'header__user-avatar--admin' : ''}`}>
                  {user.name[0]?.toUpperCase()}
                </span>
              </button>
              <button className="header__ctrl-btn header__logout" onClick={logout} title="Чыгуу / Выйти">
                ⏻
              </button>
            </div>
          ) : (
            <button
              className="header__ctrl-btn header__login-btn"
              onClick={() => { navigate('/auth'); closeMenu(); }}
            >
              {lang === 'ky' ? 'Кирүү' : 'Войти'}
            </button>
          )}
        </div>

        {/* Burger */}
        <button
          className={`header__burger ${menuOpen ? 'header__burger--open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Меню"
        >
          <span/><span/><span/>
        </button>

      </div>
    </header>
  );
}
