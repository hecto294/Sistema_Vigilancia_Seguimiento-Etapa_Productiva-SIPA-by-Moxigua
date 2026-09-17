// src/core/api/client.js
// Cliente HTTP para hacer peticiones a la API

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Función para obtener el token
const getToken = () => localStorage.getItem('token');

// Función para manejar errores
const handleResponse = async (response) => {
  if (response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
    throw {
      status: 401,
      message: 'Sesión expirada. Por favor inicia sesión de nuevo.',
    };
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw {
      status: response.status,
      message: error.detail || error.message || 'Error en la petición',
      data: error,
    };
  }

  if (response.status === 204) return null;

  return response.json();
};

// Función para crear headers con autenticación
const getHeaders = (customHeaders = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// 🔥 FUNCIÓN NUEVA: Construir la URL con query params
const buildUrl = (endpoint, params) => {
  let url = `${API_BASE_URL}${endpoint}`;
  if (params && Object.keys(params).length > 0) {
    const queryString = new URLSearchParams(
      Object.entries(params).filter(([_, v]) => v !== undefined && v !== null)
    ).toString();
    if (queryString) url += `?${queryString}`;
  }
  return url;
};

export const apiClient = {
  get: async (endpoint, options = {}) => {
    try {
      // 🔥 Construir URL con params
      const url = buildUrl(endpoint, options.params);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: getHeaders(options.headers),
      });
      return handleResponse(response);
    } catch (error) {
      console.error(`Error GET ${endpoint}:`, error);
      throw error;
    }
  },

  post: async (endpoint, data = {}, options = {}) => {
    try {
      const url = buildUrl(endpoint, options.params);
      const response = await fetch(url, {
        method: 'POST',
        headers: getHeaders(options.headers),
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    } catch (error) {
      console.error(`Error POST ${endpoint}:`, error);
      throw error;
    }
  },

  put: async (endpoint, data = {}, options = {}) => {
    try {
      const url = buildUrl(endpoint, options.params);
      const response = await fetch(url, {
        method: 'PUT',
        headers: getHeaders(options.headers),
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    } catch (error) {
      console.error(`Error PUT ${endpoint}:`, error);
      throw error;
    }
  },

  patch: async (endpoint, data = {}, options = {}) => {
    try {
      const url = buildUrl(endpoint, options.params);
      const response = await fetch(url, {
        method: 'PATCH',
        headers: getHeaders(options.headers),
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    } catch (error) {
      console.error(`Error PATCH ${endpoint}:`, error);
      throw error;
    }
  },

  delete: async (endpoint, options = {}) => {
    try {
      const url = buildUrl(endpoint, options.params);
      const response = await fetch(url, {
        method: 'DELETE',
        headers: getHeaders(options.headers),
      });
      return handleResponse(response);
    } catch (error) {
      console.error(`Error DELETE ${endpoint}:`, error);
      throw error;
    }
  },
};

export default apiClient;