import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout      from './components/Layout';
import RequireAdmin from './components/RequireAdmin';
import Home        from './pages/Home';
import EposHistory from './pages/EposHistory';
import Heroes      from './pages/Heroes';
import Horse       from './pages/Horse';
import Facts       from './pages/Facts';
import Shop        from './pages/Shop';
import Detail      from './pages/Detail';
import Cart        from './pages/Cart';
import Auth        from './pages/Auth';
import Admin       from './pages/Admin';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true,      element: <Home /> },
      { path: 'history',  element: <EposHistory /> },
      { path: 'heroes',   element: <Heroes /> },
      { path: 'horse',    element: <Horse /> },
      { path: 'facts',    element: <Facts /> },
      { path: 'shop',     element: <Shop /> },
      { path: 'shop/:id', element: <Detail /> },
      { path: 'cart',     element: <Cart /> },
      { path: 'auth',     element: <Auth /> },
      {
        path: 'admin',
        element: (
          <RequireAdmin>
            <Admin />
          </RequireAdmin>
        ),
      },
    ],
  },
]);
