// src/components/Dashboard.jsx
import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  // Simulación de datos de seguimiento
  const stats = {
    totalAprendices: 18,
    seguimientosCompletados: 11,
    seguimientosPendientes: 7,
    enProceso: 5
  };

  // Datos de ejemplo de los últimos seguimientos hechos
  const seguimientosRecientes = [
    { aprendiz: 'Laura Sofia Martinez', momento: 'Momento 1', fecha: '20/05/2025', estado: 'Completado' },
    { aprendiz: 'Juan Diego Ramirez', momento: 'Momento 2', fecha: '19/05/2025', estado: 'Pendiente' },
    { aprendiz: 'Maria Camila Torres', momento: 'Momento 2', fecha: '18/05/2025', estado: 'Completado' },
  ];

  // Datos del calendario
  const eventosCalendario = [
    { dia: 23, mes: 'MAY', titulo: 'Seguimiento Momento 2', aprendiz: 'Laura Sofia Martinez', hora: '09:00 a.m.' },
    { dia: 26, mes: 'MAY', titulo: 'Evaluación Final', aprendiz: 'Juan Diego Ramirez', hora: '10:30 a.m.' },
    { dia: 28, mes: 'MAY', titulo: 'Seguimiento Momento 3', aprendiz: 'Maria Camila Torres', hora: '02:00 p.m.' },
  ];

  return (
    <div className="dashboard-container">
      
      {/* 1. Título del Panel */}
      <div className="dashboard-header">
        <h1>¡Bienvenido, Carlos Andrés!</h1>
        <p>Este es tu esquema general de seguimiento a aprendices.</p>
      </div>

      {/* 2. Tarjetas de Resumen (Sin Alertas) */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon icon-blue"><i className="fas fa-users"></i></div>
          <div className="stat-info">
            <h3>{stats.totalAprendices}</h3>
            <p>Aprendices Asignados</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon icon-green"><i className="fas fa-check-circle"></i></div>
          <div className="stat-info">
            <h3>{stats.seguimientosCompletados}</h3>
            <p>Seguimientos Completados</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon icon-yellow"><i className="fas fa-clock"></i></div>
          <div className="stat-info">
            <h3>{stats.seguimientosPendientes}</h3>
            <p>Seguimientos Pendientes</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon icon-purple"><i className="fas fa-spinner"></i></div>
          <div className="stat-info">
            <h3>{stats.enProceso}</h3>
            <p>En Proceso</p>
          </div>
        </div>
      </div>

      {/* 3. TARJETA DE CALENDARIO (Nueva) */}
      <div className="calendar-section">
        <div className="panel-header">
          <h3><i className="fas fa-calendar-alt" style={{marginRight: '8px', color: '#004d2e'}}></i> Próximos Eventos</h3>
          <a href="#">Ver calendario completo</a>
        </div>
        <div className="calendar-list">
          {eventosCalendario.map((evento, index) => (
            <div className="calendar-item" key={index}>
              <div className="calendar-date-box">
                <span className="cal-month">{evento.mes}</span>
                <span className="cal-day">{evento.dia}</span>
              </div>
              <div className="calendar-details">
                <h4>{evento.titulo}</h4>
                <div className="cal-meta">
                  <span><i className="fas fa-user"></i> {evento.aprendiz}</span>
                  <span><i className="fas fa-clock"></i> {evento.hora}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Resumen de Seguimientos Recientes */}
      <div className="recent-activities">
        <div className="panel-header">
          <h3>Últimos Seguimientos Realizados</h3>
          <a href="#">Ver todos los seguimientos</a>
        </div>
        <div className="activity-list">
          {seguimientosRecientes.map((item, index) => (
            <div className="activity-item" key={index}>
              <div className="activity-info">
                <div className="activity-avatar">
                  {item.aprendiz.charAt(0)}
                </div>
                <div>
                  <h4>{item.aprendiz}</h4>
                  <small>{item.momento} - {item.fecha}</small>
                </div>
              </div>
              <span className={`status-badge ${item.estado === 'Completado' ? 'status-green' : 'status-orange'}`}>
                {item.estado}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;