import { useState, useEffect } from 'react';
import { fetchWaypoints } from '../services/backendService';
import type { ApiResponse, RouteWaypoint } from '../types/types';

interface UseFetchWaypointsReturn {
  data: RouteWaypoint[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useFetchWaypoints = (routeId: number | null): UseFetchWaypointsReturn => {
  const [data, setData] = useState<RouteWaypoint[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!routeId) return;

    setLoading(true);
    setError(null);
    try {
      const response: ApiResponse<RouteWaypoint[]> = await fetchWaypoints(routeId);
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.message || 'Error fetching waypoints');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [routeId]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};
