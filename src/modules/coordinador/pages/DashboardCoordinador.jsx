// src/pages/coordinador/DashboardCoordinador.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardCoordinador = () => {
  const navigate = useNavigate();

  // Datos de resumen
  const stats = [
    { id: 1, numero: 12, etiqueta: 'Fichas Activas', icono: 'fa-layer-group', color: '#3ca203' },
    { id: 2, numero: 245, etiqueta: 'Aprendices en Etapa', icono: 'fa-users', color: '#0ea5e9' },
    { id: 3, numero: 8, etiqueta: 'Instructores Activos', icono: 'fa-user-tie', color: '#8b5cf6' },
    { id: 4, numero: 38, etiqueta: 'Certificados Listos', icono: 'fa-certificate', color: '#f59e0b' },
  ];

  // Datos de fichas
  const fichas = [
    { id: '2875901', programa: 'Análisis y Desarrollo de Software', instructor: 'Carlos A.', aprendices: 28, finalizacion: '15/12/2025', estado: 'Activa' },
    { id: '2875902', programa: 'Gestión Empresarial', instructor: 'Ana P.', aprendices: 24, finalizacion: '10/01/2026', estado: 'Activa' },
    { id: '2875903', programa: 'Contabilidad y Finanzas', instructor: 'Pedro G.', aprendices: 32, finalizacion: '05/11/2025', estado: 'Activa' },
    { id: '2875904', programa: 'Mecatrónica', instructor: '-', aprendices: 20, finalizacion: '-', estado: 'Inactiva' },
  ];

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      {/* ENCABEZADO */}
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 5px 0' }}>
          Panel Global - Coordinador
        </h2>
        <p style={{ color: '#6b7280', fontSize: '15px', margin: 0 }}>
          Visión general del estado de la etapa productiva.
        </p>
      </div>

      {/* TARJETAS DE RESUMEN */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
        {stats.map((stat) => (
          <div
            key={stat.id}
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
              textAlign: 'center',
              transition: 'all 0.25s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <i className={`fas ${stat.icono}`} style={{ fontSize: '30px', color: stat.color, marginBottom: '10px', display: 'block' }} />
            <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', margin: '0' }}>{stat.numero}</h3>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: '0' }}>{stat.etiqueta}</p>
          </div>
        ))}
      </div>

      {/* TABLA DE FICHAS */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
            <i className="fas fa-layer-group" style={{ color: '#3ca203', marginRight: '8px' }} />
            Estado de Fichas
          </h3>
          <button
            onClick={() => navigate('/coordinador/fichas')}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#3ca203',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Ver todas →
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Ficha</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Programa</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Instructor</th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280' }}>Aprendices</th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280' }}>Finalización</th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280' }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {fichas.map((ficha) => (
                <tr key={ficha.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold', color: '#3ca203' }}>{ficha.id}</td>
                  <td style={{ padding: '12px' }}>{ficha.programa}</td>
                  <td style={{ padding: '12px' }}>{ficha.instructor}</td>
                  <td style={{ textAlign: 'center', padding: '12px' }}>{ficha.aprendices}</td>
                  <td style={{ textAlign: 'center', padding: '12px' }}>{ficha.finalizacion}</td>
                  <td style={{ textAlign: 'center', padding: '12px' }}>
                    <span style={{
                      background: ficha.estado === 'Activa' ? '#d1fae5' : '#f3f4f6',
                      color: ficha.estado === 'Activa' ? '#047857' : '#6b7280',
                      padding: '4px 14px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      {ficha.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardCoordinador;
