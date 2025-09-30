import { Stack } from 'expo-router';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function ProtectedLayout() {
  return (
    <ProtectedRoute fallback="/login">
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="index"
          options={{
            title: 'Inicio',
            animation: 'fade',
          }}
        />
        {/* Aquí se pueden agregar más rutas protegidas en el futuro */}
        {/* <Stack.Screen name="profile" options={{ title: 'Perfil' }} /> */}
        {/* <Stack.Screen name="settings" options={{ title: 'Configuración' }} /> */}
      </Stack>
    </ProtectedRoute>
  );
}
