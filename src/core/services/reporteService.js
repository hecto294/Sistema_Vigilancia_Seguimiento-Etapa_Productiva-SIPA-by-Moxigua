// src/core/services/reporteService.js
import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const reporteService = {
  // ============ DASHBOARD DE REPORTES GLOBALES ============
  getDashboard: async () => {
    return await apiClient.get('/reportes/dashboard');
  },

  // ============ REPORTES DE BITÁCORAS ============

  getBitacorasReport: async (params = {}) => {
    return await apiClient.get(API_ENDPOINTS.REPORTES.BITACORAS, { params });
  },

  getBitacorasByFichaReport: async (fichaId) => {
    return await apiClient.get(API_ENDPOINTS.REPORTES.BITACORAS, {
      params: { ficha_id: fichaId },
    });
  },

  getBitacorasByAprendizReport: async (aprendizId) => {
    return await apiClient.get(API_ENDPOINTS.REPORTES.BITACORAS, {
      params: { aprendiz_id: aprendizId },
    });
  },

  // ============ REPORTES DE SEGUIMIENTO ============

  getSeguimientoReport: async (params = {}) => {
    return await apiClient.get(API_ENDPOINTS.REPORTES.SEGUIMIENTOS, { params });
  },

  getSeguimientoByAprendizReport: async (aprendizId) => {
    return await apiClient.get(API_ENDPOINTS.REPORTES.SEGUIMIENTOS, {
      params: { aprendiz_id: aprendizId },
    });
  },

  // ============ REPORTES GLOBALES ============

  getGlobalesReport: async (params = {}) => {
    return await apiClient.get(API_ENDPOINTS.REPORTES.PROCESOS_RIESGO, { params });
  },

  getDashboardStats: async () => {
    return await apiClient.get('/reportes/dashboard');
  },

  // ============ EXPORTAR ============

  exportPDF: async (tipo, params = {}) => {
    return await apiClient.get(`/reportes/${tipo}`, {
      params: { ...params, formato: 'pdf' },
      responseType: 'blob',
    });
  },

  exportExcel: async (tipo, params = {}) => {
    return await apiClient.get(`/reportes/${tipo}`, {
      params: { ...params, formato: 'xlsx' },
      responseType: 'blob',
    });
  },
};

export default reporteService;