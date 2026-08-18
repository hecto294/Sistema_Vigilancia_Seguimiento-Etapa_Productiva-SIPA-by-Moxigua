// src/components/SeleccionAlternativa.jsx
import React, { useState } from 'react';
import './SeleccionAlternativa.css';

const SeleccionAlternativa = () => {
  const [selectedFicha, setSelectedFicha] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [empresaVisible, setEmpresaVisible] = useState(null);

  // Datos jerárquicos: Fichas -> Aprendices -> Alternativa + Empresa + ARL + Fechas
  const data = [
    {
      idFicha: '2875901',
      programa: 'Análisis y Desarrollo de Software',
      aprendices: [
        { 
          nombre: 'Laura Sofia Martinez', 
          alternativa: 'Contrato de Aprendizaje',
          empresa: { 
            nombre: 'TechSoft S.A.S.', 
            nit: '900.123.456-7', 
            arl: 'SURA',  
            fechaInicio: '01/03/2025', 
            fechaFin: '28/02/2026',
            estado: 'Activo' 
          }
        },
        { 
          nombre: 'Juan Diego Ramirez', 
          alternativa: 'Vínculo Formativo (Pasantía)',
          empresa: { 
            nombre: 'Innovar Solutions', 
            nit: '900.987.654-3', 
            arl: 'Positiva', 
            fechaInicio: '15/04/2025', 
            fechaFin: '14/04/2026',
            estado: 'Activo' 
          }
        },
        { 
          nombre: 'Maria Camila Torres', 
          alternativa: 'Monitoria',
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
          empresa: { 
            nombre: 'Global Services LTDA', 
            nit: '901.111.222-3', 
            arl: 'Colmena', 
            fechaInicio: '10/01/2025', 
            fechaFin: '09/01/2026',
            estado: 'Activo' 
          } 
        },
        { 
          nombre: 'Valentina Rojas', 
          alternativa: 'Vínculo Laboral', 
          empresa: { 
            nombre: 'DataTech Colombia', 
            nit: '901.333.444-5', 
            arl: 'SURA', 
            fechaInicio: '20/02/2025', 
            fechaFin: '19/02/2026',
            estado: 'Inactivo' 
          } 
        },
        { 
          nombre: 'Andrés Felipe Castro', 
          alternativa: 'Contrato de Aprendizaje', 
          empresa: { 
            nombre: 'Soluciones Web SAS', 
            nit: '901.555.666-7', 
            arl: 'Positiva', 
            fechaInicio: '05/05/2025', 
            fechaFin: '04/05/2026',
            estado: 'Activo' 
          } 
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
          empresa: { 
            nombre: 'TechSoft S.A.S.', 
            nit: '900.123.456-7', 
            arl: 'SURA', 
            fechaInicio: '01/06/2025', 
            fechaFin: '31/05/2026',
            estado: 'Activo' 
          } 
        },
        { 
          nombre: 'Santiago Pérez', 
          alternativa: 'Proyecto Productivo', 
          empresa: null 
        },
      ]
    }
  ];

  // Función para volver a la vista de fichas
  const handleBack = () => {
    setSelectedFicha(null);
    setSearchTerm('');
    setSearchQuery('');
    setEmpresaVisible(null);
  };

  // Función de búsqueda
  const handleSearch = () => {
    setSearchQuery(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSearchQuery('');
  };

  // Función para alternar la visibilidad de la empresa
  const toggleEmpresa = (index) => {
    if (empresaVisible === index) {
      setEmpresaVisible(null);
    } else {
      setEmpresaVisible(index);
    }
  };

  // Función de carga masiva
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

  return (
    <div className="seleccion-container">
      <div className="seleccion-header">
        {!selectedFicha ? (
          <>
            <div className="header-top-row">
              <div>
                <h2>Selección de Alternativa</h2>
                <p className="subtitulo">Selecciona una ficha para ver qué alternativa eligieron los aprendices.</p>
              </div>
              {/* --- BOTÓN CARGA ALINEADO A LA DERECHA CON ESTILO VERDE --- */}
              <button className="btn-carga-masiva" onClick={handleCargaMasiva}>
                <i className="fas fa-upload"></i> Carga
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="header-back">
              <button className="btn-back" onClick={handleBack}>
                <i className="fas fa-arrow-left"></i> Volver a fichas
              </button>
              <h2>Ficha {selectedFicha.idFicha} - {selectedFicha.programa}</h2>
            </div>
          </>
        )}
      </div>

      {/* NIVEL 1: TARJETAS DE FICHAS */}
      {!selectedFicha && (
        <div className="fichas-grid">
          {data.map((ficha) => (
            <div 
              key={ficha.idFicha} 
              className="ficha-card"
              onClick={() => setSelectedFicha(ficha)}
            >
              <div className="ficha-card-header">
                <span className="ficha-numero">{ficha.idFicha}</span>
                <span className="ficha-cantidad">{ficha.aprendices.length} Aprendices</span>
              </div>
              <div className="ficha-card-body">
                <span className="ficha-programa">{ficha.programa}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* NIVEL 2: LISTA DE APRENDICES CON SU ALTERNATIVA */}
      {selectedFicha && (
        <>
          {/* BARRA DE BÚSQUEDA */}
          <div className="search-container">
            <input 
              type="text" 
              className="search-input" 
              placeholder="Buscar por nombre del aprendiz..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button className="btn-search" onClick={handleSearch}>Buscar</button>
            <button className="btn-clear" onClick={handleClear}>Limpiar</button>
          </div>

          <div className="aprendices-list-container">
            <div className="table-wrapper">
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
                  {selectedFicha.aprendices
                    .filter((ap) => 
                      ap.nombre.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((aprendiz, index) => (
                      <React.Fragment key={index}>
                        <tr>
                          <td>{index + 1}</td>
                          <td className="nombre-aprendiz">{aprendiz.nombre}</td>
                          <td>
                            <span className="alternativa-badge">
                              {aprendiz.alternativa}
                            </span>
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <button 
                              className="btn-asociacion"
                              onClick={() => toggleEmpresa(index)}
                            >
                              <i className="fas fa-building"></i> Empresa asociada
                            </button>
                          </td>
                        </tr>
                        {/* FILA DESPLEGABLE DE INFORMACIÓN DE EMPRESA */}
                        {empresaVisible === index && (
                          <tr className="empresa-row">
                            <td colSpan="4">
                              <div className="empresa-panel">
                                {aprendiz.empresa ? (
                                  <div className="empresa-info-grid">
                                    <div className="empresa-item">
                                      <span className="empresa-label">Empresa</span>
                                      <span className="empresa-value">{aprendiz.empresa.nombre}</span>
                                    </div>
                                    <div className="empresa-item">
                                      <span className="empresa-label">NIT</span>
                                      <span className="empresa-value">{aprendiz.empresa.nit}</span>
                                    </div>
                                    <div className="empresa-item">
                                      <span className="empresa-label">ARL</span>
                                      <span className="empresa-value">{aprendiz.empresa.arl}</span>
                                    </div>
                                    <div className="empresa-item">
                                      <span className="empresa-label">Fecha de inicio</span>
                                      <span className="empresa-value">{aprendiz.empresa.fechaInicio}</span>
                                    </div>
                                    <div className="empresa-item">
                                      <span className="empresa-label">Fecha fin</span>
                                      <span className="empresa-value">{aprendiz.empresa.fechaFin}</span>
                                    </div>
                                    <div className="empresa-item">
                                      <span className="empresa-label">Estado</span>
                                      <span className={`empresa-status ${aprendiz.empresa.estado === 'Activo' ? 'status-activo' : 'status-inactivo'}`}>
                                        {aprendiz.empresa.estado}
                                      </span>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="empresa-sin-datos">
                                    <i className="fas fa-exclamation-circle"></i>
                                    <p>Este aprendiz aún no tiene una empresa asociada.</p>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  {/* Mensaje de "Dato no encontrado" si la búsqueda no arroja resultados */}
                  {selectedFicha.aprendices.filter(ap => ap.nombre.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && searchQuery !== '' && (
                    <tr>
                      <td colSpan="4" className="not-found-row">
                        <div className="not-found">
                          <h2><i className="fas fa-exclamation-circle"></i> Dato no encontrado</h2>
                          <p>No existe ningún aprendiz con el nombre ingresado.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SeleccionAlternativa;