// src/pages/aprendiz/MisCertificados.jsx
import React from 'react';

const MisCertificados = () => {
  // Un solo certificado correspondiente a su programa de formación
  const certificado = {
    titulo: 'Análisis y Desarrollo de Software',
    fecha: '15/06/2025',
    estado: 'Emitido',
    horas: 2200,
    institucion: 'SENA - Centro de Tecnología y Diseño'
  };

  const handleDownload = () => {
    alert(`Descargando certificado: ${certificado.titulo}`);
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>Mi Certificado</h2>
        <p style={{ color: '#6b7280' }}>Consulta y descarga tu certificado de formación.</p>
      </div>

      {/* Una sola tarjeta grande y destacada */}
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '16px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        maxWidth: '600px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <i className="fas fa-certificate" style={{ fontSize: '48px', color: '#39A900' }}></i>
        </div>

        <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 5px 0' }}>
          {certificado.titulo}
        </h3>

        <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '10px' }}>
          <i className="fas fa-calendar-alt" style={{ marginRight: '8px', color: '#39A900' }} />
          {certificado.fecha}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <span style={{
            background: '#d1fae5',
            color: '#047857',
            padding: '4px 14px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: 'bold',
            display: 'inline-block'
          }}>
            {certificado.estado}
          </span>
        </div>

        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '15px', marginBottom: '15px', fontSize: '13px', color: '#6b7280' }}>
          <p style={{ margin: '5px 0' }}><strong>Institución:</strong> {certificado.institucion}</p>
          <p style={{ margin: '5px 0' }}><strong>Duración:</strong> {certificado.horas} horas</p>
        </div>

        <button
          onClick={handleDownload}
          style={{
            background: '#39A900',
            color: 'white',
            border: 'none',
            padding: '10px 30px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: '0.2s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#2d8a00'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#39A900'}
        >
          <i className="fas fa-download" style={{ marginRight: '8px' }} /> Descargar certificado
        </button>
      </div>
    </div>
  );
};

export default MisCertificados;