export interface UserStatistics {
  totalUsers: number;
  activeUsers: number;
  newThisMonth?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  startIndex: number;
  endIndex: number;
}

export interface PaginationConfig {
  page: number;
  itemsPerPage: number;
}
