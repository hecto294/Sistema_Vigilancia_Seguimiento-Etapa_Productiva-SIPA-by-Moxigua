// src/pages/coordinador/ReporteBitacoras.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReporteBitacoras = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Datos de fichas con resumen de bitácoras
  const fichas = [
    { id: '2875901', programa: 'Análisis y Desarrollo de Software', totalBitacoras: 42, aprendices: 28 },
    { id: '2875902', programa: 'Gestión Empresarial', totalBitacoras: 38, aprendices: 24 },
    { id: '2875903', programa: 'Contabilidad y Finanzas', totalBitacoras: 15, aprendices: 32 },
    { id: '2875904', programa: 'Mecatrónica', totalBitacoras: 20, aprendices: 20 },
    { id: '2875905', programa: 'Diseño Gráfico', totalBitacoras: 10, aprendices: 18 },
  ];

  // Filtrar por búsqueda
  const filteredFichas = fichas.filter(f =>
    f.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.programa.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = () => setSearchQuery(searchTerm);
  const handleClear = () => { setSearchTerm(''); setSearchQuery(''); };

  const handleVerFicha = (id) => {
    navigate(`/coordinador/reporte-bitacoras/ficha/${id}`);
  };

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>Reporte Global de Bitácoras</h2>
      <p style={{ color: '#6b7280', marginBottom: '20px' }}>Selecciona una ficha para ver el detalle de sus aprendices y bitácoras.</p>

      {/* Barra de búsqueda */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar por ficha o programa..."
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

      {filteredFichas.length === 0 && searchQuery !== '' && (
        <div style={{ textAlign: 'center', padding: '40px', background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <h3 style={{ color: '#dc2626' }}>Dato no encontrado</h3>
          <p style={{ color: '#6b7280' }}>No se encontraron fichas con ese criterio de búsqueda.</p>
        </div>
      )}

      {filteredFichas.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {filteredFichas.map((f) => (
            <div
              key={f.id}
              onClick={() => handleVerFicha(f.id)}
              style={{
                background: 'white',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                cursor: 'pointer',
                transition: '0.2s',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <h3 style={{ color: '#3ca203', fontSize: '20px', fontWeight: 'bold' }}>{f.id}</h3>
              <p style={{ fontWeight: '500' }}>{f.programa}</p>
              <p style={{ color: '#6b7280', fontSize: '14px' }}>{f.totalBitacoras} bitácoras • {f.aprendices} aprendices</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReporteBitacoras;