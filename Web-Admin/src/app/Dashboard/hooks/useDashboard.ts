import { useQuery, useQueryClient } from '@tanstack/react-query';
import { dashboardService, type DashboardData } from '../utils/dashboardService';

export function useDashboard() {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    error,
    refetch,
    isError
  } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => dashboardService.getDashboardData(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    retry: 3,
    refetchOnWindowFocus: false,
  });

  const handleRefetch = () => {
    // Clear cache and refetch
    queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    refetch();
  };

  return {
    data: data as DashboardData | undefined,
    isLoading,
    error: isError ? (error as Error)?.message || 'An error occurred' : null,
    refetch: handleRefetch,
  };
}