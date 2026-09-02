// src/pages/coordinador/ReportesGlobales.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../shared/components/Breadcrumb';

const ReportesGlobales = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Datos de fichas con instructor, fechas y avance
  const fichas = [
    { 
      id: '2875901', 
      programa: 'Análisis y Desarrollo de Software', 
      instructor: 'Carlos Andrés López',
      aprendices: 28,
      fechaInicio: '01/03/2025',
      fechaFin: '28/02/2026',
      avance: 78
    },
    { 
      id: '2875902', 
      programa: 'Gestión Empresarial', 
      instructor: 'Ana María Pérez',
      aprendices: 24,
      fechaInicio: '15/01/2025',
      fechaFin: '14/01/2026',
      avance: 92
    },
    { 
      id: '2875903', 
      programa: 'Contabilidad y Finanzas', 
      instructor: 'Pedro Gómez',
      aprendices: 32,
      fechaInicio: '10/06/2025',
      fechaFin: '09/06/2026',
      avance: 45
    },
    { 
      id: '2875904', 
      programa: 'Mecatrónica', 
      instructor: 'Laura Rodríguez',
      aprendices: 20,
      fechaInicio: '20/02/2025',
      fechaFin: '19/02/2026',
      avance: 60
    },
    { 
      id: '2875905', 
      programa: 'Diseño Gráfico', 
      instructor: 'Carlos Andrés López',
      aprendices: 18,
      fechaInicio: '05/04/2025',
      fechaFin: '04/04/2026',
      avance: 30
    },
  ];

  const handleSearch = () => setSearchQuery(searchTerm);
  const handleClear = () => { setSearchTerm(''); setSearchQuery(''); };

  const filteredFichas = fichas.filter(f =>
    f.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.programa.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Función para obtener el color según el porcentaje
  const getColorPorcentaje = (porcentaje) => {
    if (porcentaje >= 80) return '#10b981';
    if (porcentaje >= 50) return '#f59e0b';
    return '#ef4444';
  };

  // Navegar al detalle de la ficha
  const handleVerFicha = (idFicha) => {
    navigate(`/coordinador/reportes/ficha/${idFicha}`);
  };

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      <Breadcrumb />

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Reporte de Fichas</h2>
        <p style={{ color: '#6b7280', margin: '5px 0 0 0' }}>
          Listado detallado de fichas con instructor, fechas y avance.
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

      {/* TABLA DE FICHAS */}
      {filteredFichas.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h3 style={{ color: '#dc2626' }}>Dato no encontrado</h3>
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e5e7eb', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Ficha</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Programa</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Instructor</th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280' }}>Aprendices</th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280' }}>Fecha Inicio</th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280' }}>Fecha Fin</th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280' }}>Avance</th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280' }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {filteredFichas.map(f => (
                <tr key={f.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold', color: '#3ca203' }}>{f.id}</td>
                  <td style={{ padding: '12px' }}>{f.programa}</td>
                  <td style={{ padding: '12px' }}>{f.instructor}</td>
                  <td style={{ textAlign: 'center', padding: '12px' }}>{f.aprendices}</td>
                  <td style={{ textAlign: 'center', padding: '12px' }}>{f.fechaInicio}</td>
                  <td style={{ textAlign: 'center', padding: '12px' }}>{f.fechaFin}</td>
                  <td style={{ textAlign: 'center', padding: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                      <span style={{ fontWeight: 'bold', color: getColorPorcentaje(f.avance), fontSize: '14px' }}>
                        {f.avance}%
                      </span>
                      <div style={{ width: '60px', height: '6px', background: '#f3f4f6', borderRadius: '10px', overflow: 'hidden' }}>
                        <div style={{ 
                          width: `${f.avance}%`, 
                          height: '100%', 
                          background: getColorPorcentaje(f.avance), 
                          borderRadius: '10px' 
                        }} />
                      </div>
                    </div>
                  </td>
                  <td style={{ textAlign: 'center', padding: '12px' }}>
                    <button
                      onClick={() => handleVerFicha(f.id)}
                      style={{ 
                        background: '#e6f7ed', 
                        color: '#047857', 
                        border: 'none', 
                        padding: '4px 12px', 
                        borderRadius: '6px', 
                        cursor: 'pointer' 
                      }}
                    >
                      <i className="fas fa-eye" /> Ver
                    </button>
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