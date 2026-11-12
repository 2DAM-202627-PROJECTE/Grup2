import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

function htmlPlantilles() {
  return {
    name: 'html-plantilles',
    enforce: 'pre',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html.replace(/<!--\s*include:([a-z-]+)\s*-->/g, (_, name) => {
          const file = `${rootDir}src/plantilles/${name}.html`
          try {
            return readFileSync(file, 'utf8').trimEnd()
          } catch {
            throw new Error(`Plantilla no trobada: ${file}`)
          }
        })
      },
    },
    handleHotUpdate({ file, server }) {
      if (file.includes('/src/plantilles/')) {
        server.ws.send({ type: 'full-reload' })
        return []
      }
    },
  }
}

export default defineConfig({
  base: '/Grup2/',
  plugins: [htmlPlantilles(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'about.html',
        faq: 'faq.html',
        login: 'login.html',
        register: 'register.html',
      },
    },
  },
})
