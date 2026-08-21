// src/pages/coordinador/ReportesGlobales.jsx
import React, { useState } from 'react';

const ReportesGlobales = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Datos de ejemplo para el reporte integral del coordinador
  const reporte = [
    {
      ficha: '2875901',
      aprendiz: 'Laura Sofia Martinez',
      empresa: 'TechSoft S.A.S.',
      arl: 'SURA',
      bitacoras: 4,
      avance: 83,
      momentos: 'Momento 1 y 2 completados',
      observacion: 'Buen desempeño en herramientas ofimáticas.'
    },
    {
      ficha: '2875901',
      aprendiz: 'Juan Diego Ramirez',
      empresa: 'Innovar Solutions',
      arl: 'Positiva',
      bitacoras: 3,
      avance: 56,
      momentos: 'Momento 1 completado',
      observacion: 'Requiere refuerzo en lógica de programación.'
    },
    {
      ficha: '2875902',
      aprendiz: 'Carlos Mendoza',
      empresa: 'Global Services LTDA',
      arl: 'Colmena',
      bitacoras: 6,
      avance: 100,
      momentos: 'Todos completados',
      observacion: 'Excelente rendimiento. Listo para certificar.'
    },
    {
      ficha: '2875902',
      aprendiz: 'Valentina Rojas',
      empresa: 'DataTech Colombia',
      arl: 'SURA',
      bitacoras: 2,
      avance: 40,
      momentos: 'Momento 1 en proceso',
      observacion: 'Asistencia irregular a reuniones de equipo.'
    },
    {
      ficha: '2875903',
      aprendiz: 'Luisa Fernanda Gomez',
      empresa: 'Sin asignar',
      arl: '-',
      bitacoras: 1,
      avance: 15,
      momentos: 'Sin momentos iniciados',
      observacion: 'Pendiente de asignación de empresa.'
    },
  ];

  // Función del botón Buscar
  const handleSearch = () => {
    setSearchQuery(searchTerm);
  };

  // Función del botón Limpiar
  const handleClear = () => {
    setSearchTerm('');
    setSearchQuery('');
  };

  // Filtrar por búsqueda
  const reporteFiltrado = reporte.filter(item =>
    item.aprendiz.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.ficha.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.empresa.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 5px 0' }}>Reporte Global de Seguimiento</h2>
        <p style={{ color: '#6b7280' }}>Resumen integral del avance de todos los aprendices en etapa productiva.</p>
      </div>

      {/* Barra de búsqueda con botones */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar por aprendiz, ficha o empresa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1, padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
        />
        <button
          onClick={handleSearch}
          style={{ background: '#3ca203', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Buscar
        </button>
        <button
          onClick={handleClear}
          style={{ background: '#e5e7eb', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}
        >
          Limpiar
        </button>
      </div>

      {reporteFiltrado.length === 0 && searchQuery !== '' && (
        <div style={{ textAlign: 'center', padding: '40px', background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <h3 style={{ color: '#dc2626' }}>Dato no encontrado</h3>
          <p style={{ color: '#6b7280' }}>No se encontraron registros con ese criterio de búsqueda.</p>
        </div>
      )}

      {/* Tabla de reporte */}
      {reporteFiltrado.length > 0 && (
        <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e5e7eb', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ textAlign: 'left', padding: '10px', color: '#6b7280' }}>Ficha</th>
                <th style={{ textAlign: 'left', padding: '10px', color: '#6b7280' }}>Aprendiz</th>
                <th style={{ textAlign: 'left', padding: '10px', color: '#6b7280' }}>Empresa</th>
                <th style={{ textAlign: 'left', padding: '10px', color: '#6b7280' }}>ARL</th>
                <th style={{ textAlign: 'center', padding: '10px', color: '#6b7280' }}>Bitácoras</th>
                <th style={{ textAlign: 'center', padding: '10px', color: '#6b7280' }}>Avance</th>
                <th style={{ textAlign: 'left', padding: '10px', color: '#6b7280' }}>Momentos</th>
                <th style={{ textAlign: 'left', padding: '10px', color: '#6b7280' }}>Observación</th>
              </tr>
            </thead>
            <tbody>
              {reporteFiltrado.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '10px', fontWeight: 'bold' }}>{row.ficha}</td>
                  <td style={{ padding: '10px' }}>{row.aprendiz}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{ color: row.empresa === 'Sin asignar' ? '#9ca3af' : '#1f2937' }}>
                      {row.empresa}
                    </span>
                  </td>
                  <td style={{ padding: '10px' }}>{row.arl}</td>
                  <td style={{ textAlign: 'center', padding: '10px' }}>
                    <span style={{ background: '#e6f7ed', color: '#047857', padding: '2px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
                      {row.bitacoras}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center', padding: '10px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      <span style={{ fontWeight: 'bold', color: row.avance >= 80 ? '#10b981' : row.avance >= 50 ? '#f59e0b' : '#ef4444' }}>
                        {row.avance}%
                      </span>
                      <div style={{ width: '80px', height: '6px', background: '#f3f4f6', borderRadius: '10px', overflow: 'hidden' }}>
                        <div style={{ width: `${row.avance}%`, height: '100%', background: row.avance >= 80 ? '#10b981' : row.avance >= 50 ? '#f59e0b' : '#ef4444', borderRadius: '10px' }} />
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '10px', fontSize: '13px' }}>{row.momentos}</td>
                  <td style={{ padding: '10px', fontSize: '13px', color: '#6b7280', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {row.observacion}
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

export default ReportesGlobales;