import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // scripts/prerender.mjs uses it to link each page's own CSS and JS chunks into its HTML.
  build: { ssrManifest: true },
})
