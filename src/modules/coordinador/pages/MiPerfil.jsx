// src/pages/coordinador/MiPerfil.jsx
import React from 'react';

const MiPerfil = ({ user }) => {
  const perfil = {
    nombre: user?.nombre || 'María Fernanda Ruiz',
    rol: 'Coordinador de Etapa Productiva',
    email: 'maria.ruiz@soy.sena.edu.co',
    centro: 'CGMLTI - Centro de Gestión de Mercados, Logística y Tecnologías de la Información',
    area: 'Coordinación Académica',
    fichasGestionadas: [
      { id: '2875901', programa: 'Análisis y Desarrollo de Software', aprendices: 28, estado: 'Activa' },
      { id: '2875902', programa: 'Gestión Empresarial', aprendices: 24, estado: 'Activa' },
      { id: '2875903', programa: 'Contabilidad y Finanzas', aprendices: 32, estado: 'Inactiva' },
    ],
    totalAprendices: 84,
    empresasConvenio: 12,
    avance: 82
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
            <img src={user?.avatar || 'https://i.pravatar.cc/150?img=5'} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', margin: '5px 0' }}>{perfil.nombre}</h2>
          <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>{perfil.rol}</p>
          <p style={{ color: '#9ca3af', fontSize: '13px', margin: '5px 0 0 0' }}>{perfil.email}</p>
        </div>

        {/* GRID DE DOS COLUMNAS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
          
          <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '10px' }}>
            <p style={{ fontWeight: 'bold', color: '#3ca203', fontSize: '14px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <i className="fas fa-user-tie" /> Datos del Coordinador
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
              <i className="fas fa-chart-simple" /> Estadísticas
            </p>
            <p style={{ margin: '4px 0', fontSize: '13px', color: '#374151' }}>
              <strong>Fichas gestionadas:</strong> {perfil.fichasGestionadas.length}
            </p>
            <p style={{ margin: '4px 0', fontSize: '13px', color: '#374151' }}>
              <strong>Total aprendices:</strong> {perfil.totalAprendices}
            </p>
            <p style={{ margin: '4px 0', fontSize: '13px', color: '#374151' }}>
              <strong>Empresas en convenio:</strong> {perfil.empresasConvenio}
            </p>
          </div>
        </div>

        {/* FICHAS GESTIONADAS */}
        <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '10px', marginBottom: '20px' }}>
          <p style={{ fontWeight: 'bold', color: '#3ca203', fontSize: '14px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <i className="fas fa-layer-group" /> Fichas gestionadas
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                  <th style={{ textAlign: 'left', padding: '8px', color: '#6b7280' }}>Código</th>
                  <th style={{ textAlign: 'left', padding: '8px', color: '#6b7280' }}>Programa</th>
                  <th style={{ textAlign: 'center', padding: '8px', color: '#6b7280' }}>Aprendices</th>
                  <th style={{ textAlign: 'center', padding: '8px', color: '#6b7280' }}>Estado</th>
                </tr>
              </thead>
              <tbody>
                {perfil.fichasGestionadas.map((ficha, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '8px', fontWeight: 'bold', color: '#3ca203' }}>{ficha.id}</td>
                    <td style={{ padding: '8px' }}>{ficha.programa}</td>
                    <td style={{ textAlign: 'center', padding: '8px' }}>{ficha.aprendices}</td>
                    <td style={{ textAlign: 'center', padding: '8px' }}>
                      <span style={{
                        background: ficha.estado === 'Activa' ? '#d1fae5' : '#f3f4f6',
                        color: ficha.estado === 'Activa' ? '#047857' : '#6b7280',
                        padding: '2px 12px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: 'bold'
                      }}>
                        {ficha.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AVANCE GENERAL */}
        <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <p style={{ margin: '4px 0', fontSize: '13px', color: '#374151' }}>
                <strong>Avance General</strong>
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
            {perfil.avance >= 80 ? '¡Excelente gestión! Las fichas están muy bien administradas.' : 
             perfil.avance >= 50 ? 'Vas por buen camino. Sigue coordinando eficientemente.' : 
             'Aún hay trabajo por hacer. ¡Ánimo!'}
          </p>
        </div>

      </div>
    </div>
  );
};

export default MiPerfil;