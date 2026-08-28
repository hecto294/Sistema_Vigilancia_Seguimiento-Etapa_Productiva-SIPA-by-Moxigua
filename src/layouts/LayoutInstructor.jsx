// src/layouts/LayoutInstructor.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../App.css';

// Importar todas las páginas del instructor
import Dashboard from '../components/Dashboard';
import Fichas from '../components/Fichas';
import Empresas from '../components/Empresas';
import Aprendices from '../components/Aprendices';
import CharlasProgramadas from '../components/CharlasProgramadas';
import HistorialCharlas from '../components/HistorialCharlas';
import SeleccionAlternativa from '../components/SeleccionAlternativa';
import SeguimientoMomentos from '../components/SeguimientoMomentos';
import Bitacora from '../components/Bitacora';
import Certificaciones from '../components/Certificaciones';
import DetalleFichaInstructor from '../pages/instructor/DetalleFichaInstructor';
import DetalleAprendizBitacoras from '../pages/instructor/DetalleAprendizBitacoras';
import EditarCharla from '../pages/instructor/EditarCharla';
import MiPerfil from '../pages/instructor/MiPerfil';
import Calendario from '../pages/instructor/Calendario';
import Seguimientos from '../pages/instructor/Seguimientos';
import DetalleEvento from '../pages/instructor/DetalleEvento';
import DetalleSeguimiento from '../pages/instructor/DetalleSeguimiento';

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
      <Header user={user} />
      <div className="main-body">
        <Sidebar setActivePage={handleSidebarClick} activePage={activePage} />
        <div className="content-area" style={{ padding: '30px', boxSizing: 'border-box', backgroundColor: '#f6f8fa' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Routes>
              {/* Ruta raíz: muestra el contenido según el estado del menú */}
              <Route path="/" element={renderContent()} />
              
              {/* Rutas para páginas específicas (acceso directo por URL) */}
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