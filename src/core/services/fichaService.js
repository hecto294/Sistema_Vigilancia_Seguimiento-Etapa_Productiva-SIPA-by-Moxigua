// src/core/services/fichaService.js
import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const fichaService = {
  // ============ CRUD BÁSICO ============

  // Obtener todas las fichas
  getFichas: async (params = {}) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.FICHAS.GET_ALL, { params });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Obtener ficha por ID
  getFichaById: async (id) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.FICHAS.GET_BY_ID(id));
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Crear ficha
  createFicha: async (fichaData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.FICHAS.CREATE, fichaData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Actualizar ficha
  updateFicha: async (id, fichaData) => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.FICHAS.UPDATE(id), fichaData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Eliminar ficha
  deleteFicha: async (id) => {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.FICHAS.DELETE(id));
      return response;
    } catch (error) {
      throw error;
    }
  },

  // ============ FILTROS ============

  // Obtener fichas por instructor
  getFichasByInstructor: async (instructorId) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.FICHAS.GET_BY_INSTRUCTOR(instructorId));
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Obtener aprendices de una ficha
  getAprendices: async (fichaId) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.FICHAS.GET_APRENDICES(fichaId));
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Obtener fichas por estado
  getFichasByEstado: async (estado) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.FICHAS.GET_BY_ESTADO(estado));
      return response;
    } catch (error) {
      throw error;
    }
  },

  // ============ ASIGNACIONES ============

  // Asignar instructor a ficha
  assignInstructor: async (fichaId, instructorId) => {
    try {
      const response = await apiClient.patch(API_ENDPOINTS.FICHAS.ASSIGN_INSTRUCTOR(fichaId), { instructorId });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Asignar aprendiz a ficha
  assignAprendiz: async (fichaId, aprendizId) => {
    try {
      const response = await apiClient.patch(API_ENDPOINTS.FICHAS.ASSIGN_APRENDIZ(fichaId), { aprendizId });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Asignar múltiples aprendices a una ficha
  assignMultipleAprendices: async (fichaId, aprendicesIds) => {
    try {
      const response = await apiClient.patch(API_ENDPOINTS.FICHAS.ASSIGN_MULTIPLE(fichaId), { aprendicesIds });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // ============ CARGA MASIVA ============

  // Carga masiva de fichas (desde array)
  bulkCreateFichas: async (fichasData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.FICHAS.BULK_CREATE, { fichas: fichasData });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Carga masiva de fichas con archivo Excel/CSV
  bulkUploadFichas: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await apiClient.post(API_ENDPOINTS.FICHAS.BULK_UPLOAD, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // ============ ESTADÍSTICAS ============

  // Obtener estadísticas de fichas
  getFichasStats: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.FICHAS.STATS);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // ============ BÚSQUEDA ============

  // Buscar fichas
  searchFichas: async (query) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.FICHAS.SEARCH, { params: { q: query } });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // ============ EXPORTAR ============

  // Exportar fichas
  exportFichas: async (params = {}) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.FICHAS.EXPORT, { params });
      return response;
    } catch (error) {
      throw error;
    }
  }
};