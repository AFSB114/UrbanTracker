# UrbanTracker - App de Transporte Público

## 📱 Descripción del Proyecto

UrbanTracker es una aplicación móvil de React Native con Expo que permite a los usuarios buscar y consultar información de rutas de transporte público. La app incluye un mapa interactivo, búsqueda de rutas, información detallada de paradas y sistema de información institucional.

## 🎯 Funcionalidades Principales

### 1. **Pantalla Principal con Mapa**
- Mapa interactivo como vista principal
- Barra de búsqueda flotante en la parte superior
- Bottom sheet arrastrable con 3 estados:
  - **Colapsado (15%)**: Solo título "Rutas Cercanas"  
  - **Medio (50%)**: Lista de rutas cercanas con iconos de bus
  - **Expandido (90%)**: Vista completa con scroll y secciones adicionales

### 2. **Sistema de Búsqueda**
- Búsqueda de rutas por nombre/número
- Resultados dinámicos
- Integración con el mapa

### 3. **Información de Rutas**
- Modal deslizable desde abajo
- Información detallada de la ruta seleccionada
- Paradas de ida y vuelta
- Recorrido completo

### 4. **Secciones Informativas**
- **Nosotros**: Modal con información de la empresa
- **Paraderos**: Modal con información y mapas de paraderos

## 🛠 Stack Tecnológico

- **React Native** con **Expo**
- **React Navigation** para navegación
- **@gorhom/bottom-sheet** para el bottom sheet arrastrable
- **React Native Maps** (opcional para mapas)
- **React Native Reanimated** & **Gesture Handler**

## 📦 Instalación

```bash
# Crear proyecto Expo
npx create-expo-app UrbanTracker --template

# Instalar dependencias de navegación
npm install @react-navigation/native @react-navigation/stack
npx expo install react-native-screens react-native-safe-area-context

# Instalar bottom sheet
npm install @gorhom/bottom-sheet react-native-reanimated react-native-gesture-handler

# Si usas mapas
npx expo install react-native-maps
```

## 🏗 Estructura de Navegación Requerida

```javascript
NavigationContainer
└── Stack Navigator
    ├── Main (MapScreen con BottomSheet)
    ├── RouteDetail (Modal desde abajo)
    ├── Search (Overlay transparente)
    ├── About (Modal)
    └── Stops (Modal)
```

## 📱 Pantallas y Componentes

### MapScreen (Pantalla Principal)
- **Mapa**: Componente principal que ocupa toda la pantalla
- **Barra de búsqueda**: Posición fija superior con placeholder "Buscar"
- **Bottom Sheet**: Componente arrastrable con:
  - Estado colapsado: "Rutas Cercanas" + subtitle
  - Estado medio: Lista de rutas con íconos numerados
  - Estado expandido: Vista completa con scroll + secciones adicionales

### RouteDetailScreen (Modal de Ruta)
- **Header**: Título "Ruta" + botón X para cerrar
- **Información de ruta**: 
  - Número de ruta grande (ej: "999")
  - Códigos de destino (ej: "Alberto Galindo", "Conj. María Paula")
- **Paradas**: Secciones IDA/VUELTA con íconos de estado
- **Recorrido**: Lista detallada de paradas

### SearchScreen (Overlay de Búsqueda)
- Modal transparente con fondo semiopaco
- Input de búsqueda activo
- Resultados en tiempo real

### AboutScreen & StopsScreen (Modales Informativos)
- Modales deslizables desde abajo
- Contenido scrolleable
- Botón cerrar

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

## 📋 Lista de Tareas para Cursor

### Configuración Inicial
- [ ] Configurar React Navigation con Stack Navigator
- [ ] Instalar y configurar @gorhom/bottom-sheet
- [ ] Configurar react-native-reanimated

### Pantalla Principal (MapScreen)
- [ ] Crear componente MapScreen como contenedor principal
- [ ] Implementar barra de búsqueda flotante
- [ ] Integrar BottomSheet con 3 estados (15%, 50%, 90%)
- [ ] Crear contenido dinámico según estado del sheet
- [ ] Añadir lista de rutas cercanas con íconos numerados

### Navegación y Modales
- [ ] Configurar RouteDetailScreen como modal
- [ ] Implementar transición desde abajo para modales
- [ ] Crear SearchScreen como overlay transparente
- [ ] Implementar AboutScreen y StopsScreen

### Componentes Reutilizables
- [ ] Crear componente RouteItem para lista de rutas
- [ ] Crear componente SearchBar reutilizable
- [ ] Implementar botones de acción flotantes

### Funcionalidad
- [ ] Implementar navegación entre pantallas
- [ ] Añadir manejo de parámetros entre rutas
- [ ] Configurar gestos para cerrar modales
- [ ] Implementar estado global si es necesario

### Estilos y UX
- [ ] Aplicar tema oscuro consistente
- [ ] Implementar animaciones suaves
- [ ] Ajustar responsive design
- [ ] Añadir feedback táctil

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
```

## 📄 Notas Importantes

1. **Bottom Sheet**: Usar `@gorhom/bottom-sheet` para mejor performance que implementación custom
2. **Navegación**: Priorizar modales sobre push navigation para mejor UX
3. **Estado**: Mantener estado del mapa al abrir modales
4. **Performance**: Lazy loading para contenido del bottom sheet expandido
5. **Gestos**: Habilitar gestos nativos para cerrar modales

## 🎯 Prompt Sugerido para Cursor

"Ayúdame a crear una app React Native con Expo llamada UrbanTracker siguiendo este README. Necesito implementar las pantallas y navegación paso a paso, empezando por la configuración básica de React Navigation y el MapScreen con BottomSheet. Prioriza una implementación limpia y modular."

---

**Versión**: 1.0  
**Última actualización**: 2025  
**Desarrollado con**: React Native + Expo
