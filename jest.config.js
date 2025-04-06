/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  setupFilesAfterEnv: ['<rootDir>/src/setupFilesAfterEnv.ts'],
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
}
