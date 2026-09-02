// src/components/SeguimientoMomentos.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SeguimientoMomentos.css';

const SeguimientoMomentos = () => {
  const navigate = useNavigate();
  const [momentoSeleccionado, setMomentoSeleccionado] = useState(null);
  const [fichaSeleccionada, setFichaSeleccionada] = useState(null);
  const [aprendizModal, setAprendizModal] = useState(null);

  // Estados de búsqueda
  const [searchTermFichas, setSearchTermFichas] = useState('');
  const [searchQueryFichas, setSearchQueryFichas] = useState('');

  const [searchTermAprendices, setSearchTermAprendices] = useState('');
  const [searchQueryAprendices, setSearchQueryAprendices] = useState('');

  // Datos: Momentos -> Fichas -> Aprendices -> Seguimientos
  const [momentos] = useState([
    {
      id: 1,
      titulo: 'Momento 1',
      descripcion: 'Inducción y Diagnóstico Inicial',
      fichas: [
        {
          idFicha: '2875901',
          programa: 'Análisis y Desarrollo de Software',
          aprendices: [
            { id: 1, nombre: 'Laura Sofia Martinez', seguimiento: 'Se realizó inducción general. Pendiente evaluación diagnóstica.' },
            { id: 2, nombre: 'Juan Diego Ramirez', seguimiento: 'Diagnóstico completado. Buen desempeño.' }
          ]
        },
        {
          idFicha: '2875902',
          programa: 'Gestión Empresarial',
          aprendices: [
            { id: 3, nombre: 'Carlos Mendoza', seguimiento: 'Diagnóstico en proceso. Pendiente de entrega.' }
          ]
        }
      ]
    },
    {
      id: 2,
      titulo: 'Momento 2',
      descripcion: 'Ejecución y Seguimiento',
      fichas: [
        {
          idFicha: '2875902',
          programa: 'Gestión Empresarial',
          aprendices: [
            { id: 4, nombre: 'Maria Camila Torres', seguimiento: 'Avance del 50% en el proyecto. Se recomienda refuerzo en herramientas.' },
            { id: 5, nombre: 'Andrés Felipe Castro', seguimiento: 'Cumplimiento de hitos. Sin novedades.' }
          ]
        },
        {
          idFicha: '2875903',
          programa: 'Contabilidad y Finanzas',
          aprendices: [
            { id: 6, nombre: 'Valentina Rojas', seguimiento: 'Evaluación final en proceso.' }
          ]
        }
      ]
    },
    {
      id: 3,
      titulo: 'Momento 3',
      descripcion: 'Evaluación y Cierre',
      fichas: [
        {
          idFicha: '2875901',
          programa: 'Análisis y Desarrollo de Software',
          aprendices: [
            { id: 7, nombre: 'Luisa Fernanda Gomez', seguimiento: 'Cierre de etapa completado. Certificado generado.' }
          ]
        }
      ]
    }
  ]);

  // --- Navegación ---
  const handleVerMomento = (id) => {
    const momento = momentos.find(m => m.id === id);
    setMomentoSeleccionado(momento);
    setFichaSeleccionada(null);
    setSearchTermFichas('');
    setSearchQueryFichas('');
  };

  const handleVolverMomentos = () => {
    setMomentoSeleccionado(null);
    setFichaSeleccionada(null);
    setAprendizModal(null);
  };

  const handleVerFicha = (idFicha) => {
    const ficha = momentoSeleccionado.fichas.find(f => f.idFicha === idFicha);
    setFichaSeleccionada(ficha);
    setSearchTermAprendices('');
    setSearchQueryAprendices('');
    setAprendizModal(null);
  };

  const handleVolverFichas = () => {
    setFichaSeleccionada(null);
    setAprendizModal(null);
  };

  // --- Modal para ver el detalle del aprendiz ---
  const handleVerDetalle = (aprendiz) => {
    setAprendizModal(aprendiz);
  };

  const handleCerrarModal = () => {
    setAprendizModal(null);
  };

  // --- Búsqueda de fichas ---
  const handleSearchFichas = () => setSearchQueryFichas(searchTermFichas);
  const handleClearFichas = () => { setSearchTermFichas(''); setSearchQueryFichas(''); };

  // --- Búsqueda de aprendices ---
  const handleSearchAprendices = () => setSearchQueryAprendices(searchTermAprendices);
  const handleClearAprendices = () => { setSearchTermAprendices(''); setSearchQueryAprendices(''); };

  // Navegar al inicio (Dashboard)
  const goToInicio = () => {
    navigate('/instructor');
    window.location.reload();
  };

  // --- Renderizado NIVEL 3: Aprendices de una ficha ---
  if (fichaSeleccionada) {
    const filteredAprendices = fichaSeleccionada.aprendices.filter(a =>
      a.nombre.toLowerCase().includes(searchQueryAprendices.toLowerCase())
    );

    return (
      <div className="momento-detalle-pantalla">
        {/* MIGA DE PAN - Inicio > Seguimiento por Momentos > Ficha */}
        <nav style={{ 
          padding: '10px 0', 
          marginBottom: '10px', 
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
                onClick={handleVolverMomentos}
                style={{ color: '#3ca203', textDecoration: 'none', fontWeight: '500', cursor: 'pointer' }}
              >
                Seguimiento por Momentos
              </span>
              <span style={{ margin: '0 4px', color: '#9ca3af' }}> &gt; </span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', color: '#1f2937', fontSize: '14px', fontWeight: '600' }}>
              Ficha {fichaSeleccionada.idFicha}
            </li>
          </ol>
        </nav>

        <div className="detalle-header">
          <button className="btn-volver-lista" onClick={handleVolverFichas}>
            <i className="fas fa-arrow-left" /> Volver a fichas
          </button>
          <h2 className="detalle-titulo">Ficha {fichaSeleccionada.idFicha}</h2>
          <p className="detalle-subtitulo">{fichaSeleccionada.programa}</p>
        </div>

        <div className="search-container">
          <input 
            type="text" 
            className="search-input" 
            placeholder="Buscar aprendiz..." 
            value={searchTermAprendices}
            onChange={(e) => setSearchTermAprendices(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchAprendices()}
          />
          <button className="btn-search" onClick={handleSearchAprendices}>Buscar</button>
          <button className="btn-clear" onClick={handleClearAprendices}>Limpiar</button>
        </div>

        <div className="aprendices-list-container">
          {filteredAprendices.length === 0 ? (
            <p className="sin-registros">No se encontraron aprendices con ese nombre.</p>
          ) : (
            <div className="aprendices-grid">
              {filteredAprendices.map((ap) => (
                <div key={ap.id} className="aprendiz-card">
                  <div className="aprendiz-card-header">
                    <span className="aprendiz-nombre">
                      <i className="fas fa-user" /> {ap.nombre}
                    </span>
                    <button 
                      className="btn-ver-detalle-aprendiz"
                      onClick={() => handleVerDetalle(ap)}
                    >
                      <i className="fas fa-eye" /> Ver
                    </button>
                  </div>
                  <div className="aprendiz-card-body">
                    <p><strong>Seguimiento:</strong> {ap.seguimiento}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* MODAL DE DETALLE DEL APRENDIZ */}
        {aprendizModal && (
          <div className="modal-overlay" onClick={handleCerrarModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={handleCerrarModal}>&times;</button>
              <h3 className="modal-title">Detalle de Seguimiento</h3>
              <div className="modal-aprendiz-info">
                <p><strong>Aprendiz:</strong> {aprendizModal.nombre}</p>
                <p><strong>Ficha:</strong> {fichaSeleccionada.idFicha}</p>
                <p><strong>Momento:</strong> {momentoSeleccionado.titulo}</p>
              </div>
              <div className="modal-seguimiento-body">
                <p>{aprendizModal.seguimiento}</p>
              </div>
              <div className="modal-actions">
                <button 
                  className="btn-cerrar-modal"
                  onClick={handleCerrarModal}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- Renderizado NIVEL 2: Fichas de un momento ---
  if (momentoSeleccionado) {
    const filteredFichas = momentoSeleccionado.fichas.filter(f =>
      f.idFicha.toLowerCase().includes(searchQueryFichas.toLowerCase()) ||
      f.programa.toLowerCase().includes(searchQueryFichas.toLowerCase())
    );

    return (
      <div className="momento-detalle-pantalla">
        {/* MIGA DE PAN - Inicio > Seguimiento por Momentos > Momento */}
        <nav style={{ 
          padding: '10px 0', 
          marginBottom: '10px', 
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
            <li style={{ display: 'flex', alignItems: 'center', color: '#1f2937', fontSize: '14px', fontWeight: '600' }}>
              {momentoSeleccionado.titulo}
            </li>
          </ol>
        </nav>

        <div className="detalle-header">
          <button className="btn-volver-lista" onClick={handleVolverMomentos}>
            <i className="fas fa-arrow-left" /> Volver a momentos
          </button>
          <h2 className="detalle-titulo">{momentoSeleccionado.titulo}</h2>
          <p className="detalle-subtitulo">{momentoSeleccionado.descripcion}</p>
        </div>

        <div className="search-container">
          <input 
            type="text" 
            className="search-input" 
            placeholder="Buscar ficha..." 
            value={searchTermFichas}
            onChange={(e) => setSearchTermFichas(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchFichas()}
          />
          <button className="btn-search" onClick={handleSearchFichas}>Buscar</button>
          <button className="btn-clear" onClick={handleClearFichas}>Limpiar</button>
        </div>

        <div className="fichas-grid">
          {filteredFichas.length === 0 ? (
            <p className="sin-registros">No se encontraron fichas con esos datos.</p>
          ) : (
            filteredFichas.map((f) => (
              <div
                key={f.idFicha}
                className="ficha-card-click"
                onClick={() => handleVerFicha(f.idFicha)}
              >
                <div className="ficha-card-header">
                  <span className="ficha-numero">{f.idFicha}</span>
                  <span className="ficha-cantidad">{f.aprendices.length} aprendices</span>
                </div>
                <div className="ficha-card-body">
                  <span className="ficha-programa">{f.programa}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  // --- Renderizado NIVEL 1: Tarjetas de los momentos ---
  return (
    <div className="momentos-container">
      {/* MIGA DE PAN - Inicio > Seguimiento por Momentos */}
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
          <li style={{ display: 'flex', alignItems: 'center', color: '#1f2937', fontSize: '14px', fontWeight: '600' }}>
            Seguimiento por Momentos
          </li>
        </ol>
      </nav>

      <div className="momentos-header">
        <h2>Seguimiento por Momentos</h2>
        <p className="subtitulo">Selecciona un momento para ver las fichas y sus aprendices.</p>
      </div>

      <div className="momentos-grid">
        {momentos.map((momento) => (
          <div
            key={momento.id}
            className="momento-card-link"
            onClick={() => handleVerMomento(momento.id)}
          >
            <div className="momento-card-header">
              <h3>{momento.titulo}</h3>
              <span className="momento-cantidad">{momento.fichas.length} fichas</span>
            </div>
            <p className="momento-descripcion-corta">{momento.descripcion}</p>
            <div className="momento-flecha">
              <i className="fas fa-chevron-right"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeguimientoMomentos;