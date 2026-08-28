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
import Parametrizacion from '../pages/coordinador/Parametrizacion';
import EmpresasGlobales from '../pages/coordinador/EmpresasGlobales';
import AprendicesGlobales from '../pages/coordinador/AprendicesGlobales';
import InstructoresGlobales from '../pages/coordinador/InstructoresGlobales';
import AsignarFichasInstructor from '../pages/coordinador/AsignarFichasInstructor';
import ReporteBitacoras from '../pages/coordinador/ReporteBitacoras';
import ReporteFichaBitacoras from '../pages/coordinador/ReporteFichaBitacoras';
import ReporteAprendizBitacoras from '../pages/coordinador/ReporteAprendizBitacoras';
import DetalleFichaGlobal from '../pages/coordinador/DetalleFichaGlobal';
import AsignarEmpresaAprendiz from '../pages/coordinador/AsignarEmpresaAprendiz';
import SubirAlternativa from '../pages/coordinador/SubirAlternativa';
import DetalleAprendiz from '../pages/coordinador/DetalleAprendiz';
import ReporteFichaDetalle from '../pages/coordinador/ReporteFichaDetalle';
import MomentosCoordinador from '../pages/coordinador/MomentosCoordinador'; // <--- NUEVA IMPORTACIÓN
import MiPerfil from '../pages/coordinador/MiPerfil';

const LayoutCoordinador = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (url, pageId) => {
    navigate(url);
  };

  let activePage = 'dashboard';
  if (location.pathname.includes('/parametrizacion')) activePage = 'parametrizacion';
  else if (location.pathname.includes('/fichas')) activePage = 'fichas';
  else if (location.pathname.includes('/certificados')) activePage = 'certificados';
  else if (location.pathname.includes('/reportes')) activePage = 'reportes';
  else if (location.pathname.includes('/reporte-bitacoras')) activePage = 'reporte-bitacoras';
  else if (location.pathname.includes('/empresas')) activePage = 'empresas';
  else if (location.pathname.includes('/aprendices')) activePage = 'aprendices';
  else if (location.pathname.includes('/instructores')) activePage = 'instructores';
  else if (location.pathname.includes('/asignar')) activePage = 'instructores';
  else if (location.pathname.includes('/subir-alternativa')) activePage = 'subir-alternativa';
  else if (location.pathname.includes('/momentos')) activePage = 'momentos'; // <--- NUEVO

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
            <Route path="/parametrizacion" element={<Parametrizacion />} />
            <Route path="/fichas" element={<VerFichas />} />
            <Route path="/certificados" element={<VerCertificados />} />
            <Route path="/ficha/:idFicha" element={<VerAprendices />} />
            <Route path="/reportes" element={<ReportesGlobales />} />
            <Route path="/reportes/ficha/:idFicha" element={<ReporteFichaDetalle />} />
            <Route path="/reporte-bitacoras" element={<ReporteBitacoras />} />
            <Route path="/reporte-bitacoras/ficha/:idFicha" element={<ReporteFichaBitacoras />} />
            <Route path="/reporte-bitacoras/aprendiz/:aprendizId" element={<ReporteAprendizBitacoras />} />
            <Route path="/empresas" element={<EmpresasGlobales />} />
            <Route path="/aprendices" element={<AprendicesGlobales />} />
            <Route path="/aprendices/:aprendizId" element={<DetalleAprendiz />} />
            <Route path="/instructores" element={<InstructoresGlobales />} />
            <Route path="/instructores/:instructorId/asignar" element={<AsignarFichasInstructor />} />
            <Route path="/ficha-completa/:idFicha" element={<DetalleFichaGlobal />} />
            <Route path="/ficha-completa/:idFicha/aprendiz/:aprendizId/asignar-empresa" element={<AsignarEmpresaAprendiz />} />
            <Route path="/subir-alternativa" element={<SubirAlternativa />} />
            <Route path="/momentos" element={<MomentosCoordinador />} /> {/* <--- NUEVA RUTA */}
            <Route path="/mi-perfil" element={<MiPerfil user={user} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default LayoutCoordinador;