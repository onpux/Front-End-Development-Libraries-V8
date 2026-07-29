import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // Subpath de GitHub Pages: https://onpux.github.io/Front-End-Development-Libraries-V8/
  base: '/Front-End-Development-Libraries-V8/',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: ['node_modules/', 'tests/setup.js'],
    },
  },
});
