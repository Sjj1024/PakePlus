import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import buildTimePlugin from './scripts/buildtime'
import { visualizer } from 'rollup-plugin-visualizer'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'

const host = process.env.TAURI_DEV_HOST

export default defineConfig(async ({ command }) => ({
    plugins: [
        vue(),
        buildTimePlugin(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
        visualizer({
            open: false,
            filename: 'stats.html',
            gzipSize: true,
            brotliSize: true,
        }),
    ],
    clearScreen: false,
    server: {
        port: 1420,
        strictPort: true,
        host: command === 'serve' ? '0.0.0.0' : host || false,
        hmr: host
            ? {
                  protocol: 'ws',
                  host,
                  port: 1421,
              }
            : undefined,
        watch: {
            ignored: ['**/src-tauri/**'],
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@root': path.resolve(__dirname, './'),
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    codemirror: ['codemirror'],
                    pinia: ['pinia'],
                    router: ['vue-router'],
                    vue: ['vue'],
                    element: ['element-plus'],
                    largeLibrary: ['axios'],
                },
            },
        },
    },
}))
