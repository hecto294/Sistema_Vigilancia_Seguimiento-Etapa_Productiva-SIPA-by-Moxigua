// src/core/services/fichaService.js
import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const fichaService = {
  // ============ FICHAS ============

  getFichas: async (params = {}) => {
    return await apiClient.get(API_ENDPOINTS.PROGRAMAS_FICHAS.GET_FICHAS, { params });
  },

  getFichaById: async (id) => {
    return await apiClient.get(API_ENDPOINTS.PROGRAMAS_FICHAS.GET_FICHA(id));
  },

  createFicha: async (fichaData) => {
    return await apiClient.post(API_ENDPOINTS.PROGRAMAS_FICHAS.CREATE_FICHA, fichaData);
  },

  updateFicha: async (id, fichaData) => {
    return await apiClient.put(API_ENDPOINTS.PROGRAMAS_FICHAS.UPDATE_FICHA(id), fichaData);
  },

  deleteFicha: async (id) => {
    return await apiClient.delete(API_ENDPOINTS.PROGRAMAS_FICHAS.DELETE_FICHA(id));
  },

  // ============ NUEVA FUNCIÓN: APRENDICES POR FICHA ============
  // Esta función intenta traer los aprendices de una ficha específica.
  // Si tu backend no tiene un endpoint dedicado, usamos /usuarios/ y filtramos.
  getAprendicesByFicha: async (idFicha) => {
    try {
      // OPCIÓN A: Si tu backend tiene un endpoint específico (ej: /fichas/{id}/aprendices)
      // Descomenta la siguiente línea y comenta la OPCIÓN B:
      // return await apiClient.get(`/fichas/${idFicha}/aprendices`);

      // OPCIÓN B (ACTUAL): Traer todos los usuarios y filtrar por rol y ficha
      // ⚠️ NOTA: Esto es temporal. Lo ideal es crear un endpoint en el backend.
      const todosLosUsuarios = await apiClient.get(API_ENDPOINTS.USUARIOS.GET_ALL);
      
      // Filtramos solo los que son aprendices y pertenecen a esta ficha
      // Ajusta los nombres de las propiedades según lo que devuelva tu backend
      const aprendices = todosLosUsuarios.filter(user => 
        user.rol === 'aprendiz' || user.role === 'aprendiz'
      ).filter(user => 
        user.ficha_id === parseInt(idFicha) || 
        user.fichaId === parseInt(idFicha) ||
        user.ficha?.id === parseInt(idFicha)
      );

      // Mapeamos los datos para que coincidan con lo que espera la tabla
      return aprendices.map(ap => ({
        id: ap.id,
        nombre: ap.nombre || ap.name || `${ap.nombres || ''} ${ap.apellidos || ''}`.trim() || 'Sin nombre',
        correo: ap.correo || ap.email || 'Sin correo',
        empresa: ap.empresa?.nombre || ap.empresa_nombre || 'Sin asignar',
        arl: ap.arl || ap.arl_nombre || 'Sin ARL',
        estado: ap.is_active !== false ? 'ACTIVO' : 'INACTIVO',
      }));

    } catch (error) {
      console.error('Error al obtener aprendices de la ficha:', error);
      // Si falla, devolvemos un array vacío para que la UI no se rompa
      return [];
    }
  },

  // ============ PROGRAMAS ============

  getProgramas: async (params = {}) => {
    return await apiClient.get(API_ENDPOINTS.PROGRAMAS_FICHAS.GET_PROGRAMAS, { params });
  },

  getProgramaById: async (id) => {
    return await apiClient.get(API_ENDPOINTS.PROGRAMAS_FICHAS.GET_PROGRAMA(id));
  },

  createPrograma: async (data) => {
    return await apiClient.post(API_ENDPOINTS.PROGRAMAS_FICHAS.CREATE_PROGRAMA, data);
  },

  updatePrograma: async (id, data) => {
    return await apiClient.put(API_ENDPOINTS.PROGRAMAS_FICHAS.UPDATE_PROGRAMA(id), data);
  },

  deletePrograma: async (id) => {
    return await apiClient.delete(API_ENDPOINTS.PROGRAMAS_FICHAS.DELETE_PROGRAMA(id));
  },
};

export default fichaService;