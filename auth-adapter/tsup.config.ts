import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: ['src/index.ts'],
  format: ['cjs', 'esm'],
  splitting: true,
  sourcemap: true,
  clean: true,
  dts: true,
});
