import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

/**
 * Защищённый маршрут — пропускает только пользователей с role === 'admin'.
 * Все остальные (в т.ч. незалогиненные) получают редирект на главную.
 */
export default function RequireAdmin({ children }) {
  const { user } = useApp();

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
}
