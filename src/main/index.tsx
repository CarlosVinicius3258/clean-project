import React from 'react';
import ReactDOM from 'react-dom';
import Login from '@/presentation/pages/login/login';
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById('main'));


root.render(
  <>
    <Login />
  </>
);