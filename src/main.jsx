import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Click } from '@animate-ui/react/primitives/effects/click'
import '@fontsource/ibm-plex-mono/latin-400.css'
import '@fontsource/ibm-plex-mono/latin-500.css'
import content from './content.json'
import Education from './Education'
import EntryList from './EntryList'
import projects from './projects.json'
import { drawSky, getSky } from './sky'
import { loadWeather } from './weather'
import { getVisitNumber } from './visits'
import './style.css'

const { location } = content
const workEntries = projects.map(({ slug, title, role, year }) => ({ title, role, year, href: `./works/${slug}/` }))
const localClock = new Intl.DateTimeFormat('en-US', {
  timeZone: location.timeZone,
  hour: 'numeric',
  minute: '2-digit',
})

function typingDelay(text, index) {
  const character = text[index - 1]
  if (character === '\n') return 155
  if (character === ' ') return 80
  if (character === ':') return 115

  const start = Math.max(text.lastIndexOf(' ', index - 1), text.lastIndexOf('\n', index - 1))
  const position = index - start - 1
  return (position === 1 ? 76 : 33) + ((index * 17) % 33)
}

function Typewriter({ greeting, aside }) {
  const text = `${greeting}  ${aside}`
  const [length, setLength] = useState(0)

  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    let timer

    function startTyping() {
      clearTimeout(timer)
      if (motion.matches) {
        setLength(text.length)
        return
      }

      let index = 0
      setLength(0)
      function type() {
        index += 1
        setLength(index)
        if (index < text.length) timer = setTimeout(type, typingDelay(text, index))
      }

      timer = setTimeout(type, 235)
    }

    startTyping()
    motion.addEventListener('change', startTyping)
    return () => {
      clearTimeout(timer)
      motion.removeEventListener('change', startTyping)
    }
  }, [text])

  return (
    <h1 className="greeting">
      <span className="greeting-size">
        {greeting}<span className="greeting-aside">{text.slice(greeting.length)}</span>
      </span>
      <span className="typing" aria-hidden="true">
        {greeting.slice(0, length)}
        <span className="greeting-aside">{text.slice(greeting.length, length)}</span>
        <span className={length === text.length ? 'caret caret-idle' : 'caret'} />
      </span>
    </h1>
  )
}

function Weather() {
  const [now, setNow] = useState(() => new Date())
  const [weather, setWeather] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const canvas = useRef(null)

  useEffect(() => {
    const tick = () => setNow(new Date())
    const clock = setInterval(tick, 30_000)
    document.addEventListener('visibilitychange', tick)
    return () => {
      clearInterval(clock)
      document.removeEventListener('visibilitychange', tick)
    }
  }, [])

  useEffect(() => {
    let active = true
    let controller
    let timeout

    async function refresh() {
      clearTimeout(timeout)
      controller?.abort()
      const request = new AbortController()
      controller = request
      const deadline = setTimeout(() => request.abort(), 8000)
      timeout = deadline
      try {
        const current = await loadWeather(location, request.signal)
        if (active && controller === request) setWeather(current)
      } catch {
        if (active && controller === request) setWeather(null)
      } finally {
        clearTimeout(deadline)
        if (active && controller === request) setLoaded(true)
      }
    }

    refresh()
    const interval = setInterval(refresh, 15 * 60_000)
    return () => {
      active = false
      clearInterval(interval)
      clearTimeout(timeout)
      controller?.abort()
    }
  }, [])

  useEffect(() => {
    drawSky(canvas.current, getSky(now, location, weather?.cloud))
  }, [now, weather])

  return (
    <figure className="weather">
      <div className="sky">
        <canvas ref={canvas} width="720" height="464" aria-hidden="true" />
      </div>
      <figcaption className="weather-caption">
        <div className="weather-details">
          <span>{location.label}<span className="separator"> · </span>
            <time dateTime={now.toISOString()}>{localClock.format(now).toLowerCase()}</time>
          </span>
          <div className="weather-reading">
            {weather ? (
              <a href={weather.sourceUrl} className="weather-link" title="Weather data from Open-Meteo">
                {[`${weather.temperature}°F`, weather.condition].filter(Boolean).join(' · ')}
              </a>
            ) : loaded && <span>weather unavailable</span>}
          </div>
        </div>
        <div className="weather-activity">
          <span><span className="now-label">now</span><span className="separator"> · </span>{content.now}</span>
          <a className="receipt-link" href="./receipt/" aria-label="Open the About receipt" title="Open the About receipt">
            <img src={`${import.meta.env.BASE_URL}matcha-mug.png`} width="26" height="26" alt="" />
            <span className="mug-steam" aria-hidden="true" />
          </a>
        </div>
      </figcaption>
    </figure>
  )
}

function Sections() {
  const [openSections, setOpenSections] = useState(() => ({
    works: new URLSearchParams(window.location.search).get('view') === 'works',
  }))

  function toggleSection(id) {
    setOpenSections((previous) => ({ ...previous, [id]: !previous[id] }))
  }

  return (
    <div className="sections" role="group" aria-label="Portfolio sections">
      {content.sections.map(({ id, label, entries }) => (
        <div className="section" key={id}>
          <button
            className="section-toggle"
            type="button"
            aria-expanded={Boolean(openSections[id])}
            aria-controls={id}
            onClick={() => toggleSection(id)}
          >
            {label}
            <span className="toggle-icon" aria-hidden="true" />
          </button>
          <div className="section-preview" id={id} hidden={!openSections[id]}>
            <EntryList entries={id === 'works' ? workEntries : entries} />
          </div>
        </div>
      ))}
    </div>
  )
}

function App() {
  const [replay, setReplay] = useState(0)

  return (
    <div className="page">
      <Click variant="ring" color="rgb(73 98 69 / 45%)" size={40} />
      <header className="masthead">
        <span className="name">{content.name}</span>
        <span className="year">{content.year}</span>
      </header>
      <main className="layout">
        <section className="intro" aria-label="Introduction">
          <React.Fragment key={replay}>
            <Typewriter greeting={content.greeting} aside={content.greetingAside} />
            <div className="bio">
              <Education text={content.education} programs={content.programs} />
              <p>{content.focus}</p>
            </div>
          </React.Fragment>
          <button
            className="replay"
            type="button"
            aria-label="Replay text animations"
            title="Replay text animations"
            onClick={() => setReplay((count) => count + 1)}
          >
            <span aria-hidden="true">↻</span>
          </button>
        </section>
        <Weather />
        <Sections />
      </main>
    </div>
  )
}

getVisitNumber()
createRoot(document.getElementById('root')).render(<App />)
