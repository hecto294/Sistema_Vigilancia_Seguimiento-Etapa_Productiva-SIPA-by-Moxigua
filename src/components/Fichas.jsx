// src/components/Fichas.jsx
import React, { useState } from 'react';
import './Fichas.css';

const Fichas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [fichaSeleccionada, setFichaSeleccionada] = useState(null);
  
  // Estado para la búsqueda DENTRO de la ficha detallada
  const [searchTermDetalle, setSearchTermDetalle] = useState('');
  const [searchQueryDetalle, setSearchQueryDetalle] = useState('');

  // Datos maestros: Fichas con sus aprendices asociados
  const [fichas] = useState([
    { 
      codigo: '2875901', 
      programa: 'Análisis y Desarrollo de Software', 
      nivel: 'Tecnólogo', 
      totalAprendices: 28, 
      estado: 'Activa',
      aprendices: [
        { nombre: 'Laura Sofia Martinez', documento: '12345678', estado: 'Activo' },
        { nombre: 'Juan Diego Ramirez', documento: '87654321', estado: 'Activo' },
        { nombre: 'Maria Camila Torres', documento: '11223344', estado: 'Inactivo' },
      ]
    },
    { 
      codigo: '2875902', 
      programa: 'Gestión Empresarial', 
      nivel: 'Tecnólogo', 
      totalAprendices: 24, 
      estado: 'Activa',
      aprendices: [
        { nombre: 'Carlos Mendoza', documento: '99887766', estado: 'Activo' },
        { nombre: 'Valentina Rojas', documento: '55667788', estado: 'Activo' },
        { nombre: 'Andrés Felipe Castro', documento: '44332211', estado: 'Activo' },
      ]
    },
    { 
      codigo: '2875903', 
      programa: 'Contabilidad y Finanzas', 
      nivel: 'Técnico', 
      totalAprendices: 32, 
      estado: 'Inactiva',
      aprendices: [
        { nombre: 'Luisa Fernanda Gomez', documento: '11223344', estado: 'Activo' },
        { nombre: 'Santiago Pérez', documento: '99887766', estado: 'Inactivo' },
      ]
    },
  ]);

  // Filtrar los datos basados en searchQuery (lista general)
  const filteredFichas = fichas.filter((ficha) =>
    ficha.codigo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Función del botón Buscar (lista general)
  const handleSearch = () => {
    setSearchQuery(searchTerm);
  };

  // Función del botón Limpiar (lista general)
  const handleClear = () => {
    setSearchTerm('');
    setSearchQuery('');
    setFichaSeleccionada(null);
  };

  // Función para ver los detalles de una ficha
  const handleVerFicha = (codigo) => {
    const ficha = fichas.find(f => f.codigo === codigo);
    setFichaSeleccionada(ficha);
    // Resetear la búsqueda interna al abrir una ficha
    setSearchTermDetalle('');
    setSearchQueryDetalle('');
  };

  // Función para volver a la lista de fichas
  const handleVolver = () => {
    setFichaSeleccionada(null);
  };

  // --- FUNCIONES DE BÚSQUEDA DENTRO DE LA FICHA ---
  const handleSearchDetalle = () => {
    setSearchQueryDetalle(searchTermDetalle);
  };

  const handleClearDetalle = () => {
    setSearchTermDetalle('');
    setSearchQueryDetalle('');
  };

  // --- RENDERIZADO DE LA VISTA DETALLADA ---
  if (fichaSeleccionada) {
    // Filtrar los aprendices dentro de la ficha seleccionada
    const aprendicesFiltrados = fichaSeleccionada.aprendices.filter((ap) =>
      ap.nombre.toLowerCase().includes(searchQueryDetalle.toLowerCase()) ||
      ap.documento.includes(searchQueryDetalle)
    );

    return (
      <div className="ficha-detalle-container">
        <div className="ficha-detalle-header">
          <button className="btn-volver" onClick={handleVolver}>
            <i className="fas fa-arrow-left"></i> Volver a fichas
          </button>
          <h2>Ficha {fichaSeleccionada.codigo}</h2>
          <p className="subtitulo-detalle">{fichaSeleccionada.programa}</p>
          <p className="info-adicional">Nivel: {fichaSeleccionada.nivel} • Total aprendices: {fichaSeleccionada.totalAprendices}</p>
        </div>

        <div className="detalle-table-wrapper">
          <div className="detalle-header-row">
            <h3><i className="fas fa-users"></i> Lista de aprendices</h3>
          </div>

          {/* --- BARRA DE BÚSQUEDA DENTRO DE LA VISTA DETALLADA --- */}
          <div className="search-container">
            <input 
              type="text" 
              className="search-input" 
              placeholder="Buscar por nombre o documento..." 
              value={searchTermDetalle}
              onChange={(e) => setSearchTermDetalle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchDetalle()}
            />
            <button className="btn-search" onClick={handleSearchDetalle}>Buscar</button>
            <button className="btn-clear" onClick={handleClearDetalle}>Limpiar</button>
          </div>

          {aprendicesFiltrados.length === 0 ? (
            <div className="not-found-detalle">
              <h2><i className="fas fa-exclamation-circle"></i> Dato no encontrado</h2>
              <p>No existe ningún aprendiz con los datos ingresados en esta ficha.</p>
            </div>
          ) : (
            <table className="detalle-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre Completo</th>
                  <th>Documento</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {aprendicesFiltrados.map((ap, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{ap.nombre}</td>
                    <td>{ap.documento}</td>
                    <td>
                      <span className={`status-badge-detalle ${ap.estado === 'Activo' ? 'status-activo' : 'status-inactivo'}`}>
                        {ap.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }

  // --- RENDERIZADO DE LA LISTA DE FICHAS (Vista principal) ---
  return (
    <div className="fichas-container">
      <div className="fichas-header">
        <h2>Fichas de Formación</h2>
        <button className="btn-nuevo">+ Nueva ficha</button>
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
                  <td>{ficha.totalAprendices}</td>
                  <td>
                    <span className={`status-ficha ${ficha.estado === 'Activa' ? 'status-activa' : 'status-inactiva'}`}>
                      {ficha.estado}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button className="btn-ver-ficha" onClick={() => handleVerFicha(ficha.codigo)}>
                      <i className="fas fa-eye"></i> Ver
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