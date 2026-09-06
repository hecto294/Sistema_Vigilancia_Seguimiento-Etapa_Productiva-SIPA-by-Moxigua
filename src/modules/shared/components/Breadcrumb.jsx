// src/components/Breadcrumb.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumb.css';

const Breadcrumb = () => {
  const location = useLocation();
  const path = location.pathname;

  // ✅ DETECTAR EL ROL DESDE LA URL
  const getRole = () => {
    if (path.includes('/coordinador')) return 'coordinador';
    if (path.includes('/instructor')) return 'instructor';
    if (path.includes('/admin')) return 'admin';
    if (path.includes('/aprendiz')) return 'aprendiz';
    return 'coordinador';
  };

  const role = getRole();

  // ✅ RUTA DE INICIO → DASHBOARD DEL ROL
  const getHomePath = () => {
    switch(role) {
      case 'coordinador': return '/coordinador';
      case 'instructor': return '/instructor';
      case 'admin': return '/admin';
      case 'aprendiz': return '/aprendiz';
      default: return '/coordinador';
    }
  };

  const homePath = getHomePath();

  // ✅ OBTENER EL NOMBRE DE LA PÁGINA ACTUAL
  const getPageName = () => {
    // --- COORDINADOR ---
    if (role === 'coordinador') {
      // Dashboard
      if (path === '/coordinador' || path === '/coordinador/') {
        return 'Dashboard';
      }
      // Parametrización
      if (path.includes('/parametrizacion')) {
        return 'Parametrización';
      }
      // Centro de Fichas
      if (path.includes('/fichas') && !path.includes('/ficha-completa')) {
        return 'Centro de Fichas';
      }
      // Detalle Ficha
      if (path.includes('/ficha-completa/')) {
        return 'Detalle Ficha';
      }
      // Certificados
      if (path.includes('/certificados')) {
        return 'Certificados';
      }
      // Reportes
      if (path.includes('/reportes') && !path.includes('/reporte-bitacoras')) {
        return 'Reportes Globales';
      }
      // Reporte Ficha Detalle
      if (path.includes('/reportes/ficha/')) {
        return 'Detalle Reporte';
      }
      // Bitácoras
      if (path.includes('/reporte-bitacoras') && !path.includes('/ficha/') && !path.includes('/aprendiz/')) {
        return 'Reporte de Bitácoras';
      }
      // Bitácoras por Ficha
      if (path.includes('/reporte-bitacoras/ficha/')) {
        return 'Bitácoras por Ficha';
      }
      // Bitácoras por Aprendiz
      if (path.includes('/reporte-bitacoras/aprendiz/')) {
        return 'Bitácoras del Aprendiz';
      }
      // Empresas
      if (path.includes('/empresas')) {
        return 'Empresas Globales';
      }
      // Aprendices Globales
      if (path.includes('/aprendices') && !path.includes('/aprendices/')) {
        return 'Aprendices Globales';
      }
      // Detalle Aprendiz
      if (path.includes('/aprendices/')) {
        return 'Detalle Aprendiz';
      }
      // Instructores
      if (path.includes('/instructores') && !path.includes('/instructores/')) {
        return 'Instructores Globales';
      }
      // Asignar Fichas a Instructor
      if (path.includes('/instructores/') && path.includes('/asignar')) {
        return 'Asignar Fichas';
      }
      // ✅ Subir Alternativa - NOMBRE COMPLETO
      if (path.includes('/subir-alternativa') && !path.includes('/subir-alternativa/')) {
        return 'Subir Alternativa de Etapa Productiva';
      }
      if (path.includes('/subir-alternativa/')) {
        return 'Subir Alternativa de Etapa Productiva';
      }
      // Momentos
      if (path.includes('/momentos')) {
        return 'Seguimiento por Momentos';
      }
      // Mi Perfil
      if (path.includes('/mi-perfil')) {
        return 'Mi Perfil';
      }
    }

    // --- INSTRUCTOR ---
    if (role === 'instructor') {
      if (path === '/instructor' || path === '/instructor/') return 'Dashboard';
      if (path.includes('/fichas') && !path.includes('/ficha/')) return 'Mis Fichas';
      if (path.includes('/ficha/')) return 'Detalle Ficha';
      if (path.includes('/empresas')) return 'Empresas';
      if (path.includes('/charlas-programadas')) return 'Charlas Programadas';
      if (path.includes('/historial-charlas')) return 'Historial de Charlas';
      if (path.includes('/charla/')) return 'Editar Charla';
      if (path.includes('/seleccion-alternativa')) return 'Alternativa etapa productiva';
      if (path.includes('/momentos')) return 'Seguimiento por Momentos';
      if (path.includes('/bitacora')) return 'Bitácora';
      if (path.includes('/certificaciones')) return 'Certificaciones';
      if (path.includes('/mi-perfil')) return 'Mi Perfil';
    }

    // --- ADMIN ---
    if (role === 'admin') {
      if (path === '/admin' || path === '/admin/') return 'Dashboard Admin';
      if (path.includes('/usuarios')) return 'Gestión de Usuarios';
      if (path.includes('/fichas')) return 'Gestión de Fichas';
      if (path.includes('/reportes')) return 'Reportes Globales';
      if (path.includes('/mi-perfil')) return 'Mi Perfil';
    }

    // --- APRENDIZ ---
    if (role === 'aprendiz') {
      if (path === '/aprendiz' || path === '/aprendiz/') return 'Mi Proceso';
      if (path.includes('/mis-momentos')) return 'Mis Momentos';
      if (path.includes('/mis-bitacoras')) return 'Mis Bitácoras';
      if (path.includes('/mis-certificados')) return 'Mis Certificados';
      if (path.includes('/novedades')) return 'Novedades';
      if (path.includes('/mi-perfil')) return 'Mi Perfil';
    }

    // Fallback
    const segments = path.split('/').filter(p => p);
    const lastSegment = segments.length > 1 ? segments[segments.length - 1] : segments[0];
    if (lastSegment && !lastSegment.includes('-')) {
      return lastSegment.replace(/-/g, ' ').replace(/_/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    return 'Página';
  };

  const pageName = getPageName();
  const isHome = path === homePath || path === `${homePath}/`;

  // ✅ Si estamos en el Dashboard, solo mostrar "Inicio" en VERDE
  if (isHome) {
    return (
      <nav className="breadcrumb">
        <span className="breadcrumb-active" style={{ color: '#3ca203' }}>Inicio</span>
      </nav>
    );
  }

  // ✅ CONSTRUIR MIGAS DE PAN
  const getBreadcrumbs = () => {
    const crumbs = [];
    
    // Siempre mostrar Inicio
    crumbs.push({
      label: 'Inicio',
      path: homePath,
      isActive: false
    });

    // Para rutas con 3 niveles (ej: /coordinador/aprendices/AP-001)
    const segments = path.split('/').filter(p => p);
    if (segments.length >= 3) {
      // Obtener la ruta padre
      const parentPath = '/' + segments.slice(0, 2).join('/');
      const parentName = getParentPageName(parentPath);
      if (parentName && parentName !== pageName) {
        crumbs.push({
          label: parentName,
          path: parentPath,
          isActive: false
        });
      }
    }

    // Página actual
    crumbs.push({
      label: pageName,
      path: path,
      isActive: true
    });

    return crumbs;
  };

  // ✅ OBTENER NOMBRE DE LA PÁGINA PADRE
  const getParentPageName = (parentPath) => {
    const parents = {
      '/coordinador/aprendices': 'Aprendices Globales',
      '/coordinador/fichas': 'Centro de Fichas',
      // ✅ Subir Alternativa - NOMBRE COMPLETO
      '/coordinador/subir-alternativa': 'Subir Alternativa de Etapa Productiva',
      '/coordinador/reporte-bitacoras': 'Reporte de Bitácoras',
      '/coordinador/reportes': 'Reportes Globales',
      '/coordinador/empresas': 'Empresas Globales',
      '/coordinador/instructores': 'Instructores Globales',
      '/coordinador/momentos': 'Seguimiento por Momentos',
      '/coordinador/parametrizacion': 'Parametrización',
      '/coordinador/certificados': 'Certificados',
      '/instructor/fichas': 'Mis Fichas',
      '/instructor/charlas-programadas': 'Charlas Programadas',
      '/instructor/seleccion-alternativa': 'Alternativa etapa productiva',
      '/instructor/momentos': 'Seguimiento por Momentos',
      '/instructor/bitacora': 'Bitácora',
      '/instructor/certificaciones': 'Certificaciones',
      '/admin/usuarios': 'Gestión de Usuarios',
      '/admin/fichas': 'Gestión de Fichas',
      '/admin/reportes': 'Reportes Globales',
      '/aprendiz/mis-momentos': 'Mis Momentos',
      '/aprendiz/mis-bitacoras': 'Mis Bitácoras',
      '/aprendiz/mis-certificados': 'Mis Certificados',
      '/aprendiz/novedades': 'Novedades',
    };
    return parents[parentPath] || null;
  };

  const breadcrumbs = getBreadcrumbs();

  // ✅ RENDER con "Inicio" en VERDE
  return (
    <nav className="breadcrumb" aria-label="Migas de pan">
      <ol className="breadcrumb-list">
        {breadcrumbs.map((item, index) => (
          <li key={index} className="breadcrumb-item">
            {item.isActive ? (
              <span className="breadcrumb-active">{item.label}</span>
            ) : (
              // ✅ "Inicio" en VERDE con estilo en línea (SOLO ESTO SE AGREGÓ)
              <Link to={item.path} style={{ color: '#3ca203' }}>
                {item.label}
              </Link>
            )}
            {index < breadcrumbs.length - 1 && (
              <span className="breadcrumb-separator"> &gt; </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
