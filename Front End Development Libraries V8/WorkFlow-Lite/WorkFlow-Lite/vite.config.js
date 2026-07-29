import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // Si tu repo se llama distinto a "WorkFlow-Lite", cambia esta línea.
  // Si es <usuario>.github.io (sitio raíz), bórrala o déjala como ''.
  base: '/WorkFlow-Lite/',
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
