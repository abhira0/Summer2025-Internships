// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const BACKEND_URL = 'https://jobs-api.abhirao.in'; // Change this to your backend URL

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: BACKEND_URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api/v1'),
      }
    }
  }
});