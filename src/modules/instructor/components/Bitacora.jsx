// src/components/Bitacora.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Bitacora.css';

const Bitacora = () => {
  const navigate = useNavigate();
  const [selectedFicha, setSelectedFicha] = useState(null);
  const [selectedAprendiz, setSelectedAprendiz] = useState(null);
  const [bimestreExpandido, setBimestreExpandido] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchAprendizTerm, setSearchAprendizTerm] = useState('');
  const [searchAprendizQuery, setSearchAprendizQuery] = useState('');

  // Datos de ejemplo con fichas, aprendices y bitácoras
  const fichas = [
    {
      id: '2875901',
      programa: 'Análisis y Desarrollo de Software',
      aprendices: [
        {
          id: 1,
          nombre: 'Laura Sofia Martinez',
          alternativa: 'Contrato de Aprendizaje',
          empresa: 'TechSoft S.A.S.',
          bitacoras: {
            bimestre1: [
              { 
                fecha: '15/03/2025', 
                descripcion: 'Inicio de actividades en la empresa', 
                observaciones: 'Buena adaptación al entorno laboral',
                instructor: 'Carlos Andrés López',
                tipo: 'seguimiento',
                aprendizObservacion: 'He comenzado mis labores en el área de desarrollo'
              },
              { 
                fecha: '22/03/2025', 
                descripcion: 'Capacitación en herramientas internas', 
                observaciones: 'Cumplió con el horario establecido',
                instructor: 'Carlos Andrés López',
                tipo: 'seguimiento',
                aprendizObservacion: 'La capacitación fue muy completa'
              }
            ],
            bimestre2: [
              { 
                fecha: '10/05/2025', 
                descripcion: 'Desarrollo de módulo de facturación', 
                observaciones: 'Avance significativo en el proyecto',
                instructor: 'Carlos Andrés López',
                tipo: 'seguimiento',
                aprendizObservacion: 'Estoy trabajando en el módulo de facturación'
              }
            ]
          }
        },
        {
          id: 2,
          nombre: 'Juan Diego Ramirez',
          alternativa: 'Vínculo Formativo (Pasantía)',
          empresa: 'Innovar Solutions',
          bitacoras: {
            bimestre1: [
              { 
                fecha: '20/04/2025', 
                descripcion: 'Inducción general a la empresa', 
                observaciones: 'Asistió puntualmente',
                instructor: 'Carlos Andrés López',
                tipo: 'seguimiento',
                aprendizObservacion: 'Recibí inducción sobre políticas de la empresa'
              }
            ],
            bimestre2: [
              { 
                fecha: '15/06/2025', 
                descripcion: 'Proyecto de base de datos', 
                observaciones: 'Buen desempeño técnico',
                instructor: 'Carlos Andrés López',
                tipo: 'seguimiento',
                aprendizObservacion: 'Estoy diseñando la base de datos del proyecto'
              }
            ]
          }
        },
        {
          id: 3,
          nombre: 'Maria Camila Torres',
          alternativa: 'Monitoria',
          empresa: null,
          bitacoras: {
            bimestre1: [
              { 
                fecha: '01/03/2025', 
                descripcion: 'Sesión de monitoreo académico', 
                observaciones: 'Participación activa',
                instructor: 'Carlos Andrés López',
                tipo: 'seguimiento',
                aprendizObservacion: 'Realicé monitoreo a los estudiantes de primer semestre'
              }
            ]
          }
        }
      ]
    },
    {
      id: '2875902',
      programa: 'Gestión Empresarial',
      aprendices: [
        {
          id: 4,
          nombre: 'Carlos Mendoza',
          alternativa: 'Proyecto Productivo',
          empresa: 'Global Services LTDA',
          bitacoras: {
            bimestre1: [
              { 
                fecha: '12/01/2025', 
                descripcion: 'Planificación del proyecto', 
                observaciones: 'Estructura clara y detallada',
                instructor: 'Carlos Andrés López',
                tipo: 'seguimiento',
                aprendizObservacion: 'Estoy planificando las etapas del proyecto'
              }
            ]
          }
        },
        {
          id: 5,
          nombre: 'Valentina Rojas',
          alternativa: 'Vínculo Laboral',
          empresa: 'DataTech Colombia',
          bitacoras: {}
        },
        {
          id: 6,
          nombre: 'Andrés Felipe Castro',
          alternativa: 'Contrato de Aprendizaje',
          empresa: 'Soluciones Web SAS',
          bitacoras: {
            bimestre1: [
              { 
                fecha: '10/05/2025', 
                descripcion: 'Desarrollo de frontend', 
                observaciones: 'Cumple con estándares de calidad',
                instructor: 'Carlos Andrés López',
                tipo: 'seguimiento',
                aprendizObservacion: 'Estoy desarrollando interfaces de usuario'
              }
            ]
          }
        }
      ]
    }
  ];

  // Navegar al inicio (Dashboard)
  const goToInicio = () => {
    navigate('/instructor');
    window.location.reload();
  };

  // Funciones de búsqueda para fichas
  const handleSearch = () => setSearchQuery(searchTerm);
  const handleClear = () => { setSearchTerm(''); setSearchQuery(''); };

  // Funciones de búsqueda para aprendices
  const handleSearchAprendiz = () => setSearchAprendizQuery(searchAprendizTerm);
  const handleClearAprendiz = () => { setSearchAprendizTerm(''); setSearchAprendizQuery(''); };

  // Navegación entre vistas
  const handleBackToFichas = () => {
    setSelectedFicha(null);
    setSelectedAprendiz(null);
    setBimestreExpandido(null);
    setSearchTerm('');
    setSearchQuery('');
    setSearchAprendizTerm('');
    setSearchAprendizQuery('');
  };

  const handleBackToAprendices = () => {
    setSelectedAprendiz(null);
    setBimestreExpandido(null);
    setSearchAprendizTerm('');
    setSearchAprendizQuery('');
  };

  const handleSelectFicha = (ficha) => {
    setSelectedFicha(ficha);
    setSelectedAprendiz(null);
    setBimestreExpandido(null);
  };

  const handleSelectAprendiz = (aprendiz) => {
    setSelectedAprendiz(aprendiz);
    setBimestreExpandido(null);
  };

  const toggleBimestre = (key) => {
    setBimestreExpandido(bimestreExpandido === key ? null : key);
  };

  // Función para ver detalle de un seguimiento
  const handleVerSeguimiento = (bitacora, aprendiz) => {
    Swal.fire({
      title: '📋 Detalle del Seguimiento',
      html: `
        <div style="text-align: left; padding: 10px 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #e5e7eb;">
            <div>
              <p style="margin: 0; font-size: 14px; color: #6b7280;">
                <i class="fas fa-user" style="color: #3ca203; margin-right: 6px;"></i>
                <strong>Aprendiz:</strong> ${aprendiz.nombre}
              </p>
            </div>
            <span style="background: #e6f7ed; color: #047857; padding: 4px 12px; border-radius: 15px; font-size: 12px; font-weight: 500;">
              <i class="fas fa-check-circle"></i> Seguimiento
            </span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px;">
            <div>
              <p style="margin: 0; font-size: 13px; color: #6b7280;">
                <i class="fas fa-calendar" style="color: #3ca203; margin-right: 6px;"></i>
                <strong>Fecha:</strong>
              </p>
              <p style="margin: 4px 0 0 22px; font-size: 14px; color: #1f2937;">${bitacora.fecha}</p>
            </div>
            <div>
              <p style="margin: 0; font-size: 13px; color: #6b7280;">
                <i class="fas fa-chalkboard-teacher" style="color: #3ca203; margin-right: 6px;"></i>
                <strong>Instructor:</strong>
              </p>
              <p style="margin: 4px 0 0 22px; font-size: 14px; color: #1f2937;">${bitacora.instructor || 'Carlos Andrés López'}</p>
            </div>
          </div>
          ${bitacora.aprendizObservacion ? `
            <div style="margin-bottom: 12px;">
              <p style="margin: 0; font-size: 13px; color: #6b7280;">
                <i class="fas fa-user-graduate" style="color: #3ca203; margin-right: 6px;"></i>
                <strong>Bitácora del Aprendiz:</strong>
              </p>
              <div style="background: #e8f5e9; padding: 10px 14px; border-radius: 8px; margin-top: 4px; border-left: 3px solid #43a047;">
                <p style="margin: 0; font-size: 14px; color: #1f2937;">${bitacora.aprendizObservacion}</p>
              </div>
            </div>
          ` : ''}
          <div style="margin-bottom: 12px;">
            <p style="margin: 0; font-size: 13px; color: #6b7280;">
              <i class="fas fa-file-alt" style="color: #3ca203; margin-right: 6px;"></i>
              <strong>Descripción:</strong>
            </p>
            <div style="background: #f8fafc; padding: 10px 14px; border-radius: 8px; margin-top: 4px; border-left: 3px solid #3ca203;">
              <p style="margin: 0; font-size: 14px; color: #1f2937;">${bitacora.descripcion}</p>
            </div>
          </div>
          ${bitacora.observaciones ? `
            <div>
              <p style="margin: 0; font-size: 13px; color: #6b7280;">
                <i class="fas fa-comment" style="color: #f59e0b; margin-right: 6px;"></i>
                <strong>Observaciones del Instructor:</strong>
              </p>
              <div style="background: #fefce8; padding: 10px 14px; border-radius: 8px; margin-top: 4px; border-left: 3px solid #f59e0b;">
                <p style="margin: 0; font-size: 14px; color: #1f2937;">${bitacora.observaciones}</p>
              </div>
            </div>
          ` : ''}
          <div style="margin-top: 15px; padding-top: 12px; border-top: 1px dashed #e5e7eb; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 12px; color: #9ca3af;">
              <i class="fas fa-clock"></i> Registro de seguimiento
            </span>
            <span style="font-size: 12px; color: #9ca3af;">
              <i class="fas fa-tag"></i> ${aprendiz.alternativa || 'Sin alternativa'}
            </span>
          </div>
        </div>
      `,
      icon: 'info',
      confirmButtonText: '✅ Aceptar',
      confirmButtonColor: '#3ca203',
      width: '550px'
    });
  };

  // Función para crear seguimiento
  const handleCrearSeguimiento = (aprendiz) => {
    Swal.fire({
      title: '📝 Crear Seguimiento',
      html: `
        <div style="text-align: left; padding: 10px 0;">
          <p style="margin: 8px 0; font-size: 15px; color: #1f2937;">
            <strong>Aprendiz:</strong> ${aprendiz.nombre}
          </p>
          <p style="margin: 8px 0; font-size: 15px; color: #1f2937;">
            <strong>Ficha:</strong> ${selectedFicha?.id}
          </p>
          <div style="margin: 15px 0;">
            <label style="display: block; font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 5px;">
              Descripción del seguimiento
            </label>
            <textarea id="descripcion-seguimiento" 
              style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px; min-height: 80px; resize: vertical; box-sizing: border-box;"
              placeholder="Escribe aquí el seguimiento realizado..."
            ></textarea>
          </div>
          <div style="margin: 15px 0;">
            <label style="display: block; font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 5px;">
              Observaciones
            </label>
            <textarea id="observaciones-seguimiento" 
              style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px; min-height: 60px; resize: vertical; box-sizing: border-box;"
              placeholder="Observaciones adicionales..."
            ></textarea>
          </div>
          <div style="margin: 15px 0;">
            <label style="display: block; font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 5px;">
              Bimestre
            </label>
            <select id="bimestre-seleccionado" 
              style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
            >
              <option value="bimestre1">1er Bimestre</option>
              <option value="bimestre2">2do Bimestre</option>
              <option value="bimestre3">3er Bimestre</option>
              <option value="bimestre4">4to Bimestre</option>
            </select>
          </div>
        </div>
      `,
      icon: 'info',
      confirmButtonText: '✅ Guardar Seguimiento',
      confirmButtonColor: '#3ca203',
      showCancelButton: true,
      cancelButtonText: '❌ Cancelar',
      cancelButtonColor: '#ef4444',
      preConfirm: () => {
        const descripcion = document.getElementById('descripcion-seguimiento').value;
        const observaciones = document.getElementById('observaciones-seguimiento').value;
        const bimestre = document.getElementById('bimestre-seleccionado').value;

        if (!descripcion.trim()) {
          Swal.showValidationMessage('⚠️ Por favor ingresa una descripción del seguimiento');
          return false;
        }

        return { descripcion, observaciones, bimestre };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const { descripcion, observaciones, bimestre } = result.value;
        
        // Simular guardado
        Swal.fire({
          title: '✅ ¡Seguimiento guardado!',
          html: `
            <div style="text-align: left; padding: 10px 0;">
              <p style="margin: 8px 0; font-size: 15px; color: #1f2937;">
                <strong>Aprendiz:</strong> ${aprendiz.nombre}
              </p>
              <p style="margin: 8px 0; font-size: 15px; color: #1f2937;">
                <strong>Bimestre:</strong> ${bimestre === 'bimestre1' ? '1er Bimestre' : bimestre === 'bimestre2' ? '2do Bimestre' : bimestre === 'bimestre3' ? '3er Bimestre' : '4to Bimestre'}
              </p>
              <p style="margin: 8px 0; font-size: 14px; color: #6b7280;">
                <strong>Descripción:</strong> ${descripcion}
              </p>
              ${observaciones ? `<p style="margin: 8px 0; font-size: 14px; color: #6b7280;"><strong>Observaciones:</strong> ${observaciones}</p>` : ''}
              <p style="margin: 12px 0 0 0; font-size: 13px; color: #9ca3af; font-style: italic; border-top: 1px dashed #e5e7eb; padding-top: 10px;">
                El seguimiento ha sido registrado exitosamente.
              </p>
            </div>
          `,
          icon: 'success',
          confirmButtonText: '✅ Aceptar',
          confirmButtonColor: '#3ca203',
          timer: 3000,
          timerProgressBar: true
        });
      }
    });
  };

  // FUNCIÓN PARA AGREGAR OBSERVACIÓN A BITÁCORA DEL APRENDIZ
  const handleAgregarObservacionBitacora = (bitacora, aprendiz, bimestreKey) => {
    Swal.fire({
      title: '📝 Agregar Observación a Bitácora',
      html: `
        <div style="text-align: left; padding: 10px 0;">
          <div style="margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #e5e7eb;">
            <p style="margin: 4px 0; font-size: 14px; color: #6b7280;">
              <strong>Aprendiz:</strong> ${aprendiz.nombre}
            </p>
            <p style="margin: 4px 0; font-size: 14px; color: #6b7280;">
              <strong>Bimestre:</strong> ${getNombreBimestre(bimestreKey)}
            </p>
            <p style="margin: 4px 0; font-size: 14px; color: #6b7280;">
              <strong>Fecha:</strong> ${bitacora.fecha}
            </p>
            ${bitacora.aprendizObservacion ? `
              <div style="margin-top: 10px; background: #e8f5e9; padding: 10px 14px; border-radius: 8px; border-left: 3px solid #43a047;">
                <p style="margin: 0; font-size: 13px; color: #2e7d32;">
                  <i class="fas fa-user-graduate"></i> <strong>Bitácora del aprendiz:</strong>
                </p>
                <p style="margin: 5px 0 0 0; font-size: 14px; color: #1f2937;">${bitacora.aprendizObservacion}</p>
              </div>
            ` : ''}
            ${bitacora.observaciones ? `
              <div style="margin-top: 10px; background: #fefce8; padding: 10px 14px; border-radius: 8px; border-left: 3px solid #f59e0b;">
                <p style="margin: 0; font-size: 13px; color: #d97706;">
                  <i class="fas fa-comment"></i> <strong>Observación anterior del instructor:</strong>
                </p>
                <p style="margin: 5px 0 0 0; font-size: 14px; color: #1f2937;">${bitacora.observaciones}</p>
              </div>
            ` : ''}
          </div>
          <div style="margin: 15px 0;">
            <label style="display: block; font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 5px;">
              Nueva observación para el aprendiz
            </label>
            <textarea id="nueva-observacion-bitacora" 
              style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px; min-height: 100px; resize: vertical; box-sizing: border-box;"
              placeholder="Escribe aquí la observación para el aprendiz sobre su bitácora..."
            ></textarea>
            <p style="font-size: 12px; color: #9ca3af; margin-top: 5px;">
              <i class="fas fa-info-circle"></i> Esta observación será visible para el aprendiz
            </p>
          </div>
        </div>
      `,
      icon: 'info',
      confirmButtonText: '✅ Guardar Observación',
      confirmButtonColor: '#3ca203',
      showCancelButton: true,
      cancelButtonText: '❌ Cancelar',
      cancelButtonColor: '#ef4444',
      preConfirm: () => {
        const observacion = document.getElementById('nueva-observacion-bitacora').value;
        if (!observacion.trim()) {
          Swal.showValidationMessage('⚠️ Por favor ingresa una observación');
          return false;
        }
        return { observacion };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const { observacion } = result.value;
        
        // Simular guardado de observación
        Swal.fire({
          title: '✅ ¡Observación agregada a la bitácora!',
          html: `
            <div style="text-align: left; padding: 10px 0;">
              <p style="margin: 8px 0; font-size: 15px; color: #1f2937;">
                <strong>Aprendiz:</strong> ${aprendiz.nombre}
              </p>
              <div style="background: #fefce8; padding: 12px 16px; border-radius: 8px; margin: 10px 0; border-left: 3px solid #f59e0b;">
                <p style="margin: 0; font-size: 14px; color: #1f2937;">
                  <i class="fas fa-comment" style="color: #f59e0b; margin-right: 8px;"></i>
                  ${observacion}
                </p>
              </div>
              ${bitacora.observaciones ? `
                <p style="margin: 8px 0; font-size: 13px; color: #9ca3af;">
                  <strong>Observación anterior:</strong> ${bitacora.observaciones}
                </p>
              ` : ''}
              <p style="margin: 12px 0 0 0; font-size: 13px; color: #9ca3af; font-style: italic; border-top: 1px dashed #e5e7eb; padding-top: 10px;">
                La observación ha sido registrada y será visible para el aprendiz.
              </p>
            </div>
          `,
          icon: 'success',
          confirmButtonText: '✅ Aceptar',
          confirmButtonColor: '#3ca203',
          timer: 3000,
          timerProgressBar: true
        });
      }
    });
  };

  // Funciones auxiliares
  const getNombreBimestre = (key) => {
    const nombres = {
      bimestre1: '1er Bimestre',
      bimestre2: '2do Bimestre',
      bimestre3: '3er Bimestre',
      bimestre4: '4to Bimestre'
    };
    return nombres[key] || key;
  };

  const getIconoBimestre = (key) => {
    const iconos = {
      bimestre1: 'fa-calendar-alt',
      bimestre2: 'fa-calendar-check',
      bimestre3: 'fa-calendar-day',
      bimestre4: 'fa-calendar-week'
    };
    return iconos[key] || 'fa-calendar';
  };

  const getColorBimestre = (key) => {
    const colores = {
      bimestre1: '#3ca203',
      bimestre2: '#0ea5e9',
      bimestre3: '#f59e0b',
      bimestre4: '#8b5cf6'
    };
    return colores[key] || '#6b7280';
  };

  const getIniciales = (nombre) => {
    return nombre
      .split(' ')
      .map(palabra => palabra[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // --- VISTA DE BITÁCORAS DEL APRENDIZ (TARJETAS DE BIMESTRES) ---
  if (selectedAprendiz) {
    const bitacorasKeys = Object.keys(selectedAprendiz.bitacoras || {});
    const hasBitacoras = bitacorasKeys.length > 0 && bitacorasKeys.some(key => selectedAprendiz.bitacoras[key]?.length > 0);

    return (
      <div className="bitacora-container">
        {/* Miga de pan */}
        <nav className="breadcrumb">
          <ol>
            <li>
              <span onClick={goToInicio}>Inicio</span>
              <span className="separator"> &gt; </span>
            </li>
            <li>
              <span onClick={handleBackToFichas}>Bitácora</span>
              <span className="separator"> &gt; </span>
            </li>
            <li>
              <span onClick={handleBackToAprendices}>Ficha {selectedFicha?.id}</span>
              <span className="separator"> &gt; </span>
            </li>
            <li className="active">{selectedAprendiz.nombre}</li>
          </ol>
        </nav>

        <div className="bitacora-header">
          <div className="header-left">
            <button className="btn-back" onClick={handleBackToAprendices}>
              <i className="fas fa-arrow-left"></i> Volver a aprendices
            </button>
            <div className="header-title-row">
              <h2>Bitácora de {selectedAprendiz.nombre}</h2>
              <button 
                className="btn-crear-seguimiento"
                onClick={() => handleCrearSeguimiento(selectedAprendiz)}
              >
                <i className="fas fa-plus-circle"></i> Crear Seguimiento
              </button>
            </div>
          </div>
        </div>

        {!hasBitacoras ? (
          <div className="no-bitacoras">
            <i className="fas fa-book-open"></i>
            <h3>Sin bitácoras registradas</h3>
            <p>Este aprendiz aún no tiene bitácoras asociadas.</p>
            <button 
              className="btn-crear-seguimiento-empty"
              onClick={() => handleCrearSeguimiento(selectedAprendiz)}
            >
              <i className="fas fa-plus-circle"></i> Crear primer seguimiento
            </button>
          </div>
        ) : (
          <div className="bimestres-grid">
            {bitacorasKeys
              .filter(key => selectedAprendiz.bitacoras[key]?.length > 0)
              .map((key) => {
                const isExpanded = bimestreExpandido === key;
                const bitacoras = selectedAprendiz.bitacoras[key];
                const color = getColorBimestre(key);
                const nombreBimestre = getNombreBimestre(key);
                const iconoBimestre = getIconoBimestre(key);
                const totalBitacoras = bitacoras.length;

                return (
                  <div key={key} className="bimestre-card">
                    <div 
                      className="bimestre-header clickable"
                      onClick={() => toggleBimestre(key)}
                    >
                      <div className="bimestre-header-left">
                        <div className="bimestre-avatar" style={{ background: `${color}15`, color: color }}>
                          <i className={`fas ${iconoBimestre}`}></i>
                        </div>
                        <div>
                          <div className="bimestre-nombre">{nombreBimestre}</div>
                          <span className="bimestre-count" style={{ color: color }}>
                            {totalBitacoras} registro{totalBitacoras !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                      <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'} bimestre-toggle`} style={{ color: color }}></i>
                    </div>
                    
                    {isExpanded && (
                      <div className="bimestre-content">
                        {bitacoras.map((bitacora, index) => (
                          <div 
                            key={index} 
                            className="bitacora-item"
                            style={{ borderLeftColor: color }}
                          >
                            {/* Contenido clickeable para ver detalle */}
                            <div 
                              className="bitacora-main-content"
                              onClick={() => handleVerSeguimiento(bitacora, selectedAprendiz)}
                              style={{ cursor: 'pointer' }}
                            >
                              <div className="bitacora-fecha">
                                <i className="fas fa-clock"></i>
                                {bitacora.fecha}
                              </div>
                              <div className="bitacora-descripcion">
                                <strong>{bitacora.descripcion}</strong>
                              </div>
                              {bitacora.aprendizObservacion && (
                                <div className="bitacora-aprendiz-obs">
                                  <i className="fas fa-user-graduate"></i>
                                  <span className="label">Bitácora:</span>
                                  {bitacora.aprendizObservacion}
                                </div>
                              )}
                              {bitacora.observaciones && (
                                <div className="bitacora-observaciones">
                                  <i className="fas fa-comment"></i>
                                  <span className="label">Observación:</span>
                                  {bitacora.observaciones}
                                </div>
                              )}
                              <div className="bitacora-footer">
                                <span className="bitacora-instructor">
                                  <i className="fas fa-user"></i>
                                  {bitacora.instructor || 'Carlos Andrés López'}
                                </span>
                                <span className="bitacora-ver-detalle">
                                  Ver detalle <i className="fas fa-chevron-right"></i>
                                </span>
                              </div>
                            </div>
                            {/* BOTÓN PARA AGREGAR OBSERVACIÓN A LA BITÁCORA */}
                            <button 
                              className="btn-agregar-observacion-bitacora"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAgregarObservacionBitacora(bitacora, selectedAprendiz, key);
                              }}
                            >
                              <i className="fas fa-pen"></i> Observar Bitácora
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        )}
      </div>
    );
  }

  // --- VISTA DE APRENDICES DE UNA FICHA ---
  if (selectedFicha) {
    const filteredAprendices = selectedFicha.aprendices.filter(a =>
      a.nombre.toLowerCase().includes(searchAprendizQuery.toLowerCase())
    );

    return (
      <div className="bitacora-container">
        {/* Miga de pan */}
        <nav className="breadcrumb">
          <ol>
            <li>
              <span onClick={goToInicio}>Inicio</span>
              <span className="separator"> &gt; </span>
            </li>
            <li>
              <span onClick={handleBackToFichas}>Bitácora</span>
              <span className="separator"> &gt; </span>
            </li>
            <li className="active">Ficha {selectedFicha.id}</li>
          </ol>
        </nav>

        <div className="bitacora-header">
          <div className="header-left">
            <button className="btn-back" onClick={handleBackToFichas}>
              <i className="fas fa-arrow-left"></i> Volver a fichas
            </button>
            <h2>Ficha {selectedFicha.id}</h2>
            <p className="subtitulo">{selectedFicha.programa} - {selectedFicha.aprendices.length} aprendices</p>
          </div>
        </div>

        {/* Barra de búsqueda para aprendices */}
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar aprendiz por nombre..."
            value={searchAprendizTerm}
            onChange={(e) => setSearchAprendizTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchAprendiz()}
          />
          <button className="btn-search" onClick={handleSearchAprendiz}>
            <i className="fas fa-search"></i> Buscar
          </button>
          <button className="btn-clear" onClick={handleClearAprendiz}>
            <i className="fas fa-times"></i> Limpiar
          </button>
        </div>

        {/* Lista de aprendices */}
        <div className="aprendices-grid">
          {filteredAprendices.length === 0 ? (
            <div className="not-found">
              <i className="fas fa-exclamation-circle"></i>
              <h3>Dato no encontrado</h3>
              <p>No se encontraron aprendices con ese nombre.</p>
            </div>
          ) : (
            filteredAprendices.map((ap) => (
              <div
                key={ap.id}
                className="aprendiz-card"
                onClick={() => handleSelectAprendiz(ap)}
              >
                <div className="aprendiz-avatar">
                  {getIniciales(ap.nombre)}
                </div>
                <div className="aprendiz-nombre">{ap.nombre}</div>
                <div className="aprendiz-arrow">
                  <i className="fas fa-chevron-right"></i>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  // --- VISTA PRINCIPAL (FICHAS) ---
  const filteredFichas = fichas.filter(f =>
    searchQuery === '' ||
    f.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.programa.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bitacora-container">
      {/* Miga de pan */}
      <nav className="breadcrumb">
        <ol>
          <li>
            <span onClick={goToInicio}>Inicio</span>
            <span className="separator"> &gt; </span>
          </li>
          <li className="active">Bitácora</li>
        </ol>
      </nav>

      <div className="bitacora-header">
        <div className="header-left">
          <h2>Bitácora de Seguimiento</h2>
          <p className="subtitulo">Selecciona una ficha para ver los aprendices y sus bitácoras organizadas por bimestre.</p>
        </div>
      </div>

      {/* Barra de búsqueda para fichas */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar por código de ficha o programa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button className="btn-search" onClick={handleSearch}>
          <i className="fas fa-search"></i> Buscar
        </button>
        <button className="btn-clear" onClick={handleClear}>
          <i className="fas fa-times"></i> Limpiar
        </button>
      </div>

      {/* Lista de fichas */}
      <div className="fichas-grid">
        {filteredFichas.length === 0 ? (
          <div className="not-found">
            <i className="fas fa-exclamation-circle"></i>
            <h3>Dato no encontrado</h3>
            <p>No existe ninguna ficha con el criterio de búsqueda seleccionado.</p>
          </div>
        ) : (
          filteredFichas.map((ficha) => (
            <div
              key={ficha.id}
              className="ficha-card"
              onClick={() => handleSelectFicha(ficha)}
            >
              <div className="ficha-numero">{ficha.id}</div>
              <div className="ficha-programa">{ficha.programa}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Bitacora;