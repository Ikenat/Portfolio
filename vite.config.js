import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [vue()],
  define: {
    global: {},
  },
  server: {
    cors: true,
    host: true,
    port: '3000',
    hot: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
