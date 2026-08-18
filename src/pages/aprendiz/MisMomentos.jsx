// src/pages/aprendiz/MisMomentos.jsx
import React, { useState } from 'react';

const MisMomentos = () => {
  const [modalAbierta, setModalAbierta] = useState(false);
  const [momentoSeleccionado, setMomentoSeleccionado] = useState(null);

  const momentos = [
    {
      id: 1,
      titulo: 'Momento 1',
      subtitulo: 'Inducción y Diagnóstico Inicial',
      estado: 'Completado',
      colorEstado: '#d1fae5',
      textColorEstado: '#047857',
      logros: [
        'Asistencia a inducción general.',
        'Diagnóstico de habilidades completado.',
        'Reconocimiento del entorno laboral.'
      ],
      observaciones: 'El aprendiz demostró una excelente actitud durante el diagnóstico inicial. Cumplió con todos los plazos establecidos.'
    },
    {
      id: 2,
      titulo: 'Momento 2',
      subtitulo: 'Ejecución y Seguimiento',
      estado: 'En proceso',
      colorEstado: '#fef3c7',
      textColorEstado: '#d97706',
      logros: [
        'Avance del 60% en el proyecto asignado.',
        'Participación activa en reuniones de equipo.',
        'Cumplimiento de entregas parciales.'
      ],
      observaciones: 'El aprendiz ha mostrado autonomía en el desarrollo de sus tareas. Se recomienda fortalecer la comunicación escrita.'
    },
    {
      id: 3,
      titulo: 'Momento 3',
      subtitulo: 'Evaluación y Cierre',
      estado: 'Pendiente',
      colorEstado: '#f3f4f6',
      textColorEstado: '#6b7280',
      logros: [],
      observaciones: 'El momento 3 se iniciará una vez completados los momentos 1 y 2.'
    }
  ];

  const handleVerMomento = (momento) => {
    setMomentoSeleccionado(momento);
    setModalAbierta(true);
  };

  const handleCerrarModal = () => {
    setModalAbierta(false);
    setMomentoSeleccionado(null);
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>Mis Momentos</h2>
        <p style={{ color: '#6b7280', fontSize: '15px' }}>Revisa el estado y los logros de cada momento de tu formación.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
        {momentos.map((momento) => (
          <div 
            key={momento.id} 
            style={{ 
              background: 'white', 
              padding: '25px', 
              borderRadius: '14px', 
              border: '1px solid #e5e7eb',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
              transition: 'all 0.25s ease',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h4 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 4px 0' }}>
                  {momento.titulo}
                </h4>
                <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
                  {momento.subtitulo}
                </p>
              </div>
              <span style={{ 
                background: momento.colorEstado, 
                color: momento.textColorEstado, 
                padding: '4px 14px', 
                borderRadius: '20px', 
                fontSize: '12px', 
                fontWeight: 'bold',
                whiteSpace: 'nowrap'
              }}>
                {momento.estado}
              </span>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => handleVerMomento(momento)}
                style={{ 
                  background: '#e6f7ed', 
                  color: '#047857', 
                  border: 'none', 
                  padding: '6px 16px', 
                  borderRadius: '20px', 
                  fontSize: '13px', 
                  fontWeight: '500', 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <i className="fas fa-eye" /> Ver detalles
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================== */}
      {/* MODAL DE DETALLES DEL MOMENTO */}
      {/* ========================================================== */}
      {modalAbierta && momentoSeleccionado && (
        <div 
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            backdropFilter: 'blur(4px)',
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            zIndex: 2000 
          }}
          onClick={handleCerrarModal}
        >
          <div 
            style={{ 
              background: 'white', 
              borderRadius: '16px', 
              maxWidth: '500px', 
              width: '90%', 
              maxHeight: '80vh', 
              overflowY: 'auto', 
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)', 
              padding: '30px', 
              position: 'relative' 
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={handleCerrarModal}
              style={{ 
                position: 'absolute', 
                top: '15px', 
                right: '20px', 
                background: 'transparent', 
                border: 'none', 
                fontSize: '28px', 
                color: '#6b7280', 
                cursor: 'pointer' 
              }}
            >
              &times;
            </button>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
                  {momentoSeleccionado.titulo}
                </h3>
                <span style={{ 
                  background: momentoSeleccionado.colorEstado, 
                  color: momentoSeleccionado.textColorEstado, 
                  padding: '4px 14px', 
                  borderRadius: '20px', 
                  fontSize: '12px', 
                  fontWeight: 'bold'
                }}>
                  {momentoSeleccionado.estado}
                </span>
              </div>
              <p style={{ color: '#6b7280', fontSize: '15px', margin: '5px 0 0 0' }}>
                {momentoSeleccionado.subtitulo}
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937', marginBottom: '10px' }}>
                <i className="fas fa-trophy" style={{ marginRight: '8px', color: '#39A900' }} /> Logros alcanzados
              </h4>
              {momentoSeleccionado.logros.length > 0 ? (
                <ul style={{ paddingLeft: '20px', color: '#374151', lineHeight: '1.8' }}>
                  {momentoSeleccionado.logros.map((logro, idx) => (
                    <li key={idx}>{logro}</li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: '#6b7280', fontStyle: 'italic' }}>Aún no hay logros registrados para este momento.</p>
              )}
            </div>

            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937', marginBottom: '10px' }}>
                <i className="fas fa-comment" style={{ marginRight: '8px', color: '#39A900' }} /> Observaciones del instructor
              </h4>
              <div style={{ 
                background: '#f8fafc', 
                padding: '15px', 
                borderRadius: '8px', 
                border: '1px solid #e5e7eb',
                lineHeight: '1.6',
                color: '#374151',
                fontSize: '14px'
              }}>
                {momentoSeleccionado.observaciones}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MisMomentos;