import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './components/navigation/AppNavigator';
import './global.css';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppNavigator />
    </GestureHandlerRootView>
  );
}
