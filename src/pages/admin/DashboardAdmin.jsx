// src/pages/admin/DashboardAdmin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardAdmin = () => {
  const navigate = useNavigate();
  const [modalAbierto, setModalAbierto] = useState(false);
  const [tituloModal, setTituloModal] = useState('');
  const [detallesModal, setDetallesModal] = useState([]);

  // Datos reales de las tarjetas
  const stats = [
    {
      id: 1,
      numero: 24,
      etiqueta: 'Usuarios Totales',
      icono: 'fa-users',
      color: '#3ca203',
      detalles: [
        '5 Administradores',
        '8 Instructores',
        '3 Coordinadores',
        '8 Aprendices'
      ]
    },
    {
      id: 2,
      numero: 12,
      etiqueta: 'Fichas Activas',
      icono: 'fa-layer-group',
      color: '#3ca203',
      ruta: '/admin/fichas'
    },
    {
      id: 3,
      numero: 4,
      etiqueta: 'Roles Activos',
      icono: 'fa-user-shield',
      color: '#3ca203',
      detalles: [
        'Instructor',
        'Coordinador',
        'Aprendiz',
        'Admin'
      ]
    },
    {
      id: 4,
      numero: 15,
      etiqueta: 'Solicitudes Pendientes',
      icono: 'fa-clock',
      color: '#3ca203',
      detalles: [
        '8 Nuevos usuarios por aprobar',
        '5 Asignaciones de empresa'
      ]
    }
  ];

  const usuariosRecientes = [
    { nombre: 'Carlos Andrés López', rol: 'Instructor', email: 'carlos@sena.edu.co', fecha: '10/08/2025' },
    { nombre: 'María Fernanda Ruiz', rol: 'Coordinador', email: 'maria@sena.edu.co', fecha: '09/08/2025' },
    { nombre: 'Andrés Felipe Castro', rol: 'Aprendiz', email: 'andres@sena.edu.co', fecha: '08/08/2025' },
  ];

  const actividad = [
    { accion: 'Nuevo usuario registrado', usuario: 'Admin', fecha: 'Hoy, 10:30 a.m.' },
    { accion: 'Ficha 2875901 actualizada', usuario: 'Coordinador', fecha: 'Hoy, 09:15 a.m.' },
    { accion: 'Certificado masivo descargado', usuario: 'Coordinador', fecha: 'Ayer, 05:00 p.m.' },
    { accion: 'Instructor Carlos A. asignado a ficha', usuario: 'Admin', fecha: 'Ayer, 02:45 p.m.' },
  ];

  const abrirModal = (id) => {
    const tarjeta = stats.find((item) => item.id === id);
    if (tarjeta) {
      if (tarjeta.ruta) {
        navigate(tarjeta.ruta);
      } else {
        setTituloModal(tarjeta.etiqueta);
        setDetallesModal(tarjeta.detalles || []);
        setModalAbierto(true);
      }
    }
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setTituloModal('');
    setDetallesModal([]);
  };

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 5px 0' }}>Panel de Control - Administrador</h2>
        <p style={{ color: '#6b7280', fontSize: '15px', margin: 0 }}>Gestión centralizada de usuarios, fichas y configuración del sistema.</p>
      </div>

      {/* 1. KPIs GERENCIALES */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
        {stats.map((item) => (
          <div
            key={item.id}
            onClick={() => abrirModal(item.id)}
            style={{
              background: 'white',
              padding: '25px',
              borderRadius: '12px',
              textAlign: 'center',
              border: '1px solid #e5e7eb',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04)',
              transition: 'all 0.25s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <i className={`fas ${item.icono}`} style={{ fontSize: '30px', color: item.color, marginBottom: '10px', display: 'block' }} />
            <h3 style={{ fontSize: '32px', fontWeight: 'bold', color: item.color, margin: '0 0 5px 0' }}>{item.numero}</h3>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>{item.etiqueta}</p>
          </div>
        ))}
      </div>

      {/* 2. ACTIVIDAD RECIENTE Y TABLA DE USUARIOS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <h4 style={{ color: '#3ca203', marginBottom: '15px' }}>Actividad Reciente</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {actividad.map((act, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                <div>
                  <p style={{ fontWeight: '500', margin: 0 }}>{act.accion}</p>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>por {act.usuario}</p>
                </div>
                <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>{act.fecha}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h4 style={{ color: '#3ca203', margin: 0 }}>Últimos usuarios</h4>
            <button 
              onClick={() => navigate('/admin/usuarios')}
              style={{ background: 'transparent', border: 'none', color: '#3ca203', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Ver todos →
            </button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ textAlign: 'left', padding: '8px', color: '#6b7280' }}>Nombre</th>
                <th style={{ textAlign: 'left', padding: '8px', color: '#6b7280' }}>Rol</th>
              </tr>
            </thead>
            <tbody>
              {usuariosRecientes.map((u, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '8px', fontWeight: '500' }}>{u.nombre}</td>
                  <td style={{ padding: '8px' }}>
                    <span style={{
                      background: u.rol === 'Instructor' ? '#d1fae5' : u.rol === 'Coordinador' ? '#e0f2fe' : '#fef3c7',
                      color: u.rol === 'Instructor' ? '#047857' : u.rol === 'Coordinador' ? '#0ea5e9' : '#d97706',
                      padding: '2px 10px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: 'bold'
                    }}>
                      {u.rol}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. ACCIONES RÁPIDAS DEL ADMIN */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '15px' }}>Acciones Rápidas</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
          <div 
            onClick={() => navigate('/admin/usuarios')}
            style={{ background: '#f8fafc', padding: '20px', borderRadius: '10px', border: '1px solid #e5e7eb', textAlign: 'center', cursor: 'pointer', transition: '0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#3ca203'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
          >
            <i className="fas fa-user-plus" style={{ fontSize: '24px', color: '#3ca203', marginBottom: '10px' }} />
            <p style={{ fontWeight: '500' }}>Nuevo Usuario</p>
          </div>
          <div 
            onClick={() => navigate('/admin/fichas')}
            style={{ background: '#f8fafc', padding: '20px', borderRadius: '10px', border: '1px solid #e5e7eb', textAlign: 'center', cursor: 'pointer', transition: '0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#3ca203'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
          >
            <i className="fas fa-layer-group" style={{ fontSize: '24px', color: '#3ca203', marginBottom: '10px' }} />
            <p style={{ fontWeight: '500' }}>Nueva Ficha</p>
          </div>
          <div 
            onClick={() => navigate('/admin/reportes')}
            style={{ background: '#f8fafc', padding: '20px', borderRadius: '10px', border: '1px solid #e5e7eb', textAlign: 'center', cursor: 'pointer', transition: '0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#3ca203'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
          >
            <i className="fas fa-chart-bar" style={{ fontSize: '24px', color: '#3ca203', marginBottom: '10px' }} />
            <p style={{ fontWeight: '500' }}>Ver Reportes</p>
          </div>
        </div>
      </div>

      {/* MODAL DE DETALLES */}
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
              maxHeight: '80vh',
              overflowY: 'auto',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
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

            <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1f2937', marginBottom: '15px' }}>
              {tituloModal}
            </h3>

            <div style={{ marginBottom: '20px' }}>
              <ul style={{ paddingLeft: '20px', color: '#374151', lineHeight: '1.8' }}>
                {detallesModal.length > 0 ? (
                  detallesModal.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))
                ) : (
                  <li style={{ color: '#6b7280', fontStyle: 'italic' }}>No hay detalles disponibles.</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardAdmin;