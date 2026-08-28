// src/pages/coordinador/ReporteFichaBitacoras.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import Swal from 'sweetalert2';

const ReporteFichaBitacoras = () => {
  const navigate = useNavigate();
  const { idFicha } = useParams();

  // Datos de la ficha y sus aprendices con bitácoras
  const fichasData = {
    '2875901': {
      id: '2875901',
      programa: 'Análisis y Desarrollo de Software',
      instructor: 'Carlos Andrés López',
      aprendices: [
        {
          id: 1,
          nombre: 'Laura Sofia Martinez',
          bitacoras: [
            { id: 1, titulo: 'Semana 1', fecha: '10/03/2025', bimestre: 1, contenido: 'Inducción completada. Se presentaron las normas de seguridad y el cronograma de actividades.' },
            { id: 2, titulo: 'Semana 2', fecha: '17/03/2025', bimestre: 1, contenido: 'Diagnóstico exitoso. El aprendiz demostró un nivel intermedio en herramientas ofimáticas.' },
            { id: 5, titulo: 'Semana 5', fecha: '07/04/2025', bimestre: 2, contenido: 'Inicio proyecto. Se dio inicio a la fase de implementación del proyecto.' },
          ]
        },
        {
          id: 2,
          nombre: 'Juan Diego Ramirez',
          bitacoras: [
            { id: 3, titulo: 'Semana 3', fecha: '24/03/2025', bimestre: 1, contenido: 'Avance parcial. Se realizó la primera entrega del módulo.' },
            { id: 4, titulo: 'Semana 4', fecha: '31/03/2025', bimestre: 1, contenido: 'Entrega 1 completada. Pendiente de revisión.' },
          ]
        }
      ]
    },
    '2875902': {
      id: '2875902',
      programa: 'Gestión Empresarial',
      instructor: 'Ana María Pérez',
      aprendices: [
        {
          id: 3,
          nombre: 'Maria Camila Torres',
          bitacoras: [
            { id: 6, titulo: 'Semana 6', fecha: '14/04/2025', bimestre: 2, contenido: 'Avance del 50% en el proyecto. Se recomienda refuerzo en herramientas.' },
          ]
        }
      ]
    },
    '2875903': {
      id: '2875903',
      programa: 'Contabilidad y Finanzas',
      instructor: 'Pedro Gómez',
      aprendices: [
        {
          id: 4,
          nombre: 'Carlos Mendoza',
          bitacoras: [
            { id: 7, titulo: 'Semana 7', fecha: '21/04/2025', bimestre: 2, contenido: 'Revisión de código. Se realizó la primera revisión del código fuente.' },
          ]
        }
      ]
    }
  };

  const ficha = fichasData[idFicha];

  if (!ficha) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h3 style={{ color: '#dc2626' }}>Ficha no encontrada</h3>
      </div>
    );
  }

  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [bimestreSeleccionado, setBimestreSeleccionado] = useState(1);

  const handleSearch = () => setSearchQuery(searchTerm);
  const handleClear = () => { setSearchTerm(''); setSearchQuery(''); };

  // Ver todas las bitácoras del aprendiz en el bimestre seleccionado
  const handleVerBitacorasAprendiz = (aprendiz) => {
    const bitacorasBimestre = aprendiz.bitacoras.filter(b => b.bimestre === bimestreSeleccionado);
    
    if (bitacorasBimestre.length === 0) {
      Swal.fire({
        title: '📖 Sin bitácoras',
        text: `${aprendiz.nombre} no tiene bitácoras en el Bimestre ${bimestreSeleccionado}.`,
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

    // Generar HTML con todas las bitácoras
    const bitacorasHtml = bitacorasBimestre.map((b, index) => `
      <div style="
        background: #f8fafc;
        padding: 12px 15px;
        border-radius: 8px;
        border: 1px solid #e5e7eb;
        margin-bottom: 10px;
        cursor: pointer;
        transition: all 0.2s;
        display: flex;
        justify-content: space-between;
        align-items: center;
      " 
      onclick="window.verBitacora(${b.id})"
      onmouseenter="this.style.borderColor='#3ca203'"
      onmouseleave="this.style.borderColor='#e5e7eb'"
      >
        <div>
          <p style="margin: 0; font-weight: 500; font-size: 14px; color: #1f2937;">
            ${b.titulo}
          </p>
          <p style="margin: 3px 0 0 0; font-size: 12px; color: #6b7280;">
            <i class="fas fa-calendar-alt" style="margin-right: 4px;"></i>
            ${b.fecha}
          </p>
        </div>
        <div style="color: #3ca203; font-size: 12px;">
          <i class="fas fa-eye"></i> Ver
        </div>
      </div>
    `).join('');

    // Guardar las bitácoras en una variable global para el onclick
    window.bitacorasData = bitacorasBimestre;

    Swal.fire({
      title: `📖 ${aprendiz.nombre} - Bimestre ${bimestreSeleccionado}`,
      html: `
        <div style="text-align: left; padding: 5px 0; max-height: 400px; overflow-y: auto;">
          <p style="color: #6b7280; font-size: 13px; margin-bottom: 12px;">
            ${bitacorasBimestre.length} bitácoras encontradas
          </p>
          ${bitacorasHtml}
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
      showCancelButton: true,
      cancelButtonColor: '#6b7280',
      cancelButtonText: 'Cerrar',
      customClass: {
        popup: 'swal2-popup-sandbox',
        title: 'swal2-title-sandbox',
        confirmButton: 'swal2-confirm-sandbox',
        cancelButton: 'swal2-cancel-sandbox',
      },
      didOpen: () => {
        // Definir la función para ver bitácora individual
        window.verBitacora = (id) => {
          const bitacora = window.bitacorasData.find(b => b.id === id);
          if (bitacora) {
            Swal.fire({
              title: `📖 ${bitacora.titulo}`,
              html: `
                <div style="text-align: left; padding: 10px 0;">
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 15px;">
                    <div><strong>Aprendiz:</strong></div>
                    <div>${aprendiz.nombre}</div>
                    <div><strong>Fecha:</strong></div>
                    <div>${bitacora.fecha}</div>
                    <div><strong>Bimestre:</strong></div>
                    <div>${bitacora.bimestre}</div>
                  </div>
                  <hr style="border: 1px solid #e5e7eb; margin: 10px 0;" />
                  <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb;">
                    <p style="margin: 0; font-size: 15px; color: #1f2937; line-height: 1.6;">
                      ${bitacora.contenido}
                    </p>
                  </div>
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
              customClass: {
                popup: 'swal2-popup-sandbox',
                title: 'swal2-title-sandbox',
                confirmButton: 'swal2-confirm-sandbox',
              }
            });
          }
        };
      }
    });
  };

  // Filtrar aprendices por búsqueda
  const filteredAprendices = ficha.aprendices.filter(a =>
    a.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Verificar si un aprendiz tiene bitácoras en un bimestre
  const tieneBitacorasEnBimestre = (aprendiz, bimestre) => {
    return aprendiz.bitacoras.some(b => b.bimestre === bimestre);
  };

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      <Breadcrumb />

      <button
        onClick={() => navigate('/coordinador/reporte-bitacoras')}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#3ca203',
          cursor: 'pointer',
          marginBottom: '15px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '14px',
          fontWeight: '500'
        }}
      >
        <i className="fas fa-arrow-left" /> Volver a fichas
      </button>

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
          Ficha {ficha.id} - {ficha.programa}
        </h2>
        <p style={{ color: '#6b7280', margin: '5px 0 0 0' }}>
          Instructor: {ficha.instructor} • {ficha.aprendices.length} aprendices
        </p>
      </div>

      {/* FILTROS DE BIMESTRE */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {[1, 2, 3].map((bim) => {
          const total = ficha.aprendices.reduce((acc, a) => 
            acc + a.bitacoras.filter(b => b.bimestre === bim).length, 0
          );

          return (
            <button
              key={bim}
              onClick={() => setBimestreSeleccionado(bim)}
              style={{
                padding: '8px 20px',
                background: bimestreSeleccionado === bim ? '#3ca203' : '#f8fafc',
                color: bimestreSeleccionado === bim ? 'white' : '#1f2937',
                border: `1px solid ${bimestreSeleccionado === bim ? '#3ca203' : '#e5e7eb'}`,
                borderRadius: '20px',
                cursor: total > 0 ? 'pointer' : 'default',
                fontWeight: 'bold',
                fontSize: '14px',
                opacity: total > 0 ? 1 : 0.5,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}
              disabled={total === 0}
            >
              <span>Bimestre {bim}</span>
              {total > 0 && (
                <span style={{
                  background: bimestreSeleccionado === bim ? 'rgba(255,255,255,0.2)' : '#e6f7ed',
                  color: bimestreSeleccionado === bim ? 'white' : '#047857',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  fontSize: '11px',
                  fontWeight: 'bold'
                }}>
                  {total}
                </span>
              )}
              {total === 0 && (
                <span style={{ fontSize: '11px', color: '#9ca3af' }}>
                  (sin bitácoras)
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* BUSCADOR */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar por aprendiz..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1, padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
        />
        <button onClick={handleSearch} style={{ background: '#3ca203', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}>Buscar</button>
        <button onClick={handleClear} style={{ background: '#e5e7eb', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}>Limpiar</button>
      </div>

      {/* APRENDICES FILTRADOS */}
      {filteredAprendices.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h3 style={{ color: '#dc2626' }}>Dato no encontrado</h3>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          {filteredAprendices.map(a => {
            const bitacorasBimestre = a.bitacoras.filter(b => b.bimestre === bimestreSeleccionado);
            const totalBitacoras = bitacorasBimestre.length;

            // Si no hay bitácoras en este bimestre, mostrar el aprendiz con mensaje
            return (
              <div
                key={a.id}
                onClick={() => handleVerBitacorasAprendiz(a)}
                style={{
                  background: 'white',
                  padding: '18px 20px',
                  borderRadius: '12px',
                  border: totalBitacoras > 0 ? '2px solid #e5e7eb' : '2px solid #f3f4f6',
                  cursor: totalBitacoras > 0 ? 'pointer' : 'default',
                  transition: 'all 0.2s',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  opacity: totalBitacoras > 0 ? 1 : 0.6
                }}
                onMouseEnter={(e) => {
                  if (totalBitacoras > 0) {
                    e.currentTarget.style.borderColor = '#3ca203';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (totalBitacoras > 0) {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                <div>
                  <p style={{ margin: 0, fontWeight: 'bold', fontSize: '15px, color: #1f2937' }}>
                    {a.nombre}
                  </p>
                  <p style={{ margin: '3px 0 0 0', fontSize: '12px', color: '#6b7280' }}>
                    {totalBitacoras > 0 
                      ? `${totalBitacoras} bitácoras en Bimestre ${bimestreSeleccionado}`
                      : `Sin bitácoras en Bimestre ${bimestreSeleccionado}`
                    }
                  </p>
                </div>
                <div>
                  {totalBitacoras > 0 ? (
                    <span style={{
                      background: '#e6f7ed',
                      color: '#047857',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <i className="fas fa-eye" /> Ver
                    </span>
                  ) : (
                    <span style={{
                      color: '#9ca3af',
                      fontSize: '11px',
                      fontStyle: 'italic'
                    }}>
                      Sin bitácoras
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ReporteFichaBitacoras;