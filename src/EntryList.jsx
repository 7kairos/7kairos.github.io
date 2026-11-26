import React, { useId } from 'react'

function EntryInfo({ title, role, year }) {
  return (
    <>
      <span className="entry-title">{title}</span>
      {year && <span className="entry-year">{year}</span>}
      {role && <span className="entry-role">{role}</span>}
    </>
  )
}

function EntryDisclosure({ entry, open, onToggle }) {
  const panelId = useId()

  return (
    <div className="entry-details">
      <button className="entry-row" type="button" aria-expanded={open} aria-controls={panelId} onClick={onToggle}>
        <EntryInfo {...entry} />
        <span className="toggle-icon" aria-hidden="true" />
      </button>
      <div className={open ? 'disclosure-panel is-open' : 'disclosure-panel'} id={panelId} inert={!open}>
        <div className="disclosure-inner">
          <p className="entry-description">{entry.description}</p>
        </div>
      </div>
    </div>
  )
}

export default function EntryList({ entries, openEntries, onToggleEntry }) {
  return (
    <ul className="entry-list">
      {entries.map((entry) => {
        const { title, href, description } = entry
        const Row = href ? 'a' : 'div'
        return (
          <li key={title}>
            {description ? (
              <EntryDisclosure entry={entry} open={Boolean(openEntries[title])} onToggle={() => onToggleEntry(title)} />
            ) : (
              <Row className="entry-row" href={href}>
                <EntryInfo {...entry} />
              </Row>
            )}
          </li>
        )
      })}
    </ul>
  )
}
