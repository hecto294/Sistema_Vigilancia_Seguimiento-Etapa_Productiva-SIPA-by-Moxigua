// src/pages/instructor/DetalleFichaInstructor.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DetalleFichaInstructor = () => {
  const { idFicha } = useParams();
  const navigate = useNavigate();

  // Datos de la ficha y sus aprendices
  const ficha = {
    codigo: idFicha,
    programa: 'Análisis y Desarrollo de Software',
    aprendices: [
      {
        nombre: 'Laura Sofia Martinez',
        documento: '12345678',
        empresa: 'TechSoft S.A.S.',
        arl: 'SURA',
        fechaInicio: '01/03/2025',
        fechaFin: '28/02/2026',
        estado: 'Activo'
      },
      {
        nombre: 'Juan Diego Ramirez',
        documento: '87654321',
        empresa: 'Innovar Solutions',
        arl: 'Positiva',
        fechaInicio: '15/04/2025',
        fechaFin: '14/04/2026',
        estado: 'Activo'
      },
      {
        nombre: 'Maria Camila Torres',
        documento: '11223344',
        empresa: 'Global Services LTDA',
        arl: 'Colmena',
        fechaInicio: '01/06/2025',
        fechaFin: '31/05/2026',
        estado: 'Activo'
      }
    ]
  };

  const handleAgregarObservacion = (aprendiz) => {
    const observacion = window.prompt(`Ingresa una observación para ${aprendiz.nombre}:`);
    if (observacion && observacion.trim() !== '') {
      alert(`✅ Observación guardada para ${aprendiz.nombre}:\n"${observacion}"`);
    }
  };

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      {/* Botón de volver */}
      <button 
        onClick={() => navigate('/instructor')}
        style={{ background: 'transparent', border: 'none', color: '#3ca203', cursor: 'pointer', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}
      >
        <i className="fas fa-arrow-left" /> Volver a mis fichas
      </button>

      {/* Título de la ficha */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Ficha {ficha.codigo}</h2>
        <p style={{ color: '#6b7280', margin: '5px 0 0 0' }}>{ficha.programa}</p>
      </div>

      {/* Tabla de aprendices */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e5e7eb' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ textAlign: 'left', padding: '12px 15px', color: '#6b7280' }}>Nombre</th>
              <th style={{ textAlign: 'left', padding: '12px 15px', color: '#6b7280' }}>Empresa</th>
              <th style={{ textAlign: 'left', padding: '12px 15px', color: '#6b7280' }}>ARL</th>
              <th style={{ textAlign: 'center', padding: '12px 15px', color: '#6b7280' }}>Fecha Inicio</th>
              <th style={{ textAlign: 'center', padding: '12px 15px', color: '#6b7280' }}>Fecha Fin</th>
              <th style={{ textAlign: 'center', padding: '12px 15px', color: '#6b7280' }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {ficha.aprendices.map((ap, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px 15px', fontWeight: '500' }}>{ap.nombre}</td>
                <td style={{ padding: '12px 15px' }}>{ap.empresa}</td>
                <td style={{ padding: '12px 15px' }}>{ap.arl}</td>
                <td style={{ textAlign: 'center', padding: '12px 15px' }}>{ap.fechaInicio}</td>
                <td style={{ textAlign: 'center', padding: '12px 15px' }}>{ap.fechaFin}</td>
                <td style={{ textAlign: 'center', padding: '12px 15px' }}>
                  <button
                    onClick={() => handleAgregarObservacion(ap)}
                    style={{
                      background: '#e6f7ed',
                      color: '#047857',
                      border: 'none',
                      padding: '4px 14px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    <i className="fas fa-pen" style={{ marginRight: '6px' }} /> Observación
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetalleFichaInstructor;