// src/components/SeguimientoMomentos.jsx
import React, { useState } from 'react';
import './SeguimientoMomentos.css';

const SeguimientoMomentos = () => {
  const [momentoSeleccionado, setMomentoSeleccionado] = useState(null);

  // Datos de los 3 momentos con sus seguimientos asociados
  const [momentos, setMomentos] = useState([
    {
      id: 1,
      titulo: 'Momento 1',
      descripcion: 'Inducción y Diagnóstico Inicial',
      seguimientos: [
        { id: 1, fecha: '10/02/2025', aprendiz: 'Laura Sofia Martinez', observacion: 'Se realizó inducción general. Pendiente evaluación diagnóstica.' },
        { id: 2, fecha: '12/02/2025', aprendiz: 'Juan Diego Ramirez', observacion: 'Diagnóstico completado. Buen desempeño.' }
      ]
    },
    {
      id: 2,
      titulo: 'Momento 2',
      descripcion: 'Ejecución y Seguimiento',
      seguimientos: [
        { id: 3, fecha: '15/04/2025', aprendiz: 'Maria Camila Torres', observacion: 'Avance del 50% en el proyecto. Se recomienda refuerzo en herramientas.' },
        { id: 4, fecha: '18/04/2025', aprendiz: 'Carlos Mendoza', observacion: 'Cumplimiento de hitos. Sin novedades.' }
      ]
    },
    {
      id: 3,
      titulo: 'Momento 3',
      descripcion: 'Evaluación y Cierre',
      seguimientos: [
        { id: 5, fecha: '20/06/2025', aprendiz: 'Valentina Rojas', observacion: 'Evaluación final en proceso.' },
        { id: 6, fecha: '22/06/2025', aprendiz: 'Andrés Felipe Castro', observacion: 'Cierre de etapa completado. Certificado generado.' }
      ]
    }
  ]);

  // Función para entrar al detalle de un momento
  const handleVerMomento = (id) => {
    const momento = momentos.find(m => m.id === id);
    setMomentoSeleccionado(momento);
  };

  // Función para volver a la lista de momentos
  const handleVolver = () => {
    setMomentoSeleccionado(null);
  };

  // --- PANTALLA DE DETALLE (Ver seguimientos del momento) ---
  if (momentoSeleccionado) {
    return (
      <div className="momento-detalle-pantalla">
        <div className="detalle-header">
          <button className="btn-volver-lista" onClick={handleVolver}>
            <i className="fas fa-arrow-left"></i> Volver a momentos
          </button>
          <h2 className="detalle-titulo">{momentoSeleccionado.titulo}</h2>
          <p className="detalle-subtitulo">{momentoSeleccionado.descripcion}</p>
        </div>

        <div className="detalle-seguimientos-list">
          <h3><i className="fas fa-clipboard-list"></i> Seguimientos realizados</h3>
          {momentoSeleccionado.seguimientos.length === 0 ? (
            <p className="sin-registros">No se han registrado seguimientos para este momento aún.</p>
          ) : (
            <div className="seguimientos-grid">
              {momentoSeleccionado.seguimientos.map((seg) => (
                <div key={seg.id} className="seguimiento-card-detalle">
                  <div className="seg-header">
                    <span className="seg-fecha"><i className="fas fa-calendar-alt"></i> {seg.fecha}</span>
                    <span className="seg-aprendiz"><i className="fas fa-user"></i> {seg.aprendiz}</span>
                  </div>
                  <div className="seg-body">
                    <p>{seg.observacion}</p>
                  </div>
                  <div className="seg-actions">
                    <button className="btn-edit-seg">Editar</button>
                    <button className="btn-delete-seg">Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <button className="btn-nuevo-seguimiento">+ Nuevo seguimiento</button>
        </div>
      </div>
    );
  }

  // --- VISTA PRINCIPAL (Tarjetas de los 3 momentos) ---
  return (
    <div className="momentos-container">
      <div className="momentos-header">
        <h2>Seguimiento por Momentos</h2>
        <p className="subtitulo">Haz clic en un momento para ver los seguimientos realizados.</p>
      </div>

      <div className="momentos-grid">
        {momentos.map((momento) => (
          <div 
            key={momento.id} 
            className="momento-card-link"
            onClick={() => handleVerMomento(momento.id)}
          >
            <div className="momento-card-header">
              <h3>{momento.titulo}</h3>
              <span className="momento-cantidad">{momento.seguimientos.length} seguimientos</span>
            </div>
            <p className="momento-descripcion-corta">{momento.descripcion}</p>
            <div className="momento-flecha">
              <i className="fas fa-chevron-right"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeguimientoMomentos;