import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
      '/predict': 'http://localhost:5000',
      '/uploads': 'http://localhost:5000',
      '/login': {
        target: 'http://localhost:5000',
        bypass: (req, res, options) => {
          if (req.method !== 'POST') {
            return req.url;
          }
        }
      },
      '/register': {
        target: 'http://localhost:5000',
        bypass: (req, res, options) => {
          if (req.method !== 'POST') {
            return req.url;
          }
        }
      }
    }
  }
})

