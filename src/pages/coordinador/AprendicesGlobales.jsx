// src/pages/coordinador/AprendicesGlobales.jsx
import React, { useState } from 'react';

const AprendicesGlobales = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const aprendices = [
    { nombre: 'Laura Sofia Martinez', ficha: '2875901', empresa: 'TechSoft S.A.S.' },
    { nombre: 'Juan Diego Ramirez', ficha: '2875901', empresa: 'Innovar Solutions' },
    { nombre: 'Carlos Mendoza', ficha: '2875902', empresa: 'Global Services LTDA' },
    { nombre: 'Valentina Rojas', ficha: '2875902', empresa: 'DataTech Colombia' },
    { nombre: 'Andrés Felipe Castro', ficha: '2875902', empresa: 'Soluciones Web SAS' },
    { nombre: 'Luisa Fernanda Gomez', ficha: '2875903', empresa: 'Sin asignar' },
  ];

  const handleSearch = () => setSearchQuery(searchTerm);
  const handleClear = () => { setSearchTerm(''); setSearchQuery(''); };

  const filtered = aprendices.filter(a =>
    a.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.ficha.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- FUNCIÓN DE CARGA MASIVA ---
  const handleCargaMasiva = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx,.xls,.csv'; // Formatos permitidos
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        alert(`✅ Archivo "${file.name}" seleccionado.\n\nSimulando carga masiva de aprendices...`);
        // Aquí iría la lógica real de subida al backend
      }
    };
    input.click();
  };

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      {/* Encabezado con botón de Carga Masiva */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Aprendices Globales</h2>
          <p style={{ color: '#6b7280', margin: '5px 0 0 0' }}>Gestión centralizada de todos los aprendices del sistema.</p>
        </div>
        <button
          onClick={handleCargaMasiva}
          style={{
            background: '#3ca203',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <i className="fas fa-upload" /> Carga Masiva
        </button>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar por nombre o ficha..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1, padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
        />
        <button onClick={handleSearch} style={{ background: '#3ca203', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px' }}>Buscar</button>
        <button onClick={handleClear} style={{ background: '#e5e7eb', border: 'none', padding: '10px 20px', borderRadius: '6px' }}>Limpiar</button>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h3 style={{ color: '#dc2626' }}>Dato no encontrado</h3>
          <p style={{ color: '#6b7280' }}>No hay aprendices con ese criterio de búsqueda.</p>
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e5e7eb' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Aprendiz</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Ficha</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Empresa</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, idx) => (
                <tr key={idx}>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>{a.nombre}</td>
                  <td style={{ padding: '12px' }}>{a.ficha}</td>
                  <td style={{ padding: '12px' }}>{a.empresa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AprendicesGlobales;