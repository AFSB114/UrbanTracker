/* eslint-env node */
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  {
    rules: {
      'react/display-name': 'off',
    },
  },
  {
    settings: {
      'import/resolver': {
        alias: {
          map: [
            ['@', './src'], // o './app' si usas Expo Router
            ['@App', './src/app'],
            ['@Assets', './assets'],
            ['@Components', './src/components'],
            ['@Config', './src/config'],
            ['@Contexts', './src/contexts'],
            ['@Hooks', './src/hooks'],
            ['@Providers', './src/providers'],
            ['@Services', './src/services'],
            ['@Types', './src/types'],
            ['@Utils', './src/utils'],
          ],
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        },
      },
    },
  },
]);
