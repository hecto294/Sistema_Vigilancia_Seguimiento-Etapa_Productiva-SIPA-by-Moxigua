// src/pages/admin/GestionFichas.jsx
import React, { useState } from 'react';

const GestionFichas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Datos de las fichas
  const [fichas, setFichas] = useState([
    { idFicha: '2875901', programa: 'Análisis y Desarrollo de Software', nivel: 'Tecnólogo', aprendices: 28, estado: 'Activa' },
    { idFicha: '2875902', programa: 'Gestión Empresarial', nivel: 'Tecnólogo', aprendices: 24, estado: 'Activa' },
    { idFicha: '2875903', programa: 'Contabilidad y Finanzas', nivel: 'Técnico', aprendices: 32, estado: 'Inactiva' },
  ]);

  // Estado para el formulario modal
  const [modalAbierto, setModalAbierto] = useState(false);
  const [nuevaFicha, setNuevaFicha] = useState({
    idFicha: '',
    programa: '',
    nivel: 'Tecnólogo',
    aprendices: 0,
    estado: 'Activa'
  });

  const handleSearch = () => setSearchQuery(searchTerm);
  const handleClear = () => { setSearchTerm(''); setSearchQuery(''); };

  const filteredFichas = fichas.filter(f =>
    f.idFicha.includes(searchQuery) || f.programa.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Funciones del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaFicha({ ...nuevaFicha, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nuevaFicha.idFicha || !nuevaFicha.programa) {
      alert('Por favor, completa al menos el código y el programa.');
      return;
    }
    setFichas([...fichas, { ...nuevaFicha, aprendices: parseInt(nuevaFicha.aprendices) }]);
    setModalAbierto(false);
    setNuevaFicha({ idFicha: '', programa: '', nivel: 'Tecnólogo', aprendices: 0, estado: 'Activa' });
  };

  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => {
    setModalAbierto(false);
    setNuevaFicha({ idFicha: '', programa: '', nivel: 'Tecnólogo', aprendices: 0, estado: 'Activa' });
  };

  const handleEditar = (id) => {
    alert(`✏️ Editando la ficha ${id}`);
  };

  const handleEliminar = (id) => {
    if (window.confirm(`¿Estás seguro de eliminar la ficha ${id}?`)) {
      setFichas(fichas.filter(f => f.idFicha !== id));
    }
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Encabezado */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Gestión de Fichas</h2>
          <p style={{ color: '#6b7280', margin: '5px 0 0 0' }}>Administra todas las fichas de formación del sistema.</p>
        </div>
        <button
          onClick={abrirModal}
          style={{
            background: '#39A900',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <i className="fas fa-plus" /> Nueva Ficha
        </button>
      </div>

      {/* Buscador */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar por código o programa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1, padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
        />
        <button
          onClick={handleSearch}
          style={{ background: '#39A900', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}
        >
          Buscar
        </button>
        <button
          onClick={handleClear}
          style={{ background: '#e5e7eb', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}
        >
          Limpiar
        </button>
      </div>

      {/* Mensaje de no encontrado */}
      {filteredFichas.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h3 style={{ color: '#dc2626' }}>Dato no encontrado</h3>
          <p style={{ color: '#6b7280' }}>No hay fichas con ese criterio de búsqueda.</p>
        </div>
      )}

      {/* Tabla de fichas */}
      {filteredFichas.length > 0 && (
        <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e5e7eb', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Código</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Programa</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Nivel</th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280' }}>Aprendices</th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280' }}>Estado</th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredFichas.map(f => (
                <tr key={f.idFicha} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>{f.idFicha}</td>
                  <td style={{ padding: '12px' }}>{f.programa}</td>
                  <td style={{ padding: '12px' }}>{f.nivel}</td>
                  <td style={{ textAlign: 'center', padding: '12px' }}>{f.aprendices}</td>
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
                  <td style={{ textAlign: 'center', padding: '12px' }}>
                    <button
                      onClick={() => handleEditar(f.idFicha)}
                      style={{ background: '#e6f7ed', color: '#047857', border: 'none', padding: '4px 12px', borderRadius: '6px', marginRight: '5px', cursor: 'pointer' }}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleEliminar(f.idFicha)}
                      style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '4px 12px', borderRadius: '6px', cursor: 'pointer' }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ========================================================== */}
      {/* MODAL DE CREACIÓN DE FICHA */}
      {/* ========================================================== */}
      {modalAbierto && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000
          }}
          onClick={cerrarModal}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '16px',
              maxWidth: '500px',
              width: '90%',
              padding: '30px',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={cerrarModal}
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

            <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '20px' }}>Crear Nueva Ficha</h3>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Código de ficha</label>
                <input
                  type="text"
                  name="idFicha"
                  value={nuevaFicha.idFicha}
                  onChange={handleChange}
                  placeholder="Ej. 2875913"
                  style={{ width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Programa de formación</label>
                <input
                  type="text"
                  name="programa"
                  value={nuevaFicha.programa}
                  onChange={handleChange}
                  placeholder="Ej. Desarrollo Web"
                  style={{ width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Nivel</label>
                <select
                  name="nivel"
                  value={nuevaFicha.nivel}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                >
                  <option value="Tecnólogo">Tecnólogo</option>
                  <option value="Técnico">Técnico</option>
                </select>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Cantidad de aprendices</label>
                <input
                  type="number"
                  name="aprendices"
                  value={nuevaFicha.aprendices}
                  onChange={handleChange}
                  placeholder="0"
                  style={{ width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Estado</label>
                <select
                  name="estado"
                  value={nuevaFicha.estado}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                >
                  <option value="Activa">Activa</option>
                  <option value="Inactiva">Inactiva</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={cerrarModal}
                  style={{ background: '#e5e7eb', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{ background: '#39A900', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}
                >
                  Crear Ficha
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionFichas;