// src/pages/coordinador/ReporteFichaDetalle.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../shared/components/Breadcrumb';
import Swal from 'sweetalert2';

const ReporteFichaDetalle = () => {
  const navigate = useNavigate();
  const { idFicha } = useParams();

  // Datos de la ficha y sus aprendices
  const ficha = {
    id: idFicha,
    programa: 'Análisis y Desarrollo de Software',
    instructor: 'Carlos Andrés López',
    aprendices: [
      { 
        id: 1, 
        nombre: 'Laura Sofia Martinez', 
        documento: '1.234.567-8',
        email: 'laura.martinez@soy.sena.edu.co',
        telefono: '310 555 1234',
        empresa: 'TechSoft S.A.S.',
        arl: 'SURA',
        estado: 'Activo',
        fechaInicio: '01/03/2025',
        fechaFin: '28/02/2026',
        momentos: {
          momento1: 'Completado',
          momento2: 'Completado',
          momento3: 'Pendiente'
        },
        bitacoras: {
          bimestre1: 'Subida',
          bimestre2: 'Pendiente',
          bimestre3: 'Pendiente'
        },
        avance: 78
      },
      { 
        id: 2, 
        nombre: 'Juan Diego Ramirez', 
        documento: '8.765.432-1',
        email: 'juan.ramirez@soy.sena.edu.co',
        telefono: '310 555 5678',
        empresa: 'Innovar Solutions',
        arl: 'Positiva',
        estado: 'Activo',
        fechaInicio: '15/04/2025',
        fechaFin: '14/04/2026',
        momentos: {
          momento1: 'Completado',
          momento2: 'En proceso',
          momento3: 'Pendiente'
        },
        bitacoras: {
          bimestre1: 'Subida',
          bimestre2: 'En revisión',
          bimestre3: 'Pendiente'
        },
        avance: 60
      },
      { 
        id: 3, 
        nombre: 'Maria Camila Torres', 
        documento: '1.122.334-4',
        email: 'maria.torres@soy.sena.edu.co',
        telefono: '310 555 9012',
        empresa: 'Global Services LTDA',
        arl: 'Colmena',
        estado: 'Activo',
        fechaInicio: '01/06/2025',
        fechaFin: '31/05/2026',
        momentos: {
          momento1: 'Completado',
          momento2: 'Pendiente',
          momento3: 'Pendiente'
        },
        bitacoras: {
          bimestre1: 'En revisión',
          bimestre2: 'Pendiente',
          bimestre3: 'Pendiente'
        },
        avance: 45
      },
      { 
        id: 4, 
        nombre: 'Carlos Mendoza', 
        documento: '9.988.776-6',
        email: 'carlos.mendoza@soy.sena.edu.co',
        telefono: '310 555 3456',
        empresa: 'DataTech Colombia',
        arl: 'Positiva',
        estado: 'Activo',
        fechaInicio: '20/02/2025',
        fechaFin: '19/02/2026',
        momentos: {
          momento1: 'Completado',
          momento2: 'Completado',
          momento3: 'Completado'
        },
        bitacoras: {
          bimestre1: 'Subida',
          bimestre2: 'Subida',
          bimestre3: 'Pendiente'
        },
        avance: 92
      },
      { 
        id: 5, 
        nombre: 'Valentina Rojas', 
        documento: '5.554.433-2',
        email: 'valentina.rojas@soy.sena.edu.co',
        telefono: '310 555 7890',
        empresa: 'Soluciones Web SAS',
        arl: 'SURA',
        estado: 'Activo',
        fechaInicio: '10/05/2025',
        fechaFin: '09/05/2026',
        momentos: {
          momento1: 'Completado',
          momento2: 'Completado',
          momento3: 'En proceso'
        },
        bitacoras: {
          bimestre1: 'Subida',
          bimestre2: 'Subida',
          bimestre3: 'En revisión'
        },
        avance: 85
      },
    ]
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => setSearchQuery(searchTerm);
  const handleClear = () => { setSearchTerm(''); setSearchQuery(''); };

  const filteredAprendices = ficha.aprendices.filter(a =>
    a.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.documento.includes(searchQuery) ||
    a.empresa.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getEstadoColor = (estado) => {
    if (estado === 'Completado' || estado === 'Subida') return '#10b981';
    if (estado === 'En proceso' || estado === 'En revisión') return '#f59e0b';
    return '#ef4444';
  };

  const getEstadoBadge = (estado) => {
    const colors = {
      'Completado': { bg: '#d1fae5', text: '#047857' },
      'Subida': { bg: '#d1fae5', text: '#047857' },
      'En proceso': { bg: '#fef3c7', text: '#d97706' },
      'En revisión': { bg: '#fef3c7', text: '#d97706' },
      'Pendiente': { bg: '#f3f4f6', text: '#6b7280' },
    };
    return colors[estado] || { bg: '#f3f4f6', text: '#6b7280' };
  };

  const handleVerDetalle = (aprendiz) => {
    Swal.fire({
      title: `📋 ${aprendiz.nombre}`,
      html: `
        <div style="text-align: left; padding: 10px 0;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <div><strong>Documento:</strong></div>
            <div>${aprendiz.documento}</div>
            <div><strong>Email:</strong></div>
            <div>${aprendiz.email}</div>
            <div><strong>Teléfono:</strong></div>
            <div>${aprendiz.telefono}</div>
            <div><strong>Empresa:</strong></div>
            <div>${aprendiz.empresa}</div>
            <div><strong>ARL:</strong></div>
            <div>${aprendiz.arl}</div>
            <div><strong>Estado:</strong></div>
            <div><span style="color: ${aprendiz.estado === 'Activo' ? '#10b981' : '#ef4444'}; font-weight: bold;">${aprendiz.estado}</span></div>
            <div><strong>Fechas:</strong></div>
            <div>${aprendiz.fechaInicio} - ${aprendiz.fechaFin}</div>
          </div>
          <hr style="border: 1px solid #e5e7eb; margin: 15px 0;" />
          <div style="margin-bottom: 10px;">
            <strong>📌 Momentos:</strong>
            <div style="display: flex; gap: 10px; margin-top: 5px; flex-wrap: wrap;">
              <span style="background: ${getEstadoColor(aprendiz.momentos.momento1)}20; padding: 2px 10px; border-radius: 12px; font-size: 12px; border: 1px solid ${getEstadoColor(aprendiz.momentos.momento1)};">
                M1: ${aprendiz.momentos.momento1}
              </span>
              <span style="background: ${getEstadoColor(aprendiz.momentos.momento2)}20; padding: 2px 10px; border-radius: 12px; font-size: 12px; border: 1px solid ${getEstadoColor(aprendiz.momentos.momento2)};">
                M2: ${aprendiz.momentos.momento2}
              </span>
              <span style="background: ${getEstadoColor(aprendiz.momentos.momento3)}20; padding: 2px 10px; border-radius: 12px; font-size: 12px; border: 1px solid ${getEstadoColor(aprendiz.momentos.momento3)};">
                M3: ${aprendiz.momentos.momento3}
              </span>
            </div>
          </div>
          <div>
            <strong>📖 Bitácoras:</strong>
            <div style="display: flex; gap: 10px; margin-top: 5px; flex-wrap: wrap;">
              <span style="background: ${getEstadoColor(aprendiz.bitacoras.bimestre1)}20; padding: 2px 10px; border-radius: 12px; font-size: 12px; border: 1px solid ${getEstadoColor(aprendiz.bitacoras.bimestre1)};">
                B1: ${aprendiz.bitacoras.bimestre1}
              </span>
              <span style="background: ${getEstadoColor(aprendiz.bitacoras.bimestre2)}20; padding: 2px 10px; border-radius: 12px; font-size: 12px; border: 1px solid ${getEstadoColor(aprendiz.bitacoras.bimestre2)};">
                B2: ${aprendiz.bitacoras.bimestre2}
              </span>
              <span style="background: ${getEstadoColor(aprendiz.bitacoras.bimestre3)}20; padding: 2px 10px; border-radius: 12px; font-size: 12px; border: 1px solid ${getEstadoColor(aprendiz.bitacoras.bimestre3)};">
                B3: ${aprendiz.bitacoras.bimestre3}
              </span>
            </div>
          </div>
          <div style="margin-top: 15px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong>Avance General:</strong>
              <span style="font-weight: bold; color: ${aprendiz.avance >= 80 ? '#10b981' : aprendiz.avance >= 50 ? '#f59e0b' : '#ef4444'};">
                ${aprendiz.avance}%
              </span>
            </div>
            <div style="width: 100%; height: 8px; background: #f3f4f6; border-radius: 10px; overflow: hidden; margin-top: 5px;">
              <div style="width: ${aprendiz.avance}%; height: 100%; background: ${aprendiz.avance >= 80 ? '#10b981' : aprendiz.avance >= 50 ? '#f59e0b' : '#ef4444'}; border-radius: 10px;"></div>
            </div>
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
  };

  // Función para exportar reporte
  const handleExportar = () => {
    Swal.fire({
      title: '📥 Exportar reporte',
      text: '¿Deseas exportar el reporte de esta ficha?',
      icon: 'question',
      iconColor: '#3ca203',
      showCancelButton: true,
      confirmButtonColor: '#3ca203',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, exportar',
      cancelButtonText: 'Cancelar',
      customClass: {
        popup: 'swal2-popup-sandbox',
        title: 'swal2-title-sandbox',
        confirmButton: 'swal2-confirm-sandbox',
        cancelButton: 'swal2-cancel-sandbox',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '✅ Exportación completada',
          text: `El reporte de la ficha ${idFicha} se ha exportado exitosamente.`,
          icon: 'success',
          iconColor: '#3ca203',
          confirmButtonColor: '#3ca203',
          confirmButtonText: 'Aceptar',
          timer: 3000,
          timerProgressBar: true,
          customClass: {
            popup: 'swal2-popup-sandbox',
            title: 'swal2-title-sandbox',
            confirmButton: 'swal2-confirm-sandbox',
          }
        });
      }
    });
  };

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      <Breadcrumb />

      <button
        onClick={() => navigate('/coordinador/reportes')}
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
        <i className="fas fa-arrow-left" /> Volver a reportes
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
            Ficha {idFicha} - {ficha.programa}
          </h2>
          <p style={{ color: '#6b7280', margin: '5px 0 0 0' }}>
            Instructor: {ficha.instructor} • {ficha.aprendices.length} aprendices
          </p>
        </div>
        <button
          onClick={handleExportar}
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
          <i className="fas fa-file-export" /> Exportar Reporte
        </button>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Buscar por nombre, documento o empresa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1, padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
        />
        <button onClick={handleSearch} style={{ background: '#3ca203', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}>Buscar</button>
        <button onClick={handleClear} style={{ background: '#e5e7eb', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}>Limpiar</button>
      </div>

      {filteredAprendices.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h3 style={{ color: '#dc2626' }}>Dato no encontrado</h3>
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e5e7eb', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280' }}>Aprendiz</th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280' }}>Documento</th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280' }}>Empresa</th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280' }}>Momentos</th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280' }}>Bitácoras</th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280' }}>Avance</th>
                <th style={{ textAlign: 'center', padding: '12px', color: '#6b7280' }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {filteredAprendices.map(a => {
                const m1 = getEstadoBadge(a.momentos.momento1);
                const m2 = getEstadoBadge(a.momentos.momento2);
                const m3 = getEstadoBadge(a.momentos.momento3);
                const b1 = getEstadoBadge(a.bitacoras.bimestre1);
                const b2 = getEstadoBadge(a.bitacoras.bimestre2);
                const b3 = getEstadoBadge(a.bitacoras.bimestre3);

                return (
                  <tr key={a.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{a.nombre}</td>
                    <td style={{ textAlign: 'center', padding: '12px' }}>{a.documento}</td>
                    <td style={{ textAlign: 'center', padding: '12px' }}>{a.empresa}</td>
                    <td style={{ textAlign: 'center', padding: '12px' }}>
                      <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                        <span style={{ background: m1.bg, color: m1.text, padding: '2px 6px', borderRadius: '4px', fontSize: '10px' }}>M1</span>
                        <span style={{ background: m2.bg, color: m2.text, padding: '2px 6px', borderRadius: '4px', fontSize: '10px' }}>M2</span>
                        <span style={{ background: m3.bg, color: m3.text, padding: '2px 6px', borderRadius: '4px', fontSize: '10px' }}>M3</span>
                      </div>
                    </td>
                    <td style={{ textAlign: 'center', padding: '12px' }}>
                      <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                        <span style={{ background: b1.bg, color: b1.text, padding: '2px 6px', borderRadius: '4px', fontSize: '10px' }}>B1</span>
                        <span style={{ background: b2.bg, color: b2.text, padding: '2px 6px', borderRadius: '4px', fontSize: '10px' }}>B2</span>
                        <span style={{ background: b3.bg, color: b3.text, padding: '2px 6px', borderRadius: '4px', fontSize: '10px' }}>B3</span>
                      </div>
                    </td>
                    <td style={{ textAlign: 'center', padding: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                        <span style={{ fontWeight: 'bold', color: a.avance >= 80 ? '#10b981' : a.avance >= 50 ? '#f59e0b' : '#ef4444' }}>
                          {a.avance}%
                        </span>
                        <div style={{ width: '40px', height: '4px', background: '#f3f4f6', borderRadius: '10px', overflow: 'hidden' }}>
                          <div style={{ 
                            width: `${a.avance}%`, 
                            height: '100%', 
                            background: a.avance >= 80 ? '#10b981' : a.avance >= 50 ? '#f59e0b' : '#ef4444', 
                            borderRadius: '10px' 
                          }} />
                        </div>
                      </div>
                    </td>
                    <td style={{ textAlign: 'center', padding: '12px' }}>
                      <button
                        onClick={() => handleVerDetalle(a)}
                        style={{ 
                          background: '#e6f7ed', 
                          color: '#047857', 
                          border: 'none', 
                          padding: '4px 12px', 
                          borderRadius: '6px', 
                          cursor: 'pointer' 
                        }}
                      >
                        <i className="fas fa-eye" /> Ver
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReporteFichaDetalle;
