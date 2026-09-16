// src/core/services/userService.js
import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const userService = {
  // ============ CRUD BÁSICO ============

  // Obtener todos los usuarios
  getUsers: async (params = {}) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.USUARIOS.GET_ALL, { params });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Obtener usuario por ID
  getUserById: async (id) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.USUARIOS.GET_BY_ID(id));
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Crear usuario
  createUser: async (userData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.USUARIOS.CREATE, userData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Actualizar usuario
  updateUser: async (id, userData) => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.USUARIOS.UPDATE(id), userData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Eliminar usuario
  deleteUser: async (id) => {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.USUARIOS.DELETE(id));
      return response;
    } catch (error) {
      throw error;
    }
  },

  // ============ FILTROS POR ROL ============

  // Obtener usuarios por rol (usa el parámetro rol_id del backend)
  getUsersByRole: async (rolId) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.USUARIOS.GET_ALL, {
        params: { rol_id: rolId },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Obtener instructores (rol_id = 3)
  getInstructors: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.USUARIOS.GET_ALL, {
        params: { rol_id: 3 },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Obtener aprendices (rol_id = 4)
  getAprendices: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.USUARIOS.GET_ALL, {
        params: { rol_id: 4 },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Obtener aprendices por ficha
  getAprendicesByFicha: async (fichaId) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.USUARIOS.GET_ALL, {
        params: { ficha_id: fichaId },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // ============ CARGA MASIVA ============

  // Carga masiva de usuarios (desde array)
  bulkCreateUsers: async (usersData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.IMPORTACION.IMPORTAR('usuarios'), {
        users: usersData,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Carga masiva de usuarios con archivo Excel/CSV
  bulkUploadUsers: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await apiClient.post(
        API_ENDPOINTS.IMPORTACION.IMPORTAR('usuarios'),
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  // ============ ESTADÍSTICAS ============

  // Obtener estadísticas de usuarios
  getUsersStats: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.USUARIOS.STATS);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // ============ BÚSQUEDA ============

  // Buscar usuarios
  searchUsers: async (query) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.USUARIOS.GET_ALL, {
        params: { search: query },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default userService;