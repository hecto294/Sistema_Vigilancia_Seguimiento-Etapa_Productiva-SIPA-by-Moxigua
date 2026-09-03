// src/app/routes/roleRoutes.jsx
import LayoutInstructor from '@/modules/shared/layouts/LayoutInstructor';
import LayoutCoordinador from '@/modules/shared/layouts/LayoutCoordinador';
import LayoutAprendiz from '@/modules/shared/layouts/LayoutAprendiz';
import LayoutAdmin from '@/modules/shared/layouts/LayoutAdmin';
import LayoutApoyo from '@/modules/shared/layouts/LayoutApoyo';

export const roleRoutes = [
  {
    path: '/instructor/*',
    roles: ['instructor'],
    element: <LayoutInstructor />
  },
  {
    path: '/coordinador/*',
    roles: ['coordinador'],
    element: <LayoutCoordinador />
  },
  {
    path: '/aprendiz/*',
    roles: ['aprendiz'],
    element: <LayoutAprendiz />
  },
  {
    path: '/admin/*',
    roles: ['admin'],
    element: <LayoutAdmin />
  },
  {
    path: '/apoyo/*',
    roles: ['apoyo'],
    element: <LayoutApoyo />
  }
];