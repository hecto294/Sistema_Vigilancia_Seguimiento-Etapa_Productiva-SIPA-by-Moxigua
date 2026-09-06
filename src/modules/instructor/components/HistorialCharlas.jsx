// src/components/HistorialCharlas.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './HistorialCharlas.css';

const HistorialCharlas = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [charlaSeleccionada, setCharlaSeleccionada] = useState(null);
  const [visorAbierto, setVisorAbierto] = useState(false);
  const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);

  // 📝 CAMBIO IMPORTANTE: Todos los archivos ahora son .pdf en los datos
  const historial = [
    {
      id: 1,
      tema: 'Normatividad SENA',
      fecha: '22/06/2025',
      instructor: 'Carlos Andrés López',
      asistencia: 22,
      soportes: [
        { nombre: 'Guía Normatividad.pdf', tipo: 'pdf', contenido: 'Documento PDF con la guía completa de normatividad SENA. Incluye todos los procedimientos y requisitos para la etapa productiva.' },
        { nombre: 'Presentación Intro.pdf', tipo: 'pdf', contenido: 'Presentación en PDF con la introducción a la normatividad SENA. 15 diapositivas con los puntos clave.' }
      ],
      listados: [
        { nombre: 'Lista_Asistencia_Junio.pdf', tipo: 'pdf', contenido: 'Archivo PDF con la lista de asistencia de los 22 aprendices. Incluye fecha, hora y firma de cada participante.' }
      ],
      fotos: [
        { nombre: 'Foto_Charla_1.pdf', tipo: 'pdf', contenido: 'Documento PDF con la foto grupal de los aprendices durante la charla de Normatividad SENA.' }
      ]
    },
    {
      id: 2,
      tema: 'Seguridad Industrial',
      fecha: '24/06/2025',
      instructor: 'Ana María Pérez',
      asistencia: 18,
      soportes: [
        { nombre: 'Reglamento Seguridad.pdf', tipo: 'pdf', contenido: 'Reglamento interno de seguridad industrial. Normas y procedimientos obligatorios para todos los aprendices en etapa productiva.' }
      ],
      listados: [
        { nombre: 'Lista_Asistencia_Seguridad.pdf', tipo: 'pdf', contenido: 'Lista de asistencia con 18 aprendices registrados. Incluye observaciones de cada participante.' }
      ],
      fotos: [
        { nombre: 'Foto_Charla_2.pdf', tipo: 'pdf', contenido: 'Documento PDF con la foto de los aprendices durante la charla de Seguridad Industrial.' }
      ]
    },
    {
      id: 3,
      tema: 'Prevención de Riesgos',
      fecha: '28/06/2025',
      instructor: 'Pedro Gómez',
      asistencia: 20,
      soportes: [
        { nombre: 'Manual_Prevencion.pdf', tipo: 'pdf', contenido: 'Manual completo de prevención de riesgos laborales. Incluye identificación de peligros y medidas de control.' }
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
    setVisorAbierto(false);
    setArchivoSeleccionado(null);
  };

  const handleVerArchivo = (archivo, tipoSeccion) => {
    setCharlaSeleccionada(null);
    setTimeout(() => {
      setArchivoSeleccionado({ ...archivo, tipoSeccion });
      setVisorAbierto(true);
    }, 150);
  };

  const handleCerrarVisor = () => {
    setVisorAbierto(false);
    setArchivoSeleccionado(null);
  };

  const goToInicio = () => {
    navigate('/instructor');
    window.location.reload();
  };

  const goToCharlas = () => {
    navigate('/instructor/charlas-programadas');
    window.location.reload();
  };

  const getIconoArchivo = (tipo) => {
    switch(tipo) {
      case 'pdf': return 'fa-file-pdf';
      default: return 'fa-file';
    }
  };

  const getColorArchivo = (tipo) => {
    switch(tipo) {
      case 'pdf': return '#dc2626';
      default: return '#6b7280';
    }
  };

  // 🚨 CAMBIO: Ahora todo es PDF, así que esta función siempre devuelve false
  const esImagen = (archivo) => {
    return false; // Todo es PDF, nunca mostramos imágenes
  };

  return (
    <div className="historial-charlas-container">
      {/* MIGA DE PAN */}
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
              style={{ color: '#3ca203', textDecoration: 'none', fontWeight: '500', cursor: 'pointer' }}
            >
              Inicio
            </span>
            <span style={{ margin: '0 4px', color: '#9ca3af' }}> &gt; </span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', color: '#6b7280', fontSize: '14px' }}>
            <span 
              onClick={goToCharlas}
              style={{ color: '#3ca203', textDecoration: 'none', fontWeight: '500', cursor: 'pointer' }}
            >
              Charlas
            </span>
            <span style={{ margin: '0 4px', color: '#9ca3af' }}> &gt; </span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', color: '#1f2937', fontSize: '14px', fontWeight: '600' }}>
            Historial de Charlas
          </li>
        </ol>
      </nav>

      <div className="historial-charlas-header">
        <h2>Historial de Charlas</h2>
      </div>

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
                <th>Tema</th>
                <th>Fecha</th>
                <th>Instructor</th>
                <th style={{ textAlign: 'center' }}>Asistencia</th>
                <th style={{ textAlign: 'center' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistorial.map((item) => (
                <tr key={item.id}>
                  <td className="tema">{item.tema}</td>
                  <td>{item.fecha}</td>
                  <td>{item.instructor}</td>
                  <td style={{ textAlign: 'center' }}>{item.asistencia}</td>
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

      {/* MODAL DE DETALLES */}
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
                    <span 
                      key={idx} 
                      className="file-tag clickable"
                      onClick={() => handleVerArchivo(s, 'Soportes')}
                    >
                      <i className={`fas ${getIconoArchivo(s.tipo)}`} style={{ color: getColorArchivo(s.tipo) }} />
                      {s.nombre}
                      <i className="fas fa-eye" style={{ fontSize: '10px', marginLeft: '6px', opacity: 0.6 }} />
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
                    <span 
                      key={idx} 
                      className="file-tag clickable"
                      onClick={() => handleVerArchivo(s, 'Listados')}
                    >
                      <i className={`fas ${getIconoArchivo(s.tipo)}`} style={{ color: getColorArchivo(s.tipo) }} />
                      {s.nombre}
                      <i className="fas fa-eye" style={{ fontSize: '10px', marginLeft: '6px', opacity: 0.6 }} />
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
                    <span 
                      key={idx} 
                      className="file-tag clickable"
                      onClick={() => handleVerArchivo(s, 'Fotos')}
                    >
                      <i className={`fas ${getIconoArchivo(s.tipo)}`} style={{ color: getColorArchivo(s.tipo) }} />
                      {s.nombre}
                      <i className="fas fa-eye" style={{ fontSize: '10px', marginLeft: '6px', opacity: 0.6 }} />
                    </span>
                  ))}
                </div>
              ) : (
                <p className="sin-archivos">No se subieron fotos.</p>
              )}
            </div>

            <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '10px', fontStyle: 'italic' }}>
              <i className="fas fa-info-circle" style={{ color: '#3ca203', marginRight: '4px' }} />
              Haz clic en cualquier archivo para ver su contenido.
            </p>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* VISOR DE ARCHIVOS - TODO SE VE COMO PDF */}
      {/* ========================================================== */}
      {visorAbierto && archivoSeleccionado && (
        <div 
          className="visor-fullscreen-overlay" 
          onClick={handleCerrarVisor}
          style={{ zIndex: 9999 }}
        >
          <div className="visor-fullscreen-content" onClick={(e) => e.stopPropagation()}>
            {/* Cabecera */}
            <div className="visor-fullscreen-header">
              <div className="visor-fullscreen-left">
                <div className="visor-fullscreen-icon" style={{ color: getColorArchivo(archivoSeleccionado.tipo) }}>
                  <i className={`fas ${getIconoArchivo(archivoSeleccionado.tipo)}`} />
                </div>
                <div>
                  <h2 className="visor-fullscreen-title">{archivoSeleccionado.nombre}</h2>
                  <p className="visor-fullscreen-subtitle">
                    {archivoSeleccionado.tipoSeccion} • PDF
                  </p>
                </div>
              </div>
              <button 
                className="visor-fullscreen-close"
                onClick={handleCerrarVisor}
              >
                <i className="fas fa-times" />
              </button>
            </div>

            {/* Cuerpo - Visualización tipo PDF */}
            <div className="visor-fullscreen-body">
              {/* Siempre mostramos el contenido como texto (simulando un PDF) */}
              <div className="visor-fullscreen-preview">
                <div className="visor-preview-icon" style={{ color: getColorArchivo(archivoSeleccionado.tipo) }}>
                  <i className={`fas ${getIconoArchivo(archivoSeleccionado.tipo)}`} />
                </div>
                <div className="visor-preview-content">
                  <p>{archivoSeleccionado.contenido || 'No hay información adicional disponible para este archivo.'}</p>
                </div>
              </div>

              {/* Metadatos */}
              <div className="visor-fullscreen-metadata">
                <div className="visor-metadata-grid">
                  <div className="visor-metadata-card">
                    <span className="visor-metadata-label">Nombre del archivo</span>
                    <span className="visor-metadata-value">{archivoSeleccionado.nombre}</span>
                  </div>
                  <div className="visor-metadata-card">
                    <span className="visor-metadata-label">Tipo de archivo</span>
                    <span className="visor-metadata-value">PDF</span>
                  </div>
                  <div className="visor-metadata-card">
                    <span className="visor-metadata-label">Sección</span>
                    <span className="visor-metadata-value">{archivoSeleccionado.tipoSeccion}</span>
                  </div>
                  <div className="visor-metadata-card">
                    <span className="visor-metadata-label">Tamaño</span>
                    <span className="visor-metadata-value">~2.5 MB</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div className="visor-fullscreen-footer">
              <button 
                className="visor-btn-download"
                onClick={() => {
                  Swal.fire({
                    title: '📥 Descargar archivo',
                    text: `¿Deseas descargar "${archivoSeleccionado.nombre}"?`,
                    icon: 'question',
                    iconColor: '#3ca203',
                    showCancelButton: true,
                    confirmButtonColor: '#3ca203',
                    cancelButtonColor: '#6b7280',
                    confirmButtonText: 'Sí, descargar',
                    cancelButtonText: 'Cancelar',
                    customClass: {
                      popup: 'swal2-popup-sandbox',
                      title: 'swal2-title-sandbox',
                      confirmButton: 'swal2-confirm-sandbox',
                      cancelButton: 'swal2-cancel-sandbox',
                    }
                  }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.fire({
                        title: '✅ Descarga iniciada',
                        text: `El archivo "${archivoSeleccionado.nombre}" se está descargando.`,
                        icon: 'success',
                        iconColor: '#3ca203',
                        confirmButtonColor: '#3ca203',
                        confirmButtonText: 'Aceptar',
                        timer: 2000,
                        timerProgressBar: true,
                        customClass: {
                          popup: 'swal2-popup-sandbox',
                          title: 'swal2-title-sandbox',
                          confirmButton: 'swal2-confirm-sandbox',
                        }
                      });
                    }
                  });
                }}
              >
                <i className="fas fa-download" /> Descargar archivo
              </button>
              <button 
                className="visor-btn-close"
                onClick={handleCerrarVisor}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistorialCharlas;
