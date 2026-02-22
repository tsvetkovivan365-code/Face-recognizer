import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/v2': {
        target: 'https://api.clarifai.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v2/, '/v2'),
      },
    },
  }
  
})
