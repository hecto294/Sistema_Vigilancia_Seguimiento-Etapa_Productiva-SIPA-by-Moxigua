// src/core/services/bitacoraService.js
import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const bitacoraService = {
  // ============ CRUD BÁSICO ============

  // Obtener todas las bitácoras
  getBitacoras: async (params = {}) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.BITACORAS.GET_ALL, { params });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Obtener bitácora por ID
  getBitacoraById: async (id) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.BITACORAS.GET_BY_ID(id));
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Crear bitácora
  createBitacora: async (bitacoraData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.BITACORAS.CREATE, bitacoraData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Actualizar bitácora
  updateBitacora: async (id, bitacoraData) => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.BITACORAS.UPDATE(id), bitacoraData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Eliminar bitácora
  deleteBitacora: async (id) => {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.BITACORAS.DELETE(id));
      return response;
    } catch (error) {
      throw error;
    }
  },

  // ============ FILTROS ============

  // Obtener bitácoras por aprendiz
  getBitacorasByAprendiz: async (aprendizId) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.BITACORAS.GET_BY_APRENDIZ(aprendizId));
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Obtener bitácoras por ficha
  getBitacorasByFicha: async (fichaId) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.BITACORAS.GET_BY_FICHA(fichaId));
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Obtener bitácoras por bimestre
  getBitacorasByBimestre: async (bimestre) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.BITACORAS.GET_BY_BIMESTRE(bimestre));
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Obtener bitácoras por instructor
  getBitacorasByInstructor: async (instructorId) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.BITACORAS.GET_BY_INSTRUCTOR(instructorId));
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Obtener bitácoras por estado
  getBitacorasByEstado: async (estado) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.BITACORAS.GET_BY_ESTADO(estado));
      return response;
    } catch (error) {
      throw error;
    }
  },

  // ============ APROBACIONES ============

  // Aprobar bitácora
  approveBitacora: async (id) => {
    try {
      const response = await apiClient.patch(API_ENDPOINTS.BITACORAS.APPROVE(id));
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Rechazar bitácora
  rejectBitacora: async (id, motivo) => {
    try {
      const response = await apiClient.patch(API_ENDPOINTS.BITACORAS.REJECT(id), { motivo });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // ============ CARGA MASIVA ============

  // Carga masiva de bitácoras
  bulkCreateBitacoras: async (bitacorasData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.BITACORAS.BULK_CREATE, { bitacoras: bitacorasData });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // ============ ESTADÍSTICAS ============

  // Obtener estadísticas de bitácoras
  getBitacorasStats: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.BITACORAS.STATS);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // ============ EXPORTAR ============

  // Exportar bitácoras
  exportBitacoras: async (params = {}) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.BITACORAS.EXPORT, { params });
      return response;
    } catch (error) {
      throw error;
    }
  }
};