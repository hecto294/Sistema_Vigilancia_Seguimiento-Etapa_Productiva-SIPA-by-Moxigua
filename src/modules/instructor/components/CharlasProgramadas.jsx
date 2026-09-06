// src/components/CharlasProgramadas.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './CharlasProgramadas.css';

const CharlasProgramadas = () => {
  const navigate = useNavigate();
  const [charlaSeleccionada, setCharlaSeleccionada] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [charlaEditando, setCharlaEditando] = useState(null);
  const [nuevaFecha, setNuevaFecha] = useState('');
  const [nuevaHora, setNuevaHora] = useState('');

  // Lista de fichas disponibles para selección múltiple
  const fichasDisponibles = [
    { id: '2875901', nombre: 'Análisis y Desarrollo de Software' },
    { id: '2875902', nombre: 'Gestión Empresarial' },
    { id: '2875903', nombre: 'Contabilidad y Finanzas' },
    { id: '2875904', nombre: 'Marketing Digital' },
    { id: '2875905', nombre: 'Electrónica' },
    { id: '2875906', nombre: 'Mecatrónica' }
  ];

  // Obtener fecha actual en formato YYYY-MM-DD para el atributo min
  const getFechaActual = () => {
    const hoy = new Date();
    const year = hoy.getFullYear();
    const month = String(hoy.getMonth() + 1).padStart(2, '0');
    const day = String(hoy.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [charlas, setCharlas] = useState([
    { 
      id: 1, 
      nombre: 'Normatividad SENA',
      fecha: '22/06/2025',
      hora: '08:00 a.m.',
      duracion: '2 horas',
      dirigidaA: ['Ficha 2875901'],
      invitados: 28,
      confirmados: 22,
      soportes: [],
      listados: [],
      fotos: []
    },
    { 
      id: 2, 
      nombre: 'Seguridad Industrial',
      fecha: '24/06/2025',
      hora: '02:00 p.m.',
      duracion: '1.5 horas',
      dirigidaA: ['Ficha 2875902'],
      invitados: 24,
      confirmados: 18,
      soportes: [],
      listados: [],
      fotos: []
    },
    { 
      id: 3, 
      nombre: 'Prevención de Riesgos',
      fecha: '28/06/2025',
      hora: '09:00 a.m.',
      duracion: '3 horas',
      dirigidaA: ['Ficha 2875903'],
      invitados: 32,
      confirmados: 20,
      soportes: [],
      listados: [],
      fotos: []
    },
    { 
      id: 4, 
      nombre: 'Selección de Alternativa Etapa Productiva',
      fecha: '02/07/2025',
      hora: '10:00 a.m.',
      duracion: '2.5 horas',
      dirigidaA: ['Ficha 2875901', 'Ficha 2875902'],
      invitados: 28,
      confirmados: 15,
      soportes: [],
      listados: [],
      fotos: []
    },
    { 
      id: 5, 
      nombre: 'Iniciación a la Vida Laboral',
      fecha: '05/07/2025',
      hora: '03:00 p.m.',
      duracion: '1 hora',
      dirigidaA: ['Ficha 2875904'],
      invitados: 20,
      confirmados: 12,
      soportes: [],
      listados: [],
      fotos: []
    }
  ]);

  // Función para crear nueva charla con SweetAlert
  const handleNuevaCharla = () => {
    const fechaActual = getFechaActual();

    // Generar opciones de fichas para el select múltiple
    const fichasOptions = fichasDisponibles.map(ficha => 
      `<option value="Ficha ${ficha.id}">Ficha ${ficha.id} - ${ficha.nombre}</option>`
    ).join('');

    Swal.fire({
      title: '📚 Crear Nueva Charla',
      html: `
        <div style="text-align: left; padding: 10px 0;">
          <div style="margin: 12px 0;">
            <label style="display: block; font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 5px;">
              Nombre de la charla *
            </label>
            <input id="nombre-charla" 
              style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
              placeholder="Ej: Normatividad SENA"
            />
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 12px 0;">
            <div>
              <label style="display: block; font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 5px;">
                Fecha *
              </label>
              <input id="fecha-charla" type="date" min="${fechaActual}"
                style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
              />
              <p style="font-size: 11px; color: #9ca3af; margin: 4px 0 0 0;">
                <i class="fas fa-info-circle"></i> No se permiten fechas anteriores a hoy
              </p>
            </div>
            <div>
              <label style="display: block; font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 5px;">
                Hora *
              </label>
              <input id="hora-charla" type="time"
                style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
              />
            </div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 12px 0;">
            <div>
              <label style="display: block; font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 5px;">
                Duración (horas) *
              </label>
              <input id="duracion-charla" type="number" step="0.5" min="0.5"
                style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
                placeholder="Ej: 2"
              />
            </div>
            <div>
              <label style="display: block; font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 5px;">
                Dirigida a (Fichas) *
              </label>
              <select id="fichas-charla" multiple 
                style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px; box-sizing: border-box; min-height: 120px;"
              >
                ${fichasOptions}
              </select>
            </div>
          </div>
          <div style="margin: 12px 0;">
            <label style="display: block; font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 5px;">
              Personas solicitadas *
            </label>
            <input id="personas-charla" type="number" min="1"
              style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
              placeholder="Ej: 28"
            />
          </div>
          <p style="font-size: 12px; color: #9ca3af; margin: 8px 0 0 0;">
            * Campos obligatorios
          </p>
        </div>
      `,
      icon: 'info',
      confirmButtonText: '✅ Crear Charla',
      confirmButtonColor: '#3ca203',
      showCancelButton: true,
      cancelButtonText: '❌ Cancelar',
      cancelButtonColor: '#ef4444',
      width: '580px',
      preConfirm: () => {
        const nombre = document.getElementById('nombre-charla').value;
        const fecha = document.getElementById('fecha-charla').value;
        const hora = document.getElementById('hora-charla').value;
        const duracion = document.getElementById('duracion-charla').value;
        const fichaSelect = document.getElementById('fichas-charla');
        const fichasSeleccionadas = Array.from(fichaSelect.selectedOptions).map(opt => opt.value);
        const personas = document.getElementById('personas-charla').value;

        if (!nombre.trim()) {
          Swal.showValidationMessage('⚠️ Por favor ingresa el nombre de la charla');
          return false;
        }
        if (!fecha) {
          Swal.showValidationMessage('⚠️ Por favor selecciona una fecha');
          return false;
        }
        const fechaSeleccionada = new Date(fecha);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        if (fechaSeleccionada < hoy) {
          Swal.showValidationMessage('⚠️ No se permiten fechas anteriores a hoy');
          return false;
        }
        if (!hora) {
          Swal.showValidationMessage('⚠️ Por favor selecciona una hora');
          return false;
        }
        if (!duracion || parseFloat(duracion) <= 0) {
          Swal.showValidationMessage('⚠️ Por favor ingresa una duración válida');
          return false;
        }
        if (fichasSeleccionadas.length === 0) {
          Swal.showValidationMessage('⚠️ Por favor selecciona al menos una ficha');
          return false;
        }
        if (!personas || parseInt(personas) <= 0) {
          Swal.showValidationMessage('⚠️ Por favor ingresa el número de personas solicitadas');
          return false;
        }

        return { nombre, fecha, hora, duracion, fichasSeleccionadas, personas };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const { nombre, fecha, hora, duracion, fichasSeleccionadas, personas } = result.value;
        
        // Formatear fecha para mostrar
        const fechaObj = new Date(fecha + 'T' + hora);
        const fechaFormateada = fechaObj.toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
        const horaFormateada = fechaObj.toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });

        // Crear nueva charla
        const nuevaCharla = {
          id: charlas.length + 1,
          nombre: nombre,
          fecha: fechaFormateada,
          hora: horaFormateada,
          duracion: `${duracion} horas`,
          dirigidaA: fichasSeleccionadas,
          invitados: parseInt(personas),
          confirmados: 0,
          soportes: [],
          listados: [],
          fotos: []
        };

        setCharlas([...charlas, nuevaCharla]);

        // Mostrar confirmación con las fichas seleccionadas
        const fichasTexto = fichasSeleccionadas.join(', ');
        Swal.fire({
          title: '✅ ¡Charla creada exitosamente!',
          html: `
            <div style="text-align: left; padding: 10px 0;">
              <p style="margin: 8px 0; font-size: 15px; color: #1f2937;">
                <strong>Nombre:</strong> ${nombre}
              </p>
              <p style="margin: 8px 0; font-size: 14px; color: #6b7280;">
                <strong>Fecha:</strong> ${fechaFormateada} - ${horaFormateada}
              </p>
              <p style="margin: 8px 0; font-size: 14px; color: #6b7280;">
                <strong>Duración:</strong> ${duracion} horas
              </p>
              <p style="margin: 8px 0; font-size: 14px; color: #6b7280;">
                <strong>Dirigida a:</strong> ${fichasTexto}
              </p>
              <p style="margin: 8px 0; font-size: 14px; color: #6b7280;">
                <strong>Personas solicitadas:</strong> ${personas}
              </p>
              <p style="margin: 12px 0 0 0; font-size: 13px; color: #9ca3af; font-style: italic; border-top: 1px dashed #e5e7eb; padding-top: 10px;">
                La charla ha sido programada exitosamente.
              </p>
            </div>
          `,
          icon: 'success',
          confirmButtonText: '✅ Aceptar',
          confirmButtonColor: '#3ca203',
          timer: 3000,
          timerProgressBar: true
        });
      }
    });
  };

  // ... resto de funciones (handleIngresar, handleVolver, handleSearch, handleClear, handleUpload, etc.)

  const handleIngresar = (id) => {
    const charla = charlas.find(c => c.id === id);
    setCharlaSeleccionada(charla);
  };

  const handleVolver = () => {
    setCharlaSeleccionada(null);
  };

  const handleSearch = () => {
    setSearchQuery(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSearchQuery('');
  };

  // ==========================================================
  // ⬇️ FUNCIÓN MODIFICADA: SOLO ACEPTA PDF
  // ==========================================================
  const handleUpload = (seccion) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf'; // 🔒 SOLO PDF en las 3 secciones

    input.onchange = (e) => {
      const file = e.target.files[0];
      
      // Validación estricta: solo PDF
      if (file && file.type !== 'application/pdf') {
        Swal.fire({
          title: '⚠️ Archivo no válido',
          text: 'Solo se permiten archivos en formato PDF.',
          icon: 'warning',
          confirmButtonColor: '#f59e0b'
        });
        return;
      }

      if (file) {
        const nuevoArchivo = { nombre: file.name, tipo: 'pdf' };
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

  const abrirModalEdicion = (charla, e) => {
    e.stopPropagation();
    setCharlaEditando(charla);
    const fechaParts = charla.fecha.split('/');
    const fechaFormateada = `${fechaParts[2]}-${fechaParts[1]}-${fechaParts[0]}`;
    setNuevaFecha(fechaFormateada);
    setNuevaHora(charla.hora);
  };

  const cerrarModalEdicion = () => {
    setCharlaEditando(null);
    setNuevaFecha('');
    setNuevaHora('');
  };

  const guardarEdicion = () => {
    if (!nuevaFecha || !nuevaHora) {
      alert('Por favor, completa la fecha y la hora.');
      return;
    }

    const fechaSeleccionada = new Date(nuevaFecha);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    if (fechaSeleccionada < hoy) {
      alert('⚠️ No se permiten fechas anteriores a hoy.');
      return;
    }

    const fechaObj = new Date(nuevaFecha);
    const fechaFormateada = fechaObj.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    setCharlas(prevCharlas => 
      prevCharlas.map(charla => 
        charla.id === charlaEditando.id 
          ? { ...charla, fecha: fechaFormateada, hora: nuevaHora }
          : charla
      )
    );
    
    Swal.fire({
      title: '✅ ¡Fecha actualizada!',
      text: `La charla "${charlaEditando.nombre}" ha sido reprogramada para el ${fechaFormateada} a las ${nuevaHora}`,
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#3ca203',
      timer: 2500,
      timerProgressBar: true
    });
    cerrarModalEdicion();
  };

  // Calcular porcentaje de confirmados
  const calcularPorcentaje = (confirmados, invitados) => {
    if (invitados === 0) return 0;
    return Math.round((confirmados / invitados) * 100);
  };

  // Función para obtener color según porcentaje
  const getColorPorcentaje = (porcentaje) => {
    if (porcentaje >= 80) return '#10b981';
    if (porcentaje >= 50) return '#f59e0b';
    return '#ef4444';
  };

  // --- PANTALLA DE DETALLE ---
  if (charlaSeleccionada) {
    const fichasTexto = Array.isArray(charlaSeleccionada.dirigidaA) 
      ? charlaSeleccionada.dirigidaA.join(', ') 
      : charlaSeleccionada.dirigidaA;

    return (
      <div className="charla-detalle-pantalla">
        <div className="detalle-header">
          <button className="btn-volver-lista" onClick={handleVolver}>
            <i className="fas fa-arrow-left"></i> Volver a charlas
          </button>
          <h2 className="detalle-titulo">{charlaSeleccionada.nombre}</h2>
          <p className="detalle-subtitulo">Fecha: {charlaSeleccionada.fecha} • Hora: {charlaSeleccionada.hora}</p>
          <p className="detalle-subtitulo">Duración: {charlaSeleccionada.duracion}</p>
          <p className="detalle-subtitulo">Dirigida a: {fichasTexto}</p>
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
                    <i className="fas fa-file-pdf"></i>
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
                    <i className="fas fa-file-pdf"></i>
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
                    <i className="fas fa-file-pdf"></i>
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

  // --- PANTALLA DE LISTA ---
  const filteredCharlas = charlas.filter((charla) =>
    charla.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="charlas-programadas-container">
      {/* MIGA DE PAN */}
      <nav style={{ 
        padding: '10px 0', 
        marginBottom: '15px', 
        fontSize: '14px',
        background: 'transparent',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <ol style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          alignItems: 'center', 
          listStyle: 'none', 
          margin: 0, 
          padding: 0, 
          gap: '4px' 
        }}>
          <li style={{ display: 'flex', alignItems: 'center', color: '#6b7280', fontSize: '14px' }}>
            <Link to="/instructor" style={{ color: '#3ca203', textDecoration: 'none', fontWeight: '500' }}>
              Inicio
            </Link>
            <span style={{ margin: '0 4px', color: '#9ca3af' }}> &gt; </span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', color: '#6b7280', fontSize: '14px' }}>
            <Link to="/instructor/charlas-programadas" style={{ color: '#3ca203', textDecoration: 'none', fontWeight: '500' }}>
              Charlas
            </Link>
            <span style={{ margin: '0 4px', color: '#9ca3af' }}> &gt; </span>
          </li>
          <li style={{ display: 'flex', alignItems: 'center', color: '#1f2937', fontSize: '14px', fontWeight: '600' }}>
            Charlas Programadas
          </li>
        </ol>
      </nav>

      <div className="charlas-header">
        <h2>Charlas Programadas</h2>
        <button className="btn-nueva-charla" onClick={handleNuevaCharla}>
          <i className="fas fa-plus"></i> Nueva charla
        </button>
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
          {filteredCharlas.map((charla) => {
            const porcentaje = calcularPorcentaje(charla.confirmados, charla.invitados);
            const color = getColorPorcentaje(porcentaje);
            const fichasTexto = Array.isArray(charla.dirigidaA) 
              ? charla.dirigidaA.join(', ') 
              : charla.dirigidaA;

            return (
              <div key={charla.id} className="charla-card-minimalista" onClick={() => handleIngresar(charla.id)}>
                <div className="charla-info">
                  <div className="charla-nombre">{charla.nombre}</div>
                  <div className="charla-meta">
                    <span className="charla-fecha">
                      <i className="fas fa-calendar-alt"></i> {charla.fecha} - {charla.hora}
                    </span>
                    <span className="charla-duracion">
                      <i className="fas fa-clock"></i> {charla.duracion}
                    </span>
                    <span className="charla-dirigida">
                      <i className="fas fa-users"></i> {fichasTexto}
                    </span>
                  </div>
                  <div className="charla-invitados">
                    <div className="invitados-info">
                      <span>{charla.invitados} personas solicitadas</span>
                      <span className="porcentaje" style={{ color: color }}>
                        {porcentaje}%
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ 
                          width: `${porcentaje}%`,
                          background: color
                        }}
                      />
                    </div>
                  </div>
                </div>
                <button
                  className="btn-editar-charla"
                  onClick={(e) => {
                    e.stopPropagation();
                    abrirModalEdicion(charla, e);
                  }}
                >
                  <i className="fas fa-pen" /> Editar fecha
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL DE EDICIÓN */}
      {charlaEditando && (
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
          onClick={cerrarModalEdicion}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '16px',
              maxWidth: '450px',
              width: '90%',
              padding: '30px',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={cerrarModalEdicion}
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

            <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1f2937', marginBottom: '15px' }}>
              Editar Fecha y Hora
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '20px' }}>
              {charlaEditando.nombre}
            </p>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Nueva Fecha</label>
              <input
                type="date"
                min={getFechaActual()}
                value={nuevaFecha}
                onChange={(e) => setNuevaFecha(e.target.value)}
                style={{ width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
              />
              <p style={{ fontSize: '11px', color: '#9ca3af', margin: '4px 0 0 0' }}>
                <i className="fas fa-info-circle"></i> No se permiten fechas anteriores a hoy
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>Nueva Hora</label>
              <input
                type="time"
                value={nuevaHora}
                onChange={(e) => setNuevaHora(e.target.value)}
                style={{ width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={cerrarModalEdicion}
                style={{ background: '#e5e7eb', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}
              >
                Cancelar
              </button>
              <button
                onClick={guardarEdicion}
                style={{ background: '#3ca203', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharlasProgramadas;
