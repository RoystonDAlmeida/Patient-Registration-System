import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  // Server configuration
  server: {
    host: "::",
    port: 8080,
    strictPort: true, // Fail if port is in use
    hmr: {
      overlay: true, // Show errors as overlay
    },
  },
  
  plugins: [
    react({
      // Enable SWC for faster compilation
      swcOptions: {
        jsc: {
          target: 'es2022',
          parser: {
            syntax: 'typescript',
            tsx: true,
          },
          transform: {
            react: {
              runtime: 'automatic',
              development: mode !== 'production',
              refresh: mode !== 'production',
            },
          },
        },
      },
    }),
  ].filter(Boolean),

  // Optimize dependencies
  optimizeDeps: {
    exclude: ['@electric-sql/pglite'],
    include: [
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-label',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-slot',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toast',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-icons',
      'lucide-react',
      'react-hook-form',
      'date-fns',
      'sonner',
      'clsx',
      'tailwind-merge',
      'class-variance-authority',
      'tailwindcss-animate'
    ],
  },

  // Resolve aliases
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // Build configuration
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: mode !== 'production',
    reportCompressedSize: false, // Faster builds
    chunkSizeWarningLimit: 1000,
    
    // Terser options for better minification
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
      },
    },

    // Rollup options for better chunking
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-components': [
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-label',
            '@radix-ui/react-scroll-area',
            '@radix-ui/react-slot',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-icons',
            'lucide-react',
            'clsx',
            'tailwind-merge',
            'class-variance-authority',
            'tailwindcss-animate'
          ],
          'form-utils': ['react-hook-form'],
          'date-utils': ['date-fns'],
          'notifications': ['sonner'],
          'database': ['@electric-sql/pglite'],
          'query-client': ['@tanstack/react-query']
        },
      },
    },
  },

  // CSS optimization
  css: {
    devSourcemap: mode !== 'production',
    modules: {
      localsConvention: 'camelCase',
    },
  },
}));
