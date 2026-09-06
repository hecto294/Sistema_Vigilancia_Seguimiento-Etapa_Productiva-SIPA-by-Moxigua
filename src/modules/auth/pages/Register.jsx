// src/pages/public/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();

  // Simulación de registro
  const handleRegister = (e) => {
    e.preventDefault();
    alert('✅ Cuenta creada exitosamente. ¡Bienvenido a SIPA!');
    navigate('/login');
  };

  return (
    <div className="register-wrapper">
      
      {/* --- COLUMNA IZQUIERDA: IMAGEN Y BRANDING --- */}
      <div className="register-left">
        <div className="left-top">
          <div className="left-logo">
            <img src="/logo-sena.png" alt="Logo SENA" />
            <div className="left-brand">
              <h2>SIPA</h2>
              <span>Sistema de Seguimiento de Etapa Productiva</span>
            </div>
          </div>
        </div>

        <div className="left-hero">
          <h1>Únete a SIPA <br /> y haz parte de la <br /> <span className="highlight-green">formación que transforma</span></h1>
          <p>Regístrate para acceder al Sistema de Seguimiento de Etapa Productiva del SENA y gestionar tu proceso de forma fácil, segura y centralizada.</p>
        </div>

        <div className="left-image">
          {/* Puedes cambiar esta URL por tu imagen local si quieres */}
          <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop" alt="Laptop" />
        </div>

        <div className="left-footer">
          <div className="feature-badge">
            <i className="fas fa-shield-alt"></i> <span>Seguro</span>
          </div>
          <div className="feature-badge">
            <i className="fas fa-users"></i> <span>Inclusivo</span>
          </div>
          <div className="feature-badge">
            <i className="fas fa-chart-line"></i> <span>Eficiente</span>
          </div>
          <div className="feature-badge">
            <i className="fas fa-leaf"></i> <span>Sostenible</span>
          </div>
        </div>
      </div>

      {/* --- COLUMNA DERECHA: FORMULARIO DE REGISTRO --- */}
      <div className="register-right">
        <div className="register-card">
          
          <div className="register-header">
            <div className="header-icon">
              <i className="fas fa-user-plus"></i>
            </div>
            <h2>Crear cuenta en SIPA</h2>
            <p>Completa la información para registrarte en el sistema</p>
          </div>

          <div className="steps-indicator">
            <div className="step active">1</div>
            <div className="step-line"></div>
            <div className="step">2</div>
            <div className="step-line"></div>
            <div className="step">3</div>
            <div className="step-line"></div>
            <div className="step">4</div>
          </div>
          <div className="step-labels">
            <span>Información personal</span>
            <span>Información académica</span>
            <span>Credenciales</span>
            <span>Confirmación</span>
          </div>

          <form onSubmit={handleRegister}>
            <div className="form-title-row">
              <h3><i className="fas fa-id-card"></i> Información personal</h3>
              <span className="step-counter">Paso 1 de 4</span>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Tipo de documento *</label>
                <div className="input-wrapper">
                  <i className="fas fa-id-card"></i>
                  <select required>
                    <option value="">Selecciona...</option>
                    <option value="CC">Cédula de Ciudadanía</option>
                    <option value="CE">Cédula de Extranjería</option>
                    <option value="TI">Tarjeta de Identidad</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Número de documento *</label>
                <div className="input-wrapper">
                  <i className="fas fa-hashtag"></i>
                  <input type="text" placeholder="Ej. 1234567890" required />
                </div>
              </div>

              <div className="form-group">
                <label>Nombres *</label>
                <div className="input-wrapper">
                  <i className="fas fa-user"></i>
                  <input type="text" placeholder="Ingresa tus nombres" required />
                </div>
              </div>

              <div className="form-group">
                <label>Apellidos *</label>
                <div className="input-wrapper">
                  <i className="fas fa-user"></i>
                  <input type="text" placeholder="Ingresa tus apellidos" required />
                </div>
              </div>

              <div className="form-group">
                <label>Correo institucional *</label>
                <div className="input-wrapper">
                  <i className="fas fa-envelope"></i>
                  <input type="email" placeholder="ejemplo@sena.edu.co" required />
                </div>
              </div>

              <div className="form-group">
                <label>Teléfono celular *</label>
                <div className="input-wrapper">
                  <i className="fas fa-phone"></i>
                  <input type="tel" placeholder="Ej. 300 123 4567" required />
                </div>
              </div>

              <div className="form-group">
                <label>Ciudad de residencia *</label>
                <div className="input-wrapper">
                  <i className="fas fa-map-marker-alt"></i>
                  <select required>
                    <option value="">Selecciona tu ciudad...</option>
                    <option value="Bogotá">Bogotá</option>
                    <option value="Medellín">Medellín</option>
                    <option value="Cali">Cali</option>
                    <option value="Barranquilla">Barranquilla</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Dirección *</label>
                <div className="input-wrapper">
                  <i className="fas fa-home"></i>
                  <input type="text" placeholder="Ingresa tu dirección" required />
                </div>
              </div>

              <div className="form-group">
                <label>Fecha de nacimiento *</label>
                <div className="input-wrapper">
                  <i className="fas fa-calendar-alt"></i>
                  <input type="date" required />
                </div>
              </div>

              <div className="form-group">
                <label>Género *</label>
                <div className="input-wrapper">
                  <i className="fas fa-venus-mars"></i>
                  <select required>
                    <option value="">Selecciona...</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="info-alert">
              <i className="fas fa-info-circle"></i>
              <span>La información registrada será utilizada únicamente para fines académicos e institucionales.</span>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-cancel" onClick={() => navigate('/')}>
                <i className="fas fa-times"></i> Cancelar
              </button>
              <button type="submit" className="btn-next">
                Siguiente <i className="fas fa-arrow-right"></i>
              </button>
            </div>

            <div className="login-link">
              ¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Register;
