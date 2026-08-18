// src/components/SidebarApoyo.jsx
import React from 'react';
import './Sidebar.css';

const SidebarApoyo = ({ onNavigate, activePage }) => {
  return (
    <nav className="sidebar">
      <div className="sidebar-menu">
        <ul>
          <li 
            className={activePage === 'dashboard' ? 'active' : ''} 
            onClick={() => onNavigate('/apoyo/', 'dashboard')}
          >
            <i className="fas fa-eye"></i> Panel Global
          </li>

          <li 
            className={activePage === 'usuarios' ? 'active' : ''} 
            onClick={() => onNavigate('/apoyo/usuarios', 'usuarios')}
          >
            <i className="fas fa-users"></i> Usuarios (Solo lectura)
          </li>

          <li 
            className={activePage === 'fichas' ? 'active' : ''} 
            onClick={() => onNavigate('/apoyo/fichas', 'fichas')}
          >
            <i className="fas fa-layer-group"></i> Fichas (Solo lectura)
          </li>

          <li 
            className={activePage === 'reportes' ? 'active' : ''} 
            onClick={() => onNavigate('/apoyo/reportes', 'reportes')}
          >
            <i className="fas fa-chart-bar"></i> Reportes Globales
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SidebarApoyo;