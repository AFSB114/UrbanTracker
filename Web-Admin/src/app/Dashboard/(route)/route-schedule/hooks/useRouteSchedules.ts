import { useState, useEffect, useMemo } from 'react';
import { RouteScheduleResponse } from '../types/routeScheduleTypes';
import { RouteResponse } from '../../routes/types/routeTypes';
import { useRoutesContext } from '../../routes/context/RouteContext';
import { routeScheduleService } from '../services/routeScheduleService';

export interface RouteWithSchedules {
  route: RouteResponse;
  schedules: RouteScheduleResponse[];
}

export interface UseRouteSchedulesReturn {
  routeSchedules: RouteScheduleResponse[];
  routesWithSchedules: RouteWithSchedules[];
  filteredRoutesWithSchedules: RouteWithSchedules[];
  paginatedRoutesWithSchedules: RouteWithSchedules[];
  searchTerm: string;
  dayFilter: string;
  routeFilter: string;
  statusFilter: string;
  statistics: RouteScheduleStatistics;
  pagination: PaginationData;
  loading: boolean;
  error: string | null;
  setSearchTerm: (term: string) => void;
  setDayFilter: (filter: string) => void;
  setRouteFilter: (filter: string) => void;
  setStatusFilter: (filter: string) => void;
  setPage: (page: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;
  fetchRouteSchedules: () => Promise<void>;
}

export interface RouteScheduleStatistics {
  totalSchedules: number;
  activeSchedules: number;
  inactiveSchedules: number;
  schedulesByDay: Record<string, number>;
}

export interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  startIndex: number;
  endIndex: number;
}

export const useRouteSchedules = (): UseRouteSchedulesReturn => {
  const { routes } = useRoutesContext();
  const [routeSchedules, setRouteSchedules] = useState<RouteScheduleResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [dayFilter, setDayFilter] = useState('all');
  const [routeFilter, setRouteFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const fetchRouteSchedules = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await routeScheduleService.getAllRouteSchedules();
      // Normalize dayOfWeek to uppercase
      const normalizedData = data.map(schedule => ({
        ...schedule,
        dayOfWeek: schedule.dayOfWeek.toUpperCase()
      }));
      setRouteSchedules(normalizedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching route schedules');
    } finally {
      setLoading(false);
    }
  };

  // Group schedules by route
  const routesWithSchedules = useMemo(() => {
    const grouped = routeSchedules.reduce((acc, schedule) => {
      const routeId = schedule.routeId;
      if (!acc[routeId]) {
        const route = routes.find(r => r.id === routeId);
        if (route) {
          acc[routeId] = {
            route,
            schedules: []
          };
        }
      }
      if (acc[routeId]) {
        acc[routeId].schedules.push(schedule);
      }
      return acc;
    }, {} as Record<number, RouteWithSchedules>);

    return Object.values(grouped);
  }, [routeSchedules, routes]);

  // Filtered routes with schedules
  const filteredRoutesWithSchedules = useMemo(() => {
    return routesWithSchedules.filter(routeWithSchedules => {
      const { route, schedules } = routeWithSchedules;

      // Filter by route name/number
      const matchesRouteSearch = !searchTerm ||
        route.numberRoute.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (route.description && route.description.toLowerCase().includes(searchTerm.toLowerCase()));

      // Filter by route selection
      const matchesRouteFilter = routeFilter === 'all' || route.id!.toString() === routeFilter;

      // Filter by day - if a route has at least one schedule matching the day filter
      const matchesDay = dayFilter === 'all' ||
        schedules.some(schedule => schedule.dayOfWeek === dayFilter);

      // Filter by status - if a route has at least one schedule matching the status filter
      const matchesStatus = statusFilter === 'all' ||
        schedules.some(schedule =>
          (statusFilter === 'active' && schedule.active) ||
          (statusFilter === 'inactive' && !schedule.active)
        );

      return matchesRouteSearch && matchesRouteFilter && matchesDay && matchesStatus;
    });
  }, [routesWithSchedules, searchTerm, dayFilter, routeFilter, statusFilter]);

  // Statistics
  const statistics: RouteScheduleStatistics = useMemo(() => {
    const totalSchedules = routeSchedules.length;
    const activeSchedules = routeSchedules.filter(s => s.active).length;
    const inactiveSchedules = totalSchedules - activeSchedules;

    const schedulesByDay = routeSchedules.reduce((acc, schedule) => {
      acc[schedule.dayOfWeek] = (acc[schedule.dayOfWeek] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalSchedules,
      activeSchedules,
      inactiveSchedules,
      schedulesByDay,
    };
  }, [routeSchedules]);

  // Pagination
  const pagination: PaginationData = useMemo(() => {
    const totalItems = filteredRoutesWithSchedules.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    return {
      currentPage,
      totalPages,
      totalItems,
      itemsPerPage,
      startIndex,
      endIndex,
    };
  }, [filteredRoutesWithSchedules.length, currentPage, itemsPerPage]);

  const paginatedRoutesWithSchedules = useMemo(() => {
    const { startIndex, endIndex } = pagination;
    return filteredRoutesWithSchedules.slice(startIndex, endIndex);
  }, [filteredRoutesWithSchedules, pagination]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, dayFilter, routeFilter, statusFilter]);

  useEffect(() => {
    fetchRouteSchedules();
  }, []);

  return {
    routeSchedules,
    routesWithSchedules,
    filteredRoutesWithSchedules,
    paginatedRoutesWithSchedules,
    searchTerm,
    dayFilter,
    routeFilter,
    statusFilter,
    statistics,
    pagination,
    loading,
    error,
    setSearchTerm,
    setDayFilter,
    setRouteFilter,
    setStatusFilter,
    setPage: setCurrentPage,
    setItemsPerPage,
    fetchRouteSchedules,
  };
};