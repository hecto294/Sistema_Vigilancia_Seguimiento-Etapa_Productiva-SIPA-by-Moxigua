// src/modules/auth/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthProvider';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simulación: Asignamos un rol ficticio para probar
    const userData = {
      email: email,
      role: 'instructor' // <-- SOLO ROL INSTRUCTOR
    };

    // Llamar a la función login del AuthProvider
    login(userData);

    // Navegar a la ruta según el rol
    navigate('/instructor/dashboard');
  };

  return (
    <div className="login-wrapper">
      
      {/* --- COLUMNA IZQUIERDA (BRANDING) --- */}
      <div className="login-left">
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
          <h1>Bienvenido a SIPA</h1>
          <h3>Sistema de Seguimiento de Etapa Productiva</h3>
          <p>Herramienta institucional del SENA para gestionar, hacer seguimiento y evaluar la etapa productiva de aprendices de forma eficiente y centralizada.</p>
        </div>

        <div className="left-image">
          <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop" alt="Dashboard Preview" />
        </div>

        <div className="left-footer">
          <div className="feature-badge">
            <i className="fas fa-shield-alt"></i>
            <div>
              <strong>Seguro</strong>
              <small>Tu información está protegida</small>
            </div>
          </div>
          <div className="feature-badge">
            <i className="fas fa-users"></i>
            <div>
              <strong>Centralizado</strong>
              <small>Todo en un solo lugar</small>
            </div>
          </div>
          <div className="feature-badge">
            <i className="fas fa-chart-line"></i>
            <div>
              <strong>Eficiente</strong>
              <small>Procesos más ágiles</small>
            </div>
          </div>
          <div className="feature-badge">
            <i className="fas fa-clock"></i>
            <div>
              <strong>Confiable</strong>
              <small>Información precisa</small>
            </div>
          </div>
        </div>
      </div>

      {/* --- COLUMNA DERECHA (LOGIN) --- */}
      <div className="login-right">
        <div className="login-card">
          
          <div className="login-header">
            <div className="header-icon">
              <i className="fas fa-lock-open"></i>
            </div>
            <h2>Iniciar sesión</h2>
            <p>Ingresa tus credenciales para acceder al sistema</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Correo electrónico</label>
              <div className="input-wrapper">
                <i className="fas fa-envelope"></i>
                <input 
                  type="email" 
                  placeholder="ejemplo@correo.sena.edu.co" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Contraseña</label>
              <div className="input-wrapper">
                <i className="fas fa-lock"></i>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Ingresa tu contraseña" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <i 
                  className={`fas fa-eye${showPassword ? '' : '-slash'} password-toggle`}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: 'pointer' }}
                ></i>
              </div>
              
              {/* --- ENLACE PARA RECUPERAR CONTRASEÑA --- */}
              <div className="forgot-password">
                <Link to="/recuperar">¿Olvidaste tu contraseña?</Link>
              </div>
            </div>

            <button type="submit" className="btn-login-submit">
              <i className="fas fa-sign-in-alt"></i> Iniciar sesión
            </button>

            <div className="divider">
              <span>o continúa con</span>
            </div>

            <button type="button" className="btn-sena-id">
              <i className="fas fa-shield-alt"></i> Iniciar sesión con SENA ID
            </button>

            <div className="login-footer-text">
              ¿No tienes cuenta? <Link to="/register">Consulta con tu coordinador</Link>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;
