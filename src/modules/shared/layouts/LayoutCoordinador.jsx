import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from '@/modules/shared/components/Header';
import SidebarCoordinador from '@/modules/coordinador/components/SidebarCoordinador';
import '@/App.css';

import DashboardCoordinador from "@/modules/coordinador/pages/DashboardCoordinador";
import VerFichas from "@/modules/coordinador/pages/VerFichas";
import VerAprendices from "@/modules/coordinador/pages/VerAprendices";
import VerCertificados from "@/modules/coordinador/pages/VerCertificados";
import ReportesGlobales from "@/modules/coordinador/pages/ReportesGlobales";
import Parametrizacion from "@/modules/coordinador/pages/Parametrizacion";
import EmpresasGlobales from "@/modules/coordinador/pages/EmpresasGlobales";
import AprendicesGlobales from "@/modules/coordinador/pages/AprendicesGlobales";
import InstructoresGlobales from "@/modules/coordinador/pages/InstructoresGlobales";
import AsignarFichasInstructor from "@/modules/coordinador/pages/AsignarFichasInstructor";
import DetalleFichaGlobal from "@/modules/coordinador/pages/DetalleFichaGlobal";
import AsignarEmpresaAprendiz from "@/modules/coordinador/pages/AsignarEmpresaAprendiz";
import SubirAlternativa from "@/modules/coordinador/pages/SubirAlternativa";
import DetalleAprendiz from "@/modules/coordinador/pages/DetalleAprendiz";
import ReporteFichaDetalle from "@/modules/coordinador/pages/ReporteFichaDetalle";
import MomentosCoordinador from "@/modules/coordinador/pages/MomentosCoordinador";
import MiPerfil from "@/modules/coordinador/pages/MiPerfil";
import FichasParametrizacion from "@/modules/coordinador/pages/FichasParametrizacion";
import AprendicesFicha from "@/modules/coordinador/pages/AprendicesFicha";
import ReporteBitacoras from "@/modules/coordinador/pages/ReporteBitacoras";
import ReporteFichaBitacoras from "@/modules/coordinador/pages/ReporteFichaBitacoras";
import ReporteAprendizBitacoras from "@/modules/coordinador/pages/ReporteAprendizBitacoras";

const LayoutCoordinador = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const parsed = JSON.parse(stored);
      const nombreCompleto = (parsed.nombre + ' ' + (parsed.apellido || '')).trim();
      const iniciales = ((parsed.nombre || 'U').charAt(0) + (parsed.apellido || '').charAt(0)).toUpperCase();
      setUser({
        id: parsed.id,
        nombre: nombreCompleto,
        email: parsed.email,
        role: parsed.rol_nombre || parsed.role || 'Coordinador',
        avatar: parsed.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(nombreCompleto) + '&background=3ca203&color=fff&bold=true&size=128',
      });
    }
  }, []);

  const handleNavigation = (url) => navigate(url);

  let activePage = 'dashboard';
  if (location.pathname.includes('/parametrizacion')) activePage = 'parametrizacion';
  else if (location.pathname.includes('/fichas')) activePage = 'fichas';
  else if (location.pathname.includes('/certificados')) activePage = 'certificados';
  else if (location.pathname.includes('/reportes')) activePage = 'reportes';
  else if (location.pathname.includes('/reporte-bitacoras')) activePage = 'reporte-bitacoras';
  else if (location.pathname.includes('/empresas')) activePage = 'empresas';
  else if (location.pathname.includes('/aprendices')) activePage = 'aprendices';
  else if (location.pathname.includes('/instructores')) activePage = 'instructores';
  else if (location.pathname.includes('/subir-alternativa')) activePage = 'subir-alternativa';
  else if (location.pathname.includes('/momentos')) activePage = 'momentos';

  return (
    <div className="app-layout">
      <Header
        user={user || { nombre: 'Cargando...', role: 'Coordinador', avatar: '' }}
        notifications={[]}
      />
      <div className="main-body">
        <SidebarCoordinador onNavigate={handleNavigation} activePage={activePage} />
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
            <Route path="/momentos" element={<MomentosCoordinador />} />
            <Route path="/mi-perfil" element={<MiPerfil />} />
            <Route path="/fichas-parametrizacion" element={<FichasParametrizacion />} />
            <Route path="/aprendices-ficha/:idFicha" element={<AprendicesFicha />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default LayoutCoordinador;
