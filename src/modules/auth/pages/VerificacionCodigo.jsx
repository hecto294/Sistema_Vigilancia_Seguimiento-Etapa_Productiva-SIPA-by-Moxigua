// src/pages/public/VerificacionCodigo.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RecuperarContrasena.css';

const VerificacionCodigo = () => {
  const navigate = useNavigate();

  const handleVerify = () => {
    // Simulación: El código es correcto
    navigate('/cambiar-contrasena');
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
          <h1>Código de verificación</h1>
          <p>Hemos enviado un código de verificación a tu correo electrónico registrado.</p>
        </div>

        <div className="left-image">
          <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop" alt="Código de verificación" />
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
            <h2>Código de verificación generado</h2>
            <p>Hemos enviado un código de verificación a tu correo electrónico registrado.</p>
          </div>

          <div className="code-section">
            <div className="code-label">Tu código de verificación</div>
            <div className="code-boxes">
              {[4, 7, 2, 9, 1, 6].map((num, idx) => (
                <div key={idx} className="code-box">{num}</div>
              ))}
            </div>
            <button className="btn-copy-code" onClick={() => navigator.clipboard.writeText('472916')}>
              <i className="fas fa-copy"></i> Copiar
            </button>
          </div>

          <div className="info-box warning-box">
            <i className="fas fa-clock"></i>
            <span>Vigencia del código: <strong>10 minutos</strong></span>
          </div>

          <div className="info-box resend-box">
            <i className="fas fa-envelope"></i>
            <div>
              <strong>¿No recibiste el código?</strong>
              <span>Revisa tu bandeja de entrada, carpeta de spam o correo no deseado.</span>
              <button className="btn-resend" onClick={() => alert('✅ Código reenviado exitosamente.')}>
                <i className="fas fa-sync-alt"></i> Reenviar código
              </button>
            </div>
          </div>

          <div className="divider"><span>o regresa al inicio de sesión</span></div>

          <Link to="/login" className="btn-auth-outline">
            <i className="fas fa-arrow-left"></i> Volver al inicio de sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerificacionCodigo;