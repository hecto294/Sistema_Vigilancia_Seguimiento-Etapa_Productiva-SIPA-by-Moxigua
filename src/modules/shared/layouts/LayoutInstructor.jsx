// src/modules/shared/layouts/LayoutInstructor.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from '@/modules/shared/components/Header';
import Sidebar from '@/modules/shared/components/Sidebar';
import '@/App.css';

// Páginas (desde pages)
import DashboardInstructor from '@/modules/instructor/pages/DashboardInstructor';
import Calendario from '@/modules/instructor/pages/Calendario';
import MiPerfil from '@/modules/instructor/pages/MiPerfil';
import Seguimientos from '@/modules/instructor/pages/Seguimientos';
import DetalleEvento from '@/modules/instructor/pages/DetalleEvento';
import DetalleSeguimiento from '@/modules/instructor/pages/DetalleSeguimiento';
import DetalleFichaInstructor from '@/modules/instructor/pages/DetalleFichaInstructor';
import DetalleAprendizBitacoras from '@/modules/instructor/pages/DetalleAprendizBitacoras';
import BitacorasPorBimestre from '@/modules/instructor/pages/BitacorasPorBimestre';
import EditarCharla from '@/modules/instructor/pages/EditarCharla';

// Componentes (desde components)
import Fichas from '@/modules/instructor/components/Fichas';
import Empresas from '@/modules/instructor/components/Empresas';
import Aprendices from '@/modules/instructor/components/Aprendices';
import CharlasProgramadas from '@/modules/instructor/components/CharlasProgramadas';
import HistorialCharlas from '@/modules/instructor/components/HistorialCharlas';
import SeleccionAlternativa from '@/modules/instructor/components/SeleccionAlternativa';
import SeguimientoMomentos from '@/modules/instructor/components/SeguimientoMomentos';
import Bitacora from '@/modules/instructor/components/Bitacora';
import Certificaciones from '@/modules/instructor/components/Certificaciones';
// ✅ NUEVO: REPORTES FINALES
import ReportesFinales from '@/modules/instructor/components/ReportesFinales';

const LayoutInstructor = ({ user }) => {
  const [activePage, setActivePage] = useState('dashboard');
  const navigate = useNavigate();
  const location = useLocation();

  // Sincronizar activePage con la URL
  useEffect(() => {
    const path = location.pathname;
    if (path === '/instructor' || path === '/instructor/') {
      setActivePage('dashboard');
    } else if (path.includes('/fichas')) {
      setActivePage('fichas');
    } else if (path.includes('/charlas-programadas')) {
      setActivePage('charlas-programadas');
    } else if (path.includes('/historial-charlas')) {
      setActivePage('historial-charlas');
    } else if (path.includes('/seleccion-alternativa')) {
      setActivePage('seleccion-alternativa');
    } else if (path.includes('/momentos')) {
      setActivePage('momentos');
    } else if (path.includes('/bitacora')) {
      setActivePage('bitacora');
    } else if (path.includes('/certificaciones')) {
      setActivePage('certificaciones');
    } else if (path.includes('/reportes-finales')) {
      setActivePage('reportes-finales');
    } else if (path.includes('/empresas')) {
      setActivePage('empresas');
    } else if (path.includes('/aprendices')) {
      setActivePage('aprendices');
    } else if (path.includes('/dashboard')) {
      setActivePage('dashboard');
    }
  }, [location.pathname]);

  const handleSidebarClick = (pageId) => {
    setActivePage(pageId);
    navigate('/instructor');
  };

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard': return <DashboardInstructor activePage={activePage} />;
      case 'fichas': return <Fichas />;
      case 'empresas': return <Empresas />;
      case 'aprendices': return <Aprendices />;
      case 'charlas-programadas': return <CharlasProgramadas />;
      case 'historial-charlas': return <HistorialCharlas />;
      case 'seleccion-alternativa': return <SeleccionAlternativa />;
      case 'momentos': return <SeguimientoMomentos />;
      case 'bitacora': return <Bitacora />;
      case 'certificaciones': return <Certificaciones />;
      case 'reportes-finales': return <ReportesFinales />;
      default: return <DashboardInstructor activePage={activePage} />;
    }
  };

  return (
    <div className="app-layout">
      <Header 
        user={{ nombre: 'Carlos Andrés López', role: 'Instructor', avatar: 'https://i.pravatar.cc/150?img=8' }}
        notifications={[
          { id: 1, mensaje: 'Nuevo aprendiz asignado', tiempo: 'Hoy, 12:00 p.m.' },
          { id: 2, mensaje: 'Charla programada', tiempo: 'Hoy, 10:15 a.m.' },
          { id: 3, mensaje: 'Bitácora pendiente por revisar', tiempo: 'Ayer, 06:30 p.m.' },
        ]}
      />
      <div className="main-body">
        <Sidebar setActivePage={handleSidebarClick} activePage={activePage} />
        <div className="content-area" style={{ padding: '30px', boxSizing: 'border-box', backgroundColor: '#f6f8fa' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Routes>
              <Route path="/" element={renderContent()} />
              <Route path="/dashboard" element={renderContent()} />
              <Route path="/fichas" element={<Fichas />} />
              <Route path="/ficha/:idFicha" element={<DetalleFichaInstructor />} />
              <Route path="/charlas-programadas" element={<CharlasProgramadas />} />
              <Route path="/historial-charlas" element={<HistorialCharlas />} />
              <Route path="/charla/:id/editar" element={<EditarCharla />} />
              <Route path="/seleccion-alternativa" element={<SeleccionAlternativa />} />
              <Route path="/momentos" element={<SeguimientoMomentos />} />
              <Route path="/bitacora" element={<Bitacora />} />
              <Route path="/certificaciones" element={<Certificaciones />} />
              {/* ✅ NUEVA RUTA: REPORTES FINALES */}
              <Route path="/reportes-finales" element={<ReportesFinales />} />
              <Route path="/empresas" element={<Empresas />} />
              {/* ✅ RUTA PARA DETALLE DE BITÁCORAS DEL APRENDIZ */}
              <Route path="/bitacora/aprendiz/:aprendizId" element={<DetalleAprendizBitacoras />} />
              {/* ✅ RUTA PARA BITÁCORAS POR BIMESTRE */}
              <Route path="/bitacora/aprendiz/:aprendizId/bimestre/:bimestre" element={<BitacorasPorBimestre />} />
              <Route path="/mi-perfil" element={<MiPerfil user={{ nombre: 'Carlos Andrés López', role: 'Instructor', avatar: 'https://i.pravatar.cc/150?img=8' }} />} />
              <Route path="/calendario" element={<Calendario />} />
              <Route path="/seguimientos" element={<Seguimientos />} />
              <Route path="/evento/:id" element={<DetalleEvento />} />
              <Route path="/seguimiento/:id" element={<DetalleSeguimiento />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutInstructor;