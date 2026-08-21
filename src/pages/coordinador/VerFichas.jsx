// src/pages/coordinador/VerFichas.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fichasData } from '../../data/coordinadorData';

const VerFichas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // NOTA: En un sistema real, este dato vendría del backend.
  // Para simularlo, agregamos el campo 'instructor' a los datos.
  const fichasConInstructor = fichasData.map((ficha, index) => ({
    ...ficha,
    instructor: index % 2 === 0 ? 'Carlos Andrés López' : 'Ana María Pérez'
  }));

  const handleSearch = () => setSearchQuery(searchTerm);
  const handleClear = () => { setSearchTerm(''); setSearchQuery(''); };

  const filteredFichas = fichasConInstructor.filter(f =>
    f.idFicha.includes(searchQuery) || f.programa.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const verDetalleFicha = (idFicha) => {
    navigate(`/coordinador/ficha-completa/${idFicha}`);
  };

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Fichas Globales</h2>
        <p style={{ color: '#6b7280', margin: '5px 0 0 0' }}>Selecciona una ficha para ver la información completa de sus aprendices.</p>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar por código o programa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1, padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
        />
        <button onClick={handleSearch} style={{ background: '#3ca203', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px' }}>Buscar</button>
        <button onClick={handleClear} style={{ background: '#e5e7eb', border: 'none', padding: '10px 20px', borderRadius: '6px' }}>Limpiar</button>
      </div>

      {filteredFichas.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
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
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <h4 style={{ color: '#3ca203', fontWeight: 'bold' }}>{f.idFicha}</h4>
              <p style={{ fontWeight: 'bold' }}>{f.programa}</p>
              <p style={{ color: '#6b7280' }}>{f.aprendices.length} aprendices</p>
              {/* AGREGAMOS EL INSTRUCTOR */}
              <p style={{ fontSize: '13px', color: '#3ca203', marginTop: '5px' }}>
                <i className="fas fa-chalkboard-teacher" style={{ marginRight: '5px' }} />
                Instructor: {f.instructor}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VerFichas;