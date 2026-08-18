// src/pages/aprendiz/MisBitacoras.jsx
import React, { useState } from 'react';

const MisBitacoras = () => {
  const [bitacoras, setBitacoras] = useState([
    { 
      titulo: 'Bitácora Semana 1', 
      fecha: '10/03/2025', 
      contenido: 'Realicé la inducción general al programa de formación. Se presentaron las normas de seguridad y el cronograma de actividades para el primer mes. Me asignaron las herramientas de trabajo para iniciar la etapa productiva.' 
    },
    { 
      titulo: 'Bitácora Semana 2', 
      fecha: '17/03/2025', 
      contenido: 'Inicié el diagnóstico de habilidades. Demostré un nivel intermedio en herramientas ofimáticas. El instructor recomendó refuerzo en Excel y trabajo en equipo.' 
    },
  ]);

  const [modalAbierta, setModalAbierta] = useState(false);
  const [bitacoraSeleccionada, setBitacoraSeleccionada] = useState(null);

  const handleSubirBitacora = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.docx,.txt';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const nueva = {
          titulo: file.name,
          fecha: new Date().toLocaleDateString('es-CO'),
          contenido: 'Contenido de la bitácora subida por el aprendiz.'
        };
        setBitacoras([nueva, ...bitacoras]);
        alert('Bitácora subida exitosamente.');
      }
    };
    input.click();
  };

  const handleVerBitacora = (bitacora) => {
    setBitacoraSeleccionada(bitacora);
    setModalAbierta(true);
  };

  const handleCerrarModal = () => {
    setModalAbierta(false);
    setBitacoraSeleccionada(null);
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>Mis Bitacoras</h2>
          <p style={{ color: '#6b7280' }}>Sube y administra tus bitácoras de seguimiento.</p>
        </div>
        <button 
          onClick={handleSubirBitacora}
          style={{ background: '#39A900', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          <i className="fas fa-upload" style={{ marginRight: '8px' }} /> Subir bitácora
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {bitacoras.map((b, i) => (
          <div 
            key={i} 
            style={{ 
              background: 'white', 
              padding: '20px', 
              borderRadius: '12px', 
              border: '1px solid #e5e7eb',
              transition: 'all 0.25s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}>{b.titulo}</h4>
            <p style={{ color: '#6b7280' }}>{b.fecha}</p>
            <button 
              onClick={() => handleVerBitacora(b)}
              style={{ background: '#e6f7ed', color: '#047857', border: 'none', padding: '4px 14px', borderRadius: '20px', cursor: 'pointer' }}
            >
              <i className="fas fa-eye" style={{ marginRight: '6px' }} /> Ver
            </button>
          </div>
        ))}
      </div>

      {/* ========================================================== */}
      {/* MODAL DE VISTA PREVIA DE LA BITÁCORA */}
      {/* ========================================================== */}
      {modalAbierta && bitacoraSeleccionada && (
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
          onClick={handleCerrarModal}
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
              onClick={handleCerrarModal}
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

            <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1f2937', marginBottom: '10px' }}>
              {bitacoraSeleccionada.titulo}
            </h3>
            <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '20px' }}>
              <i className="fas fa-calendar-alt" style={{ marginRight: '8px' }} />
              {bitacoraSeleccionada.fecha}
            </p>
            <div style={{ lineHeight: '1.8', fontSize: '15px', color: '#374151' }}>
              {bitacoraSeleccionada.contenido}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MisBitacoras;