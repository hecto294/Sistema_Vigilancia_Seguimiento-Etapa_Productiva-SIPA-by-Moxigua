// src/modules/shared/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, ROLES_ROUTES } from '../context/AuthContext';

const PrivateRoute = ({ children, rolesPermitidos = null }) => {
  const { isAuthenticated, user, loading } = useAuth();

  // Mientras carga la sesión desde localStorage, no redirigir
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '16px',
        color: '#666',
      }}>
        Cargando...
      </div>
    );
  }

  // Sin sesión → al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Con sesión pero sin permiso de rol → a su home
  if (rolesPermitidos && !rolesPermitidos.includes(user.rol_id)) {
    return <Navigate to={ROLES_ROUTES[user.rol_id] || '/login'} replace />;
  }

  return children;
};

export default PrivateRoute;