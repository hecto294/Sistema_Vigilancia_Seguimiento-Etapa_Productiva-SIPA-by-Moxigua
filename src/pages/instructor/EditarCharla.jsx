// src/pages/instructor/EditarCharla.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditarCharla = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Simulamos obtener los datos de la charla por su ID
  const charla = {
    id: parseInt(id),
    nombre: 'Normatividad SENA',
    fecha: '22/06/2025',
    hora: '08:00'
  };

  const [fecha, setFecha] = useState(charla.fecha);
  const [hora, setHora] = useState(charla.hora);

  const handleGuardar = () => {
    // Redirigimos a la raíz del instructor con un parámetro en la URL
    navigate('/instructor?editado=exito');
  };

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      <button 
        onClick={() => navigate('/instructor')}
        style={{ background: 'transparent', border: 'none', color: '#3ca203', cursor: 'pointer', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}
      >
        <i className="fas fa-arrow-left" /> Volver a charlas
      </button>

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Editar</h2>
        <p style={{ color: '#6b7280', margin: '5px 0 0 0' }}>{charla.nombre}</p>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', padding: '30px', border: '1px solid #e5e7eb', maxWidth: '500px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Fecha</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            style={{ width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Hora</label>
          <input
            type="time"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            style={{ width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button
            onClick={() => navigate('/instructor')}
            style={{ background: '#e5e7eb', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}
          >
            Cancelar
          </button>
          <button
            onClick={handleGuardar}
            style={{ background: '#3ca203', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditarCharla;