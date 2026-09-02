// src/pages/coordinador/VerFichas.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Breadcrumb from '../../shared/components/Breadcrumb';

const VerFichas = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [fichas, setFichas] = useState([
    { idFicha: '2875901', programa: 'Análisis y Desarrollo de Software', nivel: 'Tecnólogo', aprendices: 28, estado: 'Activa' },
    { idFicha: '2875902', programa: 'Gestión Empresarial', nivel: 'Tecnólogo', aprendices: 24, estado: 'Activa' },
    { idFicha: '2875903', programa: 'Contabilidad y Finanzas', nivel: 'Técnico', aprendices: 32, estado: 'Inactiva' },
  ]);

  const handleSearch = () => setSearchQuery(searchTerm);
  const handleClear = () => { setSearchTerm(''); setSearchQuery(''); };

  const filteredFichas = fichas.filter(f =>
    f.idFicha.includes(searchQuery) || f.programa.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          jornada: jornada
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
                      style={{ background: '#e6f7ed', color: '#047857', border: 'none', padding: '4px 12px', borderRadius: '6px', cursor: 'pointer' }}
                    >
                      <i className="fas fa-eye" /> Ver
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

export default VerFichas;