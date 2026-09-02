// src/modules/shared/layouts/LayoutInstructor.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from '@/modules/shared/components/Header';
import Sidebar from '@/modules/shared/components/Sidebar';
import '@/App.css';

// Importar todas las páginas del instructor
import Dashboard from '@/modules/shared/components/Dashboard';
import Fichas from '@/modules/shared/components/Fichas';
import Empresas from '@/modules/shared/components/Empresas';
import Aprendices from '@/modules/shared/components/Aprendices';
import CharlasProgramadas from '@/modules/shared/components/CharlasProgramadas';
import HistorialCharlas from '@/modules/shared/components/HistorialCharlas';
import SeleccionAlternativa from '@/modules/shared/components/SeleccionAlternativa';
import SeguimientoMomentos from '@/modules/shared/components/SeguimientoMomentos';
import Bitacora from '@/modules/shared/components/Bitacora';
import Certificaciones from '@/modules/shared/components/Certificaciones';

// Páginas del instructor
import DetalleFichaInstructor from '@/modules/instructor/pages/DetalleFichaInstructor';
import DetalleAprendizBitacoras from '@/modules/instructor/pages/DetalleAprendizBitacoras';
import EditarCharla from '@/modules/instructor/pages/EditarCharla';
import MiPerfil from '@/modules/instructor/pages/MiPerfil';
import Calendario from '@/modules/instructor/pages/Calendario';
import Seguimientos from '@/modules/instructor/pages/Seguimientos';
import DetalleEvento from '@/modules/instructor/pages/DetalleEvento';
import DetalleSeguimiento from '@/modules/instructor/pages/DetalleSeguimiento';

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
      case 'dashboard': return <Dashboard />;
      case 'fichas': return <Fichas />;
      case 'empresas': return <Empresas />;
      case 'aprendices': return <Aprendices />;
      case 'charlas-programadas': return <CharlasProgramadas />;
      case 'historial-charlas': return <HistorialCharlas />;
      case 'seleccion-alternativa': return <SeleccionAlternativa />;
      case 'momentos': return <SeguimientoMomentos />;
      case 'bitacora': return <Bitacora />;
      case 'certificaciones': return <Certificaciones />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="app-layout">
      {/* ══════════ HEADER NORMAL (EL MISMO QUE USA APRENDIZ) ══════════ */}
      <Header user={user} notifications={[
        { id: 1, tipo: 'alerta', mensaje: '3 seguimientos están atrasados', descripcion: 'Requieren tu atención inmediata.', tiempo: 'Hoy, 08:15 a. m.' },
        { id: 2, tipo: 'info', mensaje: '2 evaluaciones pendientes', descripcion: 'Tienes evaluaciones por finalizar.', tiempo: 'Hoy, 07:50 a. m.' },
        { id: 3, tipo: 'info', mensaje: 'Documentos pendientes por revisar', descripcion: 'Hay documentos de aprendices pendientes.', tiempo: 'Ayer, 05:30 p. m.' }
      ]} />

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
              <Route path="/bitacora/aprendiz/:aprendizId" element={<DetalleAprendizBitacoras />} />
              <Route path="/mi-perfil" element={<MiPerfil user={user} />} />
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