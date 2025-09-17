import './global.css';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapScreen from './src/screens/MapScreen';

export default function App() {
  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaProvider>
        <StatusBar style="dark" backgroundColor="#000" />
        <SafeAreaView className="flex-0 bg-black" edges={['top']} />
        <SafeAreaView className="relative flex-1 bg-black" edges={['left', 'right']}>
          <MapScreen />
        </SafeAreaView>
        <SafeAreaView className="flex-0 bg-black" edges={['bottom']} />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
