// src/layouts/LayoutApoyo.jsx
import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import SidebarApoyo from '../components/SidebarApoyo';
import '../App.css';

import DashboardApoyo from '../pages/apoyo/DashboardApoyo';
import GestionUsuariosApoyo from '../pages/apoyo/GestionUsuariosApoyo';
import GestionFichasApoyo from '../pages/apoyo/GestionFichasApoyo';
import ReportesGlobalesApoyo from '../pages/apoyo/ReportesGlobalesApoyo';

const LayoutApoyo = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (url) => {
    navigate(url);
  };

  // Determinar qué página está activa basado en la URL
  const pathname = location.pathname;
  let activePage = 'dashboard';
  
  if (pathname.includes('/gestion-usuarios') || pathname.includes('/usuarios')) {
    activePage = 'usuarios';
  } else if (pathname.includes('/gestion-fichas') || pathname.includes('/fichas')) {
    activePage = 'fichas';
  } else if (pathname.includes('/reportes')) {
    activePage = 'reportes';
  } else if (pathname === '/apoyo' || pathname === '/apoyo/' || pathname.includes('/dashboard')) {
    activePage = 'dashboard';
  }

  return (
    <div className="app-layout">
      <Header user={user} />
      <div className="main-body">
        <SidebarApoyo 
          onNavigate={handleNavigation} 
          activePage={activePage}
        />
        <div className="content-area" style={{ padding: '30px', boxSizing: 'border-box' }}>
          <Routes>
            <Route path="/" element={<DashboardApoyo />} />
            <Route path="/dashboard" element={<DashboardApoyo />} />
            <Route path="/gestion-usuarios" element={<GestionUsuariosApoyo />} />
            <Route path="/usuarios" element={<GestionUsuariosApoyo />} />
            <Route path="/gestion-fichas" element={<GestionFichasApoyo />} />
            <Route path="/fichas" element={<GestionFichasApoyo />} />
            <Route path="/reportes" element={<ReportesGlobalesApoyo />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default LayoutApoyo;