// src/layouts/LayoutCoordinador.jsx
import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import SidebarCoordinador from '../components/SidebarCoordinador';
import '../App.css';

import DashboardCoordinador from '../pages/coordinador/DashboardCoordinador';
import VerFichas from '../pages/coordinador/VerFichas';
import VerAprendices from '../pages/coordinador/VerAprendices';
import VerCertificados from '../pages/coordinador/VerCertificados';
import ReportesGlobales from '../pages/coordinador/ReportesGlobales';

const LayoutCoordinador = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Función que se pasa al Sidebar para navegar a las URLs reales
  const handleNavigation = (url, pageId) => {
    navigate(url);
  };

  // Detectamos la página activa para iluminar el menú
  let activePage = 'dashboard';
  if (location.pathname.includes('/fichas')) activePage = 'fichas';
  else if (location.pathname.includes('/certificados')) activePage = 'certificados';
  else if (location.pathname.includes('/reportes')) activePage = 'reportes';

  return (
    <div className="app-layout">
      <Header user={user} />
      <div className="main-body">
        <SidebarCoordinador 
          onNavigate={handleNavigation} 
          activePage={activePage}
        />
        <div className="content-area" style={{ padding: '30px', boxSizing: 'border-box' }}>
          <Routes>
            <Route path="/" element={<DashboardCoordinador />} />
            <Route path="/fichas" element={<VerFichas />} />
            <Route path="/certificados" element={<VerCertificados />} />
            <Route path="/ficha/:idFicha" element={<VerAprendices />} />
            <Route path="/reportes" element={<ReportesGlobales />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default LayoutCoordinador;