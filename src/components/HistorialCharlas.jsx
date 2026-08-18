// src/components/HistorialCharlas.jsx
import React, { useState } from 'react';
import './HistorialCharlas.css';

const HistorialCharlas = () => {
  // Estado para el texto que el usuario escribe en el input
  const [searchTerm, setSearchTerm] = useState('');
  // Estado para el texto que realmente se busca al darle al botón
  const [searchQuery, setSearchQuery] = useState('');

  const [data] = useState([
    { id: 101, tema: 'Inducción General', fecha: '15/05/2025', asistencia: '22' },
    { id: 102, tema: 'Manejo de Herramientas', fecha: '12/05/2025', asistencia: '18' },
    { id: 103, tema: 'Seguridad en el Trabajo', fecha: '08/05/2025', asistencia: '20' },
    { id: 104, tema: 'Primeros Auxilios', fecha: '01/05/2025', asistencia: '15' },
  ]);

  // Filtrar los datos basados en searchQuery
  const filteredData = data.filter((item) =>
    item.tema.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Función del botón Buscar
  const handleSearch = () => {
    setSearchQuery(searchTerm);
  };

  // Función del botón Limpiar
  const handleClear = () => {
    setSearchTerm('');
    setSearchQuery('');
  };

  return (
    <div className="historial-charlas-container">
      <div className="historial-charlas-header">
        <h2>Historial de Charlas</h2>
        {/* (Opcional: Puedes agregar un botón de exportar o imprimir aquí) */}
      </div>

      {/* Barra de búsqueda */}
      <div className="search-container">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Buscar por tema de la charla..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button className="btn-search" onClick={handleSearch}>Buscar</button>
        <button className="btn-clear" onClick={handleClear}>Limpiar</button>
      </div>

      {/* Condicional: Datos encontrados o mensaje de error */}
      {filteredData.length === 0 ? (
        <div className="not-found">
          <h2><i className="fas fa-exclamation-circle"></i> Dato no encontrado</h2>
          <p>No se encontró ninguna charla con el tema ingresado.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tema</th>
                <th>Fecha</th>
                <th>Asistencia</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td className="codigo">{item.id}</td>
                  <td>{item.tema}</td>
                  <td>{item.fecha}</td>
                  <td>{item.asistencia}</td>
                  <td>
                    <button className="action-btn-ficha btn-edit">Ver detalles</button>
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

export default HistorialCharlas;