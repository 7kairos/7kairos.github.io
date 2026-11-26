const conditions = {
  0: 'clear', 1: 'mostly clear', 2: 'partly cloudy', 3: 'overcast',
  45: 'fog', 48: 'fog',
  51: 'drizzle', 53: 'drizzle', 55: 'drizzle',
  56: 'freezing drizzle', 57: 'freezing drizzle',
  61: 'light rain', 63: 'rain', 65: 'heavy rain',
  66: 'freezing rain', 67: 'freezing rain',
  71: 'light snow', 73: 'snow', 75: 'heavy snow', 77: 'snow',
  80: 'light showers', 81: 'showers', 82: 'heavy showers',
  85: 'snow showers', 86: 'snow showers',
  95: 'thunderstorms', 96: 'thunderstorms', 99: 'thunderstorms',
}

export async function loadWeather(location, signal) {
  const url = new URL('https://api.open-meteo.com/v1/forecast')
  url.search = new URLSearchParams({
    latitude: location.latitude,
    longitude: location.longitude,
    current: 'temperature_2m,weather_code,cloud_cover',
    temperature_unit: 'fahrenheit',
    forecast_days: '1',
  })

  const response = await fetch(url, { signal })
  if (!response.ok) throw new Error('Weather request failed')
  const { current } = await response.json()
  if (!Number.isFinite(current?.temperature_2m)) throw new Error('Weather is unavailable')
  const code = current.weather_code

  return {
    sourceUrl: url.href,
    temperature: current.temperature_2m,
    condition: conditions[code],
    rainy: (code >= 51 && code <= 67) || (code >= 80 && code <= 82),
    cloud: Number.isFinite(current.cloud_cover) ? current.cloud_cover : undefined,
  }
}
