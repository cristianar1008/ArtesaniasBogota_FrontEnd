// src/AppRoutes.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import './index.css';
import Home from './home/home';
import Bill from './bill/bill';
import Redirect from './bill/redirect';


const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/home" element={<Home />} />
                <Route path="/userAdmin" element={<Home />} />
                <Route path="/bill" element={<Bill />} />
                <Route path="/pago/redirect" element={<Redirect />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
