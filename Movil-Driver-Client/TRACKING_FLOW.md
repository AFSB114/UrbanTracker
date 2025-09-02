# Flujo de Tracking Automático - UrbanTracker Driver

## Resumen de Funcionalidad

Este documento describe el flujo automático implementado para el tracking de ubicación y conexión MQTT en la aplicación UrbanTracker Driver.

## Flujo Completo


### 1. Inicio de Sesión
- **Trigger**: Usuario inicia sesión exitosamente
- **Acciones automáticas**:
  - ✅ Se conecta automáticamente al broker MQTT
  - ✅ Se solicitan permisos de ubicación (si no están concedidos)
  - ✅ Se publica mensaje de estado de conexión al broker

### 2. Solicitud de Permisos de Ubicación
- **Cuándo**: Inmediatamente después del login exitoso
- **Proceso**:
  - Verifica si ya tiene permisos concedidos
  - Si no los tiene, solicita permisos de ubicación
  - Si son denegados, muestra alerta para ir a configuración
  - Si son concedidos, los permisos quedan listos para el tracking

### 3. Conexión MQTT Automática
- **Cuándo**: Inmediatamente después del login exitoso
- **Configuración**:
  - URL: `ws://172.30.7.183:9001`
  - Client ID: Generado automáticamente
  - Keepalive: 60 segundos
  - Reconexión automática: 1 segundo

### 4. Inicio de Trayecto
- **Trigger**: Usuario presiona "Iniciar Trayecto"
- **Acciones automáticas**:
  - ✅ Inicia el recorrido (estado interno)
  - ✅ Activa automáticamente el tracking de ubicación (después de 1 segundo)
  - ✅ Publica mensaje de estado de recorrido al broker
  - ✅ Comienza a enviar ubicaciones en tiempo real

### 5. Tracking de Ubicación
- **Cuándo**: Cuando el recorrido está activo Y el tracking está activo
- **Configuración**:
  - Frecuencia: Cada 1 segundo
  - Distancia mínima: 1 metro
  - Precisión: Alta
- **Envío**: Cada nueva ubicación se publica al topic `user/123/location`

### 6. Finalización de Trayecto
- **Trigger**: Usuario presiona "Finalizar Trayecto"
- **Acciones automáticas**:
  - ✅ Desactiva el tracking de ubicación
  - ✅ Finaliza el recorrido (estado interno)
  - ✅ Publica mensaje de finalización al broker

## Topics MQTT Utilizados

### `driver/status`
- **Propósito**: Estado de conexión del driver
- **Formato**:
```json
{
  "type": "connection_status",
  "status": "connected",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "clientId": "mobile_conditional_abc123"
}
```

### `driver/recorrido`
- **Propósito**: Estado del recorrido (inicio/fin)
- **Formato**:
```json
{
  "type": "recorrido_status",
  "isActive": true,
  "startTime": "10:30:00",
  "endTime": null,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### `user/123/location`
- **Propósito**: Ubicación en tiempo real
- **Formato**:
```json
{
  "lat": 4.710989,
  "lon": -74.072092,
  "timestamp": 1705312200000
}
```

## Estados de Conexión

### MQTT Broker
- 🟢 **Conectado**: Conexión activa y funcionando
- 🟡 **Reconectando**: Intentando reconectar automáticamente
- 🔴 **Desconectado**: Sin conexión
- 🔴 **Error de conexión**: Error en la conexión

### Tracking de Ubicación
- 🟢 **Activo**: Tracking funcionando y enviando ubicaciones
- ⚪ **Inactivo**: Tracking detenido

### Estado del Recorrido
- 🔵 **En Recorrido**: Recorrido activo
- ⚪ **Detenido**: Recorrido inactivo

## Manejo de Errores

### Permisos de Ubicación
- Si se deniegan permanentemente, se muestra alerta para ir a configuración
- Si el GPS está desactivado, se muestra alerta específica

### Conexión MQTT
- Reconexión automática cada 1 segundo
- Timeout de 15 segundos para conexión inicial
- Manejo de errores de red

### Tracking
- Solo funciona si tiene permisos de ubicación
- Solo funciona si está autenticado
- Solo funciona si el recorrido está activo

## Logs de Debug

La aplicación genera logs detallados para cada acción:

```
🔍 Solicitando permisos de ubicación después del login...
✅ Permisos de ubicación concedidos después del login
🌐 Iniciando conexión MQTT condicional...
✅ ¡CONEXIÓN WEBSOCKET CONDICIONAL EXITOSA!
✅ Estado de conexión publicado
🚚 Iniciando trayecto completo...
📍 Activando tracking automáticamente...
🔄 Iniciando tracking de ubicación CONDICIONAL...
🔄 Ubicación actualizada CONDICIONAL: {lat: 4.710989, lon: -74.072092}
Nueva ubicación publicada por cambio en el contexto.
Estado de recorrido publicado: Iniciado
```

## Configuración Técnica

### Dependencias
- `expo-location`: Para permisos y tracking de ubicación
- `mqtt`: Para conexión al broker MQTT
- `react-native`: Para alertas y navegación

### Providers Utilizados
- `AuthProvider`: Manejo de autenticación
- `MqttProvider`: Conexión MQTT condicional
- `LocationProvider`: Tracking de ubicación condicional
- `TrackingProvider`: Estado del recorrido

### Hooks Personalizados
- `useAuth`: Estado de autenticación
- `useMqtt`: Conexión y publicación MQTT
- `useLocation`: Tracking de ubicación
- `useTracking`: Estado del recorrido
- `useHome`: Lógica principal de la pantalla home
