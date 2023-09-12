import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const BASE_URL = process.env.VITE_BASE_URL || 'http://localhost:8084/';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: BASE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  },
  test: {
    globals: true,
    environment: 'happy-dom'
  },
})
