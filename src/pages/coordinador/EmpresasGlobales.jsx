// src/pages/coordinador/EmpresasGlobales.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import Swal from 'sweetalert2';
import { showSuccess, showError, showWarning, showConfirm, showToast } from '../../utils/sweetAlert';

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

  // --- FUNCIÓN PARA CREAR NUEVA EMPRESA ---
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

  // --- FUNCIÓN PARA EDITAR EMPRESA ---
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
      // Verificar si el NIT ya existe en otra empresa
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

  // --- FUNCIÓN PARA ELIMINAR EMPRESA ---
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