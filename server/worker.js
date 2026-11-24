const noStore = { 'Cache-Control': 'no-store' }
// Reuse the visit number when a tab reloads or submits the same token again.
const saveVisit = `
  INSERT INTO visit_sessions (token)
  VALUES (?)
  ON CONFLICT(token) DO UPDATE SET token = excluded.token
  RETURNING id AS number
`

export async function handleVisit(request, db) {
  if (request.method !== 'POST') {
    return new Response(null, { status: 405, headers: { ...noStore, Allow: 'POST' } })
  }

  if (request.headers.get('Content-Type')?.split(';')[0].trim() !== 'application/json') {
    return Response.json({ error: 'Expected JSON' }, { status: 415, headers: noStore })
  }

  const input = await request.json().catch(() => null)
  const token = input?.token
  if (typeof token !== 'string' || !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(token)) {
    return Response.json({ error: 'Invalid visit token' }, { status: 400, headers: noStore })
  }

  try {
    const visit = await db.prepare(saveVisit).bind(token).first()
    return Response.json(visit, { headers: noStore })
  } catch {
    return Response.json({ error: 'Visit counter unavailable' }, { status: 503, headers: noStore })
  }
}

export default {
  fetch(request, env) {
    const url = new URL(request.url)
    if (url.pathname === '/api/visit') return handleVisit(request, env.DB)

    const { pathname } = url
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response(null, { status: 405, headers: { Allow: 'GET, HEAD' } })
    }

    const path = pathname.endsWith('/') ? `${pathname}index.html` : pathname
    const asset = Object.hasOwn(siteAssets, path) ? siteAssets[path] : null
    if (!asset) {
      if (!pathname.endsWith('/') && Object.hasOwn(siteAssets, `${pathname}/index.html`)) {
        url.pathname = `${pathname}/`
        return Response.redirect(url, 308)
      }
      return new Response('Not found', { status: 404 })
    }

    const [type, data] = asset
    const content = request.method === 'HEAD' ? null : Uint8Array.from(atob(data), (byte) => byte.charCodeAt(0))
    return new Response(content, {
      headers: {
        'Content-Type': type,
        'Cache-Control': pathname.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : 'no-cache',
      },
    })
  },
}
