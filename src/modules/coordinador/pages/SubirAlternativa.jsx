// src/modules/coordinador/pages/SubirAlternativa.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Breadcrumb from '../../shared/components/Breadcrumb';
import { fichaService } from '@/core/services/fichaService';
import { procesoService } from '@/core/services/procesoService';
import { importacionService } from '@/core/services/importacionService';
import './SubirAlternativa.css';

const SubirAlternativa = () => {
  const navigate = useNavigate();
  const [selectedFicha, setSelectedFicha] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchAprendizTerm, setSearchAprendizTerm] = useState('');
  const [searchAprendizQuery, setSearchAprendizQuery] = useState('');

  const [fichas, setFichas] = useState([]);
  const [modalidades, setModalidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      setError(null);

      const fichasData = await fichaService.getFichas({ solo_activas: true });
      console.log('📋 Fichas:', fichasData);

      const modalidadesData = await procesoService.getModalidades();
      console.log('📚 Modalidades:', modalidadesData);
      setModalidades(Array.isArray(modalidadesData) ? modalidadesData : []);

      const procesosData = await procesoService.getProcesos({ solo_activos: true });
      console.log('👥 Procesos:', procesosData);

      const fichasConAprendices = (Array.isArray(fichasData) ? fichasData : []).map((f) => {
        const aprendicesDeFicha = (Array.isArray(procesosData) ? procesosData : [])
          .filter((p) => p.ficha_id === f.id)
          .map((p) => ({
            proceso_id: p.id,
            aprendiz_id: p.aprendiz_id,
            nombre: p.aprendiz_nombre || 'Sin nombre',
            modalidad_id: p.modalidad_id,
            modalidad_nombre: p.modalidad_nombre || null,
            alternativa: p.modalidad_nombre || null,
          }));

        return {
          id: f.numero_ficha,
          fichaId: f.id,
          programa: f.programa_nombre || 'Sin programa',
          aprendices: aprendicesDeFicha,
        };
      });

      setFichas(fichasConAprendices);
    } catch (err) {
      console.error('Error al cargar:', err);
      setError(err.message || 'Error al cargar datos');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => setSearchQuery(searchTerm);
  const handleClear = () => {
    setSearchTerm('');
    setSearchQuery('');
  };

  const handleSearchAprendiz = () => setSearchAprendizQuery(searchAprendizTerm);
  const handleClearAprendiz = () => {
    setSearchAprendizTerm('');
    setSearchAprendizQuery('');
  };

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

  const handleAsignarAlternativa = async (aprendiz) => {
    const alternativasOptions = modalidades
      .map(
        (m) =>
          `<option value="${m.id}" ${
            aprendiz.modalidad_id === m.id ? 'selected' : ''
          }>${m.nombre}</option>`
      )
      .join('');

    const result = await Swal.fire({
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
        const val = document.getElementById('alternativa-select').value;
        if (!val) {
          Swal.showValidationMessage('⚠️ Por favor selecciona una alternativa');
          return false;
        }
        return { modalidad_id: parseInt(val) };
      },
    });

    if (!result.isConfirmed || !result.value) return;

    const { modalidad_id } = result.value;
    const modalidadSeleccionada = modalidades.find((m) => m.id === modalidad_id);

    try {
      Swal.fire({
        title: 'Guardando...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      await procesoService.asignarAlternativa(aprendiz.proceso_id, modalidad_id);

      const modalidadNombre = modalidadSeleccionada?.nombre || '';

      setFichas((prev) =>
        prev.map((f) =>
          f.fichaId === selectedFicha.fichaId
            ? {
                ...f,
                aprendices: f.aprendices.map((a) =>
                  a.proceso_id === aprendiz.proceso_id
                    ? {
                        ...a,
                        modalidad_id,
                        modalidad_nombre: modalidadNombre,
                        alternativa: modalidadNombre,
                      }
                    : a
                ),
              }
            : f
        )
      );

      setSelectedFicha((prev) => ({
        ...prev,
        aprendices: prev.aprendices.map((a) =>
          a.proceso_id === aprendiz.proceso_id
            ? {
                ...a,
                modalidad_id,
                modalidad_nombre: modalidadNombre,
                alternativa: modalidadNombre,
              }
            : a
        ),
      }));

      Swal.fire({
        title: '✅ ¡Alternativa asignada!',
        html: `
          <div style="text-align: left; padding: 10px 0;">
            <p style="margin: 8px 0; font-size: 15px; color: #1f2937;">
              <strong>Aprendiz:</strong> ${aprendiz.nombre}
            </p>
            <p style="margin: 8px 0; font-size: 15px; color: #1f2937;">
              <strong>Alternativa:</strong> ${modalidadSeleccionada?.nombre || '—'}
            </p>
          </div>
        `,
        icon: 'success',
        confirmButtonText: '✅ Aceptar',
        confirmButtonColor: '#3ca203',
        timer: 2500,
        timerProgressBar: true,
      });
    } catch (err) {
      console.error('❌ Error al asignar:', err);
      Swal.fire({
        title: '❌ Error',
        text: err.message || 'No se pudo asignar la alternativa',
        icon: 'error',
        confirmButtonColor: '#dc2626',
      });
    }
  };

  const handleCargaMasiva = () => {
    Swal.fire({
      title: '📤 Carga Masiva de Alternativas',
      html: `
        <div style="text-align: left; padding: 5px 0;">
          <div style="margin: 15px 0; padding: 20px; border: 2px dashed #d1d5db; border-radius: 8px; text-align: center; background: #f9fafb;">
            <i class="fas fa-cloud-upload-alt" style="font-size: 48px; color: #3ca203;"></i>
            <p style="margin: 10px 0 0 0; color: #6b7280; font-size: 14px;">
              Selecciona un archivo Excel (.xlsx) o CSV
            </p>
            <p style="font-size: 12px; color: #9ca3af; margin: 5px 0 0 0;">
              Columnas: <strong>documento</strong> (o <strong>email</strong>) y <strong>modalidad</strong>
            </p>
          </div>

          <div style="margin: 15px 0;">
            <label style="display: block; font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 5px;">
              Archivo *
            </label>
            <input type="file" id="archivo-carga-masiva" accept=".xlsx,.xls,.csv"
              style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
            />
          </div>

          <div style="background: #eff6ff; padding: 10px 12px; border-radius: 6px; border: 1px solid #bfdbfe; font-size: 12px; color: #1e40af;">
            <i class="fas fa-info-circle"></i>
            <strong>Ejemplo del archivo:</strong>
            <div style="margin-top: 6px; font-family: monospace; background: white; padding: 6px; border-radius: 4px;">
              documento | modalidad<br/>
              111111111 | Monitoria<br/>
              222222222 | Vínculo laboral
            </div>
          </div>
        </div>
      `,
      icon: 'info',
      confirmButtonText: '📤 Subir y Procesar',
      confirmButtonColor: '#3ca203',
      showCancelButton: true,
      cancelButtonText: '❌ Cancelar',
      cancelButtonColor: '#ef4444',
      width: '560px',
      preConfirm: () => {
        const archivo = document.getElementById('archivo-carga-masiva').files[0];
        if (!archivo) {
          Swal.showValidationMessage('⚠️ Por favor selecciona un archivo');
          return false;
        }
        return { archivo };
      },
    }).then(async (result) => {
      if (!result.isConfirmed || !result.value) return;

      const { archivo } = result.value;

      try {
        Swal.fire({
          title: 'Procesando archivo...',
          html: 'Esto puede tomar unos segundos.',
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading(),
        });

        const respuesta = await importacionService.importar(
          'procesos-alternativas',
          archivo
        );

        console.log('📤 Resultado carga masiva:', respuesta);

        const { total_filas, filas_insertadas, filas_con_error, errores } = respuesta;

        await cargarDatos();

        if (filas_con_error === 0) {
          Swal.fire({
            title: '✅ ¡Carga completada!',
            html: `
              <div style="text-align: left; padding: 10px 0;">
                <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; border: 1px solid #bbf7d0;">
                  <p style="margin: 5px 0; font-size: 14px;"><strong>Total filas:</strong> ${total_filas}</p>
                  <p style="margin: 5px 0; font-size: 14px; color: #047857;"><strong>✅ Actualizados:</strong> ${filas_insertadas}</p>
                  <p style="margin: 5px 0; font-size: 14px; color: #dc2626;"><strong>❌ Con error:</strong> ${filas_con_error}</p>
                </div>
              </div>
            `,
            icon: 'success',
            confirmButtonColor: '#3ca203',
            confirmButtonText: '✅ Aceptar',
          });
        } else {
          const erroresTexto = (errores || [])
            .slice(0, 10)
            .map((e) => `• Fila ${e.fila || '?'}: ${e.mensaje || JSON.stringify(e)}`)
            .join('<br/>');

          Swal.fire({
            title: '⚠️ Carga con advertencias',
            html: `
              <div style="text-align: left; padding: 10px 0;">
                <div style="background: #f0fdf4; padding: 12px; border-radius: 8px; border: 1px solid #bbf7d0; margin-bottom: 10px;">
                  <p style="margin: 5px 0; font-size: 14px;"><strong>Total:</strong> ${total_filas}</p>
                  <p style="margin: 5px 0; font-size: 14px; color: #047857;"><strong>✅ Actualizados:</strong> ${filas_insertadas}</p>
                  <p style="margin: 5px 0; font-size: 14px; color: #dc2626;"><strong>❌ Errores:</strong> ${filas_con_error}</p>
                </div>
                <div style="background: #fef2f2; padding: 12px; border-radius: 8px; border: 1px solid #fecaca; max-height: 200px; overflow-y: auto;">
                  <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: bold;">Errores:</p>
                  <div style="font-size: 12px;">${erroresTexto}</div>
                </div>
              </div>
            `,
            icon: 'warning',
            confirmButtonColor: '#f59e0b',
            confirmButtonText: 'Aceptar',
            width: '600px',
          });
        }
      } catch (err) {
        console.error('❌ Error en carga masiva:', err);
        Swal.fire({
          title: '❌ Error',
          text: err.message || 'No se pudo procesar el archivo',
          icon: 'error',
          confirmButtonColor: '#dc2626',
        });
      }
    });
  };

  if (loading) {
    return (
      <div className="subir-alternativa-container">
        <Breadcrumb />
        <div style={{ padding: '60px', textAlign: 'center', color: '#6b7280' }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: '32px', color: '#3ca203' }}></i>
          <p style={{ marginTop: '15px' }}>Cargando datos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="subir-alternativa-container">
        <Breadcrumb />
        <div style={{ padding: '60px', textAlign: 'center' }}>
          <i className="fas fa-exclamation-circle" style={{ fontSize: '40px', color: '#dc2626' }}></i>
          <h3 style={{ color: '#dc2626', marginTop: '15px' }}>Error</h3>
          <p style={{ color: '#6b7280' }}>{error}</p>
          <button onClick={cargarDatos} className="btn-search" style={{ marginTop: '15px' }}>
            <i className="fas fa-redo"></i> Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (selectedFicha) {
    const filteredAprendices = selectedFicha.aprendices.filter((a) =>
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
                  <tr key={aprendiz.proceso_id}>
                    <td>{index + 1}</td>
                    <td className="nombre-aprendiz">{aprendiz.nombre}</td>
                    <td>{selectedFicha.id}</td>
                    <td>
                      <span
                        className={`alternativa-status ${
                          aprendiz.alternativa ? 'asignado' : 'sin-asignar'
                        }`}
                      >
                        {aprendiz.alternativa || 'Sin asignar'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        className={`btn-asignar ${aprendiz.alternativa ? 'asignado' : ''}`}
                        onClick={() => handleAsignarAlternativa(aprendiz)}
                      >
                        <i
                          className={`fas ${
                            aprendiz.alternativa ? 'fa-check' : 'fa-plus'
                          }`}
                        ></i>
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

  const filteredFichas = fichas.filter(
    (f) =>
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
          <p className="subtitulo">
            Selecciona una ficha para asignar la alternativa de etapa productiva a los aprendices.
          </p>
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
            const sinAsignar = ficha.aprendices.filter((a) => !a.alternativa).length;
            const total = ficha.aprendices.length;
            const asignados = total - sinAsignar;

            return (
              <div
                key={ficha.fichaId}
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