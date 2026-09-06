// src/modules/shared/services/authService.js
// Servicio de autenticación

import { apiClient } from '../../../core/api/client';

export const authService = {
  // Iniciar sesión
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error al iniciar sesión');
    }
  },

  // Registrar usuario
  register: async (userData) => {
    try {
      const response = await apiClient.post('/auth/register', userData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error al registrar usuario');
    }
  },

  // Cerrar sesión
  logout: async () => {
    try {
      await apiClient.post('/auth/logout');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } catch (error) {
      throw new Error(error.message || 'Error al cerrar sesión');
    }
  },

  // Recuperar contraseña
  recoverPassword: async (email) => {
    try {
      const response = await apiClient.post('/auth/recover-password', { email });
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error al recuperar contraseña');
    }
  },

  // Verificar código de recuperación
  verifyCode: async (email, code) => {
    try {
      const response = await apiClient.post('/auth/verify-code', { email, code });
      return response;
    } catch (error) {
      throw new Error(error.message || 'Código inválido');
    }
  },

  // Cambiar contraseña
  changePassword: async (email, code, newPassword) => {
    try {
      const response = await apiClient.post('/auth/change-password', { 
        email, 
        code, 
        newPassword 
      });
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error al cambiar contraseña');
    }
  },

  // Verificar token
  verifyToken: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token');
      const response = await apiClient.get('/auth/verify');
      return response;
    } catch (error) {
      throw new Error('Token inválido');
    }
  }
};

export default authService;
