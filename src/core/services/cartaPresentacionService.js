// src/core/services/cartaPresentacionService.js
import { apiClient } from '../api/client';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const cartaPresentacionService = {
  // Listar cartas (según el rol del usuario logueado)
  listar: async (params = {}) => {
    return await apiClient.get('/cartas-presentacion/', { params });
  },

  // Subir 1 PDF (crea notificación automática al aprendiz)
  subir: async (procesoId, file) => {
    const formData = new FormData();
    formData.append('file', file);
    return await apiClient.post(
      `/cartas-presentacion/subir?proceso_id=${procesoId}`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
  },

  // Subir varios PDFs a la vez
  subirMasivo: async (files) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    return await apiClient.post('/cartas-presentacion/subir-masivo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  // Descargar plantilla Excel con los aprendices activos
  descargarPlantilla: async () => {
    const token = localStorage.getItem('token');

    const response = await fetch(
      `${API_BASE_URL}/cartas-presentacion/plantilla-aprendices`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      let errorMsg = 'No se pudo descargar la plantilla';
      try {
        const err = await response.json();
        errorMsg = err.detail || errorMsg;
      } catch {}
      throw new Error(errorMsg);
    }

    // Descargar como blob
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'plantilla_cartas_aprendices.xlsx');
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },

  // Actualizar estado (APROBADA / RECHAZADA / CARGADA)
  actualizarEstado: async (cartaId, estado, observaciones = null) => {
    return await apiClient.patch(`/cartas-presentacion/${cartaId}/estado`, {
      estado,
      observaciones,
    });
  },

  // Eliminar (soft delete)
  eliminar: async (cartaId) => {
    return await apiClient.delete(`/cartas-presentacion/${cartaId}`);
  },
};

export default cartaPresentacionService;