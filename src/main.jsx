// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './AppRoutes';
import './index.css'; // Importa tus estilos si los tienes

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AppRoutes />
    </React.StrictMode>
);
