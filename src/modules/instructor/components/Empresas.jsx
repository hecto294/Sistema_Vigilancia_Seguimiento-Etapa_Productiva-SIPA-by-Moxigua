// src/components/Empresas.jsx
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './Empresas.css';

const Empresas = () => {
  // Estado para el texto que el usuario escribe en el input
  const [searchTerm, setSearchTerm] = useState('');
  // Estado para el texto que realmente se busca al darle al botón
  const [searchQuery, setSearchQuery] = useState('');
  
  // Estado para las empresas (ahora mutable para poder editar/eliminar)
  const [empresas, setEmpresas] = useState([
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
              <i class="fas fa-building" style="color: #3ca203; margin-right: 8px;"></i> Nombre de la empresa
            </label>
            <input id="nombreEmpresa" class="swal2-input" placeholder="Ej. TechSoft S.A.S." style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px;">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; font-weight: 600; margin-bottom: 5px; color: #1f2937; font-size: 14px;">
              <i class="fas fa-hashtag" style="color: #3ca203; margin-right: 8px;"></i> NIT
            </label>
            <input id="nitEmpresa" class="swal2-input" placeholder="Ej. 900.123.456-7" style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px;">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; font-weight: 600; margin-bottom: 5px; color: #1f2937; font-size: 14px;">
              <i class="fas fa-shield-alt" style="color: #3ca203; margin-right: 8px;"></i> ARL
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
              <i class="fas fa-phone" style="color: #3ca203; margin-right: 8px;"></i> Contactos
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
      color: '#1f2937'
    });

    if (formValues) {
      const existe = empresas.some(e => e.nit === formValues.nit);
      if (existe) {
        await Swal.fire({
          title: '⚠️ Empresa duplicada',
          text: 'Ya existe una empresa con este NIT.',
          icon: 'warning',
          confirmButtonColor: '#f59e0b'
        });
        return;
      }

      const nuevaEmpresa = {
        id: empresas.length + 1,
        nombre: formValues.nombre,
        arl: formValues.arl,
        aprendices: formValues.contactos,
      };

      setEmpresas([...empresas, nuevaEmpresa]);
      await Swal.fire({
        title: '✅ Empresa creada',
        text: `Empresa "${nuevaEmpresa.nombre}" creada exitosamente.`,
        icon: 'success',
        confirmButtonColor: '#3ca203',
        timer: 2000,
        timerProgressBar: true
      });
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
              <i class="fas fa-building" style="color: #3ca203; margin-right: 8px;"></i> Nombre de la empresa
            </label>
            <input id="editNombreEmpresa" class="swal2-input" value="${empresa.nombre}" style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px;">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; font-weight: 600; margin-bottom: 5px; color: #1f2937; font-size: 14px;">
              <i class="fas fa-hashtag" style="color: #3ca203; margin-right: 8px;"></i> NIT
            </label>
            <input id="editNitEmpresa" class="swal2-input" value="${empresa.nit}" style="width: 100%; padding: 10px; border: 1px solid #e5e7eb; border-radius: 6px; font-size: 14px;">
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; font-weight: 600; margin-bottom: 5px; color: #1f2937; font-size: 14px;">
              <i class="fas fa-shield-alt" style="color: #3ca203; margin-right: 8px;"></i> ARL
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
              <i class="fas fa-phone" style="color: #3ca203; margin-right: 8px;"></i> Contactos
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
      color: '#1f2937'
    });

    if (formValues) {
      const existe = empresas.some(e => e.nit === formValues.nit && e.id !== empresa.id);
      if (existe) {
        await Swal.fire({
          title: '⚠️ NIT duplicado',
          text: 'Ya existe otra empresa con este NIT.',
          icon: 'warning',
          confirmButtonColor: '#f59e0b'
        });
        return;
      }

      setEmpresas(empresas.map(e =>
        e.id === empresa.id
          ? { ...e, nombre: formValues.nombre, arl: formValues.arl, aprendices: formValues.contactos }
          : e
      ));
      await Swal.fire({
        title: '✅ Empresa actualizada',
        text: `Empresa "${formValues.nombre}" actualizada exitosamente.`,
        icon: 'success',
        confirmButtonColor: '#3ca203',
        timer: 2000,
        timerProgressBar: true
      });
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
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      setEmpresas(empresas.filter(e => e.id !== empresa.id));
      await Swal.fire({
        title: '✅ Empresa eliminada',
        text: `Empresa "${empresa.nombre}" eliminada exitosamente.`,
        icon: 'success',
        confirmButtonColor: '#3ca203',
        timer: 2000,
        timerProgressBar: true
      });
    }
  };

  return (
    <div className="empresas-container">
      <div className="empresas-header">
        <h2>Empresas Asociadas</h2>
        {/* 👇 BOTÓN DE NUEVA EMPRESA EN VERDE */}
        <button className="btn-nuevo" onClick={handleNuevaEmpresa} style={{ background: '#3ca203', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
          + Nueva empresa
        </button>
      </div>

      {/* Barra de búsqueda con botón Buscar y Limpiar */}
      <div className="search-container">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Buscar por nombre o ARL..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
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
                    <button className="action-btn-ficha btn-edit" onClick={() => handleEditarEmpresa(empresa)}>Editar</button>
                    <button className="action-btn-ficha btn-delete" onClick={() => handleEliminarEmpresa(empresa)}>Eliminar</button>
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