import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../shared/components/Breadcrumb';
import { fichasData } from '../../../data/coordinadorData.jsx';

const DetalleAprendiz = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [aprendiz, setAprendiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    console.log('🔍 ID recibido de la URL:', id);

    // Si no hay ID, usar datos de prueba
    if (!id) {
      console.warn('⚠️ No se recibió ID, usando datos de prueba');
      const datosPrueba = {
        id: 'AP-001',
        nombre: 'Laura Sofia Martinez',
        documento: '1001234567',
        ficha: '2875901',
        programa: 'Análisis y Desarrollo de Software',
        estado: 'En formación',
        empresa: 'TechSoft S.A.S.',
        arl: 'SURA',
        correo: 'laura.martinez@soy.sena.edu.co',
        telefono: '310 555 1234',
        direccion: 'Calle 123 # 45-67, Bogotá',
        instructor: 'Carlos Andrés López',
        fechaInicio: '01/03/2025',
        fechaFin: '28/02/2026',
      };
      setAprendiz(datosPrueba);
      setFormData(datosPrueba);
      setLoading(false);
      return;
    }

    // ✅ Buscar el aprendiz en todas las fichas con documento real
    const todosLosAprendices = fichasData.flatMap(ficha => 
      ficha.aprendices.map(aprendiz => ({
        ...aprendiz,
        ficha: ficha.idFicha,
        programa: ficha.programa,
        // ✅ Ahora usa el documento real de los datos
        documento: aprendiz.documento || aprendiz.id, // Si no tiene documento, usa el ID
        correo: `${aprendiz.nombre.toLowerCase().replace(/ /g, '.')}@soy.sena.edu.co`,
        telefono: '310 555 1234',
        direccion: 'Calle 123 # 45-67, Bogotá',
        instructor: 'Carlos Andrés López',
        fechaInicio: '01/03/2025',
        fechaFin: '28/02/2026',
      }))
    );

    console.log('📊 Todos los aprendices:', todosLosAprendices);

    // Buscar por ID o documento
    const aprendizEncontrado = todosLosAprendices.find(a => 
      a.id === id || a.documento === id
    );
    
    if (aprendizEncontrado) {
      setAprendiz(aprendizEncontrado);
      setFormData(aprendizEncontrado);
    } else {
      console.error(`❌ Aprendiz con ID "${id}" no encontrado`);
      setAprendiz(null);
    }
    setLoading(false);
  }, [id]);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Guardar cambios
  const handleSave = () => {
    // Aquí iría la llamada a la API para guardar los cambios
    console.log('💾 Datos guardados:', formData);
    
    // Actualizar el estado local
    setAprendiz(formData);
    setEditMode(false);
    
    // Mostrar mensaje de éxito
    alert('✅ Datos actualizados correctamente');
  };

  // Cancelar edición
  const handleCancel = () => {
    setFormData(aprendiz);
    setEditMode(false);
  };

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

  // Mostrar loading mientras se carga
  if (loading) {
    return (
      <div style={{ width: '100%', padding: '20px 0', textAlign: 'center' }}>
        <div style={{ display: 'inline-block' }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: '32px', color: '#3ca203' }} />
          <p style={{ marginTop: '10px', color: '#6b7280' }}>Cargando datos del aprendiz...</p>
        </div>
      </div>
    );
  }

  // Mostrar mensaje si no se encuentra el aprendiz
  if (!aprendiz) {
    return (
      <div style={{ width: '100%', padding: '20px 0' }}>
        <Breadcrumb />
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '40px',
          textAlign: 'center',
          border: '1px solid #e5e7eb',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <i className="fas fa-user-slash" style={{ fontSize: '48px', color: '#ef4444', marginBottom: '16px' }} />
          <h3 style={{ color: '#dc2626' }}>Aprendiz no encontrado</h3>
          <p style={{ color: '#6b7280' }}>
            {id ? `El aprendiz con ID "${id}" no existe en el sistema.` : 'No se proporcionó un ID válido.'}
          </p>
          <button
            onClick={() => navigate('/coordinador/aprendices')}
            style={{
              background: '#3ca203',
              color: 'white',
              border: 'none',
              padding: '10px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              marginTop: '16px',
              fontWeight: 'bold'
            }}
          >
            <i className="fas fa-arrow-left" /> Volver a aprendices
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', padding: '20px 0' }}>
      <Breadcrumb />

      <button
        onClick={() => navigate('/coordinador/aprendices')}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#3ca203',
          cursor: 'pointer',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '14px',
          fontWeight: '500'
        }}
      >
        <i className="fas fa-arrow-left" /> Volver a aprendices
      </button>

      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '30px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        {/* Encabezado con foto y nombre */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          paddingBottom: '20px',
          borderBottom: '2px solid #e5e7eb',
          marginBottom: '25px'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#e6f7ed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            color: '#3ca203',
            fontWeight: 'bold',
            border: '3px solid #3ca203'
          }}>
            {aprendiz.nombre.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
          </div>
          <div>
            {editMode ? (
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  border: '2px solid #3ca203',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  width: '100%',
                  marginBottom: '5px'
                }}
              />
            ) : (
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 5px 0' }}>
                {aprendiz.nombre}
              </h2>
            )}
            <p style={{ color: '#6b7280', margin: '0' }}>
              <i className="fas fa-id-card" style={{ marginRight: '8px', color: '#3ca203' }} />
              Documento: {editMode ? (
                <input
                  type="text"
                  name="documento"
                  value={formData.documento}
                  onChange={handleInputChange}
                  style={{
                    border: '1px solid #3ca203',
                    borderRadius: '4px',
                    padding: '2px 6px',
                    width: '150px'
                  }}
                />
              ) : (
                aprendiz.documento
              )}
            </p>
            <p style={{ color: '#6b7280', margin: '5px 0 0 0' }}>
              <i className="fas fa-layer-group" style={{ marginRight: '8px', color: '#3ca203' }} />
              Ficha: {editMode ? (
                <input
                  type="text"
                  name="ficha"
                  value={formData.ficha}
                  onChange={handleInputChange}
                  style={{
                    border: '1px solid #3ca203',
                    borderRadius: '4px',
                    padding: '2px 6px',
                    width: '100px'
                  }}
                />
              ) : (
                aprendiz.ficha
              )} • {editMode ? (
                <input
                  type="text"
                  name="programa"
                  value={formData.programa}
                  onChange={handleInputChange}
                  style={{
                    border: '1px solid #3ca203',
                    borderRadius: '4px',
                    padding: '2px 6px',
                    width: '250px'
                  }}
                />
              ) : (
                aprendiz.programa
              )}
            </p>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            {editMode ? (
              <select
                name="estado"
                value={formData.estado}
                onChange={handleInputChange}
                style={{
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  border: '2px solid #3ca203',
                  background: 'white'
                }}
              >
                <option value="En formación">En formación</option>
                <option value="Condicionado">Condicionado</option>
                <option value="Finalizado">Finalizado</option>
                <option value="Retirado">Retirado</option>
              </select>
            ) : (
              <span style={{
                background: `${getEstadoConfig(aprendiz.estado).color}15`,
                color: getEstadoConfig(aprendiz.estado).color,
                padding: '6px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                <i className={`fas ${getEstadoConfig(aprendiz.estado).icono}`}></i>
                {aprendiz.estado}
              </span>
            )}
          </div>
        </div>

        {/* Datos Personales y Académicos */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
          {/* Columna Izquierda - Datos Personales */}
          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <i className="fas fa-user" style={{ color: '#3ca203' }} />
              Datos Personales
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>Nombre completo</span>
                {editMode ? (
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    style={{ border: '1px solid #3ca203', borderRadius: '4px', padding: '4px 8px', width: '200px' }}
                  />
                ) : (
                  <span style={{ fontWeight: '500', fontSize: '14px' }}>{aprendiz.nombre}</span>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>Documento</span>
                {editMode ? (
                  <input
                    type="text"
                    name="documento"
                    value={formData.documento}
                    onChange={handleInputChange}
                    style={{ border: '1px solid #3ca203', borderRadius: '4px', padding: '4px 8px', width: '150px' }}
                  />
                ) : (
                  <span style={{ fontWeight: '500', fontSize: '14px' }}>{aprendiz.documento}</span>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>Correo electrónico</span>
                {editMode ? (
                  <input
                    type="email"
                    name="correo"
                    value={formData.correo}
                    onChange={handleInputChange}
                    style={{ border: '1px solid #3ca203', borderRadius: '4px', padding: '4px 8px', width: '200px' }}
                  />
                ) : (
                  <span style={{ fontWeight: '500', fontSize: '14px' }}>{aprendiz.correo}</span>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>Teléfono</span>
                {editMode ? (
                  <input
                    type="text"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    style={{ border: '1px solid #3ca203', borderRadius: '4px', padding: '4px 8px', width: '150px' }}
                  />
                ) : (
                  <span style={{ fontWeight: '500', fontSize: '14px' }}>{aprendiz.telefono}</span>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>Dirección</span>
                {editMode ? (
                  <input
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    style={{ border: '1px solid #3ca203', borderRadius: '4px', padding: '4px 8px', width: '200px' }}
                  />
                ) : (
                  <span style={{ fontWeight: '500', fontSize: '14px' }}>{aprendiz.direccion}</span>
                )}
              </div>
            </div>
          </div>

          {/* Columna Derecha - Datos Académicos y Etapa Productiva */}
          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <i className="fas fa-graduation-cap" style={{ color: '#3ca203' }} />
              Datos Académicos
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>Ficha</span>
                {editMode ? (
                  <input
                    type="text"
                    name="ficha"
                    value={formData.ficha}
                    onChange={handleInputChange}
                    style={{ border: '1px solid #3ca203', borderRadius: '4px', padding: '4px 8px', width: '150px' }}
                  />
                ) : (
                  <span style={{ fontWeight: '500', fontSize: '14px' }}>{aprendiz.ficha}</span>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>Programa</span>
                {editMode ? (
                  <input
                    type="text"
                    name="programa"
                    value={formData.programa}
                    onChange={handleInputChange}
                    style={{ border: '1px solid #3ca203', borderRadius: '4px', padding: '4px 8px', width: '200px' }}
                  />
                ) : (
                  <span style={{ fontWeight: '500', fontSize: '14px' }}>{aprendiz.programa}</span>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>Instructor</span>
                {editMode ? (
                  <input
                    type="text"
                    name="instructor"
                    value={formData.instructor}
                    onChange={handleInputChange}
                    style={{ border: '1px solid #3ca203', borderRadius: '4px', padding: '4px 8px', width: '200px' }}
                  />
                ) : (
                  <span style={{ fontWeight: '500', fontSize: '14px' }}>{aprendiz.instructor}</span>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>Estado</span>
                {editMode ? (
                  <select
                    name="estado"
                    value={formData.estado}
                    onChange={handleInputChange}
                    style={{ border: '1px solid #3ca203', borderRadius: '4px', padding: '4px 8px', width: '150px' }}
                  >
                    <option value="En formación">En formación</option>
                    <option value="Condicionado">Condicionado</option>
                    <option value="Finalizado">Finalizado</option>
                    <option value="Retirado">Retirado</option>
                  </select>
                ) : (
                  <span style={{ fontWeight: '500', fontSize: '14px' }}>{aprendiz.estado}</span>
                )}
              </div>
            </div>

            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#1f2937',
              marginTop: '20px',
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <i className="fas fa-briefcase" style={{ color: '#3ca203' }} />
              Etapa Productiva
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>Empresa</span>
                {editMode ? (
                  <input
                    type="text"
                    name="empresa"
                    value={formData.empresa || ''}
                    onChange={handleInputChange}
                    style={{ border: '1px solid #3ca203', borderRadius: '4px', padding: '4px 8px', width: '200px' }}
                  />
                ) : (
                  <span style={{ fontWeight: '500', fontSize: '14px' }}>{aprendiz.empresa || 'Sin asignar'}</span>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>ARL</span>
                {editMode ? (
                  <input
                    type="text"
                    name="arl"
                    value={formData.arl || ''}
                    onChange={handleInputChange}
                    style={{ border: '1px solid #3ca203', borderRadius: '4px', padding: '4px 8px', width: '150px' }}
                  />
                ) : (
                  <span style={{ fontWeight: '500', fontSize: '14px' }}>{aprendiz.arl || 'Sin asignar'}</span>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>Fecha inicio</span>
                {editMode ? (
                  <input
                    type="date"
                    name="fechaInicio"
                    value={formData.fechaInicio}
                    onChange={handleInputChange}
                    style={{ border: '1px solid #3ca203', borderRadius: '4px', padding: '4px 8px', width: '150px' }}
                  />
                ) : (
                  <span style={{ fontWeight: '500', fontSize: '14px' }}>{aprendiz.fechaInicio}</span>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>Fecha fin</span>
                {editMode ? (
                  <input
                    type="date"
                    name="fechaFin"
                    value={formData.fechaFin}
                    onChange={handleInputChange}
                    style={{ border: '1px solid #3ca203', borderRadius: '4px', padding: '4px 8px', width: '150px' }}
                  />
                ) : (
                  <span style={{ fontWeight: '500', fontSize: '14px' }}>{aprendiz.fechaFin}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'flex-end',
          marginTop: '30px',
          paddingTop: '20px',
          borderTop: '2px solid #e5e7eb'
        }}>
          {editMode ? (
            <>
              <button
                onClick={handleCancel}
                style={{
                  background: '#e5e7eb',
                  border: 'none',
                  padding: '10px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '14px'
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                style={{
                  background: '#3ca203',
                  color: 'white',
                  border: 'none',
                  padding: '10px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}
              >
                <i className="fas fa-save" /> Guardar cambios
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/coordinador/aprendices')}
                style={{
                  background: '#e5e7eb',
                  border: 'none',
                  padding: '10px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '14px'
                }}
              >
                Cerrar
              </button>
              <button
                onClick={() => setEditMode(true)}
                style={{
                  background: '#3ca203',
                  color: 'white',
                  border: 'none',
                  padding: '10px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}
              >
                <i className="fas fa-edit" /> Editar aprendiz
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetalleAprendiz;
