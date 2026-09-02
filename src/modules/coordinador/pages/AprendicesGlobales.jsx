// src/pages/coordinador/AprendicesGlobales.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../shared/components/Breadcrumb';

const AprendicesGlobales = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const aprendices = [
    { id: 1, nombre: 'Laura Sofia Martinez', ficha: '2875901', empresa: 'TechSoft S.A.S.', estado: 'Activo' },
    { id: 2, nombre: 'Juan Diego Ramirez', ficha: '2875901', empresa: 'Innovar Solutions', estado: 'Activo' },
    { id: 3, nombre: 'Maria Camila Torres', ficha: '2875902', empresa: 'Global Services LTDA', estado: 'Activo' },
  ];

  const handleSearch = () => setSearchQuery(searchTerm);
  const handleClear = () => { setSearchTerm(''); setSearchQuery(''); };

  const filteredAprendices = aprendices.filter(a =>
    a.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.ficha.includes(searchQuery)
  );

  const handleVerDetalle = (id) => {
    navigate(`/coordinador/aprendices/${id}`);
  };

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      <Breadcrumb />

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Aprendices Globales</h2>
        <p style={{ color: '#6b7280', margin: '5px 0 0 0' }}>Visualización de aprendices del sistema.</p>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar por nombre o ficha..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1, padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
        />
        <button onClick={handleSearch} style={{ background: '#3ca203', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}>Buscar</button>
        <button onClick={handleClear} style={{ background: '#e5e7eb', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}>Limpiar</button>
      </div>

      {filteredAprendices.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h3 style={{ color: '#dc2626' }}>Dato no encontrado</h3>
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e5e7eb', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Nombre</th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280' }}>Ficha</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Empresa</th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280' }}>Estado</th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredAprendices.map(a => (
                <tr key={a.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>{a.nombre}</td>
                  <td style={{ textAlign: 'center', padding: '12px' }}>{a.ficha}</td>
                  <td style={{ padding: '12px' }}>{a.empresa || 'Sin asignar'}</td>
                  <td style={{ textAlign: 'center', padding: '12px' }}>
                    <span style={{
                      background: a.estado === 'Activo' ? '#d1fae5' : '#f3f4f6',
                      color: a.estado === 'Activo' ? '#047857' : '#6b7280',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      {a.estado}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center', padding: '12px' }}>
                    <button
                      onClick={() => handleVerDetalle(a.id)}
                      style={{ background: '#e6f7ed', color: '#047857', border: 'none', padding: '4px 12px', borderRadius: '6px', cursor: 'pointer' }}
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

export default AprendicesGlobales;