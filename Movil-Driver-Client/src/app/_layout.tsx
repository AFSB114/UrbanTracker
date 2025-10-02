import '../../polyfills'; // Debe ser la primera importación
import '@/../global.css';
import { Slot } from 'expo-router';
import AuthProvider from '@Providers/auth/AuthProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import ConditionalProvidersWrapper from '@Providers/ConditionalProvidersWrapper';

export default function Layout() {
  return (
    <AuthProvider>
      <ConditionalProvidersWrapper>
        <SafeAreaView className="flex-1 bg-black">
          <StatusBar barStyle="dark-content" backgroundColor="#000" />
          <Slot />
        </SafeAreaView>
      </ConditionalProvidersWrapper>
    </AuthProvider>
  );
}
