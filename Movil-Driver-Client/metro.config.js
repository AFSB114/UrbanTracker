const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Configuración para resolver módulos de Node.js necesarios para MQTT
config.resolver.alias = {
  ...config.resolver.alias,
  crypto: 'react-native-crypto-js',
  buffer: 'buffer',
  events: 'events',
  stream: 'stream-browserify',
};

// Asegurar que los polyfills sean incluidos
config.resolver.platforms = ['native', 'android', 'ios', 'web'];

module.exports = withNativeWind(config, { input: './global.css' });
