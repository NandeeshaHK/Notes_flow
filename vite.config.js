import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: './', // Ensures relative assets resolution on GitHub Pages
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'favicon.svg', 'favicon-32x32.png', 'apple-touch-icon.png', 'logo.svg', 'icons/*.png', 'icons/*.svg'],
      manifest: {
        name: 'GATE Notes Flow - CS & DA Master Revision',
        short_name: 'GATENotesFlow',
        description: 'High-yield formula-ready revision notes for GATE CS & DA with smart navigation, version tracking, and active recall.',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,enc,json}'],
        runtimeCaching: [
          {
            urlPattern: /.*\.enc$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'encrypted-stories-cache',
              expiration: {
                maxEntries: 500,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 Days
              }
            }
          }
        ]
      }
    })
  ]
});
