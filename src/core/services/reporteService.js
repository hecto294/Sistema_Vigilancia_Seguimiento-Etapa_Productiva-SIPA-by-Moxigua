// src/core/services/reporteService.js
import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const reporteService = {
  // ============ REPORTES DE BITÁCORAS ============

  // Reporte de bitácoras
  getBitacorasReport: async (params = {}) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.REPORTES.GET_BITACORAS, { params });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Reporte de bitácoras por ficha
  getBitacorasByFichaReport: async (fichaId) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.REPORTES.GET_BITACORAS_FICHA(fichaId));
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Reporte de bitácoras por aprendiz
  getBitacorasByAprendizReport: async (aprendizId) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.REPORTES.GET_BITACORAS_APRENDIZ(aprendizId));
      return response;
    } catch (error) {
      throw error;
    }
  },

  // ============ REPORTES DE ASISTENCIA ============

  // Reporte de asistencia
  getAsistenciaReport: async (params = {}) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.REPORTES.GET_ASISTENCIA, { params });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Reporte de asistencia por ficha
  getAsistenciaByFichaReport: async (fichaId) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.REPORTES.GET_ASISTENCIA_FICHA(fichaId));
      return response;
    } catch (error) {
      throw error;
    }
  },

  // ============ REPORTES DE SEGUIMIENTO ============

  // Reporte de seguimiento
  getSeguimientoReport: async (params = {}) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.REPORTES.GET_SEGUIMIENTO, { params });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Reporte de seguimiento por aprendiz
  getSeguimientoByAprendizReport: async (aprendizId) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.REPORTES.GET_SEGUIMIENTO_APRENDIZ(aprendizId));
      return response;
    } catch (error) {
      throw error;
    }
  },

  // ============ REPORTES GLOBALES ============

  // Reportes globales
  getGlobalesReport: async (params = {}) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.REPORTES.GET_GLOBALES, { params });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Dashboard de estadísticas
  getDashboardStats: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.REPORTES.GET_DASHBOARD);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // ============ EXPORTAR REPORTES ============

  // Exportar reporte en PDF
  exportPDF: async (tipo, params = {}) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.REPORTES.EXPORT_PDF(tipo), { 
        params,
        responseType: 'blob' 
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Exportar reporte en Excel
  exportExcel: async (tipo, params = {}) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.REPORTES.EXPORT_EXCEL(tipo), { 
        params,
        responseType: 'blob' 
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
};