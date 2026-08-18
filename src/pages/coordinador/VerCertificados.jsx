// src/pages/coordinador/VerCertificados.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fichasData } from '../../data/coordinadorData';

const VerCertificados = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => setSearchQuery(searchTerm);
  const handleClear = () => { setSearchTerm(''); setSearchQuery(''); };

  // Simulamos cuántos aprendices están listos por ficha
  // Cambia la proporción aquí para probar el botón
  const certificadosData = fichasData.map(f => ({
    ...f,
    listos: f.aprendices.length, // PONEMOS TODOS LISTOS PARA PROBAR LA DESCARGA
    // Para probar que no se active, cambia el .length por: f.aprendices.filter((_, i) => i % 2 === 0).length
  }));

  // Verificamos si TODAS las fichas tienen TODOS sus aprendices listos
  const todasLasFichasListas = certificadosData.every(f => f.listos === f.aprendices.length);

  const filteredFichas = certificadosData.filter(f =>
    f.idFicha.includes(searchQuery) || f.programa.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const verDetalleFicha = (idFicha) => {
    navigate(`/coordinador/ficha/${idFicha}`);
  };

  const handleDescargarTodos = () => {
    const totalFichas = certificadosData.length;
    const totalListos = certificadosData.reduce((acc, f) => acc + f.listos, 0);
    alert(`📦 Descargando ${totalListos} certificados de ${totalFichas} fichas...\n\n(En un sistema real, esto descargaría un ZIP con todos los PDFs.)`);
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Encabezado con botón a la derecha */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Certificados Listos</h2>
          <p style={{ color: '#6b7280', margin: '5px 0 0 0' }}>Fichas con aprendices listos para certificación.</p>
        </div>

        {/* BOTÓN DINÁMICO CON ESTADO DE ACTIVACIÓN */}
        <button
          onClick={todasLasFichasListas ? handleDescargarTodos : null}
          disabled={!todasLasFichasListas}
          style={{
            background: todasLasFichasListas ? '#39A900' : '#d1d5db',
            color: 'white',
            border: 'none',
            padding: '10px 24px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: todasLasFichasListas ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: '0.2s'
          }}
          onMouseEnter={(e) => {
            if (todasLasFichasListas) e.currentTarget.style.backgroundColor = '#2d8a00';
          }}
          onMouseLeave={(e) => {
            if (todasLasFichasListas) e.currentTarget.style.backgroundColor = '#39A900';
          }}
        >
          <i className="fas fa-download" />
          {todasLasFichasListas ? 'Descargar todos' : 'Faltan fichas por completar'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1, padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
        />
        <button onClick={handleSearch} style={{ background: '#39A900', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px' }}>Buscar</button>
        <button onClick={handleClear} style={{ background: '#e5e7eb', border: 'none', padding: '10px 20px', borderRadius: '6px' }}>Limpiar</button>
      </div>

      {filteredFichas.length === 0 ? (
        <div style={{ padding: '40px', textAlign: 'center' }}>
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
              <h4 style={{ color: '#39A900' }}>{f.idFicha}</h4>
              <p style={{ fontWeight: 'bold' }}>{f.programa}</p>
              <p style={{ color: '#6b7280' }}>
                {f.listos} / {f.aprendices.length} aprendices listos
              </p>
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
    </div>
  );
};

export default VerCertificados;