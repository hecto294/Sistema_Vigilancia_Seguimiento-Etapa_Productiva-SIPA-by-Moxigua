// src/pages/coordinador/DetalleAprendiz.jsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';

const DetalleAprendiz = () => {
  const navigate = useNavigate();
  const { aprendizId } = useParams();

  // Datos simulados del aprendiz
  const aprendiz = {
    id: parseInt(aprendizId),
    nombre: 'Laura Sofia Martinez',
    documento: '1.234.567-8',
    ficha: '2875901',
    programa: 'Análisis y Desarrollo de Software',
    correo: 'laura.martinez@soy.sena.edu.co',
    telefono: '310 555 1234',
    direccion: 'Calle 123 # 45-67, Bogotá',
    empresa: 'TechSoft S.A.S.',
    arl: 'SURA',
    estado: 'Activo',
    fechaInicio: '01/03/2025',
    fechaFin: '28/02/2026',
    instructor: 'Carlos Andrés López',
  };

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      {/* MIGAS DE PAN */}
      <Breadcrumb />

      {/* BOTÓN VOLVER */}
      <button
        onClick={() => navigate('/coordinador/aprendices')}
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
        <i className="fas fa-arrow-left" /> Volver a aprendices
      </button>

      {/* TARJETA DE DETALLE */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '30px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        {/* ENCABEZADO */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          paddingBottom: '20px',
          borderBottom: '2px solid #e5e7eb',
          marginBottom: '25px'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#e6f7ed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            color: '#3ca203',
            fontWeight: 'bold',
            border: '3px solid #3ca203'
          }}>
            {aprendiz.nombre.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 5px 0' }}>
              {aprendiz.nombre}
            </h2>
            <p style={{ color: '#6b7280', margin: '0' }}>
              <i className="fas fa-id-card" style={{ marginRight: '8px', color: '#3ca203' }} />
              Documento: {aprendiz.documento}
            </p>
            <p style={{ color: '#6b7280', margin: '5px 0 0 0' }}>
              <i className="fas fa-layer-group" style={{ marginRight: '8px', color: '#3ca203' }} />
              Ficha: {aprendiz.ficha} • {aprendiz.programa}
            </p>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <span style={{
              background: aprendiz.estado === 'Activo' ? '#d1fae5' : '#f3f4f6',
              color: aprendiz.estado === 'Activo' ? '#047857' : '#6b7280',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              {aprendiz.estado}
            </span>
          </div>
        </div>

        {/* GRID DE INFORMACIÓN */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
          
          {/* COLUMNA IZQUIERDA */}
          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <i className="fas fa-user" style={{ color: '#3ca203' }} />
              Datos Personales
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>Nombre completo</span>
                <span style={{ fontWeight: '500', fontSize: '14px' }}>{aprendiz.nombre}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>Documento</span>
                <span style={{ fontWeight: '500', fontSize: '14px' }}>{aprendiz.documento}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>Correo electrónico</span>
                <span style={{ fontWeight: '500', fontSize: '14px' }}>{aprendiz.correo}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>Teléfono</span>
                <span style={{ fontWeight: '500', fontSize: '14px' }}>{aprendiz.telefono}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>Dirección</span>
                <span style={{ fontWeight: '500', fontSize: '14px' }}>{aprendiz.direccion}</span>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA */}
          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <i className="fas fa-graduation-cap" style={{ color: '#3ca203' }} />
              Datos Académicos
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>Ficha</span>
                <span style={{ fontWeight: '500', fontSize: '14px' }}>{aprendiz.ficha}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>Programa</span>
                <span style={{ fontWeight: '500', fontSize: '14px' }}>{aprendiz.programa}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>Instructor</span>
                <span style={{ fontWeight: '500', fontSize: '14px' }}>{aprendiz.instructor}</span>
              </div>
            </div>

            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#1f2937',
              marginTop: '20px',
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <i className="fas fa-briefcase" style={{ color: '#3ca203' }} />
              Etapa Productiva
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>Empresa</span>
                <span style={{ fontWeight: '500', fontSize: '14px' }}>{aprendiz.empresa}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>ARL</span>
                <span style={{ fontWeight: '500', fontSize: '14px' }}>{aprendiz.arl}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>Fecha inicio</span>
                <span style={{ fontWeight: '500', fontSize: '14px' }}>{aprendiz.fechaInicio}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>Fecha fin</span>
                <span style={{ fontWeight: '500', fontSize: '14px' }}>{aprendiz.fechaFin}</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTONES */}
        <div style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'flex-end',
          marginTop: '30px',
          paddingTop: '20px',
          borderTop: '2px solid #e5e7eb'
        }}>
          <button
            onClick={() => navigate('/coordinador/aprendices')}
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
            Cerrar
          </button>
          <button
            onClick={() => alert('Funcionalidad en desarrollo')}
            style={{
              background: '#3ca203',
              color: 'white',
              border: 'none',
              padding: '10px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            <i className="fas fa-edit" /> Editar aprendiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetalleAprendiz;