// src/pages/aprendiz/DashboardAprendiz.jsx
import React from 'react';

const DashboardAprendiz = ({ user }) => {
  // Usamos React.useState en lugar de importar useState
  const [modalAbierto, setModalAbierto] = React.useState(false);
  const [tituloModal, setTituloModal] = React.useState('');
  const [detalles, setDetalles] = React.useState({ hecho: [], falta: [] });

  // Datos de progreso real del aprendiz
  const progreso = {
    momentos: {
      hecho: ['Momento 1 - Inducción completada', 'Momento 2 - Seguimiento en proceso'],
      falta: ['Momento 3 - Evaluación final pendiente']
    },
    bitacoras: {
      hecho: ['Bitácora Semana 1 subida', 'Bitácora Semana 2 subida'],
      falta: ['Bitácora Semana 3 pendiente de subir']
    },
    certificados: {
      hecho: ['Certificado de Análisis y Desarrollo de Software emitido'],
      falta: ['Certificado de competencias laborales (en trámite)']
    },
    notificaciones: {
      hecho: ['Leíste la notificación de cambio de horario', 'Leíste la alerta de entrega'],
      falta: ['Tienes 2 notificaciones sin leer']
    }
  };

  const abrirModal = (categoria, titulo) => {
    setTituloModal(titulo);
    setDetalles(progreso[categoria]);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setTituloModal('');
    setDetalles({ hecho: [], falta: [] });
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1f2937' }}>¡Hola, {user?.nombre || 'Aprendiz'}!</h2>
        <p style={{ color: '#6b7280', fontSize: '15px' }}>Haz clic en cada tarjeta para ver tu progreso y pendientes.</p>
      </div>

      {/* Tarjetas de resumen */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
        {/* Tarjeta 1: Momentos */}
        <div 
          style={{ 
            background: 'white', 
            padding: '25px', 
            borderRadius: '12px', 
            border: '1px solid #e5e7eb', 
            textAlign: 'center',
            transition: 'all 0.25s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          onClick={() => abrirModal('momentos', 'Mis Momentos')}
        >
          <i className="fas fa-check-circle" style={{ fontSize: '30px', color: '#39A900', marginBottom: '10px' }} />
          <h3 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>2</h3>
          <p style={{ color: '#6b7280', margin: 0 }}>Momentos completados</p>
        </div>

        {/* Tarjeta 2: Bitácoras */}
        <div 
          style={{ 
            background: 'white', 
            padding: '25px', 
            borderRadius: '12px', 
            border: '1px solid #e5e7eb', 
            textAlign: 'center',
            transition: 'all 0.25s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          onClick={() => abrirModal('bitacoras', 'Mis Bitácoras')}
        >
          <i className="fas fa-book" style={{ fontSize: '30px', color: '#39A900', marginBottom: '10px' }} />
          <h3 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>2</h3>
          <p style={{ color: '#6b7280', margin: 0 }}>Bitácoras subidas</p>
        </div>

        {/* Tarjeta 3: Certificados */}
        <div 
          style={{ 
            background: 'white', 
            padding: '25px', 
            borderRadius: '12px', 
            border: '1px solid #e5e7eb', 
            textAlign: 'center',
            transition: 'all 0.25s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          onClick={() => abrirModal('certificados', 'Mis Certificados')}
        >
          <i className="fas fa-certificate" style={{ fontSize: '30px', color: '#39A900', marginBottom: '10px' }} />
          <h3 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>1</h3>
          <p style={{ color: '#6b7280', margin: 0 }}>Certificado obtenido</p>
        </div>

        {/* Tarjeta 4: Notificaciones */}
        <div 
          style={{ 
            background: 'white', 
            padding: '25px', 
            borderRadius: '12px', 
            border: '1px solid #e5e7eb', 
            textAlign: 'center',
            transition: 'all 0.25s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          onClick={() => abrirModal('notificaciones', 'Mis Notificaciones')}
        >
          <i className="fas fa-bell" style={{ fontSize: '30px', color: '#39A900', marginBottom: '10px' }} />
          <h3 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>3</h3>
          <p style={{ color: '#6b7280', margin: 0 }}>Notificaciones</p>
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

            {/* Lo hecho */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#10b981', marginBottom: '10px' }}>
                <i className="fas fa-check-circle" style={{ marginRight: '8px' }} /> Lo que has hecho
              </h4>
              <ul style={{ paddingLeft: '20px', color: '#374151', lineHeight: '1.8' }}>
                {detalles.hecho.length > 0 ? (
                  detalles.hecho.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))
                ) : (
                  <li style={{ color: '#6b7280', fontStyle: 'italic' }}>Aún no has completado nada en esta categoría.</li>
                )}
              </ul>
            </div>

            {/* Lo que falta */}
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#ef4444', marginBottom: '10px' }}>
                <i className="fas fa-clock" style={{ marginRight: '8px' }} /> Lo que falta por hacer
              </h4>
              <ul style={{ paddingLeft: '20px', color: '#374151', lineHeight: '1.8' }}>
                {detalles.falta.length > 0 ? (
                  detalles.falta.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))
                ) : (
                  <li style={{ color: '#6b7280', fontStyle: 'italic' }}>¡Todo completo en esta categoría!</li>
                )}
              </ul>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardAprendiz;