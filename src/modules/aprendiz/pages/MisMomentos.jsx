// src/pages/aprendiz/MisMomentos.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './MisMomentos.css';

const MisMomentos = () => {
  const navigate = useNavigate();

  const [momentos, setMomentos] = useState([
    {
      id: 1,
      nombre: 'Momento 1',
      titulo: 'Inducción y Diagnóstico Inicial',
      estado: 'Completo',
      descripcion: 'Bienvenida al programa, inducción general y diagnóstico de competencias iniciales.',
      fechaInicio: '15/01/2025',
      fechaFin: '15/02/2025',
      progreso: 100,
      formatoCargado: true,
      nombreArchivo: 'F023_Momento1_Laura.pdf'
    },
    {
      id: 2,
      nombre: 'Momento 2',
      titulo: 'Ejecución y Seguimiento',
      estado: 'En proceso',
      descripcion: 'Desarrollo de actividades formativas, seguimiento y acompañamiento personalizado.',
      fechaInicio: '16/02/2025',
      fechaFin: '15/06/2025',
      progreso: 65,
      formatoCargado: false,
      nombreArchivo: null
    },
    {
      id: 3,
      nombre: 'Momento 3',
      titulo: 'Evaluación y Cierre',
      estado: 'Pendiente',
      descripcion: 'Evaluación final, retroalimentación y cierre del proceso formativo.',
      fechaInicio: '16/06/2025',
      fechaFin: '15/07/2025',
      progreso: 0,
      formatoCargado: false,
      nombreArchivo: null
    }
  ]);

  const goToInicio = () => {
    navigate('/aprendiz');
    window.location.reload();
  };

  // ==========================================================
  // FUNCIÓN PARA CARGAR FORMATO F023
  // ==========================================================
  const handleCargarFormato = () => {
    const momentoOptions = momentos.map(m => 
      `<option value="${m.id}" ${m.formatoCargado ? 'disabled' : ''}>
        ${m.nombre} - ${m.titulo} ${m.formatoCargado ? '(Ya cargado)' : ''}
      </option>`
    ).join('');

    Swal.fire({
      title: '📤 Cargar Formato F023',
      html: `
        <div style="text-align: left; padding: 5px 0;">
          <div style="margin: 15px 0;">
            <label style="display: block; font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 5px;">
              Selecciona el Momento *
            </label>
            <select id="momento-select" 
              style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
            >
              <option value="">-- Selecciona un momento --</option>
              ${momentoOptions}
            </select>
            <p style="font-size: 11px; color: #9ca3af; margin: 4px 0 0 0;">
              <i class="fas fa-info-circle"></i> Los momentos que ya tienen formato cargado aparecen deshabilitados
            </p>
          </div>
          <div style="margin: 15px 0; padding: 20px; border: 2px dashed #d1d5db; border-radius: 8px; text-align: center;">
            <i class="fas fa-file-pdf" style="font-size: 48px; color: #ef4444;"></i>
            <p style="margin: 10px 0 0 0; color: #6b7280;">
              Arrastra o haz clic para seleccionar el formato F023
            </p>
            <p style="font-size: 12px; color: #9ca3af;">
              Formato permitido: .pdf (Máx. 5MB)
            </p>
          </div>
          <div style="margin: 15px 0;">
            <label style="display: block; font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 5px;">
              Selecciona tu archivo *
            </label>
            <input type="file" id="formato-file" accept=".pdf"
              style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
            />
          </div>
          <div style="margin: 12px 0;">
            <label style="display: block; font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 5px;">
              Comentarios (opcional)
            </label>
            <textarea id="comentarios-input" 
              style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box; min-height: 60px; resize: vertical;"
              placeholder="Agrega un comentario sobre el formato F023..."
            ></textarea>
          </div>
          <p style="font-size: 11px; color: #9ca3af; margin: 6px 0 0 0; text-align: left;">
            * Campos obligatorios
          </p>
        </div>
      `,
      icon: 'info',
      confirmButtonText: '📤 Cargar Formato',
      confirmButtonColor: '#3ca203',
      showCancelButton: true,
      cancelButtonText: '❌ Cancelar',
      cancelButtonColor: '#ef4444',
      width: '520px',
      padding: '1.5rem',
      preConfirm: () => {
        const momentoId = document.getElementById('momento-select').value;
        const fileInput = document.getElementById('formato-file');
        const file = fileInput?.files[0];

        if (!momentoId) {
          Swal.showValidationMessage('⚠️ Por favor selecciona un momento');
          return false;
        }

        if (!file) {
          Swal.showValidationMessage('⚠️ Por favor selecciona un archivo');
          return false;
        }

        if (file.type !== 'application/pdf') {
          Swal.showValidationMessage('⚠️ Solo se permiten archivos PDF');
          return false;
        }

        if (file.size > 5 * 1024 * 1024) {
          Swal.showValidationMessage('⚠️ El archivo no debe superar los 5MB');
          return false;
        }

        const comentarios = document.getElementById('comentarios-input').value;

        return { momentoId: parseInt(momentoId), file, fileName: file.name, comentarios };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const { momentoId, file, fileName, comentarios } = result.value;

        const momento = momentos.find(m => m.id === momentoId);

        setMomentos(prevMomentos =>
          prevMomentos.map(m => {
            if (m.id === momentoId) {
              return {
                ...m,
                formatoCargado: true,
                nombreArchivo: fileName,
                comentariosFormato: comentarios || 'Sin comentarios'
              };
            }
            return m;
          })
        );

        Swal.fire({
          title: '✅ ¡Formato F023 cargado exitosamente!',
          html: `
            <div style="text-align: left; padding: 10px 0;">
              <div style="background: #f0fdf4; padding: 12px; border-radius: 8px; border: 1px solid #bbf7d0;">
                <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                  <strong>Momento:</strong> ${momento.nombre} - ${momento.titulo}
                </p>
                <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                  <strong>Archivo:</strong> ${fileName}
                </p>
                <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                  <strong>Tamaño:</strong> ${(file.size / 1024).toFixed(2)} KB
                </p>
                ${comentarios ? `
                  <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                    <strong>Comentarios:</strong> ${comentarios}
                  </p>
                ` : ''}
              </div>
              <p style="margin: 10px 0 0 0; font-size: 13px; color: #9ca3af; text-align: center;">
                El formato F023 ha sido cargado correctamente para revisión del instructor.
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
  // FUNCIÓN PARA VER FORMATO F023
  // ==========================================================
  const handleVerFormato = (momento) => {
    Swal.fire({
      title: `📄 Formato F023 - ${momento.nombre}`,
      html: `
        <div style="text-align: left; padding: 10px 0;">
          <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px; padding: 12px; background: #f0fdf4; border-radius: 8px; border: 1px solid #bbf7d0;">
            <i class="fas fa-file-pdf" style="font-size: 40px; color: #ef4444;"></i>
            <div>
              <p style="margin: 0; font-size: 14px; font-weight: 600; color: #1f2937;">${momento.nombreArchivo}</p>
              <p style="margin: 2px 0 0 0; font-size: 12px; color: #6b7280;">
                <i class="fas fa-check-circle" style="color: #10b981;"></i> Cargado correctamente
              </p>
            </div>
          </div>
          <div style="margin-bottom: 10px;">
            <p style="margin: 0; font-size: 13px; color: #6b7280;">
              <strong>Momento:</strong> ${momento.titulo}
            </p>
            <p style="margin: 4px 0 0 0; font-size: 13px; color: #6b7280;">
              <strong>Estado:</strong> ${momento.estado}
            </p>
            ${momento.comentariosFormato ? `
              <p style="margin: 4px 0 0 0; font-size: 13px; color: #6b7280;">
                <strong>Comentarios:</strong> ${momento.comentariosFormato}
              </p>
            ` : ''}
          </div>
          <div style="margin-top: 15px; padding-top: 12px; border-top: 1px dashed #e5e7eb; text-align: center; font-size: 13px; color: #9ca3af;">
            <i class="fas fa-info-circle"></i> Haz clic en "Descargar" para obtener el archivo
          </div>
        </div>
      `,
      icon: 'success',
      confirmButtonText: '📥 Descargar Formato',
      confirmButtonColor: '#3ca203',
      showCancelButton: true,
      cancelButtonText: '❌ Cerrar',
      cancelButtonColor: '#6b7280',
      width: '480px'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '✅ ¡Descarga iniciada!',
          text: `El formato ${momento.nombreArchivo} se está descargando...`,
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3ca203',
          timer: 2000,
          timerProgressBar: true
        });
      }
    });
  };

  // ==========================================================
  // FUNCIÓN PARA ELIMINAR FORMATO F023
  // ==========================================================
  const handleEliminarFormato = (momento) => {
    Swal.fire({
      title: '⚠️ ¿Eliminar formato F023?',
      text: `¿Estás seguro de que quieres eliminar el formato "${momento.nombreArchivo}"? Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: '✅ Sí, eliminar',
      cancelButtonText: '❌ Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setMomentos(prevMomentos =>
          prevMomentos.map(m => {
            if (m.id === momento.id) {
              return {
                ...m,
                formatoCargado: false,
                nombreArchivo: null,
                comentariosFormato: null
              };
            }
            return m;
          })
        );

        Swal.fire({
          title: '✅ ¡Formato eliminado!',
          text: 'El formato F023 ha sido eliminado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3ca203',
          timer: 2000,
          timerProgressBar: true
        });
      }
    });
  };

  // Función para obtener el color del estado
  const getColorEstado = (estado) => {
    if (estado === 'Completo') return '#10b981';
    if (estado === 'En proceso') return '#f59e0b';
    return '#6b7280';
  };

  // Función para obtener el icono del estado
  const getIconoEstado = (estado) => {
    if (estado === 'Completo') return 'fa-check-circle';
    if (estado === 'En proceso') return 'fa-spinner';
    return 'fa-clock';
  };

  return (
    <div className="mis-momentos-container">
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
            <i className="fas fa-clock"></i> Mis Momentos
          </li>
        </ol>
      </nav>

      <div className="momentos-header">
        <div>
          <h2>Mis Momentos</h2>
          <p className="subtitulo">
            Revisa el estado y los logros de cada momento de tu formación.
          </p>
        </div>
        <button 
          className="btn-cargar-formato-superior"
          onClick={handleCargarFormato}
        >
          <i className="fas fa-upload"></i> Cargar Formato F023
        </button>
      </div>

      <div className="header-stats">
        <span className="stat-item">
          <span className="stat-label">Completos</span>
          <span className="stat-value" style={{ color: '#10b981' }}>
            {momentos.filter(m => m.estado === 'Completo').length}
          </span>
        </span>
        <span className="stat-item">
          <span className="stat-label">En proceso</span>
          <span className="stat-value" style={{ color: '#f59e0b' }}>
            {momentos.filter(m => m.estado === 'En proceso').length}
          </span>
        </span>
        <span className="stat-item">
          <span className="stat-label">Pendientes</span>
          <span className="stat-value" style={{ color: '#6b7280' }}>
            {momentos.filter(m => m.estado === 'Pendiente').length}
          </span>
        </span>
        <span className="stat-item">
          <span className="stat-label">Formatos F023</span>
          <span className="stat-value" style={{ color: '#3ca203' }}>
            {momentos.filter(m => m.formatoCargado).length}/{momentos.length}
          </span>
        </span>
      </div>

      <div className="momentos-grid">
        {momentos.map((momento) => (
          <div key={momento.id} className="momento-card">
            <div className="momento-header">
              <div className="momento-titulo">
                <span className="momento-numero">{momento.nombre}</span>
                <h3>{momento.titulo}</h3>
              </div>
              <span 
                className={`momento-estado ${momento.estado.toLowerCase().replace(' ', '-')}`}
                style={{ background: `${getColorEstado(momento.estado)}15`, color: getColorEstado(momento.estado) }}
              >
                <i className={`fas ${getIconoEstado(momento.estado)}`}></i>
                {momento.estado}
              </span>
            </div>

            <div className="momento-body">
              <p className="momento-descripcion">{momento.descripcion}</p>
              
              <div className="momento-fechas">
                <span>
                  <i className="fas fa-calendar-alt"></i>
                  Inicio: {momento.fechaInicio}
                </span>
                <span>
                  <i className="fas fa-calendar-check"></i>
                  Fin: {momento.fechaFin}
                </span>
              </div>

              <div className="momento-progreso">
                <div className="progreso-info">
                  <span className="progreso-label">Progreso</span>
                  <span className="progreso-porcentaje" style={{ color: getColorEstado(momento.estado) }}>
                    {momento.progreso}%
                  </span>
                </div>
                <div className="progreso-barra">
                  <div 
                    className="progreso-llenado" 
                    style={{ 
                      width: `${momento.progreso}%`,
                      background: getColorEstado(momento.estado)
                    }}
                  />
                </div>
              </div>

              <div className="formato-f023">
                <div className="formato-header">
                  <span className="formato-titulo">
                    <i className="fas fa-file-pdf" style={{ color: '#ef4444' }}></i>
                    Formato F023
                  </span>
                  {momento.formatoCargado ? (
                    <span className="formato-cargado">
                      <i className="fas fa-check-circle" style={{ color: '#10b981' }}></i>
                      {momento.nombreArchivo}
                    </span>
                  ) : (
                    <span className="formato-pendiente">
                      <i className="fas fa-clock" style={{ color: '#f59e0b' }}></i>
                      Pendiente
                    </span>
                  )}
                </div>
                {momento.formatoCargado && (
                  <div className="formato-acciones">
                    <button 
                      className="btn-ver-formato"
                      onClick={() => handleVerFormato(momento)}
                    >
                      <i className="fas fa-eye"></i> Ver Formato
                    </button>
                    <button 
                      className="btn-eliminar-formato"
                      onClick={() => handleEliminarFormato(momento)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MisMomentos;