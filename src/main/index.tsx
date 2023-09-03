import React from 'react';
import { Login } from '@/presentation/pages/';
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById('main'));


root.render(
  <>
    <Login />
  </>
);