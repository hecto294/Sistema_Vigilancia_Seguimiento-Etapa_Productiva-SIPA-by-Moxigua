// src/components/Header.jsx
import React, { useState } from 'react';
import './Header.css';

const Header = ({ user }) => {
  const [showHelpMenu, setShowHelpMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const toggleHelpMenu = () => setShowHelpMenu(!showHelpMenu);
  const toggleProfileMenu = () => setShowProfileMenu(!showProfileMenu);
  const toggleNotifications = () => setShowNotifications(!showNotifications);

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      alert('Sesión cerrada correctamente.');
      setShowProfileMenu(false);
    }
  };

  const handleViewProfile = () => {
    setShowProfileMenu(false);
    setShowProfileModal(true);
  };

  const handleCloseModal = () => {
    setShowProfileModal(false);
  };

  const notificaciones = [
    { id: 1, tipo: 'alerta', mensaje: '3 seguimientos están atrasados', descripcion: 'Requieren tu atención inmediata.', tiempo: 'Hoy, 08:15 a. m.' },
    { id: 2, tipo: 'info', mensaje: '2 evaluaciones pendientes', descripcion: 'Tienes evaluaciones por finalizar.', tiempo: 'Hoy, 07:50 a. m.' },
    { id: 3, tipo: 'info', mensaje: 'Documentos pendientes por revisar', descripcion: 'Hay documentos de aprendices pendientes.', tiempo: 'Ayer, 05:30 p. m.' },
  ];

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="sena-logo-wrapper">
          <img src="/logo-sena.png" alt="Logo SENA" className="sena-logo-img" />
        </div>
        <div>
          <h3>SIPA by Moxigua</h3>
          <span>Sistema de Seguimiento de Etapa Productiva</span>
        </div>
      </div>

      <div className="topbar-right">
        <div className="notification-wrapper">
          <i className="fas fa-bell bell-icon" onClick={toggleNotifications}></i>
          <span className="notification-badge">3</span>

          {showNotifications && (
            <div className="notifications-dropdown">
              <div className="dropdown-header">
                <span>Alertas recientes</span>
                <small>Marcar todas como leídas</small>
              </div>
              <div className="dropdown-list">
                {notificaciones.map((notif) => (
                  <div key={notif.id} className={`dropdown-item ${notif.tipo}`}>
                    <div className="notif-icon">
                      <i className={`fas fa-circle ${notif.tipo === 'alerta' ? 'text-red' : 'text-blue'}`}></i>
                    </div>
                    <div className="notif-content">
                      <div className="notif-title">{notif.mensaje}</div>
                      <div className="notif-desc">{notif.descripcion}</div>
                      <div className="notif-time">{notif.tiempo}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="dropdown-footer">
                <a href="#">Ver todas las alertas</a>
              </div>
            </div>
          )}
        </div>

        <div className="help-wrapper">
          <i className="fas fa-question-circle help-icon" onClick={toggleHelpMenu}></i>
          {showHelpMenu && (
            <div className="help-dropdown">
              <div className="help-item"><i className="fas fa-book"></i> Ver manual de usuario</div>
              <div className="help-item"><i className="fas fa-headset"></i> Contactar soporte</div>
              <div className="help-item"><i className="fas fa-info-circle"></i> Acerca de SIPA</div>
            </div>
          )}
        </div>

        <div className="profile-wrapper">
          <div className="profile-section" onClick={toggleProfileMenu}>
            <img src={user?.avatar || 'https://i.pravatar.cc/150?img=11'} alt="Profile" />
            <div>
              <strong>{user?.nombre || 'Usuario'}</strong> <br />
              <small>{user?.role === 'aprendiz' ? 'Aprendiz' : (user?.cargo || 'Rol')}</small>
            </div>
            <i className={`fas fa-chevron-down profile-arrow ${showProfileMenu ? 'rotate' : ''}`}></i>
          </div>

          {showProfileMenu && (
            <div className="profile-dropdown">
              <div className="profile-item" onClick={handleViewProfile}>
                <i className="fas fa-user-circle"></i> Ver mi perfil
              </div>
              <div className="profile-item logout-item" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i> Cerrar sesión
              </div>
            </div>
          )}
        </div>
      </div>

      {showProfileModal && (
        <div className="profile-modal-overlay" onClick={handleCloseModal}>
          <div className="profile-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleCloseModal}>&times;</button>
            <div className="profile-modal-header">
              <div className="profile-modal-avatar">
                <img src="https://i.pravatar.cc/150?img=11" alt="Profile" />
              </div>
              <h2>{user?.nombre || 'Usuario'}</h2>
              <p className="profile-modal-role">{user?.role === 'aprendiz' ? 'Aprendiz' : (user?.cargo || 'Rol')}</p>
            </div>
            <div className="profile-modal-body">
              <div className="profile-info-row">
                <span className="info-label">Correo electrónico</span>
                <span className="info-value">carlos.lopez@sena.edu.co</span>
              </div>
              <div className="profile-info-row">
                <span className="info-label">Teléfono</span>
                <span className="info-value">+57 310 123 4567</span>
              </div>
              <div className="profile-info-row">
                <span className="info-label">Regional</span>
                <span className="info-value">Bogotá - Cundinamarca</span>
              </div>
              <div className="profile-info-row">
                <span className="info-label">Centro de formación</span>
                <span className="info-value">Centro de Tecnología y Diseño</span>
              </div>
            </div>
            <div className="profile-modal-actions">
              <button className="btn-edit-profile">Editar perfil</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;