import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        eslintPlugin(),
        svgLoader({
            defaultImport: 'url',
            svgo: false,
        }),
    ],

    assetsInclude: ['**/*.glb', '**/*.env'],

    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@simulator': path.resolve(__dirname, './simulator'),
            '@img': path.resolve(__dirname, './public/images'),
        },
    },
});
