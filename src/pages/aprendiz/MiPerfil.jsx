// src/pages/aprendiz/MiPerfil.jsx
import React from 'react';

const MiPerfil = ({ user }) => {
  return (
    <div>
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Mi Perfil</h2>
        <p style={{ color: '#6b7280' }}>Tus datos personales y de formación.</p>
      </div>

      <div style={{ background: 'white', padding: '25px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <p style={{ fontWeight: 'bold', color: '#6b7280' }}>Nombre completo</p>
            <p style={{ fontSize: '16px', fontWeight: '500' }}>{user?.nombre || 'Aprendiz'}</p>
          </div>
          <div>
            <p style={{ fontWeight: 'bold', color: '#6b7280' }}>Rol</p>
            <p style={{ fontSize: '16px', fontWeight: '500' }}>Aprendiz SENA</p>
          </div>
          <div>
            <p style={{ fontWeight: 'bold', color: '#6b7280' }}>Ficha</p>
            <p style={{ fontSize: '16px', fontWeight: '500' }}>2875901</p>
          </div>
          <div>
            <p style={{ fontWeight: 'bold', color: '#6b7280' }}>Programa</p>
            <p style={{ fontSize: '16px', fontWeight: '500' }}>Análisis y Desarrollo de Software</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiPerfil;