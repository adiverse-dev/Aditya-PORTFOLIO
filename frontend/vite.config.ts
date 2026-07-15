import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"


// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://127.0.0.1:3001',
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
