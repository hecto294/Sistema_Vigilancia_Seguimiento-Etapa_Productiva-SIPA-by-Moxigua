// src/pages/admin/GestionUsuarios.jsx
import React, { useState } from 'react';

const GestionUsuarios = () => {
  // Estado para la lista de usuarios
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: 'Carlos Andrés López', rol: 'Instructor', email: 'carlos@sena.edu.co' },
    { id: 2, nombre: 'María Fernanda Ruiz', rol: 'Coordinador', email: 'maria@sena.edu.co' },
    { id: 3, nombre: 'Andrés Felipe Castro', rol: 'Aprendiz', email: 'andres@sena.edu.co' },
  ]);

  // Estado para el formulario modal
  const [modalAbierto, setModalAbierto] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: '',
    rol: 'Instructor',
    email: ''
  });

  // Funciones del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario({ ...nuevoUsuario, [name]: value });
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

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Gestión de Usuarios</h2>
          <p style={{ color: '#6b7280' }}>Administra los usuarios del sistema.</p>
        </div>
        <button
          onClick={abrirModal}
          style={{ background: '#39A900', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <i className="fas fa-user-plus" /> Nuevo Usuario
        </button>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e5e7eb' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ textAlign: 'left', padding: '12px' }}>Nombre</th>
              <th style={{ textAlign: 'left', padding: '12px' }}>Rol</th>
              <th style={{ textAlign: 'left', padding: '12px' }}>Email</th>
              <th style={{ textAlign: 'center', padding: '12px' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(u => (
              <tr key={u.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}>{u.nombre}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    background: u.rol === 'Instructor' ? '#d1fae5' : u.rol === 'Coordinador' ? '#e0f2fe' : '#fef3c7',
                    color: u.rol === 'Instructor' ? '#047857' : u.rol === 'Coordinador' ? '#0ea5e9' : '#d97706',
                    padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold'
                  }}>
                    {u.rol}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>{u.email}</td>
                <td style={{ textAlign: 'center', padding: '12px' }}>
                  <button style={{ background: '#e6f7ed', color: '#047857', border: 'none', padding: '4px 12px', borderRadius: '6px', marginRight: '5px', cursor: 'pointer' }}>
                    Editar
                  </button>
                  <button style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '4px 12px', borderRadius: '6px', cursor: 'pointer' }}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ========================================================== */}
      {/* MODAL DE CREACIÓN DE USUARIO */}
      {/* ========================================================== */}
      {modalAbierto && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000
          }}
          onClick={cerrarModal}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '16px',
              maxWidth: '500px',
              width: '90%',
              padding: '30px',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={cerrarModal}
              style={{
                position: 'absolute',
                top: '15px',
                right: '20px',
                background: 'transparent',
                border: 'none',
                fontSize: '28px',
                color: '#6b7280',
                cursor: 'pointer'
              }}
            >
              &times;
            </button>

            <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '20px' }}>Crear Nuevo Usuario</h3>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Nombre completo</label>
                <input
                  type="text"
                  name="nombre"
                  value={nuevoUsuario.nombre}
                  onChange={handleChange}
                  placeholder="Ej. Ana María Pérez"
                  style={{ width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Rol</label>
                <select
                  name="rol"
                  value={nuevoUsuario.rol}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                >
                  <option value="Instructor">Instructor</option>
                  <option value="Coordinador">Coordinador</option>
                  <option value="Aprendiz">Aprendiz</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  value={nuevoUsuario.email}
                  onChange={handleChange}
                  placeholder="ejemplo@sena.edu.co"
                  style={{ width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={cerrarModal}
                  style={{ background: '#e5e7eb', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{ background: '#39A900', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}
                >
                  Crear Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionUsuarios;