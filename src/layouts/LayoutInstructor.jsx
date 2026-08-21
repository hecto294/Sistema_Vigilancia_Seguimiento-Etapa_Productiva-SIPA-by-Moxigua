// src/layouts/LayoutInstructor.jsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../App.css';

// Importar todas las páginas del instructor
import Dashboard from '../components/Dashboard';
import Fichas from '../components/Fichas';
import Empresas from '../components/Empresas';
import Aprendices from '../components/Aprendices';
import CharlasProgramadas from '../components/CharlasProgramadas';
import HistorialCharlas from '../components/HistorialCharlas';
import SeleccionAlternativa from '../components/SeleccionAlternativa';
import SeguimientoMomentos from '../components/SeguimientoMomentos';
import Bitacora from '../components/Bitacora';
import Certificaciones from '../components/Certificaciones';
import DetalleFichaInstructor from '../pages/instructor/DetalleFichaInstructor';
import DetalleAprendizBitacoras from '../pages/instructor/DetalleAprendizBitacoras';
import EditarCharla from '../pages/instructor/EditarCharla';
import MiPerfil from '../pages/instructor/MiPerfil'; // <--- NUEVA IMPORTACIÓN

const LayoutInstructor = ({ user }) => {
  const [activePage, setActivePage] = useState('dashboard');

  return (
    <div className="app-layout">
      <Header user={user} />
      <div className="main-body">
        <Sidebar setActivePage={setActivePage} />
        <div className="content-area">
          <Routes>
            {/* Ruta principal del instructor */}
            <Route 
              path="/" 
              element={
                activePage === 'dashboard' ? <Dashboard /> :
                activePage === 'fichas' ? <Fichas /> :
                activePage === 'empresas' ? <Empresas /> :
                activePage === 'aprendices' ? <Aprendices /> :
                activePage === 'charlas-programadas' ? <CharlasProgramadas /> :
                activePage === 'historial-charlas' ? <HistorialCharlas /> :
                activePage === 'seleccion-alternativa' ? <SeleccionAlternativa /> :
                activePage === 'momentos' ? <SeguimientoMomentos /> :
                activePage === 'bitacora' ? <Bitacora /> :
                activePage === 'certificaciones' ? <Certificaciones /> :
                <Dashboard />
              }
            />
            {/* Ruta para ver el detalle de una ficha específica */}
            <Route path="/ficha/:idFicha" element={<DetalleFichaInstructor />} />
            {/* Ruta para editar una charla */}
            <Route path="/charla/:id/editar" element={<EditarCharla />} />
            {/* Ruta para ver las bitácoras de un aprendiz */}
            <Route path="/bitacora/aprendiz/:aprendizId" element={<DetalleAprendizBitacoras />} />
            {/* Ruta para ver el perfil del instructor */}
            <Route path="/mi-perfil" element={<MiPerfil user={user} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default LayoutInstructor;