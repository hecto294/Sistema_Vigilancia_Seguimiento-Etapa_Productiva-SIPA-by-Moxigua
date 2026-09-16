// src/core/services/dashboardService.js
import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const dashboardService = {
  getAdmin: async () => {
    return await apiClient.get(API_ENDPOINTS.DASHBOARDS.ADMIN);
  },

  getCoordinador: async () => {
    return await apiClient.get(API_ENDPOINTS.DASHBOARDS.COORDINADOR);
  },

  getInstructor: async () => {
    return await apiClient.get(API_ENDPOINTS.DASHBOARDS.INSTRUCTOR);
  },
};

export default dashboardService;