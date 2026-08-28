// src/pages/instructor/DashboardInstructor.jsx
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import '../../App.css';

// Importar todas las páginas del instructor
import Dashboard from '../../components/Dashboard';
import Fichas from '../../components/Fichas';
import Empresas from '../../components/Empresas';
import Aprendices from '../../components/Aprendices';
import CharlasProgramadas from '../../components/CharlasProgramadas';
import HistorialCharlas from '../../components/HistorialCharlas';
import SeleccionAlternativa from '../../components/SeleccionAlternativa';
import SeguimientoMomentos from '../../components/SeguimientoMomentos';
import Bitacora from '../../components/Bitacora';
import Certificaciones from '../../components/Certificaciones';
import DetalleFichaInstructor from './DetalleFichaInstructor';
import DetalleAprendizBitacoras from './DetalleAprendizBitacoras';
import EditarCharla from './EditarCharla';
import MiPerfil from './MiPerfil';
import Calendario from './Calendario'; // <--- NUEVO
import Seguimientos from './Seguimientos'; // <--- NUEVO
import DetalleEvento from './DetalleEvento'; // <--- NUEVO
import DetalleSeguimiento from './DetalleSeguimiento'; // <--- NUEVO

const DashboardInstructor = ({ user }) => {
  const [activePage, setActivePage] = useState('dashboard');
  const navigate = useNavigate();

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
              <Route path="/" element={renderContent()} />
              <Route path="/ficha/:idFicha" element={<DetalleFichaInstructor />} />
              <Route path="/charla/:id/editar" element={<EditarCharla />} />
              <Route path="/bitacora/aprendiz/:aprendizId" element={<DetalleAprendizBitacoras />} />
              <Route path="/mi-perfil" element={<MiPerfil user={user} />} />
              {/* NUEVAS RUTAS */}
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

export default DashboardInstructor;