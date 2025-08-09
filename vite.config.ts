import path from 'node:path'
import react from '@vitejs/plugin-react'
import webExtension, { readJsonFile } from 'vite-plugin-web-extension'
import { defineConfig } from 'vite'

function generateManifest() {
  const manifest = readJsonFile('manifest.json')
  const pkg = readJsonFile('package.json')
  return {
    name: 'Breeze Tab',
    auther: pkg.author,
    description: pkg.description,
    version: pkg.version,
    ...manifest,
  }
}

export default defineConfig({
  plugins: [
    react(),
    webExtension({
      manifest: generateManifest,
      // Skip online schema validation to avoid network/redirect issues during build
      skipManifestValidation: true,
      additionalInputs: ['index.html'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
