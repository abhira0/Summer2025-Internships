// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const CODESPACE_NAME = process.env.CODESPACE_NAME;
const CODESPACE_DOMAIN = process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN;
const BACKEND_URL = CODESPACE_NAME 
  ? `https://${CODESPACE_NAME}-5174.${CODESPACE_DOMAIN}`
  : 'http://localhost:5174';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: BACKEND_URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api/v1')
      }
    }
  }
});