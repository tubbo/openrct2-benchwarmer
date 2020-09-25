import babel from "@rollup/plugin-babel"
import json from "@rollup/plugin-json"
import resolve from "@rollup/plugin-node-resolve"
import commonJS from "@rollup/plugin-commonjs"

export default {
  input: "./src/index.js",
  output: {
    format: "iife",
    file: "./build/benchwarmer.js"
  },
  plugins: [
    babel({
      exclude: "node_modules/**",
      presets: [
        [
          "@babel/env",
          {
            modules: false
          }
        ]
      ]
    }),
    json(),
    resolve(),
    commonJS({
      include: "node_modules/**"
    })
  ]
}
