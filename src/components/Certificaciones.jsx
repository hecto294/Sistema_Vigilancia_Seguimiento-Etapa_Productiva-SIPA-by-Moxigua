// src/components/Certificaciones.jsx
import React, { useState } from 'react';
import './Certificaciones.css';

const Certificaciones = () => {
  const [fichaSeleccionada, setFichaSeleccionada] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [fichas] = useState([
    {
      idFicha: '2875901',
      programa: 'Análisis y Desarrollo de Software',
      aprendices: [
        { nombre: 'Laura Sofia Martinez', completado: true },
        { nombre: 'Juan Diego Ramirez', completado: true },
        { nombre: 'Maria Camila Torres', completado: false },
      ]
    },
    {
      idFicha: '2875902',
      programa: 'Gestión Empresarial',
      aprendices: [
        { nombre: 'Carlos Mendoza', completado: true },
        { nombre: 'Valentina Rojas', completado: true },
        { nombre: 'Andrés Felipe Castro', completado: true },
      ]
    },
    {
      idFicha: '2875903',
      programa: 'Contabilidad y Finanzas',
      aprendices: [
        { nombre: 'Luisa Fernanda Gomez', completado: false },
        { nombre: 'Santiago Pérez', completado: false },
      ]
    }
  ]);

  const handleSearch = () => {
    setSearchQuery(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSearchQuery('');
    setFichaSeleccionada(null);
  };

  const handleIngresarFicha = (idFicha) => {
    const ficha = fichas.find(f => f.idFicha === idFicha);
    setFichaSeleccionada(ficha);
  };

  const handleVolverFichas = () => {
    setFichaSeleccionada(null);
  };

  const handleDescargarIndividual = (nombre) => {
    alert(`📥 Descargando certificado de ${nombre}...\n(En un sistema real, aquí se descargaría el PDF)`);
  };

  if (fichaSeleccionada) {
    return (
      <div className="certificaciones-ficha-pantalla">
        <div className="ficha-header">
          <button className="btn-volver-lista" onClick={handleVolverFichas}>
            <i className="fas fa-arrow-left"></i> Volver a fichas
          </button>
          <h2 className="ficha-titulo">Ficha {fichaSeleccionada.idFicha}</h2>
          <p className="ficha-subtitulo">{fichaSeleccionada.programa}</p>
        </div>

        <div className="certificaciones-table-wrapper">
          <table className="certificaciones-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Aprendiz</th>
                <th style={{ textAlign: 'center' }}>Estado</th>
                <th style={{ textAlign: 'center' }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {fichaSeleccionada.aprendices.map((aprendiz, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="nombre-aprendiz">{aprendiz.nombre}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span className={`estado-cert ${aprendiz.completado ? 'completado' : 'pendiente'}`}>
                      {aprendiz.completado ? '✅ Listo' : '⏳ Pendiente'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button 
                      className={`btn-descargar-individual ${aprendiz.completado ? 'active' : 'disabled'}`}
                      onClick={() => aprendiz.completado && handleDescargarIndividual(aprendiz.nombre)}
                      disabled={!aprendiz.completado}
                    >
                      <i className="fas fa-download"></i> Descargar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  const filteredFichas = fichas.filter((ficha) =>
    ficha.idFicha.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="certificaciones-container">
      <div className="certificaciones-header">
        <h2>Certificaciones</h2>
        <p className="subtitulo">Selecciona una ficha para gestionar los certificados de tus aprendices.</p>
      </div>

      <div className="search-container">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Buscar por número de ficha..." 
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
          <p>No existe ninguna ficha con el número ingresado.</p>
        </div>
      ) : (
        <div className="fichas-grid">
          {filteredFichas.map((ficha) => (
            <div 
              key={ficha.idFicha} 
              className="ficha-card-certificacion"
              onClick={() => handleIngresarFicha(ficha.idFicha)}
            >
              <div className="ficha-card-header">
                <span className="ficha-numero">{ficha.idFicha}</span>
                <span className="ficha-cantidad">{ficha.aprendices.length} aprendices</span>
              </div>
              <div className="ficha-card-body">
                <span className="ficha-programa">{ficha.programa}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Certificaciones;