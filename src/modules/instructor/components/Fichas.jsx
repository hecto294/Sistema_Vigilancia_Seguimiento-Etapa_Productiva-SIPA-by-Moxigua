// src/modules/instructor/components/Fichas.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Breadcrumb from '../../shared/components/Breadcrumb';
import './Fichas.css';

const Fichas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Fichas base (con fechas)
  const fichasBase = [
    { codigo: '2875901', programa: 'Análisis y Desarrollo de Software', nivel: 'Tecnólogo', aprendices: 28, fechaInicio: '01/03/2025', fechaFin: '28/02/2026' },
    { codigo: '2875902', programa: 'Gestión Empresarial', nivel: 'Tecnólogo', aprendices: 24, fechaInicio: '10/03/2025', fechaFin: '10/03/2026' },
    { codigo: '2875903', programa: 'Contabilidad y Finanzas', nivel: 'Técnico', aprendices: 32, fechaInicio: '20/12/2026', fechaFin: '20/12/2027' },
  ];

  const [fichas, setFichas] = useState(fichasBase);

  useEffect(() => {
    const fichasGuardadas = JSON.parse(localStorage.getItem('fichasAsignadasInstructor')) || [];
    if (fichasGuardadas.length > 0) {
      setFichas(prevFichas => {
        const nuevasFichas = fichasGuardadas
          .filter(f => !prevFichas.some(pf => pf.codigo === f.id))
          .map(f => ({
            codigo: f.id,
            programa: f.programa,
            nivel: 'Tecnólogo',
            aprendices: 0,
            fechaInicio: '01/09/2026',
            fechaFin: '31/08/2027'
          }));
        return [...prevFichas, ...nuevasFichas];
      });
    }
  }, []);

  useEffect(() => {
    const fichasManuales = JSON.parse(localStorage.getItem('fichasEstadoManual')) || [];
    setFichas(prev => {
      return prev.map(ficha => {
        const manual = fichasManuales.find(m => m.id === ficha.codigo);
        if (manual) {
          return { ...ficha, estadoManual: manual.estadoManual };
        }
        return ficha;
      });
    });
  }, []);

  const isFichaActiva = (ficha) => {
    if (ficha.estadoManual === 'inactiva') return false;
    if (ficha.estadoManual === 'activa') return true;
    const [day, month, year] = ficha.fechaInicio.split('/');
    const fechaInicio = new Date(`${year}-${month}-${day}`);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    return hoy >= fechaInicio;
  };

  const handleSearch = () => setSearchQuery(searchTerm);
  const handleClear = () => { setSearchTerm(''); setSearchQuery(''); };

  const filteredFichas = fichas.filter((ficha) =>
    ficha.codigo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ficha.programa.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleVerFicha = (ficha) => {
    if (!isFichaActiva(ficha)) {
      Swal.fire({
        title: '⚠️ Ficha Inactiva',
        text: `Esta ficha se activará el ${ficha.fechaInicio}. No se puede ver el detalle actualmente.`,
        icon: 'warning',
        confirmButtonColor: '#f59e0b'
      });
      return;
    }
    navigate(`/instructor/ficha/${ficha.codigo}`);
  };

  return (
    <div className="fichas-container">
      {/* ✅ MIGA DE PAN CORREGIDA */}
      <Breadcrumb />

      <div className="fichas-header">
        <h2>Mis Fichas de Formación</h2>
      </div>

      <div className="search-container">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Buscar por código de ficha..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button className="btn-search" onClick={handleSearch}>Buscar</button>
        <button className="btn-clear" onClick={handleClear}>Limpiar</button>
      </div>

      {filteredFichas.length === 0 ? (
        <div className="not-found">
          <h2><i className="fas fa-exclamation-circle"></i> Dato no encontrado</h2>
          <p>No existe ninguna ficha con el código ingresado.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="fichas-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Programa</th>
                <th>Nivel</th>
                <th>Aprendices</th>
                <th>Estado</th>
                <th style={{ textAlign: 'center' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredFichas.map((ficha) => {
                const esActiva = isFichaActiva(ficha);
                return (
                  <tr key={ficha.codigo}>
                    <td className="codigo">{ficha.codigo}</td>
                    <td>{ficha.programa}</td>
                    <td>{ficha.nivel}</td>
                    <td>{ficha.aprendices}</td>
                    <td>
                      <span className={`status-ficha ${esActiva ? 'status-activa' : 'status-inactiva'}`}>
                        {esActiva ? 'Activa' : 'Inactiva'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {esActiva ? (
                        <button className="btn-ver-ficha" onClick={() => handleVerFicha(ficha)}>
                          <i className="fas fa-eye" /> Ver
                        </button>
                      ) : (
                        <span style={{ color: '#9ca3af', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                          <i className="fas fa-lock" style={{ fontSize: '11px' }} />
                          Se activará el {ficha.fechaInicio}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Fichas;