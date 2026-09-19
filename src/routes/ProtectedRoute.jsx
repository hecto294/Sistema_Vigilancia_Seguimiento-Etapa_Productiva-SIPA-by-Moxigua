// src/routes/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/providers/useAuth';

const ROLE_ROUTES = {
  1: '/admin',
  2: '/coordinador',
  3: '/instructor',
  4: '/aprendiz',
  5: '/apoyo',
  6: '/apoyo',
};

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading, isAuthenticated } = useAuth();

  console.log('🛡️ [ProtectedRoute] user:', user);
  console.log('🛡️ [ProtectedRoute] isAuthenticated:', isAuthenticated);
  console.log('🛡️ [ProtectedRoute] loading:', loading);
  console.log('🛡️ [ProtectedRoute] allowedRoles:', allowedRoles);

  // 1. Mientras carga → mostrar "Cargando..."
  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Cargando...</div>;
  }

  // 2. Si NO está autenticado → login
  if (!isAuthenticated || !user) {
    console.log('❌ [ProtectedRoute] No auth → /login');
    return <Navigate to="/login" replace />;
  }

  // 3. Convertir SIEMPRE el rol a número
  const rolId = Number(user.rol_id);
  console.log('🛡️ [ProtectedRoute] rolId convertido:', rolId);

  // 4. Si el rol no está permitido → redirigir a SU dashboard
  if (allowedRoles.length > 0 && !allowedRoles.includes(rolId)) {
    const destino = ROLE_ROUTES[rolId] || '/login';
    console.log('❌ [ProtectedRoute] Rol no permitido →', destino);
    return <Navigate to={destino} replace />;
  }

  // 5. ✅ Todo OK → mostrar children
  console.log('✅ [ProtectedRoute] Acceso OK');
  return children;
};

export default ProtectedRoute;
