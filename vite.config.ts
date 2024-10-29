import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Create a single bundle for the widget
        entryFileNames: 'app.js',
        format: 'iife',
        name: 'ClickiReferralWidget'
      }
    },
    // Ensure small bundle size
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
});