import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
    server: {
    host: '0.0.0.0',   // phone se access allow karega
    port: 5173         // ya jo port tum use kar rahi ho
  }
})