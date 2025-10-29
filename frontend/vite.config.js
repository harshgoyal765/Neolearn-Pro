import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    proxy: {
      "/api": {
        // target: "https://neolearn-pro.onrender.com",
        target: "https://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});