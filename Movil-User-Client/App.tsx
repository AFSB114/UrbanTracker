import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './components/navigation/AppNavigator';
import './global.css';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Index from './src';

export default function App() {
  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaView className="relative flex-1 bg-black">
        <StatusBar style="dark" />
        {/* <AppNavigator /> */}
        <Index />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}