import React from 'react';
import { createRoot } from "react-dom/client";
import { Router } from '@/presentation/components';
import '@/presentation/styles/globals.scss';
const root = createRoot(document.getElementById('main'));


root.render(
  <>
    <Router />
  </>
);