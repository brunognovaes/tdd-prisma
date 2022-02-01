/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  bail: 0,
  coverageProvider: "v8",
  testMatch: [
    "**/__tests__/**/*.spec.ts",
  ],
};