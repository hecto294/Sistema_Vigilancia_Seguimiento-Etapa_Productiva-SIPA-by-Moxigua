// src/core/services/empresaService.js
import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const empresaService = {
  // ============ CRUD BÁSICO ============

  // Obtener todas las empresas
  getEmpresas: async (params = {}) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.EMPRESAS.GET_ALL, { params });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Obtener empresa por ID
  getEmpresaById: async (id) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.EMPRESAS.GET_BY_ID(id));
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Crear empresa
  createEmpresa: async (empresaData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.EMPRESAS.CREATE, empresaData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Actualizar empresa
  updateEmpresa: async (id, empresaData) => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.EMPRESAS.UPDATE(id), empresaData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Eliminar empresa
  deleteEmpresa: async (id) => {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.EMPRESAS.DELETE(id));
      return response;
    } catch (error) {
      throw error;
    }
  },

  // ============ ASIGNACIONES ============

  // Asignar aprendiz a empresa
  assignAprendiz: async (empresaId, aprendizId) => {
    try {
      const response = await apiClient.patch(API_ENDPOINTS.EMPRESAS.ASSIGN_APRENDIZ(empresaId), { aprendizId });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Obtener aprendices de una empresa
  getAprendicesByEmpresa: async (empresaId) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.EMPRESAS.GET_APRENDICES(empresaId));
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Desasignar aprendiz de empresa
  unassignAprendiz: async (empresaId, aprendizId) => {
    try {
      const response = await apiClient.patch(API_ENDPOINTS.EMPRESAS.UNASSIGN_APRENDIZ(empresaId), { aprendizId });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // ============ CARGA MASIVA ============

  // Carga masiva de empresas
  bulkCreateEmpresas: async (empresasData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.EMPRESAS.BULK_CREATE, { empresas: empresasData });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // ============ ESTADÍSTICAS ============

  // Obtener estadísticas de empresas
  getEmpresasStats: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.EMPRESAS.STATS);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // ============ BÚSQUEDA ============

  // Buscar empresas
  searchEmpresas: async (query) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.EMPRESAS.SEARCH, { params: { q: query } });
      return response;
    } catch (error) {
      throw error;
    }
  }
};