import { createDefaultPreset, createDefaultEsmPreset } from 'ts-jest';

export function jestConfig({ esm = true, swc, options = {} } = {}) {
  if (swc == null) {
    switch (process.env.TEST_MODE) {
      case 'ts-jest':
        swc = false;
        break;
      case 'swc':
      default:
        swc = true;
        break;
    }
  }

  const { moduleNameMapper = {} } = options;

  const config = {
    ...options,
    globals: { ...options.globals },
    moduleNameMapper: {
      '^(\\.{1,2}/.*)\\.js$': '$1',
      ...moduleNameMapper,
    },
    reporters: [
      'default',
      [
        'jest-junit',
        {
          suiteName: 'Tests',
          outputDirectory: './.build/test-results',
          classNameTemplate: '{classname}: {title}',
          titleTemplate: '{classname}: {title}',
          ancestorSeparator: ' › ',
          usePathForSuiteName: 'true',
        },
      ],
    ],
    testEnvironment: 'node',
    modulePathIgnorePatterns: [
      "<rootDir>/node_modules",
      "<rootDir>/dist",
    ],
  };

  if (process.env.CI === 'true' && process.env.GITHUB_ACTION) {
    config.reporters.push('github-actions');
  }

  if (esm) {
    config.extensionsToTreatAsEsm = ['.ts'];
  }

  if (swc) {
    config.transform = {
      '^.+\\.(t|j)sx?$': [
        '@swc/jest',
        {
          jsc: {
            target: 'es2022',
          },
        },
      ],
    };
  } else {
    config.preset = 'ts-jest';

    const defaultPreset = esm
      ? {
          ...createDefaultEsmPreset({ tsconfig: 'tsconfig.spec.json' })
            .transform,
        }
      : {
          ...createDefaultPreset({ tsconfig: 'tsconfig.spec.json' }).transform,
        };

    config.transform = {
      ...defaultPreset,
    };
  }

  return config;
}
