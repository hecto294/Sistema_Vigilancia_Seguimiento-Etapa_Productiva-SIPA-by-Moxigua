// src/pages/coordinador/VerFichas.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Breadcrumb from '../../shared/components/Breadcrumb';
import * as XLSX from 'xlsx'; // 👈 IMPORTAMOS LA LIBRERÍA PARA LEER EXCEL

const VerFichas = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Fichas con propiedad estadoManual (null = automático por fecha)
  const [fichas, setFichas] = useState([
    { idFicha: '2875901', programa: 'Análisis y Desarrollo de Software', nivel: 'Tecnólogo', aprendices: 28, estado: 'Activa', estadoManual: null },
    { idFicha: '2875902', programa: 'Gestión Empresarial', nivel: 'Tecnólogo', aprendices: 24, estado: 'Activa', estadoManual: null },
    { idFicha: '2875903', programa: 'Contabilidad y Finanzas', nivel: 'Técnico', aprendices: 32, estado: 'Inactiva', estadoManual: null },
  ]);

  const handleSearch = () => setSearchQuery(searchTerm);
  const handleClear = () => { setSearchTerm(''); setSearchQuery(''); };

  const filteredFichas = fichas.filter(f =>
    f.idFicha.includes(searchQuery) || f.programa.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ==========================================================
  // ⬇️ FUNCIÓN PARA CARGA MASIVA DE FICHAS (EXCEL/CSV)
  // ==========================================================
  const handleCargaMasiva = async () => {
    const { value: file } = await Swal.fire({
      title: '📥 Carga Masiva de Fichas',
      html: `
        <div style="text-align: left; padding: 10px 0;">
          <div style="margin-bottom: 15px; padding: 20px; border: 2px dashed #3ca203; border-radius: 10px; text-align: center;">
            <i class="fas fa-cloud-upload-alt" style="font-size: 48px; color: #3ca203;"></i>
            <p style="margin: 10px 0 0 0; font-size: 14px; color: #6b7280;">
              <strong>Arrastra o selecciona un archivo Excel (.xlsx) o CSV</strong>
            </p>
            <p style="font-size: 12px; color: #9ca3af; margin: 5px 0 0 0;">
              El archivo debe tener columnas: <strong>Código, Programa, Nivel, Aprendices, Estado</strong>
            </p>
          </div>
          <div style="margin: 15px 0;">
            <label style="display: block; font-weight: 600; margin-bottom: 5px; color: #1f2937; font-size: 14px;">
              Selecciona tu archivo *
            </label>
            <input type="file" id="archivoFichas" accept=".xlsx,.xls,.csv" 
              style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px;" />
          </div>
          <div style="margin-top: 15px; padding: 10px; background: #f8fafc; border-radius: 8px;">
            <p style="margin: 0; font-size: 13px; color: #6b7280;">
              <i class="fas fa-info-circle" style="color: #3ca203;"></i>
              Si tienes un Excel con los datos, súbelo aquí. También puedes copiar y pegar datos desde Excel en el campo de texto a continuación.
            </p>
          </div>
          <div style="margin: 10px 0;">
            <label style="display: block; font-weight: 600; margin-bottom: 5px; color: #1f2937; font-size: 14px;">
              Pegar datos (opcional)
            </label>
            <textarea id="datosFichas" placeholder="Código,Programa,Nivel,Aprendices,Estado&#10;2875904,Marketing Digital,Tecnólogo,25,Activa" 
              style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px; min-height: 120px;"></textarea>
            <p style="font-size: 11px; color: #9ca3af; margin: 4px 0 0 0;">
              Separa cada columna con coma y cada ficha con salto de línea.
            </p>
          </div>
        </div>
      `,
      confirmButtonText: '📥 Procesar Datos',
      confirmButtonColor: '#3ca203',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#6b7280',
      showCancelButton: true,
      width: '600px',
      padding: '25px 30px',
      background: '#ffffff',
      color: '#1f2937',
      preConfirm: () => {
        const fileInput = document.getElementById('archivoFichas');
        const pastedData = document.getElementById('datosFichas').value;
        
        // Si no hay archivo ni datos pegados, mostrar error
        if (!fileInput.files.length && !pastedData.trim()) {
          Swal.showValidationMessage('⚠️ Selecciona un archivo o pega datos');
          return false;
        }

        // Si hay archivo, devolver el archivo
        if (fileInput.files.length) {
          return { file: fileInput.files[0] };
        }

        // Si hay datos pegados, devolver el texto
        return { pastedData };
      }
    });

    if (!file) return;

    try {
      let rows = [];

      // ==========================================================
      // LECTURA DESDE ARCHIVO EXCEL
      // ==========================================================
      if (file.file) {
        const data = await file.file.arrayBuffer();
        const workbook = XLSX.read(data);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Eliminar encabezados si existen
        if (rows.length > 0 && (rows[0][0] === 'Código' || rows[0][0] === 'CODIGO')) {
          rows.shift();
        }
      }

      // ==========================================================
      // LECTURA DESDE DATOS PEGADOS
      // ==========================================================
      if (file.pastedData) {
        rows = file.pastedData
          .split('\n')
          .map(row => row.split(','))
          .filter(row => row.filter(cell => cell.trim() !== '').length > 0);
        
        // Eliminar encabezados si existen
        if (rows.length > 0 && (rows[0][0] === 'Código' || rows[0][0] === 'CODIGO')) {
          rows.shift();
        }
      }

      // ==========================================================
      // VALIDAR Y CONVERTIR DATOS
      // ==========================================================
      const nuevasFichas = [];
      let errores = [];

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const codigo = (row[0] || '').trim();
        const programa = (row[1] || '').trim();
        const nivel = (row[2] || '').trim();
        const aprendices = String(row[3] || '').trim();
        const estado = String(row[4] || '').trim() || 'Activa';

        if (!codigo || !programa) {
          errores.push(`⚠️ Fila ${i + 1}: Faltan datos obligatorios`);
          continue;
        }

        // Validar código duplicado
        const yaExiste = fichas.some(f => f.idFicha === codigo) || nuevasFichas.some(f => f.idFicha === codigo);
        if (yaExiste) {
          errores.push(`⚠️ Fila ${i + 1}: Ficha ${codigo} ya existe`);
          continue;
        }

        nuevasFichas.push({
          idFicha: codigo,
          programa,
          nivel: nivel || 'Tecnólogo',
          aprendices: parseInt(aprendices) || 0,
          estado: estado === 'Inactiva' ? 'Inactiva' : 'Activa',
          estadoManual: estado === 'Inactiva' ? 'inactiva' : 'activa'
        });
      }

      // ==========================================================
      // MOSTRAR RESULTADO Y GUARDAR
      // ==========================================================
      if (nuevasFichas.length === 0) {
        await Swal.fire({
          title: '❌ Error de carga',
          text: 'No se pudieron procesar los datos. Revisa que las columnas estén correctas.',
          icon: 'error',
          confirmButtonColor: '#dc2626'
        });
        return;
      }

      if (errores.length > 0) {
        await Swal.fire({
          title: '⚠️ Datos con errores',
          html: `${errores.length} fila(s) fueron ignoradas.<br/>${errores.slice(0, 5).join('<br/>')}`,
          icon: 'warning',
          confirmButtonColor: '#f59e0b'
        });
      }

      // Confirmación antes de guardar
      const { isConfirmed } = await Swal.fire({
        title: '¿Guardar fichas?',
        html: `
          <div style="text-align: center;">
            <p style="font-size: 16px; color: #374151;">
              Se van a cargar <strong style="color: #3ca203;">${nuevasFichas.length}</strong> fichas nuevas.
            </p>
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-top: 10px;">
              <p style="margin: 0; font-size: 13px; color: #6b7280;">
                <strong>2875904</strong> - Marketing Digital (Tecnólogo)<br/>
                ... y ${nuevasFichas.length > 1 ? `${nuevasFichas.length - 1} más` : ''}
              </p>
            </div>
          </div>
        `,
        icon: 'question',
        iconColor: '#3ca203',
        showCancelButton: true,
        confirmButtonColor: '#3ca203',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Sí, guardar todo',
        cancelButtonText: 'Cancelar'
      });

      if (isConfirmed) {
        // Actualizar estado con las nuevas fichas
        setFichas(prev => [
          ...prev,
          ...nuevasFichas.map((ficha, idx) => ({
            id: prev.length + idx + 1,
            ...ficha
          }))
        ]);

        // Guardar en localStorage (para que el Instructor lo lea)
        const fichasGuardadas = JSON.parse(localStorage.getItem('fichasAsignadasInstructor')) || [];
        const nuevasFichasGuardadas = [
          ...fichasGuardadas,
          ...nuevasFichas.map(f => ({ id: f.idFicha, estadoManual: f.estadoManual }))
        ];
        localStorage.setItem('fichasAsignadasInstructor', JSON.stringify(nuevasFichasGuardadas));

        await Swal.fire({
          title: '✅ Carga masiva exitosa',
          text: `${nuevasFichas.length} fichas cargadas exitosamente.`,
          icon: 'success',
          confirmButtonColor: '#3ca203',
          timer: 2500,
          timerProgressBar: true
        });
      }

    } catch (error) {
      await Swal.fire({
        title: '❌ Error inesperado',
        text: 'Ocurrió un error al procesar el archivo. Verifica el formato.',
        icon: 'error',
        confirmButtonColor: '#dc2626'
      });
    }
  };

  // ==========================================================
  // FUNCIÓN PARA ACTIVAR MANUALMENTE UNA FICHA
  // ==========================================================
  const handleActivarManual = async (ficha) => {
    // Actualizar en el estado local
    setFichas(prev => prev.map(f => 
      f.idFicha === ficha.idFicha ? { ...f, estado: 'Activa', estadoManual: 'activa' } : f
    ));

    // Guardar en localStorage (para que el Instructor lo lea)
    const fichasManuales = JSON.parse(localStorage.getItem('fichasEstadoManual')) || [];
    const nuevasManuales = fichasManuales.filter(f => f.id !== ficha.idFicha);
    nuevasManuales.push({ id: ficha.idFicha, estadoManual: 'activa' });
    localStorage.setItem('fichasEstadoManual', JSON.stringify(nuevasManuales));

    Swal.fire({
      title: '✅ Ficha activada manualmente',
      text: `La ficha ${ficha.idFicha} está activa ahora.`,
      icon: 'success',
      confirmButtonColor: '#3ca203',
      timer: 2000,
      timerProgressBar: true
    });
  };

  // ==========================================================
  // FUNCIÓN PARA DESACTIVAR MANUALMENTE UNA FICHA
  // ==========================================================
  const handleDesactivarManual = async (ficha) => {
    // Actualizar en el estado local
    setFichas(prev => prev.map(f => 
      f.idFicha === ficha.idFicha ? { ...f, estado: 'Inactiva', estadoManual: 'inactiva' } : f
    ));

    // Guardar en localStorage (para que el Instructor lo lea)
    const fichasManuales = JSON.parse(localStorage.getItem('fichasEstadoManual')) || [];
    const nuevasManuales = fichasManuales.filter(f => f.id !== ficha.idFicha);
    nuevasManuales.push({ id: ficha.idFicha, estadoManual: 'inactiva' });
    localStorage.setItem('fichasEstadoManual', JSON.stringify(nuevasManuales));

    Swal.fire({
      title: '✅ Ficha desactivada manualmente',
      text: `La ficha ${ficha.idFicha} está inactiva ahora.`,
      icon: 'success',
      confirmButtonColor: '#3ca203',
      timer: 2000,
      timerProgressBar: true
    });
  };

  // ==========================================================
  // FUNCIÓN PARA CREAR NUEVA FICHA CON SWEETALERT
  // ==========================================================
  const handleNuevaFicha = () => {
    Swal.fire({
      title: '📚 Crear Nueva Ficha',
      html: `
        <div style="text-align: left; padding: 5px 0;">
          <div style="margin: 10px 0;">
            <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 4px; text-align: left;">
              Código de Ficha *
            </label>
            <input id="codigo-ficha" 
              style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
              placeholder="Ej: 2875904"
            />
          </div>
          <div style="margin: 10px 0;">
            <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 4px; text-align: left;">
              Nombre del Programa *
            </label>
            <input id="programa-ficha" 
              style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
              placeholder="Ej: Marketing Digital"
            />
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 10px 0;">
            <div>
              <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 4px; text-align: left;">
                Nivel *
              </label>
              <select id="nivel-ficha" 
                style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
              >
                <option value="Tecnólogo">Tecnólogo</option>
                <option value="Técnico">Técnico</option>
                <option value="Profesional">Profesional</option>
                <option value="Especialización">Especialización</option>
              </select>
            </div>
            <div>
              <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 4px; text-align: left;">
                Jornada *
              </label>
              <select id="jornada-ficha" 
                style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
              >
                <option value="Mañana">Mañana</option>
                <option value="Tarde">Tarde</option>
                <option value="Noche">Noche</option>
                <option value="Fin de Semana">Fin de Semana</option>
              </select>
            </div>
          </div>
          <div style="margin: 10px 0;">
            <label style="display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 4px; text-align: left;">
              Cantidad de Aprendices *
            </label>
            <input id="aprendices-ficha" type="number" min="1"
              style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;"
              placeholder="Ej: 28"
            />
          </div>
          <p style="font-size: 11px; color: #9ca3af; margin: 6px 0 0 0; text-align: left;">
            * Campos obligatorios
          </p>
        </div>
      `,
      icon: 'info',
      confirmButtonText: '✅ Crear Ficha',
      confirmButtonColor: '#3ca203',
      showCancelButton: true,
      cancelButtonText: '❌ Cancelar',
      cancelButtonColor: '#ef4444',
      width: '520px',
      padding: '1.5rem',
      preConfirm: () => {
        const codigo = document.getElementById('codigo-ficha')?.value;
        const programa = document.getElementById('programa-ficha')?.value;
        const nivel = document.getElementById('nivel-ficha')?.value;
        const jornada = document.getElementById('jornada-ficha')?.value;
        const aprendices = document.getElementById('aprendices-ficha')?.value;

        if (!codigo?.trim()) {
          Swal.showValidationMessage('⚠️ Por favor ingresa el código de la ficha');
          return false;
        }
        if (!programa?.trim()) {
          Swal.showValidationMessage('⚠️ Por favor ingresa el nombre del programa');
          return false;
        }
        if (!aprendices || parseInt(aprendices) <= 0) {
          Swal.showValidationMessage('⚠️ Por favor ingresa la cantidad de aprendices');
          return false;
        }

        const existe = fichas.some(f => f.idFicha === codigo.trim());
        if (existe) {
          Swal.showValidationMessage(`⚠️ La ficha ${codigo.trim()} ya existe`);
          return false;
        }

        return { 
          codigo: codigo.trim(), 
          programa: programa.trim(), 
          nivel, 
          jornada, 
          aprendices: parseInt(aprendices) 
        };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const { codigo, programa, nivel, jornada, aprendices } = result.value;

        const nuevaFicha = {
          idFicha: codigo,
          programa: programa,
          nivel: nivel,
          aprendices: aprendices,
          estado: 'Activa',
          jornada: jornada,
          estadoManual: 'activa' // Nueva ficha siempre se crea activa manualmente
        };

        setFichas([...fichas, nuevaFicha]);

        Swal.fire({
          title: '✅ ¡Ficha creada exitosamente!',
          html: `
            <div style="text-align: left; padding: 10px 0;">
              <div style="background: #f0fdf4; padding: 12px; border-radius: 8px; border: 1px solid #bbf7d0;">
                <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                  <strong>Código:</strong> ${codigo}
                </p>
                <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                  <strong>Programa:</strong> ${programa}
                </p>
                <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                  <strong>Nivel:</strong> ${nivel}
                </p>
                <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                  <strong>Jornada:</strong> ${jornada}
                </p>
                <p style="margin: 4px 0; font-size: 14px; color: #1f2937;">
                  <strong>Aprendices:</strong> ${aprendices}
                </p>
              </div>
              <p style="margin: 10px 0 0 0; font-size: 13px; color: #9ca3af; text-align: center;">
                La ficha ha sido creada exitosamente.
              </p>
            </div>
          `,
          icon: 'success',
          confirmButtonText: '✅ Aceptar',
          confirmButtonColor: '#3ca203',
          timer: 3000,
          timerProgressBar: true,
          width: '480px'
        });
      }
    });
  };

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      {/* MIGAS DE PAN */}
      <Breadcrumb />

      {/* ENCABEZADO */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Centro de Fichas</h2>
          <p style={{ color: '#6b7280', margin: '5px 0 0 0' }}>Gestión de todas las fichas del sistema.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {/* 👇 BOTÓN DE CARGA MASIVA */}
          <button
            onClick={handleCargaMasiva}
            style={{
              background: '#3ca203',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#2d8a00'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#3ca203'}
          >
            <i className="fas fa-upload" /> Carga Masiva
          </button>
          
          {/* 👇 BOTÓN NUEVA FICHA */}
          <button
            onClick={handleNuevaFicha}
            style={{
              background: '#3ca203',
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
      </div>

      {/* BUSCADOR */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar por código o programa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1, padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
        />
        <button onClick={handleSearch} style={{ background: '#3ca203', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}>Buscar</button>
        <button onClick={handleClear} style={{ background: '#e5e7eb', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}>Limpiar</button>
      </div>

      {/* TABLA DE FICHAS */}
      {filteredFichas.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h3 style={{ color: '#dc2626' }}>Dato no encontrado</h3>
        </div>
      ) : (
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
                  <td style={{ padding: '12px', fontWeight: 'bold', color: '#3ca203' }}>{f.idFicha}</td>
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
                      onClick={() => navigate(`/coordinador/ficha-completa/${f.idFicha}`)}
                      style={{ background: '#e6f7ed', color: '#047857', border: 'none', padding: '4px 12px', borderRadius: '6px', cursor: 'pointer', marginRight: '5px' }}
                    >
                      <i className="fas fa-eye" /> Ver
                    </button>
                    
                    {f.estado === 'Activa' ? (
                      <button
                        onClick={() => handleDesactivarManual(f)}
                        style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '4px 12px', borderRadius: '6px', cursor: 'pointer' }}
                      >
                        <i className="fas fa-pause-circle" /> Desactivar manual
                      </button>
                    ) : (
                      <button
                        onClick={() => handleActivarManual(f)}
                        style={{ background: '#d1fae5', color: '#047857', border: 'none', padding: '4px 12px', borderRadius: '6px', cursor: 'pointer' }}
                      >
                        <i className="fas fa-play-circle" /> Activar manual
                      </button>
                    )}
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

export default VerFichas;
