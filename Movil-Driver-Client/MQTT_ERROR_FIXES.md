# Solución de Errores de Publicación MQTT - UrbanTracker Driver

## Problemas Identificados y Soluciones

### 1. **Error: Publicación Inmediata al Conectar**
**Problema**: Se intentaba publicar mensajes inmediatamente después de conectar, antes de que la conexión estuviera completamente establecida.

**Solución**:
- ✅ Agregado delay de 2 segundos antes de publicar el estado de conexión
- ✅ Uso de `setTimeout` para asegurar que la conexión esté estable
- ✅ Configuración centralizada de timeouts

```typescript
// Antes
mqttClient.on('connect', () => {
  // Publicación inmediata ❌
  mqttClient.publish('topic', message);
});

// Después
mqttClient.on('connect', () => {
  setTimeout(() => {
    // Publicación después de 2 segundos ✅
    mqttClient.publish('topic', message);
  }, 2000);
});
```

### 2. **Error: Falta de Validaciones**
**Problema**: No se validaban los datos antes de publicar, causando errores con mensajes inválidos.

**Solución**:
- ✅ Validación de topic no vacío
- ✅ Validación de mensaje JSON válido
- ✅ Validación de estado de conexión
- ✅ Validación de cliente disponible

```typescript
const publishSafely = (topic: string, data: any) => {
  // Validaciones antes de publicar
  if (!isValidTopic(topic)) return false;
  if (!isValidJsonMessage(data)) return false;
  if (connectionStatus !== 'Conectado') return false;
  
  // Publicar solo si todo es válido
  publish(topic, JSON.stringify(data));
};
```

### 3. **Error: Publicaciones en Bucle**
**Problema**: Los efectos se ejecutaban múltiples veces causando publicaciones duplicadas.

**Solución**:
- ✅ Agregada condición `isRecorridoActive` para ubicaciones
- ✅ Mejor manejo de dependencias en useEffect
- ✅ Validación de estado antes de publicar

```typescript
// Solo publicar ubicación si el recorrido está activo
useEffect(() => {
  if (location && connectionStatus === 'Conectado' && isRecorridoActive) {
    publishLocation(location);
  }
}, [location, connectionStatus, isRecorridoActive]);
```

### 4. **Error: Configuración Descentralizada**
**Problema**: Las configuraciones MQTT estaban dispersas en diferentes archivos.

**Solución**:
- ✅ Archivo de configuración centralizado (`src/config/mqtt.ts`)
- ✅ Constantes para topics, QoS, timeouts
- ✅ Funciones helper para crear mensajes

```typescript
// Configuración centralizada
export const MQTT_CONFIG = {
  BROKER_URL: 'ws://172.30.7.183:9001',
  TOPICS: {
    DRIVER_STATUS: 'driver/status',
    DRIVER_RECORRIDO: 'driver/recorrido',
    USER_LOCATION: 'user/123/location',
  },
  QOS: {
    AT_LEAST_ONCE: 1,
  },
  TIMEOUTS: {
    PUBLISH_DELAY: 2000,
  },
};
```

### 5. **Error: Manejo de Errores Insuficiente**
**Problema**: Los errores de publicación no se manejaban adecuadamente.

**Solución**:
- ✅ Logs detallados de errores
- ✅ Alertas informativas para el usuario
- ✅ Información de contexto en logs
- ✅ Try-catch en todas las publicaciones

```typescript
client.publish(topic, message, { qos: 1 }, (error) => {
  if (error) {
    console.log('❌ Error publicando:', error);
    console.log('  - Topic:', topic);
    console.log('  - Mensaje:', message);
    Alert.alert('Error al publicar', error.message);
  }
});
```

## Mejoras Implementadas

### 1. **Hook Personalizado `useMqttPublish`**
- Funciones específicas para cada tipo de publicación
- Validaciones automáticas
- Manejo de errores robusto

### 2. **Configuración Centralizada**
- Un solo lugar para cambiar configuraciones
- Constantes para evitar errores de tipeo
- Funciones helper para crear mensajes

### 3. **Mejor Logging**
- Logs detallados para debugging
- Información de contexto en cada log
- Separación clara entre éxito y error

### 4. **Validaciones Robustas**
- Validación de JSON antes de publicar
- Validación de estado de conexión
- Validación de datos de entrada

## Flujo de Publicación Mejorado

### 1. **Conexión**
```
Conectar → Esperar 2s → Publicar estado de conexión
```

### 2. **Ubicación**
```
Nueva ubicación → Validar recorrido activo → Validar JSON → Publicar
```

### 3. **Estado de Recorrido**
```
Cambio de estado → Validar conexión → Crear mensaje → Publicar
```

## Códigos de Error Comunes y Soluciones

### `ECONNREFUSED`
- **Causa**: Broker no disponible
- **Solución**: Verificar que el broker esté corriendo

### `ENOTFOUND`
- **Causa**: DNS no resuelve la IP
- **Solución**: Verificar conectividad de red

### `Invalid JSON`
- **Causa**: Mensaje malformado
- **Solución**: Validación automática implementada

### `Client not connected`
- **Causa**: Conexión perdida
- **Solución**: Reconexión automática implementada

## Testing de la Solución

Para verificar que los errores están solucionados:

1. **Revisar logs**: Buscar mensajes de éxito ✅
2. **Verificar conexión**: Estado debe ser "Conectado"
3. **Probar publicación**: No debe haber errores en consola
4. **Verificar mensajes**: Los mensajes deben llegar al broker

## Logs Esperados

```
✅ ¡CONEXIÓN WEBSOCKET CONDICIONAL EXITOSA!
📤 Publicando estado de conexión...
✅ Estado de conexión publicado exitosamente
📍 Nueva ubicación publicada: {lat: 4.710989, lon: -74.072092}
📊 Estado de recorrido publicado: Iniciado
```
