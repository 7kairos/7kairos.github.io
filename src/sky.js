import SunCalc from 'suncalc'

const clamp = (value) => Math.min(1, Math.max(0, value))
const lerp = (start, end, amount) => start + (end - start) * amount
const smooth = (value) => value * value * (3 - 2 * value)
const mix = (from, to, amount) => from.map((value, i) => lerp(value, to[i], amount))

const palettes = {
  night: {
    zenith: [21, 47, 57], blue: [58, 103, 112], horizon: [171, 170, 125],
    land: [27, 48, 42], far: [64, 91, 73], light: [236, 238, 190],
  },
  dawn: {
    zenith: [66, 82, 125], blue: [145, 132, 161], horizon: [251, 196, 151],
    land: [65, 77, 70], far: [113, 115, 110], light: [255, 244, 202],
  },
  day: {
    zenith: [66, 130, 152], blue: [115, 173, 177], horizon: [231, 228, 178],
    land: [53, 83, 59], far: [110, 142, 104], light: [255, 253, 215],
  },
  dusk: {
    zenith: [70, 73, 119], blue: [176, 123, 150], horizon: [249, 183, 130],
    land: [53, 60, 62], far: [113, 101, 113], light: [255, 232, 182],
  },
}

let cachedDay
let cachedTimes
const hour = 60 * 60 * 1000

function getSunTimes(now, location) {
  const localDate = new Intl.DateTimeFormat('en-CA', { timeZone: location.timeZone })
  const day = localDate.format(now)
  if (day === cachedDay) return cachedTimes

  // Check nearby solar days so midnight on either side of UTC uses Troy's date.
  const times = [0, -12, 12, -24, 24]
    .map((offset) => SunCalc.getTimes(new Date(+now + offset * hour), location.latitude, location.longitude))
    .filter(({ sunrise, sunset }) => Number.isFinite(+sunrise) && Number.isFinite(+sunset))

  cachedDay = day
  cachedTimes = times.find(({ sunrise }) => localDate.format(sunrise) === day) ?? times[0]
  return cachedTimes
}

export function getSky(now, location, cloudCover = 32) {
  const times = getSunTimes(now, location)
  const rise = times?.sunrise ?? now
  const set = times?.sunset ?? now
  const current = +now
  const lightStops = [
    [+rise - hour, 'night'],
    [+rise, 'dawn'],
    [+rise + hour, 'day'],
    [+set - hour, 'day'],
    [+set, 'dusk'],
    [+set + hour, 'night'],
  ].sort(([a], [b]) => a - b)

  let colors = palettes.night
  for (let i = 1; i < lightStops.length; i += 1) {
    const [end, to] = lightStops[i]
    if (current > end) continue

    const [start, from] = lightStops[i - 1]
    const progress = smooth(clamp((current - start) / (end - start || 1)))
    colors = Object.fromEntries(Object.keys(palettes.night).map((key) => [
      key, mix(palettes[from][key], palettes[to][key], progress),
    ]))
    break
  }

  const dayProgress = clamp((current - rise) / (set - rise || 1))
  const daylight = current >= rise && current <= set
  const moon = SunCalc.getMoonIllumination(now)
  return {
    colors,
    cloud: clamp(cloudCover / 100),
    daylight,
    diskX: daylight ? lerp(0.26, 0.78, dayProgress) : 0.71,
    diskY: daylight ? 0.61 - 0.38 * Math.sin(dayProgress * Math.PI) : 0.27,
    diskRadius: daylight ? 0.048 : 0.041,
    moonPhase: moon.fraction,
    waxing: moon.phase < 0.5,
  }
}

function random(x, y) {
  let hash = Math.imul(x, 374761393) + Math.imul(y, 668265263)
  hash = Math.imul(hash ^ (hash >>> 13), 1274126177)
  return ((hash ^ (hash >>> 16)) >>> 0) / 4294967295
}

