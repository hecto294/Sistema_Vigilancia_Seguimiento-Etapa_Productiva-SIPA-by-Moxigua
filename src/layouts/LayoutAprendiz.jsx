// src/layouts/LayoutAprendiz.jsx
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SidebarAprendiz from '../components/SidebarAprendiz';
import '../App.css';

// Importamos las páginas del aprendiz
import DashboardAprendiz from '../pages/aprendiz/DashboardAprendiz';
import MisMomentos from '../pages/aprendiz/MisMomentos';
import MisBitacoras from '../pages/aprendiz/MisBitacoras';
import MisCertificados from '../pages/aprendiz/MisCertificados';
import MiPerfil from '../pages/aprendiz/MiPerfil';

const LayoutAprendiz = ({ user }) => {
  const [activePage, setActivePage] = useState('dashboard');
  const navigate = useNavigate();

  // Función que conecta el Sidebar con la navegación
  const handleSidebarClick = (pageId) => {
    setActivePage(pageId);
    // Si el usuario hace clic en una opción del menú, lo llevamos a la raíz del aprendiz
    navigate('/aprendiz');
  };

  const renderContent = () => {
    switch (activePage) {
      case 'momentos': return <MisMomentos />;
      case 'bitacoras': return <MisBitacoras />;
      case 'certificados': return <MisCertificados />;
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
          setActivePage={handleSidebarClick} 
          activePage={activePage}
        />
        <div className="content-area" style={{ width: '100%', padding: '30px', boxSizing: 'border-box', backgroundColor: '#f6f8fa' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Routes>
              {/* Ruta raíz: muestra el contenido según el estado del menú */}
              <Route path="/" element={renderContent()} />
              {/* Ruta para la página de perfil */}
              <Route path="/mi-perfil" element={<MiPerfil user={user} />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutAprendiz;