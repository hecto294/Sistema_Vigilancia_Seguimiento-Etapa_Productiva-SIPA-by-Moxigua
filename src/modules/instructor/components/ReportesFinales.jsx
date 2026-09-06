// src/modules/instructor/components/ReportesFinales.jsx
import React, { useState, useRef } from 'react';
import Swal from 'sweetalert2';

const ReportesFinales = () => {
  const fileInputRef = useRef(null);
  const [aprendizActivo, setAprendizActivo] = useState(null); // aprendiz sobre el que se está subiendo un archivo
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // ✅ Aprendices que ya terminaron su etapa productiva (finalizados)
  const [aprendices, setAprendices] = useState([
    {
      id: 1,
      nombre: 'Laura Sofia Martinez',
      documento: '1001234567',
      ficha: '2875901',
      programa: 'Análisis y Desarrollo de Software',
      alternativa: 'Contrato de Aprendizaje',
      empresa: 'TechSoft S.A.S.',
      fechaFinalizacion: '30/08/2025',
      reporteFinal: {
        nombre: 'Reporte_Final_Laura_Martinez.pdf',
        tipo: 'application/pdf',
        tamaño: '2.1 MB',
        fechaSubida: '02/09/2025'
      }
    },
    {
      id: 2,
      nombre: 'Juan Diego Ramirez',
      documento: '1002345678',
      ficha: '2875901',
      programa: 'Análisis y Desarrollo de Software',
      alternativa: 'Vínculo Formativo (Pasantía)',
      empresa: 'Innovar Solutions',
      fechaFinalizacion: '15/08/2025',
      reporteFinal: null
    },
    {
      id: 3,
      nombre: 'Andrés Felipe Castro',
      documento: '1003456789',
      ficha: '2875902',
      programa: 'Gestión Empresarial',
      alternativa: 'Contrato de Aprendizaje',
      empresa: 'Soluciones Web SAS',
      fechaFinalizacion: '20/08/2025',
      reporteFinal: null
    }
  ]);

  const handleSearch = () => setSearchQuery(searchTerm);
  const handleClear = () => { setSearchTerm(''); setSearchQuery(''); };

  const getIniciales = (nombre) => {
    return nombre
      .split(' ')
      .map(palabra => palabra[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // ✅ Click en "Subir reporte": abrimos el input de archivo oculto
  const handleClickSubir = (aprendiz) => {
    setAprendizActivo(aprendiz);
    fileInputRef.current.click();
  };

  // ✅ Cuando el instructor selecciona un archivo desde el explorador
  const handleArchivoSeleccionado = (e) => {
    const file = e.target.files[0];
    e.target.value = ''; // permite volver a seleccionar el mismo archivo después
    if (!file || !aprendizActivo) return;

    const tamañoMB = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
    const hoy = new Date();
    const fechaHoy = `${String(hoy.getDate()).padStart(2, '0')}/${String(hoy.getMonth() + 1).padStart(2, '0')}/${hoy.getFullYear()}`;

    Swal.fire({
      title: '📤 Confirmar subida',
      html: `
        <div style="text-align: left; padding: 10px 0;">
          <p style="margin: 4px 0; font-size: 14px; color: #6b7280;">
            <strong>Aprendiz:</strong> ${aprendizActivo.nombre}
          </p>
          <p style="margin: 4px 0; font-size: 14px; color: #6b7280;">
            <strong>Archivo:</strong> ${file.name}
          </p>
          <p style="margin: 4px 0; font-size: 14px; color: #6b7280;">
            <strong>Tamaño:</strong> ${tamañoMB}
          </p>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '✅ Subir reporte',
      confirmButtonColor: '#3ca203',
      cancelButtonText: '❌ Cancelar',
      cancelButtonColor: '#ef4444'
    }).then((result) => {
      if (result.isConfirmed) {
        setAprendices(prev => prev.map(a =>
          a.id === aprendizActivo.id
            ? {
                ...a,
                reporteFinal: {
                  nombre: file.name,
                  tipo: file.type || 'application/pdf',
                  tamaño: tamañoMB,
                  fechaSubida: fechaHoy
                }
              }
            : a
        ));

        Swal.fire({
          title: '✅ ¡Reporte final subido!',
          text: `El reporte de ${aprendizActivo.nombre} fue registrado correctamente.`,
          icon: 'success',
          confirmButtonColor: '#3ca203',
          timer: 2500,
          timerProgressBar: true
        });
      }
      setAprendizActivo(null);
    });
  };

  // ✅ Ver / previsualizar el reporte ya subido
  const handleVerReporte = (aprendiz) => {
    const reporte = aprendiz.reporteFinal;
    if (!reporte) return;
    const esImagen = reporte.tipo.includes('image');

    Swal.fire({
      title: `👀 ${reporte.nombre}`,
      html: `
        <div style="text-align: left; padding: 5px 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #e5e7eb;">
            <p style="margin: 0; font-size: 13px; color: #6b7280;">
              <strong>Aprendiz:</strong> ${aprendiz.nombre}<br/>
              <strong>Subido:</strong> ${reporte.fechaSubida} • <strong>Tamaño:</strong> ${reporte.tamaño}
            </p>
          </div>
          <div style="text-align: center; padding: 30px 20px; background: #f3f4f6; border-radius: 8px; border: 2px dashed #d1d5db;">
            <i class="fas ${esImagen ? 'fa-file-image' : 'fa-file-pdf'}" style="font-size: 64px; color: #dc2626; display: block; margin-bottom: 10px;"></i>
            <p style="font-size: 14px; color: #6b7280;">Vista previa del reporte final</p>
            <div style="margin-top: 15px; background: white; min-height: 150px; border-radius: 8px; border: 1px solid #e5e7eb; display: flex; align-items: center; justify-content: center;">
              <p style="color: #9ca3af; font-style: italic; margin: 0;">Contenido de ${reporte.nombre}</p>
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
      cancelButtonColor: '#dc2626'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '📥 Descargando archivo',
          text: `El archivo "${reporte.nombre}" se está descargando.`,
          icon: 'info',
          iconColor: '#3ca203',
          confirmButtonColor: '#3ca203',
          timer: 2000,
          timerProgressBar: true
        });
      }
    });
  };

  const filteredAprendices = aprendices.filter(a =>
    searchQuery === '' ||
    a.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.ficha.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      {/* input oculto para seleccionar el archivo del reporte */}
      <input
        type="file"
        ref={fileInputRef}
        accept=".pdf,.doc,.docx"
        style={{ display: 'none' }}
        onChange={handleArchivoSeleccionado}
      />

      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '24px 30px',
        marginBottom: '25px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
          <i className="fas fa-file-signature" style={{ color: '#3ca203', marginRight: '10px' }} />
          Reportes Finales
        </h2>
        <p style={{ color: '#6b7280', margin: '6px 0 0 0' }}>
          Aprendices que finalizaron su etapa productiva. Sube o consulta el reporte final de cada uno.
        </p>
      </div>

      {/* Búsqueda */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar aprendiz por nombre o ficha..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          style={{
            flex: 1,
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            fontSize: '14px'
          }}
        />
        <button
          onClick={handleSearch}
          style={{ background: '#3ca203', color: 'white', border: 'none', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: 500 }}
        >
          <i className="fas fa-search" /> Buscar
        </button>
        <button
          onClick={handleClear}
          style={{ background: '#e5e7eb', color: '#374151', border: 'none', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: 500 }}
        >
          <i className="fas fa-times" /> Limpiar
        </button>
      </div>

      {/* Lista de aprendices finalizados */}
      {filteredAprendices.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          background: 'white',
          borderRadius: '12px',
          border: '1px solid #e5e7eb'
        }}>
          <i className="fas fa-exclamation-circle" style={{ fontSize: '48px', color: '#9ca3af', marginBottom: '16px' }} />
          <h3 style={{ color: '#6b7280' }}>Sin resultados</h3>
          <p style={{ color: '#9ca3af' }}>No se encontraron aprendices con ese criterio.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredAprendices.map((aprendiz) => {
            const tieneReporte = !!aprendiz.reporteFinal;
            return (
              <div
                key={aprendiz.id}
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '20px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    background: '#e6f7ed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    color: '#3ca203',
                    border: '2px solid #3ca203',
                    flexShrink: 0
                  }}>
                    {getIniciales(aprendiz.nombre)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#1f2937' }}>
                      {aprendiz.nombre}
                    </div>
                    <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '2px' }}>
                      Ficha {aprendiz.ficha} • {aprendiz.programa}
                    </div>
                    <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>
                      <i className="fas fa-flag-checkered" style={{ marginRight: '4px' }} />
                      Finalizó etapa productiva: {aprendiz.fechaFinalizacion}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    background: tieneReporte ? '#e6f7ed' : '#fef3c7',
                    color: tieneReporte ? '#047857' : '#d97706',
                    padding: '4px 12px',
                    borderRadius: '15px',
                    fontSize: '12px',
                    fontWeight: 600
                  }}>
                    <i className={`fas ${tieneReporte ? 'fa-check-circle' : 'fa-clock'}`} style={{ marginRight: '5px' }} />
                    {tieneReporte ? 'Reporte subido' : 'Reporte pendiente'}
                  </span>

                  {tieneReporte ? (
                    <button
                      onClick={() => handleVerReporte(aprendiz)}
                      style={{
                        background: '#e0f2fe',
                        color: '#0ea5e9',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: 500
                      }}
                    >
                      <i className="fas fa-eye" /> Ver reporte
                    </button>
                  ) : (
                    <button
                      onClick={() => handleClickSubir(aprendiz)}
                      style={{
                        background: '#3ca203',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: 500
                      }}
                    >
                      <i className="fas fa-upload" /> Subir reporte
                    </button>
                  )}

                  {tieneReporte && (
                    <button
                      onClick={() => handleClickSubir(aprendiz)}
                      title="Reemplazar reporte"
                      style={{
                        background: '#fef3c7',
                        color: '#d97706',
                        border: 'none',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: 500
                      }}
                    >
                      <i className="fas fa-sync-alt" />
                    </button>
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

export default ReportesFinales;