function noise(x, y) {
  const i = Math.floor(x)
  const j = Math.floor(y)
  const a = smooth(x - i)
  const b = smooth(y - j)
  return lerp(
    lerp(random(i, j), random(i + 1, j), a),
    lerp(random(i, j + 1), random(i + 1, j + 1), a),
    b,
  )
}

export function drawSky(canvas, sky) {
  const context = canvas.getContext('2d')
  if (!context) return

  const width = canvas.width
  const height = canvas.height
  const { colors, cloud, daylight, diskX, diskY, diskRadius, moonPhase, waxing } = sky
  const image = context.createImageData(width, height)
  const pixels = image.data

  for (let x = 0; x < width; x += 1) {
    const u = x / width
    const farRidge = 0.805 + 0.06 * (noise(u * 3.6, 7.9) - 0.5)
      + 0.075 * (noise(u * 7.5, 9.9) - 0.5) - 0.04 * Math.sin(u * 8)
    const nearRidge = 0.923 + 0.1 * (noise(u * 4, 17.6) - 0.5)
      + 0.034 * (noise(u * 13, 24) - 0.5) - 0.048 * Math.cos(u * 6)

    for (let y = 0; y < height; y += 1) {
      const v = y / height
      const grain = random(x + 1400, y + 2100) - 0.5
      const mottle = noise(u * 61, v * 57) - 0.5
      const wind = noise(u * 5.5 + 12, v * 7.1 + 3)
      const billow = noise(u * 4.1 + 7, v * 10.6 + wind * 1.4) * 0.65
        + noise(u * 11.2 + 15, v * 26 + wind * 1.8) * 0.26
        + noise(u * 31, v * 58) * 0.09
      const cloudInk = clamp((billow - (0.65 - cloud * 0.32)) * 2.2)
      const slope = v + 0.115 * Math.sin(u * 3.4 + v * 4.0) * (1 - v) + 0.045 * (wind - 0.5)
      const haze = smooth(clamp((slope - 0.23) / 0.65))
      const highSky = mix(colors.zenith, colors.blue, smooth(clamp(slope * 1.55)))
      let color = mix(highSky, colors.horizon, haze * 0.94)

      const dx = (u - diskX) * width / height
      const dy = v - diskY
      const distance = Math.hypot(dx, dy)
      const glow = Math.exp(-distance * distance / 0.083) * (daylight ? 0.34 : 0.23)
      color = mix(color, colors.light, glow * (1 - cloudInk * 0.75))

      const brightCloud = mix(colors.blue, colors.horizon, 0.28 + haze * 0.57)
      const shadedCloud = mix(colors.zenith, brightCloud, 0.6)
      const cloudColor = mix(shadedCloud, brightCloud, smooth(clamp((billow - 0.33) * 2)))
      color = mix(color, cloudColor, cloudInk * (0.6 - haze * 0.25))

      if (distance < diskRadius + 0.01) {
        const diskEdge = clamp((diskRadius - distance) / 0.004 + 0.5)
        const limb = Math.sqrt(Math.max(0, diskRadius ** 2 - dy ** 2))
        const phaseEdge = dx * (waxing ? 1 : -1) - limb * (1 - 2 * moonPhase)
        const lit = daylight ? 1 : clamp(phaseEdge / 0.003 + 0.5)
        color = mix(color, colors.light, diskEdge * lit * (1 - cloudInk * 0.88) * 0.94)
      }

      const farLand = smooth(clamp((v - farRidge) * 75 + grain * 0.45))
      const nearLand = smooth(clamp((v - nearRidge) * 95 + grain * 0.65))
      color = mix(color, colors.far, farLand * 0.88)
      color = mix(color, colors.land, nearLand * 0.97)

      const vignette = 1 - clamp(Math.hypot((u - 0.52) * 0.85, (v - 0.4) * 0.62)) * 0.24
      const texture = grain * 30 + mottle * 13
      const index = (y * width + x) * 4
      pixels[index] = color[0] * vignette + texture
      pixels[index + 1] = color[1] * vignette + texture
      pixels[index + 2] = color[2] * vignette + texture
      pixels[index + 3] = 255
    }
  }

  context.putImageData(image, 0, 0)
}
