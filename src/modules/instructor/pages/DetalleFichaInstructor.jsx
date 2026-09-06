// src/pages/instructor/DetalleFichaInstructor.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../shared/components/Breadcrumb';
import Swal from 'sweetalert2';
import { showSuccess, showError } from '@/core/utils/sweetAlert';

const DetalleFichaInstructor = () => {
  const { idFicha } = useParams();
  const navigate = useNavigate();

  // Estado para búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fichaData = {
    codigo: idFicha,
    programa: 'Análisis y Desarrollo de Software',
    estado: 'Activa',
    aprendices: [
      {
        nombre: 'Laura Sofia Martinez',
        documento: '12345678',
        empresa: 'TechSoft S.A.S.',
        arl: 'SURA',
        fechaInicio: '01/03/2025',
        fechaFin: '28/02/2026',
        estado: 'En formación', // ⬅️ CAMBIO AQUÍ
        observaciones: [
          { texto: 'La aprendiz ha mostrado un excelente desempeño en la etapa de inducción.', fecha: '10/03/2025', hora: '09:30 a.m.' },
          { texto: 'Presentó dificultades con las herramientas ofimáticas. Se recomienda refuerzo.', fecha: '17/03/2025', hora: '02:15 p.m.' },
        ]
      },
      {
        nombre: 'Juan Diego Ramirez',
        documento: '87654321',
        empresa: 'Innovar Solutions',
        arl: 'Positiva',
        fechaInicio: '15/04/2025',
        fechaFin: '14/04/2026',
        estado: 'Condicionado', // ⬅️ CAMBIO AQUÍ
        observaciones: [
          { texto: 'Cumplimiento de hitos. Sin novedades.', fecha: '18/04/2025', hora: '10:00 a.m.' },
        ]
      },
      {
        nombre: 'Maria Camila Torres',
        documento: '11223344',
        empresa: 'Global Services LTDA',
        arl: 'Colmena',
        fechaInicio: '01/06/2025',
        fechaFin: '31/05/2026',
        estado: 'Finalizado', // ⬅️ CAMBIO AQUÍ
        observaciones: []
      }
    ]
  };

  const [ficha] = useState(fichaData);
  const [aprendices, setAprendices] = useState(ficha.aprendices);

  // ⬇️ FUNCIÓN PARA OBTENER COLOR E ICONO SEGÚN EL ESTADO
  const getEstadoConfig = (estado) => {
    switch(estado) {
      case 'En formación':
        return { color: '#10b981', icono: 'fa-check-circle' };
      case 'Condicionado':
        return { color: '#f59e0b', icono: 'fa-exclamation-circle' };
      case 'Finalizado':
        return { color: '#3b82f6', icono: 'fa-flag-checkered' };
      case 'Retirado':
        return { color: '#ef4444', icono: 'fa-times-circle' };
      default:
        return { color: '#6b7280', icono: 'fa-circle' };
    }
  };

  // Funciones de búsqueda
  const handleSearch = () => {
    setSearchQuery(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSearchQuery('');
  };

  // Filtrar aprendices por nombre
  const filteredAprendices = aprendices.filter(ap =>
    ap.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Si la ficha está inactiva, mostrar mensaje
  if (ficha.estado === 'Inactiva') {
    return (
      <div style={{ width: '100%', padding: '20px 0' }}>
        <Breadcrumb />
        <button 
          onClick={() => navigate('/instructor/fichas')}
          style={{ background: 'transparent', border: 'none', color: '#3ca203', cursor: 'pointer', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <i className="fas fa-arrow-left" /> Volver a fichas
        </button>
        <div style={{ background: 'white', borderRadius: '12px', padding: '60px 20px', textAlign: 'center', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '60px', color: '#9ca3af', marginBottom: '20px' }}>
            <i className="fas fa-ban" />
          </div>
          <h3 style={{ color: '#1f2937', fontSize: '22px', marginBottom: '10px' }}>
            Ficha Inactiva
          </h3>
          <p style={{ color: '#6b7280', fontSize: '16px', maxWidth: '400px', margin: '0 auto' }}>
            La ficha <strong>{ficha.codigo}</strong> se encuentra inactiva. 
            No se puede visualizar información de aprendices ni realizar seguimientos.
          </p>
          <button
            onClick={() => navigate('/instructor/fichas')}
            style={{ marginTop: '20px', background: '#3ca203', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#2d8a00'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#3ca203'}
          >
            <i className="fas fa-arrow-left" style={{ marginRight: '8px' }} />
            Volver a Mis Fichas
          </button>
        </div>
      </div>
    );
  }

  // Función para agregar nueva observación (solo desde el botón "Nueva")
  const handleNuevaObservacion = async (aprendiz) => {
    const { value: observacion } = await Swal.fire({
      title: `📝 Nueva Observación`,
      html: `
        <div style="text-align: left; padding: 5px 0;">
          <p style="color: #6b7280; font-size: 14px; margin-bottom: 10px;">
            Aprendiz: <strong>${aprendiz.nombre}</strong>
          </p>
          <textarea id="observacionText" 
            class="swal2-textarea" 
            placeholder="Escribe aquí tu observación..."
            style="width: 100%; min-height: 150px; padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px; font-size: 14px; resize: vertical; font-family: inherit;"
          ></textarea>
          <div style="margin-top: 10px; padding: 8px 12px; background: #f0fdf4; border-radius: 6px; border: 1px solid #bbf7d0;">
            <p style="margin: 0; font-size: 12px; color: #166534;">
              <i class="fas fa-info-circle" style="color: #3ca203; margin-right: 6px;"></i>
              La observación quedará registrada con fecha y hora actual.
            </p>
          </div>
        </div>
      `,
      icon: 'info',
      iconColor: '#3ca203',
      showCancelButton: true,
      confirmButtonColor: '#3ca203',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Guardar Observación',
      cancelButtonText: 'Cancelar',
      width: '500px',
      padding: '25px 30px',
      background: '#ffffff',
      color: '#1f2937',
      focusConfirm: false,
      preConfirm: () => {
        const textarea = document.getElementById('observacionText');
        const observacion = textarea?.value?.trim();
        if (!observacion) {
          Swal.showValidationMessage('⚠️ Por favor, escribe una observación.');
          return false;
        }
        return observacion;
      },
      customClass: {
        popup: 'swal2-popup-sandbox',
        title: 'swal2-title-sandbox',
        confirmButton: 'swal2-confirm-sandbox',
        cancelButton: 'swal2-cancel-sandbox',
      },
      didOpen: () => {
        const textarea = document.getElementById('observacionText');
        if (textarea) {
          setTimeout(() => textarea.focus(), 100);
        }
      }
    });

    if (observacion) {
      setAprendices(prevAprendices =>
        prevAprendices.map(a =>
          a.nombre === aprendiz.nombre
            ? { ...a, observaciones: [...a.observaciones, { 
                texto: observacion, 
                fecha: new Date().toLocaleDateString('es-CO'),
                hora: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })
              }] 
            }
            : a
        )
      );

      await showSuccess(
        `Observación guardada para ${aprendiz.nombre}.`,
        '✅ Observación registrada'
      );
    }
  };

  // Función para ver SOLO las observaciones (sin botón de agregar)
  const handleVerObservaciones = (aprendiz) => {
    if (aprendiz.observaciones.length === 0) {
      Swal.fire({
        title: '📋 Sin observaciones',
        text: `${aprendiz.nombre} no tiene observaciones registradas.`,
        icon: 'info',
        iconColor: '#3ca203',
        confirmButtonColor: '#3ca203',
        confirmButtonText: 'Aceptar',
        customClass: {
          popup: 'swal2-popup-sandbox',
          title: 'swal2-title-sandbox',
          confirmButton: 'swal2-confirm-sandbox',
        }
      });
      return;
    }

    const observacionesHtml = aprendiz.observaciones.map((obs, index) => `
      <div style="background: #f8fafc; padding: 12px 15px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #3ca203;">
        <p style="margin: 0; font-size: 14px; color: #1f2937; line-height: 1.5;">${obs.texto}</p>
        <p style="margin: 5px 0 0 0; font-size: 11px; color: #6b7280;">
          <i class="fas fa-calendar-alt" style="margin-right: 4px;"></i>
          ${obs.fecha} - ${obs.hora}
        </p>
      </div>
    `).join('');

    Swal.fire({
      title: `📋 Observaciones de ${aprendiz.nombre}`,
      html: `
        <div style="max-height: 350px; overflow-y: auto; padding: 5px 0;">
          ${observacionesHtml}
        </div>
        <div style="margin-top: 15px; padding: 10px; background: #f0fdf4; border-radius: 8px; border: 1px solid #bbf7d0; text-align: center;">
          <p style="margin: 0; font-size: 13px; color: #166534;">
            <i class="fas fa-info-circle" style="color: #3ca203; margin-right: 6px;"></i>
            Total: ${aprendiz.observaciones.length} observaciones
          </p>
        </div>
      `,
      icon: 'info',
      iconColor: '#3ca203',
      confirmButtonColor: '#3ca203',
      confirmButtonText: 'Cerrar',
      width: '550px',
      padding: '25px 30px',
      background: '#ffffff',
      color: '#1f2937',
      showCancelButton: false,
      customClass: {
        popup: 'swal2-popup-sandbox',
        title: 'swal2-title-sandbox',
        confirmButton: 'swal2-confirm-sandbox',
      }
    });
  };

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      <Breadcrumb />

      <button 
        onClick={() => navigate('/instructor/fichas')}
        style={{ background: 'transparent', border: 'none', color: '#3ca203', cursor: 'pointer', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}
      >
        <i className="fas fa-arrow-left" /> Volver a fichas
      </button>

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Ficha {ficha.codigo}</h2>
        <p style={{ color: '#6b7280' }}>{ficha.programa}</p>
        <span style={{
          background: '#d1fae5',
          color: '#047857',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          <i className="fas fa-check-circle" style={{ marginRight: '6px' }} />
          Activa
        </span>
      </div>

      {/* BUSCADOR */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar aprendiz..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          style={{ flex: 1, padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
        />
        <button
          onClick={handleSearch}
          style={{
            background: '#3ca203',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Buscar
        </button>
        <button
          onClick={handleClear}
          style={{
            background: '#e5e7eb',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Limpiar
        </button>
      </div>

      {/* TABLA DE APRENDICES */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e5e7eb', overflowX: 'auto' }}>
        {filteredAprendices.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <h3 style={{ color: '#dc2626' }}>Dato no encontrado</h3>
            <p style={{ color: '#6b7280' }}>No se encontraron aprendices con ese nombre.</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Aprendiz</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Empresa</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>ARL</th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280' }}>Fecha Inicio</th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280' }}>Fecha Fin</th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280' }}>Estado</th> {/* ⬅️ NUEVA COLUMNA */}
                <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredAprendices.map((ap, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>
                    {ap.nombre}
                  </td>
                  <td style={{ padding: '12px' }}>{ap.empresa}</td>
                  <td style={{ padding: '12px' }}>{ap.arl}</td>
                  <td style={{ textAlign: 'center', padding: '12px' }}>{ap.fechaInicio}</td>
                  <td style={{ textAlign: 'center', padding: '12px' }}>{ap.fechaFin}</td>
                  <td style={{ textAlign: 'center', padding: '12px' }}>
                    <span style={{
                      background: `${getEstadoConfig(ap.estado).color}15`,
                      color: getEstadoConfig(ap.estado).color,
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      <i className={`fas ${getEstadoConfig(ap.estado).icono}`}></i>
                      {ap.estado}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center', padding: '12px' }}>
                    <button
                      onClick={() => handleNuevaObservacion(ap)}
                      style={{
                        background: '#3ca203',
                        color: 'white',
                        border: 'none',
                        padding: '4px 14px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        marginRight: '5px',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#2d8a00'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#3ca203'}
                    >
                      <i className="fas fa-plus" style={{ marginRight: '6px' }} /> Nueva
                    </button>
                    <button
                      onClick={() => handleVerObservaciones(ap)}
                      style={{
                        background: '#e0f2fe',
                        color: '#0ea5e9',
                        border: 'none',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      <i className="fas fa-eye" style={{ marginRight: '6px' }} /> Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DetalleFichaInstructor;
