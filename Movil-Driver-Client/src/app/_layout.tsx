import '../../polyfills'; // Debe ser la primera importación
import '../../global.css';
import { Slot } from 'expo-router';
import AuthProvider from '@/auth/context/provider/AuthProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import ConditionalProvidersWrapper from './ConditionalProvidersWrapper';

export default function RootLayout() {
  return (
    <AuthProvider>
      <ConditionalProvidersWrapper>
        <SafeAreaView className="flex-1 bg-black">
          <StatusBar barStyle='dark-content' backgroundColor='#000' />
          <Slot />
        </SafeAreaView>
      </ConditionalProvidersWrapper>
    </AuthProvider>
  );
}
