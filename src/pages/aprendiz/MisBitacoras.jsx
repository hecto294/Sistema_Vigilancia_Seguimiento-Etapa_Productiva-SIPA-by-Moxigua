// src/pages/aprendiz/MisBitacoras.jsx
import React, { useState } from 'react';

const MisBitacoras = () => {
  const [modalAbierta, setModalAbierta] = useState(false);
  const [bitacoraSeleccionada, setBitacoraSeleccionada] = useState(null);

  // Bitácoras con estado y observación del instructor (simuladas)
  const [bitacoras, setBitacoras] = useState([
    {
      id: 1,
      titulo: 'Semana 1',
      fecha: '10/03/2025',
      bimestre: 1,
      estado: 'Aprobada',
      observacion: '',
      contenido: 'Inducción completada. Se presentaron las normas de seguridad y el cronograma de actividades.'
    },
    {
      id: 2,
      titulo: 'Semana 2',
      fecha: '17/03/2025',
      bimestre: 1,
      estado: 'Requiere corrección',
      observacion: 'Faltan las evidencias de las pruebas diagnósticas. Por favor adjuntar los resultados.',
      contenido: 'Diagnóstico exitoso. El aprendiz demostró un nivel intermedio en herramientas ofimáticas.'
    },
    {
      id: 3,
      titulo: 'Semana 3',
      fecha: '24/03/2025',
      bimestre: 1,
      estado: 'Pendiente de revisión',
      observacion: '',
      contenido: 'Avance parcial. Se realizó la primera entrega del módulo.'
    },
  ]);

  const handleVerBitacora = (bitacora) => {
    setBitacoraSeleccionada(bitacora);
    setModalAbierta(true);
  };

  const handleCerrarModal = () => {
    setModalAbierta(false);
    setBitacoraSeleccionada(null);
  };

  // Lógica para subir la bitácora corregida
  const handleSubirBitacora = () => {
    // Solo permitimos subir si el estado es "Requiere corrección"
    if (bitacoraSeleccionada.estado !== 'Requiere corrección') {
      alert('Esta bitácora no requiere corrección.');
      return;
    }

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.docx,.txt';

    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        // Actualizamos la bitácora seleccionada con el nuevo archivo
        setBitacoras(prevBitacoras =>
          prevBitacoras.map(b =>
            b.id === bitacoraSeleccionada.id
              ? {
                  ...b,
                  titulo: file.name,
                  fecha: new Date().toLocaleDateString('es-CO'),
                  estado: 'Pendiente de revisión',
                  observacion: '',
                  contenido: 'Bitácora corregida y re-subida por el aprendiz.'
                }
              : b
          )
        );
        alert('✅ Bitácora corregida y subida exitosamente. El instructor la revisará nuevamente.');
        handleCerrarModal();
      }
    };
    input.click();
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>Mis Bitácoras</h2>
        <p style={{ color: '#6b7280' }}>Revisa el estado de tus bitácoras y las observaciones del instructor.</p>
      </div>

      {/* Lista de bitácoras organizadas por estado */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {bitacoras.map((b) => (
          <div key={b.id} style={{ background: 'white', padding: '15px', borderRadius: '12px', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}>{b.titulo}</h4>
                <p style={{ color: '#6b7280', fontSize: '13px', margin: 0 }}>{b.fecha}</p>
              </div>
              {/* Etiqueta de estado */}
              <span style={{
                padding: '3px 12px',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: 'bold',
                background: b.estado === 'Aprobada' ? '#d1fae5' :
                           b.estado === 'Requiere corrección' ? '#fef3c7' :
                           '#f3f4f6',
                color: b.estado === 'Aprobada' ? '#047857' :
                       b.estado === 'Requiere corrección' ? '#d97706' :
                       '#6b7280'
              }}>
                {b.estado}
              </span>
            </div>

            {b.estado === 'Requiere corrección' && b.observacion && (
              <div style={{
                background: '#fffbeb',
                border: '1px solid #fde68a',
                borderRadius: '8px',
                padding: '10px',
                fontSize: '13px',
                color: '#92400e'
              }}>
                <strong style={{ display: 'block', marginBottom: '4px' }}>📝 Observación del instructor:</strong>
                {b.observacion}
              </div>
            )}

            <button
              onClick={() => handleVerBitacora(b)}
              style={{
                marginTop: '5px',
                background: '#e6f7ed',
                color: '#047857',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                alignSelf: 'flex-end'
              }}
            >
              <i className="fas fa-eye" style={{ marginRight: '6px' }} /> Ver
            </button>
          </div>
        ))}
      </div>

      {/* ========================================================== */}
      {/* MODAL PARA VER BITÁCORA Y SUBIR CORRECCIÓN */}
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
              padding: '30px',
              position: 'relative',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
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
            <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '15px' }}>
              <i className="fas fa-calendar-alt" style={{ marginRight: '8px' }} />
              {bitacoraSeleccionada.fecha} • {bitacoraSeleccionada.estado}
            </p>

            {/* Contenido */}
            <div style={{ lineHeight: '1.8', fontSize: '15px', color: '#374151', marginBottom: '20px' }}>
              {bitacoraSeleccionada.contenido}
            </div>

            {/* Observación del instructor (si existe) */}
            {bitacoraSeleccionada.observacion && (
              <div style={{
                background: '#fffbeb',
                border: '1px solid #fde68a',
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '20px'
              }}>
                <p style={{ fontWeight: 'bold', color: '#92400e', margin: '0 0 5px 0' }}>
                  📝 Corrección requerida por el instructor:
                </p>
                <p style={{ color: '#78350f', margin: 0, fontSize: '14px' }}>
                  {bitacoraSeleccionada.observacion}
                </p>
              </div>
            )}

            {/* Mensaje si ya está aprobada */}
            {bitacoraSeleccionada.estado === 'Aprobada' && (
              <div style={{
                background: '#d1fae5',
                border: '1px solid #10b981',
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                <p style={{ fontWeight: 'bold', color: '#047857', margin: 0 }}>
                  ✅ ¡Esta bitácora ya está aprobada! No necesitas hacer nada más.
                </p>
              </div>
            )}

            {/* Botones */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={handleCerrarModal}
                style={{ background: '#e5e7eb', border: 'none', padding: '8px 20px', borderRadius: '6px', cursor: 'pointer' }}
              >
                Cerrar
              </button>

              {/* Solo mostramos el botón de subir si el estado es "Requiere corrección" */}
              {bitacoraSeleccionada.estado === 'Requiere corrección' && (
                <button
                  onClick={handleSubirBitacora}
                  style={{
                    background: '#3ca203',
                    color: 'white',
                    border: 'none',
                    padding: '8px 20px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <i className="fas fa-upload" /> Subir corrección
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MisBitacoras;