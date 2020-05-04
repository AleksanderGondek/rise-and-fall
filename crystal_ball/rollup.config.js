import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  output: {
    format: "iife",
    globals: {
      "excalibur": "ex",
      "lodash": "_"
    }
  },
  external: [
    "excalibur",
    "lodash",
  ],
  plugins: [
    typescript(),
    resolve({
      browser: true,
      modulesOnly: false
    }),
    commonjs()
  ]
};
