export interface CrudResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  operation?: string;
  entityType?: string;
  timestamp: string;
  validationErrors?: string[];
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// API Response structures for drivers
export interface UserProfile {
  id: number;
  createdAt: string;
  updatedAt: string;
  active: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userId: number;
}

export interface DriverApiResponse {
  id: number;
  createdAt: string;
  updatedAt: string;
  active: boolean;
  userId: number;
  userProfile: UserProfile;
}

export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}