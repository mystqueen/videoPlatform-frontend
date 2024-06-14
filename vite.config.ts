import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import envCompatible from 'vite-plugin-env-compatible';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), envCompatible()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    define: {
        'process.env': {},
    },
});