import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from "rollup-plugin-postcss";
import terser from "@rollup/plugin-terser";
import pkg from './package.json'  assert { type: "json" };
import url from '@rollup/plugin-url' 
import { format, parse } from 'path';
const getTypesPath = (jsFile) => {
  const pathInfo = parse(jsFile);
  return format({
      ...pathInfo,
      base: '',
      dir: `${pathInfo.dir}/types`,
      ext: '.d.ts',
  });
};



const config =  [
  {
    input: "src/index.ts",
    output: 
    [ 
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
        // preserveModulesRoot: 'src',
        // interop: 'compat',
        // inlineDynamicImports: true,
      },
      {
        file: pkg.module,
        format: "esm",
        sourcemap: true,
        preserveModulesRoot: 'src',

      },
   
    ],
    external: ['react','react-dom'],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
      typescript(
        {
           tsconfig: "./tsconfig.json"
           
          }),
      url(),
      postcss(), 
      terser(),
    ]
  },
  // {
  //   input: "dist/esm/types/index.d.ts",
  //   output: [{ file: "dist/index.d.ts", format: "esm", sourcemap: true}],
  //   external: [/\.css$/],
  //  plugins: [dts()]
  // }
  {
    input: getTypesPath(pkg.module ?? pkg.main),
    output: [{ file: pkg.types, format: 'esm' }],
    plugins: [dts()],
},
// {
//   input: "src/index.ts",

// output: {
//     dir: 'dist/src',
//     format: 'umd',
//     sourcemap: true,
// //     preserveModules: true,
// // preserveModulesRoot: 'src',
//   },
//   external: ['react','react-dom'],
//   plugins: [
//     peerDepsExternal(),
//     resolve(),
//     commonjs({
//       extensions: ['.js', '.jsx', '.ts', '.tsx'],
//   }),
//     typescript(),
//     url(),
//     postcss(), 
//     terser(),
//   ]
// }
]

export default config
