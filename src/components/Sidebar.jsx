// src/components/Sidebar.jsx
import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ setActivePage }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const [activeItem, setActiveItem] = useState('dashboard');

  // Función para manejar clics y cambiar de página
  const handleMenuClick = (pageId, itemId) => {
    setActivePage(pageId); // Cambia el contenido central
    setActiveItem(itemId); // Pone verde el menú
  };

  // Función para abrir/cerrar submenús
  const toggleSubmenu = (menuId) => {
    setOpenMenu(openMenu === menuId ? null : menuId);
    setActiveItem(menuId); // Pone verde el padre al abrirlo
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-menu">
        <ul>
          {/* DASHBOARD */}
          <li 
            className={activeItem === 'dashboard' ? 'active' : ''} 
            onClick={() => handleMenuClick('dashboard', 'dashboard')}
          >
            <i className="fas fa-home"></i> Dashboard
          </li>

          {/* PARAMETRIZACIÓN */}
          <li 
            className={activeItem === 'param' ? 'active' : ''} 
            onClick={() => toggleSubmenu('param')}
          >
            <i className="fas fa-cogs"></i> Parametrización
            <i className={`fas fa-chevron-down menu-arrow ${openMenu === 'param' ? 'rotate' : ''}`}></i>
          </li>
          {openMenu === 'param' && (
            <ul className="submenu">
              <li className={activeItem === 'fichas' ? 'active' : ''} onClick={() => handleMenuClick('fichas', 'fichas')}>Fichas</li>
              <li className={activeItem === 'empresas' ? 'active' : ''} onClick={() => handleMenuClick('empresas', 'empresas')}>Empresas</li>
              <li className={activeItem === 'aprendices' ? 'active' : ''} onClick={() => handleMenuClick('aprendices', 'aprendices')}>Aprendices</li>
            </ul>
          )}

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

          {/* --- ELIMINADO EL BLOQUE DE REPORTES --- */}

        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;