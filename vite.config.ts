/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

const isAnalyze = process.env.npm_lifecycle_event === 'analyze';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    isAnalyze &&
      visualizer({
        open: true,
        filename: 'dist/stats.html',
        gzipSize: true,
        brotliSize: true,
      }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    host: 'localhost',
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'geolocation=(), camera=(), microphone=()',
    },
  },
  build: {
    target: 'es2022',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'vendor-i18n': ['react-i18next', 'i18next'],
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
    css: false,
  },
});
