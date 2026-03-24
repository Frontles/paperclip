/** @type {import('jest').Config} */
module.exports = {
  rootDir: '.',
  testMatch: ['**/__tests__/**/*.test.js'],
  testEnvironment: 'node',
  modulePaths: ['/tmp/football-test/node_modules'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    // Mock all React Native / Expo modules
    '^react-native$': '<rootDir>/__mocks__/react-native.js',
    '^expo-av$': '<rootDir>/__mocks__/expo-av.js',
    '^@react-native-async-storage/async-storage$': '<rootDir>/__mocks__/async-storage.js',
    '^expo-router$': '<rootDir>/__mocks__/expo-router.js',
    '^react-native-reanimated$': '<rootDir>/__mocks__/react-native-reanimated.js',
    '^react-native-gesture-handler$': '<rootDir>/__mocks__/react-native-gesture-handler.js',
    '^react$': '/tmp/football-test/node_modules/react/index.js',
    '^react/(.*)$': '/tmp/football-test/node_modules/react/$1',
    '^zustand$': '/tmp/football-test/node_modules/zustand/index.js',
    '^zustand/(.*)$': '/tmp/football-test/node_modules/zustand/$1',
  },
  transform: {
    '^.+\\.[jt]sx?$': ['babel-jest', {
      configFile: false,
      babelrc: false,
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        ['@babel/preset-typescript'],
      ],
    }],
  },
  transformIgnorePatterns: [],
  resolver: undefined,
};
