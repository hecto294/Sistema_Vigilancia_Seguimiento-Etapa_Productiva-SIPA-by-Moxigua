// src/pages/aprendiz/MisBitacoras.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './MisBitacoras.css';

const MisBitacoras = () => {
  const navigate = useNavigate();

  // Datos de bitácoras organizadas por bimestre
  const [bimestres, setBimestres] = useState([
    {
      id: 1,
      nombre: '1er Bimestre',
      estado: 'En proceso',
      descripcion: 'Bitácoras correspondientes al primer bimestre del proceso formativo.',
      fechaInicio: '10/03/2025',
      fechaFin: '24/03/2025',
      progreso: 66,
      semanas: [
        {
          id: 1,
          nombre: 'Semana 1',
          fecha: '10/03/2025',
          estado: 'Aprobada',
          descripcion: 'Bitácora de inducción y diagnóstico inicial',
          observacion: 'Excelente trabajo. Se evidencia comprensión de los temas.',
          evidencias: ['Evidencia 1.pdf', 'Evidencia 2.docx']
        },
        {
          id: 2,
          nombre: 'Semana 2',
          fecha: '17/03/2025',
          estado: 'Requiere corrección',
          descripcion: 'Bitácora de desarrollo de actividades',
          observacion: 'Faltan las evidencias de las pruebas diagnósticas. Por favor adjuntar los resultados.',
          evidencias: ['Evidencia 1.pdf']
        },
        {
          id: 3,
          nombre: 'Semana 3',
          fecha: '24/03/2025',
          estado: 'Pendiente de revisión',
          descripcion: 'Bitácora de seguimiento de competencias',
          observacion: null,
          evidencias: []
        }
      ]
    },
    {
      id: 2,
      nombre: '2do Bimestre',
      estado: 'En proceso',
      descripcion: 'Bitácoras correspondientes al segundo bimestre del proceso formativo.',
      fechaInicio: '07/04/2025',
      fechaFin: '14/04/2025',
      progreso: 40,
      semanas: [
        {
          id: 4,
          nombre: 'Semana 4',
          fecha: '07/04/2025',
          estado: 'Aprobada',
          descripcion: 'Bitácora de desarrollo de proyecto formativo',
          observacion: 'Buen avance en el proyecto. Continúa así.',
          evidencias: ['Evidencia 1.pdf', 'Evidencia 2.docx']
        },
        {
          id: 5,
          nombre: 'Semana 5',
          fecha: '14/04/2025',
          estado: 'Requiere corrección',
          descripcion: 'Bitácora de actividades complementarias',
          observacion: 'Debes incluir más detalles sobre las actividades realizadas.',
          evidencias: []
        }
      ]
    },
    {
      id: 3,
      nombre: '3er Bimestre',
      estado: 'Pendiente',
      descripcion: 'Bitácoras correspondientes al tercer bimestre del proceso formativo.',
      fechaInicio: '05/05/2025',
      fechaFin: '05/05/2025',
      progreso: 0,
      semanas: [
        {
          id: 6,
          nombre: 'Semana 6',
          fecha: '05/05/2025',
          estado: 'Aprobada',
          descripcion: 'Bitácora de implementación de mejoras',
          observacion: 'Excelente desempeño en la implementación.',
          evidencias: ['Evidencia 1.pdf']
        }
      ]
    }
  ]);

  // Estado para controlar qué bimestre está expandido
  const [bimestreExpandido, setBimestreExpandido] = useState(null);

  // Navegar al inicio (Dashboard)
  const goToInicio = () => {
    navigate('/aprendiz');
    window.location.reload();
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
              Adjunta tus evidencias (opcional)
            </p>
            <input type="file" id="evidencia-input" multiple accept=".pdf,.docx,.jpg,.png"
              style="width: 100%; padding: 8px; border: none; font-size: 13px;"
            />
            <p style="font-size: 11px; color: #9ca3af; margin: 4px 0 0 0;">
              Formatos: PDF, DOCX, JPG, PNG
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
        const evidencia = document.getElementById('evidencia-input').files;

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

        return { bimestre, semana: semana.trim(), fecha, descripcion: descripcion.trim(), evidencia };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const { bimestre, semana, fecha, descripcion, evidencia } = result.value;

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
          evidencias: evidencia ? Array.from(evidencia).map(f => f.name) : []
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
                  <strong>Descripción:</strong> ${descripcion}
                </p>
                ${evidencia && evidencia.length > 0 ? `
                  <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                    <strong>Evidencias:</strong> ${Array.from(evidencia).map(f => f.name).join(', ')}
                  </p>
                ` : ''}
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
              Adjunta nuevas evidencias (opcional)
            </p>
            <input type="file" id="evidencia-corregida" multiple accept=".pdf,.docx,.jpg,.png"
              style="width: 100%; padding: 8px; border: none; font-size: 13px;"
            />
            <p style="font-size: 11px; color: #9ca3af; margin: 4px 0 0 0;">
              Formatos: PDF, DOCX, JPG, PNG
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
        const evidencia = document.getElementById('evidencia-corregida').files;

        if (!descripcion.trim()) {
          Swal.showValidationMessage('⚠️ Por favor ingresa la descripción corregida');
          return false;
        }

        return { descripcion: descripcion.trim(), evidencia };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const { descripcion, evidencia } = result.value;

        setBimestres(prevBimestres =>
          prevBimestres.map(b => {
            if (b.id === bimestreId) {
              return {
                ...b,
                semanas: b.semanas.map(s => {
                  if (s.id === semana.id) {
                    const nuevasEvidencias = evidencia && evidencia.length > 0
                      ? [...s.evidencias, ...Array.from(evidencia).map(f => f.name)]
                      : s.evidencias;
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
                ${evidencia && evidencia.length > 0 ? `
                  <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                    <strong>Nuevas evidencias:</strong> ${Array.from(evidencia).map(f => f.name).join(', ')}
                  </p>
                ` : ''}
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
  // FUNCIÓN PARA VER DETALLES DE BITÁCORA
  // ==========================================================
  const handleVerDetalles = (bimestre) => {
    // Crear HTML con todas las semanas del bimestre
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
          <div style="margin-top: 6px; font-size: 12px; color: #3ca203;">
            <i class="fas fa-paperclip"></i> ${semana.evidencias.join(', ')}
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

    // Guardar función en window para usarla desde el HTML
    window.reenviarBitacora = (semanaId, bimestreId) => {
      const semana = bimestre.semanas.find(s => s.id === semanaId);
      if (semana) {
        handleReenviarBitacora(semana, bimestreId);
      }
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
          <div style="margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 4px;">
              <span style="color: #6b7280;">Progreso</span>
              <span style="font-weight: 600; color: ${getColorEstadoBimestre(bimestre.estado)};">${bimestre.progreso}%</span>
            </div>
            <div style="width: 100%; height: 6px; background: #f3f4f6; border-radius: 3px; overflow: hidden;">
              <div style="width: ${bimestre.progreso}%; height: 100%; background: ${getColorEstadoBimestre(bimestre.estado)}; border-radius: 3px; transition: width 0.8s ease;"></div>
            </div>
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

  // Función para obtener el color del estado del bimestre
  const getColorEstadoBimestre = (estado) => {
    if (estado === 'Completo') return '#10b981';
    if (estado === 'En proceso') return '#f59e0b';
    return '#6b7280';
  };

  // Función para obtener el color del estado de la semana
  const getColorEstado = (estado) => {
    if (estado === 'Aprobada') return '#10b981';
    if (estado === 'Requiere corrección') return '#ef4444';
    if (estado === 'Pendiente de revisión') return '#f59e0b';
    return '#6b7280';
  };

  // Función para obtener el icono del estado
  const getIconoEstado = (estado) => {
    if (estado === 'Aprobada') return 'fa-check-circle';
    if (estado === 'Requiere corrección') return 'fa-exclamation-circle';
    if (estado === 'Pendiente de revisión') return 'fa-clock';
    return 'fa-circle';
  };

  // Calcular total de semanas por bimestre
  const totalSemanas = (semanas) => semanas.length;
  const aprobadas = (semanas) => semanas.filter(s => s.estado === 'Aprobada').length;
  const pendientes = (semanas) => semanas.filter(s => s.estado === 'Pendiente de revisión').length;
  const correcciones = (semanas) => semanas.filter(s => s.estado === 'Requiere corrección').length;

  return (
    <div className="mis-bitacoras-container">
      {/* ========================================================== */}
      {/* MIGA DE PAN */}
      {/* ========================================================== */}
      <nav className="breadcrumb">
        <ol>
          <li>
            <Link to="/aprendiz" className="breadcrumb-link">
              <i className="fas fa-home"></i> Inicio
            </Link>
            <span className="separator"> &gt; </span>
          </li>
          <li>
            <Link to="/aprendiz/mis-momentos" className="breadcrumb-link">
              <i className="fas fa-calendar-alt"></i> Mi Proceso
            </Link>
            <span className="separator"> &gt; </span>
          </li>
          <li className="active">
            <i className="fas fa-book"></i> Mis Bitácoras
          </li>
        </ol>
      </nav>

      {/* ========================================================== */}
      {/* ENCABEZADO CON BOTÓN */}
      {/* ========================================================== */}
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

      {/* ========================================================== */}
      {/* TARJETAS DE BIMESTRES - SOLO BIMESTRES */}
      {/* ========================================================== */}
      <div className="bimestres-grid">
        {bimestres.map((bimestre) => {
          const total = totalSemanas(bimestre.semanas);
          const aprobadasCount = aprobadas(bimestre.semanas);
          const pendientesCount = pendientes(bimestre.semanas);
          const correccionesCount = correcciones(bimestre.semanas);
          const color = getColorEstadoBimestre(bimestre.estado);

          return (
            <div key={bimestre.id} className="bimestre-card">
              <div className="bimestre-header">
                <div className="bimestre-titulo">
                  <span className="bimestre-numero">{bimestre.nombre}</span>
                  <h3>{bimestre.nombre}</h3>
                </div>
                <span 
                  className={`bimestre-estado ${bimestre.estado.toLowerCase().replace(' ', '-')}`}
                  style={{ background: `${color}15`, color: color }}
                >
                  <i className={`fas ${bimestre.estado === 'Completo' ? 'fa-check-circle' : bimestre.estado === 'En proceso' ? 'fa-spinner' : 'fa-clock'}`}></i>
                  {bimestre.estado}
                </span>
              </div>

              <div className="bimestre-body">
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

                {/* Botón Ver detalles */}
                <button 
                  className="btn-ver-detalles-bimestre"
                  onClick={() => handleVerDetalles(bimestre)}
                >
                  <i className="fas fa-eye"></i> Ver detalles del bimestre
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MisBitacoras;