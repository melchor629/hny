import { evaluate, hush, initStrudel, samples } from '@strudel/web'
import code from './music.strudel?raw'
import useSliderStore from './sliders'

class AbortedError extends Error {
  constructor(fnname: string) {
    super(`${fnname} aborted`)
  }
}

const beatDuration = (140 / 60) * 1_000
const linear = (t: number) => t
const inOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2
const wait = (ms: number, signal: AbortSignal) => {
  const { promise, resolve, reject } = Promise.withResolvers<void>()
  const aborted = () => {
    clearTimeout(n)
    reject(new AbortedError('wait'))
  }
  const n = setTimeout(() => {
    signal.removeEventListener('abort', aborted, false)
    resolve()
  }, ms)
  signal.addEventListener('abort', aborted, false)
  return promise
}
const waitBeats = (beats: number, signal: AbortSignal) => wait(beatDuration * beats, signal)
async function* intp(
  signal: AbortSignal,
  from: number,
  to: number,
  ms: number,
  intfn: (t: number) => number = linear,
) {
  const started = Date.now()
  let t = 0
  do {
    t = Math.min(1, (Date.now() - started) / ms)
    const v = from + intfn(t) * (to - from)
    yield v
    await wait(50, signal)
  } while (t < 1)
}
async function intpBeats(
  signal: AbortSignal,
  to: number,
  beats: number,
  slider: keyof typeof sliderMappings,
  intfn?: (t: number) => number,
) {
  const from = useSliderStore.getState().getSlider(slider)?.value ?? 0
  for await (const value of intp(signal, from, to, beatDuration * beats, intfn)) {
    sliderSet(slider, value)
  }
}

const sliderSet = (name: keyof typeof sliderMappings, value: number) =>
  useSliderStore.getState().setSliderValue(name, value)

const sliderBeatGain = 'slider_103'
const sliderBassEnv = 'slider_241'
const sliderBassGain = 'slider_291'
const sliderWaveGain = 'slider_443'
const sliderPulseEnv = 'slider_550'
const sliderPulseGain = 'slider_578'
const sliderSnareDry = 'slider_699'
const sliderSnareGain = 'slider_720'
export const sliderMappings = Object.freeze({
  [sliderBeatGain]: 'beat (dB)',
  [sliderBassEnv]: 'bass (env))',
  [sliderBassGain]: 'bass (dB)',
  [sliderWaveGain]: 'wave (dB)',
  [sliderPulseEnv]: 'pulse (env)',
  [sliderPulseGain]: 'pulse (dB)',
  [sliderSnareDry]: 'snare (dry)',
  [sliderSnareGain]: 'snare (dB)',
})

export const init = async () => {
  await initStrudel({
    prebake: () => samples('github:tidalcycles/dirt-samples'),
  })
}

export const startSolo = () => evaluate(code)

export const startScripted = async (signal: AbortSignal) => {
  await startSolo()

  sliderSet(sliderBeatGain, 0.3)
  await waitBeats(0.5, signal)
  await waitBeats(3, signal)

  sliderSet(sliderBassEnv, 0.4)
  await Promise.all([
    intpBeats(signal, 0.5, 6, sliderBassGain, inOutSine),
    intpBeats(signal, 0.65, 6, sliderBeatGain, inOutSine),
  ])
  await waitBeats(4, signal)

  sliderSet(sliderWaveGain, 0.6)
  await waitBeats(16, signal)

  sliderSet(sliderPulseEnv, 1.5)
  await intpBeats(signal, 0.6, 1, sliderPulseGain, inOutSine)
  await Promise.all([
    intpBeats(signal, 6, 10, sliderPulseEnv, inOutSine),
    intpBeats(signal, 6.15, 10, sliderBassEnv, inOutSine),
  ])
  await waitBeats(8, signal)

  sliderSet(sliderPulseGain, 0)
  sliderSet(sliderBeatGain, 0)
  await intpBeats(signal, 3.45, 7, sliderBassEnv, inOutSine)
  await waitBeats(6, signal)

  sliderSet(sliderBassEnv, 6.15)
  sliderSet(sliderBassGain, 0.45)
  sliderSet(sliderPulseGain, 0.7)
  sliderSet(sliderBeatGain, 0.65)
  sliderSet(sliderSnareGain, 0.9)
  await waitBeats(12, signal)

  sliderSet(sliderWaveGain, 0)
  await Promise.all([
    intpBeats(signal, 3, 4, sliderBassEnv, inOutSine),
    intpBeats(signal, 4.8, 4, sliderPulseEnv, inOutSine),
    intpBeats(signal, 1, 4, sliderSnareDry, inOutSine),
  ])
  await waitBeats(4, signal)

  await Promise.all([
    intpBeats(signal, 0.65, 2, sliderBeatGain, inOutSine),
    intpBeats(signal, 1.8, 6, sliderBassEnv, inOutSine),
    intpBeats(signal, 1, 6, sliderPulseEnv, inOutSine),
    intpBeats(signal, 0.3, 6, sliderSnareDry, inOutSine),
  ])
  await waitBeats(8, signal)

  sliderSet(sliderWaveGain, 0)
  await Promise.all([
    intpBeats(signal, 0.5, 4, sliderBeatGain, inOutSine),
    intpBeats(signal, 0, 4, sliderBassGain, inOutSine),
    intpBeats(signal, 0, 2, sliderSnareGain, inOutSine),
  ])
  await waitBeats(4, signal)

  sliderSet(sliderBassEnv, 6.15)
  sliderSet(sliderPulseEnv, 3.8)
  sliderSet(sliderSnareDry, 0.7)
}

export const stop = () => {
  hush()
  useSliderStore.setState({ sliders: [] })
}

if (import.meta.env.DEV) {
  // @ts-expect-error for dev purposes
  window._playScriptedMusic = async () => {
    const ctrl = new AbortController()
    await init()
    await startScripted(ctrl.signal)
    hush()
  }
}
