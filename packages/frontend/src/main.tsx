import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { BrowserRouter } from 'react-router-dom';

import { Api } from './lib/api.ts';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
///@ts-ignore
window.api = Api.instance;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
