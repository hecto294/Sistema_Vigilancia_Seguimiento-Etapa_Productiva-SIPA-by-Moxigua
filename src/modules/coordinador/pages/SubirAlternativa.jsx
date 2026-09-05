// src/modules/coordinador/pages/SubirAlternativa.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
// ✅ Ruta CORRECTA - Breadcrumb está en shared/components
import Breadcrumb from '../../shared/components/Breadcrumb';
import './SubirAlternativa.css';

const SubirAlternativa = () => {
  const navigate = useNavigate();
  const [selectedFicha, setSelectedFicha] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchAprendizTerm, setSearchAprendizTerm] = useState('');
  const [searchAprendizQuery, setSearchAprendizQuery] = useState('');

  // Datos de ejemplo con fichas y aprendices
  const [fichas, setFichas] = useState([
    {
      id: '2875901',
      programa: 'Análisis y Desarrollo de Software',
      aprendices: [
        { id: 1, nombre: 'Laura Sofia Martinez', alternativa: null },
        { id: 2, nombre: 'Juan Diego Ramirez', alternativa: null },
        { id: 3, nombre: 'Maria Camila Torres', alternativa: null }
      ]
    },
    {
      id: '2875902',
      programa: 'Gestión Empresarial',
      aprendices: [
        { id: 4, nombre: 'Carlos Mendoza', alternativa: 'Vínculo Formativo (Pasantía)' },
        { id: 5, nombre: 'Valentina Rojas', alternativa: null },
        { id: 6, nombre: 'Andrés Felipe Castro', alternativa: null }
      ]
    },
    {
      id: '2875903',
      programa: 'Contabilidad y Finanzas',
      aprendices: [
        { id: 7, nombre: 'Luisa Fernanda Gomez', alternativa: null },
        { id: 8, nombre: 'Santiago Pérez', alternativa: null }
      ]
    },
    {
      id: '2875904',
      programa: 'Marketing Digital',
      aprendices: [
        { id: 9, nombre: 'Ana María Rojas', alternativa: 'Contrato de Aprendizaje' },
        { id: 10, nombre: 'David Alejandro Castro', alternativa: null }
      ]
    }
  ]);

  // Opciones de alternativas
  const alternativas = [
    'Contrato de Aprendizaje',
    'Vínculo Formativo (Pasantía)',
    'Monitoria',
    'Proyecto Productivo',
    'Vínculo Laboral'
  ];

  const handleSearch = () => setSearchQuery(searchTerm);
  const handleClear = () => { setSearchTerm(''); setSearchQuery(''); };

  const handleSearchAprendiz = () => setSearchAprendizQuery(searchAprendizTerm);
  const handleClearAprendiz = () => { setSearchAprendizTerm(''); setSearchAprendizQuery(''); };

  const handleSelectFicha = (ficha) => {
    setSelectedFicha(ficha);
    setSearchAprendizTerm('');
    setSearchAprendizQuery('');
  };

  const handleBackToFichas = () => {
    setSelectedFicha(null);
    setSearchTerm('');
    setSearchQuery('');
  };

  // ==========================================================
  // FUNCIÓN PARA ASIGNAR ALTERNATIVA A UN APRENDIZ
  // ==========================================================
  const handleAsignarAlternativa = (aprendiz) => {
    const alternativasOptions = alternativas.map(alt => 
      `<option value="${alt}" ${aprendiz.alternativa === alt ? 'selected' : ''}>${alt}</option>`
    ).join('');

    Swal.fire({
      title: '📝 Asignar Alternativa',
      html: `
        <div style="text-align: left; padding: 5px 0;">
          <p style="margin: 8px 0; font-size: 15px; color: #1f2937;">
            <strong>Aprendiz:</strong> ${aprendiz.nombre}
          </p>
          <p style="margin: 8px 0; font-size: 15px; color: #1f2937;">
            <strong>Ficha:</strong> ${selectedFicha?.id}
          </p>
          <div style="margin: 15px 0;">
            <label style="display: block; font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 5px;">
              Selecciona la alternativa *
            </label>
            <select id="alternativa-select" 
              style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
            >
              <option value="">-- Seleccionar --</option>
              ${alternativasOptions}
            </select>
          </div>
          <p style="font-size: 12px; color: #9ca3af; margin: 8px 0 0 0;">
            * Campo obligatorio
          </p>
        </div>
      `,
      icon: 'info',
      confirmButtonText: '✅ Asignar Alternativa',
      confirmButtonColor: '#3ca203',
      showCancelButton: true,
      cancelButtonText: '❌ Cancelar',
      cancelButtonColor: '#ef4444',
      width: '480px',
      preConfirm: () => {
        const alternativa = document.getElementById('alternativa-select').value;
        if (!alternativa) {
          Swal.showValidationMessage('⚠️ Por favor selecciona una alternativa');
          return false;
        }
        return { alternativa };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const { alternativa } = result.value;
        
        setFichas(prevFichas => 
          prevFichas.map(ficha => {
            if (ficha.id === selectedFicha.id) {
              return {
                ...ficha,
                aprendices: ficha.aprendices.map(a => 
                  a.id === aprendiz.id ? { ...a, alternativa: alternativa } : a
                )
              };
            }
            return ficha;
          })
        );

        Swal.fire({
          title: '✅ ¡Alternativa asignada!',
          html: `
            <div style="text-align: left; padding: 10px 0;">
              <p style="margin: 8px 0; font-size: 15px; color: #1f2937;">
                <strong>Aprendiz:</strong> ${aprendiz.nombre}
              </p>
              <p style="margin: 8px 0; font-size: 15px; color: #1f2937;">
                <strong>Alternativa:</strong> ${alternativa}
              </p>
              <p style="margin: 12px 0 0 0; font-size: 13px; color: #9ca3af; font-style: italic; border-top: 1px dashed #e5e7eb; padding-top: 10px;">
                La alternativa ha sido asignada exitosamente.
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

  // ==========================================================
  // FUNCIÓN PARA CARGA MASIVA
  // ==========================================================
  const handleCargaMasiva = () => {
    Swal.fire({
      title: '📤 Carga Masiva de Alternativas',
      html: `
        <div style="text-align: left; padding: 5px 0;">
          <div style="margin: 15px 0; padding: 20px; border: 2px dashed #d1d5db; border-radius: 8px; text-align: center;">
            <i class="fas fa-cloud-upload-alt" style="font-size: 48px; color: #3ca203;"></i>
            <p style="margin: 10px 0 0 0; color: #6b7280;">
              Arrastra o haz clic para seleccionar un archivo
            </p>
            <p style="font-size: 12px; color: #9ca3af;">
              Formatos permitidos: .xlsx, .xls, .csv
            </p>
          </div>
          <div style="margin: 15px 0;">
            <label style="display: block; font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 5px;">
              Ficha
            </label>
            <select id="ficha-carga" 
              style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
            >
              ${fichas.map(f => `<option value="${f.id}">${f.id} - ${f.programa}</option>`).join('')}
            </select>
          </div>
          <div style="margin: 15px 0;">
            <label style="display: block; font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 5px;">
              Archivo
            </label>
            <input type="file" id="archivo-carga" accept=".xlsx,.xls,.csv"
              style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
            />
          </div>
        </div>
      `,
      icon: 'info',
      confirmButtonText: '📤 Subir Archivo',
      confirmButtonColor: '#3ca203',
      showCancelButton: true,
      cancelButtonText: '❌ Cancelar',
      cancelButtonColor: '#ef4444',
      width: '520px',
      preConfirm: () => {
        const ficha = document.getElementById('ficha-carga').value;
        const archivo = document.getElementById('archivo-carga').files[0];
        
        if (!ficha) {
          Swal.showValidationMessage('⚠️ Por favor selecciona una ficha');
          return false;
        }
        if (!archivo) {
          Swal.showValidationMessage('⚠️ Por favor selecciona un archivo');
          return false;
        }
        
        return { ficha, archivo };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        Swal.fire({
          title: '✅ ¡Carga masiva iniciada!',
          html: `
            <div style="text-align: left; padding: 10px 0;">
              <p style="margin: 8px 0; font-size: 15px; color: #1f2937;">
                <strong>Ficha:</strong> ${result.value.ficha}
              </p>
              <p style="margin: 8px 0; font-size: 14px; color: #6b7280;">
                <strong>Archivo:</strong> ${result.value.archivo.name}
              </p>
              <p style="margin: 8px 0; font-size: 14px; color: #6b7280;">
                <i class="fas fa-spinner fa-pulse" style="color: #3ca203;"></i>
                Procesando archivo...
              </p>
              <p style="margin: 12px 0 0 0; font-size: 13px; color: #9ca3af; font-style: italic; border-top: 1px dashed #e5e7eb; padding-top: 10px;">
                Las alternativas se asignarán automáticamente.
              </p>
            </div>
          `,
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3ca203',
          timer: 2500,
          timerProgressBar: true
        });
      }
    });
  };

  // --- VISTA DE APRENDICES DE UNA FICHA ---
  if (selectedFicha) {
    const filteredAprendices = selectedFicha.aprendices.filter(a =>
      a.nombre.toLowerCase().includes(searchAprendizQuery.toLowerCase())
    );

    return (
      <div className="subir-alternativa-container">
        <Breadcrumb />

        <div className="subir-alternativa-header">
          <div className="header-left">
            <button className="btn-back" onClick={handleBackToFichas}>
              <i className="fas fa-arrow-left"></i> Volver a fichas
            </button>
            <h2>Ficha {selectedFicha.id}</h2>
            <p className="subtitulo">{selectedFicha.programa}</p>
          </div>
        </div>

        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar aprendiz por nombre..."
            value={searchAprendizTerm}
            onChange={(e) => setSearchAprendizTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchAprendiz()}
          />
          <button className="btn-search" onClick={handleSearchAprendiz}>
            <i className="fas fa-search"></i> Buscar
          </button>
          <button className="btn-clear" onClick={handleClearAprendiz}>
            <i className="fas fa-times"></i> Limpiar
          </button>
          <button className="btn-carga-masiva" onClick={handleCargaMasiva}>
            <i className="fas fa-upload"></i> Carga Masiva
          </button>
        </div>

        <div className="table-wrapper">
          <table className="alternativa-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Aprendiz</th>
                <th>Ficha</th>
                <th>Alternativa</th>
                <th style={{ textAlign: 'center' }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {filteredAprendices.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>
                    <i className="fas fa-exclamation-circle" style={{ color: '#dc2626', fontSize: '24px' }}></i>
                    <h3 style={{ color: '#dc2626', margin: '10px 0 5px 0' }}>Dato no encontrado</h3>
                    <p style={{ color: '#6b7280' }}>No se encontraron aprendices con ese nombre.</p>
                  </td>
                </tr>
              ) : (
                filteredAprendices.map((aprendiz, index) => (
                  <tr key={aprendiz.id}>
                    <td>{index + 1}</td>
                    <td className="nombre-aprendiz">{aprendiz.nombre}</td>
                    <td>{selectedFicha.id}</td>
                    <td>
                      <span className={`alternativa-status ${aprendiz.alternativa ? 'asignado' : 'sin-asignar'}`}>
                        {aprendiz.alternativa || 'Sin asignar'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button 
                        className={`btn-asignar ${aprendiz.alternativa ? 'asignado' : ''}`}
                        onClick={() => handleAsignarAlternativa(aprendiz)}
                      >
                        <i className={`fas ${aprendiz.alternativa ? 'fa-check' : 'fa-plus'}`}></i>
                        {aprendiz.alternativa ? ' Asignado' : ' Asignar'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // --- VISTA PRINCIPAL (FICHAS) ---
  const filteredFichas = fichas.filter(f =>
    searchQuery === '' ||
    f.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.programa.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="subir-alternativa-container">
      <Breadcrumb />

      <div className="subir-alternativa-header">
        <div className="header-left">
          <h2>Subir Alternativa de Etapa Productiva</h2>
          <p className="subtitulo">Selecciona una ficha para asignar la alternativa de etapa productiva a los aprendices.</p>
        </div>
      </div>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar por código de ficha o programa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button className="btn-search" onClick={handleSearch}>
          <i className="fas fa-search"></i> Buscar
        </button>
        <button className="btn-clear" onClick={handleClear}>
          <i className="fas fa-times"></i> Limpiar
        </button>
        <button className="btn-carga-masiva" onClick={handleCargaMasiva}>
          <i className="fas fa-upload"></i> Carga Masiva
        </button>
      </div>

      <div className="fichas-grid">
        {filteredFichas.length === 0 ? (
          <div className="not-found">
            <i className="fas fa-exclamation-circle"></i>
            <h3>Dato no encontrado</h3>
            <p>No existe ninguna ficha con el criterio de búsqueda seleccionado.</p>
          </div>
        ) : (
          filteredFichas.map((ficha) => {
            const sinAsignar = ficha.aprendices.filter(a => !a.alternativa).length;
            const total = ficha.aprendices.length;
            const asignados = total - sinAsignar;

            return (
              <div
                key={ficha.id}
                className="ficha-card"
                onClick={() => handleSelectFicha(ficha)}
              >
                <div className="ficha-numero">{ficha.id}</div>
                <div className="ficha-programa">{ficha.programa}</div>
                <div className="ficha-progreso">
                  <span className="ficha-total">{total} aprendices</span>
                  <span className="ficha-asignados" style={{ color: '#10b981' }}>
                    {asignados} asignados
                  </span>
                  <span className="ficha-pendientes" style={{ color: '#ef4444' }}>
                    {sinAsignar} pendientes
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SubirAlternativa;