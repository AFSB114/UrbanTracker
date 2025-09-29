import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RouteScheduleResponse, RouteScheduleRequest } from '../types/routeScheduleTypes';
import { RouteWithSchedules } from './useRouteSchedules';
import { routeScheduleService } from '../services/routeScheduleService';

export const useRouteScheduleActions = (onRefreshSchedules?: () => Promise<void>) => {
  const router = useRouter();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [routeToDelete, setRouteToDelete] = useState<RouteWithSchedules | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCreateSchedule = () => {
    router.push('/Dashboard/route-schedule/new');
  };

  const handleEditSchedule = (routeWithSchedules: RouteWithSchedules) => {
    router.push(`/Dashboard/route-schedule/edit/${routeWithSchedules.route.id}`);
  };

  const openDeleteModal = (routeWithSchedules: RouteWithSchedules) => {
    setRouteToDelete(routeWithSchedules);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setRouteToDelete(null);
  };

  const confirmDeleteSchedule = async () => {
    if (!routeToDelete) return;

    setIsDeleting(true);
    try {
      // Delete all schedules for this route
      await Promise.all(
        routeToDelete.schedules.map(schedule =>
          routeScheduleService.deleteRouteSchedule(schedule.id)
        )
      );
      closeDeleteModal();
      if (onRefreshSchedules) {
        await onRefreshSchedules();
      }
    } catch (error) {
      console.error('Error deleting route schedules:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    handleCreateSchedule,
    handleEditSchedule,
    openDeleteModal,
    closeDeleteModal,
    confirmDeleteSchedule,
    isDeleteModalOpen,
    routeToDelete,
    isDeleting,
  };
};