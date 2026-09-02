// src/pages/coordinador/ReporteBitacoras.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../shared/components/Breadcrumb';

const ReporteBitacoras = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Datos organizados por ficha
  const fichas = [
    {
      id: '2875901',
      programa: 'Análisis y Desarrollo de Software',
      instructor: 'Carlos Andrés López',
      aprendices: 2,
      totalBitacoras: 3
    },
    {
      id: '2875902',
      programa: 'Gestión Empresarial',
      instructor: 'Ana María Pérez',
      aprendices: 1,
      totalBitacoras: 1
    },
    {
      id: '2875903',
      programa: 'Contabilidad y Finanzas',
      instructor: 'Pedro Gómez',
      aprendices: 1,
      totalBitacoras: 1
    }
  ];

  const handleSearch = () => setSearchQuery(searchTerm);
  const handleClear = () => { setSearchTerm(''); setSearchQuery(''); };

  const filteredFichas = fichas.filter(f =>
    f.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.programa.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleVerFicha = (idFicha) => {
    navigate(`/coordinador/reporte-bitacoras/ficha/${idFicha}`);
  };

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      <Breadcrumb />

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Reporte de Bitácoras</h2>
        <p style={{ color: '#6b7280', margin: '5px 0 0 0' }}>
          Visualización de bitácoras de los aprendices organizadas por ficha.
        </p>
      </div>

      {/* BUSCADOR */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar por ficha, programa o instructor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1, padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
        />
        <button onClick={handleSearch} style={{ background: '#3ca203', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}>Buscar</button>
        <button onClick={handleClear} style={{ background: '#e5e7eb', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}>Limpiar</button>
      </div>

      {filteredFichas.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h3 style={{ color: '#dc2626' }}>Dato no encontrado</h3>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {filteredFichas.map(f => (
            <div
              key={f.id}
              onClick={() => handleVerFicha(f.id)}
              style={{
                background: 'white',
                padding: '25px 20px',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                textAlign: 'center',
                transition: 'all 0.25s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                e.currentTarget.style.borderColor = '#3ca203';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.04)';
                e.currentTarget.style.borderColor = '#e5e7eb';
              }}
            >
              <div style={{ fontSize: '36px', color: '#3ca203', marginBottom: '10px' }}>
                <i className="fas fa-layer-group" />
              </div>
              <h4 style={{ fontWeight: 'bold', margin: '5px 0', color: '#1f2937', fontSize: '18px' }}>
                Ficha {f.id}
              </h4>
              <p style={{ color: '#6b7280', fontSize: '14px', margin: '5px 0' }}>{f.programa}</p>
              <p style={{ color: '#6b7280', fontSize: '13px', margin: '5px 0' }}>
                <i className="fas fa-user-tie" style={{ marginRight: '6px' }} />
                {f.instructor}
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '12px' }}>
                <span style={{ background: '#e6f7ed', color: '#047857', padding: '2px 10px', borderRadius: '12px', fontSize: '12px' }}>
                  <i className="fas fa-users" /> {f.aprendices} aprendices
                </span>
                <span style={{ background: '#e0f2fe', color: '#0ea5e9', padding: '2px 10px', borderRadius: '12px', fontSize: '12px' }}>
                  <i className="fas fa-book" /> {f.totalBitacoras} bitácoras
                </span>
              </div>
              <div style={{ marginTop: '12px', fontSize: '13px', color: '#3ca203' }}>
                <i className="fas fa-eye" /> Ver bitácoras
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReporteBitacoras;