// src/modules/instructor/pages/DashboardInstructor.jsx
import React from 'react';

// ✅ CORRECTO: Importaciones desde la carpeta de componentes del instructor
import Fichas from '@/modules/instructor/components/Fichas';
import Empresas from '@/modules/instructor/components/Empresas';
import Aprendices from '@/modules/instructor/components/Aprendices';
import CharlasProgramadas from '@/modules/instructor/components/CharlasProgramadas';
import HistorialCharlas from '@/modules/instructor/components/HistorialCharlas';
import SeleccionAlternativa from '@/modules/instructor/components/SeleccionAlternativa';
import SeguimientoMomentos from '@/modules/instructor/components/SeguimientoMomentos';
import Bitacora from '@/modules/instructor/components/Bitacora';
import Certificaciones from '@/modules/instructor/components/Certificaciones';

const DashboardInstructor = ({ activePage }) => {
  const renderContent = () => {
    switch (activePage) {
      case 'fichas': return <Fichas />;
      case 'empresas': return <Empresas />;
      case 'aprendices': return <Aprendices />;
      case 'charlas-programadas': return <CharlasProgramadas />;
      case 'historial-charlas': return <HistorialCharlas />;
      case 'seleccion-alternativa': return <SeleccionAlternativa />;
      case 'momentos': return <SeguimientoMomentos />;
      case 'bitacora': return <Bitacora />;
      case 'certificaciones': return <Certificaciones />;
      default: return <Fichas />; // Si no hay opción activa, muestra Fichas
    }
  };

  return (
    <div className="dashboard-instructor-container">
      {renderContent()}
    </div>
  );
};

export default DashboardInstructor;