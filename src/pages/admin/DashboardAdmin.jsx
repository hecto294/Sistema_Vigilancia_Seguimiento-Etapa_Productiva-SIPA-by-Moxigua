// src/pages/admin/DashboardAdmin.jsx
import React, { useState } from 'react';

const DashboardAdmin = () => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [tituloModal, setTituloModal] = useState('');
  const [detallesModal, setDetallesModal] = useState([]);

  // Datos reales de las tarjetas (ampliados)
  const stats = [
    {
      id: 1,
      numero: 15,
      etiqueta: 'Usuarios totales',
      icono: 'fa-users',
      color: '#39A900',
      detalles: [
        '8 Instructores activos',
        '3 Coordinadores',
        '4 Administradores',
        '245 Aprendices activos'
      ]
    },
    {
      id: 2,
      numero: 12,
      etiqueta: 'Fichas activas',
      icono: 'fa-layer-group',
      color: '#39A900',
      detalles: [
        '2875901 - Análisis y Desarrollo de Software',
        '2875902 - Gestión Empresarial',
        '2875903 - Contabilidad y Finanzas',
        '2875904 - Mecatrónica',
        '2875905 - Diseño Gráfico',
        '2875906 - Logística',
        '2875907 - Enfermería',
        '2875908 - Sistemas',
        '2875909 - Electricidad',
        '2875910 - Administración',
        '2875911 - Ventas',
        '2875912 - Joyería'
      ]
    },
    {
      id: 3,
      numero: 245,
      etiqueta: 'Aprendices activos',
      icono: 'fa-user-graduate',
      color: '#39A900',
      detalles: [
        'Ficha 2875901: 28 aprendices',
        'Ficha 2875902: 24 aprendices',
        'Ficha 2875903: 32 aprendices',
        'Ficha 2875904: 20 aprendices',
        'Ficha 2875905: 18 aprendices',
        'Ficha 2875906: 25 aprendices',
        'Ficha 2875907: 30 aprendices',
        'Ficha 2875908: 22 aprendices',
        'Ficha 2875909: 15 aprendices',
        'Ficha 2875910: 31 aprendices'
      ]
    },
    {
      id: 4,
      numero: 8,
      etiqueta: 'Instructores activos',
      icono: 'fa-user-tie',
      color: '#39A900',
      detalles: [
        'Carlos Andrés López',
        'Ana María Pérez',
        'Pedro Gómez',
        'Laura Rodríguez',
        'Jorge Martínez',
        'Sofía Herrera',
        'Diego Sánchez',
        'Valentina Rojas'
      ]
    }
  ];

  // Función para abrir el modal
  const abrirModal = (id) => {
    const tarjeta = stats.find((item) => item.id === id);
    if (tarjeta) {
      setTituloModal(tarjeta.etiqueta);
      setDetallesModal(tarjeta.detalles);
      setModalAbierto(true);
    }
  };

  // Función para cerrar el modal
  const cerrarModal = () => {
    setModalAbierto(false);
    setTituloModal('');
    setDetallesModal([]);
  };

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 5px 0' }}>Panel de Control - Administrador</h2>
        <p style={{ color: '#6b7280', fontSize: '15px', margin: 0 }}>Gestión centralizada de usuarios, fichas y configuraciones.</p>
      </div>

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

      {/* ========================================================== */}
      {/* MODAL DE DETALLES */}
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