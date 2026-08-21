// src/pages/coordinador/DashboardCoordinador.jsx
import React from 'react';

const DashboardCoordinador = () => {
  // Datos simulados para el tablero de control (sin acciones)
  const stats = [
    { id: 1, numero: 12, etiqueta: 'Fichas Activas', icono: 'fa-layer-group', color: '#39A900' },
    { id: 2, numero: 245, etiqueta: 'Aprendices en Etapa', icono: 'fa-users', color: '#39A900' },
    { id: 3, numero: 8, etiqueta: 'Instructores Activos', icono: 'fa-chalkboard-teacher', color: '#39A900' },
    { id: 4, numero: 38, etiqueta: 'Certificados Listos', icono: 'fa-certificate', color: '#39A900' },
  ];

  // Datos de las fichas
  const fichas = [
    { id: '2875901', programa: 'Análisis y Desarrollo de Software', estado: 'Activa', instructor: 'Carlos A.', aprendices: 28, finalizacion: '15/12/2025' },
    { id: '2875902', programa: 'Gestión Empresarial', estado: 'Activa', instructor: 'Ana P.', aprendices: 24, finalizacion: '10/01/2026' },
    { id: '2875903', programa: 'Contabilidad y Finanzas', estado: 'Activa', instructor: 'Pedro G.', aprendices: 32, finalizacion: '05/11/2025' },
    { id: '2875904', programa: 'Mecatrónica', estado: 'Inactiva', instructor: '-', aprendices: 20, finalizacion: '-' },
  ];

  // Datos de instructores
  const instructores = [
    { nombre: 'Carlos A.', fichas: 2, aprendices: 52 },
    { nombre: 'Ana P.', fichas: 1, aprendices: 24 },
    { nombre: 'Pedro G.', fichas: 1, aprendices: 32 },
    { nombre: 'Laura R.', fichas: 1, aprendices: 28 },
  ];

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 5px 0' }}>Panel Global - Coordinador</h2>
        <p style={{ color: '#6b7280', fontSize: '15px', margin: 0 }}>Visión general del estado de la etapa productiva.</p>
      </div>

      {/* 1. KPIs PRINCIPALES (Estáticos) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
        {stats.map((item) => (
          <div
            key={item.id}
            style={{
              background: 'white',
              padding: '25px',
              borderRadius: '12px',
              textAlign: 'center',
              border: '1px solid #e5e7eb',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04)'
            }}
          >
            <i className={`fas ${item.icono}`} style={{ fontSize: '30px', color: item.color, marginBottom: '10px', display: 'block' }} />
            <h3 style={{ fontSize: '32px', fontWeight: 'bold', color: item.color, margin: '0 0 5px 0' }}>{item.numero}</h3>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>{item.etiqueta}</p>
          </div>
        ))}
      </div>

      {/* 2. SECCIÓN DE FICHAS */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '15px' }}>Estado de Fichas</h3>
        <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e5e7eb', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ textAlign: 'left', padding: '12px' }}>Ficha</th>
                <th style={{ textAlign: 'left', padding: '12px' }}>Programa</th>
                <th style={{ textAlign: 'left', padding: '12px' }}>Instructor</th>
                <th style={{ textAlign: 'center', padding: '12px' }}>Aprendices</th>
                <th style={{ textAlign: 'center', padding: '12px' }}>Finalizacion</th>
                <th style={{ textAlign: 'center', padding: '12px' }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {fichas.map((f) => (
                <tr key={f.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>{f.id}</td>
                  <td style={{ padding: '12px' }}>{f.programa}</td>
                  <td style={{ padding: '12px' }}>{f.instructor}</td>
                  <td style={{ textAlign: 'center', padding: '12px' }}>{f.aprendices}</td>
                  <td style={{ textAlign: 'center', padding: '12px' }}>{f.finalizacion}</td>
                  <td style={{ textAlign: 'center', padding: '12px' }}>
                    <span style={{
                      background: f.estado === 'Activa' ? '#d1fae5' : '#f3f4f6',
                      color: f.estado === 'Activa' ? '#047857' : '#6b7280',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      {f.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. ESTADÍSTICAS POR INSTRUCTOR */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '15px' }}>Carga de Instructores</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {instructores.map((inst, idx) => (
            <div key={idx} style={{ background: 'white', padding: '15px', borderRadius: '12px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
              <p style={{ fontWeight: 'bold', color: '#1f2937' }}>{inst.nombre}</p>
              <p style={{ fontSize: '12px', color: '#6b7280' }}>Fichas: {inst.fichas}</p>
              <p style={{ fontSize: '12px', color: '#6b7280' }}>Aprendices: {inst.aprendices}</p>
              <div style={{ width: '100%', height: '6px', background: '#f3f4f6', borderRadius: '10px', marginTop: '5px', overflow: 'hidden' }}>
                <div style={{ width: `${(inst.aprendices / 60) * 100}%`, height: '100%', background: '#39A900', borderRadius: '10px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. CERTIFICACIONES Y ESTADÍSTICAS RÁPIDAS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <h4 style={{ color: '#39A900', marginBottom: '10px' }}>Certificaciones</h4>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>38</p>
          <p style={{ color: '#6b7280' }}>Certificados listos para descargar</p>
          <div style={{ width: '100%', height: '6px', background: '#f3f4f6', borderRadius: '10px', marginTop: '10px', overflow: 'hidden' }}>
            <div style={{ width: '70%', height: '100%', background: '#39A900', borderRadius: '10px' }} />
          </div>
        </div>

        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <h4 style={{ color: '#39A900', marginBottom: '10px' }}>Progreso General</h4>
          <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>87%</p>
          <p style={{ color: '#6b7280' }}>De los aprendices han completado la etapa</p>
          <div style={{ width: '100%', height: '6px', background: '#f3f4f6', borderRadius: '10px', marginTop: '10px', overflow: 'hidden' }}>
            <div style={{ width: '87%', height: '100%', background: '#39A900', borderRadius: '10px' }} />
          </div>
        </div>
      </div>

    </div>
  );
};

export default DashboardCoordinador;