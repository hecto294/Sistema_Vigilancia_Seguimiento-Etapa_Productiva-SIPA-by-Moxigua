import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../shared/components/Breadcrumb';
import { fichasData } from '../../../data/coordinadorData.jsx';

const AprendicesGlobales = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // ✅ useMemo para evitar recrear el array en cada render
  const aprendices = useMemo(() => 
    fichasData.flatMap(ficha => 
      ficha.aprendices.map(aprendiz => ({
        ...aprendiz,
        ficha: ficha.idFicha,
        programa: ficha.programa
      }))
    ),
    []
  );

  const handleSearch = () => setSearchQuery(searchTerm);
  const handleClear = () => { 
    setSearchTerm(''); 
    setSearchQuery(''); 
  };

  // ✅ Filtro con uso de useMemo para optimización
  const filteredAprendices = useMemo(() => {
    if (!searchQuery) return aprendices;
    
    return aprendices.filter(a =>
      a.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.ficha.includes(searchQuery)
    );
  }, [aprendices, searchQuery]);

  const handleVerDetalle = (id) => {
    // ✅ Log para depuración
    console.log('🔵 Navegando a detalle del aprendiz con ID:', id);
    if (id) {
      navigate(`/coordinador/aprendices/${id}`);
    } else {
      console.error('❌ ID del aprendiz es undefined o null');
    }
  };

  const getEstadoConfig = (estado) => {
    switch(estado) {
      case 'En formación': 
        return { color: '#10b981', icono: 'fa-check-circle' };
      case 'Condicionado': 
        return { color: '#f59e0b', icono: 'fa-exclamation-circle' };
      case 'Finalizado': 
        return { color: '#3b82f6', icono: 'fa-flag-checkered' };
      case 'Retirado': 
        return { color: '#ef4444', icono: 'fa-times-circle' };
      default: 
        return { color: '#6b7280', icono: 'fa-circle' };
    }
  };

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      <Breadcrumb />
      
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
          Aprendices Globales
        </h2>
        <p style={{ color: '#6b7280', margin: '5px 0 0 0' }}>
          Visualización de aprendices del sistema.
        </p>
        <p style={{ color: '#9ca3af', fontSize: '14px', margin: '5px 0 0 0' }}>
          Total: {aprendices.length} aprendices
        </p>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar por nombre o ficha..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          style={{ 
            flex: 1, 
            padding: '10px', 
            border: '1px solid #e5e7eb', 
            borderRadius: '6px',
            outline: 'none'
          }}
        />
        <button 
          onClick={handleSearch} 
          style={{ 
            background: '#3ca203', 
            color: 'white', 
            border: 'none', 
            padding: '10px 20px', 
            borderRadius: '6px', 
            cursor: 'pointer' 
          }}
        >
          <i className="fas fa-search" /> Buscar
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
          <i className="fas fa-times" /> Limpiar
        </button>
      </div>

      {filteredAprendices.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <i className="fas fa-user-slash" style={{ fontSize: '48px', color: '#dc2626', marginBottom: '16px' }} />
          <h3 style={{ color: '#dc2626' }}>Dato no encontrado</h3>
          <p style={{ color: '#6b7280' }}>
            No se encontraron aprendices que coincidan con "{searchQuery}"
          </p>
        </div>
      ) : (
        <div style={{ 
          background: 'white', 
          borderRadius: '12px', 
          padding: '20px', 
          border: '1px solid #e5e7eb', 
          overflowX: 'auto' 
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280', fontWeight: '600' }}>
                  <i className="fas fa-user" style={{ marginRight: '8px' }} />
                  Nombre
                </th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280', fontWeight: '600' }}>
                  <i className="fas fa-hashtag" style={{ marginRight: '8px' }} />
                  Ficha
                </th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280', fontWeight: '600' }}>
                  <i className="fas fa-building" style={{ marginRight: '8px' }} />
                  Empresa
                </th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280', fontWeight: '600' }}>
                  <i className="fas fa-circle" style={{ marginRight: '8px' }} />
                  Estado
                </th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280', fontWeight: '600' }}>
                  <i className="fas fa-cog" style={{ marginRight: '8px' }} />
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAprendices.map(a => (
                <tr 
                  key={a.id} 
                  style={{ 
                    borderBottom: '1px solid #e5e7eb',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <td style={{ padding: '12px', fontWeight: '500' }}>
                    {a.nombre}
                  </td>
                  <td style={{ textAlign: 'center', padding: '12px' }}>
                    <span style={{ 
                      background: '#f3f4f6', 
                      padding: '2px 10px', 
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {a.ficha}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    {a.empresa || 
                      <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>
                        Sin asignar
                      </span>
                    }
                  </td>
                  <td style={{ textAlign: 'center', padding: '12px' }}>
                    <span style={{
                      background: `${getEstadoConfig(a.estado).color}15`,
                      color: getEstadoConfig(a.estado).color,
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <i className={`fas ${getEstadoConfig(a.estado).icono}`}></i>
                      {a.estado}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center', padding: '12px' }}>
                    <button
                      onClick={() => handleVerDetalle(a.id)}
                      style={{ 
                        background: '#e6f7ed', 
                        color: '#047857', 
                        border: 'none', 
                        padding: '6px 14px', 
                        borderRadius: '6px', 
                        cursor: 'pointer',
                        fontWeight: '500',
                        fontSize: '12px',
                        transition: 'all 0.2s',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#d1fae5';
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#e6f7ed';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <i className="fas fa-eye" /> Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div style={{ 
            marginTop: '16px', 
            paddingTop: '16px', 
            borderTop: '1px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'space-between',
            color: '#6b7280',
            fontSize: '14px'
          }}>
            <span>
              Mostrando {filteredAprendices.length} de {aprendices.length} aprendices
            </span>
            <span>
              {searchQuery && `Filtrado por: "${searchQuery}"`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AprendicesGlobales;
