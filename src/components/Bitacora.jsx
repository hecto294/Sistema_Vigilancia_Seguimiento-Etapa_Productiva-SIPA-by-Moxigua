// src/components/Bitacora.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Bitacora.css';

const Bitacora = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const aprendices = [
    { id: 1, nombre: 'Laura Sofia Martinez' },
    { id: 2, nombre: 'Juan Diego Ramirez' },
    { id: 3, nombre: 'Maria Camila Torres' },
  ];

  const handleSearch = () => setSearchQuery(searchTerm);
  const handleClear = () => { setSearchTerm(''); setSearchQuery(''); };

  const filteredAprendices = aprendices.filter(a =>
    a.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Esta función lleva al aprendiz a la nueva página sin desplegar nada
  const handleSeleccionarAprendiz = (id) => {
    navigate(`/instructor/bitacora/aprendiz/${id}`);
  };

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>Bitácora de Seguimiento</h2>
      <p style={{ color: '#6b7280', marginBottom: '20px' }}>Selecciona un aprendiz para ver sus bitácoras organizadas por bimestre.</p>

      {/* --- BARRA DE BÚSQUEDA --- */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar aprendiz..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          style={{ flex: 1, padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
        />
        <button
          onClick={handleSearch}
          style={{
            background: '#3ca203',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Buscar
        </button>
        <button
          onClick={handleClear}
          style={{
            background: '#e5e7eb',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Limpiar
        </button>
      </div>

      {/* --- LISTA DE APRENDICES (Ya no se despliega, solo navega) --- */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginBottom: '30px' }}>
        {filteredAprendices.length === 0 && searchQuery !== '' ? (
          <div style={{ textAlign: 'center', padding: '40px', gridColumn: '1 / -1', background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ color: '#dc2626' }}>Dato no encontrado</h3>
            <p style={{ color: '#6b7280' }}>No hay aprendices con ese nombre.</p>
          </div>
        ) : (
          filteredAprendices.map((ap) => (
            <div
              key={ap.id}
              onClick={() => handleSeleccionarAprendiz(ap.id)}
              style={{
                padding: '15px',
                background: 'white',
                color: '#1f2937',
                borderRadius: '10px',
                border: '1px solid #e5e7eb',
                cursor: 'pointer',
                transition: '0.2s',
                fontWeight: '500',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#3ca203'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
            >
              {ap.nombre}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Bitacora;