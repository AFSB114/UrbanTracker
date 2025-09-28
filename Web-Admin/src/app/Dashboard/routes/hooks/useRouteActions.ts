import { useRouter } from 'next/navigation';
import { RouteResponse } from '../types/routeTypes';

export const useRouteActions = () => {
  const router = useRouter();

  const handleCreateRoute = () => {
    router.push('/Dashboard/routes/new');
  };

  const handleEditRoute = (route: RouteResponse) => {
    router.push(`/Dashboard/routes/edit/${route.id}`);
  };

  const handleDeleteRoute = (routeId: number) => {
    console.log('Eliminar ruta:', routeId);
    // TODO: Implementar lógica para eliminar ruta
  };

  return {
    handleCreateRoute,
    handleEditRoute,
    handleDeleteRoute,
  };
};