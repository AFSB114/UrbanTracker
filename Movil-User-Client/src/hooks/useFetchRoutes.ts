import { useState, useEffect } from 'react';
import { fetchRoutes } from '../services/backendService';
import type { ApiResponse, Route } from '../types/types';

interface UseFetchRoutesReturn {
  data: Route[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useFetchRoutes = (): UseFetchRoutesReturn => {
  const [data, setData] = useState<Route[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response: ApiResponse<Route[]> = await fetchRoutes();
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.message || 'Error fetching routes');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};
