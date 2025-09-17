import { useMemo, useState } from 'react';
import { useFetchRoutes } from './useFetchRoutes';
import type { Route } from '../types/types';

export const useRoutes = () => {
  const [searchText, setSearchText] = useState('');
  const { data: routes, loading, error, refetch } = useFetchRoutes();

  const filteredRoutes = useMemo(() => {
    if (!routes) return [];
    if (!searchText) return routes;

    return routes.filter(
      (route) =>
        route.description.toLowerCase().includes(searchText.toLowerCase()) ||
        route.numberRoute.includes(searchText)
    );
  }, [routes, searchText]);

  return {
    routes: filteredRoutes,
    searchText,
    setSearchText,
    loading,
    error,
    refetch,
  };
};
