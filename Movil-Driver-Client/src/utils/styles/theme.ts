// Tema y configuración de estilos centralizada

// Colores principales
export const COLORS = {
  // Colores base
  BLACK: '#000000',
  WHITE: '#ffffff',

  // Colores de fondo
  BACKGROUND: {
    PRIMARY: '#000000', // Negro puro
    SECONDARY: '#111111', // Gris muy oscuro
    TERTIARY: '#1a1a1a', // Gris oscuro
    CARD: '#0f0f0f', // Gris muy oscuro para tarjetas
  },

  // Colores de texto
  TEXT: {
    PRIMARY: '#ffffff', // Blanco
    SECONDARY: '#a1a1aa', // Gris claro
    MUTED: '#71717a', // Gris medio
    ACCENT: '#f4f4f5', // Blanco zinc
  },

  // Colores de estado
  STATUS: {
    SUCCESS: '#10b981', // Verde
    WARNING: '#f59e0b', // Amarillo
    ERROR: '#ef4444', // Rojo
    INFO: '#3b82f6', // Azul
    NEUTRAL: '#6b7280', // Gris
  },

  // Colores de borde
  BORDER: {
    LIGHT: '#27272a', // Gris claro para bordes
    MEDIUM: '#3f3f46', // Gris medio
    STRONG: '#52525b', // Gris fuerte
  },

  // Colores específicos de la app
  BRAND: {
    PRIMARY: '#22c55e', // Verde brillante
    SECONDARY: '#16a34a', // Verde oscuro
    ACCENT: '#84cc16', // Verde lima
  },
} as const;

// Espaciado
export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
  XXL: 48,
} as const;

// Tamaños de fuente
export const FONT_SIZE = {
  XS: 12,
  SM: 14,
  MD: 16,
  LG: 18,
  XL: 20,
  XXL: 24,
  XXXL: 30,
} as const;

// Pesos de fuente
export const FONT_WEIGHT = {
  LIGHT: '300',
  NORMAL: '400',
  MEDIUM: '500',
  SEMIBOLD: '600',
  BOLD: '700',
  EXTRABOLD: '800',
} as const;

// Border radius
export const BORDER_RADIUS = {
  SM: 4,
  MD: 8,
  LG: 12,
  XL: 16,
  XXL: 20,
  FULL: 9999,
} as const;

// Sombras
export const SHADOWS = {
  SM: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  MD: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  LG: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
} as const;

// Configuración de componentes comunes
export const COMPONENT_STYLES = {
  BUTTON: {
    HEIGHT: 48,
    BORDER_RADIUS: BORDER_RADIUS.LG,
    PADDING_HORIZONTAL: SPACING.LG,
    PADDING_VERTICAL: SPACING.SM,
  },
  INPUT: {
    HEIGHT: 48,
    BORDER_RADIUS: BORDER_RADIUS.FULL,
    PADDING_HORIZONTAL: SPACING.LG,
    PADDING_VERTICAL: SPACING.SM,
    BORDER_WIDTH: 1,
  },
  CARD: {
    BORDER_RADIUS: BORDER_RADIUS.XL,
    PADDING: SPACING.LG,
    MARGIN_VERTICAL: SPACING.SM,
    BORDER_WIDTH: 1,
  },
} as const;

// Tema completo para NativeWind
export const THEME = {
  colors: COLORS,
  spacing: SPACING,
  fontSize: FONT_SIZE,
  fontWeight: FONT_WEIGHT,
  borderRadius: BORDER_RADIUS,
  shadows: SHADOWS,
  components: COMPONENT_STYLES,
} as const;

// Tipos para TypeScript
export type ThemeColors = typeof COLORS;
export type ThemeSpacing = typeof SPACING;
export type ThemeFontSize = typeof FONT_SIZE;
export type ThemeBorderRadius = typeof BORDER_RADIUS;
