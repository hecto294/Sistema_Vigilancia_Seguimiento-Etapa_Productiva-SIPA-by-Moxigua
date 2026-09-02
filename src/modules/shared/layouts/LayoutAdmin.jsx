// src/layouts/LayoutAdmin.jsx
import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import SidebarAdmin from '../components/SidebarAdmin';
import '../../../App.css';

// ✅ TODAS LAS RUTAS CORREGIDAS USANDO EL ALIAS "@"
import DashboardAdmin from "@/modules/admin/pages/DashboardAdmin";
import GestionUsuarios from "@/modules/admin/pages/GestionUsuarios";
import GestionFichas from "@/modules/admin/pages/GestionFichas";
import ReportesGlobales from "@/modules/admin/pages/ReportesGlobales";
import MiPerfil from "@/modules/admin/pages/MiPerfil";

const LayoutAdmin = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (url, pageId) => {
    navigate(url);
  };

  let activePage = 'dashboard';
  if (location.pathname.includes('/usuarios')) activePage = 'usuarios';
  else if (location.pathname.includes('/fichas')) activePage = 'fichas';
  else if (location.pathname.includes('/reportes')) activePage = 'reportes';

  return (
    <div className="app-layout">
      <Header user={user} />
      <div className="main-body">
        <SidebarAdmin 
          onNavigate={handleNavigation} 
          activePage={activePage}
        />
        <div className="content-area" style={{ padding: '30px', boxSizing: 'border-box' }}>
          <Routes>
            <Route path="/" element={<DashboardAdmin />} />
            <Route path="/usuarios" element={<GestionUsuarios />} />
            <Route path="/fichas" element={<GestionFichas />} />
            <Route path="/reportes" element={<ReportesGlobales />} />
            <Route path="/mi-perfil" element={<MiPerfil user={user} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;