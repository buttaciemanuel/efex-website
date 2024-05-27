import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import i18n from './assets/translations/i18n';
import { I18nextProvider } from 'react-i18next';

import "@fontsource/montserrat"
import "@fontsource/montserrat/100.css"
import "@fontsource/montserrat/200.css"
import "@fontsource/montserrat/300.css"
import "@fontsource/montserrat/500.css"
import "@fontsource/montserrat/600.css"
import "@fontsource/montserrat/700.css"
import "@fontsource/montserrat/800.css"
import "@fontsource/montserrat/900.css"

import './assets/styles/index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);
