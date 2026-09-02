// src/components/Empresas.jsx
import React, { useState } from 'react';
import './Empresas.css';

const Empresas = () => {
  // Estado para el texto que el usuario escribe en el input
  const [searchTerm, setSearchTerm] = useState('');
  // Estado para el texto que realmente se busca al darle al botón
  const [searchQuery, setSearchQuery] = useState('');
  
  const [empresas] = useState([
    { id: 1, nombre: 'TechSoft S.A.S.', arl: 'SURA', aprendices: 8 },
    { id: 2, nombre: 'Innovar Solutions', arl: 'Positiva', aprendices: 5 },
    { id: 3, nombre: 'Global Services LTDA', arl: 'Colmena', aprendices: 12 },
    { id: 4, nombre: 'Soluciones Web SAS', arl: 'SURA', aprendices: 3 },
    { id: 5, nombre: 'DataTech Colombia', arl: 'Positiva', aprendices: 6 },
  ]);

  // Filtra los datos basándose en searchQuery (lo que busca el botón)
  const filteredEmpresas = empresas.filter((empresa) =>
    empresa.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    empresa.arl.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Función del botón Buscar
  const handleSearch = () => {
    setSearchQuery(searchTerm); // Actualiza la búsqueda real
  };

  // Función del botón Limpiar
  const handleClear = () => {
    setSearchTerm('');   // Limpia el input
    setSearchQuery('');  // Limpia la búsqueda real (muestra todo)
  };

  return (
    <div className="empresas-container">
      <div className="empresas-header">
        <h2>Empresas Asociadas</h2>
        <button className="btn-nuevo">+ Nueva empresa</button>
      </div>

      {/* Barra de búsqueda con botón Buscar y Limpiar */}
      <div className="search-container">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Buscar por nombre o ARL..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Busca al presionar Enter
        />
        <button className="btn-search" onClick={handleSearch}>Buscar</button>
        <button className="btn-clear" onClick={handleClear}>Limpiar</button>
      </div>

      {/* Condicional: Si no hay resultados, muestra "Dato no encontrado" */}
      {filteredEmpresas.length === 0 ? (
        <div className="not-found">
          <h2><i className="fas fa-exclamation-circle"></i> Dato no encontrado</h2>
          <p>No existe ninguna empresa con el nombre o ARL ingresado.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>ARL</th>
                <th>Aprendices Asociados</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmpresas.map((empresa) => (
                <tr key={empresa.id}>
                  <td className="nombre-empresa">{empresa.nombre}</td>
                  <td>{empresa.arl}</td>
                  <td>{empresa.aprendices}</td>
                  <td>
                    <button className="action-btn-ficha btn-edit">Editar</button>
                    <button className="action-btn-ficha btn-delete">Eliminar</button>
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

export default Empresas;