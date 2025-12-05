module.exports = {
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/tests/',
    '/setup/',
  ],
  testMatch: [
    '**/tests/**/*.test.js',
    '**/__tests__/**/*.js' 
  ],
  collectCoverageFrom: [ 
    'controllers/**/*.js',
    'models/**/*.js',
    'routes/**/*.js',
    '!**/node_modules/**',
    '!**/tests/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  verbose: true,
  testTimeout: 30000,
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  globalTeardown: '<rootDir>/tests/teardown.js',
  forceExit: true, // Force Jest to exit after tests complete
  detectOpenHandles: false, // Disable to speed up tests (enable if debugging)
};

