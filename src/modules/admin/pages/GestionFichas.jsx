// src/pages/admin/GestionFichas.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './GestionFichas.css';

const GestionFichas = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // 📋 Lista de códigos predefinidos para el select
  const codigosDisponibles = [
    '2875901', '2875902', '2875903', '2875904', '2875905', '2875906', '2875907', '2875908'
  ];

  // 📋 Lista de programas predefinidos para el select
  const programasDisponibles = [
    'Análisis y Desarrollo de Software',
    'Gestión Empresarial',
    'Contabilidad y Finanzas',
    'Desarrollo Web',
    'Marketing Digital',
    'Administración de Redes',
    'Gastronomía'
  ];

  const [fichas, setFichas] = useState([
    {
      id: 1,
      codigo: '2875901',
      programa: 'Análisis y Desarrollo de Software',
      nivel: 'Tecnólogo',
      aprendices: 28,
      estado: 'Activa',
      jornada: 'Mañana',
      fechaInicio: '15/01/2025',
      fechaFin: '15/12/2025'
    },
    {
      id: 2,
      codigo: '2875902',
      programa: 'Gestión Empresarial',
      nivel: 'Tecnólogo',
      aprendices: 24,
      estado: 'Activa',
      jornada: 'Tarde',
      fechaInicio: '20/01/2025',
      fechaFin: '20/12/2025'
    },
    {
      id: 3,
      codigo: '2875903',
      programa: 'Contabilidad y Finanzas',
      nivel: 'Técnico',
      aprendices: 32,
      estado: 'Inactiva',
      jornada: 'Noche',
      fechaInicio: '10/02/2025',
      fechaFin: '10/11/2025'
    },
    {
      id: 4,
      codigo: '2875904',
      programa: 'Desarrollo Web',
      nivel: 'Tecnólogo',
      aprendices: 20,
      estado: 'Activa',
      jornada: 'Mañana',
      fechaInicio: '01/03/2025',
      fechaFin: '01/12/2025'
    }
  ]);

  // Navegar al inicio (Dashboard)
  const goToInicio = () => {
    navigate('/admin');
    window.location.reload();
  };

  const handleSearch = () => setSearchQuery(searchTerm);
  const handleClear = () => { setSearchTerm(''); setSearchQuery(''); };

  const filteredFichas = fichas.filter(f =>
    f.codigo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.programa.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ==========================================================
  // FUNCIÓN PARA EDITAR FICHA (CON FECHAS)
  // ==========================================================
  const handleEditarFicha = (ficha) => {
    Swal.fire({
      title: `✏️ Editar Ficha ${ficha.codigo}`,
      html: `
        <div style="text-align: left; padding: 5px 0;">
          <div style="margin: 12px 0;">
            <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 4px;">
              Código *
            </label>
            <select id="edit-codigo" 
              style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
            >
              ${codigosDisponibles.map(codigo => 
                `<option value="${codigo}" ${ficha.codigo === codigo ? 'selected' : ''}>${codigo}</option>`
              ).join('')}
            </select>
          </div>
          <div style="margin: 12px 0;">
            <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 4px;">
              Programa *
            </label>
            <select id="edit-programa" 
              style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
            >
              ${programasDisponibles.map(programa => 
                `<option value="${programa}" ${ficha.programa === programa ? 'selected' : ''}>${programa}</option>`
              ).join('')}
            </select>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 12px 0;">
            <div>
              <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 4px;">
                Nivel *
              </label>
              <select id="edit-nivel" 
                style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
              >
                <option value="Tecnólogo" ${ficha.nivel === 'Tecnólogo' ? 'selected' : ''}>Tecnólogo</option>
                <option value="Técnico" ${ficha.nivel === 'Técnico' ? 'selected' : ''}>Técnico</option>
                <option value="Profesional" ${ficha.nivel === 'Profesional' ? 'selected' : ''}>Profesional</option>
                <option value="Especialización" ${ficha.nivel === 'Especialización' ? 'selected' : ''}>Especialización</option>
              </select>
            </div>
            <div>
              <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 4px;">
                Jornada *
              </label>
              <select id="edit-jornada" 
                style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
              >
                <option value="Mañana" ${ficha.jornada === 'Mañana' ? 'selected' : ''}>Mañana</option>
                <option value="Tarde" ${ficha.jornada === 'Tarde' ? 'selected' : ''}>Tarde</option>
                <option value="Noche" ${ficha.jornada === 'Noche' ? 'selected' : ''}>Noche</option>
                <option value="Fin de Semana" ${ficha.jornada === 'Fin de Semana' ? 'selected' : ''}>Fin de Semana</option>
              </select>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 12px 0;">
            <div>
              <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 4px;">
                Fecha Inicio *
              </label>
              <input id="edit-fecha-inicio" type="date"
                style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
                value="${ficha.fechaInicio.split('/').reverse().join('-')}"
              />
            </div>
            <div>
              <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 4px;">
                Fecha Fin *
              </label>
              <input id="edit-fecha-fin" type="date"
                style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
                value="${ficha.fechaFin.split('/').reverse().join('-')}"
              />
            </div>
          </div>
          <div style="margin: 12px 0;">
            <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 4px;">
              Estado *
            </label>
            <select id="edit-estado" 
              style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
            >
              <option value="Activa" ${ficha.estado === 'Activa' ? 'selected' : ''}>Activa</option>
              <option value="Inactiva" ${ficha.estado === 'Inactiva' ? 'selected' : ''}>Inactiva</option>
            </select>
          </div>
          <p style="font-size: 11px; color: #9ca3af; margin: 6px 0 0 0; text-align: left;">
            * Campos obligatorios
          </p>
        </div>
      `,
      icon: 'info',
      confirmButtonText: '💾 Guardar Cambios',
      confirmButtonColor: '#3ca203',
      showCancelButton: true,
      cancelButtonText: '❌ Cancelar',
      cancelButtonColor: '#ef4444',
      width: '520px',
      padding: '1.5rem',
      preConfirm: () => {
        const codigo = document.getElementById('edit-codigo').value;
        const programa = document.getElementById('edit-programa').value;
        const nivel = document.getElementById('edit-nivel').value;
        const jornada = document.getElementById('edit-jornada').value;
        const fechaInicio = document.getElementById('edit-fecha-inicio').value;
        const fechaFin = document.getElementById('edit-fecha-fin').value;
        const estado = document.getElementById('edit-estado').value;

        if (!fechaInicio || !fechaFin) {
          Swal.showValidationMessage('⚠️ Por favor selecciona las fechas');
          return false;
        }

        // Formatear fechas para mostrar
        const fechaInicioFormateada = new Date(fechaInicio).toLocaleDateString('es-ES');
        const fechaFinFormateada = new Date(fechaFin).toLocaleDateString('es-ES');

        return { 
          codigo, 
          programa, 
          nivel, 
          jornada,
          fechaInicio: fechaInicioFormateada,
          fechaFin: fechaFinFormateada,
          estado 
        };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const { codigo, programa, nivel, jornada, fechaInicio, fechaFin, estado } = result.value;

        setFichas(prevFichas =>
          prevFichas.map(f => {
            if (f.id === ficha.id) {
              return {
                ...f,
                codigo,
                programa,
                nivel,
                jornada,
                fechaInicio,
                fechaFin,
                estado
              };
            }
            return f;
          })
        );

        Swal.fire({
          title: '✅ ¡Ficha actualizada!',
          html: `
            <div style="text-align: left; padding: 10px 0;">
              <div style="background: #f0fdf4; padding: 12px; border-radius: 8px; border: 1px solid #bbf7d0;">
                <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                  <strong>Código:</strong> ${codigo}
                </p>
                <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                  <strong>Programa:</strong> ${programa}
                </p>
                <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                  <strong>Jornada:</strong> ${jornada}
                </p>
                <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                  <strong>Fecha Inicio:</strong> ${fechaInicio}
                </p>
                <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                  <strong>Fecha Fin:</strong> ${fechaFin}
                </p>
              </div>
              <p style="margin: 10px 0 0 0; font-size: 13px; color: #9ca3af; text-align: center;">
                La ficha ha sido actualizada exitosamente.
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
  // FUNCIÓN PARA ELIMINAR FICHA
  // ==========================================================
  const handleEliminarFicha = (ficha) => {
    Swal.fire({
      title: '⚠️ ¿Eliminar ficha?',
      text: `¿Estás seguro de que quieres eliminar la ficha ${ficha.codigo} - ${ficha.programa}? Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: '✅ Sí, eliminar',
      cancelButtonText: '❌ Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setFichas(prevFichas => prevFichas.filter(f => f.id !== ficha.id));

        Swal.fire({
          title: '✅ ¡Ficha eliminada!',
          text: `La ficha ${ficha.codigo} ha sido eliminada correctamente.`,
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
  // FUNCIÓN PARA CARGA MASIVA DE FICHAS
  // ==========================================================
  const handleCargaMasiva = () => {
    Swal.fire({
      title: '📤 Carga Masiva de Fichas',
      html: `
        <div style="text-align: left; padding: 5px 0;">
          <div style="margin: 15px 0; padding: 20px; border: 2px dashed #d1d5db; border-radius: 8px; text-align: center;">
            <i class="fas fa-cloud-upload-alt" style="font-size: 48px; color: #3ca203;"></i>
            <p style="margin: 10px 0 0 0; color: #6b7280;">
              Arrastra o haz clic para seleccionar un archivo
            </p>
            <p style="font-size: 12px; color: #9ca3af;">
              Formatos permitidos: .xlsx, .xls, .csv
            </p>
          </div>
          <div style="margin: 15px 0;">
            <label style="display: block; font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 5px;">
              Selecciona tu archivo *
            </label>
            <input type="file" id="archivo-carga" accept=".xlsx,.xls,.csv"
              style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
            />
          </div>
          <div style="margin: 12px 0;">
            <label style="display: block; font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 5px;">
              Descripción (opcional)
            </label>
            <textarea id="descripcion-carga" 
              style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box; min-height: 60px; resize: vertical;"
              placeholder="Agrega una descripción para esta carga masiva..."
            ></textarea>
          </div>
          <p style="font-size: 11px; color: #9ca3af; margin: 6px 0 0 0; text-align: left;">
            * Campos obligatorios
          </p>
        </div>
      `,
      icon: 'info',
      confirmButtonText: '📤 Subir Archivo',
      confirmButtonColor: '#3ca203',
      showCancelButton: true,
      cancelButtonText: '❌ Cancelar',
      cancelButtonColor: '#ef4444',
      width: '520px',
      padding: '1.5rem',
      preConfirm: () => {
        const fileInput = document.getElementById('archivo-carga');
        const file = fileInput?.files[0];
        const descripcion = document.getElementById('descripcion-carga').value;

        if (!file) {
          Swal.showValidationMessage('⚠️ Por favor selecciona un archivo');
          return false;
        }

        const tiposPermitidos = [
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/vnd.ms-excel',
          'text/csv'
        ];
        if (!tiposPermitidos.includes(file.type) && !file.name.endsWith('.csv')) {
          Swal.showValidationMessage('⚠️ Solo se permiten archivos Excel (.xlsx, .xls) o CSV');
          return false;
        }

        if (file.size > 10 * 1024 * 1024) {
          Swal.showValidationMessage('⚠️ El archivo no debe superar los 10MB');
          return false;
        }

        return { file, fileName: file.name, descripcion };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const { file, fileName, descripcion } = result.value;

        Swal.fire({
          title: '✅ ¡Carga masiva iniciada!',
          html: `
            <div style="text-align: left; padding: 10px 0;">
              <div style="background: #f0fdf4; padding: 12px; border-radius: 8px; border: 1px solid #bbf7d0;">
                <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                  <strong>Archivo:</strong> ${fileName}
                </p>
                <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                  <strong>Tamaño:</strong> ${(file.size / 1024).toFixed(2)} KB
                </p>
                ${descripcion ? `
                  <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                    <strong>Descripción:</strong> ${descripcion}
                  </p>
                ` : ''}
                <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                  <i class="fas fa-spinner fa-pulse" style="color: #3ca203;"></i>
                  Procesando fichas...
                </p>
              </div>
              <p style="margin: 10px 0 0 0; font-size: 13px; color: #9ca3af; text-align: center;">
                Las fichas se están cargando en el sistema.
              </p>
            </div>
          `,
          icon: 'success',
          confirmButtonText: '✅ Aceptar',
          confirmButtonColor: '#3ca203',
          timer: 2500,
          timerProgressBar: true,
          width: '480px'
        });
      }
    });
  };

  // ==========================================================
  // FUNCIÓN PARA NUEVA FICHA (CON FECHAS Y SELECTS)
  // ==========================================================
  const handleNuevaFicha = () => {
    Swal.fire({
      title: '📚 Nueva Ficha',
      html: `
        <div style="text-align: left; padding: 5px 0;">
          <div style="margin: 12px 0;">
            <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 4px;">
              Código *
            </label>
            <select id="nuevo-codigo" 
              style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
            >
              <option value="">Seleccione un código</option>
              ${codigosDisponibles.map(codigo => `<option value="${codigo}">${codigo}</option>`).join('')}
            </select>
          </div>
          <div style="margin: 12px 0;">
            <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 4px;">
              Programa *
            </label>
            <select id="nuevo-programa" 
              style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
            >
              <option value="">Seleccione un programa</option>
              ${programasDisponibles.map(programa => `<option value="${programa}">${programa}</option>`).join('')}
            </select>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 12px 0;">
            <div>
              <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 4px;">
                Nivel *
              </label>
              <select id="nuevo-nivel" 
                style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
              >
                <option value="Tecnólogo">Tecnólogo</option>
                <option value="Técnico">Técnico</option>
                <option value="Profesional">Profesional</option>
                <option value="Especialización">Especialización</option>
              </select>
            </div>
            <div>
              <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 4px;">
                Jornada *
              </label>
              <select id="nuevo-jornada" 
                style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
              >
                <option value="Mañana">Mañana</option>
                <option value="Tarde">Tarde</option>
                <option value="Noche">Noche</option>
                <option value="Fin de Semana">Fin de Semana</option>
              </select>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 12px 0;">
            <div>
              <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 4px;">
                Fecha Inicio *
              </label>
              <input id="nuevo-fecha-inicio" type="date"
                style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
              />
            </div>
            <div>
              <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 4px;">
                Fecha Fin *
              </label>
              <input id="nuevo-fecha-fin" type="date"
                style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
              />
            </div>
          </div>
          <div style="margin: 12px 0;">
            <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 4px;">
              Cantidad de Aprendices *
            </label>
            <input id="nuevo-aprendices" type="number" min="1"
              style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
              placeholder="Ej: 28"
            />
          </div>
          <p style="font-size: 11px; color: #9ca3af; margin: 6px 0 0 0; text-align: left;">
            * Campos obligatorios
          </p>
        </div>
      `,
      icon: 'info',
      confirmButtonText: '✅ Crear Ficha',
      confirmButtonColor: '#3ca203',
      showCancelButton: true,
      cancelButtonText: '❌ Cancelar',
      cancelButtonColor: '#ef4444',
      width: '500px',
      padding: '1.5rem',
      preConfirm: () => {
        const codigo = document.getElementById('nuevo-codigo').value;
        const programa = document.getElementById('nuevo-programa').value;
        const nivel = document.getElementById('nuevo-nivel').value;
        const jornada = document.getElementById('nuevo-jornada').value;
        const fechaInicio = document.getElementById('nuevo-fecha-inicio').value;
        const fechaFin = document.getElementById('nuevo-fecha-fin').value;
        const aprendices = document.getElementById('nuevo-aprendices').value;

        if (!codigo) {
          Swal.showValidationMessage('⚠️ Por favor selecciona un código');
          return false;
        }
        if (!programa) {
          Swal.showValidationMessage('⚠️ Por favor selecciona un programa');
          return false;
        }
        if (!fechaInicio || !fechaFin) {
          Swal.showValidationMessage('⚠️ Por favor selecciona las fechas');
          return false;
        }
        if (!aprendices || parseInt(aprendices) <= 0) {
          Swal.showValidationMessage('⚠️ Por favor ingresa la cantidad de aprendices');
          return false;
        }

        const existe = fichas.some(f => f.codigo === codigo);
        if (existe) {
          Swal.showValidationMessage(`⚠️ La ficha ${codigo} ya existe`);
          return false;
        }

        // Formatear fechas para mostrar
        const fechaInicioFormateada = new Date(fechaInicio).toLocaleDateString('es-ES');
        const fechaFinFormateada = new Date(fechaFin).toLocaleDateString('es-ES');

        return { codigo, programa, nivel, jornada, fechaInicio: fechaInicioFormateada, fechaFin: fechaFinFormateada, aprendices: parseInt(aprendices) };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const { codigo, programa, nivel, jornada, fechaInicio, fechaFin, aprendices } = result.value;

        const nuevaFicha = {
          id: fichas.length + 1,
          codigo,
          programa,
          nivel,
          aprendices,
          estado: 'Activa',
          jornada,
          fechaInicio,
          fechaFin
        };

        setFichas([...fichas, nuevaFicha]);

        Swal.fire({
          title: '✅ ¡Ficha creada exitosamente!',
          html: `
            <div style="text-align: left; padding: 10px 0;">
              <div style="background: #f0fdf4; padding: 12px; border-radius: 8px; border: 1px solid #bbf7d0;">
                <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                  <strong>Código:</strong> ${codigo}
                </p>
                <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                  <strong>Programa:</strong> ${programa}
                </p>
                <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                  <strong>Fecha Inicio:</strong> ${fechaInicio}
                </p>
                <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                  <strong>Fecha Fin:</strong> ${fechaFin}
                </p>
                <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                  <strong>Aprendices:</strong> ${aprendices}
                </p>
              </div>
              <p style="margin: 10px 0 0 0; font-size: 13px; color: #9ca3af; text-align: center;">
                La ficha ha sido creada exitosamente.
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

  return (
    <div className="gestion-fichas-container">
      {/* ========================================================== */}
      {/* MIGA DE PAN */}
      {/* ========================================================== */}
      <nav className="breadcrumb">
        <ol>
          <li>
            <Link to="/admin" className="breadcrumb-link">
              <i className="fas fa-home"></i> Inicio
            </Link>
            <span className="separator"> &gt; </span>
          </li>
          <li>
            <Link to="/admin/panel-global" className="breadcrumb-link">
              <i className="fas fa-th-large"></i> Panel Global
            </Link>
            <span className="separator"> &gt; </span>
          </li>
          <li className="active">
            <i className="fas fa-folder-open"></i> Gestión de Fichas
          </li>
        </ol>
      </nav>

      {/* ========================================================== */}
      {/* ENCABEZADO CON BOTONES */}
      {/* ========================================================== */}
      <div className="fichas-header">
        <div>
          <h2>Gestión de Fichas</h2>
          <p className="subtitulo">Administra todas las fichas de formación del sistema.</p>
        </div>
        <div className="header-buttons">
          <button 
            className="btn-carga-masiva"
            onClick={handleCargaMasiva}
          >
            <i className="fas fa-upload"></i> Carga Masiva
          </button>
          <button 
            className="btn-nueva-ficha"
            onClick={handleNuevaFicha}
          >
            <i className="fas fa-plus"></i> Nueva Ficha
          </button>
        </div>
      </div>

      {/* ========================================================== */}
      {/* BUSCADOR */}
      {/* ========================================================== */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar por código o programa..."
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

      {/* ========================================================== */}
      {/* TABLA DE FICHAS */}
      {/* ========================================================== */}
      <div className="table-wrapper">
        <table className="fichas-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Programa</th>
              <th>Nivel</th>
              <th style={{ textAlign: 'center' }}>Aprendices</th>
              <th style={{ textAlign: 'center' }}>Estado</th>
              {/* 👇 NUEVAS COLUMNAS */}
              <th style={{ textAlign: 'center' }}>Fecha Inicio</th>
              <th style={{ textAlign: 'center' }}>Fecha Fin</th>
              <th style={{ textAlign: 'center' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredFichas.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '40px' }}>
                  <i className="fas fa-exclamation-circle" style={{ color: '#dc2626', fontSize: '24px' }}></i>
                  <h3 style={{ color: '#dc2626', margin: '10px 0 5px 0' }}>Dato no encontrado</h3>
                  <p style={{ color: '#6b7280' }}>No se encontraron fichas con ese criterio.</p>
                </td>
              </tr>
            ) : (
              filteredFichas.map((ficha) => (
                <tr key={ficha.id}>
                  <td className="ficha-codigo">{ficha.codigo}</td>
                  <td>{ficha.programa}</td>
                  <td>
                    <span className={`nivel-badge ${ficha.nivel.toLowerCase()}`}>
                      {ficha.nivel}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span className="aprendices-count">{ficha.aprendices}</span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span 
                      className={`estado-badge ${ficha.estado.toLowerCase()}`}
                      style={{ 
                        background: ficha.estado === 'Activa' ? '#d1fae5' : '#fef2f2',
                        color: ficha.estado === 'Activa' ? '#065f46' : '#dc2626'
                      }}
                    >
                      <i className={`fas ${ficha.estado === 'Activa' ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
                      {ficha.estado}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>{ficha.fechaInicio}</td>
                  <td style={{ textAlign: 'center' }}>{ficha.fechaFin}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button 
                      className="btn-editar"
                      onClick={() => handleEditarFicha(ficha)}
                    >
                      <i className="fas fa-pen"></i> Editar
                    </button>
                    <button 
                      className="btn-eliminar"
                      onClick={() => handleEliminarFicha(ficha)}
                    >
                      <i className="fas fa-trash"></i> Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GestionFichas;