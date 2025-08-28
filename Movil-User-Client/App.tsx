import { ScreenContent } from 'components/ScreenContent';
import { StatusBar } from 'expo-status-bar';
import MapGoogle from './src/map/MapGoogle';

import './global.css';
import MapaConRuta from '@/map/MapBox';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      {/* <MapGoogle /> */}
      <MapaConRuta />
    </>
  );
}
