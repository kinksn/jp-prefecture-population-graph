import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.ts'],
    include: ['./src/**/*.test.{ts,tsx}'],
    testTimeout: 10000,
    deps: {
      inline: [/@tanstack\/react-query/],
    },
    coverage: {
      reporter: ['text', 'html'],
      exclude: ['**/node_modules/**'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
