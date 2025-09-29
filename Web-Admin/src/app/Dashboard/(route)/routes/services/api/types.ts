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