import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Click } from '@animate-ui/react/primitives/effects/click'
import '@fontsource/ibm-plex-mono/latin-400.css'
import '@fontsource/ibm-plex-mono/latin-500.css'
import content from './content.json'
import Education from './Education'
import EntryList from './EntryList'
import LinkPreview from './LinkPreview'
import caseStudies from './case-studies.json'
import SkyScene from './SkyScene'
import { loadWeather } from './weather'
import { getVisitNumber } from './visits'
import { installClickSounds } from './sounds'
import './style.css'

const { location } = content
const caseStudyEntries = caseStudies.map(({ slug, title, role, year }) => ({
  title: title.toLowerCase(),
  role: role.toLowerCase(),
  year,
  href: `./works/${slug}/`,
}))
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

  return (
    <figure className="weather">
      <SkyScene now={now} location={location} weather={weather} />
      <figcaption className="weather-caption">
        <div className="weather-details">
          <span>{location.label}<span className="separator"> · </span>
            <time dateTime={now.toISOString()}>{localClock.format(now).toLowerCase()}</time>
          </span>
          <div className="weather-reading">
            {weather ? (
              <a href={weather.sourceUrl} className="weather-link" title="weather data from open-meteo">
                {[`${Math.round(weather.temperature)}°f`, weather.condition].filter(Boolean).join(' · ')}
              </a>
            ) : loaded && <span>weather unavailable</span>}
          </div>
        </div>
        <div className="weather-activity">
          <span><span className="now-label">now</span><span className="separator"> · </span>{content.now}</span>
          <LinkPreview className="receipt-link" href="./receipt/" aria-label="about me" preview="( ˘▽˘)っ about me!">
            <img src={`${import.meta.env.BASE_URL}matcha-mug.png`} width="26" height="26" alt="" />
            <span className="mug-steam" aria-hidden="true" />
          </LinkPreview>
        </div>
      </figcaption>
    </figure>
  )
}

function PortfolioSection({ id, label, entries, initiallyOpen }) {
  const [open, setOpen] = useState(initiallyOpen)
  const [openEntries, setOpenEntries] = useState({})

  function toggleSection() {
    if (open) setOpenEntries({})
    setOpen(!open)
  }

  function toggleEntry(title) {
    setOpenEntries((previous) => ({ ...previous, [title]: !previous[title] }))
  }

  return (
    <div className="section">
      <h2 className="section-heading">
        <button className="section-toggle" type="button" aria-expanded={open} aria-controls={id} onClick={toggleSection}>
          {label}
          <span className="toggle-icon" aria-hidden="true" />
        </button>
      </h2>
      <div className={`section-preview disclosure-panel${open ? ' is-open' : ''}`} id={id} inert={!open}>
        <div className="disclosure-inner">
          <EntryList entries={entries} openEntries={openEntries} onToggleEntry={toggleEntry} />
        </div>
      </div>
    </div>
  )
}

function Sections() {
  const view = new URLSearchParams(window.location.search).get('view')

  return (
    <section className="sections" aria-label="portfolio sections">
      {content.sections.map(({ id, label, entries }) => (
        <PortfolioSection
          key={id}
          id={id}
          label={label}
          entries={id === 'case-studies' ? caseStudyEntries : entries}
          initiallyOpen={id === 'case-studies' && (view === 'case-studies' || view === 'works')}
        />
      ))}
    </section>
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
        <section className="intro" aria-label="introduction">
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
            aria-label="replay text animations"
            title="replay text animations"
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
installClickSounds()
createRoot(document.getElementById('root')).render(<App />)
