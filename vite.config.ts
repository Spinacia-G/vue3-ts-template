import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import eslintPlugin from 'vite-plugin-eslint'

const pathSrc = path.resolve(__dirname, 'src')
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      include: [
        'src/**/*.ts',
        'src/**/*.vue',
        'src/*.ts',
        'src/*.vue'
      ],
      cache: false,
      fix: true
    })
  ],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      '@': pathSrc
    }
  }
})
