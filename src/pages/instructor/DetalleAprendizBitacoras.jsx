// src/pages/instructor/DetalleAprendizBitacoras.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DetalleAprendizBitacoras = () => {
  const { aprendizId } = useParams();
  const navigate = useNavigate();

  const [modalAbierto, setModalAbierto] = useState(false);
  const [bitacoraSeleccionada, setBitacoraSeleccionada] = useState(null);

  const [bimestreSeleccionado, setBimestreSeleccionado] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Estado para el campo de observación del instructor
  const [observacionInstructor, setObservacionInstructor] = useState('');

  // Datos de los aprendices (bitácoras con estado y observación)
  const [aprendices, setAprendices] = useState([
    {
      id: 1,
      nombre: 'Laura Sofia Martinez',
      bitacoras: [
        { 
          id: 1, 
          titulo: 'Semana 1', 
          fecha: '10/03/2025', 
          bimestre: 1, 
          contenido: 'Inducción completada. Se presentaron las normas de seguridad y el cronograma de actividades.',
          estado: 'Aprobada',
          observacion: ''
        },
        { 
          id: 2, 
          titulo: 'Semana 2', 
          fecha: '17/03/2025', 
          bimestre: 1, 
          contenido: 'Diagnóstico exitoso. El aprendiz demostró un nivel intermedio en herramientas ofimáticas.',
          estado: 'Requiere corrección',
          observacion: 'Faltan las evidencias de las pruebas diagnósticas. Por favor adjuntar los resultados.'
        },
        { 
          id: 5, 
          titulo: 'Semana 5', 
          fecha: '07/04/2025', 
          bimestre: 2, 
          contenido: 'Inicio proyecto. Se dio inicio a la fase de implementación del proyecto.',
          estado: 'Pendiente',
          observacion: ''
        },
      ]
    },
    {
      id: 2,
      nombre: 'Juan Diego Ramirez',
      bitacoras: [
        { 
          id: 3, 
          titulo: 'Semana 3', 
          fecha: '24/03/2025', 
          bimestre: 1, 
          contenido: 'Avance parcial. Se realizó la primera entrega del módulo.',
          estado: 'Aprobada',
          observacion: ''
        },
      ]
    },
    {
      id: 3,
      nombre: 'Maria Camila Torres',
      bitacoras: [
        { 
          id: 7, 
          titulo: 'Semana 7', 
          fecha: '21/04/2025', 
          bimestre: 2, 
          contenido: 'Revisión de código. Se realizó la primera revisión del código fuente.',
          estado: 'Requiere corrección',
          observacion: 'El código no sigue las normas de estilo. Por favor revisar.'
        },
      ]
    }
  ]);

  const aprendiz = aprendices.find(a => a.id === parseInt(aprendizId));

  if (!aprendiz) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h3 style={{ color: '#dc2626' }}>Aprendiz no encontrado</h3>
      </div>
    );
  }

  const handleSearch = () => setSearchQuery(searchTerm);
  const handleClear = () => { setSearchTerm(''); setSearchQuery(''); };

  const bitacorasFiltradas = aprendiz.bitacoras.filter(b =>
    b.titulo.toLowerCase().includes(searchQuery.toLowerCase()) &&
    b.bimestre === bimestreSeleccionado
  );

  // --- Lógica del modal ---
  const handleVerBitacora = (bitacora) => {
    setBitacoraSeleccionada(bitacora);
    setObservacionInstructor(bitacora.observacion || '');
    setModalAbierto(true);
  };

  const handleCerrarModal = () => {
    setModalAbierto(false);
    setBitacoraSeleccionada(null);
    setObservacionInstructor('');
  };

  // --- Guardar observación del instructor ---
  const handleGuardarObservacion = () => {
    setAprendices(prevAprendices =>
      prevAprendices.map(a =>
        a.id === parseInt(aprendizId)
          ? {
              ...a,
              bitacoras: a.bitacoras.map(b =>
                b.id === bitacoraSeleccionada.id
                  ? { ...b, observacion: observacionInstructor, estado: 'Requiere corrección' }
                  : b
              )
            }
          : a
      )
    );
    alert('✅ Observación guardada. El aprendiz podrá verla al abrir la bitácora.');
    handleCerrarModal();
  };

  // --- Lógica para subir la bitácora ---
  const handleSubirBitacora = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.docx,.txt';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setAprendices(prevAprendices =>
          prevAprendices.map(a =>
            a.id === parseInt(aprendizId)
              ? {
                  ...a,
                  bitacoras: a.bitacoras.map(b =>
                    b.id === bitacoraSeleccionada.id
                      ? {
                          ...b,
                          titulo: file.name,
                          fecha: new Date().toLocaleDateString('es-CO'),
                          contenido: 'Bitácora subida por el aprendiz con las correcciones solicitadas.',
                          estado: 'Pendiente de revisión',
                          observacion: ''
                        }
                      : b
                  )
                }
              : a
          )
        );
        alert(`✅ Bitácora subida exitosamente. El instructor la revisará nuevamente.`);
        handleCerrarModal();
      }
    };
    input.click();
  };

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      <button
        onClick={() => navigate('/instructor/bitacora')}
        style={{ background: 'transparent', border: 'none', color: '#3ca203', cursor: 'pointer', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}
      >
        <i className="fas fa-arrow-left" /> Volver a bitácoras
      </button>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
        Bitácoras de {aprendiz.nombre}
      </h2>
      <p style={{ color: '#6b7280', marginBottom: '20px' }}>Organizadas por bimestre.</p>

      {/* Filtros de bimestre */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {[1, 2, 3].map((bim) => (
          <button
            key={bim}
            onClick={() => setBimestreSeleccionado(bim)}
            style={{
              padding: '6px 16px',
              background: bimestreSeleccionado === bim ? '#3ca203' : '#f8fafc',
              color: bimestreSeleccionado === bim ? 'white' : '#1f2937',
              border: '1px solid #e5e7eb',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Bimestre {bim}
          </button>
        ))}
      </div>

      {/* Barra de búsqueda */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar bitácora por título..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          style={{ flex: 1, padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
        />
        <button
          onClick={handleSearch}
          style={{
            background: '#3ca203',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Buscar
        </button>
        <button
          onClick={handleClear}
          style={{
            background: '#e5e7eb',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Limpiar
        </button>
      </div>

      {/* Lista de bitácoras */}
      <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
        {bitacorasFiltradas.length > 0 ? (
          bitacorasFiltradas.map((b) => (
            <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #e5e7eb' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <p style={{ fontWeight: '500', margin: 0 }}>{b.titulo}</p>
                  <span style={{
                    fontSize: '10px',
                    padding: '2px 10px',
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    background: b.estado === 'Aprobada' ? '#d1fae5' : b.estado === 'Requiere corrección' ? '#fef3c7' : '#f3f4f6',
                    color: b.estado === 'Aprobada' ? '#047857' : b.estado === 'Requiere corrección' ? '#d97706' : '#6b7280'
                  }}>
                    {b.estado}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>{b.fecha}</p>
              </div>
              <button
                onClick={() => handleVerBitacora(b)}
                style={{
                  background: '#e6f7ed',
                  color: '#047857',
                  border: 'none',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                <i className="fas fa-eye" style={{ marginRight: '6px' }} /> Ver
              </button>
            </div>
          ))
        ) : (
          <p style={{ color: '#6b7280', textAlign: 'center' }}>
            {searchQuery !== '' ? 'No se encontraron bitácoras con ese título.' : 'No hay bitácoras para este bimestre.'}
          </p>
        )}
      </div>

      {/* ========================================================== */}
      {/* MODAL DE VISTA PREVIA, OBSERVACIÓN Y SUBIDA */}
      {/* ========================================================== */}
      {modalAbierto && bitacoraSeleccionada && (
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
            <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '20px' }}>
              <i className="fas fa-calendar-alt" style={{ marginRight: '8px' }} />
              {bitacoraSeleccionada.fecha}
            </p>

            {/* Contenido de la bitácora */}
            <div style={{ lineHeight: '1.8', fontSize: '15px', color: '#374151', marginBottom: '25px' }}>
              {bitacoraSeleccionada.contenido}
            </div>

            {/* Campo de observación del instructor */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '5px', color: '#1f2937' }}>
                📝 Observación del instructor (requerimiento de corrección)
              </label>
              <textarea
                value={observacionInstructor}
                onChange={(e) => setObservacionInstructor(e.target.value)}
                placeholder="Escribe aquí lo que el aprendiz debe corregir..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Botones de acción */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <button
                onClick={handleCerrarModal}
                style={{ background: '#e5e7eb', border: 'none', padding: '8px 20px', borderRadius: '6px', cursor: 'pointer' }}
              >
                Cerrar
              </button>
              <button
                onClick={handleGuardarObservacion}
                style={{
                  background: '#f59e0b',
                  color: 'white',
                  border: 'none',
                  padding: '8px 20px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                <i className="fas fa-pen" /> Guardar observación
              </button>
              {/* --- BOTÓN SUBIR (ANTES RE-SUBIR) --- */}
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
                <i className="fas fa-upload" /> Subir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetalleAprendizBitacoras;