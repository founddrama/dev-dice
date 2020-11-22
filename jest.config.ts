/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

export default {
  collectCoverageFrom: ['**/*.ts?(x)'],

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],

  // A set of global variables that need to be available in all test environments
  // globals: {},

  moduleFileExtensions: [
    "js",
    "json",
    "jsx",
    "ts",
    "tsx",
    "node",
  ],

  preset: 'ts-jest',
  testEnvironment: 'node',

  resetMocks: true,

  // The root directory that Jest should scan for tests and modules within
  rootDir: '.',
  roots: [ '<rootDir>/src', '<rootDir>/server' ],

  // setupFiles: [],
  // setupFilesAfterEnv: [],

  // testLocationInResults: false,

  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],

  testPathIgnorePatterns: [ "/node_modules/" ],

  transform: { '^.+\\.tsx?$': 'ts-jest' },

  // verbose: undefined,
};
