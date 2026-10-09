import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from "rollup-plugin-postcss";
import terser from "@rollup/plugin-terser";
import pkg from './package.json'  assert { type: "json" };
import url from '@rollup/plugin-url' 
import sourcemaps from 'rollup-plugin-sourcemaps';

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
      [ {
          file: pkg.main,
          format: "cjs",
          sourcemap: true,
          interop: 'auto',
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM'
        }

        },
        {
          file: pkg.module,
          format: "esm",
          sourcemap: true,

        }],
        treeshake: {
          preset: 'smallest',
          manualPureFunctions: ['local']
        },
    external: ['react','react-dom'],
  
    plugins: [
            resolve(),
          peerDepsExternal(),


     

        

  
      
    
      typescript({ tsconfig: './tsconfig.json'}),

 
      sourcemaps(),
            commonjs({ extensions: ['.js', '.jsx', '.ts', '.tsx'], include: /node_modules/ }),

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
}
]

export default config
