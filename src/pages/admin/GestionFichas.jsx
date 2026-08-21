// src/pages/admin/GestionFichas.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CargaMasivaFichas from './CargaMasivaFichas';

const GestionFichas = () => {
  const location = useLocation();
  const esApoyo = location.pathname.startsWith('/apoyo');

  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalCargaMasiva, setModalCargaMasiva] = useState(false);
  const [modalNuevaFicha, setModalNuevaFicha] = useState(false);

  const [fichas, setFichas] = useState([
    { idFicha: '2875901', programa: 'Análisis y Desarrollo de Software', nivel: 'Tecnólogo', aprendices: 28, estado: 'Activa' },
    { idFicha: '2875902', programa: 'Gestión Empresarial', nivel: 'Tecnólogo', aprendices: 24, estado: 'Activa' },
    { idFicha: '2875903', programa: 'Contabilidad y Finanzas', nivel: 'Técnico', aprendices: 32, estado: 'Inactiva' },
    { idFicha: '2875904', programa: 'Desarrollo Web', nivel: 'Tecnólogo', aprendices: 20, estado: 'Activa' },
  ]);

  const [nuevaFicha, setNuevaFicha] = useState({
    idFicha: '',
    programa: '',
    nivel: 'Tecnólogo',
    aprendices: 0,
    estado: 'Activa'
  });

  // --- Búsqueda ---
  const handleSearch = () => setSearchQuery(searchTerm);
  const handleClear = () => { setSearchTerm(''); setSearchQuery(''); };

  const filteredFichas = fichas.filter(f =>
    f.idFicha.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.programa.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- Crear ficha (solo Admin) ---
  const handleCrearFicha = (e) => {
    e.preventDefault();
    if (!nuevaFicha.idFicha || !nuevaFicha.programa) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }
    if (fichas.some(f => f.idFicha === nuevaFicha.idFicha)) {
      alert('❌ Ya existe una ficha con ese código.');
      return;
    }
    setFichas([...fichas, { ...nuevaFicha }]);
    setModalNuevaFicha(false);
    setNuevaFicha({ idFicha: '', programa: '', nivel: 'Tecnólogo', aprendices: 0, estado: 'Activa' });
  };

  // --- Carga masiva (solo Admin) ---
  const handleFichasCargadas = (nuevasFichas) => {
    setFichas([...fichas, ...nuevasFichas]);
  };

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Gestión de Fichas</h2>
          <p style={{ color: '#6b7280', margin: '5px 0 0 0' }}>
            {esApoyo ? 'Consulta de fichas de formación.' : 'Administra todas las fichas de formación del sistema.'}
          </p>
        </div>
        {/* --- BOTONES OCULTOS PARA APOYO --- */}
        {!esApoyo && (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setModalCargaMasiva(true)}
              style={{
                background: '#0ea5e9',
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
            <button
              onClick={() => setModalNuevaFicha(true)}
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
              <i className="fas fa-plus" /> Nueva Ficha
            </button>
          </div>
        )}
      </div>

      {/* BARRA DE BÚSQUEDA */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar por código o programa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
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
          {searchQuery && (
            <div style={{ marginBottom: '15px', fontSize: '14px', color: '#6b7280' }}>
              <i className="fas fa-list" /> Mostrando {filteredFichas.length} de {fichas.length} fichas
            </div>
          )}
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Código</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Programa</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Nivel</th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280' }}>Aprendices</th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280' }}>Estado</th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredFichas.map(f => (
                <tr key={f.idFicha} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold', color: '#3ca203' }}>{f.idFicha}</td>
                  <td style={{ padding: '12px' }}>{f.programa}</td>
                  <td style={{ padding: '12px' }}>{f.nivel}</td>
                  <td style={{ textAlign: 'center', padding: '12px' }}>{f.aprendices}</td>
                  <td style={{ textAlign: 'center', padding: '12px' }}>
                    <span style={{
                      background: f.estado === 'Activa' ? '#d1fae5' : '#f3f4f6',
                      color: f.estado === 'Activa' ? '#047857' : '#6b7280',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      {f.estado}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center', padding: '12px' }}>
                    {esApoyo ? (
                      <span style={{ color: '#9ca3af', fontSize: '13px' }}>
                        <i className="fas fa-eye" style={{ marginRight: '6px' }} /> Solo lectura
                      </span>
                    ) : (
                      <>
                        <button
                          onClick={() => alert(`Editando la ficha ${f.idFicha}`)}
                          style={{ background: '#e6f7ed', color: '#047857', border: 'none', padding: '4px 12px', borderRadius: '6px', marginRight: '5px', cursor: 'pointer' }}
                        >
                          <i className="fas fa-edit" /> Editar
                        </button>
                        <button
                          onClick={() => alert(`Eliminando la ficha ${f.idFicha}`)}
                          style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '4px 12px', borderRadius: '6px', cursor: 'pointer' }}
                        >
                          <i className="fas fa-trash" /> Eliminar
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ========================================================== */}
      {/* MODALES (SOLO PARA ADMIN) */}
      {/* ========================================================== */}
      {!esApoyo && modalNuevaFicha && (
        // ... tu modal de creación de ficha ...
        <div>Modal de creación de ficha</div>
      )}

      {!esApoyo && modalCargaMasiva && (
        // ... tu modal de carga masiva de fichas ...
        <div>Modal de carga masiva de fichas</div>
      )}
    </div>
  );
};

export default GestionFichas;