import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  // Server developmnent port
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ].filter(Boolean),
  optimizeDeps: {
    exclude: ['@electric-sql/pglite'],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'esnext', // Use modern JS for better performance
    minify: 'terser', // Use terser for minification
    sourcemap: mode !== 'production', // Generate sourcemap only in development mode
    rollupOptions: {
      output: {
        manualChunks: { // Split vendor and UI libraries into seperate chunks for better caching
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-icons', 'lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,  // Warning threshold for chunk sizez
  },
}));
