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

  const data = [
    {
      idFicha: '2875901',
      programa: 'Análisis y Desarrollo de Software',
      aprendices: [
        { nombre: 'Laura Sofia Martinez', alternativa: 'Contrato de Aprendizaje', empresa: { nombre: 'TechSoft S.A.S.', nit: '900.123.456-7', arl: 'SURA', fechaInicio: '01/03/2025', fechaFin: '28/02/2026', estado: 'Activo' } },
        { nombre: 'Juan Diego Ramirez', alternativa: 'Vínculo Formativo (Pasantía)', empresa: { nombre: 'Innovar Solutions', nit: '900.987.654-3', arl: 'Positiva', fechaInicio: '15/04/2025', fechaFin: '14/04/2026', estado: 'Activo' } },
        { nombre: 'Maria Camila Torres', alternativa: 'Monitoria', empresa: null },
      ]
    },
    {
      idFicha: '2875902',
      programa: 'Gestión Empresarial',
      aprendices: [
        { nombre: 'Carlos Mendoza', alternativa: 'Proyecto Productivo', empresa: { nombre: 'Global Services LTDA', nit: '901.111.222-3', arl: 'Colmena', fechaInicio: '10/01/2025', fechaFin: '09/01/2026', estado: 'Activo' } },
        { nombre: 'Valentina Rojas', alternativa: 'Vínculo Laboral', empresa: { nombre: 'DataTech Colombia', nit: '901.333.444-5', arl: 'SURA', fechaInicio: '20/02/2025', fechaFin: '19/02/2026', estado: 'Inactivo' } },
        { nombre: 'Andrés Felipe Castro', alternativa: 'Contrato de Aprendizaje', empresa: { nombre: 'Soluciones Web SAS', nit: '901.555.666-7', arl: 'Positiva', fechaInicio: '05/05/2025', fechaFin: '04/05/2026', estado: 'Activo' } },
      ]
    },
    {
      idFicha: '2875903',
      programa: 'Contabilidad y Finanzas',
      aprendices: [
        { nombre: 'Luisa Fernanda Gomez', alternativa: 'Vínculo Formativo (Pasantía)', empresa: { nombre: 'TechSoft S.A.S.', nit: '900.123.456-7', arl: 'SURA', fechaInicio: '01/06/2025', fechaFin: '31/05/2026', estado: 'Activo' } },
        { nombre: 'Santiago Pérez', alternativa: 'Proyecto Productivo', empresa: null },
      ]
    }
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
                      <tr>
                        <td>{index + 1}</td>
                        <td className="nombre-aprendiz">{aprendiz.nombre}</td>
                        <td>
                          <span className="alternativa-badge" style={{ 
                            background: `${getColorAlternativa(aprendiz.alternativa)}20`,
                            color: getColorAlternativa(aprendiz.alternativa),
                            border: `1px solid ${getColorAlternativa(aprendiz.alternativa)}`
                          }}>
                            <i className={`fas ${getIconoAlternativa(aprendiz.alternativa)}`} style={{ marginRight: '6px' }} />
                            {aprendiz.alternativa}
                          </span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <button className="btn-asociacion" onClick={() => toggleEmpresa(index)}>
                            <i className="fas fa-building"></i> Empresa asociada
                          </button>
                        </td>
                      </tr>
                      {empresaVisible === index && (
                        <tr className="empresa-row">
                          <td colSpan="4">
                            <div className="empresa-panel">
                              {aprendiz.empresa ? (
                                <div className="empresa-info-grid">
                                  <div className="empresa-item"><span className="empresa-label">Empresa</span><span className="empresa-value">{aprendiz.empresa.nombre}</span></div>
                                  <div className="empresa-item"><span className="empresa-label">NIT</span><span className="empresa-value">{aprendiz.empresa.nit}</span></div>
                                  <div className="empresa-item"><span className="empresa-label">ARL</span><span className="empresa-value">{aprendiz.empresa.arl}</span></div>
                                  <div className="empresa-item"><span className="empresa-label">Fecha de inicio</span><span className="empresa-value">{aprendiz.empresa.fechaInicio}</span></div>
                                  <div className="empresa-item"><span className="empresa-label">Fecha fin</span><span className="empresa-value">{aprendiz.empresa.fechaFin}</span></div>
                                  <div className="empresa-item"><span className="empresa-label">Estado</span><span className={`empresa-status ${aprendiz.empresa.estado === 'Activo' ? 'status-activo' : 'status-inactivo'}`}>{aprendiz.empresa.estado}</span></div>
                                </div>
                              ) : (
                                <div className="empresa-sin-datos"><i className="fas fa-exclamation-circle"></i><p>Este aprendiz aún no tiene una empresa asociada.</p></div>
                              )}
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
                    Object.entries(conteo).map(([alt, cantidad]) => {
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
                    })
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