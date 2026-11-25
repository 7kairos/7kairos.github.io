import React from 'react'

export default function EntryList({ entries }) {
  return (
    <ul className="entry-list">
      {entries.map(({ title, role, year, href }) => {
        const Row = href ? 'a' : 'div'
        return (
          <li key={title}>
            <Row className="entry-row" href={href}>
              <span className="entry-title">{title}</span>
              {year && <span className="entry-year">{year}</span>}
              {role && <span className="entry-role">{role}</span>}
            </Row>
          </li>
        )
      })}
    </ul>
  )
}
