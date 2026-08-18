// src/layouts/LayoutInstructor.jsx
import React, { useState } from 'react';
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

const LayoutInstructor = ({ user }) => {
  const [activePage, setActivePage] = useState('dashboard');

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
        <Sidebar setActivePage={setActivePage} />
        <div className="content-area">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default LayoutInstructor;