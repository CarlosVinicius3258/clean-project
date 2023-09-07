import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from '@/presentation/pages';

export const Router: React.FC = () => {

  const Root = () => (
    <div>fdsa</div>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' Component={ Root } />
        <Route path="login" Component={ Login } />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;