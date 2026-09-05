// src/modules/aprendiz/pages/Novedades.jsx
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Novedades = () => {
  const [novedades, setNovedades] = useState([
    {
      id: 1,
      titulo: 'Incapacidad médica',
      descripcion: 'Presento incapacidad médica del 12 al 15 de septiembre. Adjunto certificado.',
      fecha: '10/09/2026',
      tipo: 'Incapacidad médica', // ⬅️ NUEVO CAMPO
      estado: 'Pendiente',
      archivo: 'incapacidad.pdf'
    },
    {
      id: 2,
      titulo: 'Cambio de horario en la empresa',
      descripcion: 'La empresa solicita cambio de horario de 8:00 am a 10:00 am.',
      fecha: '05/09/2026',
      tipo: 'Cambio de horario', // ⬅️ NUEVO CAMPO
      estado: 'Aprobada',
      archivo: 'cambio_horario.pdf'
    }
  ]);

  const handleNuevaNovedad = () => {
    Swal.fire({
      title: '📢 Reportar Novedad',
      html: `
        <div style="text-align: left; padding: 10px 0;">
          <div style="margin-bottom: 15px;">
            <label style="display: block; font-weight: 600; margin-bottom: 5px; color: #1f2937; font-size: 14px;">
              <i class="fas fa-tags" style="color: #3ca203; margin-right: 8px;"></i> Tipo de Novedad *
            </label>
            <select id="tipoNovedad" class="swal2-select" style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px;">
              <option value="Incapacidad médica">Incapacidad médica</option>
              <option value="Excusa médica">Excusa médica</option>
              <option value="Falta justificada">Falta justificada</option>
              <option value="Cambio de horario">Cambio de horario</option>
              <option value="No puedo continuar">No puedo continuar</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; font-weight: 600; margin-bottom: 5px; color: #1f2937; font-size: 14px;">
              <i class="fas fa-heading" style="color: #3ca203; margin-right: 8px;"></i> Título de la novedad *
            </label>
            <input id="tituloNovedad" class="swal2-input" placeholder="Ej: Incapacidad médica" style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px;">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; font-weight: 600; margin-bottom: 5px; color: #1f2937; font-size: 14px;">
              <i class="fas fa-align-left" style="color: #3ca203; margin-right: 8px;"></i> Justificación / Descripción *
            </label>
            <textarea id="descripcionNovedad" class="swal2-textarea" placeholder="Describe el motivo de tu novedad..." style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px; min-height: 100px;"></textarea>
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; font-weight: 600; margin-bottom: 5px; color: #1f2937; font-size: 14px;">
              <i class="fas fa-paperclip" style="color: #3ca203; margin-right: 8px;"></i> Adjuntar evidencia (opcional)
            </label>
            <input type="file" id="archivoNovedad" class="swal2-file" accept=".pdf,.jpg,.png" style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 6px;">
          </div>
        </div>
      `,
      confirmButtonText: '📢 Reportar',
      confirmButtonColor: '#3ca203',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#6b7280',
      showCancelButton: true,
      width: '520px',
      preConfirm: () => {
        const tipo = document.getElementById('tipoNovedad').value;
        const titulo = document.getElementById('tituloNovedad').value.trim();
        const descripcion = document.getElementById('descripcionNovedad').value.trim();
        const archivo = document.getElementById('archivoNovedad').files[0];

        if (!tipo) {
          Swal.showValidationMessage('⚠️ Por favor selecciona el tipo de novedad');
          return false;
        }
        if (!titulo) {
          Swal.showValidationMessage('⚠️ Por favor ingresa el título');
          return false;
        }
        if (!descripcion) {
          Swal.showValidationMessage('⚠️ Por favor ingresa la justificación');
          return false;
        }

        return { tipo, titulo, descripcion, archivo: archivo ? archivo.name : null };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const nuevaNovedad = {
          id: Date.now(),
          titulo: result.value.titulo,
          descripcion: result.value.descripcion,
          tipo: result.value.tipo,
          fecha: new Date().toLocaleDateString('es-ES'),
          estado: 'Pendiente',
          archivo: result.value.archivo
        };

        setNovedades([nuevaNovedad, ...novedades]);
        Swal.fire({
          title: '✅ Novedad reportada',
          text: 'Tu novedad ha sido enviada al coordinador.',
          icon: 'success',
          confirmButtonColor: '#3ca203',
          timer: 2000,
          timerProgressBar: true
        });
      }
    });
  };

  // ⬇️ FUNCIÓN PARA VER EL ARCHIVO (SIMULANDO UN PDF)
  const handleVerArchivo = (novedad) => {
    if (!novedad.archivo) {
      Swal.fire({
        title: '⚠️ Sin archivo adjunto',
        text: 'Esta novedad no tiene archivo adjunto.',
        icon: 'warning',
        confirmButtonColor: '#f59e0b'
      });
      return;
    }

    // Simular visualización del archivo (en el futuro será un PDF real)
    Swal.fire({
      title: `📄 ${novedad.archivo}`,
      html: `
        <div style="text-align: left; padding: 10px 0;">
          <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px; padding: 12px; background: #f0fdf4; border-radius: 8px; border: 1px solid #bbf7d0;">
            <i class="fas fa-file-pdf" style="font-size: 40px; color: #dc2626;"></i>
            <div>
              <p style="margin: 0; font-size: 14px; font-weight: 600; color: #1f2937;">${novedad.archivo}</p>
              <p style="margin: 2px 0 0 0; font-size: 12px; color: #6b7280;">
                <i class="fas fa-check-circle" style="color: #10b981;"></i> Cargado correctamente
              </p>
            </div>
          </div>
          <div style="margin-bottom: 10px;">
            <p style="margin: 0; font-size: 13px; color: #6b7280;">
              <strong>Tipo:</strong> ${novedad.tipo}
            </p>
            <p style="margin: 4px 0 0 0; font-size: 13px; color: #6b7280;">
              <strong>Novedad:</strong> ${novedad.titulo}
            </p>
            <p style="margin: 4px 0 0 0; font-size: 13px; color: #6b7280;">
              <strong>Fecha:</strong> ${novedad.fecha}
            </p>
            <p style="margin: 4px 0 0 0; font-size: 13px; color: #6b7280;">
              <strong>Estado:</strong> ${novedad.estado}
            </p>
          </div>
          <div style="margin-top: 15px; padding-top: 12px; border-top: 1px dashed #e5e7eb; text-align: center; font-size: 13px; color: #9ca3af;">
            <i class="fas fa-info-circle"></i> Haz clic en "Descargar" para obtener el archivo
          </div>
        </div>
      `,
      icon: 'info',
      confirmButtonText: '📥 Descargar archivo',
      confirmButtonColor: '#3ca203',
      showCancelButton: true,
      cancelButtonText: '❌ Cerrar',
      cancelButtonColor: '#6b7280',
      width: '500px'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '✅ Descarga iniciada',
          text: `El archivo "${novedad.archivo}" se está descargando.`,
          icon: 'success',
          confirmButtonColor: '#3ca203',
          timer: 2000,
          timerProgressBar: true
        });
      }
    });
  };

  const getColorEstado = (estado) => {
    if (estado === 'Aprobada') return '#10b981';
    if (estado === 'Rechazada') return '#ef4444';
    return '#f59e0b';
  };

  const getIconoEstado = (estado) => {
    if (estado === 'Aprobada') return 'fa-check-circle';
    if (estado === 'Rechazada') return 'fa-times-circle';
    return 'fa-clock';
  };

  return (
    <div className="novedades-container" style={{ width: '100%', padding: '20px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Novedades</h2>
          <p style={{ color: '#6b7280', margin: '5px 0 0 0' }}>Reporta y visualiza las novedades de tu proceso.</p>
        </div>
        <button
          onClick={handleNuevaNovedad}
          style={{
            background: '#3ca203',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <i className="fas fa-plus" /> Reportar Novedad
        </button>
      </div>

      <div style={{ marginBottom: '20px', background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
          <i className="fas fa-info-circle" style={{ color: '#3ca203', marginRight: '8px' }} />
          Las novedades reportadas serán revisadas por el Coordinador de Etapa Productiva.
        </p>
      </div>

      {novedades.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <i className="fas fa-folder-open" style={{ fontSize: '48px', color: '#9ca3af' }}></i>
          <h3 style={{ color: '#6b7280' }}>No tienes novedades reportadas</h3>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {novedades.map((novedad) => (
            <div key={novedad.id} style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h4 style={{ margin: 0, color: '#1f2937' }}>{novedad.titulo}</h4>
                <span style={{
                  background: `${getColorEstado(novedad.estado)}15`,
                  color: getColorEstado(novedad.estado),
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  <i className={`fas ${getIconoEstado(novedad.estado)}`}></i> {novedad.estado}
                </span>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <span style={{
                  background: '#e6f7ed',
                  color: '#047857',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  <i className="fas fa-tags"></i> {novedad.tipo}
                </span>
              </div>
              <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 10px 0' }}>{novedad.descripcion}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', borderTop: '1px solid #e5e7eb', paddingTop: '10px' }}>
                <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                  <i className="fas fa-calendar-alt" style={{ marginRight: '4px' }}></i>
                  {novedad.fecha}
                </span>
                {novedad.archivo && (
                  <button
                    onClick={() => handleVerArchivo(novedad)}
                    style={{ fontSize: '12px', color: '#3ca203', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <i className="fas fa-paperclip" style={{ marginRight: '4px' }}></i>
                    {novedad.archivo}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Novedades;