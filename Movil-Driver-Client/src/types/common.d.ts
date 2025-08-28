export interface User {
  id: string;
  identificacion: string;
  nombre?: string;
  email?: string;
  role?: string;
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
}

export interface AuthContextType {
  // Estado
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  
  // Métodos
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}
