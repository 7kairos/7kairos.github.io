import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Popover } from '@base-ui/react/popover'
import { drawSky, getSky } from './sky'

const width = 720
const height = 464
const messages = {
  morning: ['good morning!', "it's a bit early, isn't it?", 'had a coffee yet?'],
  afternoon: ['good afternoon.', "what's for lunch?", 'hmm.. time for a nap.'],
  evening: ["lovely evening, isn't it?", 'how was your day?'],
  night: ["isn't it a bit late?", 'night owl, are we?', 'i love the nighttime quiet.'],
}

function getPeriod(date, timeZone) {
  const hour = Number(new Intl.DateTimeFormat('en-GB', {
    timeZone, hour: '2-digit', hourCycle: 'h23',
  }).format(date))

  if (hour < 6 || hour >= 23) return 'night'
  if (hour < 12) return 'morning'
  if (hour < 17) return 'afternoon'
  return 'evening'
}

export default function SkyScene({ now, location, weather }) {
  const canvas = useRef(null)
  const previous = useRef(null)
  const [message, setMessage] = useState('')
  const cloud = weather?.cloud
  const sky = useMemo(() => getSky(now, location, cloud), [now, location, cloud])

  useEffect(() => {
    drawSky(canvas.current, sky)
  }, [sky])

  function handleOpenChange(open) {
    if (!open) return

    const period = getPeriod(new Date(), location.timeZone)
    const lineup = [...messages[period]]
    if (weather?.temperature < 40) lineup.push("brr.. it's cold out!")
    if (weather?.rainy) lineup.push('i love the sound of rain.')

    const lastIndex = previous.current?.period === period ? lineup.indexOf(previous.current.message) : -1
    const next = lineup[(lastIndex + 1) % lineup.length]
    previous.current = { period, message: next }
    setMessage(next)
  }

  return (
    <div className="sky">
      <canvas ref={canvas} width={width} height={height} aria-hidden="true" />
      <Popover.Root onOpenChange={handleOpenChange}>
        <Popover.Trigger
          className="sky-dot"
          aria-label={sky.daylight ? 'a message from the sun' : 'a message from the moon'}
          style={{
            left: `${sky.diskX * 100}%`,
            top: `${sky.diskY * 100}%`,
            '--dot-width': `${sky.diskRadius * 2 * height / width * 100}%`,
          }}
          openOnHover
          delay={0}
        />
        <Popover.Portal>
          <Popover.Positioner className="link-preview-positioner" side="top" sideOffset={8} collisionPadding={12}>
            <Popover.Popup className="link-preview-popup" aria-label="a message from the sky" initialFocus={false}>
              <Popover.Description className="sky-message">{message}</Popover.Description>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    </div>
  )
}
