import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  extensionsToTreatAsEsm: [".ts"],
  preset: 'ts-jest/presets/default-esm', // or other ESM presets
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/test/$1',
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
    // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  verbose: true,
  testEnvironment: 'node',
  testMatch: ["**/__test__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  testPathIgnorePatterns: ["/node_modules/"],
  maxWorkers: 1,
};
export default config;
