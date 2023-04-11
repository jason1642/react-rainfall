import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from "rollup-plugin-postcss";
import terser from "@rollup/plugin-terser";
import pkg from './package.json'  assert { type: "json" };

const config =  [
  {
    input: "./src/index.tsx",
    output: 
    [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: "esm",
        sourcemap: true,
      },  
      
    ],
    plugins: [
            peerDepsExternal(),
      resolve(),

        typescript({ 
        tsconfig: "./tsconfig.json"
        // exclude: ["node_modules", "dist", "example", "rollup.config.js", "stories", "tests", "setupTests.ts, "]
      }),
      
      commonjs(),

      
    
      postcss(), 
      terser(),
    ],
        external: ['react', 'react-dom'],
  },
 
  {
    input: "dist/esm/types/index.d.ts",
    output: [{
       file: "dist/index.d.ts", format: "esm",
       
      }],
    plugins: [dts()],
    external: [/\.css$/, 'react', 'react-dom'],

  },
];

export default config
