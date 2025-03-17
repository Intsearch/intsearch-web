import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from "path";
import tailwindcss from '@tailwindcss/vite'
import {VitePWA} from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        VitePWA({
            registerType: 'autoUpdate', // 自动更新 Service Worker
            includeAssets: ['favicon.svg', 'icons/icon-192x192.png', 'icons/icon-512x512.png'],
            manifest: {
                name: 'Intsearch',
                short_name: 'Intsearch',
                description: 'Intsearch - Intelligence Search',
                theme_color: '#ffffff',
                background_color: '#ffffff',
                display: 'standalone',
                start_url: '/',
                icons: [
                    {
                        src: 'icons/icon-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: 'icons/icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
            },
            devOptions: {
                enabled: true, // 允许在开发模式下调试 PWA
            },
        }),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src')
        }
    }
})
