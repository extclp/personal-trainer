import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const Unocss = await import('unocss/vite').then(i => i.default)
  return {
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
    plugins: [
      uni(),
      Unocss(),
      AutoImport({
        imports: ['vue'],
      }),
    ],
    server: {
      proxy: {
        '/api': {
          target: 'https://tutor.wanchenye.top',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
