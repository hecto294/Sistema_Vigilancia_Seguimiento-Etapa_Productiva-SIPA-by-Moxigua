// src/providers/AuthProvider.jsx
import React, { createContext, useState, useEffect } from 'react';
import { authService } from '@/core/services/authService';

export const AuthContext = createContext();

export const ROLES_ROUTES = {
  1: '/admin',
  2: '/coordinador',
  3: '/instructor',
  4: '/aprendiz',
  5: '/apoyo',
  6: '/apoyo',
};

export const ROLES_NAMES = {
  1: 'Administrador',
  2: 'Coordinador',
  3: 'Instructor',
  4: 'Aprendiz',
  5: 'Apoyo Administrativo',
  6: 'Consulta',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      if (token && storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error('Error init auth:', e);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const response = await authService.login(email, password);
    console.log('🔍 [AuthProvider] response:', response);

    const rawUser = response?.user || response?.data?.user || response;
    console.log('🔍 [AuthProvider] rawUser:', rawUser);

    if (!rawUser || !rawUser.id) {
      console.error('❌ No hay id en user:', response);
      throw new Error('Respuesta inválida del servidor');
    }

    const userData = {
      id: rawUser.id,
      nombre: rawUser.nombre || '',
      apellido: rawUser.apellido || '',
      email: rawUser.email || email,
      rol_id: Number(rawUser.rol_id),
      rol_nombre: rawUser.rol_nombre || ROLES_NAMES[rawUser.rol_id] || 'Usuario',
      tipo_documento: rawUser.tipo_documento,
      documento_identidad: rawUser.documento_identidad,
      telefono: rawUser.telefono,
      avatar_url: rawUser.avatar_url,
      is_active: rawUser.is_active,
    };

    console.log('✅ [AuthProvider] userData final:', userData);

    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return userData;
  };

  const register = async (userData) => {
    return await authService.register(userData);
  };

  const logout = async () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    role: user?.rol_id || null,
    getRutaInicial: () => (user ? ROLES_ROUTES[user.rol_id] : '/login'),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
