# Plan de Implementación: Registro de Trayectorias de Ruta

## 🎯 Objetivo
Implementar la funcionalidad para crear un registro en `/api/v1/public/route-trajectorie` al iniciar un recorrido y actualizarlo al finalizar.

## 📋 Análisis Actual

### Estructura del Proyecto
- **TrackingProvider**: Maneja el estado de recorridos (inicio/fin)
- **TrackingService**: Publica estados vía MQTT
- **AuthService**: Gestiona autenticación y usuario
- **Configuración API**: Centralizada en `src/config/api.ts`

### Flujo Actual
1. Usuario presiona "Iniciar Trayecto"
2. `TrackingProvider.startRecorrido()` actualiza estado local
3. Se publica estado vía MQTT
4. Se activa tracking de ubicación

## 🛠️ Plan de Implementación

### 1. Actualizar Configuración API
**Archivo**: `src/config/api.ts`
- Agregar endpoint `ROUTE_TRAJECTORIE`:
```typescript
ROUTE_TRAJECTORIE: {
  CREATE: `${API_CONFIG.BASE_URL}/public/route-trajectorie`,
  UPDATE: (id: string) => `${API_CONFIG.BASE_URL}/public/route-trajectorie/${id}`,
}
```

### 2. Crear Servicio RouteTrajectorieService
**Archivo**: `src/services/api/routeTrajectorieService.ts`
- **Método `create`**: POST para crear registro inicial
- **Método `update`**: PUT para actualizar con hora de fin
- **Payload create**:
```typescript
{
  driverId: string,      // Del usuario autenticado
  startTime: string,     // Timestamp ISO
  routeId?: string,      // Si está disponible
}
```
- **Payload update**:
```typescript
{
  endTime: string,       // Timestamp ISO
}
```

### 3. Modificar TrackingProvider
**Archivo**: `src/providers/tracking/TrackingProvider.tsx`
- Agregar `routeTrajectorieId` al estado
- En `startRecorrido()`: Llamar a `RouteTrajectorieService.create()`
- En `endRecorrido()`: Llamar a `RouteTrajectorieService.update()`
- Manejar errores de API (no bloquear flujo si falla)

### 4. Actualizar Context y Tipos
**Archivos**:
- `src/contexts/tracking/trackingContext.ts`: Agregar `routeTrajectorieId` al estado
- `src/types/tracking.d.ts`: Tipos para respuestas de API (si es necesario)

### 5. Integración con Autenticación
- Obtener `driverId` del usuario autenticado
- Usar token para autenticar requests

## 🔄 Flujo Propuesto

### Inicio de Recorrido
```
Usuario presiona "Iniciar Trayecto"
    ↓
TrackingProvider.startRecorrido()
    ↓
Crear registro en /api/v1/public/route-trajectorie
    ↓
Guardar routeTrajectorieId en estado
    ↓
Continuar con flujo normal (MQTT + tracking)
```

### Fin de Recorrido
```
Usuario presiona "Finalizar Trayecto"
    ↓
TrackingProvider.endRecorrido()
    ↓
Actualizar registro con endTime
    ↓
Limpiar routeTrajectorieId
    ↓
Continuar con flujo normal
```

## ⚠️ Consideraciones

### Manejo de Errores
- Si falla la creación del registro: Loggear error, continuar con flujo normal
- Si falla la actualización: Loggear error, no afectar finalización del recorrido
- No bloquear funcionalidad principal por fallos de API

### Estado del Registro
- `routeTrajectorieId`: null cuando no hay recorrido activo
- Persistir durante la sesión del recorrido
- Limpiar al finalizar o resetear

### Autenticación
- Usar token del AuthService para requests
- Incluir token en headers de Authorization

## 📁 Archivos a Modificar/Crear

1. `src/config/api.ts` - Agregar endpoints
2. `src/services/api/routeTrajectorieService.ts` - **NUEVO**
3. `src/providers/tracking/TrackingProvider.tsx` - Modificar
4. `src/contexts/tracking/trackingContext.ts` - Modificar
5. `src/types/tracking.d.ts` - **NUEVO** (si es necesario)

## ✅ Criterios de Aceptación

- [ ] Al iniciar recorrido se crea registro en API
- [ ] Al finalizar recorrido se actualiza registro con hora de fin
- [ ] Errores de API no bloquean funcionalidad principal
- [ ] Logs adecuados para debugging
- [ ] Compatibilidad con flujo existente

## 🚀 Próximos Pasos

Una vez aprobado este plan, proceder con la implementación en modo Code.