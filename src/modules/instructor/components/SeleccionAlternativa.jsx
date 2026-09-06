// src/components/SeleccionAlternativa.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SeleccionAlternativa.css';

const SeleccionAlternativa = () => {
  const navigate = useNavigate();
  const [selectedFicha, setSelectedFicha] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [empresaVisible, setEmpresaVisible] = useState(null);
  const [searchAprendizTerm, setSearchAprendizTerm] = useState('');
  const [searchAprendizQuery, setSearchAprendizQuery] = useState('');
  const [filtroAlternativa, setFiltroAlternativa] = useState('');
  const [filtroDropdownVisible, setFiltroDropdownVisible] = useState(false);
  
  // Estados para el modal de asignación
  const [mostrarModalAsignacion, setMostrarModalAsignacion] = useState(false);
  const [aprendizSeleccionado, setAprendizSeleccionado] = useState(null);
  const [formAsignacion, setFormAsignacion] = useState({
    alternativa: '',
    empresa: '',
    fechaInicio: '',
    fechaFin: '',
    estado: 'Activo'
  });

  // ============================================================
  // DATOS ACTUALIZADOS CON APRENDICES CON Y SIN ALTERNATIVA
  // ============================================================
  const [data, setData] = useState([
    {
      idFicha: '2875901',
      programa: 'Análisis y Desarrollo de Software',
      aprendices: [
        { 
          nombre: 'Laura Sofia Martinez', 
          alternativa: 'Contrato de Aprendizaje', 
          empresa: { nombre: 'TechSoft S.A.S.', nit: '900.123.456-7', arl: 'SURA', fechaInicio: '01/03/2025', fechaFin: '28/02/2026', estado: 'Activo' } 
        },
        { 
          nombre: 'Juan Diego Ramirez', 
          alternativa: 'Vínculo Formativo (Pasantía)', 
          empresa: { nombre: 'Innovar Solutions', nit: '900.987.654-3', arl: 'Positiva', fechaInicio: '15/04/2025', fechaFin: '14/04/2026', estado: 'Activo' } 
        },
        { 
          nombre: 'Maria Camila Torres', 
          alternativa: 'Monitoria', 
          empresa: { nombre: 'Universidad Nacional', nit: '899.999.999-9', arl: 'SURA', fechaInicio: '01/02/2025', fechaFin: '31/01/2026', estado: 'Activo' } 
        },
        // ✅ Aprendiz SIN alternativa asignada
        { 
          nombre: 'Andres Felipe Gomez', 
          alternativa: null, 
          empresa: null 
        },
        // ✅ Aprendiz SIN alternativa asignada
        { 
          nombre: 'Diana Carolina Ruiz', 
          alternativa: null, 
          empresa: null 
        },
      ]
    },
    {
      idFicha: '2875902',
      programa: 'Gestión Empresarial',
      aprendices: [
        { 
          nombre: 'Carlos Mendoza', 
          alternativa: 'Proyecto Productivo', 
          empresa: { nombre: 'Global Services LTDA', nit: '901.111.222-3', arl: 'Colmena', fechaInicio: '10/01/2025', fechaFin: '09/01/2026', estado: 'Activo' } 
        },
        { 
          nombre: 'Valentina Rojas', 
          alternativa: 'Vínculo Laboral', 
          empresa: { nombre: 'DataTech Colombia', nit: '901.333.444-5', arl: 'SURA', fechaInicio: '20/02/2025', fechaFin: '19/02/2026', estado: 'Inactivo' } 
        },
        { 
          nombre: 'Andrés Felipe Castro', 
          alternativa: 'Contrato de Aprendizaje', 
          empresa: { nombre: 'Soluciones Web SAS', nit: '901.555.666-7', arl: 'Positiva', fechaInicio: '05/05/2025', fechaFin: '04/05/2026', estado: 'Activo' } 
        },
        // ✅ Aprendiz SIN alternativa asignada
        { 
          nombre: 'Luis Fernando Torres', 
          alternativa: null, 
          empresa: null 
        },
      ]
    },
    {
      idFicha: '2875903',
      programa: 'Contabilidad y Finanzas',
      aprendices: [
        { 
          nombre: 'Luisa Fernanda Gomez', 
          alternativa: 'Vínculo Formativo (Pasantía)', 
          empresa: { nombre: 'TechSoft S.A.S.', nit: '900.123.456-7', arl: 'SURA', fechaInicio: '01/06/2025', fechaFin: '31/05/2026', estado: 'Activo' } 
        },
        { 
          nombre: 'Santiago Pérez', 
          alternativa: 'Proyecto Productivo', 
          empresa: { nombre: 'Emprende Colombia', nit: '901.777.888-9', arl: 'Colmena', fechaInicio: '15/03/2025', fechaFin: '14/03/2026', estado: 'Activo' } 
        },
        // ✅ Aprendiz SIN alternativa asignada
        { 
          nombre: 'Martha Lucia Diaz', 
          alternativa: null, 
          empresa: null 
        },
        // ✅ Aprendiz SIN alternativa asignada
        { 
          nombre: 'Jorge Enrique Mora', 
          alternativa: null, 
          empresa: null 
        },
      ]
    },
    // ============================================================
    // NUEVA FICHA - ASIGNADA POR EL INSTRUCTOR
    // ============================================================
    {
      idFicha: '2875904',
      programa: 'Diseño y Desarrollo de Videojuegos',
      aprendices: [
        { 
          nombre: 'Mateo Alejandro Vargas', 
          alternativa: 'Contrato de Aprendizaje', 
          empresa: { nombre: 'GameDev Studios', nit: '902.111.222-3', arl: 'SURA', fechaInicio: '01/07/2025', fechaFin: '30/06/2026', estado: 'Activo' } 
        },
        { 
          nombre: 'Sofia Isabel Rojas', 
          alternativa: 'Vínculo Formativo (Pasantía)', 
          empresa: { nombre: 'Pixel Art Studio', nit: '902.333.444-5', arl: 'Positiva', fechaInicio: '15/08/2025', fechaFin: '14/08/2026', estado: 'Activo' } 
        },
        // ✅ Aprendiz SIN alternativa asignada
        { 
          nombre: 'Daniel Fernando Castro', 
          alternativa: null, 
          empresa: null 
        },
        // ✅ Aprendiz SIN alternativa asignada
        { 
          nombre: 'Laura Valentina Muñoz', 
          alternativa: null, 
          empresa: null 
        },
        // ✅ Aprendiz SIN alternativa asignada
        { 
          nombre: 'Cristian David Lopez', 
          alternativa: null, 
          empresa: null 
        },
      ]
    }
  ]);

  // Lista de alternativas disponibles
  const alternativasDisponibles = [
    'Contrato de Aprendizaje',
    'Vínculo Formativo (Pasantía)',
    'Proyecto Productivo',
    'Monitoria',
    'Vínculo Laboral'
  ];

  // Lista de empresas disponibles
  const empresasDisponibles = [
    'TechSoft S.A.S.',
    'Innovar Solutions',
    'Global Services LTDA',
    'DataTech Colombia',
    'Soluciones Web SAS',
    'Universidad Nacional',
    'Emprende Colombia',
    'GameDev Studios',
    'Pixel Art Studio'
  ];

  const todasLasAlternativas = [...new Set(data.flatMap(ficha => ficha.aprendices.map(a => a.alternativa)))].filter(Boolean);

  const handleBack = () => {
    setSelectedFicha(null);
    setSearchTerm('');
    setSearchQuery('');
    setEmpresaVisible(null);
    setSearchAprendizTerm('');
    setSearchAprendizQuery('');
    setFiltroAlternativa('');
    setFiltroDropdownVisible(false);
  };

  const handleSearch = () => setSearchQuery(searchTerm);
  const handleClear = () => { setSearchTerm(''); setSearchQuery(''); setFiltroAlternativa(''); setFiltroDropdownVisible(false); };

  const handleSearchAprendiz = () => setSearchAprendizQuery(searchAprendizTerm);
  const handleClearAprendiz = () => { setSearchAprendizTerm(''); setSearchAprendizQuery(''); };

  const toggleEmpresa = (index) => {
    setEmpresaVisible(empresaVisible === index ? null : index);
  };

  // Abrir modal para asignar alternativa (SOLO para aprendices sin alternativa)
  const handleAsignarAlternativa = (aprendiz) => {
    setAprendizSeleccionado(aprendiz);
    setFormAsignacion({
      alternativa: '',
      empresa: '',
      fechaInicio: '',
      fechaFin: '',
      estado: 'Activo'
    });
    setMostrarModalAsignacion(true);
  };

  // Guardar asignación de alternativa
  const handleGuardarAsignacion = () => {
    // Actualizar el estado local
    setData(prevData => {
      return prevData.map(ficha => {
        if (ficha.idFicha === selectedFicha.idFicha) {
          const aprendizIndex = ficha.aprendices.findIndex(a => a.nombre === aprendizSeleccionado.nombre);
          if (aprendizIndex !== -1) {
            const aprendizActualizado = { ...ficha.aprendices[aprendizIndex] };
            aprendizActualizado.alternativa = formAsignacion.alternativa;
            aprendizActualizado.empresa = {
              nombre: formAsignacion.empresa,
              nit: '900.123.456-7',
              arl: 'SURA',
              fechaInicio: formAsignacion.fechaInicio,
              fechaFin: formAsignacion.fechaFin,
              estado: formAsignacion.estado
            };
            const nuevosAprendices = [...ficha.aprendices];
            nuevosAprendices[aprendizIndex] = aprendizActualizado;
            return { ...ficha, aprendices: nuevosAprendices };
          }
        }
        return ficha;
      });
    });

    setMostrarModalAsignacion(false);
    setAprendizSeleccionado(null);
    alert('✅ Alternativa asignada correctamente');
  };

  const handleCargaMasiva = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx,.xls,.csv';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        alert(`✅ Archivo "${file.name}" seleccionado correctamente.\n\nIniciando proceso de carga masiva...`);
      }
    };
    input.click();
  };

  const handleFiltroAlternativa = (alt) => {
    setFiltroAlternativa(alt);
    setFiltroDropdownVisible(false);
  };

  const filteredFichas = data
    .map(ficha => {
      const aprendicesFiltrados = ficha.aprendices.filter(a =>
        (filtroAlternativa === '' || a.alternativa === filtroAlternativa) &&
        (searchQuery === '' || 
          ficha.idFicha.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ficha.programa.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.nombre.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      return { ...ficha, aprendices: aprendicesFiltrados };
    })
    .filter(ficha => ficha.aprendices.length > 0);

  const goToInicio = () => {
    navigate('/instructor');
    window.location.reload();
  };

  const contarAlternativas = (aprendices) => {
    const conteo = {};
    aprendices.forEach(a => {
      if (a.alternativa) {
        conteo[a.alternativa] = (conteo[a.alternativa] || 0) + 1;
      }
    });
    return conteo;
  };

  const getColorAlternativa = (alternativa) => {
    const colores = {
      'Contrato de Aprendizaje': '#10b981',
      'Vínculo Formativo (Pasantía)': '#0ea5e9',
      'Monitoria': '#8b5cf6',
      'Proyecto Productivo': '#f59e0b',
      'Vínculo Laboral': '#ef4444'
    };
    return colores[alternativa] || '#6b7280';
  };

  const getIconoAlternativa = (alternativa) => {
    const iconos = {
      'Contrato de Aprendizaje': 'fa-file-signature',
      'Vínculo Formativo (Pasantía)': 'fa-handshake',
      'Monitoria': 'fa-chalkboard-teacher',
      'Proyecto Productivo': 'fa-project-diagram',
      'Vínculo Laboral': 'fa-briefcase'
    };
    return iconos[alternativa] || 'fa-tag';
  };

  // --- DETALLE DE FICHA ---
  if (selectedFicha) {
    const filteredAprendices = selectedFicha.aprendices.filter(a =>
      a.nombre.toLowerCase().includes(searchAprendizQuery.toLowerCase())
    );

    // Contar cuántos tienen alternativa y cuántos no
    const conAlternativa = selectedFicha.aprendices.filter(a => a.alternativa !== null).length;
    const sinAlternativa = selectedFicha.aprendices.filter(a => a.alternativa === null).length;

    return (
      <div className="seleccion-container">
        <nav style={{ padding: '10px 0', marginBottom: '15px', fontSize: '14px', background: 'transparent', borderBottom: '1px solid #e5e7eb' }}>
          <ol style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', listStyle: 'none', margin: 0, padding: 0, gap: '4px' }}>
            <li style={{ display: 'flex', alignItems: 'center', color: '#6b7280', fontSize: '14px' }}>
              <span onClick={goToInicio} style={{ color: '#3ca203', textDecoration: 'none', fontWeight: '500', cursor: 'pointer' }}>Inicio</span>
              <span style={{ margin: '0 4px', color: '#9ca3af' }}> &gt; </span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', color: '#1f2937', fontSize: '14px', fontWeight: '600' }}>Selección de Alternativa</li>
          </ol>
        </nav>

        <div className="seleccion-header">
          <div className="header-back">
            <button className="btn-back" onClick={handleBack}>
              <i className="fas fa-arrow-left"></i> Volver a fichas
            </button>
            <h2>Ficha {selectedFicha.idFicha} - {selectedFicha.programa}</h2>
            <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
              <span style={{ background: '#10b98120', color: '#10b981', padding: '2px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
                ✅ {conAlternativa} con alternativa
              </span>
              <span style={{ background: '#ef444420', color: '#ef4444', padding: '2px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
                ⚠️ {sinAlternativa} sin alternativa
              </span>
            </div>
          </div>
        </div>

        <div className="search-container" style={{ marginBottom: '15px' }}>
          <input 
            type="text" 
            className="search-input" 
            placeholder="Buscar aprendiz por nombre..." 
            value={searchAprendizTerm}
            onChange={(e) => setSearchAprendizTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchAprendiz()}
          />
          <button className="btn-search" onClick={handleSearchAprendiz}>Buscar</button>
          <button className="btn-clear" onClick={handleClearAprendiz}>Limpiar</button>
        </div>

        <div className="aprendices-list-container">
          <div className="table-wrapper">
            {filteredAprendices.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <h3 style={{ color: '#dc2626' }}>Dato no encontrado</h3>
                <p style={{ color: '#6b7280' }}>No se encontraron aprendices con ese nombre.</p>
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Aprendiz</th>
                    <th>Alternativa Seleccionada</th>
                    <th style={{ textAlign: 'center' }}>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAprendices.map((aprendiz, index) => (
                    <React.Fragment key={index}>
                      <tr style={!aprendiz.alternativa ? { background: '#fef2f2' } : {}}>
                        <td>{index + 1}</td>
                        <td className="nombre-aprendiz">
                          {aprendiz.nombre}
                          {!aprendiz.alternativa && (
                            <span style={{ 
                              marginLeft: '8px', 
                              background: '#ef4444', 
                              color: 'white', 
                              fontSize: '10px', 
                              padding: '2px 8px', 
                              borderRadius: '10px',
                              fontWeight: 'bold'
                            }}>
                              Sin asignar
                            </span>
                          )}
                        </td>
                        <td>
                          {aprendiz.alternativa ? (
                            <span className="alternativa-badge" style={{ 
                              background: `${getColorAlternativa(aprendiz.alternativa)}20`,
                              color: getColorAlternativa(aprendiz.alternativa),
                              border: `1px solid ${getColorAlternativa(aprendiz.alternativa)}`
                            }}>
                              <i className={`fas ${getIconoAlternativa(aprendiz.alternativa)}`} style={{ marginRight: '6px' }} />
                              {aprendiz.alternativa}
                            </span>
                          ) : (
                            <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>
                              <i className="fas fa-minus-circle" style={{ marginRight: '4px' }} />
                              Sin asignar
                            </span>
                          )}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          {aprendiz.alternativa ? (
                            // ✅ Si tiene alternativa, SOLO muestra el botón de empresa
                            <button className="btn-asociacion" onClick={() => toggleEmpresa(index)}>
                              <i className="fas fa-building"></i> Empresa
                            </button>
                          ) : (
                            // ✅ Si NO tiene alternativa, muestra el botón de asignar
                            <button 
                              className="btn-asignar" 
                              onClick={() => handleAsignarAlternativa(aprendiz)}
                              style={{
                                background: '#3ca203',
                                color: 'white',
                                border: 'none',
                                padding: '6px 14px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '13px',
                                fontWeight: '500'
                              }}
                            >
                              <i className="fas fa-plus"></i> Asignar
                            </button>
                          )}
                        </td>
                      </tr>
                      {empresaVisible === index && aprendiz.empresa && (
                        <tr className="empresa-row">
                          <td colSpan="4">
                            <div className="empresa-panel">
                              <div className="empresa-info-grid">
                                <div className="empresa-item"><span className="empresa-label">Empresa</span><span className="empresa-value">{aprendiz.empresa.nombre}</span></div>
                                <div className="empresa-item"><span className="empresa-label">NIT</span><span className="empresa-value">{aprendiz.empresa.nit}</span></div>
                                <div className="empresa-item"><span className="empresa-label">ARL</span><span className="empresa-value">{aprendiz.empresa.arl}</span></div>
                                <div className="empresa-item"><span className="empresa-label">Fecha de inicio</span><span className="empresa-value">{aprendiz.empresa.fechaInicio}</span></div>
                                <div className="empresa-item"><span className="empresa-label">Fecha fin</span><span className="empresa-value">{aprendiz.empresa.fechaFin}</span></div>
                                <div className="empresa-item"><span className="empresa-label">Estado</span><span className={`empresa-status ${aprendiz.empresa.estado === 'Activo' ? 'status-activo' : 'status-inactivo'}`}>{aprendiz.empresa.estado}</span></div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* MODAL DE ASIGNACIÓN DE ALTERNATIVA (SOLO PARA APRENDICES SIN ALTERNATIVA) */}
        {mostrarModalAsignacion && (
          <div className="modal-overlay" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div className="modal-content" style={{
              background: 'white',
              borderRadius: '16px',
              padding: '32px',
              width: '100%',
              maxWidth: '550px',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                paddingBottom: '16px',
                borderBottom: '2px solid #e5e7eb'
              }}>
                <h3 style={{ margin: 0, fontSize: '18px' }}>
                  <i className="fas fa-plus-circle" style={{ color: '#3ca203', marginRight: '8px' }} />
                  Asignar Alternativa
                </h3>
                <button
                  onClick={() => setMostrarModalAsignacion(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    fontSize: '20px',
                    cursor: 'pointer',
                    color: '#6b7280'
                  }}
                >
                  <i className="fas fa-times" />
                </button>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
                  <strong>Aprendiz:</strong> {aprendizSeleccionado?.nombre}
                </p>
                <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#6b7280' }}>
                  <strong>Ficha:</strong> {selectedFicha.idFicha}
                </p>
                <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#ef4444' }}>
                  <strong>Estado actual:</strong> Sin alternativa asignada
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '4px' }}>
                    Alternativa <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <select
                    value={formAsignacion.alternativa}
                    onChange={(e) => setFormAsignacion({...formAsignacion, alternativa: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  >
                    <option value="">Seleccionar alternativa</option>
                    {alternativasDisponibles.map(alt => (
                      <option key={alt} value={alt}>{alt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '4px' }}>
                    Empresa
                  </label>
                  <select
                    value={formAsignacion.empresa}
                    onChange={(e) => setFormAsignacion({...formAsignacion, empresa: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  >
                    <option value="">Seleccionar empresa</option>
                    {empresasDisponibles.map(emp => (
                      <option key={emp} value={emp}>{emp}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '4px' }}>
                      Fecha Inicio
                    </label>
                    <input
                      type="date"
                      value={formAsignacion.fechaInicio}
                      onChange={(e) => setFormAsignacion({...formAsignacion, fechaInicio: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '4px' }}>
                      Fecha Fin
                    </label>
                    <input
                      type="date"
                      value={formAsignacion.fechaFin}
                      onChange={(e) => setFormAsignacion({...formAsignacion, fechaFin: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151', display: 'block', marginBottom: '4px' }}>
                    Estado
                  </label>
                  <select
                    value={formAsignacion.estado}
                    onChange={(e) => setFormAsignacion({...formAsignacion, estado: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Finalizado">Finalizado</option>
                  </select>
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '10px',
                marginTop: '24px',
                paddingTop: '16px',
                borderTop: '1px solid #e5e7eb',
                justifyContent: 'flex-end'
              }}>
                <button
                  onClick={() => setMostrarModalAsignacion(false)}
                  style={{
                    background: '#e5e7eb',
                    border: 'none',
                    padding: '10px 24px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    fontSize: '14px'
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleGuardarAsignacion}
                  style={{
                    background: '#3ca203',
                    color: 'white',
                    border: 'none',
                    padding: '10px 24px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '14px'
                  }}
                >
                  <i className="fas fa-save" /> Guardar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- VISTA PRINCIPAL ---
  return (
    <div className="seleccion-container">
      <nav style={{ padding: '10px 0', marginBottom: '15px', fontSize: '14px', background: 'transparent', borderBottom: '1px solid #e5e7eb' }}>
        <ol style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', listStyle: 'none', margin: 0, padding: 0, gap: '4px' }}>
          <li style={{ display: 'flex', alignItems: 'center', color: '#6b7280', fontSize: '14px' }}>
            <span onClick={goToInicio} style={{ color: '#3ca203', textDecoration: 'none', fontWeight: '500', cursor: 'pointer' }}>Inicio</span>
            <span style={{ margin: '0 4px', color: '#9ca3af' }}> &gt; </span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', color: '#1f2937', fontSize: '14px', fontWeight: '600' }}>Selección de Alternativa</li>
        </ol>
      </nav>

      <div className="seleccion-header">
        <div className="header-top-row">
          <div>
            <h2>Selección de Alternativa</h2>
            <p className="subtitulo">Selecciona una ficha para ver qué alternativa eligieron los aprendices.</p>
          </div>
          <button className="btn-carga-masiva" onClick={handleCargaMasiva}>
            <i className="fas fa-upload"></i> Carga
          </button>
        </div>
      </div>

      {/* BARRA DE BÚSQUEDA CON FILTRO */}
      <div className="search-container">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Buscar por código de ficha o programa..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button className="btn-search" onClick={handleSearch}>Buscar</button>
        <button className="btn-clear" onClick={handleClear}>Limpiar</button>

        {/* BOTÓN DE FILTRO VERDE */}
        <div className="filtro-dropdown-wrapper">
          <button 
            className="btn-filtro-verde"
            onClick={() => setFiltroDropdownVisible(!filtroDropdownVisible)}
          >
            <i className="fas fa-filter" />
            Filtrar
            <i className={`fas fa-chevron-down ${filtroDropdownVisible ? 'rotate' : ''}`} />
          </button>
          {filtroDropdownVisible && (
            <div className="filtro-dropdown-menu">
              <div className="filtro-dropdown-header">
                <span>Filtrar por alternativa</span>
              </div>
              <div className="filtro-dropdown-options">
                <div 
                  className={`filtro-dropdown-option ${filtroAlternativa === '' ? 'active' : ''}`}
                  onClick={() => handleFiltroAlternativa('')}
                >
                  <i className="fas fa-th-list" />
                  Todas las alternativas
                  {filtroAlternativa === '' && <i className="fas fa-check filtro-check" />}
                </div>
                {todasLasAlternativas.map(alt => (
                  <div 
                    key={alt}
                    className={`filtro-dropdown-option ${filtroAlternativa === alt ? 'active' : ''}`}
                    onClick={() => handleFiltroAlternativa(alt)}
                  >
                    <span className="filtro-dropdown-dot" style={{ background: getColorAlternativa(alt) }} />
                    {alt}
                    {filtroAlternativa === alt && <i className="fas fa-check filtro-check" />}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* TARJETAS DE FICHAS */}
      <div className="fichas-grid">
        {filteredFichas.length === 0 ? (
          <div className="not-found" style={{ gridColumn: '1 / -1' }}>
            <h2><i className="fas fa-exclamation-circle"></i> Dato no encontrado</h2>
            <p>No existe ninguna ficha con el criterio de búsqueda seleccionado.</p>
          </div>
        ) : (
          filteredFichas.map((ficha) => {
            const conteo = contarAlternativas(ficha.aprendices);
            const totalAprendices = ficha.aprendices.length;
            const sinAlternativa = ficha.aprendices.filter(a => a.alternativa === null).length;

            return (
              <div key={ficha.idFicha} className="ficha-card" onClick={() => setSelectedFicha(ficha)}>
                <div className="ficha-card-header">
                  <span className="ficha-numero">{ficha.idFicha}</span>
                  <span className="ficha-cantidad">{totalAprendices} aprendices</span>
                </div>
                <div className="ficha-card-body">
                  <span className="ficha-programa">{ficha.programa}</span>
                </div>
                <div className="ficha-alternativas-resumen">
                  {Object.entries(conteo).length > 0 ? (
                    <>
                      {Object.entries(conteo).map(([alt, cantidad]) => {
                        const porcentaje = totalAprendices > 0 ? Math.round((cantidad / totalAprendices) * 100) : 0;
                        return (
                          <div key={alt} className="alternativa-resumen-item">
                            <span className="alternativa-resumen-dot" style={{ background: getColorAlternativa(alt) }} />
                            <span className="alternativa-resumen-nombre">{alt}</span>
                            <span className="alternativa-resumen-cantidad" style={{ color: getColorAlternativa(alt) }}>
                              {cantidad} ({porcentaje}%)
                            </span>
                          </div>
                        );
                      })}
                      {sinAlternativa > 0 && (
                        <div className="alternativa-resumen-item" style={{ color: '#ef4444' }}>
                          <span className="alternativa-resumen-dot" style={{ background: '#ef4444' }} />
                          <span className="alternativa-resumen-nombre">Sin asignar</span>
                          <span className="alternativa-resumen-cantidad" style={{ color: '#ef4444' }}>
                            {sinAlternativa} ({Math.round((sinAlternativa / totalAprendices) * 100)}%)
                          </span>
                        </div>
                      )}
                    </>
                  ) : (
                    <span className="alternativa-resumen-vacio">Sin alternativas asignadas</span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SeleccionAlternativa;
