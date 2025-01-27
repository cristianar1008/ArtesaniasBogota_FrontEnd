import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Asegura que las rutas de los recursos sean relativas
  build: {
    outDir: 'dist', // Carpeta donde se generará la build
    assetsDir: 'assets', // Carpeta donde se colocarán los recursos estáticos
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    host: '0.0.0.0',  // Permitir conexiones externas
    port: process.env.PORT || 4173,  // Usar el puerto proporcionado por Render o el predeterminado
  },
});

