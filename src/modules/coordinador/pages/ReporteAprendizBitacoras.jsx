// src/pages/coordinador/ReporteAprendizBitacoras.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ReporteAprendizBitacoras = () => {
  const { aprendizId } = useParams();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Estado para la bitácora seleccionada
  const [bitacoraSeleccionada, setBitacoraSeleccionada] = useState(null);

  const aprendiz = { id: 1, nombre: 'Laura Sofia Martinez' };

  const bitacoras = [
    { 
      id: 1, 
      titulo: 'Bitácora Semana 1', 
      fecha: '10/03/2025', 
      bimestre: 1,
      contenido: 'Se realizó la inducción general al aprendiz. Se presentaron las normas de seguridad y el cronograma de actividades para el primer mes. El aprendiz mostró una actitud positiva y participativa.'
    },
    { 
      id: 2, 
      titulo: 'Bitácora Semana 2', 
      fecha: '17/03/2025', 
      bimestre: 1,
      contenido: 'Se aplicó la prueba diagnóstica de habilidades. El aprendiz demostró un nivel intermedio en herramientas ofimáticas. Se recomienda refuerzo en Excel y trabajo en equipo.'
    },
    { 
      id: 3, 
      titulo: 'Bitácora Semana 3', 
      fecha: '24/03/2025', 
      bimestre: 1,
      contenido: 'El aprendiz inició el proyecto asignado con un enfoque metódico. Cumplió con los primeros entregables dentro del plazo establecido.'
    },
    { 
      id: 4, 
      titulo: 'Bitácora Semana 4', 
      fecha: '31/03/2025', 
      bimestre: 1,
      contenido: 'Se realizó la primera evaluación parcial. El aprendiz obtuvo un puntaje sobresaliente en la parte teórica y práctica. Se recomienda seguir así.'
    },
    { 
      id: 5, 
      titulo: 'Bitácora Semana 5', 
      fecha: '07/04/2025', 
      bimestre: 2,
      contenido: 'Se dio inicio a la fase de implementación del proyecto. El aprendiz trabaja de forma autónoma y consulta dudas oportunamente.'
    },
    { 
      id: 6, 
      titulo: 'Bitácora Semana 6', 
      fecha: '14/04/2025', 
      bimestre: 2,
      contenido: 'El aprendiz ha mostrado un avance significativo en el desarrollo de sus competencias. Se destaca por su iniciativa y creatividad.'
    },
  ];

  const handleSearch = () => setSearchQuery(searchTerm);
  const handleClear = () => { setSearchTerm(''); setSearchQuery(''); };

  // Función para ver el contenido de una bitácora
  const handleVerBitacora = (bitacora) => {
    setBitacoraSeleccionada(bitacora);
  };

  // Función para cerrar la vista de detalle
  const handleCerrarDetalle = () => {
    setBitacoraSeleccionada(null);
  };

  // Si hay una bitácora seleccionada, mostrar su contenido
  if (bitacoraSeleccionada) {
    return (
      <div style={{ width: '100%', padding: '20px 0' }}>
        <button 
          onClick={handleCerrarDetalle}
          style={{ background: 'transparent', border: 'none', color: '#3ca203', cursor: 'pointer', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <i className="fas fa-arrow-left" /> Volver a la lista
        </button>

        <div style={{ background: 'white', borderRadius: '16px', padding: '30px', border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '10px' }}>
            {bitacoraSeleccionada.titulo}
          </h2>
          <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '20px' }}>
            <i className="fas fa-calendar-alt" style={{ marginRight: '8px', color: '#3ca203' }} />
            {bitacoraSeleccionada.fecha} • Bimestre {bitacoraSeleccionada.bimestre}
          </p>
          <div style={{ lineHeight: '1.8', fontSize: '16px', color: '#374151' }}>
            {bitacoraSeleccionada.contenido}
          </div>
        </div>
      </div>
    );
  }

  // Filtrar bitácoras por búsqueda
  const filteredBitacoras = bitacoras.filter(b =>
    b.titulo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      <button 
        onClick={() => navigate(-1)}
        style={{ background: 'transparent', border: 'none', color: '#3ca203', cursor: 'pointer', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}
      >
        <i className="fas fa-arrow-left" /> Volver
      </button>

      <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Bitácoras de {aprendiz.nombre}</h2>
      <p style={{ color: '#6b7280', marginBottom: '20px' }}>Organizadas por bimestre.</p>

      {/* Barra de búsqueda */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar por título de bitácora..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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

      {filteredBitacoras.length === 0 && searchQuery !== '' && (
        <div style={{ textAlign: 'center', padding: '40px', background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <h3 style={{ color: '#dc2626' }}>Dato no encontrado</h3>
          <p style={{ color: '#6b7280' }}>No se encontraron bitácoras con ese título.</p>
        </div>
      )}

      {filteredBitacoras.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {[1, 2, 3].map((bim) => {
            const bimFiltradas = filteredBitacoras.filter(b => b.bimestre === bim);
            return (
              <div key={bim} style={{ background: 'white', padding: '15px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                <h4 style={{ color: '#3ca203', fontWeight: 'bold' }}>Bimestre {bim}</h4>
                {bimFiltradas.length > 0 ? (
                  bimFiltradas.map((b) => (
                    <div 
                      key={b.id} 
                      onClick={() => handleVerBitacora(b)}
                      style={{ 
                        padding: '8px 0', 
                        borderBottom: '1px solid #f3f4f6',
                        cursor: 'pointer',
                        transition: '0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ margin: 0, fontWeight: '500' }}>{b.titulo}</p>
                        <span style={{ 
                          background: '#e6f7ed', 
                          color: '#047857', 
                          padding: '2px 10px', 
                          borderRadius: '12px', 
                          fontSize: '11px',
                          fontWeight: 'bold'
                        }}>
                          Ver
                        </span>
                      </div>
                      <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>{b.fecha}</p>
                    </div>
                  ))
                ) : (
                  <p style={{ color: '#9ca3af', fontSize: '13px' }}>Sin bitácoras</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ReporteAprendizBitacoras;