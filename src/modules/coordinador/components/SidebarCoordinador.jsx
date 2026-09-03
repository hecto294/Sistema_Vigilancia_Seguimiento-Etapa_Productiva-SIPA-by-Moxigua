// src/modules/coordinador/components/SidebarCoordinador.jsx
import React from 'react';
import '../../shared/components/Sidebar.css';

const SidebarCoordinador = ({ onNavigate, activePage }) => {
  return (
    <nav className="sidebar">
      <div className="sidebar-menu">
        <ul>
          <li 
            className={activePage === 'dashboard' ? 'active' : ''} 
            onClick={() => onNavigate('/coordinador', 'dashboard')}
          >
            <i className="fas fa-home"></i> Dashboard
          </li>

          <li 
            className={activePage === 'parametrizacion' ? 'active' : ''} 
            onClick={() => onNavigate('/coordinador/parametrizacion', 'parametrizacion')}
          >
            <i className="fas fa-cog"></i> Parametrización
          </li>

          <li 
            className={activePage === 'fichas' ? 'active' : ''} 
            onClick={() => onNavigate('/coordinador/fichas', 'fichas')}
          >
            <i className="fas fa-layer-group"></i> Centro de Fichas
          </li>

          <li 
            className={activePage === 'certificados' ? 'active' : ''} 
            onClick={() => onNavigate('/coordinador/certificados', 'certificados')}
          >
            <i className="fas fa-certificate"></i> Certificados
          </li>

          <li 
            className={activePage === 'reportes' ? 'active' : ''} 
            onClick={() => onNavigate('/coordinador/reportes', 'reportes')}
          >
            <i className="fas fa-chart-line"></i> Reportes
          </li>

          <li 
            className={activePage === 'reporte-bitacoras' ? 'active' : ''} 
            onClick={() => onNavigate('/coordinador/reporte-bitacoras', 'reporte-bitacoras')}
          >
            <i className="fas fa-book"></i> Bitácoras
          </li>

          <li 
            className={activePage === 'empresas' ? 'active' : ''} 
            onClick={() => onNavigate('/coordinador/empresas', 'empresas')}
          >
            <i className="fas fa-building"></i> Empresas
          </li>

          <li 
            className={activePage === 'aprendices' ? 'active' : ''} 
            onClick={() => onNavigate('/coordinador/aprendices', 'aprendices')}
          >
            <i className="fas fa-users"></i> Aprendices
          </li>

          <li 
            className={activePage === 'instructores' ? 'active' : ''} 
            onClick={() => onNavigate('/coordinador/instructores', 'instructores')}
          >
            <i className="fas fa-user-tie"></i> Instructores
          </li>

          <li 
            className={activePage === 'subir-alternativa' ? 'active' : ''} 
            onClick={() => onNavigate('/coordinador/subir-alternativa', 'subir-alternativa')}
          >
            <i className="fas fa-exchange-alt"></i> Subir Alternativa
          </li>

          <li 
            className={activePage === 'momentos' ? 'active' : ''} 
            onClick={() => onNavigate('/coordinador/momentos', 'momentos')}
          >
            <i className="fas fa-clock"></i> Momentos
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SidebarCoordinador;