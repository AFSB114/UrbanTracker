import { GestureHandlerRootView } from 'react-native-gesture-handler';
import './global.css';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Index from './src';

export default function App() {
  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaProvider>
        <StatusBar style="dark" backgroundColor="#000" />

        {/* Área superior negra */}
        <SafeAreaView className="flex-0 bg-black" edges={['top']} />

        {/* Contenido principal */}
        <SafeAreaView className="relative flex-1 bg-black" edges={['left', 'right']}>
          <Index />
        </SafeAreaView>

        {/* Área inferior con el color que quieras */}
        <SafeAreaView className="flex-0 bg-black" edges={['bottom']} />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
