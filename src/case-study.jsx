import React from 'react'
import { createRoot } from 'react-dom/client'
import { Click } from '@animate-ui/react/primitives/effects/click'
import '@fontsource/ibm-plex-mono/latin-400.css'
import '@fontsource/ibm-plex-mono/latin-500.css'
import content from './content.json'
import projects from './projects.json'
import { getVisitNumber } from './visits'
import './style.css'

const worksUrl = '../../?view=works'

function CaseStudy({ project }) {
  return (
    <div className="page">
      <Click variant="ring" color="rgb(73 98 69 / 45%)" size={40} />
      <header className="masthead">
        <a href="../../" className="name home-link">{content.name}</a>
        <span className="year">{content.year}</span>
      </header>
      <main className="case-study">
        <article>
          <header className="case-study-header">
            <h1>{project.title}</h1>
            <div className="case-study-meta">
              <p>{project.role}<span className="separator"> · </span><time dateTime={project.year}>{project.year}</time></p>
              <a href={worksUrl} className="case-study-nav">back to works</a>
            </div>
          </header>
          {project.sections.map(({ heading, blocks }) => (
            <section className="case-study-section" key={heading}>
              <h2>{heading}</h2>
              {blocks.map((block) => Array.isArray(block) ? (
                <ul key={block[0]}>
                  {block.map((item) => <li key={item}>{item}</li>)}
                </ul>
              ) : <p key={block}>{block}</p>)}
            </section>
          ))}
          <footer className="case-study-footer">
            <a href={worksUrl} className="case-study-nav">back to works</a>
          </footer>
        </article>
      </main>
    </div>
  )
}

const root = document.getElementById('root')
const project = projects.find(({ slug }) => slug === root.dataset.project)
getVisitNumber()
createRoot(root).render(<CaseStudy project={project} />)
