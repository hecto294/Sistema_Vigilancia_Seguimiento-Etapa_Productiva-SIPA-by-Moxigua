// src/core/api/client.js
// Cliente HTTP para hacer peticiones a la API

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Función para obtener el token
const getToken = () => {
  return localStorage.getItem('token');
};

// Función para manejar errores
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw {
      status: response.status,
      message: error.message || 'Error en la petición',
      data: error
    };
  }
  return response.json();
};

// Función para crear headers con autenticación
const getHeaders = (customHeaders = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...customHeaders
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

export const apiClient = {
  // GET
  get: async (endpoint, options = {}) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: getHeaders(options.headers),
        ...options
      });
      return handleResponse(response);
    } catch (error) {
      console.error(`Error GET ${endpoint}:`, error);
      throw error;
    }
  },

  // POST
  post: async (endpoint, data = {}, options = {}) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: getHeaders(options.headers),
        body: JSON.stringify(data),
        ...options
      });
      return handleResponse(response);
    } catch (error) {
      console.error(`Error POST ${endpoint}:`, error);
      throw error;
    }
  },

  // PUT
  put: async (endpoint, data = {}, options = {}) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: getHeaders(options.headers),
        body: JSON.stringify(data),
        ...options
      });
      return handleResponse(response);
    } catch (error) {
      console.error(`Error PUT ${endpoint}:`, error);
      throw error;
    }
  },

  // PATCH
  patch: async (endpoint, data = {}, options = {}) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PATCH',
        headers: getHeaders(options.headers),
        body: JSON.stringify(data),
        ...options
      });
      return handleResponse(response);
    } catch (error) {
      console.error(`Error PATCH ${endpoint}:`, error);
      throw error;
    }
  },

  // DELETE
  delete: async (endpoint, options = {}) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: getHeaders(options.headers),
        ...options
      });
      return handleResponse(response);
    } catch (error) {
      console.error(`Error DELETE ${endpoint}:`, error);
      throw error;
    }
  }
};