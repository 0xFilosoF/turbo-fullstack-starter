import { jestConfig } from '@repo/jest-presets/jest.config.js';

export default jestConfig({
  options: {
    moduleNameMapper: {
      'backend/package.json$': '<rootDir>/package.json',
    },
  },
});
