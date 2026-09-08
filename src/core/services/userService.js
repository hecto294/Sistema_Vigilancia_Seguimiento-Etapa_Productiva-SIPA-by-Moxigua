// src/core/services/userService.js
import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const userService = {
  // ============ CRUD BÁSICO ============
  
  // Obtener todos los usuarios
  getUsers: async (params = {}) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.USERS.GET_ALL, { params });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Obtener usuario por ID
  getUserById: async (id) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.USERS.GET_BY_ID(id));
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Crear usuario
  createUser: async (userData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.USERS.CREATE, userData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Actualizar usuario
  updateUser: async (id, userData) => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.USERS.UPDATE(id), userData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Eliminar usuario
  deleteUser: async (id) => {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.USERS.DELETE(id));
      return response;
    } catch (error) {
      throw error;
    }
  },

  // ============ FILTROS POR ROL ============

  // Obtener usuarios por rol
  getUsersByRole: async (role) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.USERS.GET_BY_ROLE(role));
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Obtener instructores
  getInstructors: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.USERS.GET_INSTRUCTORS);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Obtener aprendices
  getAprendices: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.USERS.GET_APRENDICES);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Obtener aprendices por ficha
  getAprendicesByFicha: async (fichaId) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.USERS.GET_BY_FICHA(fichaId));
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Cambiar rol de usuario
  changeRole: async (id, role) => {
    try {
      const response = await apiClient.patch(API_ENDPOINTS.USERS.CHANGE_ROLE(id), { role });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // ============ CARGA MASIVA ============

  // Carga masiva de usuarios (desde archivo)
  bulkCreateUsers: async (usersData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.USERS.BULK_CREATE, { users: usersData });
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
      
      const response = await apiClient.post(API_ENDPOINTS.USERS.BULK_UPLOAD, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // ============ EXPORTAR ============

  // Exportar usuarios
  exportUsers: async (params = {}) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.USERS.EXPORT, { params });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // ============ ESTADÍSTICAS ============

  // Obtener estadísticas de usuarios
  getUsersStats: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.USERS.STATS);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // ============ BÚSQUEDA ============

  // Buscar usuarios
  searchUsers: async (query) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.USERS.SEARCH, { params: { q: query } });
      return response;
    } catch (error) {
      throw error;
    }
  }
};