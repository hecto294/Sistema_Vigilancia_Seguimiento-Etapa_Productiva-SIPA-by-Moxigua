// src/pages/coordinador/AsignarFichasInstructor.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AsignarFichasInstructor = () => {
  const navigate = useNavigate();
  const { instructorId } = useParams();

  // Datos del instructor (buscado por ID)
  const instructor = {
    id: parseInt(instructorId),
    nombre: 'Carlos Andrés López',
    email: 'carlos@sena.edu.co',
    fichasAsignadas: 2
  };

  // Datos de todas las fichas disponibles
  const [fichas, setFichas] = useState([
    { id: '2875901', programa: 'Análisis y Desarrollo de Software', asignada: true },
    { id: '2875902', programa: 'Gestión Empresarial', asignada: true },
    { id: '2875903', programa: 'Contabilidad y Finanzas', asignada: false },
    { id: '2875904', programa: 'Mecatrónica', asignada: false },
    { id: '2875905', programa: 'Diseño Gráfico', asignada: false },
  ]);

  // Función para alternar el estado de asignación
  const toggleAsignacion = (fichaId) => {
    setFichas(fichas.map(f => 
      f.id === fichaId ? { ...f, asignada: !f.asignada } : f
    ));
  };

  // Guardar cambios y volver
  const guardarCambios = () => {
    const totalAsignadas = fichas.filter(f => f.asignada).length;
    alert(`✅ Asignaciones guardadas. El instructor ahora tiene ${totalAsignadas} fichas.`);
    navigate('/coordinador/instructores');
  };

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      <div style={{ marginBottom: '25px' }}>
        <button 
          onClick={() => navigate('/coordinador/instructores')}
          style={{ background: 'transparent', border: 'none', color: '#3ca203', cursor: 'pointer', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <i className="fas fa-arrow-left" /> Volver a instructores
        </button>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 5px 0' }}>
          Asignar Fichas a {instructor.nombre}
        </h2>
        <p style={{ color: '#6b7280' }}>Email: {instructor.email} • Fichas actuales: {instructor.fichasAsignadas}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px' }}>Fichas disponibles</h3>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>Selecciona o deselecciona las fichas que deseas asignar a este instructor.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px' }}>
        {fichas.map((ficha) => (
          <div
            key={ficha.id}
            onClick={() => toggleAsignacion(ficha.id)}
            style={{
              background: ficha.asignada ? '#d1fae5' : 'white',
              padding: '15px 20px',
              borderRadius: '10px',
              border: ficha.asignada ? '2px solid #3ca203' : '1px solid #e5e7eb',
              cursor: 'pointer',
              transition: '0.2s',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>{ficha.id}</h4>
              <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>{ficha.programa}</p>
            </div>
            <span style={{
              background: ficha.asignada ? '#3ca203' : '#e5e7eb',
              color: ficha.asignada ? 'white' : '#6b7280',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              {ficha.asignada ? 'Asignada' : 'Disponible'}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '30px', justifyContent: 'flex-end' }}>
        <button 
          onClick={() => navigate('/coordinador/instructores')}
          style={{ background: '#e5e7eb', border: 'none', padding: '10px 24px', borderRadius: '6px', cursor: 'pointer' }}
        >
          Cancelar
        </button>
        <button 
          onClick={guardarCambios}
          style={{ background: '#3ca203', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Guardar cambios
        </button>
      </div>
    </div>
  );
};

export default AsignarFichasInstructor;