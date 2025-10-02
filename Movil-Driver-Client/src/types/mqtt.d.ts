import type { MqttClient } from 'mqtt';

export type MqttConnectionStatus =
  | 'Desconectado'
  | 'Conectado'
  | 'Reconectando'
  | 'Error de conexión';

export interface MqttContextType {
  // Cliente MQTT actual
  client: MqttClient | null;

  // Estado actual de la conexión
  connectionStatus: MqttConnectionStatus;

  // Método para publicar mensajes
  publish: (topic: string, message: string) => void;
}

export interface MqttProviderConditionalProps {
  children: ReactNode;
  shouldConnect?: boolean; // Prop para controlar si debe conectarse
  isAuthenticated?: boolean; // Prop para verificar autenticación
}
