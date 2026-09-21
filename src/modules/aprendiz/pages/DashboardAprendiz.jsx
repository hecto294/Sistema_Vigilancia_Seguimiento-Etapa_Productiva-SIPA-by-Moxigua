// src/modules/aprendiz/pages/DashboardAprendiz.jsx
import React, { useState, useEffect } from 'react';
import { apiClient } from '@/core/api/client';
import './DashboardAprendiz.css';

const DashboardAprendiz = ({ user }) => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tiempoRestante, setTiempoRestante] = useState({
    dias: 0, horas: 0, minutos: 0, segundos: 0,
  });
  const [progreso, setProgreso] = useState({
    diasTranscurridos: 0, diasRestantes: 0, porcentaje: 0,
  });

  // 🔥 Cargar datos reales del backend
  useEffect(() => {
    cargarDashboard();
  }, []);

  const cargarDashboard = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiClient.get('/usuarios/me/dashboard');
      console.log('📊 Dashboard real:', data);
      setDashboard(data);
    } catch (err) {
      console.error('Error al cargar dashboard:', err);
      setError(err.message || 'Error al cargar el dashboard');
    } finally {
      setLoading(false);
    }
  };

  // Calcular tiempo restante y progreso según datos reales
  useEffect(() => {
    if (!dashboard?.fecha_inicio || !dashboard?.fecha_fin) return;

    const fechaInicio = new Date(dashboard.fecha_inicio);
    const fechaLimite = new Date(dashboard.fecha_fin);

    const calcularTiempo = () => {
      const ahora = new Date();
      const diferencia = fechaLimite - ahora;
      if (diferencia <= 0) return { dias: 0, horas: 0, minutos: 0, segundos: 0 };
      const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
      return { dias, horas, minutos, segundos };
    };

    const calcularProgreso = () => {
      const ahora = new Date();
      const duracionTotal = fechaLimite - fechaInicio;
      const duracionTranscurrida = ahora - fechaInicio;

      if (duracionTranscurrida >= duracionTotal) {
        return {
          diasTranscurridos: Math.floor(duracionTotal / (1000 * 60 * 60 * 24)),
          diasRestantes: 0,
          porcentaje: 100,
        };
      }
      if (duracionTranscurrida <= 0) {
        return {
          diasTranscurridos: 0,
          diasRestantes: Math.floor(duracionTotal / (1000 * 60 * 60 * 24)),
          porcentaje: 0,
        };
      }
      const diasTranscurridos = Math.floor(duracionTranscurrida / (1000 * 60 * 60 * 24));
      const porcentaje = Math.round((duracionTranscurrida / duracionTotal) * 100);
      return {
        diasTranscurridos,
        diasRestantes: Math.floor((fechaLimite - ahora) / (1000 * 60 * 60 * 24)),
        porcentaje,
      };
    };

    setTiempoRestante(calcularTiempo());
    setProgreso(calcularProgreso());

    const intervalo = setInterval(() => {
      setTiempoRestante(calcularTiempo());
      setProgreso(calcularProgreso());
    }, 1000);

    return () => clearInterval(intervalo);
  }, [dashboard]);

  if (loading) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', color: '#6b7280' }}>
        <i className="fas fa-spinner fa-spin" style={{ fontSize: '32px', color: '#3ca203' }}></i>
        <p style={{ marginTop: '15px' }}>Cargando información...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '60px', textAlign: 'center' }}>
        <i className="fas fa-exclamation-circle" style={{ fontSize: '40px', color: '#dc2626' }}></i>
        <h3 style={{ color: '#dc2626' }}>Error</h3>
        <p style={{ color: '#6b7280' }}>{error}</p>
        <button onClick={cargarDashboard} style={{ background: '#3ca203', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', marginTop: '15px' }}>
          Reintentar
        </button>
      </div>
    );
  }

  if (!dashboard?.tiene_proceso) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', background: 'white', borderRadius: '12px' }}>
        <i className="fas fa-info-circle" style={{ fontSize: '48px', color: '#f59e0b' }}></i>
        <h3 style={{ color: '#1f2937', marginTop: '20px' }}>Sin proceso activo</h3>
        <p style={{ color: '#6b7280' }}>Aún no tienes un proceso de etapa productiva asignado.</p>
      </div>
    );
  }

  const fechaLimiteFormateada = dashboard.fecha_fin
    ? new Date(dashboard.fecha_fin).toLocaleDateString('es-CO', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '—';

  const stats = [
    {
      id: 1,
      titulo: 'Momentos completados',
      valor: String(dashboard.momentos_completados || 0),
      icono: 'fa-check-circle',
      color: '#3ca203',
      bgColor: '#e6f7ed',
    },
    {
      id: 2,
      titulo: 'Bitácoras subidas',
      valor: String(dashboard.bitacoras_subidas || 0),
      icono: 'fa-book',
      color: '#0ea5e9',
      bgColor: '#e0f2fe',
    },
    {
      id: 3,
      titulo: 'Certificado obtenido',
      valor: String(dashboard.certificado_obtenido || 0),
      icono: 'fa-certificate',
      color: '#f59e0b',
      bgColor: '#fef3c7',
    },
    {
      id: 4,
      titulo: 'Notificaciones',
      valor: String(dashboard.notificaciones || 0),
      icono: 'fa-bell',
      color: '#ef4444',
      bgColor: '#fee2e2',
    },
  ];

  return (
    <div className="dashboard-aprendiz-container">
      {/* CONTADOR REGRESIVO */}
      <div className="countdown-section">
        <div className="countdown-header">
          <i className="fas fa-hourglass-half"></i>
          <span>Cuenta regresiva para culminar tu etapa productiva</span>
        </div>

        <div className="days-remaining">
          <i className="fas fa-calendar-check"></i>
          <span>
            <strong>{tiempoRestante.dias} días</strong> pendientes por terminar
          </span>
        </div>

        <div className="progress-section">
          <div className="progress-header">
            <span>Progreso de tu etapa productiva</span>
            <span className="progress-percentage">{progreso.porcentaje}%</span>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progreso.porcentaje}%` }}></div>
          </div>
          <div className="progress-details">
            <span>
              <i className="fas fa-play-circle"></i>
              <strong>{progreso.diasTranscurridos} días</strong> transcurridos
            </span>
            <span>
              <i className="fas fa-flag-checkered"></i>
              <strong>{progreso.diasRestantes} días</strong> por completar
            </span>
          </div>
        </div>

        <div className="countdown-timer">
          <div className="countdown-box">
            <span className="countdown-number">{tiempoRestante.dias}</span>
            <span className="countdown-label">Días</span>
          </div>
          <div className="countdown-box">
            <span className="countdown-number">{tiempoRestante.horas}</span>
            <span className="countdown-label">Horas</span>
          </div>
          <div className="countdown-box">
            <span className="countdown-number">{tiempoRestante.minutos}</span>
            <span className="countdown-label">Minutos</span>
          </div>
          <div className="countdown-box">
            <span className="countdown-number">{tiempoRestante.segundos}</span>
            <span className="countdown-label">Segundos</span>
          </div>
        </div>
        <div className="countdown-footer">
          <i className="fas fa-calendar-alt"></i>
          <span>Fecha límite: <strong>{fechaLimiteFormateada}</strong></span>
        </div>
      </div>

      {/* TARJETAS DE ESTADÍSTICAS */}
      <div className="stats-grid-aprendiz">
        {stats.map((stat) => (
          <div key={stat.id} className="stat-card-aprendiz">
            <div className="stat-icon" style={{ background: stat.bgColor, color: stat.color }}>
              <i className={`fas ${stat.icono}`}></i>
            </div>
            <div className="stat-info">
              <span className="stat-number">{stat.valor}</span>
              <span className="stat-label">{stat.titulo}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardAprendiz;