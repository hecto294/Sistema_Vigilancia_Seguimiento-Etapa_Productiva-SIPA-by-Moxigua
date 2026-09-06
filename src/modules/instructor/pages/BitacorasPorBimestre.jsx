// src/modules/instructor/pages/BitacorasPorBimestre.jsx
import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import Breadcrumb from '../../shared/components/Breadcrumb';

const BitacorasPorBimestre = () => {
  const navigate = useNavigate();
  const { aprendizId, bimestre } = useParams();
  const location = useLocation();

  // ✅ Datos reales pasados desde Bitacora.jsx al navegar (state)
  const aprendizReal = location.state?.aprendiz;
  const fichaReal = location.state?.ficha;

  // ✅ Fallback: solo se usa si alguien entra directo a esta URL sin pasar por Bitacora.jsx
  const aprendizFallback = {
    id: parseInt(aprendizId),
    nombre: 'Laura Sofia Martinez',
    documento: '1001234567',
    ficha: '2875901',
    programa: 'Análisis y Desarrollo de Software',
    instructor: 'Carlos Andrés López'
  };

  const bitacorasDataFallback = {
    bimestre1: [
      {
        id: 1,
        fecha: '15/03/2025',
        descripcion: 'Inicio de actividades en la empresa',
        observacion: 'Buena adaptación al entorno laboral',
        instructor: 'Carlos Andrés López',
        aprendizObservacion: 'He comenzado mis labores en el área de desarrollo',
        archivos: ['Induccion_SENA.pdf', 'Cronograma_Actividades.pdf']
      },
      {
        id: 2,
        fecha: '22/03/2025',
        descripcion: 'Capacitación en herramientas internas',
        observacion: 'Cumplió con el horario establecido',
        instructor: 'Carlos Andrés López',
        aprendizObservacion: 'La capacitación fue muy completa',
        archivos: ['Capacitacion_Herramientas.pdf']
      }
    ],
    bimestre2: [
      {
        id: 3,
        fecha: '10/05/2025',
        descripcion: 'Desarrollo de módulo de facturación',
        observacion: 'Avance significativo en el proyecto',
        instructor: 'Carlos Andrés López',
        aprendizObservacion: 'Estoy trabajando en el módulo de facturación',
        archivos: ['Modulo_Facturacion.pdf']
      }
    ],
    bimestre3: []
  };

  // Usamos datos reales si vinieron por navegación; si no, el fallback de ejemplo
  const aprendiz = aprendizReal
    ? {
        id: aprendizReal.id,
        nombre: aprendizReal.nombre,
        ficha: fichaReal?.id || aprendizFallback.ficha,
        programa: fichaReal?.programa || aprendizFallback.programa,
        instructor: aprendizFallback.instructor
      }
    : aprendizFallback;

  const bitacorasData = aprendizReal?.bitacoras || bitacorasDataFallback;

  const getBimestreNombre = (bim) => {
    const nombres = {
      bimestre1: '1er Bimestre',
      bimestre2: '2do Bimestre',
      bimestre3: '3er Bimestre',
      bimestre4: '4to Bimestre'
    };
    return nombres[bim] || bim;
  };

  const bitacoras = bitacorasData[bimestre] || [];
  const bimestreNombre = getBimestreNombre(bimestre);

  // ✅ Al volver, regresamos a /instructor/bitacora restaurando la ficha y el aprendiz
  // seleccionados para que no se pierda el lugar en el que estaba el instructor.
  const goBack = () => {
    navigate('/instructor/bitacora', {
      state: { restoreFicha: fichaReal, restoreAprendiz: aprendizReal }
    });
  };

  // Los datos reales de Bitacora.jsx usan "observaciones" (plural) y archivos como
  // objetos {nombre, ...}; el fallback usa "observacion" (singular) y archivos como
  // strings. Estas dos funciones auxiliares soportan ambos formatos.
  const getObservacion = (b) => b.observaciones || b.observacion || null;
  const getNombreArchivo = (archivo) => (typeof archivo === 'string' ? archivo : archivo.nombre);

  // ✅ VER: muestra el detalle completo de la bitácora
  const handleVer = (bitacora) => {
    const observacion = getObservacion(bitacora);
    window.archivosVerData = bitacora.archivos || [];

    const archivosHtml = (bitacora.archivos && bitacora.archivos.length > 0)
      ? `
        <div style="margin-top: 15px; padding-top: 12px; border-top: 1px solid #e5e7eb;">
          <p style="font-weight: 600; font-size: 13px; color: #1f2937; margin-bottom: 6px;">
            <i class="fas fa-paperclip" style="color: #3ca203; margin-right: 6px;"></i>
            Archivos adjuntos (${bitacora.archivos.length})
          </p>
          ${bitacora.archivos.map((a, idx) => `
            <div onclick="window.previsualizarArchivoVer(${idx})" style="background: #f8fafc; padding: 6px 10px; border-radius: 4px; border: 1px solid #e5e7eb; margin-bottom: 4px; font-size: 13px; cursor: pointer; display: flex; align-items: center; justify-content: space-between;">
              <span><i class="fas fa-file-pdf" style="color: #dc2626; margin-right: 6px;"></i>${getNombreArchivo(a)}</span>
              <span style="color: #0ea5e9; font-size: 11px;"><i class="fas fa-eye"></i> Ver</span>
            </div>
          `).join('')}
        </div>
      `
      : '';

    Swal.fire({
      title: `📋 ${bitacora.descripcion}`,
      html: `
        <div style="text-align: left; padding: 10px 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #e5e7eb;">
            <p style="margin: 0; font-size: 14px; color: #6b7280;">
              <i class="fas fa-user" style="color: #3ca203; margin-right: 6px;"></i>
              <strong>Aprendiz:</strong> ${aprendiz.nombre}
            </p>
            <span style="background: #e6f7ed; color: #047857; padding: 4px 12px; border-radius: 15px; font-size: 12px; font-weight: 500;">
              <i class="fas fa-check-circle"></i> Seguimiento
            </span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 15px;">
            <div>
              <p style="margin: 0; font-size: 13px; color: #6b7280;"><strong>Fecha:</strong></p>
              <p style="margin: 4px 0 0 0; font-size: 14px; color: #1f2937;">${bitacora.fecha}</p>
            </div>
            <div>
              <p style="margin: 0; font-size: 13px; color: #6b7280;"><strong>Instructor:</strong></p>
              <p style="margin: 4px 0 0 0; font-size: 14px; color: #1f2937;">${bitacora.instructor || 'Carlos Andrés López'}</p>
            </div>
          </div>
          ${bitacora.aprendizObservacion ? `
            <div style="margin-bottom: 12px;">
              <p style="margin: 0; font-size: 13px; color: #6b7280;"><strong>Bitácora del Aprendiz:</strong></p>
              <div style="background: #e8f5e9; padding: 10px 14px; border-radius: 8px; margin-top: 4px; border-left: 3px solid #43a047;">
                <p style="margin: 0; font-size: 14px; color: #1f2937;">${bitacora.aprendizObservacion}</p>
              </div>
            </div>
          ` : ''}
          ${observacion ? `
            <div>
              <p style="margin: 0; font-size: 13px; color: #6b7280;"><strong>Observación del Instructor:</strong></p>
              <div style="background: #fefce8; padding: 10px 14px; border-radius: 8px; margin-top: 4px; border-left: 3px solid #f59e0b;">
                <p style="margin: 0; font-size: 14px; color: #1f2937;">${observacion}</p>
              </div>
            </div>
          ` : ''}
          ${archivosHtml}
        </div>
      `,
      icon: 'info',
      confirmButtonText: '✅ Aceptar',
      confirmButtonColor: '#3ca203',
      width: '550px',
      didOpen: () => {
        window.previsualizarArchivoVer = (idx) => {
          const archivo = window.archivosVerData[idx];
          if (archivo) {
            handlePrevisualizarArchivo(archivo);
          }
        };
      }
    });
  };

  // ✅ Descargar archivo (simulado, ya que son datos de ejemplo sin storage real)
  const handleDescargarArchivo = (nombre) => {
    Swal.fire({
      title: '📥 Descargando archivo',
      text: `El archivo "${nombre}" se está descargando.`,
      icon: 'info',
      iconColor: '#3ca203',
      confirmButtonColor: '#3ca203',
      confirmButtonText: 'Aceptar',
      timer: 2000,
      timerProgressBar: true
    });

    const link = document.createElement('a');
    link.download = nombre;
    link.href = '#';
    link.click();
  };

  // ✅ Vista previa de un archivo (PDF o imagen). Como no hay archivos reales
  // conectados a un storage, se muestra una vista previa simulada con los
  // datos del archivo (nombre, tipo, tamaño).
  const handlePrevisualizarArchivo = (archivo) => {
    const nombre = getNombreArchivo(archivo);
    const tipo = typeof archivo === 'object' && archivo.tipo ? archivo.tipo : 'application/pdf';
    const tamaño = typeof archivo === 'object' && archivo.tamaño ? archivo.tamaño : '—';
    const esImagen = tipo.includes('image');

    Swal.fire({
      title: `👀 ${nombre}`,
      html: `
        <div style="text-align: left; padding: 5px 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #e5e7eb;">
            <p style="margin: 0; font-size: 13px; color: #6b7280;">
              <strong>Tamaño:</strong> ${tamaño}
            </p>
            <span style="background: #fee2e2; color: #dc2626; padding: 4px 12px; border-radius: 15px; font-size: 12px; font-weight: 500;">
              <i class="fas ${esImagen ? 'fa-file-image' : 'fa-file-pdf'}"></i> ${tipo.split('/').pop()}
            </span>
          </div>
          <div style="text-align: center; padding: 30px 20px; background: #f3f4f6; border-radius: 8px; border: 2px dashed #d1d5db;">
            <i class="fas ${esImagen ? 'fa-file-image' : 'fa-file-pdf'}" style="font-size: 64px; color: #dc2626; display: block; margin-bottom: 10px;"></i>
            <p style="font-size: 14px; color: #6b7280;">Vista previa de ${esImagen ? 'imagen' : 'documento'}</p>
            <div style="margin-top: 15px; background: white; min-height: 150px; border-radius: 8px; border: 1px solid #e5e7eb; display: flex; align-items: center; justify-content: center;">
              <p style="color: #9ca3af; font-style: italic; margin: 0;">Contenido de ${nombre}</p>
            </div>
          </div>
        </div>
      `,
      icon: 'info',
      iconColor: '#3ca203',
      width: '500px',
      showCancelButton: true,
      confirmButtonText: '<i class="fas fa-download"></i> Descargar',
      confirmButtonColor: '#3ca203',
      cancelButtonText: '<i class="fas fa-times"></i> Cerrar',
      cancelButtonColor: '#dc2626',
      reverseButtons: false
    }).then((result) => {
      if (result.isConfirmed) {
        handleDescargarArchivo(nombre);
      }
    });
  };

  // ✅ OBSERVACIÓN: permite al instructor escribir/agregar una observación a esa bitácora
  const handleObservacion = (bitacora) => {
    const observacionActual = getObservacion(bitacora);

    Swal.fire({
      title: '📝 Observación de la Bitácora',
      html: `
        <div style="text-align: left; padding: 10px 0;">
          <div style="margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #e5e7eb;">
            <p style="margin: 4px 0; font-size: 14px; color: #6b7280;"><strong>Aprendiz:</strong> ${aprendiz.nombre}</p>
            <p style="margin: 4px 0; font-size: 14px; color: #6b7280;"><strong>Fecha:</strong> ${bitacora.fecha}</p>
            ${bitacora.aprendizObservacion ? `
              <div style="margin-top: 10px; background: #e8f5e9; padding: 10px 14px; border-radius: 8px; border-left: 3px solid #43a047;">
                <p style="margin: 0; font-size: 13px; color: #2e7d32;"><strong>Bitácora del aprendiz:</strong></p>
                <p style="margin: 5px 0 0 0; font-size: 14px; color: #1f2937;">${bitacora.aprendizObservacion}</p>
              </div>
            ` : ''}
            ${observacionActual ? `
              <div style="margin-top: 10px; background: #fefce8; padding: 10px 14px; border-radius: 8px; border-left: 3px solid #f59e0b;">
                <p style="margin: 0; font-size: 13px; color: #d97706;"><strong>Observación anterior:</strong></p>
                <p style="margin: 5px 0 0 0; font-size: 14px; color: #1f2937;">${observacionActual}</p>
              </div>
            ` : ''}
          </div>
          <div style="margin: 15px 0;">
            <label style="display: block; font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 5px;">
              Observación
            </label>
            <textarea id="observacion-bitacora"
              style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px; min-height: 100px; resize: vertical; box-sizing: border-box;"
              placeholder="Escribe aquí tu observación para el aprendiz..."
            >${observacionActual || ''}</textarea>
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
        const valor = document.getElementById('observacion-bitacora').value;
        if (!valor.trim()) {
          Swal.showValidationMessage('⚠️ Por favor ingresa una observación');
          return false;
        }
        return valor;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '✅ ¡Observación guardada!',
          text: 'La observación fue registrada para esta bitácora.',
          icon: 'success',
          confirmButtonColor: '#3ca203',
          timer: 2000,
          timerProgressBar: true
        });
      }
    });
  };

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      <Breadcrumb />

      <button
        onClick={goBack}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#3ca203',
          cursor: 'pointer',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '14px',
          fontWeight: '500'
        }}
      >
        <i className="fas fa-arrow-left" /> Volver a bitácoras
      </button>

      {/* ENCABEZADO */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '20px 24px',
        marginBottom: '25px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#e6f7ed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          color: '#3ca203',
          fontWeight: 'bold',
          border: '3px solid #3ca203'
        }}>
          {aprendiz.nombre.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
        </div>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', margin: 0 }}>
            {bimestreNombre} - {aprendiz.nombre}
          </h2>
          <p style={{ color: '#6b7280', margin: '4px 0 0 0' }}>
            <i className="fas fa-layer-group" style={{ marginRight: '6px' }} />
            Ficha {aprendiz.ficha} • {aprendiz.programa}
          </p>
          <p style={{ color: '#6b7280', margin: '2px 0 0 0' }}>
            <i className="fas fa-book" style={{ marginRight: '6px' }} />
            {bitacoras.length} bitácoras en este bimestre
          </p>
        </div>
      </div>

      {/* LISTA DE BITÁCORAS */}
      {bitacoras.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          background: 'white',
          borderRadius: '12px',
          border: '1px solid #e5e7eb'
        }}>
          <i className="fas fa-inbox" style={{ fontSize: '48px', color: '#9ca3af', marginBottom: '16px' }} />
          <h3 style={{ color: '#6b7280' }}>Sin bitácoras</h3>
          <p style={{ color: '#9ca3af' }}>No hay bitácoras registradas en este bimestre.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {bitacoras.map((bitacora, index) => {
            const observacion = getObservacion(bitacora);
            return (
              <div
                key={index}
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#3ca203';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                      <span style={{
                        background: '#e6f7ed',
                        color: '#047857',
                        padding: '2px 10px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: 'bold'
                      }}>
                        <i className="fas fa-calendar-alt" style={{ marginRight: '4px' }} />
                        {bitacora.fecha}
                      </span>
                      <span style={{
                        background: '#e0f2fe',
                        color: '#0ea5e9',
                        padding: '2px 10px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: 'bold'
                      }}>
                        <i className="fas fa-user" style={{ marginRight: '4px' }} />
                        {bitacora.instructor || 'Carlos Andrés López'}
                      </span>
                    </div>

                    <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#1f2937' }}>
                      {bitacora.descripcion}
                    </h4>

                    {bitacora.aprendizObservacion && (
                      <div style={{
                        background: '#e8f5e9',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        marginBottom: '10px',
                        borderLeft: '3px solid #43a047'
                      }}>
                        <p style={{ margin: 0, fontSize: '13px', color: '#1f2937' }}>
                          <i className="fas fa-user-graduate" style={{ color: '#43a047', marginRight: '6px' }} />
                          <strong>Bitácora:</strong> {bitacora.aprendizObservacion}
                        </p>
                      </div>
                    )}

                    {observacion && (
                      <div style={{
                        background: '#fefce8',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        marginBottom: '10px',
                        borderLeft: '3px solid #f59e0b'
                      }}>
                        <p style={{ margin: 0, fontSize: '13px', color: '#1f2937' }}>
                          <i className="fas fa-comment" style={{ color: '#f59e0b', marginRight: '6px' }} />
                          <strong>Observación:</strong> {observacion}
                        </p>
                      </div>
                    )}

                    {bitacora.archivos && bitacora.archivos.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                        <span style={{ fontSize: '12px', color: '#6b7280', marginRight: '4px' }}>
                          <i className="fas fa-paperclip" style={{ color: '#dc2626' }} />
                        </span>
                        {bitacora.archivos.map((archivo, idx) => (
                          <span
                            key={idx}
                            style={{
                              background: '#fef2f2',
                              color: '#dc2626',
                              padding: '2px 10px',
                              borderRadius: '12px',
                              fontSize: '11px',
                              border: '1px solid #fecaca',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <i className="fas fa-file-pdf" style={{ fontSize: '10px' }} />
                            {getNombreArchivo(archivo)}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '6px', flexShrink: 0, marginLeft: '12px' }}>
                    <button
                      onClick={() => handleVer(bitacora)}
                      style={{
                        background: '#e6f7ed',
                        color: '#047857',
                        border: 'none',
                        padding: '4px 12px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#d1fae5'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#e6f7ed'}
                    >
                      <i className="fas fa-eye" /> Ver
                    </button>
                    <button
                      onClick={() => handleObservacion(bitacora)}
                      style={{
                        background: '#fef3c7',
                        color: '#d97706',
                        border: 'none',
                        padding: '4px 12px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#fde68a'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#fef3c7'}
                    >
                      <i className="fas fa-pen" /> Observación
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BitacorasPorBimestre;
