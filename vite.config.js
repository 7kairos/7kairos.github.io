import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import localVisits from './scripts/local-visits.js'

const pages = [
  'index.html',
  'receipt/index.html',
  'works/scam-awareness/index.html',
  'works/rpi-lost-and-found/index.html',
]

export default defineConfig({
  plugins: [localVisits()],
  build: {
    rollupOptions: {
      input: pages.map((page) => fileURLToPath(new URL(page, import.meta.url))),
    },
  },
})
