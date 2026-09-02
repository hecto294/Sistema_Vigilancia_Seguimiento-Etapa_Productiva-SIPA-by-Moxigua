// src/pages/public/RecuperarContrasena.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RecuperarContrasena.css';

const RecuperarContrasena = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación: Enviar correo y redirigir a verificación
    navigate('/verificacion-codigo');
  };

  return (
    <div className="auth-wrapper">
      {/* --- COLUMNA IZQUIERDA --- */}
      <div className="auth-left">
        <div className="left-header">
          <div className="left-logo">
            <img src="/logo-sena.png" alt="Logo SENA" />
            <div className="left-brand">
              <h2>SIPA</h2>
              <span>Sistema de Seguimiento de Etapa Productiva</span>
            </div>
          </div>
        </div>

        <div className="left-hero">
          <h1>¿Olvidaste tu contraseña?</h1>
          <p>No te preocupes, te ayudamos a recuperar el acceso a tu cuenta de manera rápida y segura.</p>
        </div>

        <div className="left-image">
          <img src="https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=600&auto=format&fit=crop" alt="Recuperar contraseña" />
        </div>

        <div className="left-footer">
          <div className="feature-badge">
            <i className="fas fa-shield-alt"></i>
            <div><strong>Seguro</strong><small>Tu información está protegida</small></div>
          </div>
          <div className="feature-badge">
            <i className="fas fa-envelope"></i>
            <div><strong>Confiable</strong><small>Te enviamos instrucciones de forma segura</small></div>
          </div>
          <div className="feature-badge">
            <i className="fas fa-clock"></i>
            <div><strong>Rápido</strong><small>Recupera el acceso a tu cuenta en pocos minutos</small></div>
          </div>
        </div>
      </div>

      {/* --- COLUMNA DERECHA --- */}
      <div className="auth-right">
        <div className="auth-card">
          <div className="auth-header">
            <div className="header-icon">
              <i className="fas fa-lock"></i>
            </div>
            <h2>Recuperar contraseña</h2>
            <p>Ingresa el correo electrónico asociado a tu cuenta y te enviaremos las instrucciones para restablecerla.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Correo electrónico</label>
              <div className="input-wrapper">
                <i className="fas fa-envelope"></i>
                <input 
                  type="email" 
                  placeholder="Ingresa tu correo electrónico" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="info-box">
              <i className="fas fa-info-circle"></i>
              <span>Te enviaremos un enlace para que puedas crear una nueva contraseña.</span>
            </div>

            <button type="submit" className="btn-auth-submit">
              <i className="fas fa-envelope"></i> Enviar instrucciones
            </button>

            <div className="divider"><span>o regresa al inicio de sesión</span></div>

            <Link to="/login" className="btn-auth-outline">
              <i className="fas fa-arrow-left"></i> Volver al inicio de sesión
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecuperarContrasena;