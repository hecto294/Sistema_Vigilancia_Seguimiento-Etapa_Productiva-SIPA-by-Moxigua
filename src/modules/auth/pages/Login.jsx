// src/modules/auth/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../shared/hooks/useAuth';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // 🔥 LOGIN CON REDIRECCIÓN POR ROL (rol_id numérico)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await login(email, password);

      console.log('✅ Login exitoso:', response);

      const rolId = response.user?.rol_id;
      console.log('🎯 Rol del usuario:', rolId);

      const roleRoutes = {
        1: '/admin',
        2: '/coordinador',
        3: '/instructor',
        4: '/aprendiz',
        5: '/apoyo',
        6: '/consulta',
      };

      const destino = roleRoutes[rolId] || '/login';
      console.log('🚀 Redirigiendo a:', destino);

      navigate(destino);
    } catch (error) {
      console.error('❌ Error en login:', error);
      setError(error.message || 'Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      {/* --- COLUMNA IZQUIERDA --- */}
      <div className="login-left">
        <div className="left-header">
          <div className="left-logo">
            <img src="/logo-sena.png" alt="Logo SENA" />
            <div className="left-brand">
              <h2>SIPA</h2>
              <span>Sistema de Seguimiento<br/>de Etapa Productiva</span>
            </div>
          </div>
        </div>

        <div className="left-hero">
          <h1>Bienvenido a SIPA</h1>
          <h3>Sistema de Seguimiento de Etapa Productiva</h3>
          <p>
            Herramienta institucional del SENA para gestionar, hacer seguimiento y evaluar la etapa productiva de aprendices de forma eficiente y centralizada.
          </p>
        </div>

        <div className="left-footer">
          <div className="feature-badge">
            <i className="fa-solid fa-shield-halved"></i>
            <div>
              <strong>Seguro</strong>
              <small>Tu información está protegida</small>
            </div>
          </div>
          <div className="feature-badge">
            <i className="fa-solid fa-users"></i>
            <div>
              <strong>Centralizado</strong>
              <small>Todo en un solo lugar y al alcance de todos</small>
            </div>
          </div>
          <div className="feature-badge">
            <i className="fa-solid fa-chart-line"></i>
            <div>
              <strong>Eficiente</strong>
              <small>Procesos más ágiles y oportunos</small>
            </div>
          </div>
          <div className="feature-badge">
            <i className="fa-solid fa-clock"></i>
            <div>
              <strong>Confiable</strong>
              <small>Información precisa para la toma de decisiones</small>
            </div>
          </div>
        </div>
      </div>

      {/* --- COLUMNA DERECHA --- */}
      <div className="login-right">
        <div className="login-card">
          <div className="login-header">
            <div className="header-icon">
              <i className="fa-solid fa-lock"></i>
            </div>
            <h2>Iniciar sesión</h2>
            <p>Ingresa tus credenciales para acceder al sistema</p>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '10px', borderRadius: '8px', marginBottom: '15px', fontSize: '14px' }}>
                {error}
              </div>
            )}

            <div className="form-group">
              <label>Correo electrónico</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-envelope"></i>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@correo.sena.edu.co"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Contraseña</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-lock"></i>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  required
                />
                <i 
                  className={`fa-solid password-toggle ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              </div>
              <div className="forgot-password">
                {/* 🔥 CAMBIO: Link en lugar de <a href="#"> */}
                <Link to="/recuperar">¿Olvidaste tu contraseña?</Link>
              </div>
            </div>

            <button type="submit" className="btn-login-submit" disabled={loading}>
              <i className="fa-solid fa-right-to-bracket"></i>
              {loading ? 'Ingresando...' : 'Iniciar sesión'}
            </button>

            <div className="divider">
              <span>o continúa con</span>
            </div>

            <button type="button" className="btn-sena-id">
              <i className="fa-solid fa-id-card"></i>
              Iniciar sesión con SENA ID
            </button>

            <p className="login-footer-text">
              ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;