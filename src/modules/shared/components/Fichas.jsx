// src/components/Fichas.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Fichas.css';

const Fichas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const fichas = [
    { codigo: '2875901', programa: 'Análisis y Desarrollo de Software', nivel: 'Tecnólogo', aprendices: 28, estado: 'Activa' },
    { codigo: '2875902', programa: 'Gestión Empresarial', nivel: 'Tecnólogo', aprendices: 24, estado: 'Activa' },
    { codigo: '2875903', programa: 'Contabilidad y Finanzas', nivel: 'Técnico', aprendices: 32, estado: 'Inactiva' },
  ];

  const handleSearch = () => setSearchQuery(searchTerm);
  const handleClear = () => { setSearchTerm(''); setSearchQuery(''); };

  const filteredFichas = fichas.filter((ficha) =>
    ficha.codigo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleVerFicha = (ficha) => {
    if (ficha.estado === 'Inactiva') {
      alert('⚠️ Esta ficha se encuentra inactiva. No se puede ver el detalle.');
      return;
    }
    navigate(`/instructor/ficha/${ficha.codigo}`);
  };

  // Navegar al inicio (Dashboard)
  const goToInicio = () => {
    navigate('/instructor');
    window.location.reload(); // Forzar recarga para que el Layout se actualice
  };

  return (
    <div className="fichas-container">
      {/* MIGA DE PAN CON NAVEGACIÓN FUNCIONAL */}
      <nav style={{ 
        padding: '10px 0', 
        marginBottom: '15px', 
        fontSize: '14px',
        background: 'transparent',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <ol style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          alignItems: 'center', 
          listStyle: 'none', 
          margin: 0, 
          padding: 0, 
          gap: '4px' 
        }}>
          <li style={{ display: 'flex', alignItems: 'center', color: '#6b7280', fontSize: '14px' }}>
            <span 
              onClick={goToInicio}
              style={{ 
                color: '#3ca203', 
                textDecoration: 'none', 
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Inicio
            </span>
            <span style={{ margin: '0 4px', color: '#9ca3af' }}> &gt; </span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', color: '#1f2937', fontSize: '14px', fontWeight: '600' }}>
            Mis Fichas
          </li>
        </ol>
      </nav>

      <div className="fichas-header">
        <h2>Mis Fichas de Formación</h2>
      </div>

      <div className="search-container">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Buscar por código de ficha..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button className="btn-search" onClick={handleSearch}>Buscar</button>
        <button className="btn-clear" onClick={handleClear}>Limpiar</button>
      </div>

      {filteredFichas.length === 0 ? (
        <div className="not-found">
          <h2><i className="fas fa-exclamation-circle"></i> Dato no encontrado</h2>
          <p>No existe ninguna ficha con el código ingresado.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="fichas-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Programa</th>
                <th>Nivel</th>
                <th>Aprendices</th>
                <th>Estado</th>
                <th style={{ textAlign: 'center' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredFichas.map((ficha) => (
                <tr key={ficha.codigo}>
                  <td className="codigo">{ficha.codigo}</td>
                  <td>{ficha.programa}</td>
                  <td>{ficha.nivel}</td>
                  <td>{ficha.aprendices}</td>
                  <td>
                    <span className={`status-ficha ${ficha.estado === 'Activa' ? 'status-activa' : 'status-inactiva'}`}>
                      {ficha.estado}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {ficha.estado === 'Activa' ? (
                      <button
                        className="btn-ver-ficha"
                        onClick={() => handleVerFicha(ficha)}
                      >
                        <i className="fas fa-eye" /> Ver
                      </button>
                    ) : (
                      <span style={{ 
                        color: '#9ca3af', 
                        fontSize: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}>
                        <i className="fas fa-lock" style={{ fontSize: '11px' }} />
                        Bloqueado
                      </span>
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

export default Fichas;