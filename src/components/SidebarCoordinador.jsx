// src/components/SidebarCoordinador.jsx
import React from 'react';
import './Sidebar.css';

const SidebarCoordinador = ({ onNavigate, activePage }) => {
  return (
    <nav className="sidebar">
      <div className="sidebar-menu">
        <ul>
          <li 
            className={activePage === 'dashboard' ? 'active' : ''} 
            onClick={() => onNavigate('/coordinador/', 'dashboard')}
          >
            <i className="fas fa-chart-pie"></i> Panel Global
          </li>

          <li 
            className={activePage === 'fichas' ? 'active' : ''} 
            onClick={() => onNavigate('/coordinador/fichas', 'fichas')}
          >
            <i className="fas fa-layer-group"></i> Fichas Globales
          </li>

          <li 
            className={activePage === 'certificados' ? 'active' : ''} 
            onClick={() => onNavigate('/coordinador/certificados', 'certificados')}
          >
            <i className="fas fa-certificate"></i> Certificaciones Masivas
          </li>

          <li 
            className={activePage === 'reportes' ? 'active' : ''} 
            onClick={() => onNavigate('/coordinador/reportes', 'reportes')}
          >
            <i className="fas fa-chart-bar"></i> Reportes Globales
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SidebarCoordinador;