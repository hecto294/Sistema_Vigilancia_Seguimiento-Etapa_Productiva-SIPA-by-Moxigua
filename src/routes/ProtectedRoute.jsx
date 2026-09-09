// src/routes/ProtectedRoute.jsx
'use client';

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
// CORRECCIÓN DE LA RUTA DEL HOOK:
import { useAuth } from '../modules/shared/hooks/useAuth'; 

const ROLE_ROUTES = {
  coordinador: '/dashboard/coordinador',
  administrador: '/dashboard/administrador',
  instructor: '/dashboard/instructor',
  aprendiz: '/dashboard/aprendiz'
};

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        navigate('/login'); 
        return;
      }

      if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
        const dashboardUrl = ROLE_ROUTES[user?.role] || '/login';
        navigate(dashboardUrl); 
        return;
      }
    }
  }, [loading, isAuthenticated, user, navigate, allowedRoles]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return null;
  }

  return children;
};

export default ProtectedRoute;