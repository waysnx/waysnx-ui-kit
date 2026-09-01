import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: false,
  clean: true,
  minify: true,
  outDir: 'dist',
  external: ['react', 'react-dom'],
  exclude: ['**/*.metadata.ts'],
  shims: true,
});
