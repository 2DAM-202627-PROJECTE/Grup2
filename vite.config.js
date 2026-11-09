import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/Grup2/',
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'about.html',
        faq: 'faq.html',
        style: 'guia-estil.html',
        login: 'login.html',
        register: 'register.html',
      },
    },
  },
})
