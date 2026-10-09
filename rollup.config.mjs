import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import dts from "rollup-plugin-dts";
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from "rollup-plugin-postcss";
import terser from "@rollup/plugin-terser";
import pkg from './package.json' with { type: "json" };
import url from '@rollup/plugin-url' 
import sourcemaps from 'rollup-plugin-sourcemaps';

const config =  [
  {
    input: "src/index.ts",
    output: 
      [ {
          dir: 'dist',
          entryFileNames: 'cjs/index.js',
          format: "cjs",
          sourcemap: true,
          interop: 'auto',
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM'
        }

        },
        {
          dir: 'dist',
          entryFileNames: 'esm/index.js',
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


     

        

  
      
    
      babel({
        babelHelpers: 'bundled',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        include: ['src/**/*'],
        configFile: false,
        presets: [
          ['@babel/preset-env', { modules: false }],
          ['@babel/preset-react', { runtime: 'automatic' }],
          '@babel/preset-typescript',
        ],
      }),
      sourcemaps(),
      commonjs({ extensions: ['.js', '.jsx', '.ts', '.tsx'], include: /node_modules/ }),
      url(),
      postcss({ extract: 'style.css' }),
      terser(),
    ]
  },
  {
    input: "src/index.ts",
    output: [{ file: pkg.types, format: 'esm' }],
    external: [/\.css$/],
    plugins: [dts()],
}
]

export default config
