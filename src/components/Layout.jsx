import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  const { pathname } = useLocation();
  const isAdminPage = pathname.startsWith('/admin');

  // Прокрутка вверх при смене страницы
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <>
      {!isAdminPage && <Header />}
      <Outlet />
      {!isAdminPage && <Footer />}
    </>
  );
}
