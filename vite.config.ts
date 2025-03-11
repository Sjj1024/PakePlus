import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'

const host = process.env.TAURI_DEV_HOST

// https://vitejs.dev/config/
export default defineConfig(async () => ({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
        visualizer({
            open: false, // 构建完成后会自动打开浏览器，显示可视化报告。如果您不想自动打开，可以设置为 false。
            filename: 'stats.html', // 生成的报告文件名称
            gzipSize: true, // 显示各文件在经过 gzip 压缩后的大小
            brotliSize: true, // 显示各文件在经过 brotli 压缩后的大小
        }),
    ],
    // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
    //
    // 1. prevent vite from obscuring rust errors
    clearScreen: false,
    // 2. tauri expects a fixed port, fail if that port is not available
    server: {
        port: 1420,
        strictPort: true,
        host: host || false,
        hmr: host
            ? {
                  protocol: 'ws',
                  host,
                  port: 1421,
              }
            : undefined,
        watch: {
            // 3. tell vite to ignore watching `src-tauri`
            ignored: ['**/src-tauri/**'],
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    codemirror: ['codemirror'],
                    pinia: ['pinia'],
                    router: ['vue-router'],
                    // 将 vue 相关的模块打包到单独的 chunk
                    vue: ['vue'],
                    element: ['element-plus'],
                    // 将大型库或组件单独打包
                    largeLibrary: ['axios'],
                },
            },
        },
    },
}))
