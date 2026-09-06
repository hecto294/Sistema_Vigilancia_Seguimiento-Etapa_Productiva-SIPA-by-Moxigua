// src/pages/admin/CargaMasivaFichas.jsx
import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const CargaMasivaFichas = ({ onClose, onFichasCargadas }) => {
  const [archivo, setArchivo] = useState(null);
  const [vistaPrevia, setVistaPrevia] = useState([]);
  const [cargando, setCargando] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setArchivo(file);
    procesarArchivo(file);
  };

  const procesarArchivo = (file) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        if (jsonData.length === 0) {
          alert('El archivo está vacío.');
          return;
        }

        // Mapear los datos
        const fichasMapeadas = jsonData.map((row, index) => ({
          id: index + 1,
          idFicha: row['Código'] || row['codigo'] || row['Codigo'] || 'Sin código',
          programa: row['Programa'] || row['programa'] || 'Sin programa',
          nivel: row['Nivel'] || row['nivel'] || 'Tecnólogo',
          aprendices: parseInt(row['Aprendices'] || row['aprendices'] || 0),
          estado: row['Estado'] || row['estado'] || 'Activa'
        }));

        setVistaPrevia(fichasMapeadas);
      } catch (error) {
        alert('Error al leer el archivo. Asegúrate de que sea un archivo Excel o CSV válido.');
        console.error(error);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleConfirmarCarga = () => {
    if (vistaPrevia.length === 0) {
      alert('No hay fichas para cargar.');
      return;
    }

    // Verificar códigos duplicados (simulación)
    const codigos = vistaPrevia.map(f => f.idFicha);
    const duplicados = codigos.filter((item, index) => codigos.indexOf(item) !== index);
    if (duplicados.length > 0) {
      alert(`❌ Hay códigos de ficha duplicados: ${duplicados.join(', ')}. Por favor, corrige el archivo.`);
      return;
    }

    setCargando(true);
    setTimeout(() => {
      if (onFichasCargadas) {
        onFichasCargadas(vistaPrevia);
      }
      alert(`✅ ${vistaPrevia.length} fichas cargadas exitosamente.`);
      setCargando(false);
      onClose();
    }, 1500);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '15px' }}>Carga Masiva de Fichas</h3>
      <p style={{ color: '#6b7280', marginBottom: '20px' }}>
        Selecciona un archivo Excel (.xlsx, .xls) o CSV con las columnas: <strong>Código, Programa, Nivel, Aprendices, Estado</strong>.
      </p>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleFileChange}
          style={{ display: 'block', marginBottom: '10px' }}
        />
        {archivo && <span style={{ fontSize: '14px', color: '#3ca203' }}>Archivo seleccionado: {archivo.name}</span>}
      </div>

      {vistaPrevia.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontWeight: '600', marginBottom: '10px' }}>Vista previa ({vistaPrevia.length} fichas)</h4>
          <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead style={{ backgroundColor: '#f3f4f6', position: 'sticky', top: 0, zIndex: 10 }}>
                <tr>
                  <th style={{ padding: '8px', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>#</th>
                  <th style={{ padding: '8px', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>Código</th>
                  <th style={{ padding: '8px', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>Programa</th>
                  <th style={{ padding: '8px', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>Nivel</th>
                  <th style={{ padding: '8px', textAlign: 'center', borderBottom: '2px solid #e5e7eb' }}>Aprendices</th>
                  <th style={{ padding: '8px', textAlign: 'center', borderBottom: '2px solid #e5e7eb' }}>Estado</th>
                </tr>
              </thead>
              <tbody>
                {vistaPrevia.map((f, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '8px' }}>{idx + 1}</td>
                    <td style={{ padding: '8px', fontWeight: 'bold' }}>{f.idFicha}</td>
                    <td style={{ padding: '8px' }}>{f.programa}</td>
                    <td style={{ padding: '8px' }}>{f.nivel}</td>
                    <td style={{ padding: '8px', textAlign: 'center' }}>{f.aprendices}</td>
                    <td style={{ padding: '8px', textAlign: 'center' }}>
                      <span style={{
                        background: f.estado === 'Activa' ? '#d1fae5' : '#f3f4f6',
                        color: f.estado === 'Activa' ? '#047857' : '#6b7280',
                        padding: '2px 10px',
                        borderRadius: '12px',
                        fontSize: '12px'
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
      )}

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
        <button
          onClick={onClose}
          style={{ background: '#e5e7eb', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}
        >
          Cancelar
        </button>
        <button
          onClick={handleConfirmarCarga}
          disabled={vistaPrevia.length === 0 || cargando}
          style={{
            background: '#3ca203',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: vistaPrevia.length === 0 || cargando ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            opacity: vistaPrevia.length === 0 || cargando ? 0.6 : 1,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <i className="fas fa-upload" />
          {cargando ? 'Cargando...' : 'Confirmar Carga Masiva'}
        </button>
      </div>
    </div>
  );
};

export default CargaMasivaFichas;
