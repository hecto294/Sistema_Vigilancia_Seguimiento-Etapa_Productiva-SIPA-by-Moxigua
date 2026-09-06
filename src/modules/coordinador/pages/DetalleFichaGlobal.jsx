// src/pages/coordinador/DetalleFichaGlobal.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fichasData } from '@/data/coordinadorData'; // <--- CAMBIADO AL ALIAS @

const DetalleFichaGlobal = () => {
  const { idFicha } = useParams();
  const navigate = useNavigate();

  const ficha = fichasData.find(f => f.idFicha === idFicha);

  if (!ficha) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h3 style={{ color: '#dc2626' }}>Ficha no encontrada</h3>
      </div>
    );
  }

  const [aprendices, setAprendices] = useState(
    ficha.aprendices.map((a, index) => ({
      ...a,
      empresa: index === 2 ? 'Sin asignar' : (index % 2 === 0 ? 'TechSoft S.A.S.' : 'Innovar Solutions'),
      arl: index === 2 ? '-' : (index % 2 === 0 ? 'SURA' : 'Positiva'),
      fechaInicio: index === 2 ? 'Pendiente' : '01/03/2025',
      fechaFin: index === 2 ? 'Pendiente' : '28/02/2026',
      observaciones: index === 2 ? 'Pendiente de asignación de empresa.' : 'Buen desempeño.',
      instructor: 'Carlos Andrés López'
    }))
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => setSearchQuery(searchTerm);
  const handleClear = () => { setSearchTerm(''); setSearchQuery(''); };

  const filteredAprendices = aprendices.filter(a =>
    a.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (a.empresa && a.empresa.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      <button 
        onClick={() => navigate('/coordinador/fichas')}
        style={{ background: 'transparent', border: 'none', color: '#3ca203', cursor: 'pointer', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}
      >
        <i className="fas fa-arrow-left" /> Volver a fichas
      </button>

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Ficha {idFicha}</h2>
        <p style={{ color: '#6b7280' }}>{ficha.programa}</p>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar por aprendiz o empresa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1, padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
        />
        <button onClick={handleSearch} style={{ background: '#3ca203', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px' }}>Buscar</button>
        <button onClick={handleClear} style={{ background: '#e5e7eb', border: 'none', padding: '10px 20px', borderRadius: '6px' }}>Limpiar</button>
      </div>

      {filteredAprendices.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h3 style={{ color: '#dc2626' }}>Dato no encontrado</h3>
          <p style={{ color: '#6b7280' }}>No hay aprendices con esos datos.</p>
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e5e7eb', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '10px' }}>Aprendiz</th>
                <th style={{ textAlign: 'left', padding: '10px' }}>Empresa</th>
                <th style={{ textAlign: 'left', padding: '10px' }}>ARL</th>
                <th style={{ textAlign: 'left', padding: '10px' }}>Instructor</th>
                <th style={{ textAlign: 'center', padding: '10px' }}>Fecha Inicio</th>
                <th style={{ textAlign: 'center', padding: '10px' }}>Fecha Fin</th>
                <th style={{ textAlign: 'left', padding: '10px' }}>Observaciones</th>
                <th style={{ textAlign: 'center', padding: '10px' }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {filteredAprendices.map((a, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '10px', fontWeight: 'bold' }}>{a.nombre}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{ color: a.empresa === 'Sin asignar' ? '#ef4444' : '#1f2937' }}>
                      {a.empresa}
                    </span>
                  </td>
                  <td style={{ padding: '10px' }}>{a.arl}</td>
                  <td style={{ padding: '10px' }}>{a.instructor}</td>
                  <td style={{ textAlign: 'center', padding: '10px' }}>{a.fechaInicio}</td>
                  <td style={{ textAlign: 'center', padding: '10px' }}>{a.fechaFin}</td>
                  <td style={{ padding: '10px', fontSize: '13px', color: '#6b7280', maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {a.observaciones}
                  </td>
                  <td style={{ textAlign: 'center', padding: '10px' }}>
                    {a.empresa === 'Sin asignar' ? (
                      <button
                        onClick={() => navigate(`/coordinador/ficha-completa/${idFicha}/aprendiz/${a.id}/asignar-empresa`)}
                        style={{
                          background: '#3ca203',
                          color: 'white',
                          border: 'none',
                          padding: '4px 12px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}
                      >
                        Asignar Empresa
                      </button>
                    ) : (
                      <span style={{ color: '#10b981', fontSize: '12px' }}>✅ Asignada</span>
                    )}
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

export default DetalleFichaGlobal;
