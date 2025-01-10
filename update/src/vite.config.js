// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    hmr: {
      host: `${process.env.CODESPACE_NAME}-5173.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}`,
      protocol: 'wss',
      clientPort: 443
    },
    proxy: {
      '/api': {
        target: `http://${process.env.CODESPACE_NAME}-5174.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}`,
        changeOrigin: true,
        secure: false,
        ws: true
      }
    }
  }
});