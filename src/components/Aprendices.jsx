// src/components/Aprendices.jsx
import React, { useState } from 'react';
import './Aprendices.css';

const Aprendices = () => {
  // Estado para el texto que el usuario escribe
  const [searchTerm, setSearchTerm] = useState('');
  // Estado para el texto que realmente se busca al darle al botón
  const [searchQuery, setSearchQuery] = useState('');

  // Datos de ejemplo para aprendices
  const [aprendices] = useState([
    { identificacion: '12345678', nombre: 'Laura Sofia Martinez', ficha: '2875901', estado: 'Activo' },
    { identificacion: '87654321', nombre: 'Juan Diego Ramirez', ficha: '2875901', estado: 'Activo' },
    { identificacion: '11223344', nombre: 'Maria Camila Torres', ficha: '2875902', estado: 'Inactivo' },
    { identificacion: '99887766', nombre: 'Carlos Mendoza', ficha: '2875903', estado: 'Activo' },
    { identificacion: '55667788', nombre: 'Valentina Rojas', ficha: '2875902', estado: 'Activo' },
  ]);

  // Filtrar los datos basados en searchQuery (lo que busca el botón)
  const filteredAprendices = aprendices.filter((item) =>
    item.identificacion.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.ficha.toLowerCase().includes(searchQuery.toLowerCase())
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
    <div className="aprendices-container">
      <div className="aprendices-header">
        <h2>Lista de Aprendices</h2>
        <button className="btn-carga">Carga</button>
      </div>

      {/* Barra de búsqueda con botón Buscar y Limpiar */}
      <div className="search-container">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Buscar por identificación, nombre o ficha..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Busca al presionar Enter
        />
        <button className="btn-search" onClick={handleSearch}>Buscar</button>
        <button className="btn-clear" onClick={handleClear}>Limpiar</button>
      </div>

      {/* Condicional: Si no hay resultados, muestra "Dato no encontrado" */}
      {filteredAprendices.length === 0 ? (
        <div className="not-found">
          <h2><i className="fas fa-exclamation-circle"></i> Dato no encontrado</h2>
          <p>No existe ningún aprendiz con los datos ingresados.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Identificación</th>
                <th>Nombre Completo</th>
                <th>Ficha</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredAprendices.map((item, index) => (
                <tr key={index}>
                  <td className="codigo">{item.identificacion}</td>
                  <td>{item.nombre}</td>
                  <td>{item.ficha}</td>
                  <td>
                    <span className={`status-ficha ${item.estado === 'Activo' ? 'status-activa' : 'status-inactiva'}`}>
                      {item.estado}
                    </span>
                  </td>
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

export default Aprendices;