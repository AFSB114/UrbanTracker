import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

// Pantallas
import MapScreen from '../../screens/MapScreen';
import RouteDetailScreen from '../../screens/RouteDetailScreen';
import SearchScreen from '../../screens/SearchScreen';
import AboutScreen from '../../screens/AboutScreen';
import StopsScreen from '../../screens/StopsScreen';

export type RootStackParamList = {
  Main: undefined;
  RouteDetail: { routeId: string; routeName: string };
  Search: undefined;
  About: undefined;
  Stops: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerShown: false,
          presentation: 'modal',
          animationTypeForReplace: 'push',
        }}>
        <Stack.Screen
          name="Main"
          component={MapScreen}
          options={{
            presentation: 'card',
          }}
        />
        <Stack.Screen
          name="RouteDetail"
          component={RouteDetailScreen}
          options={{
            presentation: 'modal',
            gestureEnabled: true,
            gestureDirection: 'vertical',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{
            presentation: 'modal',
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="Stops"
          component={StopsScreen}
          options={{
            presentation: 'modal',
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            animation: 'slide_from_right',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
