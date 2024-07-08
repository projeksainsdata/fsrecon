import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            strategies: 'injectManifest',
            filename: 'sw.js',
            injectRegister: false,
            devOptions: {
                enabled: true,
                type: 'module',
            },
            workbox: {
                skipWaiting: true,
                clientsClaim: true,
                runtimeCaching: [
                    {
                        urlPattern: /^https?.*/,
                        handler: 'StaleWhileRevalidate',
                        options: {
                            cacheName: 'offlineCache',
                            expiration: {
                                maxEntries: 200,
                            },
                        },
                    },
                ],

            },
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
