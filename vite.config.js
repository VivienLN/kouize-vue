import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ command, mode }) => ({
  plugins: [vue()],
  build: {
    emptyOutDir: false,
  },
  server: {
    host: true,
    port: 3000,
    watch: {
      usePolling: true
    }
  }
}))