// src/components/SidebarAprendiz.jsx
import React from 'react';
import './Sidebar.css';

const SidebarAprendiz = ({ setActivePage, activePage }) => {
  return (
    <nav className="sidebar">
      <div className="sidebar-menu">
        <ul>
          <li 
            className={activePage === 'dashboard' ? 'active' : ''} 
            onClick={() => setActivePage('dashboard')}
          >
            <i className="fas fa-home"></i> Mi Proceso
          </li>

          <li 
            className={activePage === 'momentos' ? 'active' : ''} 
            onClick={() => setActivePage('momentos')}
          >
            <i className="fas fa-clock"></i> Mis Momentos
          </li>

          <li 
            className={activePage === 'bitacoras' ? 'active' : ''} 
            onClick={() => setActivePage('bitacoras')}
          >
            <i className="fas fa-book"></i> Mis Bitácoras
          </li>

          <li 
            className={activePage === 'certificados' ? 'active' : ''} 
            onClick={() => setActivePage('certificados')}
          >
            <i className="fas fa-certificate"></i> Mis Certificados
          </li>
          
          {/* ELIMINAMOS LA OPCIÓN "Mi Perfil" DE AQUÍ */}
        </ul>
      </div>
    </nav>
  );
};

export default SidebarAprendiz;