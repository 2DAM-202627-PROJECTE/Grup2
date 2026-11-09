import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/2DAM-202627-PROJECTE/Grup2/',
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
