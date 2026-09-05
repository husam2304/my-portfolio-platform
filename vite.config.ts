import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { AUTH_STORAGE_KEYS } from './src/utiles/keys/auth.ts'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),

  ],
  server: {
    proxy: {
      '/api': {
        target: AUTH_STORAGE_KEYS.Base_URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
        ws: true, // Enable WebSocket support
      },
    },
  },
})
