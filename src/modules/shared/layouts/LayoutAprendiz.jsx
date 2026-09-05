// src/modules/shared/layouts/LayoutAprendiz.jsx
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from '@/modules/shared/components/Header';
import SidebarAprendiz from '@/modules/aprendiz/components/SidebarAprendiz';
import '../../../App.css';

// Importamos las páginas del aprendiz (TODAS USANDO @)
import DashboardAprendiz from "@/modules/aprendiz/pages/DashboardAprendiz";
import MisMomentos from "@/modules/aprendiz/pages/MisMomentos";
import MisBitacoras from "@/modules/aprendiz/pages/MisBitacoras";
import MisCertificados from "@/modules/aprendiz/pages/MisCertificados";
import MiPerfil from "@/modules/aprendiz/pages/MiPerfil";
// ⬇️ NUEVA IMPORTACIÓN
import Novedades from "@/modules/aprendiz/pages/Novedades";

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
      // ⬇️ NUEVO CASO
      case 'novedades': return <Novedades />;
      case 'dashboard':
      default:
        return <DashboardAprendiz user={user} />;
    }
  };

  return (
    <div className="app-layout">
      {/* 👇 DATOS ESPECÍFICOS DEL ROL APRENDIZ + NOTIFICACIONES CORREGIDAS */}
      <Header 
        user={{ nombre: 'Andrés Felipe Castro', role: 'Aprendiz', avatar: 'https://i.pravatar.cc/150?img=11' }}
        notifications={[
          { id: 1, mensaje: 'Momentos completados', tiempo: 'Hoy, 09:30 a.m.' },
          { id: 2, mensaje: 'Bitácora aprobada por instructor', tiempo: 'Ayer, 03:45 p.m.' },
          { id: 3, mensaje: 'Bitácora pendiente por revisar', tiempo: 'Ayer, 02:00 p.m.' },
        ]}
      />
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
              <Route path="/mi-perfil" element={<MiPerfil user={{ nombre: 'Andrés Felipe Castro', role: 'Aprendiz', avatar: 'https://i.pravatar.cc/150?img=11' }} />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutAprendiz;