// src/modules/aprendiz/pages/DashboardAprendiz.jsx
import React, { useState, useEffect } from 'react';
import './DashboardAprendiz.css';

const DashboardAprendiz = ({ user }) => {
  // 📅 FECHAS DE LA ETAPA PRODUCTIVA
  const fechaInicio = new Date('2025-03-01T00:00:00'); // Ejemplo: 01/03/2025
  const fechaLimite = new Date('2026-02-28T23:59:59'); // Ejemplo: 28/02/2026

  const [tiempoRestante, setTiempoRestante] = useState({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0
  });

  const [progreso, setProgreso] = useState({
    diasTranscurridos: 0,
    diasRestantes: 0,
    porcentaje: 0
  });

  // Función para calcular el tiempo restante
  const calcularTiempo = () => {
    const ahora = new Date();
    const diferencia = fechaLimite - ahora;

    if (diferencia <= 0) {
      return { dias: 0, horas: 0, minutos: 0, segundos: 0 };
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    return { dias, horas, minutos, segundos };
  };

  // Función para calcular el progreso total
  const calcularProgreso = () => {
    const ahora = new Date();
    const duracionTotal = fechaLimite - fechaInicio;
    const duracionTranscurrida = ahora - fechaInicio;
    
    // Si la fecha ya pasó, el progreso es 100%
    if (duracionTranscurrida >= duracionTotal) {
      return {
        diasTranscurridos: Math.floor(duracionTotal / (1000 * 60 * 60 * 24)),
        diasRestantes: 0,
        porcentaje: 100
      };
    }

    // Si aún no ha empezado, el progreso es 0%
    if (duracionTranscurrida <= 0) {
      return {
        diasTranscurridos: 0,
        diasRestantes: Math.floor(duracionTotal / (1000 * 60 * 60 * 24)),
        porcentaje: 0
      };
    }

    const diasTranscurridos = Math.floor(duracionTranscurrida / (1000 * 60 * 60 * 24));
    const porcentaje = Math.round((duracionTranscurrida / duracionTotal) * 100);

    return {
      diasTranscurridos,
      diasRestantes: Math.floor((fechaLimite - ahora) / (1000 * 60 * 60 * 24)),
      porcentaje
    };
  };

  // Actualizar el contador y el progreso cada segundo
  useEffect(() => {
    const intervalo = setInterval(() => {
      setTiempoRestante(calcularTiempo());
      setProgreso(calcularProgreso());
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  const stats = [
    { id: 1, titulo: 'Momentos completados', valor: '2', icono: 'fa-check-circle', color: '#3ca203', bgColor: '#e6f7ed' },
    { id: 2, titulo: 'Bitácoras subidas', valor: '2', icono: 'fa-book', color: '#0ea5e9', bgColor: '#e0f2fe' },
    { id: 3, titulo: 'Certificado obtenido', valor: '1', icono: 'fa-certificate', color: '#f59e0b', bgColor: '#fef3c7' },
    { id: 4, titulo: 'Notificaciones', valor: '3', icono: 'fa-bell', color: '#ef4444', bgColor: '#fee2e2' },
  ];

  return (
    <div className="dashboard-aprendiz-container">
      {/* ========================================================== */}
      {/* CONTADOR REGRESIVO Y FECHA LÍMITE */}
      {/* ========================================================== */}
      <div className="countdown-section">
        <div className="countdown-header">
          <i className="fas fa-hourglass-half"></i>
          <span>Cuenta regresiva para culminar tu etapa productiva</span>
        </div>

        {/* 👇 TEXTO DESTACADO CON LOS DÍAS PENDIENTES */}
        <div className="days-remaining">
          <i className="fas fa-calendar-check"></i>
          <span>
            <strong>{tiempoRestante.dias} días</strong> pendientes por terminar
          </span>
        </div>

        {/* 👇 BARRA DE PROGRESO TOTAL */}
        <div className="progress-section">
          <div className="progress-header">
            <span>Progreso de tu etapa productiva</span>
            <span className="progress-percentage">{progreso.porcentaje}%</span>
          </div>
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${progreso.porcentaje}%` }}
            ></div>
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
          <span>Fecha límite: <strong>28 de Febrero de 2026</strong></span>
        </div>
      </div>

      {/* ========================================================== */}
      {/* TARJETAS DE ESTADÍSTICAS */}
      {/* ========================================================== */}
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