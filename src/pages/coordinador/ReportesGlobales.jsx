// src/pages/coordinador/ReportesGlobales.jsx
import React from 'react';

const ReportesGlobales = () => {
  return (
    <div style={{ width: '100%' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 5px 0' }}>Reportes Globales</h2>
      <p style={{ color: '#6b7280', marginBottom: '20px' }}>Resumen consolidado de indicadores clave del sistema.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <h4 style={{ color: '#39A900' }}>Aprendices por ficha</h4>
          <table style={{ width: '100%', marginTop: '10px' }}>
            <thead>
              <tr>
                <th>Ficha</th>
                <th>Aprendices</th>
                <th>% Asignados</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>2875901</td><td>28</td><td>78%</td></tr>
              <tr><td>2875902</td><td>24</td><td>100%</td></tr>
              <tr><td>2875903</td><td>32</td><td>47%</td></tr>
            </tbody>
          </table>
        </div>

        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <h4 style={{ color: '#39A900' }}>Certificados emitidos</h4>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>38</p>
          <p style={{ color: '#6b7280' }}>de 245 aprendices</p>
        </div>
      </div>
    </div>
  );
};

export default ReportesGlobales;