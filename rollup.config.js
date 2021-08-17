import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";

export default {
  input: "./src/index.ts",
  output: {
    format: "iife",
    file: "./build/benchwarmer.js",
  },
  plugins: [json(), typescript()],
};
