// src/app/routes/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  // 🔓 DESBLOQUEADO: Si no hay usuario, aún así dejamos pasar (solo para probar)
  if (!isAuthenticated) {
    return children;
  }

  return children;
};

export default ProtectedRoute;
