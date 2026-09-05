// src/pages/coordinador/EmpresasGlobales.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '@/modules/shared/components/Breadcrumb';
import Swal from 'sweetalert2';
import { showSuccess, showError, showWarning, showConfirm, showToast } from '@/core/utils/sweetAlert';
import * as XLSX from 'xlsx';

const EmpresasGlobales = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [empresas, setEmpresas] = useState([
    { id: 1, nombre: 'TechSoft S.A.S.', nit: '900.123.456-7', arl: 'SURA', contactos: '5' },
    { id: 2, nombre: 'Innovar Solutions', nit: '900.987.654-3', arl: 'Positiva', contactos: '3' },
    { id: 3, nombre: 'Global Services LTDA', nit: '901.111.222-3', arl: 'Colmena', contactos: '4' },
  ]);

  const handleSearch = () => setSearchQuery(searchTerm);
  const handleClear = () => { setSearchTerm(''); setSearchQuery(''); };

  const filteredEmpresas = empresas.filter(e =>
    e.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.nit.includes(searchQuery)
  );

  // ==========================================================
  // FUNCIÓN PARA CARGA MASIVA DE EMPRESAS
  // ==========================================================
  const handleCargaMasiva = async () => {
    const { value: file } = await Swal.fire({
      title: '📥 Carga Masiva de Empresas',
      html: `
        <div style="text-align: left; padding: 10px 0;">
          <div style="margin-bottom: 15px; padding: 20px; border: 2px dashed #3ca203; border-radius: 10px; text-align: center;">
            <i class="fas fa-cloud-upload-alt" style="font-size: 48px; color: #3ca203;"></i>
            <p style="margin: 10px 0 0 0; font-size: 14px; color: #6b7280;">
              <strong>Arrastra o selecciona un archivo Excel (.xlsx) o CSV</strong>
            </p>
            <p style="font-size: 12px; color: #9ca3af; margin: 5px 0 0 0;">
              El archivo debe tener columnas: <strong>Nombre, NIT, ARL, Contactos</strong>
            </p>
          </div>
          <div style="margin: 15px 0;">
            <label style="display: block; font-weight: 600; margin-bottom: 5px; color: #1f2937; font-size: 14px;">
              Selecciona tu archivo *
            </label>
            <input type="file" id="archivoEmpresas" accept=".xlsx,.xls,.csv" 
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
            <textarea id="datosEmpresas" placeholder="Nombre,NIT,ARL,Contactos&#10;Empresa 1,900.123.456-7,SURA,5&#10;Empresa 2,900.987.654-3,Positiva,3" 
              style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px; min-height: 120px;"></textarea>
            <p style="font-size: 11px; color: #9ca3af; margin: 4px 0 0 0;">
              Separa cada columna con coma y cada empresa con salto de línea.
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
        const fileInput = document.getElementById('archivoEmpresas');
        const pastedData = document.getElementById('datosEmpresas').value;
        
        if (!fileInput.files.length && !pastedData.trim()) {
          Swal.showValidationMessage('⚠️ Selecciona un archivo o pega datos');
          return false;
        }

        if (fileInput.files.length) {
          return { file: fileInput.files[0] };
        }

        return { pastedData };
      }
    });

    if (!file) return;

    try {
      let rows = [];

      if (file.file) {
        const data = await file.file.arrayBuffer();
        const workbook = XLSX.read(data);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        if (rows.length > 0 && (rows[0][0] === 'Nombre' || rows[0][0] === 'NOMBRE')) {
          rows.shift();
        }
      }

      if (file.pastedData) {
        rows = file.pastedData
          .split('\n')
          .map(row => row.split(','))
          .filter(row => row.filter(cell => cell.trim() !== '').length > 0);
        
        if (rows.length > 0 && (rows[0][0] === 'Nombre' || rows[0][0] === 'NOMBRE')) {
          rows.shift();
        }
      }

      const nuevasEmpresas = [];
      let errores = [];

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const nombre = (row[0] || '').trim();
        const nit = (row[1] || '').trim();
        const arl = (row[2] || '').trim();
        const contactos = String(row[3] || '').trim();

        if (!nombre || !nit) {
          errores.push(`⚠️ Fila ${i + 1}: Faltan datos obligatorios`);
          continue;
        }

        const yaExiste = empresas.some(e => e.nit === nit) || nuevasEmpresas.some(e => e.nit === nit);
        if (yaExiste) {
          errores.push(`⚠️ Fila ${i + 1}: NIT ${nit} ya existe`);
          continue;
        }

        nuevasEmpresas.push({
          nombre,
          nit,
          arl: arl || 'SURA',
          contactos: parseInt(contactos) || 0
        });
      }

      if (nuevasEmpresas.length === 0) {
        await showError('No se pudieron procesar los datos. Revisa que las columnas estén correctas.', '❌ Error de carga');
        return;
      }

      if (errores.length > 0) {
        await showWarning(
          `${errores.length} fila(s) fueron ignoradas.<br/>${errores.slice(0, 5).join('<br/>')}`,
          '⚠️ Datos con errores'
        );
      }

      const { isConfirmed } = await Swal.fire({
        title: '¿Guardar empresas?',
        html: `
          <div style="text-align: center;">
            <p style="font-size: 16px; color: #374151;">
              Se van a cargar <strong style="color: #3ca203;">${nuevasEmpresas.length}</strong> empresas.
            </p>
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-top: 10px;">
              <p style="margin: 0; font-size: 13px; color: #6b7280;">
                <strong>TechSoft S.A.S.</strong> (900.123.456-7, SURA)<br/>
                <strong>Innovar Solutions</strong> (900.987.654-3, Positiva)<br/>
                ... y ${nuevasEmpresas.length > 2 ? `${nuevasEmpresas.length - 2} más` : ''}
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
        setEmpresas(prev => [
          ...prev,
          ...nuevasEmpresas.map((emp, idx) => ({
            id: prev.length + idx + 1,
            ...emp
          }))
        ]);

        await showSuccess(`${nuevasEmpresas.length} empresas cargadas exitosamente.`, '✅ Carga masiva exitosa');
      }

    } catch (error) {
      await showError('Ocurrió un error al procesar el archivo. Verifica el formato.', '❌ Error inesperado');
    }
  };

  // ==========================================================
  // FUNCIÓN PARA CREAR NUEVA EMPRESA
  // ==========================================================
  const handleNuevaEmpresa = async () => {
    const { value: formValues } = await Swal.fire({
      title: '📋 Nueva Empresa',
      html: `
        <div style="text-align: left; padding: 10px 0;">
          <div style="margin-bottom: 15px;">
            <label style="display: block; font-weight: 600; margin-bottom: 5px; color: #1f2937; font-size: 14px;">
              <i class="fas fa-building" style="color: #3ca203; margin-right: 8px;"></i>
              Nombre de la empresa
            </label>
            <input id="nombreEmpresa" class="swal2-input" placeholder="Ej. TechSoft S.A.S." style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px;">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; font-weight: 600; margin-bottom: 5px; color: #1f2937; font-size: 14px;">
              <i class="fas fa-hashtag" style="color: #3ca203; margin-right: 8px;"></i>
              NIT
            </label>
            <input id="nitEmpresa" class="swal2-input" placeholder="Ej. 900.123.456-7" style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px;">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; font-weight: 600; margin-bottom: 5px; color: #1f2937; font-size: 14px;">
              <i class="fas fa-shield-alt" style="color: #3ca203; margin-right: 8px;"></i>
              ARL
            </label>
            <select id="arlEmpresa" class="swal2-input" style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px;">
              <option value="SURA">SURA</option>
              <option value="Positiva">Positiva</option>
              <option value="Colmena">Colmena</option>
              <option value="Seguros Bolívar">Seguros Bolívar</option>
              <option value="La Equidad">La Equidad</option>
            </select>
          </div>
          <div style="margin-bottom: 5px;">
            <label style="display: block; font-weight: 600; margin-bottom: 5px; color: #1f2937; font-size: 14px;">
              <i class="fas fa-phone" style="color: #3ca203; margin-right: 8px;"></i>
              Contactos
            </label>
            <input id="contactosEmpresa" class="swal2-input" placeholder="Ej. 5" type="number" style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px;">
          </div>
        </div>
      `,
      focusConfirm: false,
      confirmButtonText: 'Guardar Empresa',
      confirmButtonColor: '#3ca203',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#6b7280',
      showCancelButton: true,
      preConfirm: () => {
        const nombre = document.getElementById('nombreEmpresa').value.trim();
        const nit = document.getElementById('nitEmpresa').value.trim();
        const arl = document.getElementById('arlEmpresa').value;
        const contactos = document.getElementById('contactosEmpresa').value.trim();

        if (!nombre) {
          Swal.showValidationMessage('⚠️ El nombre de la empresa es obligatorio');
          return false;
        }
        if (!nit) {
          Swal.showValidationMessage('⚠️ El NIT es obligatorio');
          return false;
        }
        if (!contactos || isNaN(contactos) || parseInt(contactos) < 0) {
          Swal.showValidationMessage('⚠️ Ingresa un número válido de contactos');
          return false;
        }

        return { nombre, nit, arl, contactos: parseInt(contactos) };
      },
      width: '520px',
      padding: '25px 30px',
      background: '#ffffff',
      color: '#1f2937',
      customClass: {
        popup: 'swal2-popup-sandbox',
        title: 'swal2-title-sandbox',
        confirmButton: 'swal2-confirm-sandbox',
        cancelButton: 'swal2-cancel-sandbox',
      }
    });

    if (formValues) {
      const existe = empresas.some(e => e.nit === formValues.nit);
      if (existe) {
        await showWarning('Ya existe una empresa con este NIT.', '⚠️ Empresa duplicada');
        return;
      }

      const nuevaEmpresa = {
        id: empresas.length + 1,
        nombre: formValues.nombre,
        nit: formValues.nit,
        arl: formValues.arl,
        contactos: formValues.contactos,
      };

      setEmpresas([...empresas, nuevaEmpresa]);
      await showSuccess(`Empresa "${nuevaEmpresa.nombre}" creada exitosamente.`, '✅ Empresa creada');
    }
  };

  // ==========================================================
  // FUNCIÓN PARA EDITAR EMPRESA
  // ==========================================================
  const handleEditarEmpresa = async (empresa) => {
    const { value: formValues } = await Swal.fire({
      title: `✏️ Editar Empresa`,
      html: `
        <div style="text-align: left; padding: 10px 0;">
          <div style="margin-bottom: 15px;">
            <label style="display: block; font-weight: 600; margin-bottom: 5px; color: #1f2937; font-size: 14px;">
              <i class="fas fa-building" style="color: #3ca203; margin-right: 8px;"></i>
              Nombre de la empresa
            </label>
            <input id="editNombreEmpresa" class="swal2-input" value="${empresa.nombre}" style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px;">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; font-weight: 600; margin-bottom: 5px; color: #1f2937; font-size: 14px;">
              <i class="fas fa-hashtag" style="color: #3ca203; margin-right: 8px;"></i>
              NIT
            </label>
            <input id="editNitEmpresa" class="swal2-input" value="${empresa.nit}" style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px;">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; font-weight: 600; margin-bottom: 5px; color: #1f2937; font-size: 14px;">
              <i class="fas fa-shield-alt" style="color: #3ca203; margin-right: 8px;"></i>
              ARL
            </label>
            <select id="editArlEmpresa" class="swal2-input" style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px;">
              <option value="SURA" ${empresa.arl === 'SURA' ? 'selected' : ''}>SURA</option>
              <option value="Positiva" ${empresa.arl === 'Positiva' ? 'selected' : ''}>Positiva</option>
              <option value="Colmena" ${empresa.arl === 'Colmena' ? 'selected' : ''}>Colmena</option>
              <option value="Seguros Bolívar" ${empresa.arl === 'Seguros Bolívar' ? 'selected' : ''}>Seguros Bolívar</option>
              <option value="La Equidad" ${empresa.arl === 'La Equidad' ? 'selected' : ''}>La Equidad</option>
            </select>
          </div>
          <div style="margin-bottom: 5px;">
            <label style="display: block; font-weight: 600; margin-bottom: 5px; color: #1f2937; font-size: 14px;">
              <i class="fas fa-phone" style="color: #3ca203; margin-right: 8px;"></i>
              Contactos
            </label>
            <input id="editContactosEmpresa" class="swal2-input" value="${empresa.contactos}" type="number" style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px;">
          </div>
        </div>
      `,
      focusConfirm: false,
      confirmButtonText: 'Guardar Cambios',
      confirmButtonColor: '#3ca203',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#6b7280',
      showCancelButton: true,
      preConfirm: () => {
        const nombre = document.getElementById('editNombreEmpresa').value.trim();
        const nit = document.getElementById('editNitEmpresa').value.trim();
        const arl = document.getElementById('editArlEmpresa').value;
        const contactos = document.getElementById('editContactosEmpresa').value.trim();

        if (!nombre) {
          Swal.showValidationMessage('⚠️ El nombre de la empresa es obligatorio');
          return false;
        }
        if (!nit) {
          Swal.showValidationMessage('⚠️ El NIT es obligatorio');
          return false;
        }
        if (!contactos || isNaN(contactos) || parseInt(contactos) < 0) {
          Swal.showValidationMessage('⚠️ Ingresa un número válido de contactos');
          return false;
        }

        return { nombre, nit, arl, contactos: parseInt(contactos) };
      },
      width: '520px',
      padding: '25px 30px',
      background: '#ffffff',
      color: '#1f2937',
      customClass: {
        popup: 'swal2-popup-sandbox',
        title: 'swal2-title-sandbox',
        confirmButton: 'swal2-confirm-sandbox',
        cancelButton: 'swal2-cancel-sandbox',
      }
    });

    if (formValues) {
      const existe = empresas.some(e => e.nit === formValues.nit && e.id !== empresa.id);
      if (existe) {
        await showWarning('Ya existe otra empresa con este NIT.', '⚠️ NIT duplicado');
        return;
      }

      setEmpresas(empresas.map(e =>
        e.id === empresa.id
          ? { ...e, ...formValues }
          : e
      ));
      await showSuccess(`Empresa "${formValues.nombre}" actualizada exitosamente.`, '✅ Empresa actualizada');
    }
  };

  // ==========================================================
  // FUNCIÓN PARA ELIMINAR EMPRESA
  // ==========================================================
  const handleEliminarEmpresa = async (empresa) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      html: `
        <div style="text-align: center;">
          <p style="font-size: 16px; color: #374151; margin-bottom: 10px;">
            ¿Deseas eliminar la empresa <strong>"${empresa.nombre}"</strong>?
          </p>
          <p style="font-size: 14px; color: #6b7280;">
            Esta acción no se puede deshacer.
          </p>
        </div>
      `,
      icon: 'warning',
      iconColor: '#dc2626',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      position: 'center',
      reverseButtons: false,
      customClass: {
        popup: 'swal2-popup-sandbox',
        title: 'swal2-title-sandbox',
        confirmButton: 'swal2-confirm-sandbox',
        cancelButton: 'swal2-cancel-sandbox',
      }
    });

    if (result.isConfirmed) {
      setEmpresas(empresas.filter(e => e.id !== empresa.id));
      await showSuccess(`Empresa "${empresa.nombre}" eliminada exitosamente.`, '✅ Empresa eliminada');
    }
  };

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      {/* MIGAS DE PAN */}
      <Breadcrumb />

      {/* ENCABEZADO */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Empresas Globales</h2>
          <p style={{ color: '#6b7280', margin: '5px 0 0 0' }}>Gestión de empresas del sistema.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
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
          <button
            onClick={handleNuevaEmpresa}
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
            <i className="fas fa-plus" /> Nueva Empresa
          </button>
        </div>
      </div>

      {/* BUSCADOR */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar por nombre o NIT..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1, padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
        />
        <button onClick={handleSearch} style={{ background: '#3ca203', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}>Buscar</button>
        <button onClick={handleClear} style={{ background: '#e5e7eb', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}>Limpiar</button>
      </div>

      {/* TABLA DE EMPRESAS */}
      {filteredEmpresas.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h3 style={{ color: '#dc2626' }}>Dato no encontrado</h3>
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e5e7eb', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Nombre</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>NIT</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>ARL</th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280' }}>Contactos</th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmpresas.map(e => (
                <tr key={e.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>{e.nombre}</td>
                  <td style={{ padding: '12px' }}>{e.nit}</td>
                  <td style={{ padding: '12px' }}>{e.arl}</td>
                  <td style={{ textAlign: 'center', padding: '12px' }}>{e.contactos}</td>
                  <td style={{ textAlign: 'center', padding: '12px' }}>
                    <button
                      onClick={() => handleEditarEmpresa(e)}
                      style={{ background: '#e6f7ed', color: '#047857', border: 'none', padding: '4px 12px', borderRadius: '6px', marginRight: '5px', cursor: 'pointer' }}
                    >
                      <i className="fas fa-edit" /> Editar
                    </button>
                    <button
                      onClick={() => handleEliminarEmpresa(e)}
                      style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '4px 12px', borderRadius: '6px', cursor: 'pointer' }}
                    >
                      <i className="fas fa-trash" /> Eliminar
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

export default EmpresasGlobales;