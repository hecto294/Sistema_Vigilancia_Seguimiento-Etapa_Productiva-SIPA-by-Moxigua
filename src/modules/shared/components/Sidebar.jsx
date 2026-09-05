// src/components/Sidebar.jsx
import React, { useState } from 'react';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ setActivePage }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const [activeItem, setActiveItem] = useState('dashboard');
  const navigate = useNavigate();

  const handleMenuClick = (pageId, itemId) => {
    setActivePage(pageId);
    setActiveItem(itemId);
    navigate('/instructor');
  };

  const toggleSubmenu = (menuId) => {
    setOpenMenu(openMenu === menuId ? null : menuId);
    setActiveItem(menuId);
    navigate('/instructor');
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-menu">
        <ul>
          <li 
            className={activeItem === 'dashboard' ? 'active' : ''} 
            onClick={() => handleMenuClick('dashboard', 'dashboard')}
          >
            <i className="fas fa-home"></i> Dashboard
          </li>

          {/* --- NUEVA OPCIÓN: MIS FICHAS --- */}
          <li 
            className={activeItem === 'fichas' ? 'active' : ''} 
            onClick={() => handleMenuClick('fichas', 'fichas')}
          >
            <i className="fas fa-layer-group"></i> Mis Fichas
          </li>

          {/* --- NUEVA OPCIÓN: EMPRESAS --- */}
          <li 
            className={activeItem === 'empresas' ? 'active' : ''} 
            onClick={() => handleMenuClick('empresas', 'empresas')}
          >
            <i className="fas fa-building"></i> Empresas
          </li>

          {/* CHARLAS */}
          <li 
            className={activeItem === 'charlas' ? 'active' : ''} 
            onClick={() => toggleSubmenu('charlas')}
          >
            <i className="fas fa-comments"></i> Charlas
            <i className={`fas fa-chevron-down menu-arrow ${openMenu === 'charlas' ? 'rotate' : ''}`}></i>
          </li>
          {openMenu === 'charlas' && (
            <ul className="submenu">
              <li className={activeItem === 'charlas-programadas' ? 'active' : ''} onClick={() => handleMenuClick('charlas-programadas', 'charlas-programadas')}>Charlas programadas</li>
              <li className={activeItem === 'historial-charlas' ? 'active' : ''} onClick={() => handleMenuClick('historial-charlas', 'historial-charlas')}>Historial de charlas</li>
            </ul>
          )}

          {/* ALTERNATIVA ETAPA PRODUCTIVA */}
          <li 
            className={activeItem === 'alternativa' ? 'active' : ''} 
            onClick={() => toggleSubmenu('alternativa')}
          >
            <i className="fas fa-exchange-alt"></i> Alternativa etapa productiva
            <i className={`fas fa-chevron-down menu-arrow ${openMenu === 'alternativa' ? 'rotate' : ''}`}></i>
          </li>
          {openMenu === 'alternativa' && (
            <ul className="submenu">
              <li className={activeItem === 'seleccion-alternativa' ? 'active' : ''} onClick={() => handleMenuClick('seleccion-alternativa', 'seleccion-alternativa')}>Selección de alternativa</li>
            </ul>
          )}

          {/* SEGUIMIENTO */}
          <li 
            className={activeItem === 'seguimiento' ? 'active' : ''} 
            onClick={() => toggleSubmenu('seguimiento')}
          >
            <i className="fas fa-clipboard-list"></i> Seguimiento
            <i className={`fas fa-chevron-down menu-arrow ${openMenu === 'seguimiento' ? 'rotate' : ''}`}></i>
          </li>
          {openMenu === 'seguimiento' && (
            <ul className="submenu">
              <li className={activeItem === 'momentos' ? 'active' : ''} onClick={() => handleMenuClick('momentos', 'momentos')}>Seguimiento por momentos</li>
              <li className={activeItem === 'bitacora' ? 'active' : ''} onClick={() => handleMenuClick('bitacora', 'bitacora')}>Bitácora</li>
              <li className={activeItem === 'certificaciones' ? 'active' : ''} onClick={() => handleMenuClick('certificaciones', 'certificaciones')}>Certificaciones</li>
            </ul>
          )}

          {/* --- NUEVA OPCIÓN: REPORTES FINALES --- */}
          <li 
            className={activeItem === 'reportes-finales' ? 'active' : ''} 
            onClick={() => handleMenuClick('reportes-finales', 'reportes-finales')}
          >
            <i className="fas fa-file-signature"></i> Reportes Finales
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;