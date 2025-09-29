import { useState, useMemo, useCallback } from 'react';
import { useRouteService } from '../services/RouteServices';
import { RouteResponse, UseRoutesReturn, PaginationData, PaginationConfig, RouteStatistics } from '../types/routeTypes';

const DEFAULT_ITEMS_PER_PAGE = 5;

export const useRoutes = (): UseRoutesReturn => {
  const { getAllRoutes, loading, error } = useRouteService();
  const [routes, setRoutes] = useState<RouteResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [paginationConfig, setPaginationConfig] = useState<PaginationConfig>({
    page: 1,
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  });

  const fetchRoutes = useCallback(async () => {
    try {
      const response = await getAllRoutes();
      if (response.success && response.data) {
        setRoutes(response.data);
      }
    } catch (err) {
      console.error('Error fetching routes:', err);
    }
  }, [getAllRoutes]);

  // Filter routes based on search term and status
  const filteredRoutes = useMemo(() => {
    const safeRoutes = Array.isArray(routes) ? routes : [];

    let filtered = safeRoutes;

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(route =>
        route.numberRoute.toLowerCase().includes(searchLower) ||
        (route.description && route.description.toLowerCase().includes(searchLower))
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      const isActive = statusFilter === "active";
      filtered = filtered.filter(route => route.active === isActive);
    }

    return filtered;
  }, [routes, searchTerm, statusFilter]);

  // Calculate pagination data
  const pagination = useMemo((): PaginationData => {
    const totalItems = filteredRoutes.length;
    const totalPages = Math.ceil(totalItems / paginationConfig.itemsPerPage);
    const currentPage = Math.min(paginationConfig.page, Math.max(1, totalPages));
    const startIndex = (currentPage - 1) * paginationConfig.itemsPerPage;
    const endIndex = startIndex + paginationConfig.itemsPerPage;

    return {
      currentPage,
      totalPages,
      totalItems,
      itemsPerPage: paginationConfig.itemsPerPage,
      startIndex,
      endIndex,
    };
  }, [filteredRoutes.length, paginationConfig]);

  const paginatedRoutes = useMemo(() => {
    const { startIndex, endIndex } = pagination;
    return filteredRoutes.slice(startIndex, endIndex);
  }, [filteredRoutes, pagination]);

  // Calculate statistics
  const statistics = useMemo((): RouteStatistics => {
    const totalRoutes = routes.length;
    const activeRoutes = routes.filter(route => route.active).length;
    const inactiveRoutes = totalRoutes - activeRoutes;
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const newThisMonth = routes.filter(route => {
      const routeDate = new Date(route.createdAt);
      return routeDate.getFullYear() === currentYear && routeDate.getMonth() === currentMonth;
    }).length;

    return {
      totalRoutes,
      activeRoutes,
      inactiveRoutes,
      newThisMonth,
    };
  }, [routes]);

  const setPage = useCallback((page: number) => {
    setPaginationConfig((prev) => ({ ...prev, page }));
  }, []);

  const setItemsPerPage = useCallback((itemsPerPage: number) => {
    setPaginationConfig((prev) => ({
      ...prev,
      itemsPerPage,
      page: 1,
    }));
  }, []);

  return {
    routes,
    filteredRoutes,
    paginatedRoutes,
    searchTerm,
    statusFilter,
    statistics,
    pagination,
    loading,
    error,
    setSearchTerm,
    setStatusFilter,
    setPage,
    setItemsPerPage,
    fetchRoutes,
  };
};