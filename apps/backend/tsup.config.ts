import { defineConfig, type Options } from 'tsup';

export default defineConfig((options: Options) => ({
  entry: ['src/index.ts'],
  clean: true,
  format: ['esm'],
  dts: true,
  sourcemap: true,
  external: ['@prisma/client'],
  ...options,
}));
