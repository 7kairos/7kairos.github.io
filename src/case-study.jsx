import React from 'react'
import { createRoot } from 'react-dom/client'
import { Click } from '@animate-ui/react/primitives/effects/click'
import '@fontsource/ibm-plex-mono/latin-400.css'
import '@fontsource/ibm-plex-mono/latin-500.css'
import content from './content.json'
import caseStudies from './case-studies.json'
import CaseStudyCarousel from './CaseStudyCarousel'
import { getVisitNumber } from './visits'
import { installClickSounds } from './sounds'
import './style.css'

const caseStudiesUrl = '../../?view=case-studies'
const imagesUrl = '../../images/'

function CaseStudySection({ heading, blocks, highlights = [], resource }) {
  const phrases = highlights.map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const pattern = phrases.length ? new RegExp('(' + phrases.join('|') + ')', 'g') : null
  const renderText = (text) => pattern
    ? text.split(pattern).map((part, index) => index % 2 ? <mark key={index}>{part}</mark> : part)
    : text

  return (
    <section className="case-study-section">
      <h2>{heading}</h2>
      {blocks.map((block) => Array.isArray(block) ? (
        <ul key={block[0]}>
          {block.map((item) => <li key={item}>{renderText(item)}</li>)}
        </ul>
      ) : <p key={block}>{renderText(block)}</p>)}
      {resource && (
        <p>
          <a href={imagesUrl + resource.file} className="case-study-nav">{resource.label}</a>
        </p>
      )}
    </section>
  )
}

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
              <a href={caseStudiesUrl} className="case-study-nav">back to case studies</a>
            </div>
          </header>
          {project.figures?.length > 0 && <CaseStudyCarousel figures={project.figures} imagesUrl={imagesUrl} />}
          {project.sections.map((section) => (
            <CaseStudySection key={section.heading} {...section} />
          ))}
          <footer className="case-study-footer">
            <a href={caseStudiesUrl} className="case-study-nav">back to case studies</a>
          </footer>
        </article>
      </main>
    </div>
  )
}

const root = document.getElementById('root')
const project = caseStudies.find(({ slug }) => slug === root.dataset.project)
getVisitNumber()
installClickSounds()
createRoot(root).render(<CaseStudy project={project} />)
