// src/core/api/endpoints.js
export const API_ENDPOINTS = {
  // ============ AUTH ============
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    VERIFY: '/auth/verify',
    CHANGE_PASSWORD: '/auth/change-password',
    
    // Recuperación de contraseña
    REQUEST_RESET: '/auth/request-reset',
    VERIFY_CODE: '/auth/verify-code',
    RESET_PASSWORD: '/auth/reset-password',
    RESEND_CODE: '/auth/resend-code',
  },

  // ============ USERS ============
  USERS: {
    GET_ALL: '/users',
    GET_BY_ID: (id) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id) => `/users/${id}`,
    DELETE: (id) => `/users/${id}`,
    GET_BY_ROLE: (role) => `/users/role/${role}`,
    GET_INSTRUCTORS: '/users/instructors',
    GET_APRENDICES: '/users/aprendices',
    GET_BY_FICHA: (fichaId) => `/users/ficha/${fichaId}`,
    CHANGE_ROLE: (id) => `/users/${id}/role`,
    BULK_CREATE: '/users/bulk',
    BULK_UPLOAD: '/users/bulk/upload',
    EXPORT: '/users/export',
    STATS: '/users/stats',
    SEARCH: '/users/search',
  },

  // ============ FICHAS ============
  FICHAS: {
    GET_ALL: '/fichas',
    GET_BY_ID: (id) => `/fichas/${id}`,
    CREATE: '/fichas',
    UPDATE: (id) => `/fichas/${id}`,
    DELETE: (id) => `/fichas/${id}`,
    GET_BY_INSTRUCTOR: (instructorId) => `/fichas/instructor/${instructorId}`,
    GET_APRENDICES: (fichaId) => `/fichas/${fichaId}/aprendices`,
    ASSIGN_INSTRUCTOR: (fichaId) => `/fichas/${fichaId}/instructor`,
    ASSIGN_APRENDIZ: (fichaId) => `/fichas/${fichaId}/aprendiz`,
    ASSIGN_MULTIPLE: (fichaId) => `/fichas/${fichaId}/aprendices/multiple`,
    GET_BY_ESTADO: (estado) => `/fichas/estado/${estado}`,
    BULK_CREATE: '/fichas/bulk',
    BULK_UPLOAD: '/fichas/bulk/upload',
    STATS: '/fichas/stats',
    SEARCH: '/fichas/search',
    EXPORT: '/fichas/export',
  },

  // ============ BITACORAS ============
  BITACORAS: {
    GET_ALL: '/bitacoras',
    GET_BY_ID: (id) => `/bitacoras/${id}`,
    CREATE: '/bitacoras',
    UPDATE: (id) => `/bitacoras/${id}`,
    DELETE: (id) => `/bitacoras/${id}`,
    GET_BY_APRENDIZ: (aprendizId) => `/bitacoras/aprendiz/${aprendizId}`,
    GET_BY_FICHA: (fichaId) => `/bitacoras/ficha/${fichaId}`,
    GET_BY_BIMESTRE: (bimestre) => `/bitacoras/bimestre/${bimestre}`,
    GET_BY_INSTRUCTOR: (instructorId) => `/bitacoras/instructor/${instructorId}`,
    GET_BY_ESTADO: (estado) => `/bitacoras/estado/${estado}`,
    APPROVE: (id) => `/bitacoras/${id}/approve`,
    REJECT: (id) => `/bitacoras/${id}/reject`,
    BULK_CREATE: '/bitacoras/bulk',
    STATS: '/bitacoras/stats',
    EXPORT: '/bitacoras/export',
  },

  // ============ EMPRESAS ============
  EMPRESAS: {
    GET_ALL: '/empresas',
    GET_BY_ID: (id) => `/empresas/${id}`,
    CREATE: '/empresas',
    UPDATE: (id) => `/empresas/${id}`,
    DELETE: (id) => `/empresas/${id}`,
    ASSIGN_APRENDIZ: (empresaId) => `/empresas/${empresaId}/aprendiz`,
    UNASSIGN_APRENDIZ: (empresaId) => `/empresas/${empresaId}/aprendiz/remove`,
    GET_APRENDICES: (empresaId) => `/empresas/${empresaId}/aprendices`,
    BULK_CREATE: '/empresas/bulk',
    STATS: '/empresas/stats',
    SEARCH: '/empresas/search',
  },

  // ============ MOMENTOS ============
  MOMENTOS: {
    GET_ALL: '/momentos',
    GET_BY_ID: (id) => `/momentos/${id}`,
    CREATE: '/momentos',
    UPDATE: (id) => `/momentos/${id}`,
    DELETE: (id) => `/momentos/${id}`,
    GET_BY_APRENDIZ: (aprendizId) => `/momentos/aprendiz/${aprendizId}`,
    GET_BY_FICHA: (fichaId) => `/momentos/ficha/${fichaId}`,
    GET_BY_TIPO: (tipo) => `/momentos/tipo/${tipo}`,
    BULK_CREATE: '/momentos/bulk',
    STATS: '/momentos/stats',
  },

  // ============ CERTIFICADOS ============
  CERTIFICADOS: {
    GET_ALL: '/certificados',
    GET_BY_ID: (id) => `/certificados/${id}`,
    CREATE: '/certificados',
    UPDATE: (id) => `/certificados/${id}`,
    DELETE: (id) => `/certificados/${id}`,
    GET_BY_APRENDIZ: (aprendizId) => `/certificados/aprendiz/${aprendizId}`,
    GET_BY_FICHA: (fichaId) => `/certificados/ficha/${fichaId}`,
    GENERATE: '/certificados/generate',
    GENERATE_MASIVO: '/certificados/generate/masivo',
    BULK_CREATE: '/certificados/bulk',
    STATS: '/certificados/stats',
  },

  // ============ CHARLAS ============
  CHARLAS: {
    GET_ALL: '/charlas',
    GET_BY_ID: (id) => `/charlas/${id}`,
    CREATE: '/charlas',
    UPDATE: (id) => `/charlas/${id}`,
    DELETE: (id) => `/charlas/${id}`,
    GET_BY_INSTRUCTOR: (instructorId) => `/charlas/instructor/${instructorId}`,
    GET_BY_FICHA: (fichaId) => `/charlas/ficha/${fichaId}`,
    GET_BY_FECHA: (fecha) => `/charlas/fecha/${fecha}`,
    GET_PROGRAMADAS: '/charlas/programadas',
    REGISTRAR_ASISTENCIA: (charlaId) => `/charlas/${charlaId}/asistencia`,
    GET_ASISTENTES: (charlaId) => `/charlas/${charlaId}/asistentes`,
    STATS: '/charlas/stats',
  },

  // ============ REPORTES ============
  REPORTES: {
    GET_BITACORAS: '/reportes/bitacoras',
    GET_BITACORAS_FICHA: (fichaId) => `/reportes/bitacoras/ficha/${fichaId}`,
    GET_BITACORAS_APRENDIZ: (aprendizId) => `/reportes/bitacoras/aprendiz/${aprendizId}`,
    GET_ASISTENCIA: '/reportes/asistencia',
    GET_ASISTENCIA_FICHA: (fichaId) => `/reportes/asistencia/ficha/${fichaId}`,
    GET_SEGUIMIENTO: '/reportes/seguimiento',
    GET_SEGUIMIENTO_APRENDIZ: (aprendizId) => `/reportes/seguimiento/aprendiz/${aprendizId}`,
    GET_GLOBALES: '/reportes/globales',
    GET_DASHBOARD: '/reportes/dashboard',
    EXPORT_PDF: (tipo) => `/reportes/export/pdf/${tipo}`,
    EXPORT_EXCEL: (tipo) => `/reportes/export/excel/${tipo}`,
  },

  // ============ UPLOAD ============
  UPLOAD: {
    USERS: '/upload/users',
    FICHAS: '/upload/fichas',
    EMPRESAS: '/upload/empresas',
    BITACORAS: '/upload/bitacoras',
    CERTIFICADOS: '/upload/certificados',
    TEMPLATE: (type) => `/upload/template/${type}`,
    STATUS: (uploadId) => `/upload/status/${uploadId}`,
    CANCEL: (uploadId) => `/upload/cancel/${uploadId}`,
    HISTORY: '/upload/history',
  },
};