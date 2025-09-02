import { Redirect } from 'expo-router';
import useAuth from '@/hooks/auth/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: string;
}

export default function ProtectedRoute({ children, fallback = '/login' }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Redirect href={fallback} />;
  }

  return <>{children}</>;
}
