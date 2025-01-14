import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                src: '/manifest.json', // Point to the external manifest file
            },
            workbox: {
                swSrc: '/sw.js', // Point to the external service worker file
                clientsClaim: true,
                skipWaiting: true,
            }
        })
    ]
});