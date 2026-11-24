import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { extname, join } from 'node:path'
import { build } from 'vite'

rmSync('dist', { recursive: true, force: true })
await build({ base: './', build: { outDir: 'dist/client' } })

const types = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

const assets = {}

function collectAssets(directory, prefix = '') {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    const route = `${prefix}/${entry.name}`
    if (entry.isDirectory()) {
      collectAssets(path, route)
    } else {
      const type = types[extname(entry.name)]
      if (!type) throw new Error(`No content type for ${route}`)
      assets[route] = [type, readFileSync(path).toString('base64')]
    }
  }
}

collectAssets('dist/client')
mkdirSync('dist/server', { recursive: true })
// Bundle the static files into the Worker that serves them.
const worker = readFileSync('server/worker.js', 'utf8')
writeFileSync('dist/server/index.js', `${worker}\nconst siteAssets = ${JSON.stringify(assets)}\n`)
