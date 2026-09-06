// src/pages/admin/MiPerfil.jsx
import React from 'react';

const MiPerfil = ({ user }) => {
  const perfil = {
    nombre: user?.nombre || 'Administrador General',
    rol: 'Administrador del Sistema',
    email: 'admin@sistema.sena.edu.co',
    centro: 'CGMLTI - Centro de Gestión de Mercados, Logística y Tecnologías de la Información',
    area: 'Administración del Sistema',
    usuariosTotales: 245,
    fichasTotales: 12,
    rolesActivos: 5,
    avance: 95
  };

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      <div style={{ 
        background: 'white', 
        borderRadius: '20px', 
        maxWidth: '900px', 
        width: '100%', 
        margin: '0 auto',
        padding: '30px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        border: '1px solid #e5e7eb'
      }}>
        
        {/* ENCABEZADO */}
        <div style={{ textAlign: 'center', marginBottom: '20px', borderBottom: '1px solid #e5e7eb', paddingBottom: '20px' }}>
          <div style={{ 
            width: '80px', height: '80px', 
            borderRadius: '50%', 
            border: '3px solid #3ca203',
            margin: '0 auto 10px auto',
            overflow: 'hidden'
          }}>
            <img src={user?.avatar || 'https://i.pravatar.cc/150?img=99'} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', margin: '5px 0' }}>{perfil.nombre}</h2>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>{perfil.rol}</p>
          <p style={{ color: '#9ca3af', fontSize: '13px', margin: '5px 0 0 0' }}>{perfil.email}</p>
        </div>

        {/* GRID DE DOS COLUMNAS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
          
          <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '10px' }}>
            <p style={{ fontWeight: 'bold', color: '#3ca203', fontSize: '14px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <i className="fas fa-user-cog" /> Datos del Administrador
            </p>
            <p style={{ margin: '4px 0', fontSize: '13px', color: '#374151' }}>
              <strong>Nombre:</strong> {perfil.nombre}
            </p>
            <p style={{ margin: '4px 0', fontSize: '13px', color: '#374151' }}>
              <strong>Área:</strong> {perfil.area}
            </p>
            <p style={{ margin: '4px 0', fontSize: '13px', color: '#374151', lineHeight: '1.4' }}>
              <strong>Centro:</strong> {perfil.centro}
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '10px' }}>
            <p style={{ fontWeight: 'bold', color: '#3ca203', fontSize: '14px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <i className="fas fa-chart-simple" /> Estadísticas del Sistema
            </p>
            <p style={{ margin: '4px 0', fontSize: '13px', color: '#374151' }}>
              <strong>Usuarios totales:</strong> {perfil.usuariosTotales}
            </p>
            <p style={{ margin: '4px 0', fontSize: '13px', color: '#374151' }}>
              <strong>Fichas totales:</strong> {perfil.fichasTotales}
            </p>
            <p style={{ margin: '4px 0', fontSize: '13px', color: '#374151' }}>
              <strong>Roles activos:</strong> {perfil.rolesActivos}
            </p>
          </div>
        </div>

        {/* AVANCE GENERAL */}
        <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <p style={{ margin: '4px 0', fontSize: '13px', color: '#374151' }}>
                <strong>Estado del Sistema</strong>
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontWeight: 'bold', fontSize: '20px', color: perfil.avance >= 80 ? '#10b981' : '#f59e0b' }}>
                {perfil.avance}%
              </span>
              <div style={{ width: '120px', height: '8px', background: '#f3f4f6', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{ 
                  width: `${perfil.avance}%`, 
                  height: '100%', 
                  background: perfil.avance >= 80 ? '#10b981' : '#f59e0b', 
                  borderRadius: '10px' 
                }} />
              </div>
            </div>
          </div>
          <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#6b7280', fontStyle: 'italic' }}>
            {perfil.avance >= 80 ? '✅ Sistema operando al máximo rendimiento. Todo configurado correctamente.' : 
             perfil.avance >= 50 ? '⚙️ Sistema en buen estado. Revisa las configuraciones pendientes.' : 
             '⚠️ Se requiere atención en la configuración del sistema.'}
          </p>
        </div>

      </div>
    </div>
  );
};

export default MiPerfil;
