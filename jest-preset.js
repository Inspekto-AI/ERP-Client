module.exports = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  // setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  setupFiles: ['./tests/socketServer.js', './tests/setupTests.js', './tests/themeSetup.js'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '^components/(.*)$': '<rootDir>/components/$1',
    '^styles/(.*)$': '<rootDir>/styles/$1',
    '^utils/(.*)$': '<rootDir>/utils/$1',
    '^reactQueries/(.*)$': '<rootDir>/reactQueries/$1',
    '^context/(.*)$': '<rootDir>/context/$1',
  },
};
