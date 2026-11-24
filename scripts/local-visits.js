import { readFileSync } from 'node:fs'
import { handleVisit } from '../server/worker.js'

async function configureVisitMiddleware(server) {
  const { DatabaseSync } = await import('node:sqlite')
  const sqlite = new DatabaseSync(':memory:')
  sqlite.exec(readFileSync(new URL('../drizzle/0000_visit_sessions.sql', import.meta.url), 'utf8'))
  const db = {
    prepare(sql) {
      return {
        bind(token) {
          return { first: () => sqlite.prepare(sql).get(token) }
        },
      }
    },
  }

  server.middlewares.use('/api/visit', async (req, res) => {
    const hasBody = req.method === 'POST'
    const request = new Request('http://localhost/api/visit', {
      method: req.method,
      headers: { 'Content-Type': req.headers['content-type'] ?? '' },
      ...(hasBody && { body: req, duplex: 'half' }),
    })
    const result = await handleVisit(request, db)
    res.writeHead(result.status, Object.fromEntries(result.headers))
    res.end(await result.text())
  })
}

export default function localVisits() {
  return {
    name: 'local-visit-counter',
    configureServer: configureVisitMiddleware,
    configurePreviewServer: configureVisitMiddleware,
  }
}
