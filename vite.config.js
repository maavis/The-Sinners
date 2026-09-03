import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    'process.env': {}
  },
  envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
  server: {
    port: 5173
  }
});
