// src/pages/coordinador/ReporteFichaBitacoras.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../shared/components/Breadcrumb';
import Swal from 'sweetalert2';

// ✅ Importar datos de bitácoras con archivos
import { bitacorasData } from '../../../data/bitacorasData';

const ReporteFichaBitacoras = () => {
  const navigate = useNavigate();
  const { idFicha } = useParams();

  // ✅ Obtener la ficha de los datos importados
  const ficha = bitacorasData[idFicha];

  if (!ficha) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h3 style={{ color: '#dc2626' }}>Ficha no encontrada</h3>
        <button onClick={() => navigate('/coordinador/reporte-bitacoras')}>
          Volver a fichas
        </button>
      </div>
    );
  }

  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [bimestreSeleccionado, setBimestreSeleccionado] = useState(1);

  const handleSearch = () => setSearchQuery(searchTerm);
  const handleClear = () => { setSearchTerm(''); setSearchQuery(''); };

  // ✅ FUNCIÓN PARA FILTRAR SOLO ARCHIVOS PDF
  const filtrarPDFs = (archivos) => {
    if (!archivos) return [];
    return archivos.filter(a => a.tipo && a.tipo.includes('pdf'));
  };

  // ✅ FUNCIÓN PARA OBTENER ICONO SEGÚN TIPO DE ARCHIVO
  const getIconoArchivo = (tipo) => {
    if (tipo && tipo.includes('pdf')) return 'fa-file-pdf';
    if (tipo && (tipo.includes('image') || tipo.includes('jpg') || tipo.includes('png') || tipo.includes('jpeg'))) return 'fa-file-image';
    if (tipo && (tipo.includes('word') || tipo.includes('document') || tipo.includes('doc'))) return 'fa-file-word';
    if (tipo && (tipo.includes('excel') || tipo.includes('sheet') || tipo.includes('xls'))) return 'fa-file-excel';
    if (tipo && (tipo.includes('powerpoint') || tipo.includes('ppt'))) return 'fa-file-powerpoint';
    return 'fa-file';
  };

  // ✅ FUNCIÓN PARA OBTENER COLOR SEGÚN TIPO DE ARCHIVO
  const getColorArchivo = (tipo) => {
    if (tipo && tipo.includes('pdf')) return '#dc2626';
    if (tipo && (tipo.includes('image') || tipo.includes('jpg') || tipo.includes('png'))) return '#8b5cf6';
    if (tipo && (tipo.includes('word') || tipo.includes('doc'))) return '#2563eb';
    if (tipo && (tipo.includes('excel') || tipo.includes('xls'))) return '#16a34a';
    if (tipo && (tipo.includes('powerpoint') || tipo.includes('ppt'))) return '#ea580c';
    return '#6b7280';
  };

  // ✅ FUNCIÓN PARA PREVISUALIZAR PDF
  const handlePrevisualizarPDF = (archivo) => {
    Swal.fire({
      title: `📄 ${archivo.nombre}`,
      html: `
        <div style="text-align: left; padding: 5px 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #e5e7eb;">
            <div>
              <p style="margin: 0; font-size: 13px; color: #6b7280;">
                <i class="fas fa-file-pdf" style="color: #dc2626; margin-right: 6px;"></i>
                <strong>Nombre:</strong> ${archivo.nombre}
              </p>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #9ca3af;">
                <strong>Tamaño:</strong> ${archivo.tamaño} • <strong>Tipo:</strong> PDF
              </p>
            </div>
            <span style="background: #dc262620; color: #dc2626; padding: 4px 12px; border-radius: 15px; font-size: 12px; font-weight: 500; border: 1px solid #dc262640;">
              <i class="fas fa-file-pdf"></i> PDF
            </span>
          </div>
          <div style="text-align: center; padding: 20px; background: #f3f4f6; border-radius: 8px; border: 2px dashed #d1d5db;">
            <i class="fas fa-file-pdf" style="font-size: 64px; color: #dc2626; display: block; margin-bottom: 10px;"></i>
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
          <div style="margin-top: 15px; padding-top: 12px; border-top: 1px solid #e5e7eb; display: flex; gap: 10px; justify-content: center;">
            <button onclick="window.descargarPDFPreview(${archivo.id})" style="background: #3ca203; color: white; border: none; padding: 8px 20px; border-radius: 6px; cursor: pointer; font-weight: bold;">
              <i class="fas fa-download"></i> Descargar
            </button>
            <button onclick="window.cerrarPreviewPDF()" style="background: #e5e7eb; border: none; padding: 8px 20px; border-radius: 6px; cursor: pointer; font-weight: 500;">
              <i class="fas fa-times"></i> Cerrar
            </button>
          </div>
        </div>
      `,
      icon: 'info',
      iconColor: '#dc2626',
      confirmButtonColor: '#3ca203',
      confirmButtonText: 'Cerrar',
      width: '550px',
      padding: '25px 30px',
      background: '#ffffff',
      color: '#1f2937',
      showCancelButton: false,
      didOpen: () => {
        window.descargarPDFPreview = (id) => {
          const archivo = window.archivosPreviewData?.find(a => a.id === id);
          if (archivo) {
            handleDescargarArchivo(archivo);
          }
        };
        window.cerrarPreviewPDF = () => {
          Swal.close();
        };
      }
    });
  };

  // ✅ FUNCIÓN PARA PREVISUALIZAR ARCHIVO (mantener la original para otros tipos)
  const handlePrevisualizarArchivo = (archivo) => {
    // Si es PDF, usar la función específica
    if (archivo.tipo && archivo.tipo.includes('pdf')) {
      handlePrevisualizarPDF(archivo);
      return;
    }

    const icono = getIconoArchivo(archivo.tipo);
    const color = getColorArchivo(archivo.tipo);
    const esImagen = archivo.tipo && (archivo.tipo.includes('image') || archivo.tipo.includes('jpg') || archivo.tipo.includes('png') || archivo.tipo.includes('jpeg'));
    const esPDF = archivo.tipo && archivo.tipo.includes('pdf');

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
              <i class="fas ${icono}"></i> ${archivo.tipo ? archivo.tipo.split('/').pop() : 'Archivo'}
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

  // ✅ FUNCIÓN PARA DESCARGAR ARCHIVO
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

  // ✅ FUNCIÓN PARA VER DETALLE DE BITÁCORA CON ARCHIVOS Y PREVISUALIZACIÓN
  const handleVerDetalleBitacora = (bitacora, aprendiz) => {
    const archivos = bitacora.archivos || [];
    window.archivosPreviewData = archivos;
    
    // Filtrar solo PDFs para mostrar
    const archivosPDF = filtrarPDFs(archivos);
    
    const archivosHtml = archivosPDF.length > 0 
      ? archivosPDF.map(a => `
        <div style="display: flex; justify-content: space-between; align-items: center; background: #f8fafc; padding: 8px 12px; border-radius: 6px; border: 1px solid #e5e7eb; margin-bottom: 6px;">
          <div style="display: flex; align-items: center; gap: 8px; cursor: pointer;" onclick="window.previsualizarArchivo(${a.id})">
            <i class="fas fa-file-pdf" style="color: #dc2626;"></i>
            <span style="font-size: 14px;">${a.nombre}</span>
            <span style="font-size: 11px; color: #9ca3af;">(${a.tamaño})</span>
          </div>
          <div style="display: flex; gap: 6px;">
            <button onclick="window.previsualizarArchivo(${a.id})" style="background: #e0f2fe; color: #0ea5e9; border: none; padding: 4px 10px; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: 500;">
              <i class="fas fa-eye"></i> Ver
            </button>
            <button onclick="window.descargarArchivoBitacora(${a.id})" style="background: #3ca203; color: white; border: none; padding: 4px 10px; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: 500;">
              <i class="fas fa-download"></i> Descargar
            </button>
          </div>
        </div>
      `).join('')
      : '<p style="color: #9ca3af; font-style: italic; font-size: 13px;"><i class="fas fa-paperclip" style="margin-right: 6px;"></i>Sin archivos PDF adjuntos</p>';

    Swal.fire({
      title: `📖 ${bitacora.titulo}`,
      html: `
        <div style="text-align: left; padding: 10px 0;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 15px;">
            <div><strong>Aprendiz:</strong></div>
            <div>${aprendiz.nombre}</div>
            <div><strong>Fecha:</strong></div>
            <div>${bitacora.fecha}</div>
            <div><strong>Bimestre:</strong></div>
            <div>${bitacora.bimestre}</div>
          </div>
          <hr style="border: 1px solid #e5e7eb; margin: 10px 0;" />
          <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb; margin-bottom: 15px;">
            <p style="margin: 0; font-size: 15px; color: #1f2937; line-height: 1.6;">
              ${bitacora.contenido}
            </p>
          </div>
          <div>
            <p style="font-weight: 600; font-size: 14px; color: #1f2937; margin-bottom: 8px;">
              <i class="fas fa-paperclip" style="color: #dc2626; margin-right: 6px;"></i>
              Archivos PDF adjuntos (${archivosPDF.length})
            </p>
            ${archivosHtml}
          </div>
        </div>
      `,
      icon: 'info',
      iconColor: '#dc2626',
      confirmButtonColor: '#3ca203',
      confirmButtonText: 'Cerrar',
      width: '550px',
      padding: '25px 30px',
      background: '#ffffff',
      color: '#1f2937',
      didOpen: () => {
        window.descargarArchivoBitacora = (id) => {
          const archivo = archivosPDF.find(a => a.id === id);
          if (archivo) {
            handleDescargarArchivo(archivo);
          }
        };
        window.previsualizarArchivo = (id) => {
          const archivo = archivosPDF.find(a => a.id === id);
          if (archivo) {
            handlePrevisualizarArchivo(archivo);
          }
        };
      }
    });
  };

  // Ver todas las bitácoras del aprendiz en el bimestre seleccionado
  const handleVerBitacorasAprendiz = (aprendiz) => {
    const bitacorasBimestre = aprendiz.bitacoras.filter(b => b.bimestre === bimestreSeleccionado);
    
    if (bitacorasBimestre.length === 0) {
      Swal.fire({
        title: '📖 Sin bitácoras',
        text: `${aprendiz.nombre} no tiene bitácoras en el Bimestre ${bimestreSeleccionado}.`,
        icon: 'info',
        iconColor: '#3ca203',
        confirmButtonColor: '#3ca203',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    const bitacorasHtml = bitacorasBimestre.map((b) => {
      const archivos = filtrarPDFs(b.archivos);
      const tieneArchivos = archivos.length > 0;
      
      return `
      <div 
        onclick="window.verDetalleBitacora(${b.id})" 
        style="
          background: #f8fafc;
          padding: 12px 15px;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          margin-bottom: 10px;
          cursor: pointer;
          transition: all 0.2s;
        "
        onmouseenter="this.style.borderColor='#3ca203'"
        onmouseleave="this.style.borderColor='#e5e7eb'"
      >
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <p style="margin: 0; font-weight: 500; font-size: 14px; color: #1f2937;">
              ${b.titulo}
            </p>
            <p style="margin: 3px 0 0 0; font-size: 12px; color: #6b7280;">
              <i class="fas fa-calendar-alt" style="margin-right: 4px;"></i>
              ${b.fecha}
            </p>
            ${tieneArchivos ? `
              <div style="margin-top: 4px; display: flex; gap: 4px; flex-wrap: wrap;">
                ${archivos.map(a => `
                  <span style="background: #fecaca; padding: 1px 8px; border-radius: 10px; font-size: 10px; color: #dc2626; display: inline-flex; align-items: center; gap: 3px;">
                    <i class="fas fa-file-pdf" style="font-size: 8px;"></i>
                    ${a.nombre}
                  </span>
                `).join('')}
              </div>
            ` : ''}
          </div>
          <div style="color: #3ca203; font-size: 12px;">
            <i class="fas fa-eye"></i> Ver
          </div>
        </div>
      </div>
    `}).join('');

    window.bitacorasGlobales = bitacorasBimestre;
    window.aprendizGlobal = aprendiz;

    Swal.fire({
      title: `📖 ${aprendiz.nombre} - Bimestre ${bimestreSeleccionado}`,
      html: `
        <div style="text-align: left; padding: 5px 0; max-height: 400px; overflow-y: auto;">
          <p style="color: #6b7280; font-size: 13px; margin-bottom: 12px;">
            ${bitacorasBimestre.length} bitácoras encontradas
          </p>
          ${bitacorasHtml}
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
      showCancelButton: true,
      cancelButtonColor: '#6b7280',
      cancelButtonText: 'Cerrar',
      didOpen: () => {
        window.verDetalleBitacora = (id) => {
          const bitacora = window.bitacorasGlobales.find(b => b.id === id);
          if (bitacora) {
            handleVerDetalleBitacora(bitacora, window.aprendizGlobal);
          }
        };
      }
    });
  };

  // Filtrar aprendices por búsqueda
  const filteredAprendices = ficha.aprendices.filter(a =>
    a.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Verificar si un aprendiz tiene bitácoras en un bimestre
  const tieneBitacorasEnBimestre = (aprendiz, bimestre) => {
    return aprendiz.bitacoras.some(b => b.bimestre === bimestre);
  };

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      <Breadcrumb />

      <button
        onClick={() => navigate('/coordinador/reporte-bitacoras')}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#3ca203',
          cursor: 'pointer',
          marginBottom: '15px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '14px',
          fontWeight: '500'
        }}
      >
        <i className="fas fa-arrow-left" /> Volver a fichas
      </button>

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
          Ficha {ficha.id} - {ficha.programa}
        </h2>
        <p style={{ color: '#6b7280', margin: '5px 0 0 0' }}>
          Instructor: {ficha.instructor} • {ficha.aprendices.length} aprendices
        </p>
      </div>

      {/* FILTROS DE BIMESTRE */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {[1, 2, 3].map((bim) => {
          const total = ficha.aprendices.reduce((acc, a) => 
            acc + a.bitacoras.filter(b => b.bimestre === bim).length, 0
          );

          return (
            <button
              key={bim}
              onClick={() => setBimestreSeleccionado(bim)}
              style={{
                padding: '8px 20px',
                background: bimestreSeleccionado === bim ? '#3ca203' : '#f8fafc',
                color: bimestreSeleccionado === bim ? 'white' : '#1f2937',
                border: `1px solid ${bimestreSeleccionado === bim ? '#3ca203' : '#e5e7eb'}`,
                borderRadius: '20px',
                cursor: total > 0 ? 'pointer' : 'default',
                fontWeight: 'bold',
                fontSize: '14px',
                opacity: total > 0 ? 1 : 0.5,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
              disabled={total === 0}
            >
              <span>Bimestre {bim}</span>
              {total > 0 && (
                <span style={{
                  background: bimestreSeleccionado === bim ? 'rgba(255,255,255,0.2)' : '#e6f7ed',
                  color: bimestreSeleccionado === bim ? 'white' : '#047857',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  fontSize: '11px',
                  fontWeight: 'bold'
                }}>
                  {total}
                </span>
              )}
              {total === 0 && (
                <span style={{ fontSize: '11px', color: '#9ca3af' }}>
                  (sin bitácoras)
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* BUSCADOR */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar por aprendiz..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1, padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
        />
        <button onClick={handleSearch} style={{ background: '#3ca203', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}>Buscar</button>
        <button onClick={handleClear} style={{ background: '#e5e7eb', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}>Limpiar</button>
      </div>

      {/* APRENDICES FILTRADOS */}
      {filteredAprendices.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h3 style={{ color: '#dc2626' }}>Dato no encontrado</h3>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          {filteredAprendices.map(a => {
            const bitacorasBimestre = a.bitacoras.filter(b => b.bimestre === bimestreSeleccionado);
            const totalBitacoras = bitacorasBimestre.length;

            return (
              <div
                key={a.id}
                onClick={() => handleVerBitacorasAprendiz(a)}
                style={{
                  background: 'white',
                  padding: '18px 20px',
                  borderRadius: '12px',
                  border: totalBitacoras > 0 ? '2px solid #e5e7eb' : '2px solid #f3f4f6',
                  cursor: totalBitacoras > 0 ? 'pointer' : 'default',
                  transition: 'all 0.2s',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  opacity: totalBitacoras > 0 ? 1 : 0.6
                }}
                onMouseEnter={(e) => {
                  if (totalBitacoras > 0) {
                    e.currentTarget.style.borderColor = '#3ca203';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (totalBitacoras > 0) {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                <div>
                  <p style={{ margin: 0, fontWeight: 'bold', fontSize: '15px, color: #1f2937' }}>
                    {a.nombre}
                  </p>
                  <p style={{ margin: '3px 0 0 0', fontSize: '12px', color: '#6b7280' }}>
                    {totalBitacoras > 0 
                      ? `${totalBitacoras} bitácoras en Bimestre ${bimestreSeleccionado}`
                      : `Sin bitácoras en Bimestre ${bimestreSeleccionado}`
                    }
                  </p>
                </div>
                <div>
                  {totalBitacoras > 0 ? (
                    <span style={{
                      background: '#e6f7ed',
                      color: '#047857',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <i className="fas fa-eye" /> Ver
                    </span>
                  ) : (
                    <span style={{
                      color: '#9ca3af',
                      fontSize: '11px',
                      fontStyle: 'italic'
                    }}>
                      Sin bitácoras
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ReporteFichaBitacoras;