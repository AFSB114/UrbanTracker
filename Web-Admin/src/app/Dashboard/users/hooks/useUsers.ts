
import { useState, useEffect, useMemo, useCallback } from 'react';
import type { User, UserStatistics, PaginationData, PaginationConfig } from '../types/userTypes';

const MOCK_USERS: User[] = [
  {
    id: '1',
    name: "Juan Pérez",
    email: "juan.perez@email.com",
  },
  {
    id: '2',
    name: "Ana López",
    email: "ana.lopez@email.com",
  },
  {
    id: '3',
    name: "Luis Gómez",
    email: "luis.gomez@email.com",
  },
];

const DEFAULT_ITEMS_PER_PAGE = 5;

export function useUsers() {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [paginationConfig, setPaginationConfig] = useState<PaginationConfig>({
    page: 1,
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  });

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / paginationConfig.itemsPerPage);
  const startIndex = (paginationConfig.page - 1) * paginationConfig.itemsPerPage;
  const endIndex = Math.min(startIndex + paginationConfig.itemsPerPage, totalItems);
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  const statistics: UserStatistics = {
    totalUsers: users.length,
    activeUsers: users.length, // Simulación
    newThisMonth: 1,
  };

  const pagination: PaginationData = {
    currentPage: paginationConfig.page,
    totalPages,
    totalItems,
    itemsPerPage: paginationConfig.itemsPerPage,
    startIndex,
    endIndex,
  };

  return {
    filteredUsers,
    paginatedUsers,
    searchTerm,
    setSearchTerm,
    statistics,
    pagination,
    setPaginationConfig,
  };
}
