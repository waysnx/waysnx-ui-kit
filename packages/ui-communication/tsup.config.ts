import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  external: [
    "react",
    "react-dom",
    "@waysnx/ui-core",
    "@waysnx/ui-layout",
    "@waysnx/ui-feedback",
  ],
  exclude: ["**/*.metadata.ts"],
  minify: true,
  sourcemap: false,
  treeshake: true,
});
