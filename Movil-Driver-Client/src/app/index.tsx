import { View, ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '@/hooks/auth';

export default function Index() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator size="large" color="#ffffff" animating={true} />
      </View>
    );
  }

  if (isAuthenticated) {
    return <Redirect href="/(protected)/" />;
  } else {
    return <Redirect href="/login" />;
  }
}
