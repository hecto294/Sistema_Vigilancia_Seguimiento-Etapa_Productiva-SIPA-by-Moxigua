// src/pages/aprendiz/MisBitacoras.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';
import './MisBitacoras.css';

const MisBitacoras = () => {
  const navigate = useNavigate();

  // ==========================================================
  // 🔥 FUNCIÓN PARA GENERAR PDF REAL SIMULADO (con texto)
  // ==========================================================
  const generarPDFSimulado = (titulo, contenido, fecha) => {
    const doc = new jsPDF();
    
    doc.setFillColor(60, 162, 3);
    doc.rect(0, 0, 210, 30, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('SISTEMA DE SEGUIMIENTO SENA', 105, 12, { align: 'center' });
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Etapa Productiva - Bitácora', 105, 20, { align: 'center' });

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(titulo, 20, 45);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Fecha: ${fecha}`, 20, 52);
    
    doc.setFontSize(12);
    doc.text('Actividades realizadas:', 20, 70);
    
    doc.setFontSize(10);
    const maxWidth = 170;
    const splitText = doc.splitTextToSize(contenido, maxWidth);
    doc.text(splitText, 20, 78);
    
    doc.setFontSize(10);
    doc.text('Firma del Aprendiz:', 20, 270);
    doc.line(60, 270, 130, 270);
    
    return doc;
  };

  const verPDFSimulado = (titulo, contenido, fecha) => {
    const doc = generarPDFSimulado(titulo, contenido, fecha);
    const url = doc.output('bloburl');
    window.open(url, '_blank');
  };

  const descargarPDFSimulado = (titulo, contenido, fecha, nombreArchivo) => {
    const doc = generarPDFSimulado(titulo, contenido, fecha);
    doc.save(nombreArchivo || `${titulo}.pdf`);
  };

  // ==========================================================
  // 📅 DATOS INICIALES
  // ==========================================================
  const [bimestres, setBimestres] = useState([
    {
      id: 1,
      nombre: '1er Bimestre',
      estado: 'Completo',
      descripcion: 'Bitácoras correspondientes al primer bimestre del proceso formativo.',
      fechaInicio: '22/08/2026',
      fechaFin: '05/09/2026',
      progreso: 100,
      semanas: [
        {
          id: 1,
          nombre: 'Semana 1',
          fecha: '22/08/2026',
          estado: 'Aprobada',
          descripcion: 'Bitácora de inducción y diagnóstico inicial',
          observacion: 'Excelente trabajo. Se evidencia comprensión de los temas.',
          evidencias: [
            { 
              nombre: 'Evidencia_Induccion.pdf', 
              titulo: 'Bitácora Semana 1',
              contenido: 'En esta semana se realizó la inducción al sistema, se presentaron las normas de convivencia y se realizó el diagnóstico inicial de conocimientos.',
              fecha: '22/08/2026'
            }
          ]
        }
      ]
    },
    {
      id: 2,
      nombre: '2do Bimestre',
      estado: 'En proceso',
      descripcion: 'Bitácoras correspondientes al segundo bimestre del proceso formativo.',
      fechaInicio: '06/09/2026',
      fechaFin: '20/09/2026',
      progreso: 60,
      semanas: [
        {
          id: 4,
          nombre: 'Semana 4',
          fecha: '06/09/2026',
          estado: 'Aprobada',
          descripcion: 'Bitácora de desarrollo de proyecto formativo',
          observacion: 'Buen avance en el proyecto. Continúa así.',
          evidencias: [
            { 
              nombre: 'Evidencia_Proyecto.pdf', 
              titulo: 'Bitácora Semana 4',
              contenido: 'En esta semana se realizó el desarrollo del proyecto, se documentaron los avances y se compartieron los resultados con el instructor.',
              fecha: '06/09/2026'
            }
          ]
        },
        {
          id: 5,
          nombre: 'Semana 5',
          fecha: '13/09/2026',
          estado: 'Requiere corrección',
          descripcion: 'Bitácora de actividades complementarias',
          observacion: 'Faltan las evidencias de la actividad práctica. Debes subir nuevamente el archivo con las correcciones.',
          evidencias: [
            { 
              nombre: 'Evidencia_Corregir.pdf', 
              titulo: 'Bitácora Semana 5',
              contenido: 'En esta semana se realizaron actividades complementarias, pero faltaron las evidencias de la práctica.',
              fecha: '13/09/2026'
            }
          ]
        },
        {
          id: 6,
          nombre: 'Semana 6',
          fecha: '20/09/2026',
          estado: 'Pendiente de revisión',
          descripcion: 'Bitácora de seguimiento de competencias',
          observacion: null,
          evidencias: [
            { 
              nombre: 'Evidencia_Seguimiento.pdf', 
              titulo: 'Bitácora Semana 6',
              contenido: 'En esta semana se realizó el seguimiento de las competencias, se documentaron los avances y se entregaron al instructor.',
              fecha: '20/09/2026'
            }
          ]
        }
      ]
    },
    {
      id: 3,
      nombre: '3er Bimestre',
      estado: 'Próximo',
      descripcion: 'Bitácoras correspondientes al tercer bimestre del proceso formativo.',
      fechaInicio: '21/09/2026',
      fechaFin: '05/10/2026',
      progreso: 0,
      semanas: []
    }
  ]);

  // ==========================================================
  // 🔥 FORZAMOS EL BIMESTRE ACTIVO = 2
  // ==========================================================
  const [bimestreActivoId, setBimestreActivoId] = useState(2);

  // ==========================================================
  // 🔥 FUNCIÓN PARA CALCULAR EL ESTADO SEGÚN LA FECHA (VISUAL)
  // ==========================================================
  const calcularEstadoBimestre = (bimestre) => {
    const hoy = new Date();
    const inicio = new Date(bimestre.fechaInicio.split('/').reverse().join('-'));
    const fin = new Date(bimestre.fechaFin.split('/').reverse().join('-'));
    
    if (bimestre.id === 1) {
      return 'Completo';
    }
    if (bimestre.id === 2) {
      return 'En proceso';
    }
    if (hoy < inicio) {
      return 'Próximo';
    } else if (hoy > fin) {
      return 'Completo';
    } else {
      return 'En proceso';
    }
  };

  // ==========================================================
  // FUNCIÓN PARA CARGAR BITÁCORA NUEVA
  // ==========================================================
  const handleCargarBitacora = () => {
    const bimestreOptions = bimestres.map(b => 
      `<option value="${b.id}">${b.nombre}</option>`
    ).join('');

    Swal.fire({
      title: '📤 Cargar Bitácora',
      html: `
        <div style="text-align: left; padding: 5px 0;">
          <div style="margin: 12px 0;">
            <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 4px;">
              Bimestre *
            </label>
            <select id="bimestre-select" 
              style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
            >
              ${bimestreOptions}
            </select>
          </div>
          <div style="margin: 12px 0;">
            <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 4px;">
              Semana *
            </label>
            <input id="semana-input" 
              style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
              placeholder="Ej: Semana 7"
            />
          </div>
          <div style="margin: 12px 0;">
            <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 4px;">
              Fecha *
            </label>
            <input id="fecha-input" type="date"
              style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
            />
          </div>
          <div style="margin: 12px 0;">
            <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 4px;">
              Descripción *
            </label>
            <textarea id="descripcion-input" 
              style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box; min-height: 80px; resize: vertical;"
              placeholder="Describe las actividades realizadas en esta semana..."
            ></textarea>
          </div>
          <div style="margin: 12px 0; padding: 20px; border: 2px dashed #d1d5db; border-radius: 8px; text-align: center;">
            <i class="fas fa-paperclip" style="font-size: 24px; color: #3ca203;"></i>
            <p style="margin: 8px 0 0 0; font-size: 13px; color: #6b7280;">
              Adjunta tus evidencias (PDF) *
            </p>
            <input type="file" id="evidencia-input" multiple accept=".pdf"
              style="width: 100%; padding: 8px; border: none; font-size: 13px;"
            />
            <p style="font-size: 11px; color: #9ca3af; margin: 4px 0 0 0;">
              Solo se permiten archivos PDF
            </p>
          </div>
          <p style="font-size: 11px; color: #9ca3af; margin: 6px 0 0 0; text-align: left;">
            * Campos obligatorios
          </p>
        </div>
      `,
      icon: 'info',
      confirmButtonText: '📤 Cargar Bitácora',
      confirmButtonColor: '#3ca203',
      showCancelButton: true,
      cancelButtonText: '❌ Cancelar',
      cancelButtonColor: '#ef4444',
      width: '500px',
      padding: '1.5rem',
      preConfirm: () => {
        const bimestre = document.getElementById('bimestre-select').value;
        const semana = document.getElementById('semana-input').value;
        const fecha = document.getElementById('fecha-input').value;
        const descripcion = document.getElementById('descripcion-input').value;
        const evidenciaInput = document.getElementById('evidencia-input');
        const evidenciaFiles = evidenciaInput.files;

        if (!bimestre) {
          Swal.showValidationMessage('⚠️ Por favor selecciona un bimestre');
          return false;
        }
        if (!semana.trim()) {
          Swal.showValidationMessage('⚠️ Por favor ingresa el nombre de la semana');
          return false;
        }
        if (!fecha) {
          Swal.showValidationMessage('⚠️ Por favor selecciona una fecha');
          return false;
        }
        if (!descripcion.trim()) {
          Swal.showValidationMessage('⚠️ Por favor ingresa una descripción');
          return false;
        }
        if (evidenciaFiles.length === 0) {
          Swal.showValidationMessage('⚠️ Por favor adjunta al menos un PDF');
          return false;
        }

        for (let i = 0; i < evidenciaFiles.length; i++) {
          if (evidenciaFiles[i].type !== 'application/pdf') {
            Swal.showValidationMessage(`⚠️ El archivo ${evidenciaFiles[i].name} no es un PDF`);
            return false;
          }
        }

        const evidencias = [];
        for (let i = 0; i < evidenciaFiles.length; i++) {
          evidencias.push({ 
            nombre: evidenciaFiles[i].name,
            titulo: `Evidencia ${semana.trim()}` 
          });
        }

        return { bimestre, semana: semana.trim(), fecha, descripcion: descripcion.trim(), evidencias };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const { bimestre, semana, fecha, descripcion, evidencias } = result.value;

        const fechaObj = new Date(fecha);
        const fechaFormateada = fechaObj.toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });

        const nuevaSemana = {
          id: Date.now(),
          nombre: semana,
          fecha: fechaFormateada,
          estado: 'Pendiente de revisión',
          descripcion: descripcion,
          observacion: null,
          evidencias: evidencias
        };

        setBimestres(prevBimestres => 
          prevBimestres.map(b => {
            if (b.id === parseInt(bimestre)) {
              return {
                ...b,
                semanas: [...b.semanas, nuevaSemana]
              };
            }
            return b;
          })
        );

        Swal.fire({
          title: '✅ ¡Bitácora cargada exitosamente!',
          html: `
            <div style="text-align: left; padding: 10px 0;">
              <div style="background: #f0fdf4; padding: 12px; border-radius: 8px; border: 1px solid #bbf7d0;">
                <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                  <strong>Bimestre:</strong> ${bimestres.find(b => b.id === parseInt(bimestre))?.nombre}
                </p>
                <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                  <strong>Semana:</strong> ${semana}
                </p>
                <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                  <strong>Fecha:</strong> ${fechaFormateada}
                </p>
                <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                  <strong>Evidencias:</strong> ${evidencias.map(ev => ev.nombre).join(', ')}
                </p>
              </div>
              <p style="margin: 10px 0 0 0; font-size: 13px; color: #9ca3af; text-align: center;">
                Tu bitácora ha sido enviada para revisión.
              </p>
            </div>
          `,
          icon: 'success',
          confirmButtonText: '✅ Aceptar',
          confirmButtonColor: '#3ca203',
          timer: 3000,
          timerProgressBar: true,
          width: '480px'
        });
      }
    });
  };

  // ==========================================================
  // FUNCIÓN PARA REENVIAR BITÁCORA CON CORRECCIÓN
  // ==========================================================
  const handleReenviarBitacora = (semana, bimestreId) => {
    Swal.fire({
      title: '📤 Reenviar Bitácora con Correcciones',
      html: `
        <div style="text-align: left; padding: 5px 0;">
          <div style="margin: 12px 0; background: #fef3c7; padding: 12px 16px; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; font-size: 13px; color: #6b7280;">
              <strong><i class="fas fa-comment"></i> Corrección solicitada:</strong>
            </p>
            <p style="margin: 4px 0 0 0; font-size: 14px; color: #1f2937;">${semana.observacion || 'El instructor ha solicitado correcciones para esta bitácora.'}</p>
          </div>
          <div style="margin: 12px 0;">
            <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 4px;">
              Descripción corregida *
            </label>
            <textarea id="descripcion-corregida" 
              style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box; min-height: 100px; resize: vertical;"
              placeholder="Describe las correcciones realizadas en la bitácora..."
            >${semana.descripcion}</textarea>
          </div>
          <div style="margin: 12px 0; padding: 20px; border: 2px dashed #d1d5db; border-radius: 8px; text-align: center;">
            <i class="fas fa-paperclip" style="font-size: 24px; color: #3ca203;"></i>
            <p style="margin: 8px 0 0 0; font-size: 13px; color: #6b7280;">
              Adjunta nuevas evidencias (PDF) *
            </p>
            <input type="file" id="evidencia-corregida" multiple accept=".pdf"
              style="width: 100%; padding: 8px; border: none; font-size: 13px;"
            />
            <p style="font-size: 11px; color: #9ca3af; margin: 4px 0 0 0;">
              Solo se permiten archivos PDF
            </p>
          </div>
        </div>
      `,
      icon: 'warning',
      confirmButtonText: '📤 Reenviar con correcciones',
      confirmButtonColor: '#f59e0b',
      showCancelButton: true,
      cancelButtonText: '❌ Cancelar',
      cancelButtonColor: '#ef4444',
      width: '520px',
      padding: '1.5rem',
      preConfirm: () => {
        const descripcion = document.getElementById('descripcion-corregida').value;
        const evidenciaInput = document.getElementById('evidencia-corregida');
        const evidenciaFiles = evidenciaInput.files;

        if (!descripcion.trim()) {
          Swal.showValidationMessage('⚠️ Por favor ingresa la descripción corregida');
          return false;
        }
        if (evidenciaFiles.length === 0) {
          Swal.showValidationMessage('⚠️ Por favor adjunta al menos un PDF');
          return false;
        }

        for (let i = 0; i < evidenciaFiles.length; i++) {
          if (evidenciaFiles[i].type !== 'application/pdf') {
            Swal.showValidationMessage(`⚠️ El archivo ${evidenciaFiles[i].name} no es un PDF`);
            return false;
          }
        }

        const nuevasEvidencias = [];
        for (let i = 0; i < evidenciaFiles.length; i++) {
          nuevasEvidencias.push({ 
            nombre: evidenciaFiles[i].name,
            titulo: `Evidencia ${semana.nombre}` 
          });
        }

        return { descripcion: descripcion.trim(), nuevasEvidencias };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const { descripcion, nuevasEvidencias } = result.value;

        setBimestres(prevBimestres =>
          prevBimestres.map(b => {
            if (b.id === bimestreId) {
              return {
                ...b,
                semanas: b.semanas.map(s => {
                  if (s.id === semana.id) {
                    return {
                      ...s,
                      descripcion: descripcion,
                      estado: 'Pendiente de revisión',
                      observacion: null,
                      evidencias: nuevasEvidencias
                    };
                  }
                  return s;
                })
              };
            }
            return b;
          })
        );

        Swal.fire({
          title: '✅ ¡Bitácora reenviada!',
          html: `
            <div style="text-align: left; padding: 10px 0;">
              <div style="background: #f0fdf4; padding: 12px; border-radius: 8px; border: 1px solid #bbf7d0;">
                <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                  <strong>Semana:</strong> ${semana.nombre}
                </p>
                <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                  <strong>Nuevo estado:</strong> Pendiente de revisión
                </p>
                <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                  <strong>Evidencias:</strong> ${nuevasEvidencias.map(ev => ev.nombre).join(', ')}
                </p>
              </div>
              <p style="margin: 10px 0 0 0; font-size: 13px; color: #9ca3af; text-align: center;">
                Tu bitácora ha sido reenviada con las correcciones para revisión.
              </p>
            </div>
          `,
          icon: 'success',
          confirmButtonText: '✅ Aceptar',
          confirmButtonColor: '#3ca203',
          timer: 3000,
          timerProgressBar: true,
          width: '480px'
        });
      }
    });
  };

  // ==========================================================
  // FUNCIÓN PARA VER DETALLES (BLOQUEAR BIMESTRE 1 Y ABRIR BIMESTRE 2)
  // ==========================================================
  const handleVerDetalles = (bimestre) => {
    if (bimestre.id !== bimestreActivoId) {
      Swal.fire({
        title: '🔒 Bimestre No Activo',
        text: `El ${bimestre.nombre} no está activo actualmente. Podrás ver las bitácoras cuando esté en su periodo.`,
        icon: 'warning',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#3ca203'
      });
      return;
    }

    const semanasHtml = bimestre.semanas.map((semana, index) => `
      <div style="background: #f8fafc; padding: 12px 16px; border-radius: 8px; margin-bottom: 10px; border: 1px solid #e5e7eb;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
          <div>
            <strong style="font-size: 14px; color: #1f2937;">${semana.nombre}</strong>
            <span style="font-size: 12px; color: #6b7280; margin-left: 10px;">
              <i class="fas fa-calendar-alt"></i> ${semana.fecha}
            </span>
          </div>
          <span style="font-size: 12px; font-weight: 500; padding: 2px 10px; border-radius: 12px; background: ${getColorEstado(semana.estado)}15; color: ${getColorEstado(semana.estado)};">
            <i class="fas ${getIconoEstado(semana.estado)}"></i> ${semana.estado}
          </span>
        </div>
        <p style="font-size: 13px; color: #6b7280; margin: 6px 0 0 0;">${semana.descripcion}</p>
        ${semana.observacion ? `
          <div style="margin-top: 6px; padding: 8px 12px; background: #fef3c7; border-radius: 6px; border-left: 3px solid #f59e0b; font-size: 12px; color: #92400e;">
            <i class="fas fa-comment"></i> ${semana.observacion}
          </div>
        ` : ''}
        ${semana.evidencias && semana.evidencias.length > 0 ? `
          <div style="margin-top: 8px;">
            <p style="font-size: 12px; font-weight: 600; color: #1f2937; margin: 0 0 5px 0;">
              <i class="fas fa-paperclip"></i> Evidencias (${semana.evidencias.length}):
            </p>
            ${semana.evidencias.map(ev => `
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                <i class="fas fa-file-pdf" style="color: #dc2626; font-size: 14px;"></i>
                <span style="font-size: 12px; color: #6b7280;">${ev.nombre}</span>
                <button 
                  onclick="window.verPDFSimulado('${ev.titulo}', '${ev.contenido.replace(/'/g, "\\'")}', '${ev.fecha}')"
                  style="background: #3ca203; color: white; border: none; padding: 3px 8px; border-radius: 4px; font-size: 11px; cursor: pointer;"
                >
                  <i class="fas fa-eye"></i> Ver
                </button>
                <button 
                  onclick="window.descargarPDFSimulado('${ev.titulo}', '${ev.contenido.replace(/'/g, "\\'")}', '${ev.fecha}', '${ev.nombre}')"
                  style="background: #3ca203; color: white; border: none; padding: 3px 8px; border-radius: 4px; font-size: 11px; cursor: pointer;"
                >
                  <i class="fas fa-download"></i> Descargar
                </button>
              </div>
            `).join('')}
          </div>
        ` : ''}
        ${semana.estado === 'Requiere corrección' ? `
          <button 
            onclick="window.reenviarBitacora(${semana.id}, ${bimestre.id})"
            style="margin-top: 8px; background: #f59e0b; color: white; border: none; padding: 4px 12px; border-radius: 6px; font-size: 12px; cursor: pointer;"
          >
            <i class="fas fa-undo-alt"></i> Reenviar con corrección
          </button>
        ` : ''}
      </div>
    `).join('');

    window.reenviarBitacora = (semanaId, bimestreId) => {
      const bimestre = bimestres.find(b => b.id === bimestreId);
      if (bimestre) {
        const semana = bimestre.semanas.find(s => s.id === semanaId);
        if (semana) {
          handleReenviarBitacora(semana, bimestreId);
        }
      }
    };

    window.verPDFSimulado = (titulo, contenido, fecha) => {
      verPDFSimulado(titulo, contenido, fecha);
    };

    window.descargarPDFSimulado = (titulo, contenido, fecha, nombreArchivo) => {
      descargarPDFSimulado(titulo, contenido, fecha, nombreArchivo);
    };

    Swal.fire({
      title: `📊 ${bimestre.nombre}`,
      html: `
        <div style="text-align: left; padding: 5px 0; max-height: 500px; overflow-y: auto;">
          <div style="display: flex; gap: 15px; margin-bottom: 15px; flex-wrap: wrap;">
            <span style="font-size: 13px; color: #6b7280;">
              <i class="fas fa-calendar-alt"></i> ${bimestre.fechaInicio} - ${bimestre.fechaFin}
            </span>
            <span style="font-size: 13px; color: #6b7280;">
              <i class="fas fa-book"></i> ${bimestre.semanas.length} semanas
            </span>
            <span style="font-size: 13px; color: ${getColorEstadoBimestre(bimestre.estado)};">
              <i class="fas ${bimestre.estado === 'Completo' ? 'fa-check-circle' : bimestre.estado === 'En proceso' ? 'fa-spinner' : 'fa-clock'}"></i>
              ${bimestre.estado}
            </span>
          </div>
          <div style="border-top: 1px solid #e5e7eb; padding-top: 12px;">
            <p style="font-size: 13px; font-weight: 600; color: #1f2937; margin: 0 0 10px 0;">
              <i class="fas fa-list"></i> Semanas
            </p>
            ${semanasHtml}
          </div>
        </div>
      `,
      icon: 'info',
      confirmButtonText: '✅ Cerrar',
      confirmButtonColor: '#3ca203',
      width: '550px',
      padding: '1.5rem'
    });
  };

  // ==========================================================
  // FUNCIONES DE COLORES
  // ==========================================================
  const getColorEstadoBimestre = (estado) => {
    if (estado === 'Completo') return '#10b981';
    if (estado === 'En proceso') return '#f59e0b';
    return '#6b7280';
  };

  const getColorEstado = (estado) => {
    if (estado === 'Aprobada') return '#10b981';
    if (estado === 'Requiere corrección') return '#ef4444';
    if (estado === 'Pendiente de revisión') return '#f59e0b';
    return '#6b7280';
  };

  const getIconoEstado = (estado) => {
    if (estado === 'Aprobada') return 'fa-check-circle';
    if (estado === 'Requiere corrección') return 'fa-exclamation-circle';
    if (estado === 'Pendiente de revisión') return 'fa-clock';
    return 'fa-circle';
  };

  // ==========================================================
  // CALCULAR ESTADÍSTICAS
  // ==========================================================
  const totalSemanas = (semanas) => semanas.length;
  const aprobadas = (semanas) => semanas.filter(s => s.estado === 'Aprobada').length;
  const pendientes = (semanas) => semanas.filter(s => s.estado === 'Pendiente de revisión').length;
  const correcciones = (semanas) => semanas.filter(s => s.estado === 'Requiere corrección').length;

  // ==========================================================
  // RENDERIZAR
  // ==========================================================
  return (
    <div className="mis-bitacoras-container">
      {/* ========================================================== */}
      {/* MIGA DE PAN */}
      {/* ========================================================== */}
      <nav className="breadcrumb">
        <ol>
          <li>
            <button 
              onClick={() => window.location.href = '/aprendiz'}
              className="breadcrumb-link"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: 'inherit' }}
            >
              <i className="fas fa-home"></i> Mi Proceso
            </button>
            <span className="separator"> &gt; </span>
          </li>
          <li className="active">
            <i className="fas fa-book"></i> Mis Bitácoras
          </li>
        </ol>
      </nav>

      <div className="bitacoras-header">
        <div>
          <h2>Mis Bitácoras</h2>
          <p className="subtitulo">
            Revisa el estado de tus bitácoras organizadas por bimestre.
          </p>
        </div>
        <button 
          className="btn-cargar-bitacora"
          onClick={handleCargarBitacora}
        >
          <i className="fas fa-upload"></i> Cargar Bitácora
        </button>
      </div>

      <div className="bimestres-grid">
        {bimestres.map((bimestre) => {
          const estadoCalculado = calcularEstadoBimestre(bimestre);
          const total = totalSemanas(bimestre.semanas);
          const aprobadasCount = aprobadas(bimestre.semanas);
          const pendientesCount = pendientes(bimestre.semanas);
          const correccionesCount = correcciones(bimestre.semanas);
          const color = getColorEstadoBimestre(estadoCalculado);
          
          const esActivo = bimestre.id === bimestreActivoId;

          return (
            <div 
              key={bimestre.id} 
              className={`bimestre-card ${esActivo ? 'activo' : 'inactivo'}`}
              style={{
                opacity: esActivo ? 1 : 0.6,
                filter: esActivo ? 'none' : 'grayscale(80%)',
                pointerEvents: esActivo ? 'auto' : 'none'
              }}
            >
              <div className="bimestre-header">
                <div className="bimestre-titulo">
                  <span className="bimestre-numero">{bimestre.nombre}</span>
                  <h3>{bimestre.nombre}</h3>
                </div>
                <span 
                  className={`bimestre-estado ${estadoCalculado.toLowerCase().replace(' ', '-')}`}
                  style={{ background: `${color}15`, color: color }}
                >
                  <i className={`fas ${estadoCalculado === 'Completo' ? 'fa-check-circle' : estadoCalculado === 'En proceso' ? 'fa-spinner' : 'fa-clock'}`}></i>
                  {estadoCalculado}
                </span>
              </div>

              <div className="bimestre-body">
                {estadoCalculado === 'Próximo' ? (
                  <>
                    <p className="bimestre-descripcion">{bimestre.descripcion}</p>
                    <div className="bimestre-fechas">
                      <span>
                        <i className="fas fa-calendar-alt"></i>
                        Inicio: {bimestre.fechaInicio}
                      </span>
                      <span>
                        <i className="fas fa-calendar-check"></i>
                        Fin: {bimestre.fechaFin}
                      </span>
                    </div>

                    <button 
                      className="btn-ver-detalles-bimestre"
                      style={{
                        background: '#9ca3af',
                        cursor: 'not-allowed'
                      }}
                    >
                      <i className="fas fa-eye"></i> 
                      Se activará el {bimestre.fechaInicio}
                    </button>
                  </>
                ) : (
                  <>
                    <p className="bimestre-descripcion">{bimestre.descripcion}</p>
                    
                    <div className="bimestre-fechas">
                      <span>
                        <i className="fas fa-calendar-alt"></i>
                        Inicio: {bimestre.fechaInicio}
                      </span>
                      <span>
                        <i className="fas fa-calendar-check"></i>
                        Fin: {bimestre.fechaFin}
                      </span>
                    </div>

                    <div className="bimestre-stats">
                      <span className="stat-item" style={{ color: '#10b981' }}>
                        <i className="fas fa-check-circle"></i> {aprobadasCount} aprobadas
                      </span>
                      <span className="stat-item" style={{ color: '#f59e0b' }}>
                        <i className="fas fa-clock"></i> {pendientesCount} pendientes
                      </span>
                      <span className="stat-item" style={{ color: '#ef4444' }}>
                        <i className="fas fa-exclamation-circle"></i> {correccionesCount} con corrección
                      </span>
                      <span className="stat-item" style={{ color: '#6b7280' }}>
                        <i className="fas fa-book"></i> {total} total
                      </span>
                    </div>

                    <div className="bimestre-progreso">
                      <div className="progreso-info">
                        <span className="progreso-label">Progreso de bitácoras</span>
                        <span className="progreso-porcentaje" style={{ color: color }}>
                          {bimestre.progreso}%
                        </span>
                      </div>
                      <div className="progreso-barra">
                        <div 
                          className="progreso-llenado" 
                          style={{ 
                            width: `${bimestre.progreso}%`,
                            background: color
                          }}
                        />
                      </div>
                    </div>

                    <button 
                      className="btn-ver-detalles-bimestre"
                      onClick={() => handleVerDetalles(bimestre)}
                      style={{
                        background: esActivo ? '#3ca203' : '#9ca3af',
                        cursor: esActivo ? 'pointer' : 'not-allowed'
                      }}
                    >
                      <i className="fas fa-eye"></i> 
                      {esActivo ? 'Ver detalles del bimestre' : `Se activará el ${bimestre.fechaInicio}`}
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MisBitacoras;
