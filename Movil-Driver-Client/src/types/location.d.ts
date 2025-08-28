// Define a location interface compatible with existing code
interface Location {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

interface LocationProviderConditionalProps {
  children: React.ReactNode;
  shouldTrack: boolean; // Prop para controlar si debe hacer tracking
  isAuthenticated: boolean; // Prop para verificar autenticación
}