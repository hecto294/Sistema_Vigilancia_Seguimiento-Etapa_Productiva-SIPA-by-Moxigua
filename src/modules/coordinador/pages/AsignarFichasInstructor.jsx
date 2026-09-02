// src/pages/coordinador/AsignarFichasInstructor.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '@/modules/shared/components/Breadcrumb'; // <--- CORREGIDO
import { showSuccess, showError, showWarning, showConfirm, showToast } from '@/core/utils/sweetAlert'; // <--- CORREGIDO

const AsignarFichasInstructor = () => {
  const navigate = useNavigate();
  const { instructorId } = useParams();

  // Datos del instructor
  const instructor = {
    id: parseInt(instructorId),
    nombre: 'Carlos Andrés López',
    email: 'carlos@sena.edu.co',
    fichasActuales: 2,
  };

  // Fichas disponibles
  const [fichasDisponibles, setFichasDisponibles] = useState([
    { id: '2875901', programa: 'Análisis y Desarrollo de Software', asignada: true },
    { id: '2875902', programa: 'Gestión Empresarial', asignada: true },
    { id: '2875903', programa: 'Contabilidad y Finanzas', asignada: false },
  ]);

  const toggleAsignacion = (id) => {
    setFichasDisponibles(fichasDisponibles.map(f =>
      f.id === id ? { ...f, asignada: !f.asignada } : f
    ));
  };

  const handleGuardar = async () => {
    const asignadas = fichasDisponibles.filter(f => f.asignada);
    const totalFichas = asignadas.length;

    // Mostrar confirmación antes de guardar
    const result = await showConfirm(
      `¿Estás seguro de guardar los cambios? El instructor ${instructor.nombre} tendrá ${totalFichas} fichas asignadas.`,
      'Confirmar asignación',
      'Sí, guardar'
    );

    if (result.isConfirmed) {
      // Mostrar éxito con SweetAlert
      await showSuccess(
        `Asignaciones guardadas. El instructor ahora tiene ${totalFichas} fichas.`,
        '✅ Asignación exitosa'
      );
      
      // Redirigir
      navigate('/coordinador/instructores');
    }
  };

  // Separar fichas para mostrar
  const fichasAsignadas = fichasDisponibles.filter(f => f.asignada);
  const fichasNoAsignadas = fichasDisponibles.filter(f => !f.asignada);

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      {/* MIGAS DE PAN */}
      <Breadcrumb />

      {/* BOTÓN VOLVER */}
      <button
        onClick={() => navigate('/coordinador/instructores')}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#3ca203',
          cursor: 'pointer',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '14px',
          fontWeight: '500'
        }}
      >
        <i className="fas fa-arrow-left" /> Volver a instructores
      </button>

      {/* ENCABEZADO */}
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 5px 0' }}>
          Asignar Fichas a {instructor.nombre}
        </h2>
        <p style={{ color: '#6b7280', margin: 0 }}>
          Email: {instructor.email} • Fichas actuales: {instructor.fichasActuales}
        </p>
      </div>

      {/* LISTA DE FICHAS */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e5e7eb', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px', color: '#1f2937' }}>
          Fichas disponibles
        </h3>
        <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '15px' }}>
          Selecciona o deselecciona las fichas que deseas asignar a este instructor.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          {fichasDisponibles.map(f => (
            <div
              key={f.id}
              onClick={() => toggleAsignacion(f.id)}
              style={{
                background: f.asignada ? '#d1fae5' : 'white',
                border: f.asignada ? '2px solid #3ca203' : '2px solid #e5e7eb',
                borderRadius: '10px',
                padding: '15px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
              onMouseEnter={(e) => {
                if (!f.asignada) e.currentTarget.style.borderColor = '#3ca203';
              }}
              onMouseLeave={(e) => {
                if (!f.asignada) e.currentTarget.style.borderColor = '#e5e7eb';
              }}
            >
              <div>
                <strong style={{ color: '#1f2937', fontSize: '16px' }}>{f.id}</strong>
                <p style={{ color: '#6b7280', fontSize: '14px', margin: '5px 0 0 0' }}>{f.programa}</p>
              </div>
              <div>
                {f.asignada ? (
                  <span style={{ color: '#047857', fontWeight: 'bold' }}>
                    <i className="fas fa-check-circle" /> Asignada
                  </span>
                ) : (
                  <span style={{ color: '#6b7280', fontWeight: 'bold' }}>
                    <i className="fas fa-plus-circle" /> Disponible
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RESUMEN */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div style={{ background: 'white', borderRadius: '12px', padding: '15px', border: '1px solid #d1fae5' }}>
          <h4 style={{ color: '#047857', margin: '0 0 5px 0' }}>
            <i className="fas fa-check-circle" /> Asignadas ({fichasAsignadas.length})
          </h4>
          <p style={{ color: '#6b7280', fontSize: '13px', margin: 0 }}>
            {fichasAsignadas.map(f => f.id).join(', ') || 'Ninguna'}
          </p>
        </div>
        <div style={{ background: 'white', borderRadius: '12px', padding: '15px', border: '1px solid #e5e7eb' }}>
          <h4 style={{ color: '#6b7280', margin: '0 0 5px 0' }}>
            <i className="fas fa-times-circle" /> No asignadas ({fichasNoAsignadas.length})
          </h4>
          <p style={{ color: '#6b7280', fontSize: '13px', margin: 0 }}>
            {fichasNoAsignadas.map(f => f.id).join(', ') || 'Ninguna'}
          </p>
        </div>
      </div>

      {/* BOTONES */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
        <button
          onClick={() => navigate('/coordinador/instructores')}
          style={{
            background: '#e5e7eb',
            border: 'none',
            padding: '10px 24px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '14px'
          }}
        >
          Cancelar
        </button>
        <button
          onClick={handleGuardar}
          style={{
            background: '#3ca203',
            color: 'white',
            border: 'none',
            padding: '10px 24px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#2d8a00'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#3ca203'}
        >
          <i className="fas fa-save" /> Guardar cambios
        </button>
      </div>
    </div>
  );
};

export default AsignarFichasInstructor;