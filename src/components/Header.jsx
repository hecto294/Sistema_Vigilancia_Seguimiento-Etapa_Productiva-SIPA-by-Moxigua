// src/components/Header.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Header.css';

const Header = ({ user }) => {
  const navigate = useNavigate();
  const [showHelpMenu, setShowHelpMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleHelpMenu = () => setShowHelpMenu(!showHelpMenu);
  const toggleProfileMenu = () => setShowProfileMenu(!showProfileMenu);
  const toggleNotifications = () => setShowNotifications(!showNotifications);

  // ==========================================================
  // FUNCIÓN PARA CERRAR SESIÓN CON SWEETALERT
  // ==========================================================
  const handleLogout = () => {
    Swal.fire({
      title: '¿Estás seguro de que quieres cerrar sesión?',
      text: 'Se cerrará tu sesión actual y serás redirigido a la página principal.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: '✅ Sí, cerrar sesión',
      cancelButtonText: '❌ Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // ✅ Limpiar sesión
        localStorage.clear();
        sessionStorage.clear();
        
        // ✅ Redirigir al Landing Page SIN poder volver atrás
        window.location.replace('/');
      }
    });
  };

  // --- Navegación según el rol ---
  const handleViewProfile = () => {
    setShowProfileMenu(false);
    const role = user?.role || 'instructor';
    
    if (role === 'instructor') {
      navigate('/instructor/mi-perfil');
    } else if (role === 'aprendiz') {
      navigate('/aprendiz/mi-perfil');
    } else if (role === 'coordinador') {
      navigate('/coordinador/mi-perfil');
    } else if (role === 'admin') {
      navigate('/admin/mi-perfil');
    } else {
      navigate('/instructor/mi-perfil');
    }
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
              <small>{user?.role === 'instructor' ? 'Instructor SENA' : (user?.cargo || 'Rol')}</small>
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
    </header>
  );
};

export default Header;