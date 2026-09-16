// src/modules/coordinador/pages/DashboardCoordinador.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboardService } from '@/core/services/dashboardService';
import { fichaService } from '@/core/services/fichaService';

const DashboardCoordinador = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState([]);
  const [fichas, setFichas] = useState([]);
  const [programas, setProgramas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      setError(null);

      const [dashData, fichasData, programasData] = await Promise.all([
        dashboardService.getCoordinador(),
        fichaService.getFichas().catch(() => []),
        fichaService.getProgramas().catch(() => []),
      ]);

      const nuevasStats = [
        {
          id: 1,
          numero: dashData.total_fichas_asignadas || 0,
          etiqueta: 'Fichas Activas',
          icono: 'fa-layer-group',
          color: '#3ca203',
        },
        {
          id: 2,
          numero: dashData.total_procesos_activos || 0,
          etiqueta: 'Aprendices en Etapa',
          icono: 'fa-users',
          color: '#0ea5e9',
        },
        {
          id: 3,
          numero: dashData.total_instructores_activos || 0,
          etiqueta: 'Instructores Activos',
          icono: 'fa-user-tie',
          color: '#8b5cf6',
        },
        {
          id: 4,
          numero: dashData.total_procesos_pendientes || 0,
          etiqueta: 'Procesos Pendientes',
          icono: 'fa-certificate',
          color: '#f59e0b',
        },
      ];

      setStats(nuevasStats);
      setFichas(Array.isArray(fichasData) ? fichasData : []);
      setProgramas(Array.isArray(programasData) ? programasData : []);
    } catch (err) {
      console.error('Error al cargar dashboard:', err);
      setError(err.message || 'Error al cargar datos');
    } finally {
      setLoading(false);
    }
  };

  const getNombrePrograma = (programaId) => {
    const p = programas.find((x) => x.id === programaId);
    return p ? p.nombre : `Programa #${programaId}`;
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return '-';
    try {
      return new Date(fecha).toLocaleDateString('es-ES');
    } catch {
      return fecha;
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', color: '#6b7280' }}>
        <i className="fas fa-spinner fa-spin" style={{ fontSize: '32px', color: '#3ca203' }}></i>
        <p style={{ marginTop: '15px' }}>Cargando panel del coordinador...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '60px', textAlign: 'center' }}>
        <i className="fas fa-exclamation-circle" style={{ fontSize: '40px', color: '#dc2626' }}></i>
        <h3 style={{ color: '#dc2626', marginTop: '15px' }}>Error al cargar</h3>
        <p style={{ color: '#6b7280' }}>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 5px 0' }}>
          Panel Global - Coordinador
        </h2>
        <p style={{ color: '#6b7280', fontSize: '15px', margin: 0 }}>
          Visión general del estado de la etapa productiva.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
        {stats.map((stat) => (
          <div
            key={stat.id}
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
              textAlign: 'center',
              transition: 'all 0.25s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <i
              className={`fas ${stat.icono}`}
              style={{ fontSize: '30px', color: stat.color, marginBottom: '10px', display: 'block' }}
            />
            <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', margin: '0' }}>
              {stat.numero}
            </h3>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: '0' }}>{stat.etiqueta}</p>
          </div>
        ))}
      </div>

      <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', margin: 0 }}>
            <i className="fas fa-layer-group" style={{ color: '#3ca203', marginRight: '8px' }} />
            Estado de Fichas ({fichas.length})
          </h3>
          <button
            onClick={() => navigate('/coordinador/fichas')}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#3ca203',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Ver todas →
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Ficha</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Programa</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Nivel</th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280' }}>Aprendices</th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280' }}>Finalización</th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280' }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {fichas.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '30px', textAlign: 'center', color: '#9ca3af' }}>
                    No hay fichas registradas
                  </td>
                </tr>
              ) : (
                fichas.map((ficha) => (
                  <tr key={ficha.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px', fontWeight: 'bold', color: '#3ca203' }}>
                      {ficha.numero_ficha}
                    </td>
                    <td style={{ padding: '12px' }}>{getNombrePrograma(ficha.programa_id)}</td>
                    <td style={{ padding: '12px' }}>{ficha.nivel || 'N/A'}</td>
                    <td style={{ textAlign: 'center', padding: '12px' }}>
                      {ficha.aprendices_esperados || 0}
                    </td>
                    <td style={{ textAlign: 'center', padding: '12px' }}>
                      {formatearFecha(ficha.fecha_fin)}
                    </td>
                    <td style={{ textAlign: 'center', padding: '12px' }}>
                      <span
                        style={{
                          background: ficha.is_active ? '#d1fae5' : '#f3f4f6',
                          color: ficha.is_active ? '#047857' : '#6b7280',
                          padding: '4px 14px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                        }}
                      >
                        {ficha.is_active ? 'Activa' : 'Inactiva'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardCoordinador;
