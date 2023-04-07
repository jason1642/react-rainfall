import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
// import packageJson from './package.json' assert { type: "json" };

import postcss from "rollup-plugin-postcss";

const config =  
  {
    input: "src/index.ts",
    // output: 
    // // [
    //   {
    //     dir: "dist/index.d.ts",
    //     format: "cjs",
    //     sourcemap: true,
    //   },
    //   {
    //     dir: "dist/esm/index.ts",
    //     format: "esm",
    //     sourcemap: true,
    //   },
    // ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss(), 
    ],
  }
  // {
  //   input: "dist/esm/types/index.d.ts",
  //   output: [{ file: "dist/index.d.ts", format: "esm" }],
  //   plugins: [dts()],
  //   external: [/\.css$/],

  // }


export default config