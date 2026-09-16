// src/core/services/procesoService.js
import { apiClient } from '../api/client';

export const procesoService = {
  // Lista procesos, opcionalmente filtrados por ficha_id, aprendiz_id, etc.
  getProcesos: async (params = {}) => {
    return await apiClient.get('/procesos', { params });
  },

  getProcesoById: async (id) => {
    return await apiClient.get(`/procesos/${id}`);
  },

  // Trae los datos del aprendiz (nombre, email) dado su ID
  getUsuarioById: async (id) => {
    return await apiClient.get(`/usuarios/${id}`);
  },
};

export default procesoService;