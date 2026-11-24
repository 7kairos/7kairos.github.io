import React, { useRef, useState } from 'react'

export default function CaseStudyCarousel({ figures, imagesUrl }) {
  const [active, setActive] = useState(0)
  const gesture = useRef(null)
  const suppressClick = useRef(false)
  const count = figures.length
  const figure = figures[active]

  function move(direction) {
    setActive((index) => (index + direction + count) % count)
  }

  function onKeyDown(event) {
    if (count < 2 || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return
    event.preventDefault()
    move(event.key === 'ArrowLeft' ? -1 : 1)
  }

  function onPointerDown(event) {
    if (!event.isPrimary || event.button !== 0) return
    suppressClick.current = false
    gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY }
  }

  function onPointerUp(event) {
    const start = gesture.current
    if (start?.id !== event.pointerId) return
    gesture.current = null

    const distance = event.clientX - start.x
    const vertical = event.clientY - start.y
    if (count < 2 || Math.abs(distance) < 35 || Math.abs(distance) <= Math.abs(vertical)) return
    suppressClick.current = true
    move(distance < 0 ? 1 : -1)
  }

  function onClickCapture(event) {
    if (!suppressClick.current || event.detail === 0) return
    suppressClick.current = false
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <section className="case-gallery" aria-label="Project images" aria-roledescription="carousel" onKeyDown={onKeyDown}>
      <div
        className="case-gallery-stage"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => { gesture.current = null }}
        onClickCapture={onClickCapture}
        onDragStart={(event) => event.preventDefault()}
      >
        {figures.map(({ image, width, height }, index) => {
          const step = (index - active + count) % count
          const offset = step > count / 2 ? step - count : step
          const distance = Math.abs(offset)

          return (
            <div
              key={image}
              className="case-gallery-card"
              style={{ '--offset': offset, '--distance': distance }}
              data-current={index === active ? '' : undefined}
              aria-hidden="true"
            >
              <img src={imagesUrl + image} alt="" width={width} height={height} decoding="async" draggable="false" />
            </div>
          )
        })}
        <a
          className="case-gallery-open"
          href={imagesUrl + figure.image}
          target="_blank"
          rel="noopener"
          aria-label={`View full-size image in a new tab. ${figure.alt}`}
          draggable="false"
        >
          <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="case-gallery-caption">
        {count > 1 && <button type="button" aria-label="Previous image" onClick={() => move(-1)}>←</button>}
        <p aria-live="polite" aria-atomic="true">{figure.caption}</p>
        {count > 1 && <button type="button" aria-label="Next image" onClick={() => move(1)}>→</button>}
      </div>
      {count > 1 && (
        <div className="case-gallery-dots" role="group" aria-label="Select an image">
          {figures.map(({ image, caption }, index) => (
            <button
              type="button"
              key={image}
              aria-label={`Image ${index + 1} of ${count}. ${caption}`}
              aria-current={index === active ? 'true' : undefined}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      )}
    </section>
  )
}
