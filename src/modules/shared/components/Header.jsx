// src/modules/shared/components/Header.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Header.css';

const Header = ({ user, notifications = [] }) => {
  const navigate = useNavigate();
  const [showHelpMenu, setShowHelpMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleHelpMenu = () => setShowHelpMenu(!showHelpMenu);
  const toggleProfileMenu = () => setShowProfileMenu(!showProfileMenu);
  const toggleNotifications = () => setShowNotifications(!showNotifications);

  const handleLogout = () => {
    Swal.fire({
      title: '¿Estás seguro de que quieres cerrar sesión?',
      text: 'Se cerrará tu sesión actual y serás redirigido a la página principal.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        sessionStorage.clear();
        window.location.replace('/');
      }
    });
  };

  const handleViewProfile = () => {
    setShowProfileMenu(false);
    const role = user?.role || 'instructor';
    
    if (role === 'instructor') {
      navigate('/instructor/mi-perfil');
    } else if (role === 'coordinador') {
      navigate('/coordinador/mi-perfil');
    } else if (role === 'aprendiz') {
      navigate('/aprendiz/mi-perfil');
    } else if (role === 'admin') {
      navigate('/admin/mi-perfil');
    } else {
      navigate('/instructor/mi-perfil');
    }
  };

  // 🔔 Si no hay notificaciones, usamos una lista vacía
  const notifList = notifications.length > 0 ? notifications : [];

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
        {/* CAMPANA (SVG - SIEMPRE SE VE) */}
        <div className="notification-wrapper" onClick={() => setShowNotifications(!showNotifications)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'white' }}>
            <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" fill="currentColor"/>
          </svg>
          <span className="notification-badge">3</span>

          {showNotifications && (
            <div className="notifications-dropdown">
              <div className="dropdown-header">
                <span>Alertas recientes</span>
                <small>Marcar todas como leídas</small>
              </div>
              <div className="dropdown-list">
                {notifList.map((notif) => (
                  <div key={notif.id} className="dropdown-item">
                    <div className="notif-content">
                      <div className="notif-title">{notif.mensaje}</div>
                      <div className="notif-desc">{notif.tiempo}</div>
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

        {/* SIGNO DE INTERROGACIÓN (SVG - SIEMPRE SE VE) */}
        <div className="help-wrapper" onClick={() => setShowHelpMenu(!showHelpMenu)}>
          <div className="help-circle">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 19H11V17H13V19ZM15.07 11.25L14.17 12.17C13.45 12.9 13 13.5 13 15H11V14.5C11 13.4 11.45 12.4 12.17 11.67L13.41 10.41C13.78 10.05 14 9.55 14 9C14 7.9 13.1 7 12 7C10.9 7 10 7.9 10 9H8C8 6.79 9.79 5 12 5C14.21 5 16 6.79 16 9C16 9.88 15.64 10.68 15.07 11.25Z" fill="#3ca203"/>
            </svg>
          </div>

          {showHelpMenu && (
            <div className="help-dropdown">
              <div className="help-item">Ver manual de usuario</div>
              <div className="help-item">Contactar soporte</div>
              <div className="help-item">Acerca de SIPA</div>
            </div>
          )}
        </div>

        {/* PERFIL */}
        <div className="profile-wrapper">
          <div className="profile-section" onClick={() => setShowProfileMenu(!showProfileMenu)}>
            <img src={user?.avatar || 'https://i.pravatar.cc/150?img=47'} alt="Profile" />
            <div>
              <strong>{user?.nombre || 'Carlos Andrés López'}</strong>
              <small>{user?.role || 'Aprendiz'}</small>
            </div>
            <i className="fas fa-chevron-down profile-arrow"></i>
          </div>

          {showProfileMenu && (
            <div className="profile-dropdown">
              <div className="profile-item" onClick={handleViewProfile}>
                <i className="fas fa-user-circle"></i>
                <span>Ver mi perfil</span>
              </div>
              <div className="profile-item logout-item" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i>
                <span>Cerrar sesión</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;