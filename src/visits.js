const tokenKey = 'portfolio-visit-token'
let visitToken
let pendingVisit

function sessionToken() {
  if (visitToken) return visitToken

  try {
    visitToken = sessionStorage.getItem(tokenKey)
    if (!visitToken) {
      visitToken = crypto.randomUUID()
      sessionStorage.setItem(tokenKey, visitToken)
    }
  } catch {
    visitToken ??= crypto.randomUUID()
  }
  return visitToken
}

async function registerVisit() {
  const response = await fetch('/api/visit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: sessionToken() }),
    keepalive: true,
  })
  if (!response.ok) throw new Error('Visit counter unavailable')

  const { number } = await response.json()
  if (!Number.isSafeInteger(number)) throw new Error('Invalid visit number')
  return number
}

export function getVisitNumber() {
  if (import.meta.env.MODE === 'pages') return Promise.resolve(null)

  pendingVisit ??= registerVisit().catch(() => {
    pendingVisit = undefined
    return null
  })
  return pendingVisit
}
