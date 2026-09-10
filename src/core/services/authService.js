// src/core/services/authService.js
import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export const authService = {
  // ============ INICIAR SESIÓN ============
  login: async (email, password) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
      
      if (response.access_token) {
        // Guardar token
        localStorage.setItem('token', response.access_token);
        
        // Guardar usuario
        const user = {
          id: response.usuario_id,
          nombre: response.nombre,
          rol_id: response.rol_id,
        };
        
        localStorage.setItem('user', JSON.stringify(user));
        
        return {
          ...response,
          user,
        };
      }
      
      throw new Error('Credenciales inválidas');
    } catch (error) {
      throw error;
    }
  },

  // ============ REGISTRAR USUARIO ============
  register: async (userData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // ============ CERRAR SESIÓN ============
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // ============ VERIFICAR TOKEN ============
  verifyToken: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.AUTH.ME);
      return !!response;
    } catch (error) {
      return false;
    }
  },

  // ============ OBTENER USUARIO ACTUAL ============
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // ============ VERIFICAR SI ESTÁ AUTENTICADO ============
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
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

  // Restablecer contraseña con código de verificación
  resetPassword: async (email, code, newPassword) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
        email,
        code,
        newPassword,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // ============ CAMBIO DE CONTRASEÑA (USUARIO LOGUEADO) ============
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, {
        currentPassword,
        newPassword,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default authService;