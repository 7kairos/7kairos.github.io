let audio

function getAudio() {
  if (!audio) {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (AudioContext) audio = new AudioContext()
  }
  if (audio?.state === 'suspended') audio.resume()
  return audio
}

function tone(frequency, duration, volume, type = 'sine', endFrequency = frequency) {
  const context = getAudio()
  if (!context) return
  const oscillator = context.createOscillator()
  const gain = context.createGain()
  const now = context.currentTime
  oscillator.type = type
  oscillator.frequency.setValueAtTime(frequency, now)
  oscillator.frequency.exponentialRampToValueAtTime(Math.max(1, endFrequency), now + duration)
  gain.gain.setValueAtTime(volume, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration)
  oscillator.connect(gain).connect(context.destination)
  oscillator.start(now)
  oscillator.stop(now + duration)
}

function clickSound(isLink) {
  if (isLink) {
    tone(1080, 0.045, 0.024, 'sine', 720)
    setTimeout(() => tone(1380, 0.035, 0.012, 'sine', 1100), 32)
  } else {
    tone(520, 0.04, 0.025, 'triangle', 300)
  }
}

export function installClickSounds() {
  const onPointer = (event) => {
    const target = event.target instanceof Element ? event.target : null
    clickSound(Boolean(target?.closest('a[href]')))
  }
  const onKeyboardClick = (event) => {
    if (event.detail === 0) clickSound(event.target instanceof Element && Boolean(event.target.closest('a[href]')))
  }
  document.addEventListener('pointerdown', onPointer, { capture: true, passive: true })
  document.addEventListener('click', onKeyboardClick, true)
}

export function playPrintSound() {
  const context = getAudio()
  if (!context) return

  const duration = 3.55
  const now = context.currentTime
  const buffer = context.createBuffer(1, Math.ceil(context.sampleRate * duration), context.sampleRate)
  const samples = buffer.getChannelData(0)
  for (let i = 0; i < samples.length; i += 1) samples[i] = Math.random() * 2 - 1

  const noise = context.createBufferSource()
  const filter = context.createBiquadFilter()
  const noiseGain = context.createGain()
  noise.buffer = buffer
  filter.type = 'bandpass'
  filter.frequency.value = 1700
  filter.Q.value = 0.9
  noiseGain.gain.setValueAtTime(0.0001, now)
  noiseGain.gain.linearRampToValueAtTime(0.017, now + 0.12)
  noiseGain.gain.setValueAtTime(0.017, now + duration - 0.18)
  noiseGain.gain.linearRampToValueAtTime(0.0001, now + duration)
  noise.connect(filter).connect(noiseGain).connect(context.destination)
  noise.start(now)
  noise.stop(now + duration)

  const motor = context.createOscillator()
  const motorGain = context.createGain()
  const tremolo = context.createOscillator()
  const tremoloGain = context.createGain()
  motor.type = 'triangle'
  motor.frequency.setValueAtTime(120, now)
  motor.frequency.linearRampToValueAtTime(160, now + duration)
  motorGain.gain.value = 0.0055
  tremolo.frequency.value = 13
  tremoloGain.gain.value = 0.0025
  tremolo.connect(tremoloGain).connect(motorGain.gain)
  motor.connect(motorGain).connect(context.destination)
  tremolo.start(now)
  motor.start(now)
  tremolo.stop(now + duration)
  motor.stop(now + duration)
}
