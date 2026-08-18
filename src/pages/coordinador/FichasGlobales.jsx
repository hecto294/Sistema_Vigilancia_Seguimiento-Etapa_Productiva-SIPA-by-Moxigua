// src/pages/coordinador/FichasGlobales.jsx
import React, { useState } from 'react';

const FichasGlobales = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fichas = [
    { idFicha: '2875901', programa: 'Análisis y Desarrollo de Software', aprendices: 28, empresaAsignada: 22, completados: 18 },
    { idFicha: '2875902', programa: 'Gestión Empresarial', aprendices: 24, empresaAsignada: 24, completados: 20 },
    { idFicha: '2875903', programa: 'Contabilidad y Finanzas', aprendices: 32, empresaAsignada: 15, completados: 8 },
    { idFicha: '2875904', programa: 'Mecatrónica', aprendices: 20, empresaAsignada: 20, completados: 20 },
    { idFicha: '2875905', programa: 'Diseño Gráfico', aprendices: 18, empresaAsignada: 10, completados: 5 },
  ];

  const handleSearch = () => {
    setSearchQuery(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSearchQuery('');
  };

  const filteredFichas = fichas.filter((ficha) =>
    ficha.idFicha.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ width: '100%', padding: '20px 0', boxSizing: 'border-box' }}>
      {/* Título */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 5px 0' }}>Fichas Globales</h2>
        <p style={{ color: '#6b7280', fontSize: '15px', margin: 0 }}>Visión general de todas las fichas activas en el sistema.</p>
      </div>

      {/* Buscador */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Buscar ficha por código..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px 15px', border: '1px solid #e5e7eb', borderRadius: '6px', flex: 1, outline: 'none' }}
        />
        <button 
          onClick={handleSearch}
          style={{ padding: '10px 20px', backgroundColor: '#39A900', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          Buscar
        </button>
        <button 
          onClick={handleClear}
          style={{ padding: '10px 20px', backgroundColor: '#e5e7eb', color: '#1f2937', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          Limpiar
        </button>
      </div>

      {/* Tabla */}
      {filteredFichas.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h2 style={{ color: '#dc2626' }}>Dato no encontrado</h2>
          <p style={{ color: '#6b7280' }}>No existe ninguna ficha con el código ingresado.</p>
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead style={{ borderBottom: '2px solid #e5e7eb' }}>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px 15px', color: '#6b7280', fontWeight: '600' }}>Código</th>
                <th style={{ textAlign: 'left', padding: '12px 15px', color: '#6b7280', fontWeight: '600' }}>Programa</th>
                <th style={{ textAlign: 'center', padding: '12px 15px', color: '#6b7280', fontWeight: '600' }}>Total Aprendices</th>
                <th style={{ textAlign: 'center', padding: '12px 15px', color: '#6b7280', fontWeight: '600' }}>Con Empresa</th>
                <th style={{ textAlign: 'center', padding: '12px 15px', color: '#6b7280', fontWeight: '600' }}>Listos para Certificar</th>
              </tr>
            </thead>
            <tbody>
              {filteredFichas.map((ficha) => (
                <tr key={ficha.idFicha} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '15px', fontWeight: '600', color: '#1f2937' }}>{ficha.idFicha}</td>
                  <td style={{ padding: '15px' }}>{ficha.programa}</td>
                  <td style={{ textAlign: 'center', padding: '15px' }}>{ficha.aprendices}</td>
                  <td style={{ textAlign: 'center', padding: '15px' }}>
                    <span style={{ background: '#e0f2fe', color: '#0ea5e9', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '500' }}>
                      {ficha.empresaAsignada}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center', padding: '15px' }}>
                    <span style={{ background: '#d1fae5', color: '#047857', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '500' }}>
                      {ficha.completados}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FichasGlobales;