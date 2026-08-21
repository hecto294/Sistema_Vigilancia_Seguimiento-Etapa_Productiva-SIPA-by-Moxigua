// src/pages/admin/CargaMasivaUsuarios.jsx
import React, { useState } from 'react';
import * as XLSX from 'xlsx'; // Asegúrate de tener la librería instalada: npm install xlsx

const CargaMasivaUsuarios = ({ onClose, onUsuariosCargados }) => {
    const [archivo, setArchivo] = useState(null);
    const [vistaPrevia, setVistaPrevia] = useState([]);
    const [cargando, setCargando] = useState(false);

    // Manejar la selección del archivo
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setArchivo(file);
        procesarArchivo(file);
    };

    // Procesar el archivo Excel/CSV
    const procesarArchivo = (file) => {
        const reader = new FileReader();
        reader.onload = (evt) => {
            try {
                const data = new Uint8Array(evt.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);

                // Validar que el archivo tenga las columnas necesarias
                if (jsonData.length === 0) {
                    alert('El archivo está vacío.');
                    return;
                }

                // Mapear los datos para que coincidan con el formato de usuario
                const usuariosMapeados = jsonData.map((row, index) => ({
                    id: index + 1,
                    nombre: row['Nombre'] || row['nombre'] || 'Sin nombre',
                    rol: row['Rol'] || row['rol'] || 'Instructor', // Valor por defecto
                    email: row['Email'] || row['email'] || `${(row['Nombre'] || 'usuario').toLowerCase().replace(/\s/g, '.')}@soy.sena.edu.co`,
                }));

                setVistaPrevia(usuariosMapeados);
            } catch (error) {
                alert('Error al leer el archivo. Asegúrate de que sea un archivo Excel o CSV válido.');
                console.error(error);
            }
        };
        reader.readAsArrayBuffer(file);
    };

    // Confirmar la carga masiva
    const handleConfirmarCarga = () => {
        if (vistaPrevia.length === 0) {
            alert('No hay usuarios para cargar.');
            return;
        }

        setCargando(true);
        // Simular una carga en el backend
        setTimeout(() => {
            // Pasamos los usuarios al componente padre
            if (onUsuariosCargados) {
                onUsuariosCargados(vistaPrevia);
            }
            alert(`✅ ${vistaPrevia.length} usuarios cargados exitosamente.`);
            setCargando(false);
            onClose(); // Cerrar el modal
        }, 1500);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '15px' }}>Carga Masiva de Usuarios</h3>
            <p style={{ color: '#6b7280', marginBottom: '20px' }}>
                Selecciona un archivo Excel (.xlsx, .xls) o CSV con las columnas: <strong>Nombre, Rol, Email</strong>.
            </p>

            {/* Selector de archivo */}
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleFileChange}
                    style={{ display: 'block', marginBottom: '10px' }}
                />
                {archivo && <span style={{ fontSize: '14px', color: '#3ca203' }}>Archivo seleccionado: {archivo.name}</span>}
            </div>

            {/* Vista previa de los datos */}
            {vistaPrevia.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ fontWeight: '600', marginBottom: '10px' }}>Vista previa ({vistaPrevia.length} usuarios)</h4>
                    <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                            <thead style={{ backgroundColor: '#f3f4f6', position: 'sticky', top: 0, zIndex: 10 }}>
                                <tr>
                                    <th style={{ padding: '8px', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>#</th>
                                    <th style={{ padding: '8px', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>Nombre</th>
                                    <th style={{ padding: '8px', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>Rol</th>
                                    <th style={{ padding: '8px', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vistaPrevia.map((u, idx) => (
                                    <tr key={idx} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                        <td style={{ padding: '8px' }}>{idx + 1}</td>
                                        <td style={{ padding: '8px' }}>{u.nombre}</td>
                                        <td style={{ padding: '8px' }}>
                                            <span style={{
                                                background: u.rol === 'Instructor' ? '#d1fae5' : u.rol === 'Coordinador' ? '#e0f2fe' : '#fef3c7',
                                                color: u.rol === 'Instructor' ? '#047857' : u.rol === 'Coordinador' ? '#0ea5e9' : '#d97706',
                                                padding: '2px 8px',
                                                borderRadius: '12px',
                                                fontSize: '12px'
                                            }}>
                                                {u.rol}
                                            </span>
                                        </td>
                                        <td style={{ padding: '8px' }}>{u.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Botones de acción */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                    onClick={onClose}
                    style={{ background: '#e5e7eb', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}
                >
                    Cancelar
                </button>
                <button
                    onClick={handleConfirmarCarga}
                    disabled={vistaPrevia.length === 0 || cargando}
                    style={{
                        background: '#3ca203',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '6px',
                        cursor: vistaPrevia.length === 0 || cargando ? 'not-allowed' : 'pointer',
                        fontWeight: 'bold',
                        opacity: vistaPrevia.length === 0 || cargando ? 0.6 : 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    <i className="fas fa-upload" />
                    {cargando ? 'Cargando...' : 'Confirmar Carga Masiva'}
                </button>
            </div>
        </div>
    );
};

export default CargaMasivaUsuarios;