// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// ============================================================
// AUTH: Provider y proteccion de rutas
// ============================================================
import { AuthProvider } from './modules/shared/context/AuthContext';
import PrivateRoute from './modules/shared/components/PrivateRoute';

// ============================================================
// Rutas publicas
// ============================================================
import Landing from './modules/auth/pages/Landing';
import Login from './modules/auth/pages/Login';
import Register from './modules/auth/pages/Register';
import RecuperarContrasena from './modules/auth/pages/RecuperarContrasena';
import VerificacionCodigo from './modules/auth/pages/VerificacionCodigo';
import CambiarContrasena from './modules/auth/pages/CambiarContrasena';

// ============================================================
// Layouts por rol
// ============================================================
import LayoutInstructor from './modules/shared/layouts/LayoutInstructor';
import LayoutCoordinador from './modules/shared/layouts/LayoutCoordinador';
import LayoutAprendiz from './modules/shared/layouts/LayoutAprendiz';
import LayoutAdmin from './modules/shared/layouts/LayoutAdmin';
import LayoutApoyo from './modules/shared/layouts/LayoutApoyo';

// ============================================================
// Componente de rutas
// ============================================================
function AppContent() {
  return (
    <Routes>
      {/* ---------- Rutas publicas ---------- */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/recuperar-contrasena" element={<RecuperarContrasena />} />
      <Route path="/verificacion-codigo" element={<VerificacionCodigo />} />
      <Route path="/cambiar-contrasena" element={<CambiarContrasena />} />

      {/* ---------- Rutas protegidas por rol ---------- */}
      <Route
        path="/admin/*"
        element={
          <PrivateRoute rolesPermitidos={[1]}>
            <LayoutAdmin />
          </PrivateRoute>
        }
      />
      <Route
        path="/coordinador/*"
        element={
          <PrivateRoute rolesPermitidos={[2]}>
            <LayoutCoordinador />
          </PrivateRoute>
        }
      />
      <Route
        path="/instructor/*"
        element={
          <PrivateRoute rolesPermitidos={[3]}>
            <LayoutInstructor />
          </PrivateRoute>
        }
      />
      <Route
        path="/aprendiz/*"
        element={
          <PrivateRoute rolesPermitidos={[4]}>
            <LayoutAprendiz />
          </PrivateRoute>
        }
      />
      <Route
        path="/apoyo/*"
        element={
          <PrivateRoute rolesPermitidos={[5, 6]}>
            <LayoutApoyo />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

// ============================================================
// App raiz
// ============================================================
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;