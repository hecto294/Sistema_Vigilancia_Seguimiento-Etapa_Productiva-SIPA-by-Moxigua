// src/pages/coordinador/ReporteFichaBitacoras.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ReporteFichaBitacoras = () => {
  const { idFicha } = useParams();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Simulación de aprendices por ficha
  const aprendices = [
    { id: 1, nombre: 'Laura Sofia Martinez', bitacoras: 12 },
    { id: 2, nombre: 'Juan Diego Ramirez', bitacoras: 8 },
    { id: 3, nombre: 'Maria Camila Torres', bitacoras: 6 },
    { id: 4, nombre: 'Carlos Mendoza', bitacoras: 10 },
    { id: 5, nombre: 'Valentina Rojas', bitacoras: 4 },
  ];

  const handleSearch = () => setSearchQuery(searchTerm);
  const handleClear = () => { setSearchTerm(''); setSearchQuery(''); };

  const filteredAprendices = aprendices.filter(a =>
    a.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleVerAprendiz = (aprendizId) => {
    navigate(`/coordinador/reporte-bitacoras/aprendiz/${aprendizId}`);
  };

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      <button 
        onClick={() => navigate('/coordinador/reporte-bitacoras')}
        style={{ background: 'transparent', border: 'none', color: '#3ca203', cursor: 'pointer', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}
      >
        <i className="fas fa-arrow-left" /> Volver al reporte
      </button>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Ficha {idFicha}</h2>
      <p style={{ color: '#6b7280', marginBottom: '20px' }}>Selecciona un aprendiz para ver sus bitácoras.</p>

      {/* Barra de búsqueda */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar por nombre del aprendiz..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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

      {filteredAprendices.length === 0 && searchQuery !== '' && (
        <div style={{ textAlign: 'center', padding: '40px', background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <h3 style={{ color: '#dc2626' }}>Dato no encontrado</h3>
          <p style={{ color: '#6b7280' }}>No hay aprendices con ese nombre en esta ficha.</p>
        </div>
      )}

      {filteredAprendices.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
          {filteredAprendices.map((a) => (
            <div
              key={a.id}
              onClick={() => handleVerAprendiz(a.id)}
              style={{
                background: 'white',
                padding: '15px',
                borderRadius: '10px',
                border: '1px solid #e5e7eb',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span style={{ fontWeight: '500' }}>{a.nombre}</span>
              <span style={{ background: '#e6f7ed', color: '#047857', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>
                {a.bitacoras} bitácoras
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReporteFichaBitacoras;