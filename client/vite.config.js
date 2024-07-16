// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist/index.html', // Asegúrate de que este directorio coincida con el especificado en vercel.json
  },
  server: {
    port: 5173,
  },
});
