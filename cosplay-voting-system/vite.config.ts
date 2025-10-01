import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Permite todos os hosts
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '.ngrok.io',
      '.ngrok-free.dev',
      '.loca.lt',
      'modern-waves-wave.loca.lt',
      'cosplay-frontend.loca.lt',
      'avifaunally-psoatic-shantell.ngrok-free.dev'
    ],
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
