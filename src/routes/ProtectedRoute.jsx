// src/routes/ProtectedRoute.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/modules/shared/hooks/useAuth';

const ROLE_ROUTES = {
  1: '/admin',
  2: '/coordinador',
  3: '/instructor',
  4: '/aprendiz',
  5: '/apoyo',
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

      if (allowedRoles.length > 0 && !allowedRoles.includes(user?.rol_id)) {
        const dashboardUrl = ROLE_ROUTES[user?.rol_id] || '/login';
        navigate(dashboardUrl);
        return;
      }
    }
  }, [loading, isAuthenticated, user, navigate, allowedRoles]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div>Cargando...</div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.rol_id)) {
    return null;
  }

  return children;
};

export default ProtectedRoute;