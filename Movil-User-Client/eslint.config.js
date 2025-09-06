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
            ['@Env', './src/types/env.d.ts'],
          ]
        }
      }
    }
  }
]);