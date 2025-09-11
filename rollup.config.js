import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import dts from 'rollup-plugin-dts';

// Common configuration
const commonConfig = {
  input: 'src/index.ts',
  external: ['react', 'react-dom'],
  plugins: [
    external(),
    resolve(),
    commonjs(),
    typescript({ 
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist/types'
    }),
  ],
};

// ESM configuration
const esmConfig = {
  ...commonConfig,
  output: {
    file: 'dist/esm/index.js',
    format: 'esm',
    exports: 'named',
    sourcemap: true,
  },
  plugins: [
    ...commonConfig.plugins,
    terser(),
  ],
};

// CJS configuration
const cjsConfig = {
  ...commonConfig,
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    exports: 'default',
    sourcemap: true,
  },
  plugins: [
    ...commonConfig.plugins,
    terser(),
  ],
};

// TypeScript declarations
const dtsConfig = {
  input: 'dist/types/index.d.ts',
  output: [{ 
    file: 'dist/index.d.ts', 
    format: 'esm' 
  }],
  plugins: [dts()],
};

export default [esmConfig, cjsConfig, dtsConfig];