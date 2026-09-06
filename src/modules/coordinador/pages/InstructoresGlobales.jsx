// src/pages/coordinador/InstructoresGlobales.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../shared/components/Breadcrumb';
import * as XLSX from 'xlsx';

const InstructoresGlobales = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [cargando, setCargando] = useState(false);

  const [instructores, setInstructores] = useState([
    { id: 1, nombre: 'Carlos Andrés López', email: 'carlos@sena.edu.co', fichasAsignadas: 2 },
    { id: 2, nombre: 'Ana María Pérez', email: 'ana@sena.edu.co', fichasAsignadas: 1 },
    { id: 3, nombre: 'Pedro Gómez', email: 'pedro@sena.edu.co', fichasAsignadas: 1 },
  ]);

  const handleSearch = () => setSearchQuery(searchTerm);
  const handleClear = () => { setSearchTerm(''); setSearchQuery(''); };

  const filteredInstructores = instructores.filter(i =>
    i.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- CARGA MASIVA DIRECTA ---
  const handleCargaMasiva = () => {
    // Crear un input de tipo file oculto
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xlsx,.xls,.csv';
    input.style.display = 'none';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      setCargando(true);
      const reader = new FileReader();
      
      reader.onload = (evt) => {
        try {
          const data = new Uint8Array(evt.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);

          if (jsonData.length === 0) {
            alert('⚠️ El archivo está vacío.');
            setCargando(false);
            return;
          }

          // Mapear los datos
          const nuevosInstructores = jsonData.map((row, index) => ({
            id: instructores.length + index + 1,
            nombre: row['Nombre'] || row['nombre'] || 'Sin nombre',
            email: row['Email'] || row['email'] || 'sin.email@ejemplo.com',
            fichasAsignadas: parseInt(row['Fichas'] || row['fichas'] || 0),
          }));

          // Agregar a la lista (evitando duplicados por email)
          setInstructores(prev => {
            const existentes = prev.map(i => i.email);
            const nuevos = nuevosInstructores.filter(i => !existentes.includes(i.email));
            return [...prev, ...nuevos];
          });

          alert(`✅ ${nuevosInstructores.length} instructores cargados exitosamente.`);
          setCargando(false);
        } catch (error) {
          alert('❌ Error al leer el archivo. Asegúrate de que sea un archivo Excel o CSV válido.');
          console.error(error);
          setCargando(false);
        }
      };

      reader.onerror = () => {
        alert('❌ Error al leer el archivo.');
        setCargando(false);
      };

      reader.readAsArrayBuffer(file);
    };

    // Simular clic en el input para abrir el gestor de archivos
    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  };

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      {/* MIGAS DE PAN */}
      <Breadcrumb />

      {/* ENCABEZADO */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Instructores Globales</h2>
          <p style={{ color: '#6b7280', margin: '5px 0 0 0' }}>Gestión de instructores del sistema.</p>
        </div>
        <button
          onClick={handleCargaMasiva}
          disabled={cargando}
          style={{
            background: cargando ? '#9ca3af' : '#3ca203',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: cargando ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'background 0.2s',
            opacity: cargando ? 0.7 : 1
          }}
          onMouseEnter={(e) => {
            if (!cargando) e.currentTarget.style.background = '#2d8a00';
          }}
          onMouseLeave={(e) => {
            if (!cargando) e.currentTarget.style.background = '#3ca203';
          }}
        >
          <i className={`fas ${cargando ? 'fa-spinner fa-spin' : 'fa-upload'}`} />
          {cargando ? 'Cargando...' : 'Carga Masiva'}
        </button>
      </div>

      {/* BUSCADOR */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar por nombre o email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1, padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
        />
        <button 
          onClick={handleSearch} 
          style={{ 
            background: '#3ca203', 
            color: 'white', 
            border: 'none', 
            padding: '10px 20px', 
            borderRadius: '6px', 
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Buscar
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
          Limpiar
        </button>
      </div>

      {/* TABLA DE INSTRUCTORES */}
      {filteredInstructores.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h3 style={{ color: '#dc2626' }}>Dato no encontrado</h3>
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e5e7eb', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Instructor</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Email</th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280' }}>Fichas Asignadas</th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280' }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {filteredInstructores.map(i => (
                <tr key={i.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>{i.nombre}</td>
                  <td style={{ padding: '12px' }}>{i.email}</td>
                  <td style={{ textAlign: 'center', padding: '12px' }}>
                    <span style={{ background: '#e6f7ed', color: '#047857', padding: '2px 10px', borderRadius: '12px', fontSize: '12px' }}>
                      {i.fichasAsignadas}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center', padding: '12px' }}>
                    <button
                      onClick={() => navigate(`/coordinador/instructores/${i.id}/asignar`)}
                      style={{ 
                        background: '#e0f2fe', 
                        color: '#0ea5e9', 
                        border: 'none', 
                        padding: '4px 12px', 
                        borderRadius: '6px', 
                        cursor: 'pointer', 
                        fontSize: '12px' 
                      }}
                    >
                      <i className="fas fa-plus-circle" /> Asignar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InstructoresGlobales;
