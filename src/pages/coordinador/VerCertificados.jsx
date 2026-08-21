// src/pages/coordinador/VerCertificados.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fichasData } from '../../data/coordinadorData';

const VerCertificados = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Estado para el modal de confirmación de descarga
  const [modalDescarga, setModalDescarga] = useState(false);
  const [estadisticasDescarga, setEstadisticasDescarga] = useState({ listos: 0, faltantes: 0 });

  const handleSearch = () => setSearchQuery(searchTerm);
  const handleClear = () => { setSearchTerm(''); setSearchQuery(''); };

  // Simulamos cuántos aprendices están listos por ficha
  const certificadosData = fichasData.map(f => ({
    ...f,
    // Simulación: los primeros 2 están listos, el resto no
    listos: f.aprendices.filter((_, i) => i < 2).length
  }));

  // Calculamos el total de aprendices listos y faltantes
  const totalListos = certificadosData.reduce((acc, f) => acc + f.listos, 0);
  const totalAprendices = certificadosData.reduce((acc, f) => acc + f.aprendices.length, 0);
  const totalFaltantes = totalAprendices - totalListos;

  const filteredFichas = certificadosData.filter(f =>
    f.idFicha.includes(searchQuery) || f.programa.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const verDetalleFicha = (idFicha) => {
    navigate(`/coordinador/ficha-completa/${idFicha}`);
  };

  // --- Lógica del botón "Descargar todos" ---
  const handleAbrirModalDescarga = () => {
    setEstadisticasDescarga({
      listos: totalListos,
      faltantes: totalFaltantes
    });
    setModalDescarga(true);
  };

  const handleConfirmarDescarga = () => {
    alert(`📦 Descargando ${estadisticasDescarga.listos} certificados...\n\n(En un sistema real, esto descargaría un ZIP con todos los PDFs.)`);
    setModalDescarga(false);
  };

  const handleCancelarDescarga = () => {
    setModalDescarga(false);
  };

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      {/* Encabezado con botón a la derecha */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Certificados Listos</h2>
          <p style={{ color: '#6b7280', margin: '5px 0 0 0' }}>Fichas con aprendices listos para certificación.</p>
        </div>
        <button
          onClick={handleAbrirModalDescarga}
          style={{
            background: '#3ca203',
            color: 'white',
            border: 'none',
            padding: '10px 24px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2d8a00'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3ca203'}
        >
          <i className="fas fa-download" /> Descargar todos
        </button>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1, padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
        />
        <button onClick={handleSearch} style={{ background: '#3ca203', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px' }}>Buscar</button>
        <button onClick={handleClear} style={{ background: '#e5e7eb', border: 'none', padding: '10px 20px', borderRadius: '6px' }}>Limpiar</button>
      </div>

      {filteredFichas.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h3 style={{ color: '#dc2626' }}>Dato no encontrado</h3>
          <p style={{ color: '#6b7280' }}>No se encontraron fichas.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {filteredFichas.map(f => (
            <div
              key={f.idFicha}
              onClick={() => verDetalleFicha(f.idFicha)}
              style={{
                background: 'white',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                textAlign: 'center',
                cursor: 'pointer',
                transition: '0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <h4 style={{ color: '#3ca203', fontWeight: 'bold' }}>{f.idFicha}</h4>
              <p style={{ fontWeight: 'bold' }}>{f.programa}</p>
              <p style={{ color: '#6b7280' }}>{f.listos} / {f.aprendices.length} aprendices listos</p>
              <div style={{
                width: '100%',
                height: '6px',
                background: '#f3f4f6',
                borderRadius: '10px',
                marginTop: '10px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${(f.listos / f.aprendices.length) * 100}%`,
                  height: '100%',
                  background: f.listos === f.aprendices.length ? '#10b981' : '#f59e0b',
                  borderRadius: '10px'
                }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================== */}
      {/* MODAL DE CONFIRMACIÓN DE DESCARGA */}
      {/* ========================================================== */}
      {modalDescarga && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000
          }}
          onClick={handleCancelarDescarga}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '16px',
              maxWidth: '450px',
              width: '90%',
              padding: '30px',
              position: 'relative',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCancelarDescarga}
              style={{
                position: 'absolute',
                top: '15px',
                right: '20px',
                background: 'transparent',
                border: 'none',
                fontSize: '28px',
                color: '#6b7280',
                cursor: 'pointer'
              }}
            >
              &times;
            </button>

            <div style={{ textAlign: 'center' }}>
              <i className="fas fa-download" style={{ fontSize: '40px', color: '#3ca203', marginBottom: '15px' }} />
              <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1f2937', marginBottom: '10px' }}>
                ¿Desea generar la descarga?
              </h3>
              <p style={{ color: '#6b7280', marginBottom: '15px' }}>
                <strong>{estadisticasDescarga.listos}</strong> aprendices están listos para certificar.
              </p>
              <p style={{ color: '#ef4444', fontWeight: 'bold', marginBottom: '20px' }}>
                Faltan <strong>{estadisticasDescarga.faltantes}</strong> aprendices por completar el proceso.
              </p>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button
                  onClick={handleCancelarDescarga}
                  style={{
                    background: '#e5e7eb',
                    border: 'none',
                    padding: '10px 30px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  No
                </button>
                <button
                  onClick={handleConfirmarDescarga}
                  style={{
                    background: '#3ca203',
                    color: 'white',
                    border: 'none',
                    padding: '10px 30px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Sí, generar descarga
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerCertificados;