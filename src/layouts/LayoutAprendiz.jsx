// src/layouts/LayoutAprendiz.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import SidebarAprendiz from '../components/SidebarAprendiz';
import '../App.css';

// Importamos las futuras páginas (las crearemos en los siguientes pasos)
import DashboardAprendiz from '../pages/aprendiz/DashboardAprendiz';
import MisMomentos from '../pages/aprendiz/MisMomentos';
import MisBitacoras from '../pages/aprendiz/MisBitacoras';
import MisCertificados from '../pages/aprendiz/MisCertificados';
import MiPerfil from '../pages/aprendiz/MiPerfil';

const LayoutAprendiz = ({ user }) => {
  const [activePage, setActivePage] = useState('dashboard');

  const renderContent = () => {
    switch (activePage) {
      case 'momentos': return <MisMomentos />;
      case 'bitacoras': return <MisBitacoras />;
      case 'certificados': return <MisCertificados />;
      case 'perfil': return <MiPerfil user={user} />;
      case 'dashboard':
      default:
        return <DashboardAprendiz user={user} />;
    }
  };

  return (
    <div className="app-layout">
      <Header user={user} />
      <div className="main-body">
        <SidebarAprendiz 
          setActivePage={setActivePage} 
          activePage={activePage}
        />
        <div className="content-area" style={{ width: '100%', padding: '30px', boxSizing: 'border-box', backgroundColor: '#f6f8fa' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutAprendiz;