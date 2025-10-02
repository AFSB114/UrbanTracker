export interface User {
  id: number;
  identificacion: string;
  nombre?: string;
  email?: string;
  role?: string;
  vehicleId?: string;
  routeId?: string;
}

export interface LoginCredentials {
  identificacion: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  driverInfoFetched?: boolean;
}

export interface AuthContextType {
  // Estado
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;

  // Métodos
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}
