// src/pages/aprendiz/MiPerfil.jsx
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const MiPerfil = ({ user }) => {
  // Datos del perfil (iniciales, con opción de editar)
  const [perfil, setPerfil] = useState({
    nombre: user?.nombre || 'Andrés Felipe Castro',
    rol: 'Aprendiz',
    ficha: '2875901',
    programa: 'Análisis y Desarrollo de Software',
    centro: 'CGMLTI - Centro de Gestión de Mercados, Logística y Tecnologías de la Información',
    empresa: 'TechSoft S.A.S.',
    arl: 'SURA',
    instructor: 'Carlos Andrés López',
    fechaInicio: '01/03/2025',
    fechaFin: '28/02/2026',
    avance: 78,
    email: user?.email || 'andres.castro@soy.sena.edu.co',
    telefono: '3001234567',
    avatar: user?.avatar || 'https://i.pravatar.cc/150?img=11'
  });

  // Estado para mostrar/ocultar el modal de edición
  const [showEditModal, setShowEditModal] = useState(false);

  // Función para leer la nueva foto y convertirla a base64
  const handleChangePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPerfil({ ...perfil, avatar: reader.result });
      };
    }
  };

  // Función para guardar los cambios del perfil
  const handleSaveChanges = () => {
    Swal.fire({
      title: '✅ ¡Perfil actualizado!',
      text: 'Tus datos han sido guardados correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#3ca203',
      timer: 2000,
      timerProgressBar: true
    });
    setShowEditModal(false);
  };

  return (
    <div style={{ width: '100%', padding: '30px 0', display: 'flex', justifyContent: 'center' }}>
      <div style={{ 
        background: 'white', 
        borderRadius: '20px', 
        maxWidth: '600px', 
        width: '100%', 
        padding: '30px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        border: '1px solid #e5e7eb'
      }}>
        
        {/* Encabezado con foto y nombre */}
        <div style={{ textAlign: 'center', marginBottom: '20px', borderBottom: '1px solid #e5e7eb', paddingBottom: '20px' }}>
          <div style={{ 
            width: '80px', height: '80px', 
            borderRadius: '50%', 
            border: '3px solid #3ca203',
            margin: '0 auto 10px auto',
            overflow: 'hidden'
          }}>
            <img src={perfil.avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', margin: '5px 0' }}>{perfil.nombre}</h2>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>{perfil.rol}</p>
        </div>

        {/* Grid de dos columnas */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
          
          {/* Columna Izquierda: Datos Académicos */}
          <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '10px' }}>
            <p style={{ fontWeight: 'bold', color: '#3ca203', fontSize: '14px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <i className="fas fa-user-graduate"></i> Datos Académicos
            </p>
            <p style={{ margin: '4px 0', fontSize: '13px', color: '#374151' }}><strong>Ficha:</strong> {perfil.ficha}</p>
            <p style={{ margin: '4px 0', fontSize: '13px', color: '#374151' }}><strong>Programa:</strong> {perfil.programa}</p>
            <p style={{ margin: '4px 0', fontSize: '13px', color: '#374151', lineHeight: '1.4' }}><strong>Centro:</strong> {perfil.centro}</p>
          </div>

          {/* Columna Derecha: Etapa Productiva */}
          <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '10px' }}>
            <p style={{ fontWeight: 'bold', color: '#3ca203', fontSize: '14px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <i className="fas fa-briefcase"></i> Etapa Productiva
            </p>
            <p style={{ margin: '4px 0', fontSize: '13px', color: '#374151' }}><strong>Empresa:</strong> {perfil.empresa}</p>
            <p style={{ margin: '4px 0', fontSize: '13px', color: '#374151' }}><strong>ARL:</strong> {perfil.arl}</p>
            <p style={{ margin: '4px 0', fontSize: '13px', color: '#374151' }}><strong>Instructor:</strong> {perfil.instructor}</p>
          </div>
        </div>

        {/* Fila de Fechas y Avance */}
        <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '10px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <p style={{ margin: '4px 0', fontSize: '13px', color: '#374151' }}>
                <strong>Fecha Inicio:</strong> {perfil.fechaInicio} &nbsp;|&nbsp; <strong>Fecha Fin:</strong> {perfil.fechaFin}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontWeight: 'bold', fontSize: '20px', color: perfil.avance >= 80 ? '#10b981' : '#f59e0b' }}>
                {perfil.avance}%
              </span>
              <div style={{ width: '80px', height: '6px', background: '#f3f4f6', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ width: `${perfil.avance}%`, height: '100%', background: perfil.avance >= 80 ? '#10b981' : '#f59e0b', borderRadius: '10px' }} />
              </div>
            </div>
          </div>
          <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#6b7280', fontStyle: 'italic' }}>
            {perfil.avance >= 80 ? '¡Excelente progreso!' : 'Vas por buen camino. Sigue esforzándote.'}
          </p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button 
            onClick={() => setShowEditModal(true)}
            style={{ background: '#3ca203', color: 'white', border: 'none', padding: '10px 30px', borderRadius: '30px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}
          >
            <i className="fas fa-edit"></i> Editar perfil
          </button>
        </div>

      </div>

      {/* ========================================================== */}
      {/* MODAL DE EDICIÓN */}
      {/* ========================================================== */}
      {showEditModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: 'white', borderRadius: '20px', padding: '30px',
            maxWidth: '500px', width: '90%', maxHeight: '90vh', overflowY: 'auto'
          }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#1f2937' }}>Editar Perfil</h3>

            {/* Cambiar foto */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ 
                width: '100px', height: '100px', 
                borderRadius: '50%', 
                border: '3px solid #3ca203',
                margin: '0 auto 10px auto',
                overflow: 'hidden'
              }}>
                <img src={perfil.avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <label style={{ fontSize: '13px', color: '#3ca203', cursor: 'pointer', fontWeight: 'bold' }}>
                <i className="fas fa-camera"></i> Cambiar foto
                <input type="file" accept="image/*" onChange={handleChangePhoto} style={{ display: 'none' }} />
              </label>
            </div>

            {/* Campos editables */}
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '5px' }}>Nombre completo</label>
              <input 
                type="text" 
                value={perfil.nombre}
                onChange={(e) => setPerfil({ ...perfil, nombre: e.target.value })}
                style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '5px' }}>Email</label>
                <input 
                  type="email" 
                  value={perfil.email}
                  onChange={(e) => setPerfil({ ...perfil, email: e.target.value })}
                  style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '5px' }}>Teléfono</label>
                <input 
                  type="text" 
                  value={perfil.telefono}
                  onChange={(e) => setPerfil({ ...perfil, telefono: e.target.value })}
                  style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }}
                />
              </div>
            </div>

            {/* Empresa (Solo lectura) */}
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '5px' }}>Empresa</label>
              <input 
                type="text" 
                value={perfil.empresa}
                readOnly
                style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', background: '#f3f4f6', color: '#6b7280' }}
              />
              <p style={{ fontSize: '11px', color: '#9ca3af', margin: '4px 0 0 0' }}>
                <i className="fas fa-lock"></i> La empresa asignada no puede ser modificada
              </p>
            </div>

            {/* Botones */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button 
                onClick={() => setShowEditModal(false)}
                style={{ background: '#6b7280', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}
              >
                Cancelar
              </button>
              <button 
                onClick={handleSaveChanges}
                style={{ background: '#3ca203', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiPerfil;
