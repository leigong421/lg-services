/*
 * @Author: suchiva@126.com
 * @Date: 2022-08-30 15:49:48
 * @LastEditors: gonglei
 * @LastEditTime: 2022-10-12 10:14:45
 * @Description: 打包
 */
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import cleanup from 'rollup-plugin-cleanup';

export default {
  input: './src/index.js',
  output: {
    file: './lib/index.js',
    format: 'umd', // umd是兼容amd/cjs/iife的通用打包格式，适合浏览器
    name: 'bundleName',
    globals: {
      axios: 'axios',
      'element-ui': 'element-ui'
    }
  },
  plugins: [
    babel({
      presets: ["@babel/preset-env"],
      exclude: 'node_modules/**', // 防止打包node_modules下的文件
      runtimeHelpers: true // 使plugin-transform-runtime生效
    }),
    resolve(),
    commonjs(),
    terser({
      compress: {
        pure_funcs: ['console.log'] // 去掉console.log函数,压缩js
      }
    }),
    cleanup() //清除注释
  ],
  external: ['axios', 'element-ui']
};
