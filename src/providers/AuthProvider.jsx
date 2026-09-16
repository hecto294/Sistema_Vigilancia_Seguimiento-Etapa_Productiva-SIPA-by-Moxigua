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
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (token && storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (e) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        }
      } catch (error) {
        console.error('Error en inicialización:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const response = await authService.login(email, password);
    // El authService ya devuelve { ...response, user: { id, nombre, rol_id } }
    const userData = {
      ...response.user,
      rol_nombre: ROLES_NAMES[response.user.rol_id] || 'Usuario',
      email,
    };
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