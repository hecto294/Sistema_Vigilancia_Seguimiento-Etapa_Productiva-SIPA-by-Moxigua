// src/pages/coordinador/EmpresasGlobales.jsx
import React, { useState } from 'react';

const EmpresasGlobales = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Datos globales de empresas
  const empresas = [
    { id: 1, nombre: 'TechSoft S.A.S.', arl: 'SURA', aprendices: 8 },
    { id: 2, nombre: 'Innovar Solutions', arl: 'Positiva', aprendices: 5 },
    { id: 3, nombre: 'Global Services LTDA', arl: 'Colmena', aprendices: 12 },
    { id: 4, nombre: 'DataTech Colombia', arl: 'Positiva', aprendices: 6 },
  ];

  const handleSearch = () => setSearchQuery(searchTerm);
  const handleClear = () => { setSearchTerm(''); setSearchQuery(''); };

  const filteredEmpresas = empresas.filter(e =>
    e.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Empresas Globales</h2>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1, padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
        />
        <button onClick={handleSearch} style={{ background: '#3ca203', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px' }}>Buscar</button>
        <button onClick={handleClear} style={{ background: '#e5e7eb', border: 'none', padding: '10px 20px', borderRadius: '6px' }}>Limpiar</button>
      </div>

      {filteredEmpresas.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h3 style={{ color: '#dc2626' }}>Dato no encontrado</h3>
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e5e7eb' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px' }}>Empresa</th>
                <th style={{ textAlign: 'left', padding: '12px' }}>ARL</th>
                <th style={{ textAlign: 'center', padding: '12px' }}>Aprendices</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmpresas.map(e => (
                <tr key={e.id}>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>{e.nombre}</td>
                  <td style={{ padding: '12px' }}>{e.arl}</td>
                  <td style={{ textAlign: 'center', padding: '12px' }}>{e.aprendices}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmpresasGlobales;