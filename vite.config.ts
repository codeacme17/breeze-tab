import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import webExtension, { readJsonFile } from 'vite-plugin-web-extension'
import path from 'node:path'

function generateManifest() {
  const manifest = readJsonFile('src/manifest.json')
  const pkg = readJsonFile('package.json')
  return {
    name: 'Breeze Tab',
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
      additionalInputs: ['src/main.html'],
    }),
  ],
  resolve: {
    alias: {
      // In dev mode, make sure fast refresh works
      '/@react-refresh': path.resolve(
        'node_modules/@vitejs/plugin-react-swc/refresh-runtime.js'
      ),
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
