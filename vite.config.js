import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: "Vow for You",
                short_name: "VFY",
                description: "Anonymous messages",
                theme_color: "#ffffff",
                background_color: "#ffffff",
                display: "standalone",
                start_url: "/",
                icons: [{
                        src: "/icon/icon_192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "/icon/icon_512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                    {
                        src: "/icon/icon_144.png",
                        sizes: "144x144",
                        type: "image/png",
                    },
                ],
                screenshots: [{
                        src: "/screenshots/screenshot1.png",
                        sizes: "1080x1920",
                        type: "image/png",
                        form_factor: "narrow",
                    },
                    {
                        src: "/screenshots/screenshot2.png",
                        sizes: "720x1280",
                        type: "image/png",
                        form_factor: "narrow",
                    },
                    {
                        src: "/screenshots/screenshot3.png",
                        sizes: "1920x1080",
                        type: "image/png",
                        form_factor: "wide",
                    },
                    {
                        src: "/screenshots/screenshot4.png",
                        sizes: "1280x720",
                        type: "image/png",
                        form_factor: "wide",
                    },
                ],
                protocol_handlers: [{
                        protocol: "web+vfy",
                        url: "/?section=home&s=%s",
                    },
                    {
                        protocol: "web+vfyprofile",
                        url: "/?section=profile&id=%s",
                    },
                    {
                        protocol: "web+vfylogin",
                        url: "/?section=login&s=%s",
                    },
                    {
                        protocol: "web+vfysignup",
                        url: "/?section=signup&s=%s",
                    },
                    {
                        protocol: "web+vfymessage",
                        url: "/?section=vfymessage&share=vfymsg&shareid=%s",
                    },
                ],
            },
            injectManifest: {
                swSrc: './public/sw.js', // Reference to your custom service worker file
                swDest: 'dist/sw.js',
            },
            workbox: {
                clientsClaim: true,
                skipWaiting: true,
            },
        }),
    ],
});