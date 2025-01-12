// src/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const BACKEND_URL = 'http://localhost:5174';
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Frontend runs on 5173
    proxy: {
      '/api': {
        target: BACKEND_URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api/v1'), // Ensure backend expects /api/v1
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log(`Proxying ${req.method} request to: ${BACKEND_URL}${req.url}`);
          });
          proxy.on('error', (err, req, res) => {
            console.error('Proxy error:', err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Proxy error');
          });
        },
      },
    },
  },
});
