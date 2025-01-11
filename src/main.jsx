// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './AppRoutes';
import './index.css'; // Importa tus estilos si los tienes
import '@fontsource/roboto';
import { initMercadoPago } from '@mercadopago/sdk-react';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AppRoutes />
    </React.StrictMode>
);


initMercadoPago('APP_USR-8cd121fa-5fc8-4570-8acb-f3a7d9430bae');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);