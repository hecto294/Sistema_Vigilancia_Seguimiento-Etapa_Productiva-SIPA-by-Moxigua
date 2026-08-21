// src/pages/admin/GestionUsuarios.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CargaMasivaUsuarios from './CargaMasivaUsuarios';

const GestionUsuarios = () => {
  const location = useLocation();
  const esApoyo = location.pathname.startsWith('/apoyo');

  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: 'Carlos Andrés López', rol: 'Instructor', email: 'carlos.lopez@soy.sena.edu.co' },
    { id: 2, nombre: 'María Fernanda Ruiz', rol: 'Coordinador', email: 'maria.ruiz@soy.sena.edu.co' },
    { id: 3, nombre: 'Andrés Felipe Castro', rol: 'Aprendiz', email: 'andres.castro@soy.sena.edu.co' },
    { id: 4, nombre: 'Laura Sofia Martinez', rol: 'Aprendiz', email: 'laura.martinez@soy.sena.edu.co' },
    { id: 5, nombre: 'Juan Diego Ramirez', rol: 'Instructor', email: 'juan.ramirez@soy.sena.edu.co' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalCargaMasiva, setModalCargaMasiva] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: '',
    rol: 'Instructor',
    email: ''
  });

  // --- Funciones de búsqueda ---
  const handleSearch = () => setSearchQuery(searchTerm);
  const handleClear = () => { setSearchTerm(''); setSearchQuery(''); };

  const filteredUsuarios = usuarios.filter(u =>
    u.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.rol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- Función para generar el correo institucional ---
  const generarCorreo = (nombre, rol) => {
    if (!nombre.trim()) return '';
    const nombreLimpio = nombre
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '.');
    return `${nombreLimpio}@soy.sena.edu.co`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario({ ...nuevoUsuario, [name]: value });
    if (name === 'nombre' || name === 'rol') {
      const nombreActual = name === 'nombre' ? value : nuevoUsuario.nombre;
      const rolActual = name === 'rol' ? value : nuevoUsuario.rol;
      const correoGenerado = generarCorreo(nombreActual, rolActual);
      setNuevoUsuario(prev => ({ ...prev, email: correoGenerado }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nuevoUsuario.nombre || !nuevoUsuario.email) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    const nuevoId = usuarios.length + 1;
    setUsuarios([...usuarios, { id: nuevoId, ...nuevoUsuario }]);
    setModalAbierto(false);
    setNuevoUsuario({ nombre: '', rol: 'Instructor', email: '' });
  };

  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => {
    setModalAbierto(false);
    setNuevoUsuario({ nombre: '', rol: 'Instructor', email: '' });
  };

  const abrirModalCargaMasiva = () => setModalCargaMasiva(true);
  const cerrarModalCargaMasiva = () => setModalCargaMasiva(false);

  const handleUsuariosCargados = (nuevosUsuarios) => {
    const usuariosConId = nuevosUsuarios.map((u, index) => ({
      ...u,
      id: usuarios.length + index + 1,
    }));
    setUsuarios([...usuarios, ...usuariosConId]);
  };

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Gestión de Usuarios</h2>
          <p style={{ color: '#6b7280' }}>
            {esApoyo ? 'Consulta de usuarios del sistema.' : 'Administra los usuarios del sistema.'}
          </p>
        </div>
        {/* --- BOTONES OCULTOS PARA APOYO --- */}
        {!esApoyo && (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={abrirModalCargaMasiva}
              style={{
                background: '#0ea5e9',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 'bold'
              }}
            >
              <i className="fas fa-upload" /> Carga Masiva
            </button>
            <button
              onClick={abrirModal}
              style={{
                background: '#3ca203',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 'bold'
              }}
            >
              <i className="fas fa-user-plus" /> Nuevo Usuario
            </button>
          </div>
        )}
      </div>

      {/* BARRA DE BÚSQUEDA */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar por nombre, rol o correo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          style={{
            flex: 1,
            padding: '10px 15px',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            fontSize: '14px',
            outline: 'none'
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            background: '#3ca203',
            color: 'white',
            border: 'none',
            padding: '10px 24px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <i className="fas fa-search" /> Buscar
        </button>
        <button
          onClick={handleClear}
          style={{
            background: '#e5e7eb',
            color: '#1f2937',
            border: 'none',
            padding: '10px 24px',
            borderRadius: '6px',
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <i className="fas fa-eraser" /> Limpiar
        </button>
      </div>

      {/* TABLA DE USUARIOS */}
      {filteredUsuarios.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          background: 'white',
          borderRadius: '12px',
          border: '1px solid #e5e7eb'
        }}>
          <i className="fas fa-exclamation-circle" style={{ fontSize: '48px', color: '#dc2626', marginBottom: '15px' }} />
          <h3 style={{ color: '#dc2626', fontSize: '22px', marginBottom: '10px' }}>Dato no encontrado</h3>
          <p style={{ color: '#6b7280', fontSize: '16px' }}>
            No se encontraron usuarios con el criterio de búsqueda: <strong>"{searchQuery}"</strong>
          </p>
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e5e7eb' }}>
          {searchQuery && (
            <div style={{ marginBottom: '15px', fontSize: '14px', color: '#6b7280' }}>
              <i className="fas fa-list" /> Mostrando {filteredUsuarios.length} de {usuarios.length} usuarios
            </div>
          )}
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Nombre</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Rol</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Correo institucional</th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsuarios.map(u => (
                <tr key={u.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px', fontWeight: '500' }}>{u.nombre}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      background: u.rol === 'Instructor' ? '#d1fae5' : u.rol === 'Coordinador' ? '#e0f2fe' : '#fef3c7',
                      color: u.rol === 'Instructor' ? '#047857' : u.rol === 'Coordinador' ? '#0ea5e9' : '#d97706',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      {u.rol}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>{u.email}</td>
                  <td style={{ textAlign: 'center', padding: '12px' }}>
                    {esApoyo ? (
                      <span style={{ color: '#9ca3af', fontSize: '13px' }}>
                        <i className="fas fa-eye" style={{ marginRight: '6px' }} /> Solo lectura
                      </span>
                    ) : (
                      <>
                        <button
                          onClick={() => alert(`Editando usuario ${u.nombre}`)}
                          style={{ background: '#e6f7ed', color: '#047857', border: 'none', padding: '4px 12px', borderRadius: '6px', marginRight: '5px', cursor: 'pointer' }}
                        >
                          <i className="fas fa-edit" /> Editar
                        </button>
                        <button
                          onClick={() => alert(`Eliminando usuario ${u.nombre}`)}
                          style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '4px 12px', borderRadius: '6px', cursor: 'pointer' }}
                        >
                          <i className="fas fa-trash" /> Eliminar
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ========================================================== */}
      {/* MODALES (SOLO PARA ADMIN) */}
      {/* ========================================================== */}
      {!esApoyo && modalAbierto && (
        // ... tu modal de creación de usuario ...
        <div>Modal de creación</div>
      )}

      {!esApoyo && modalCargaMasiva && (
        // ... tu modal de carga masiva ...
        <div>Modal de carga masiva</div>
      )}
    </div>
  );
};

export default GestionUsuarios;