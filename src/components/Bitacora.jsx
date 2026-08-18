// src/components/Bitacora.jsx
import React, { useState } from 'react';
import './Bitacora.css';

const Bitacora = () => {
  const [fichaSeleccionada, setFichaSeleccionada] = useState(null);
  const [aprendizSeleccionado, setAprendizSeleccionado] = useState(null);
  const [bitacoraModal, setBitacoraModal] = useState(null);

  // Estados para la búsqueda general (Fichas)
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Estados para la búsqueda DENTRO de la ficha (Aprendices)
  const [searchTermFicha, setSearchTermFicha] = useState('');
  const [searchQueryFicha, setSearchQueryFicha] = useState('');

  // Datos jerárquicos: Fichas -> Aprendices -> Bitácoras
  const [fichas] = useState([
    {
      idFicha: '2875901',
      programa: 'Análisis y Desarrollo de Software',
      aprendices: [
        { 
          nombre: 'Laura Sofia Martinez', 
          id: '12345678',
          bitacoras: [
            { titulo: 'Bitácora Semana 1 - Inducción', fecha: '10/03/2025', contenido: 'Se realizó la inducción general al aprendiz. Se presentaron las normas de seguridad y el cronograma de actividades para el primer mes.' },
            { titulo: 'Bitácora Semana 2 - Diagnóstico', fecha: '17/03/2025', contenido: 'Se aplicó prueba diagnóstica. El aprendiz demostró un nivel intermedio en herramientas ofimáticas. Se recomienda refuerzo en Excel.' },
            { titulo: 'Bitácora Semana 3 - Avance', fecha: '24/03/2025', contenido: 'Avance del 30% en el proyecto asignado. El aprendiz trabaja de forma autónoma y cumple con los plazos establecidos.' },
          ]
        },
        { 
          nombre: 'Juan Diego Ramirez', 
          id: '87654321',
          bitacoras: [
            { titulo: 'Bitácora Semana 1 - Inducción', fecha: '10/03/2025', contenido: 'Asistió a la inducción general. Se mostró interesado en el área de desarrollo de software.' },
            { titulo: 'Bitácora Semana 2 - Diagnóstico', fecha: '17/03/2025', contenido: 'Finalizó el diagnóstico con un puntaje sobresaliente. Se destaca en lógica de programación.' },
          ]
        },
        { 
          nombre: 'Maria Camila Torres', 
          id: '11223344',
          bitacoras: [
            { titulo: 'Bitácora Semana 1 - Inducción', fecha: '10/03/2025', contenido: 'Asistió a la inducción general y mostró interés en el área de calidad.' },
          ]
        },
      ]
    },
    {
      idFicha: '2875902',
      programa: 'Gestión Empresarial',
      aprendices: [
        { 
          nombre: 'Carlos Mendoza', 
          id: '99887766',
          bitacoras: [
            { titulo: 'Bitácora Inicial', fecha: '12/03/2025', contenido: 'Se realizó la primera reunión de seguimiento. El aprendiz tiene claras sus responsabilidades.' },
            { titulo: 'Bitácora Intermedia', fecha: '26/03/2025', contenido: 'Se revisó el avance del 50% del proyecto. El aprendiz solicita una extensión de plazo para la entrega final.' },
          ]
        },
        { 
          nombre: 'Valentina Rojas', 
          id: '55667788',
          bitacoras: []
        },
        { 
          nombre: 'Andrés Felipe Castro', 
          id: '44332211',
          bitacoras: [
            { titulo: 'Bitácora Semana 5', fecha: '02/04/2025', contenido: 'El aprendiz completó la fase de pruebas del proyecto con éxito.' },
          ]
        },
      ]
    },
    {
      idFicha: '2875903',
      programa: 'Contabilidad y Finanzas',
      aprendices: [
        { 
          nombre: 'Luisa Fernanda Gomez', 
          id: '11223344',
          bitacoras: [
            { titulo: 'Bitácora Finanzas 1', fecha: '15/03/2025', contenido: 'Se inició el seguimiento financiero. El aprendiz muestra gran dominio en el manejo de software contable.' },
            { titulo: 'Bitácora Finanzas 2', fecha: '29/03/2025', contenido: 'Se revisó el balance general. El aprendiz identificó inconsistencias en los estados financieros.' },
          ]
        },
        { 
          nombre: 'Santiago Pérez', 
          id: '99887766',
          bitacoras: []
        },
      ]
    }
  ]);

  // --- Búsqueda principal (Fichas) ---
  const handleSearch = () => {
    setSearchQuery(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSearchQuery('');
    setFichaSeleccionada(null);
    setAprendizSeleccionado(null);
    setBitacoraModal(null);
  };

  // --- Búsqueda DENTRO de la ficha (Aprendices) ---
  const handleSearchFicha = () => {
    setSearchQueryFicha(searchTermFicha);
  };

  const handleClearFicha = () => {
    setSearchTermFicha('');
    setSearchQueryFicha('');
  };

  // --- Navegación: Ficha -> Aprendiz ---
  const handleIngresarFicha = (idFicha) => {
    const ficha = fichas.find(f => f.idFicha === idFicha);
    setFichaSeleccionada(ficha);
    setAprendizSeleccionado(null);
    setBitacoraModal(null);
    setSearchTermFicha('');
    setSearchQueryFicha('');
  };

  const handleIngresarAprendiz = (index) => {
    const aprendiz = fichaSeleccionada.aprendices[index];
    setAprendizSeleccionado(aprendiz);
  };

  const handleVolverFichas = () => {
    setFichaSeleccionada(null);
    setAprendizSeleccionado(null);
    setBitacoraModal(null);
  };

  const handleVolverAprendices = () => {
    setAprendizSeleccionado(null);
    setBitacoraModal(null);
  };

  // --- Modal para ver la bitácora ---
  const handleVerArchivo = (bitacora) => {
    setBitacoraModal(bitacora);
  };

  const handleCerrarModal = () => {
    setBitacoraModal(null);
  };

  // ==========================================================
  // MODAL DE VISTA PREVIA DE LA BITÁCORA
  // ==========================================================
  if (bitacoraModal) {
    return (
      <div className="bitacora-modal-overlay" onClick={handleCerrarModal}>
        <div className="bitacora-modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close-btn" onClick={handleCerrarModal}>&times;</button>
          <h3 className="modal-title">{bitacoraModal.titulo}</h3>
          <div className="modal-meta">
            <span><i className="fas fa-calendar-alt"></i> {bitacoraModal.fecha}</span>
            <span><i className="fas fa-user"></i> {aprendizSeleccionado?.nombre || 'Aprendiz'}</span>
          </div>
          <div className="modal-body-text">
            <p>{bitacoraModal.contenido}</p>
          </div>
          <div className="modal-actions">
            <button className="btn-descargar-modal">Descargar bitácora</button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================
  // PANTALLA DE BITÁCORAS DEL APRENDIZ (Nivel 2)
  // ==========================================================
  if (aprendizSeleccionado) {
    return (
      <div className="bitacora-aprendiz-pantalla">
        <div className="aprendiz-header">
          <button className="btn-volver-lista" onClick={handleVolverAprendices}>
            <i className="fas fa-arrow-left"></i> Volver a aprendices
          </button>
          <h2 className="aprendiz-titulo">{aprendizSeleccionado.nombre}</h2>
          <p className="aprendiz-subtitulo">Ficha {fichaSeleccionada.idFicha} - {fichaSeleccionada.programa}</p>
        </div>

        <div className="bitacoras-listado">
          <h3><i className="fas fa-folder-open"></i> Bitácoras subidas</h3>
          {aprendizSeleccionado.bitacoras.length === 0 ? (
            <p className="sin-registros">Este aprendiz aún no ha subido bitácoras.</p>
          ) : (
            <div className="bitacoras-grid">
              {aprendizSeleccionado.bitacoras.map((b, idx) => (
                <div key={idx} className="bitacora-card">
                  <div className="bitacora-card-header">
                    <span className="bitacora-titulo">{b.titulo}</span>
                    <span className="bitacora-fecha"><i className="fas fa-calendar-alt"></i> {b.fecha}</span>
                  </div>
                  <div className="bitacora-card-body">
                    <p className="bitacora-preview">{b.contenido.substring(0, 80)}...</p>
                  </div>
                  <div className="bitacora-card-actions">
                    <button className="btn-ver-archivo" onClick={() => handleVerArchivo(b)}>
                      <i className="fas fa-file-alt"></i> Ver archivo
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ==========================================================
  // VISTA DE APRENDICES DE LA FICHA (Nivel 1) CON BÚSQUEDA
  // ==========================================================
  if (fichaSeleccionada) {
    // Filtrar aprendices basado en searchQueryFicha (lo que busca el botón)
    const filteredAprendices = fichaSeleccionada.aprendices.filter((ap) =>
      ap.nombre.toLowerCase().includes(searchQueryFicha.toLowerCase()) ||
      ap.id.includes(searchQueryFicha)
    );

    return (
      <div className="bitacora-ficha-pantalla">
        <div className="ficha-header">
          <button className="btn-volver-lista" onClick={handleVolverFichas}>
            <i className="fas fa-arrow-left"></i> Volver a fichas
          </button>
          <h2 className="ficha-titulo">Ficha {fichaSeleccionada.idFicha}</h2>
          <p className="ficha-subtitulo">{fichaSeleccionada.programa}</p>
        </div>

        {/* BARRA DE BÚSQUEDA DENTRO DE LA FICHA */}
        <div className="search-container">
          <input 
            type="text" 
            className="search-input" 
            placeholder="Buscar aprendiz por nombre o identificación..." 
            value={searchTermFicha}
            onChange={(e) => setSearchTermFicha(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchFicha()}
          />
          <button className="btn-search" onClick={handleSearchFicha}>Buscar</button>
          <button className="btn-clear" onClick={handleClearFicha}>Limpiar</button>
        </div>

        {/* Condicional: Si no hay resultados, muestra "Dato no encontrado" */}
        {filteredAprendices.length === 0 ? (
          <div className="not-found">
            <h2><i className="fas fa-exclamation-circle"></i> Dato no encontrado</h2>
            <p>No existe ningún aprendiz con los datos ingresados en esta ficha.</p>
          </div>
        ) : (
          <div className="aprendices-table-wrapper">
            <table className="aprendices-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Identificación</th>
                  <th>Aprendiz</th>
                  <th style={{ textAlign: 'center' }}>Bitácoras subidas</th>
                  <th style={{ textAlign: 'center' }}>Acción</th>
                </tr>
              </thead>
              <tbody>
                {filteredAprendices.map((aprendiz, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{aprendiz.id}</td>
                    <td className="nombre-aprendiz">{aprendiz.nombre}</td>
                    <td style={{ textAlign: 'center' }}>
                      <span className="badge-cantidad">{aprendiz.bitacoras.length}</span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button 
                        className="btn-ver-bitacoras"
                        onClick={() => handleIngresarAprendiz(index)}
                      >
                        <i className="fas fa-eye"></i> Ver bitácoras
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
  }

  // ==========================================================
  // VISTA PRINCIPAL (Lista de fichas)
  // ==========================================================
  const filteredFichas = fichas.filter((ficha) =>
    ficha.idFicha.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bitacora-container">
      <div className="bitacora-header">
        <h2>Bitácora de Seguimiento</h2>
        <p className="subtitulo">Selecciona una ficha para ver las bitácoras de sus aprendices.</p>
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
              className="ficha-card-bitacora"
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

export default Bitacora;