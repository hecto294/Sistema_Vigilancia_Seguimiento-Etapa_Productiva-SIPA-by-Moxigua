// src/components/SidebarAdmin.jsx
import React from 'react';
// 👇 CORREGIDO: Apunta al CSS que está en la carpeta compartida
import '../../shared/components/Sidebar.css';

const SidebarAdmin = ({ onNavigate, activePage }) => {
  return (
    <nav className="sidebar">
      <div className="sidebar-menu">
        <ul>
          <li 
            className={activePage === 'dashboard' ? 'active' : ''} 
            onClick={() => onNavigate('/admin/', 'dashboard')}
          >
            <i className="fas fa-chart-pie"></i> Panel Global
          </li>

          <li 
            className={activePage === 'usuarios' ? 'active' : ''} 
            onClick={() => onNavigate('/admin/usuarios', 'usuarios')}
          >
            <i className="fas fa-users-cog"></i> Gestión de Usuarios
          </li>

          <li 
            className={activePage === 'fichas' ? 'active' : ''} 
            onClick={() => onNavigate('/admin/fichas', 'fichas')}
          >
            <i className="fas fa-layer-group"></i> Gestión de Fichas
          </li>

          <li 
            className={activePage === 'reportes' ? 'active' : ''} 
            onClick={() => onNavigate('/admin/reportes', 'reportes')}
          >
            <i className="fas fa-chart-bar"></i> Reportes Globales
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SidebarAdmin;