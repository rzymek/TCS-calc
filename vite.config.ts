/// <reference types="vitest" />
import {defineConfig} from 'vite'
import preact from '@preact/preset-vite'
import {VitePWA} from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    test: {
        environment: "node",
    },
    plugins: [
        preact(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: "Rebel Fury Calculator",
                id: 'rebel-fury-calc',
                short_name: 'rebel-fury calc',
                description: "Rebel Fury Calculator",
                theme_color: "#747577",
                orientation: "portrait",
                icons: [{
                    src: "pwa-64x64.png",
                    sizes: "64x64",
                    type: "image/png",
                    purpose: "any"
                }, {
                    src: "pwa-192x192.png",
                    sizes: "192x192",
                    type: "image/png",
                    purpose: "any"
                }, {
                    src: "pwa-512x512.png",
                    sizes: "512x512",
                    type: "image/png",
                    purpose: "any"
                }, {
                    src: "maskable-icon-512x512.png",
                    sizes: "512x512",
                    type: "image/png",
                    purpose: "maskable"
                }]
            }
        })
    ],
})
