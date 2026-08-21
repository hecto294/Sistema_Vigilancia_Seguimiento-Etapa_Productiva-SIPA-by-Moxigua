// src/pages/coordinador/Parametrizacion.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Parametrizacion = () => {
  const navigate = useNavigate();

  const opciones = [
    { titulo: 'Fichas', icono: 'fa-layer-group', ruta: '/coordinador/fichas' },
    { titulo: 'Empresas', icono: 'fa-building', ruta: '/coordinador/empresas' },
    { titulo: 'Aprendices', icono: 'fa-users', ruta: '/coordinador/aprendices' },
    { titulo: 'Instructores', icono: 'fa-chalkboard-teacher', ruta: '/coordinador/instructores' },
  ];

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1f2937' }}>Parametrización General</h2>
        <p style={{ color: '#6b7280', fontSize: '15px' }}>Gestiona los recursos globales del sistema.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {opciones.map((op, idx) => (
          <div
            key={idx}
            onClick={() => navigate(op.ruta)}
            style={{
              background: 'white',
              padding: '30px',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              textAlign: 'center',
              cursor: 'pointer',
              transition: '0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <i className={`fas ${op.icono}`} style={{ fontSize: '40px', color: '#3ca203', marginBottom: '15px' }} />
            <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>{op.titulo}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Parametrizacion;