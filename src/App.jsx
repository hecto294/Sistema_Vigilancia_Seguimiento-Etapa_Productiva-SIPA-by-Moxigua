// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

// Importar páginas públicas
import Landing from './pages/public/Landing';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import RecuperarContrasena from './pages/public/RecuperarContrasena';
import VerificacionCodigo from './pages/public/VerificacionCodigo';
import CambiarContrasena from './pages/public/CambiarContrasena';

// Importar Layouts de los roles
import LayoutInstructor from './layouts/LayoutInstructor';
import LayoutCoordinador from './layouts/LayoutCoordinador';
import LayoutAprendiz from './layouts/LayoutAprendiz';
import LayoutAdmin from './layouts/LayoutAdmin';
import LayoutApoyo from './layouts/LayoutApoyo'; // <--- NUEVO

// Datos de los 5 usuarios
const USERS = {
  instructor: {
    nombre: 'Carlos Andrés López',
    cargo: 'Instructor SENA',
    role: 'instructor',
    avatar: 'https://i.pravatar.cc/150?img=11'
  },
  coordinador: {
    nombre: 'María Fernanda Ruiz',
    cargo: 'Coordinador de Etapa Productiva',
    role: 'coordinador',
    avatar: 'https://i.pravatar.cc/150?img=5'
  },
  aprendiz: {
    nombre: 'Andrés Felipe Castro',
    cargo: 'Aprendiz',
    role: 'aprendiz',
    avatar: 'https://i.pravatar.cc/150?img=12'
  },
  admin: {
    nombre: 'Administrador General',
    cargo: 'Administrador del Sistema',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=99'
  },
  apoyo: { // <--- NUEVO USUARIO APOYO ADMINISTRATIVO
    nombre: 'Asistente Administrativo',
    cargo: 'Apoyo Administrativo (Solo Lectura)',
    role: 'apoyo',
    avatar: 'https://i.pravatar.cc/150?img=9'
  }
};

// Componente que elige el usuario según la URL
function AppContent() {
  const location = useLocation();

  let rol = 'instructor';
  if (location.pathname.startsWith('/coordinador')) rol = 'coordinador';
  else if (location.pathname.startsWith('/aprendiz')) rol = 'aprendiz';
  else if (location.pathname.startsWith('/admin')) rol = 'admin';
  else if (location.pathname.startsWith('/apoyo')) rol = 'apoyo'; // <--- NUEVO

  const user = USERS[rol];

  return (
    <Routes>
      {/* --- Rutas Públicas --- */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/recuperar-contrasena" element={<RecuperarContrasena />} />
      <Route path="/verificacion-codigo" element={<VerificacionCodigo />} />
      <Route path="/cambiar-contrasena" element={<CambiarContrasena />} />

      {/* --- Rutas de los Roles --- */}
      <Route path="/instructor/*" element={<LayoutInstructor user={user} />} />
      <Route path="/coordinador/*" element={<LayoutCoordinador user={user} />} />
      <Route path="/aprendiz/*" element={<LayoutAprendiz user={user} />} />
      <Route path="/admin/*" element={<LayoutAdmin user={user} />} />
      <Route path="/apoyo/*" element={<LayoutApoyo user={user} />} /> {/* <--- NUEVO */}
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;