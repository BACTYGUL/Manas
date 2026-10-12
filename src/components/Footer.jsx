import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const navLinks = [
  { label: 'Башкы бет',            to: '/'        },
  { label: 'Эпостун тарыхы',       to: '/history' },
  { label: 'Каармандар',           to: '/heroes'  },
  { label: 'Манастын тулпары',     to: '/horse'   },
  { label: 'Кызыктуу маалыматтар', to: '/facts'   },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">

        {/* Бренд */}
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="18" stroke="#c9a84c" strokeWidth="2"/>
              <path d="M20 6 L22 14 L30 14 L24 19 L26 27 L20 22 L14 27 L16 19 L10 14 L18 14 Z" fill="#c9a84c"/>
            </svg>
            <span className="footer__logo-text">МАНАС ЭПОСУ</span>
          </Link>
          <p className="footer__tagline">Улуттук мурас — биздин келечегибиз!</p>
        </div>

        {/* Навигация */}
        <nav className="footer__nav">
          {navLinks.map((link, i) => (
            <React.Fragment key={link.to}>
              <Link to={link.to} className="footer__nav-link">
                {link.label}
              </Link>
              {i < navLinks.length - 1 && <span className="footer__divider">|</span>}
            </React.Fragment>
          ))}
        </nav>

        {/* Соцсети */}
        <div className="footer__social">
          <a href="#" className="footer__social-link" aria-label="Instagram">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
          </a>
          <a href="#" className="footer__social-link" aria-label="YouTube">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
              <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
            </svg>
          </a>
          <a href="#" className="footer__social-link" aria-label="Telegram">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M21.99 4.5L2.01 11.72a.5.5 0 0 0 .02.95l4.97 1.54 1.92 6.01a.5.5 0 0 0 .82.22l2.74-2.52 5.25 3.86a.5.5 0 0 0 .79-.32l2.98-16.1a.5.5 0 0 0-.51-.86z"/>
            </svg>
          </a>
        </div>

      </div>
    </footer>
  );
}
