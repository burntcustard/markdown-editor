import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
// import { nodePolyfills } from 'vite-plugin-node-polyfills'
import solid from 'vite-plugin-solid'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [solid(), VitePWA({
    registerType: 'autoUpdate',
    injectRegister: false,

    pwaAssets: {
      disabled: false,
      config: true,
    },

    manifest: {
      name: 'burnt\'s Markdown Editor',
      short_name: '.md Edit',
      description: 'A little markdown (.md) editing web app originally created hold TTRPG random encounter info',
      theme_color: '#ffffff',
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
    },

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
})
