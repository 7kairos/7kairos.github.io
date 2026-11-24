import React from 'react'
import LinkPreview from './LinkPreview'

function Program({ label, name, url }) {
  return (
    <LinkPreview className="highlight-link" href={url} aria-label={`${label}, ${name}`} preview={name}>
      {label}
    </LinkPreview>
  )
}

export default function Education({ text, programs }) {
  const [itws, cmd] = programs

  return (
    <p>
      {text}{' '}
      <Program {...itws} /> / <Program {...cmd} />.
    </p>
  )
}
