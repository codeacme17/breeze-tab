import path from 'node:path'
import react from '@vitejs/plugin-react'
import webExtension from 'vite-plugin-web-extension'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react(),
    webExtension({
      additionalInputs: ['index.html'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
