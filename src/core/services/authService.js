// src/core/services/authService.js
import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const authService = {
  // ============ AUTENTICACIÓN BÁSICA ============

  // Iniciar sesión
  login: async (email, password) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
      
      if (response.token && response.user) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        return response;
      }
      throw new Error('Credenciales inválidas');
    } catch (error) {
      throw error;
    }
  },

  // Registrar usuario
  register: async (userData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Cerrar sesión
  logout: async () => {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  // Verificar token
  verifyToken: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.AUTH.VERIFY);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // ============ RECUPERACIÓN DE CONTRASEÑA ============

  // Solicitar recuperación de contraseña (envía código de 6 dígitos)
  requestPasswordReset: async (email) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.REQUEST_RESET, { email });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Verificar código de recuperación
  verifyResetCode: async (email, code) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.VERIFY_CODE, { email, code });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Cambiar contraseña con código de verificación
  resetPassword: async (email, code, newPassword) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
        email,
        code,
        newPassword
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // ============ CAMBIO DE CONTRASEÑA (USUARIO LOGUEADO) ============

  // Cambiar contraseña (usuario autenticado)
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, {
        currentPassword,
        newPassword
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // ============ UTILIDADES ============

  // Obtener usuario actual
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Verificar si está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Reenviar código de verificación
  resendVerificationCode: async (email) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.RESEND_CODE, { email });
      return response;
    } catch (error) {
      throw error;
    }
  }
};