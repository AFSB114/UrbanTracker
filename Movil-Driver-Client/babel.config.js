module.exports = function (api) {
  api.cache(true);

  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],

    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@': './src',
            '@App': './src/app',
            '@Assets': './src/assets',
            '@Components': './src/components',
            '@Config': './src/config',
            '@Contexts': './src/contexts',
            '@Hooks': './src/hooks',
            '@Providers': './src/providers',
            '@Services': './src/services',
            '@Types': './src/types',
            '@Utils': './src/utils',
          },
        },
      ],
    ],
  };
};
