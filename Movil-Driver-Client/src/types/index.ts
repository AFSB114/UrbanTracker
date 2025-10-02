// Exportaciones centralizadas de tipos
export * from './auth';
export * from './location';
export * from './mqtt';
export * from './driver';

// Tipos comunes de la aplicación
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Tipos para manejo de errores
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

// Tipos para configuración
export interface AppConfig {
  apiUrl: string;
  mqttUrl: string;
  environment: 'development' | 'staging' | 'production';
}

// Tipos para utilidades
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> & {
  [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
}[Keys];