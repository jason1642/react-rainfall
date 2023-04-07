import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import packageJson from './package.json' assert { type: "json" };

import postcss from "rollup-plugin-postcss";

const globals = { react: 'React' };

const defaults = {
	input: 'src/index.ts',
	external: [
		...Object.keys(packageJson.devDependencies || {})
	],
	plugins: [
		typescript()
	]
}

const config =  [
  {
    input: "src/index.ts",
    output: 
    [
      {
        dir: "dist",
        format: "cjs",
        sourcemap: true,
      },
      {
        dir: "dist",
        format: "esm",
        sourcemap: true,
      }, 
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ declaration: true, declarationDir: 'dist', tsconfig: "./tsconfig.json" }),
      postcss(), 
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.css$/],

  },
];

export default config

// export default [
// 	{
// 		...defaults,
// 		output: [
// 			{ file: pkg.main, format: 'cjs', globals },
// 			{ file: pkg.browser, name: 'lib', format: 'iife', globals }
// 		]
// 	}, {
// 		...defaults,
// 		plugins: [
// 			typescript({ declaration: true, declarationDir: 'dist' })
// 		],
// 		output: [
// 			{ dir: 'dist', format: 'es', globals }
// 		]
// 	}
// ];