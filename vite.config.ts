import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    if (mode === 'development') {
        return {
            plugins: [react()],
        };
    }

    if (mode === 'production') {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        return {
            server: {
                https: true,
            },
            plugins: [react(), mkcert()],
        };
    }

    return {
        plugins: [react()],
    };
});
