// src/components/CharlasProgramadas.jsx
import React, { useState } from 'react';
import './CharlasProgramadas.css';

const CharlasProgramadas = () => {
  const [charlaSeleccionada, setCharlaSeleccionada] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [charlas, setCharlas] = useState([
    { 
      id: 1, 
      nombre: 'Normatividad SENA',
      fecha: '22/06/2025',
      soportes: [],
      listados: [],
      fotos: []
    },
    { 
      id: 2, 
      nombre: 'Seguridad Industrial',
      fecha: '24/06/2025',
      soportes: [],
      listados: [],
      fotos: []
    },
    { 
      id: 3, 
      nombre: 'Prevención de Riesgos',
      fecha: '28/06/2025',
      soportes: [],
      listados: [],
      fotos: []
    },
    { 
      id: 4, 
      nombre: 'Selección de Alternativa Etapa Productiva',
      fecha: '02/07/2025',
      soportes: [],
      listados: [],
      fotos: []
    },
    { 
      id: 5, 
      nombre: 'Iniciación a la Vida Laboral',
      fecha: '05/07/2025',
      soportes: [],
      listados: [],
      fotos: []
    }
  ]);

  const handleIngresar = (id) => {
    const charla = charlas.find(c => c.id === id);
    setCharlaSeleccionada(charla);
  };

  const handleVolver = () => {
    setCharlaSeleccionada(null);
  };

  const handleUpload = (seccion) => {
    const input = document.createElement('input');
    input.type = 'file';
    
    if (seccion === 'fotos') {
      input.accept = '.jpg,.jpeg,.png,.gif,.webp';
    } else if (seccion === 'listados') {
      input.accept = '.xlsx,.xls,.csv';
    } else {
      input.accept = '.pdf,.docx,.pptx,.txt';
    }
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        let tipo = 'archivo';
        if (seccion === 'fotos') tipo = 'imagen';
        else if (seccion === 'listados') tipo = 'excel';
        else if (file.name.endsWith('.pdf')) tipo = 'pdf';
        else if (file.name.endsWith('.pptx')) tipo = 'ppt';

        const nuevoArchivo = { nombre: file.name, tipo: tipo };

        setCharlas(prevCharlas => 
          prevCharlas.map(charla => 
            charla.id === charlaSeleccionada.id 
              ? { ...charla, [seccion]: [...charla[seccion], nuevoArchivo] }
              : charla
          )
        );

        setCharlaSeleccionada(prev => ({
          ...prev,
          [seccion]: [...prev[seccion], nuevoArchivo]
        }));
      }
    };
    input.click();
  };

  const handleSearch = () => {
    setSearchQuery(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSearchQuery('');
  };

  // --- VISTA DE DETALLE ---
  if (charlaSeleccionada) {
    return (
      <div className="charla-detalle-pantalla">
        <div className="detalle-header">
          <button className="btn-volver-lista" onClick={handleVolver}>
            <i className="fas fa-arrow-left"></i> Volver a charlas
          </button>
          <h2 className="detalle-titulo">{charlaSeleccionada.nombre}</h2>
          <p className="detalle-subtitulo">Fecha: {charlaSeleccionada.fecha}</p>
        </div>

        <div className="detalle-grid-upload">
          <div className="upload-card-detalle">
            <div className="upload-card-header">
              <h3><i className="fas fa-paperclip"></i> Soportes</h3>
              <span className="badge-count">{charlaSeleccionada.soportes.length}</span>
            </div>
            <div className="upload-card-body">
              <button className="btn-upload-detalle" onClick={() => handleUpload('soportes')}>
                <i className="fas fa-upload"></i> Subir soporte
              </button>
              <div className="file-list-detalle">
                {charlaSeleccionada.soportes.map((s, idx) => (
                  <div key={idx} className="file-item-detalle">
                    <i className={`fas ${s.tipo === 'pdf' ? 'fa-file-pdf' : 'fa-file'}`}></i>
                    <span>{s.nombre}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="upload-card-detalle">
            <div className="upload-card-header">
              <h3><i className="fas fa-table"></i> Listados</h3>
              <span className="badge-count">{charlaSeleccionada.listados.length}</span>
            </div>
            <div className="upload-card-body">
              <button className="btn-upload-detalle" onClick={() => handleUpload('listados')}>
                <i className="fas fa-upload"></i> Subir listado
              </button>
              <div className="file-list-detalle">
                {charlaSeleccionada.listados.map((s, idx) => (
                  <div key={idx} className="file-item-detalle">
                    <i className="fas fa-file-excel"></i>
                    <span>{s.nombre}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="upload-card-detalle">
            <div className="upload-card-header">
              <h3><i className="fas fa-camera"></i> Fotos</h3>
              <span className="badge-count">{charlaSeleccionada.fotos.length}</span>
            </div>
            <div className="upload-card-body">
              <button className="btn-upload-detalle" onClick={() => handleUpload('fotos')}>
                <i className="fas fa-upload"></i> Subir foto
              </button>
              <div className="file-list-detalle">
                {charlaSeleccionada.fotos.map((s, idx) => (
                  <div key={idx} className="file-item-detalle">
                    <i className="fas fa-file-image"></i>
                    <span>{s.nombre}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- VISTA PRINCIPAL ---
  const filteredCharlas = charlas.filter((charla) =>
    charla.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="charlas-programadas-container">
      <div className="charlas-header">
        <h2>Charlas Programadas</h2>
        <button className="btn-nueva-charla">+ Nueva charla</button>
      </div>

      <div className="search-container">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Buscar por nombre de la charla..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button className="btn-search" onClick={handleSearch}>Buscar</button>
        <button className="btn-clear" onClick={handleClear}>Limpiar</button>
      </div>

      {filteredCharlas.length === 0 ? (
        <div className="not-found">
          <h2><i className="fas fa-exclamation-circle"></i> Dato no encontrado</h2>
          <p>No existe ninguna charla con el nombre ingresado.</p>
        </div>
      ) : (
        <div className="charlas-grid">
          {filteredCharlas.map((charla) => (
            <div key={charla.id} className="charla-card-minimalista">
              <div 
                className="charla-nombre-clic"
                onClick={() => handleIngresar(charla.id)}
              >
                {charla.nombre}
              </div>
              <div className="charla-flecha">
                <i className="fas fa-chevron-right"></i>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CharlasProgramadas;