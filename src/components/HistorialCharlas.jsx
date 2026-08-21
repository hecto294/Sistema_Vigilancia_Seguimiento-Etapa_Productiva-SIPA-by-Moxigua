// src/components/HistorialCharlas.jsx
import React, { useState } from 'react';
import './HistorialCharlas.css';

const HistorialCharlas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [charlaSeleccionada, setCharlaSeleccionada] = useState(null);

  // Datos del historial con soportes, listados y fotos
  const historial = [
    {
      id: 1,
      tema: 'Normatividad SENA',
      fecha: '22/06/2025',
      instructor: 'Carlos Andrés López',
      asistencia: 22,
      soportes: [
        { nombre: 'Guía Normatividad.pdf', tipo: 'pdf' },
        { nombre: 'Presentación Intro.pptx', tipo: 'ppt' }
      ],
      listados: [
        { nombre: 'Lista_Asistencia_Junio.xlsx', tipo: 'excel' }
      ],
      fotos: [
        { nombre: 'Foto_Charla_1.jpg', tipo: 'imagen' }
      ]
    },
    {
      id: 2,
      tema: 'Seguridad Industrial',
      fecha: '24/06/2025',
      instructor: 'Ana María Pérez',
      asistencia: 18,
      soportes: [
        { nombre: 'Reglamento Seguridad.pdf', tipo: 'pdf' }
      ],
      listados: [
        { nombre: 'Lista_Asistencia_Seguridad.xlsx', tipo: 'excel' }
      ],
      fotos: [
        { nombre: 'Foto_Charla_2.jpg', tipo: 'imagen' }
      ]
    },
    {
      id: 3,
      tema: 'Prevención de Riesgos',
      fecha: '28/06/2025',
      instructor: 'Pedro Gómez',
      asistencia: 20,
      soportes: [
        { nombre: 'Manual_Prevencion.pdf', tipo: 'pdf' }
      ],
      listados: [],
      fotos: []
    }
  ];

  const handleSearch = () => setSearchQuery(searchTerm);
  const handleClear = () => { setSearchTerm(''); setSearchQuery(''); };

  const filteredHistorial = historial.filter((item) =>
    item.tema.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleVerDetalles = (id) => {
    const charla = historial.find(c => c.id === id);
    setCharlaSeleccionada(charla);
  };

  const handleCerrarDetalles = () => {
    setCharlaSeleccionada(null);
  };

  return (
    <div className="historial-charlas-container">
      <div className="historial-charlas-header">
        <h2>Historial de Charlas</h2>
      </div>

      {/* Buscador */}
      <div className="search-container">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Buscar por tema de la charla..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button className="btn-search" onClick={handleSearch}>Buscar</button>
        <button className="btn-clear" onClick={handleClear}>Limpiar</button>
      </div>

      {/* Tabla de historial */}
      {filteredHistorial.length === 0 ? (
        <div className="not-found">
          <h2><i className="fas fa-exclamation-circle"></i> Dato no encontrado</h2>
          <p>No se encontró ninguna charla con el tema ingresado.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tema</th>
                <th>Fecha</th>
                <th>Instructor</th>
                <th>Asistencia</th>
                <th style={{ textAlign: 'center' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistorial.map((item) => (
                <tr key={item.id}>
                  <td className="codigo">{item.id}</td>
                  <td>{item.tema}</td>
                  <td>{item.fecha}</td>
                  <td>{item.instructor}</td>
                  <td>{item.asistencia}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button 
                      className="btn-ver-detalles"
                      onClick={() => handleVerDetalles(item.id)}
                    >
                      <i className="fas fa-eye" /> Ver detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ========================================================== */}
      {/* MODAL DE DETALLES DE LA CHARLA */}
      {/* ========================================================== */}
      {charlaSeleccionada && (
        <div className="modal-overlay" onClick={handleCerrarDetalles}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleCerrarDetalles}>&times;</button>

            <h3 className="modal-title">{charlaSeleccionada.tema}</h3>
            <div className="modal-meta">
              <span><i className="fas fa-calendar-alt" /> {charlaSeleccionada.fecha}</span>
              <span><i className="fas fa-user-tie" /> {charlaSeleccionada.instructor}</span>
              <span><i className="fas fa-users" /> {charlaSeleccionada.asistencia} asistentes</span>
            </div>

            <div className="modal-section">
              <h4><i className="fas fa-paperclip" /> Soportes subidos</h4>
              {charlaSeleccionada.soportes.length > 0 ? (
                <div className="file-list">
                  {charlaSeleccionada.soportes.map((s, idx) => (
                    <span key={idx} className="file-tag">
                      <i className={`fas ${s.tipo === 'pdf' ? 'fa-file-pdf' : 'fa-file'}`} />
                      {s.nombre}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="sin-archivos">No se subieron soportes.</p>
              )}
            </div>

            <div className="modal-section">
              <h4><i className="fas fa-table" /> Listados subidos</h4>
              {charlaSeleccionada.listados.length > 0 ? (
                <div className="file-list">
                  {charlaSeleccionada.listados.map((s, idx) => (
                    <span key={idx} className="file-tag">
                      <i className="fas fa-file-excel" />
                      {s.nombre}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="sin-archivos">No se subieron listados.</p>
              )}
            </div>

            <div className="modal-section">
              <h4><i className="fas fa-camera" /> Fotos subidas</h4>
              {charlaSeleccionada.fotos.length > 0 ? (
                <div className="file-list">
                  {charlaSeleccionada.fotos.map((s, idx) => (
                    <span key={idx} className="file-tag">
                      <i className="fas fa-file-image" />
                      {s.nombre}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="sin-archivos">No se subieron fotos.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistorialCharlas;