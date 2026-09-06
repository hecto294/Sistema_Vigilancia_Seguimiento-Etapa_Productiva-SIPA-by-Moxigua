// src/modules/instructor/components/Bitacora.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import Breadcrumb from '../../shared/components/Breadcrumb';
import { getFichas } from '../services/bitacoraService';
import { getIniciales } from '../utils/bimestres';
import { getIconoArchivo, getColorArchivo } from '../utils/archivos';
import './Bitacora.css';

// Componentes hijos
const FichaCard = ({ ficha, onClick }) => {
  return (
    <div
      className="ficha-card"
      onClick={onClick}
      style={{
        background: 'white',
        padding: '25px 20px',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
        textAlign: 'center'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
        e.currentTarget.style.borderColor = '#3ca203';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.04)';
        e.currentTarget.style.borderColor = '#e5e7eb';
      }}
    >
      <div style={{ fontSize: '36px', color: '#3ca203', marginBottom: '10px' }}>
        <i className="fas fa-layer-group" />
      </div>
      <h4 style={{ fontWeight: 'bold', margin: '5px 0', color: '#1f2937', fontSize: '18px' }}>
        {ficha.id}
      </h4>
      <p style={{ color: '#6b7280', fontSize: '14px', margin: '5px 0' }}>{ficha.programa}</p>
      <div style={{ marginTop: '12px' }}>
        <span style={{
          background: '#e6f7ed',
          color: '#047857',
          padding: '2px 10px',
          borderRadius: '12px',
          fontSize: '12px'
        }}>
          <i className="fas fa-users" /> {ficha.aprendices?.length || 0} aprendices
        </span>
      </div>
      <div style={{ marginTop: '12px', fontSize: '13px', color: '#3ca203' }}>
        <i className="fas fa-eye" /> Ver aprendices
      </div>
    </div>
  );
};

const AprendizCard = ({ aprendiz, onClick }) => {
  return (
    <div
      className="aprendiz-card"
      onClick={onClick}
      style={{
        background: 'white',
        padding: '18px 20px',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        cursor: 'pointer',
        transition: 'all 0.2s',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#3ca203';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#e5e7eb';
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div>
        <p style={{ margin: 0, fontWeight: 'bold', fontSize: '15px', color: '#1f2937' }}>
          {aprendiz.nombre}
        </p>
        <p style={{ margin: '3px 0 0 0', fontSize: '12px', color: '#6b7280' }}>
          <i className="fas fa-id-card" style={{ marginRight: '4px' }} />
          {aprendiz.documento || 'Sin documento'}
        </p>
      </div>
      <div style={{
        background: '#e6f7ed',
        color: '#047857',
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        <i className="fas fa-book" /> Ver bitácoras
      </div>
    </div>
  );
};

const BimestreCard = ({ keyBimestre, bitacoras, onClick }) => {
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

  const color = getColorBimestre(keyBimestre);
  const nombreBimestre = getNombreBimestre(keyBimestre);
  const iconoBimestre = getIconoBimestre(keyBimestre);
  const totalBitacoras = bitacoras?.length || 0;

  return (
    <div
      className="bimestre-card"
      onClick={onClick}
      style={{
        background: 'white',
        borderRadius: '12px',
        border: `2px solid ${color}`,
        padding: '20px',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.04)';
      }}
    >
      <div className="bimestre-header" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div className="bimestre-avatar" style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: `${color}15`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: color
        }}>
          <i className={`fas ${iconoBimestre}`} style={{ fontSize: '20px' }} />
        </div>
        <div>
          <div className="bimestre-nombre" style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937' }}>
            {nombreBimestre}
          </div>
          <span className="bimestre-count" style={{ color: color, fontSize: '13px', fontWeight: '500' }}>
            {totalBitacoras} registro{totalBitacoras !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
      <div style={{ marginTop: '12px', fontSize: '13px', color: '#3ca203', textAlign: 'center' }}>
        <i className="fas fa-arrow-right" /> Ver bitácoras
      </div>
    </div>
  );
};

// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================
const Bitacora = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [fichas, setFichas] = useState([]);
  const [selectedFicha, setSelectedFicha] = useState(null);
  const [selectedAprendiz, setSelectedAprendiz] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchAprendizTerm, setSearchAprendizTerm] = useState('');
  const [searchAprendizQuery, setSearchAprendizQuery] = useState('');

  // Cargar fichas
  useEffect(() => {
    const fichasData = getFichas();
    setFichas(fichasData);
  }, []);

  // Restaurar estado desde navegación
  useEffect(() => {
    if (location.state?.restoreFicha) {
      setSelectedFicha(location.state.restoreFicha);
    }
    if (location.state?.restoreAprendiz) {
      setSelectedAprendiz(location.state.restoreAprendiz);
    }
    if (location.state?.restoreFicha || location.state?.restoreAprendiz) {
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const goToInicio = () => {
    navigate('/instructor');
    window.location.reload();
  };

  const handleSearch = () => setSearchQuery(searchTerm);
  const handleClear = () => { setSearchTerm(''); setSearchQuery(''); };

  const handleSearchAprendiz = () => setSearchAprendizQuery(searchAprendizTerm);
  const handleClearAprendiz = () => { setSearchAprendizTerm(''); setSearchAprendizQuery(''); };

  const handleBackToFichas = () => {
    setSelectedFicha(null);
    setSelectedAprendiz(null);
    setSearchTerm('');
    setSearchQuery('');
    setSearchAprendizTerm('');
    setSearchAprendizQuery('');
  };

  const handleBackToAprendices = () => {
    setSelectedAprendiz(null);
    setSearchAprendizTerm('');
    setSearchAprendizQuery('');
  };

  const handleSelectFicha = (ficha) => {
    setSelectedFicha(ficha);
    setSelectedAprendiz(null);
  };

  const handleSelectAprendiz = (aprendiz) => {
    setSelectedAprendiz(aprendiz);
  };

  const toggleBimestre = (key) => {
    navigate(
      `/instructor/bitacora/aprendiz/${selectedAprendiz.id}/bimestre/${key}`,
      { state: { aprendiz: selectedAprendiz, ficha: selectedFicha } }
    );
  };

  const handlePrevisualizarArchivo = (archivo) => {
    const icono = getIconoArchivo(archivo?.tipo);
    const color = getColorArchivo(archivo?.tipo);
    const esImagen = archivo?.tipo?.includes('image') || archivo?.tipo?.includes('jpg') || archivo?.tipo?.includes('png') || archivo?.tipo?.includes('jpeg');
    const esPDF = archivo?.tipo?.includes('pdf');

    let contenidoPrevisualizacion = '';

    if (esImagen) {
      contenidoPrevisualizacion = `
        <div style="text-align: center; padding: 20px; background: #f3f4f6; border-radius: 8px; border: 2px dashed #d1d5db;">
          <i class="fas ${icono}" style="font-size: 64px; color: ${color}; display: block; margin-bottom: 10px;"></i>
          <p style="font-size: 14px; color: #6b7280;">Vista previa de imagen</p>
          <p style="font-size: 12px; color: #9ca3af;">${archivo.nombre} (${archivo.tamaño})</p>
          <div style="margin-top: 15px; background: #e5e7eb; height: 150px; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
            <i class="fas fa-image" style="font-size: 48px; color: #9ca3af;"></i>
            <span style="margin-left: 10px; color: #6b7280;">Vista previa de imagen</span>
          </div>
        </div>
      `;
    } else if (esPDF) {
      contenidoPrevisualizacion = `
        <div style="text-align: center; padding: 20px; background: #f3f4f6; border-radius: 8px; border: 2px dashed #d1d5db;">
          <i class="fas ${icono}" style="font-size: 64px; color: ${color}; display: block; margin-bottom: 10px;"></i>
          <p style="font-size: 14px; color: #6b7280;">Documento PDF</p>
          <p style="font-size: 12px; color: #9ca3af;">${archivo.nombre} (${archivo.tamaño})</p>
          <div style="margin-top: 15px; background: white; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; text-align: left;">
            <p style="margin: 0; font-size: 13px; color: #6b7280;">
              <i class="fas fa-file-pdf" style="color: #dc2626; margin-right: 8px;"></i>
              Vista previa de PDF
            </p>
            <div style="background: #f8fafc; padding: 15px; border-radius: 4px; margin-top: 10px; border: 1px solid #e5e7eb; min-height: 100px;">
              <p style="margin: 0; color: #9ca3af; font-style: italic; text-align: center;">
                Contenido del PDF: ${archivo.nombre}
              </p>
            </div>
          </div>
        </div>
      `;
    } else {
      contenidoPrevisualizacion = `
        <div style="text-align: center; padding: 20px; background: #f3f4f6; border-radius: 8px; border: 2px dashed #d1d5db;">
          <i class="fas ${icono}" style="font-size: 64px; color: ${color}; display: block; margin-bottom: 10px;"></i>
          <p style="font-size: 14px; color: #6b7280;">${archivo.nombre}</p>
          <p style="font-size: 12px; color: #9ca3af;">Tipo: ${archivo.tipo} • Tamaño: ${archivo.tamaño}</p>
          <div style="margin-top: 15px; background: #fefce8; padding: 20px; border-radius: 8px; border: 1px solid #fde68a;">
            <i class="fas fa-info-circle" style="color: #f59e0b;"></i>
            <span style="margin-left: 8px; color: #6b7280;">Vista previa no disponible para este tipo de archivo</span>
          </div>
        </div>
      `;
    }

    Swal.fire({
      title: `👀 ${archivo.nombre}`,
      html: `
        <div style="text-align: left; padding: 5px 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #e5e7eb;">
            <div>
              <p style="margin: 0; font-size: 13px; color: #6b7280;">
                <i class="fas fa-file" style="color: #3ca203; margin-right: 6px;"></i>
                <strong>Nombre:</strong> ${archivo.nombre}
              </p>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #9ca3af;">
                <strong>Tamaño:</strong> ${archivo.tamaño} • <strong>Tipo:</strong> ${archivo.tipo}
              </p>
            </div>
            <span style="background: ${color}20; color: ${color}; padding: 4px 12px; border-radius: 15px; font-size: 12px; font-weight: 500; border: 1px solid ${color}40;">
              <i class="fas ${icono}"></i> ${archivo.tipo?.split('/').pop() || 'Archivo'}
            </span>
          </div>
          ${contenidoPrevisualizacion}
          <div style="margin-top: 15px; padding-top: 12px; border-top: 1px solid #e5e7eb; display: flex; gap: 10px; justify-content: center;">
            <button onclick="window.descargarArchivoPreview(${archivo.id})" style="background: #3ca203; color: white; border: none; padding: 8px 20px; border-radius: 6px; cursor: pointer; font-weight: bold;">
              <i class="fas fa-download"></i> Descargar
            </button>
            <button onclick="window.cerrarPreview()" style="background: #e5e7eb; border: none; padding: 8px 20px; border-radius: 6px; cursor: pointer; font-weight: 500;">
              <i class="fas fa-times"></i> Cerrar
            </button>
          </div>
        </div>
      `,
      icon: 'info',
      iconColor: '#3ca203',
      confirmButtonColor: '#3ca203',
      confirmButtonText: 'Cerrar',
      width: '550px',
      padding: '25px 30px',
      background: '#ffffff',
      color: '#1f2937',
      showCancelButton: false,
      didOpen: () => {
        window.descargarArchivoPreview = (id) => {
          const archivo = window.archivosPreviewData?.find(a => a.id === id);
          if (archivo) {
            handleDescargarArchivo(archivo);
          }
        };
        window.cerrarPreview = () => {
          Swal.close();
        };
      }
    });
  };

  const handleDescargarArchivo = (archivo) => {
    Swal.fire({
      title: '📥 Descargando archivo',
      text: `El archivo "${archivo.nombre}" se está descargando.`,
      icon: 'info',
      iconColor: '#3ca203',
      confirmButtonColor: '#3ca203',
      confirmButtonText: 'Aceptar',
      timer: 2000,
      timerProgressBar: true
    });
    const link = document.createElement('a');
    link.download = archivo.nombre;
    link.href = '#';
    link.click();
  };

  const handleVerDetalleBitacoraConArchivos = (bitacora, aprendiz) => {
    const archivos = bitacora.archivos || [];
    window.archivosPreviewData = archivos;
    const tieneArchivos = archivos.length > 0;

    const archivosHtml = tieneArchivos
      ? archivos.map(a => `
        <div style="display: flex; justify-content: space-between; align-items: center; background: #f8fafc; padding: 6px 10px; border-radius: 4px; border: 1px solid #e5e7eb; margin-bottom: 4px;">
          <div style="display: flex; align-items: center; gap: 6px; cursor: pointer;" onclick="window.previsualizarArchivoInstructor(${a.id})">
            <i class="fas ${getIconoArchivo(a.tipo)}" style="color: ${getColorArchivo(a.tipo)}; font-size: 14px;"></i>
            <span style="font-size: 13px;">${a.nombre}</span>
            <span style="font-size: 10px; color: #9ca3af;">(${a.tamaño})</span>
          </div>
          <div style="display: flex; gap: 4px;">
            <button onclick="window.previsualizarArchivoInstructor(${a.id})" style="background: #e0f2fe; color: #0ea5e9; border: none; padding: 2px 8px; border-radius: 4px; cursor: pointer; font-size: 10px; font-weight: 500;">
              <i class="fas fa-eye"></i> Ver
            </button>
            <button onclick="window.descargarArchivoSeguimiento(${a.id})" style="background: #3ca203; color: white; border: none; padding: 2px 8px; border-radius: 4px; cursor: pointer; font-size: 10px; font-weight: 500;">
              <i class="fas fa-download"></i>
            </button>
          </div>
        </div>
      `).join('')
      : '<p style="color: #9ca3af; font-style: italic; font-size: 12px; margin: 4px 0 0 0;"><i class="fas fa-paperclip" style="margin-right: 4px;"></i>Sin archivos adjuntos</p>';

    Swal.fire({
      title: `📋 ${bitacora.descripcion}`,
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
          ${tieneArchivos ? `
            <div style="margin-top: 15px; padding-top: 12px; border-top: 1px solid #e5e7eb;">
              <p style="font-weight: 600; font-size: 13px; color: #1f2937; margin-bottom: 6px;">
                <i class="fas fa-paperclip" style="color: #3ca203; margin-right: 6px;"></i>
                Archivos adjuntos (${archivos.length})
              </p>
              ${archivosHtml}
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
      width: '550px',
      didOpen: () => {
        window.descargarArchivoSeguimiento = (id) => {
          const archivo = archivos.find(a => a.id === id);
          if (archivo) {
            handleDescargarArchivo(archivo);
          }
        };
        window.previsualizarArchivoInstructor = (id) => {
          const archivo = archivos.find(a => a.id === id);
          if (archivo) {
            handlePrevisualizarArchivo(archivo);
          }
        };
      }
    });
  };

  const handleVerSeguimiento = (bitacora, aprendiz) => {
    if (bitacora.archivos && bitacora.archivos.length > 0) {
      handleVerDetalleBitacoraConArchivos(bitacora, aprendiz);
      return;
    }
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

  // --- VISTA DE BITÁCORAS DEL APRENDIZ ---
  if (selectedAprendiz) {
    const bitacorasKeys = Object.keys(selectedAprendiz.bitacoras || {});
    const hasBitacoras = bitacorasKeys.length > 0 && bitacorasKeys.some(key => selectedAprendiz.bitacoras[key]?.length > 0);

    return (
      <div className="bitacora-container">
        <Breadcrumb />
        <div className="bitacora-header">
          <div className="header-left">
            <button className="btn-back" onClick={handleBackToAprendices}>
              <i className="fas fa-arrow-left"></i> Volver a aprendices
            </button>
            <div className="header-title-row">
              <h2>Bitácora de {selectedAprendiz.nombre}</h2>
            </div>
          </div>
        </div>

        {!hasBitacoras ? (
          <div className="no-bitacoras">
            <i className="fas fa-book-open"></i>
            <h3>Sin bitácoras registradas</h3>
            <p>Este aprendiz aún no tiene bitácoras asociadas.</p>
          </div>
        ) : (
          <div className="bimestres-grid">
            {bitacorasKeys
              .filter(key => selectedAprendiz.bitacoras[key]?.length > 0)
              .map((key) => {
                const bitacoras = selectedAprendiz.bitacoras[key];
                return (
                  <BimestreCard
                    key={key}
                    keyBimestre={key}
                    bitacoras={bitacoras}
                    onClick={() => toggleBimestre(key)}
                  />
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
        <Breadcrumb />
        <div className="bitacora-header">
          <div className="header-left">
            <button className="btn-back" onClick={handleBackToFichas}>
              <i className="fas fa-arrow-left"></i> Volver a fichas
            </button>
            <h2>Ficha {selectedFicha.id}</h2>
            <p className="subtitulo">{selectedFicha.programa} - {selectedFicha.aprendices.length} aprendices</p>
          </div>
        </div>

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

        <div className="aprendices-grid">
          {filteredAprendices.length === 0 ? (
            <div className="not-found">
              <i className="fas fa-exclamation-circle"></i>
              <h3>Dato no encontrado</h3>
              <p>No se encontraron aprendices con ese nombre.</p>
            </div>
          ) : (
            filteredAprendices.map((ap) => (
              <AprendizCard
                key={ap.id}
                aprendiz={ap}
                onClick={() => handleSelectAprendiz(ap)}
              />
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
      <Breadcrumb />

      <div className="bitacora-header">
        <div className="header-left">
          <h2>Bitácora de Seguimiento</h2>
          <p className="subtitulo">Selecciona una ficha para ver los aprendices y sus bitácoras organizadas por bimestre.</p>
        </div>
      </div>

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

      <div className="fichas-grid">
        {filteredFichas.length === 0 ? (
          <div className="not-found">
            <i className="fas fa-exclamation-circle"></i>
            <h3>Dato no encontrado</h3>
            <p>No existe ninguna ficha con el criterio de búsqueda seleccionado.</p>
          </div>
        ) : (
          filteredFichas.map((ficha) => (
            <FichaCard
              key={ficha.id}
              ficha={ficha}
              onClick={() => handleSelectFicha(ficha)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Bitacora;