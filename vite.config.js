import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // <--- IMPORTA ESTO

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@core': path.resolve(__dirname, './src/core'),
    },
  },
})