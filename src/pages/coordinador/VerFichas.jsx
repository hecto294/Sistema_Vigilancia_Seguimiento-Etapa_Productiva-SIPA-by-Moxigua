// src/pages/coordinador/VerFichas.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fichasData } from '../../data/coordinadorData';

const VerFichas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => setSearchQuery(searchTerm);
  const handleClear = () => { setSearchTerm(''); setSearchQuery(''); };

  const filteredFichas = fichasData.filter(f =>
    f.idFicha.includes(searchQuery) || f.programa.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const verDetalleFicha = (idFicha) => {
    navigate(`/coordinador/ficha/${idFicha}`);
  };

  return (
    <div style={{ width: '100%' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Fichas Activas</h2>
      <p style={{ color: '#6b7280' }}>Selecciona una ficha para ver sus aprendices.</p>

      <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
        <input
          type="text"
          placeholder="Buscar por código o programa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1, padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
        />
        <button onClick={handleSearch} style={{ background: '#39A900', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px' }}>Buscar</button>
        <button onClick={handleClear} style={{ background: '#e5e7eb', border: 'none', padding: '10px 20px', borderRadius: '6px' }}>Limpiar</button>
      </div>

      {filteredFichas.length === 0 ? (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h3 style={{ color: '#dc2626' }}>Dato no encontrado</h3>
          <p style={{ color: '#6b7280' }}>No hay fichas con ese criterio de búsqueda.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {filteredFichas.map(f => (
            <div
              key={f.idFicha}
              onClick={() => verDetalleFicha(f.idFicha)}
              style={{
                background: 'white',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                cursor: 'pointer',
                transition: '0.2s',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <h4 style={{ color: '#39A900' }}>{f.idFicha}</h4>
              <p style={{ fontWeight: 'bold' }}>{f.programa}</p>
              <p style={{ color: '#6b7280' }}>{f.totalAprendices} aprendices</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VerFichas;