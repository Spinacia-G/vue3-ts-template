import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import autoprefixer from 'autoprefixer'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import svgLoader from 'vite-svg-loader'
import { visualizer } from 'rollup-plugin-visualizer'
import BuildLogger from './plugins/build-logger'

const pathSrc = path.resolve(__dirname, 'src')

// https://vite.dev/config/

/** @type {import('vite').UserConfig} */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: env.VITE_BASE,
    resolve: {
      alias: {
        '@': pathSrc,
      },
    },
    plugins: [
      vue(),
      tailwindcss(),
      AutoImport({
        include: [/\.vue$/, /\.vue\?vue/],
        imports: ['vue'],
        resolvers: [ElementPlusResolver()],
        dirs: ['src/stores'],
        dts: 'src/auto-imports.d.ts',
        vueTemplate: true,
        eslintrc: {
          enabled: false,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true,
        },
      }),
      Components({
        extensions: ['vue'],
        include: [/\.vue$/, /\.vue\?vue/],
        resolvers: [ElementPlusResolver()],
        dts: 'src/components.d.ts',
      }),
      ElementPlus({ defaultLocale: 'zh-cn' }),
      svgLoader(),
      visualizer(),
      BuildLogger(),
    ],
    css: {
      postcss: {
        plugins: [autoprefixer()],
      },
    },
    server: {
      proxy: {
        [env.VITE_BACKEND_API]: {
          target: 'http://localhost:13766/',
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(new RegExp(`^${env.VITE_BACKEND_API}`), ''),
        },
      },
    },
  }
})
