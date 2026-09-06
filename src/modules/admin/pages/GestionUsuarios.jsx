// src/pages/admin/GestionUsuarios.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './GestionUsuarios.css';

const GestionUsuarios = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      nombre: 'Carlos Andrés López',
      rol: 'Instructor',
      correo: 'carlos.lopez@soy.sena.edu.co',
      estado: 'Activo'
    },
    {
      id: 2,
      nombre: 'María Fernanda Ruiz',
      rol: 'Coordinador',
      correo: 'maria.ruiz@soy.sena.edu.co',
      estado: 'Activo'
    },
    {
      id: 3,
      nombre: 'Andrés Felipe Castro',
      rol: 'Aprendiz',
      correo: 'andres.castro@soy.sena.edu.co',
      estado: 'Activo'
    },
    {
      id: 4,
      nombre: 'Laura Sofia Martínez',
      rol: 'Aprendiz',
      correo: 'laura.martinez@soy.sena.edu.co',
      estado: 'Activo'
    },
    {
      id: 5,
      nombre: 'Juan Diego Ramirez',
      rol: 'Instructor',
      correo: 'juan.ramirez@soy.sena.edu.co',
      estado: 'Inactivo'
    }
  ]);

  // Navegar al inicio (Dashboard)
  const goToInicio = () => {
    navigate('/admin');
    window.location.reload();
  };

  const handleSearch = () => setSearchQuery(searchTerm);
  const handleClear = () => { setSearchTerm(''); setSearchQuery(''); };

  const filteredUsuarios = usuarios.filter(u =>
    u.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.rol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.correo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ==========================================================
  // FUNCIÓN PARA EDITAR USUARIO
  // ==========================================================
  const handleEditarUsuario = (usuario) => {
    // Opciones de roles para el select
    const rolesOptions = ['Aprendiz', 'Instructor', 'Coordinador', 'Administrador']
      .map(rol => `<option value="${rol}" ${usuario.rol === rol ? 'selected' : ''}>${rol}</option>`)
      .join('');

    Swal.fire({
      title: `✏️ Editar Usuario`,
      html: `
        <div style="text-align: left; padding: 5px 0;">
          <div style="margin: 12px 0;">
            <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 4px;">
              Nombre completo *
            </label>
            <input id="edit-nombre" 
              style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
              value="${usuario.nombre}"
            />
          </div>
          <div style="margin: 12px 0;">
            <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 4px;">
              Correo institucional *
            </label>
            <input id="edit-correo" 
              style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
              value="${usuario.correo}"
            />
          </div>
          <div style="margin: 12px 0;">
            <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 4px;">
              Rol *
            </label>
            <select id="edit-rol" 
              style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
            >
              ${rolesOptions}
            </select>
          </div>
          <div style="margin: 12px 0;">
            <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 4px;">
              Estado *
            </label>
            <select id="edit-estado" 
              style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
            >
              <option value="Activo" ${usuario.estado === 'Activo' ? 'selected' : ''}>Activo</option>
              <option value="Inactivo" ${usuario.estado === 'Inactivo' ? 'selected' : ''}>Inactivo</option>
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
      width: '500px',
      padding: '1.5rem',
      preConfirm: () => {
        const nombre = document.getElementById('edit-nombre').value;
        const correo = document.getElementById('edit-correo').value;
        const rol = document.getElementById('edit-rol').value;
        const estado = document.getElementById('edit-estado').value;

        if (!nombre.trim()) {
          Swal.showValidationMessage('⚠️ Por favor ingresa el nombre');
          return false;
        }
        if (!correo.trim() || !correo.includes('@')) {
          Swal.showValidationMessage('⚠️ Por favor ingresa un correo válido');
          return false;
        }

        return { nombre: nombre.trim(), correo: correo.trim(), rol, estado };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const { nombre, correo, rol, estado } = result.value;

        // Actualizar el usuario en el estado
        setUsuarios(prevUsuarios =>
          prevUsuarios.map(u => {
            if (u.id === usuario.id) {
              return {
                ...u,
                nombre: nombre,
                correo: correo,
                rol: rol,
                estado: estado
              };
            }
            return u;
          })
        );

        Swal.fire({
          title: '✅ ¡Usuario actualizado!',
          html: `
            <div style="text-align: left; padding: 10px 0;">
              <div style="background: #f0fdf4; padding: 12px; border-radius: 8px; border: 1px solid #bbf7d0;">
                <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                  <strong>Nombre:</strong> ${nombre}
                </p>
                <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                  <strong>Correo:</strong> ${correo}
                </p>
                <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                  <strong>Rol:</strong> ${rol}
                </p>
                <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                  <strong>Estado:</strong> ${estado}
                </p>
              </div>
              <p style="margin: 10px 0 0 0; font-size: 13px; color: #9ca3af; text-align: center;">
                Los datos del usuario han sido actualizados exitosamente.
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
  // FUNCIÓN PARA CARGA MASIVA DE USUARIOS
  // ==========================================================
  const handleCargaMasiva = () => {
    Swal.fire({
      title: '📤 Carga Masiva de Usuarios',
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
          <div style="margin: 15px 0;">
            <label style="display: block; font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 5px;">
              Rol de los usuarios *
            </label>
            <select id="rol-carga" 
              style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
            >
              <option value="Aprendiz">Aprendiz</option>
              <option value="Instructor">Instructor</option>
              <option value="Coordinador">Coordinador</option>
              <option value="Administrador">Administrador</option>
            </select>
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
        const rol = document.getElementById('rol-carga').value;
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

        return { file, fileName: file.name, rol, descripcion };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const { file, fileName, rol, descripcion } = result.value;

        Swal.fire({
          title: '✅ ¡Carga masiva iniciada!',
          html: `
            <div style="text-align: left; padding: 10px 0;">
              <div style="background: #f0fdf4; padding: 12px; border-radius: 8px; border: 1px solid #bbf7d0;">
                <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                  <strong>Archivo:</strong> ${fileName}
                </p>
                <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                  <strong>Rol:</strong> ${rol}
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
                  Procesando usuarios...
                </p>
              </div>
              <p style="margin: 10px 0 0 0; font-size: 13px; color: #9ca3af; text-align: center;">
                Los usuarios se están cargando en el sistema.
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
  // FUNCIÓN PARA NUEVO USUARIO
  // ==========================================================
  const handleNuevoUsuario = () => {
    Swal.fire({
      title: '👤 Nuevo Usuario',
      html: `
        <div style="text-align: left; padding: 5px 0;">
          <div style="margin: 12px 0;">
            <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 4px;">
              Nombre completo *
            </label>
            <input id="nombre-usuario" 
              style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
              placeholder="Ej: Juan Pérez"
            />
          </div>
          <div style="margin: 12px 0;">
            <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 4px;">
              Correo institucional *
            </label>
            <input id="correo-usuario" 
              style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
              placeholder="juan.perez@soy.sena.edu.co"
            />
          </div>
          <div style="margin: 12px 0;">
            <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 4px;">
              Rol *
            </label>
            <select id="rol-usuario" 
              style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
            >
              <option value="Aprendiz">Aprendiz</option>
              <option value="Instructor">Instructor</option>
              <option value="Coordinador">Coordinador</option>
              <option value="Administrador">Administrador</option>
            </select>
          </div>
          <p style="font-size: 11px; color: #9ca3af; margin: 6px 0 0 0; text-align: left;">
            * Campos obligatorios
          </p>
        </div>
      `,
      icon: 'info',
      confirmButtonText: '✅ Crear Usuario',
      confirmButtonColor: '#3ca203',
      showCancelButton: true,
      cancelButtonText: '❌ Cancelar',
      cancelButtonColor: '#ef4444',
      width: '480px',
      padding: '1.5rem',
      preConfirm: () => {
        const nombre = document.getElementById('nombre-usuario').value;
        const correo = document.getElementById('correo-usuario').value;
        const rol = document.getElementById('rol-usuario').value;

        if (!nombre.trim()) {
          Swal.showValidationMessage('⚠️ Por favor ingresa el nombre');
          return false;
        }
        if (!correo.trim() || !correo.includes('@')) {
          Swal.showValidationMessage('⚠️ Por favor ingresa un correo válido');
          return false;
        }

        return { nombre: nombre.trim(), correo: correo.trim(), rol };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const { nombre, correo, rol } = result.value;

        const nuevoUsuario = {
          id: usuarios.length + 1,
          nombre: nombre,
          rol: rol,
          correo: correo,
          estado: 'Activo'
        };

        setUsuarios([...usuarios, nuevoUsuario]);

        Swal.fire({
          title: '✅ ¡Usuario creado exitosamente!',
          html: `
            <div style="text-align: left; padding: 10px 0;">
              <div style="background: #f0fdf4; padding: 12px; border-radius: 8px; border: 1px solid #bbf7d0;">
                <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                  <strong>Nombre:</strong> ${nombre}
                </p>
                <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                  <strong>Correo:</strong> ${correo}
                </p>
                <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                  <strong>Rol:</strong> ${rol}
                </p>
              </div>
              <p style="margin: 10px 0 0 0; font-size: 13px; color: #9ca3af; text-align: center;">
                El usuario ha sido creado exitosamente.
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

  // Función para obtener el color del estado
  const getColorEstado = (estado) => {
    if (estado === 'Activo') return '#10b981';
    return '#ef4444';
  };

  return (
    <div className="gestion-usuarios-container">
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
            <i className="fas fa-users"></i> Gestión de Usuarios
          </li>
        </ol>
      </nav>

      {/* ========================================================== */}
      {/* ENCABEZADO CON BOTONES */}
      {/* ========================================================== */}
      <div className="usuarios-header">
        <div>
          <h2>Gestión de Usuarios</h2>
          <p className="subtitulo">Administra los usuarios del sistema.</p>
        </div>
        <div className="header-buttons">
          <button 
            className="btn-carga-masiva"
            onClick={handleCargaMasiva}
          >
            <i className="fas fa-upload"></i> Carga Masiva
          </button>
          <button 
            className="btn-nuevo-usuario"
            onClick={handleNuevoUsuario}
          >
            <i className="fas fa-plus"></i> Nuevo Usuario
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
          placeholder="Buscar por nombre, rol o correo..."
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
      {/* TABLA DE USUARIOS */}
      {/* ========================================================== */}
      <div className="table-wrapper">
        <table className="usuarios-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Rol</th>
              <th>Correo institucional</th>
              <th style={{ textAlign: 'center' }}>Estado</th>
              <th style={{ textAlign: 'center' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsuarios.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>
                  <i className="fas fa-exclamation-circle" style={{ color: '#dc2626', fontSize: '24px' }}></i>
                  <h3 style={{ color: '#dc2626', margin: '10px 0 5px 0' }}>Dato no encontrado</h3>
                  <p style={{ color: '#6b7280' }}>No se encontraron usuarios con ese criterio.</p>
                </td>
              </tr>
            ) : (
              filteredUsuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td className="usuario-nombre">{usuario.nombre}</td>
                  <td>
                    <span className={`rol-badge ${usuario.rol.toLowerCase()}`}>
                      {usuario.rol}
                    </span>
                  </td>
                  <td>{usuario.correo}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span 
                      className={`estado-badge ${usuario.estado.toLowerCase()}`}
                      style={{ 
                        background: `${getColorEstado(usuario.estado)}15`, 
                        color: getColorEstado(usuario.estado) 
                      }}
                    >
                      <i className={`fas ${usuario.estado === 'Activo' ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
                      {usuario.estado}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button 
                      className="btn-editar"
                      onClick={() => handleEditarUsuario(usuario)}
                    >
                      <i className="fas fa-pen"></i> Editar
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

export default GestionUsuarios;
