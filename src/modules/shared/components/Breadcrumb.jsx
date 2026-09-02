// src/components/Breadcrumb.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumb.css';

const Breadcrumb = () => {
  const location = useLocation();
  const path = location.pathname;

  // Si estamos en el dashboard o raíz
  if (path === '/instructor' || path === '/instructor/' || path === '/') {
    return (
      <nav className="breadcrumb">
        <span className="breadcrumb-item active">Inicio</span>
      </nav>
    );
  }

  // Mis Fichas
  if (path.includes('/fichas') && !path.includes('/ficha/')) {
    return (
      <nav className="breadcrumb" aria-label="Migas de pan">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item">
            <Link to="/instructor">Inicio</Link>
          </li>
          <li className="breadcrumb-item">
            <span className="breadcrumb-active">Mis Fichas</span>
          </li>
        </ol>
      </nav>
    );
  }

  // CHARLAS PROGRAMADAS - CON ENLACES FUNCIONALES
  if (path.includes('/charlas-programadas')) {
    return (
      <nav className="breadcrumb" aria-label="Migas de pan">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item">
            <Link to="/instructor">Inicio</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/instructor/charlas-programadas">Charlas</Link>
          </li>
          <li className="breadcrumb-item">
            <span className="breadcrumb-active">Charlas Programadas</span>
          </li>
        </ol>
      </nav>
    );
  }

  // Historial de Charlas
  if (path.includes('/historial-charlas')) {
    return (
      <nav className="breadcrumb" aria-label="Migas de pan">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item">
            <Link to="/instructor">Inicio</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/instructor/charlas-programadas">Charlas</Link>
          </li>
          <li className="breadcrumb-item">
            <span className="breadcrumb-active">Historial de Charlas</span>
          </li>
        </ol>
      </nav>
    );
  }

  // Detalle de Ficha
  if (path.includes('/ficha/')) {
    return (
      <nav className="breadcrumb" aria-label="Migas de pan">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item">
            <Link to="/instructor">Inicio</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/instructor/fichas">Mis Fichas</Link>
          </li>
          <li className="breadcrumb-item">
            <span className="breadcrumb-active">Detalle Ficha</span>
          </li>
        </ol>
      </nav>
    );
  }

  // Editar Charla
  if (path.includes('/charla/') && path.includes('/editar')) {
    return (
      <nav className="breadcrumb" aria-label="Migas de pan">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item">
            <Link to="/instructor">Inicio</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/instructor/charlas-programadas">Charlas</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/instructor/charlas-programadas">Charlas Programadas</Link>
          </li>
          <li className="breadcrumb-item">
            <span className="breadcrumb-active">Editar Charla</span>
          </li>
        </ol>
      </nav>
    );
  }

  // Selección de Alternativa
  if (path.includes('/seleccion-alternativa')) {
    return (
      <nav className="breadcrumb" aria-label="Migas de pan">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item">
            <Link to="/instructor">Inicio</Link>
          </li>
          <li className="breadcrumb-item">
            <span className="breadcrumb-active">Selección de Alternativa</span>
          </li>
        </ol>
      </nav>
    );
  }

  // Seguimiento por Momentos
  if (path.includes('/momentos')) {
    return (
      <nav className="breadcrumb" aria-label="Migas de pan">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item">
            <Link to="/instructor">Inicio</Link>
          </li>
          <li className="breadcrumb-item">
            <span className="breadcrumb-active">Seguimiento por Momentos</span>
          </li>
        </ol>
      </nav>
    );
  }

  // Bitácora
  if (path.includes('/bitacora')) {
    return (
      <nav className="breadcrumb" aria-label="Migas de pan">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item">
            <Link to="/instructor">Inicio</Link>
          </li>
          <li className="breadcrumb-item">
            <span className="breadcrumb-active">Bitácora</span>
          </li>
        </ol>
      </nav>
    );
  }

  // Certificaciones
  if (path.includes('/certificaciones')) {
    return (
      <nav className="breadcrumb" aria-label="Migas de pan">
        <ol className="breadcrumb-list">
          <li className="breadcrumb-item">
            <Link to="/instructor">Inicio</Link>
          </li>
          <li className="breadcrumb-item">
            <span className="breadcrumb-active">Certificaciones</span>
          </li>
        </ol>
      </nav>
    );
  }

  // Fallback
  return (
    <nav className="breadcrumb" aria-label="Migas de pan">
      <ol className="breadcrumb-list">
        <li className="breadcrumb-item">
          <Link to="/instructor">Inicio</Link>
        </li>
        <li className="breadcrumb-item">
          <span className="breadcrumb-active">Página</span>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;