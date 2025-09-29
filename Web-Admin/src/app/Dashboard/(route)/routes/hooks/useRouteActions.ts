import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RouteResponse } from '../types/routeTypes';
import { useRouteService } from '../services/RouteServices';

export const useRouteActions = (onRefreshRoutes?: () => Promise<void>) => {
  const router = useRouter();
  const { deleteRoute } = useRouteService();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [routeToDelete, setRouteToDelete] = useState<RouteResponse | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCreateRoute = () => {
    router.push('/Dashboard/routes/new');
  };

  const handleEditRoute = (route: RouteResponse) => {
    router.push(`/Dashboard/routes/edit/${route.id}`);
  };

  const openDeleteModal = (route: RouteResponse) => {
    setRouteToDelete(route);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setRouteToDelete(null);
  };

  const confirmDeleteRoute = async () => {
    if (!routeToDelete) return;

    setIsDeleting(true);
    try {
      await deleteRoute(routeToDelete.id!);
      closeDeleteModal();
      if (onRefreshRoutes) {
        await onRefreshRoutes();
      }
    } catch (error) {
      console.error('Error deleting route:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    handleCreateRoute,
    handleEditRoute,
    openDeleteModal,
    closeDeleteModal,
    confirmDeleteRoute,
    isDeleteModalOpen,
    routeToDelete,
    isDeleting,
  };
};