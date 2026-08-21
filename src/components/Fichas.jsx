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

  const handleVerFicha = (codigo) => {
    navigate(`/instructor/ficha/${codigo}`);
  };

  return (
    <div className="fichas-container">
      <div className="fichas-header">
        <h2>Mis Fichas de Formación</h2>
        {/* <--- ELIMINAMOS EL BOTÓN DE NUEVA FICHA --- */}
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
                    <button
                      className="btn-ver-ficha"
                      onClick={() => handleVerFicha(ficha.codigo)}
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

export default Fichas;