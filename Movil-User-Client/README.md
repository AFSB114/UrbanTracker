# UrbanTracker - App de Transporte Público

## 📱 Descripción

UrbanTracker es una aplicación móvil de React Native con Expo que permite a los usuarios buscar y consultar información de rutas de transporte público. La app incluye un mapa interactivo, búsqueda de rutas, información detallada de paradas y sistema de información institucional.

## ✨ Funcionalidades Principales

### 🗺️ Pantalla Principal con Mapa
- Mapa interactivo como vista principal
- Barra de búsqueda flotante en la parte superior
- Bottom sheet arrastrable con 3 estados:
  - **Colapsado (15%)**: Solo título "Rutas Cercanas"
  - **Medio (50%)**: Lista de rutas cercanas con iconos de bus
  - **Expandido (90%)**: Vista completa con scroll y secciones adicionales

### 🔍 Sistema de Búsqueda
- Búsqueda de rutas por nombre/número
- Resultados dinámicos en tiempo real
- Integración con el mapa

### 📋 Información de Rutas
- Modal deslizable desde abajo
- Información detallada de la ruta seleccionada
- Paradas de ida y vuelta
- Recorrido completo con estados

### ℹ️ Secciones Informativas
- **Nosotros**: Modal con información de la empresa
- **Paraderos**: Modal con información y mapas de paraderos

## 🛠 Stack Tecnológico

- **React Native** con **Expo**
- **React Navigation** para navegación
- **@gorhom/bottom-sheet** para el bottom sheet arrastrable
- **React Native Reanimated** & **Gesture Handler**
- **NativeWind (Tailwind CSS)** para estilos
- **TypeScript** para tipado estático

## 📦 Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd UrbanTracker/Movil-User-Client

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npx expo start
```

## 🚀 Comandos de Desarrollo

```bash
# Iniciar desarrollo
npx expo start

# Ejecutar en iOS
npx expo run:ios

# Ejecutar en Android  
npx expo run:android

# Build para producción
npx expo build

# Verificar tipos TypeScript
npx tsc --noEmit
```

## 🏗 Estructura del Proyecto

```
src/
├── components/
│   ├── navigation/
│   │   └── AppNavigator.tsx
│   └── ui/
│       ├── SearchBar.tsx
│       └── RouteItem.tsx
├── screens/
│   ├── MapScreen.tsx
│   ├── RouteDetailScreen.tsx
│   ├── SearchScreen.tsx
│   ├── AboutScreen.tsx
│   └── StopsScreen.tsx
└── App.tsx
```

## 🎨 Especificaciones de Diseño

### Colores
- **Fondo principal**: `#1a1a1a` (negro oscuro)
- **Elementos secundarios**: `#2c2c2c` (gris oscuro)
- **Texto primario**: `#ffffff` (blanco)
- **Texto secundario**: `#999999` (gris)
- **Rutas activas**: `#4CAF50` (verde)
- **Acentos**: `#007AFF` (azul sistema)

### Componentes de Ruta
- **Íconos de ruta**: Círculos con números, colores variables
- **Distancias**: Formato "XXXm hacia la carrera X"
- **Estados**: Verde para activo, gris para inactivo

### Animaciones
- **Bottom Sheet**: Animación spring para transiciones
- **Modales**: Deslizamiento desde abajo
- **Search**: Fade in/out

## 📱 Pantallas Implementadas

### MapScreen (Pantalla Principal)
- Mapa interactivo (placeholder)
- Barra de búsqueda flotante
- Bottom sheet con 3 estados
- Lista de rutas cercanas
- Navegación a secciones informativas

### RouteDetailScreen (Modal de Ruta)
- Información detallada de ruta
- Paradas de ida y vuelta
- Horarios y tarifas
- Estados de paradas

### SearchScreen (Overlay de Búsqueda)
- Búsqueda en tiempo real
- Resultados filtrados
- Navegación a detalles de ruta

### AboutScreen (Modal Informativo)
- Información de la empresa
- Misión y visión
- Características principales
- Información de contacto

### StopsScreen (Modal de Paraderos)
- Lista de paraderos
- Búsqueda de paraderos
- Información detallada
- Rutas que pasan por cada paradero

## 🔧 Configuración

### Dependencias Principales
```json
{
  "@gorhom/bottom-sheet": "^4",
  "@react-navigation/native": "^7",
  "@react-navigation/stack": "^7",
  "react-native-reanimated": "~3.17.4",
  "react-native-gesture-handler": "^2",
  "react-native-maps": "^1.7.1"
}
```

### Configuración de Babel
```javascript
// babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: ['react-native-reanimated/plugin'],
  };
};
```

## 📋 Características Técnicas

- **Navegación**: Stack Navigator con modales
- **Gestos**: Soporte completo para gestos nativos
- **Animaciones**: Reanimated para animaciones fluidas
- **Tipado**: TypeScript para mejor desarrollo
- **Estilos**: Tailwind CSS con NativeWind para estilos modernos y mantenibles
- **Iconos**: Expo Vector Icons

## 🎯 Próximas Mejoras

- [ ] Integración con mapas reales (Google Maps/Mapbox)
- [ ] Datos en tiempo real de ubicación de buses
- [ ] Notificaciones push
- [ ] Modo offline
- [ ] Favoritos de rutas
- [ ] Historial de viajes
- [ ] Integración con APIs de transporte público

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

**Versión**: 1.0.0  
**Última actualización**: 2025  
**Desarrollado con**: React Native + Expo
