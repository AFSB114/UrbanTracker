import { Tabs } from 'expo-router';
import ProtectedRoute from '@/auth/components/ProtectedRoute';

export default function TabsLayout() {
  return (
    <ProtectedRoute fallback="/login">
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#18181b', // zinc-900
            borderTopColor: '#3f3f46', // zinc-600
          },
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: '#a1a1aa',
        }}
      >
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: undefined,
          }}
        />
      </Tabs>
    </ProtectedRoute>
  );
}
