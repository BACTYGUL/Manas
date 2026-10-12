import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { router } from './router';
import './App.css';

export default function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}
