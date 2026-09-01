import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/react.ts"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  clean: true,
  external: ["react", "react-dom"],
  exclude: ["**/*.metadata.ts"],
  minify: true,
  sourcemap: false,
  treeshake: true,
});
