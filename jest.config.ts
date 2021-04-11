/* eslint-disable import/no-extraneous-dependencies */
import { pathsToModuleNameMapper } from "ts-jest/utils";

import { compilerOptions } from "./tsconfig.json";

export default {
  bail: true,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["**/src/**", "!**/node_modules/**"],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: ["text-summary", "lcov"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/src/",
  }),
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.spec.ts"],
};
