module.exports = function (api) {
  api.cache(true);
  let plugins = [
    'react-native-reanimated/plugin',
    ['module:react-native-dotenv',
      {
        moduleName: '@Env',
        path: './src/types/env.d.ts',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      }
    ],
  ];

  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    plugins,
  };
};
