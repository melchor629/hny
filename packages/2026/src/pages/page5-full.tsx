import { type ChangeEvent, useCallback, useRef, useState } from 'react'
import useSliderStore from '../strudel/sliders'
import { init, sliderMappings, startScripted, startSolo, stop } from '../strudel/synth'

await init()

const isPhone =
  'userAgentData' in navigator &&
  navigator.userAgentData &&
  typeof navigator.userAgentData === 'object'
    ? 'isMobile' in navigator.userAgentData && navigator.userAgentData.isMobile === true
    : navigator.platform === 'iPhone' || navigator.userAgent.includes('Android')
export default function Page5Full() {
  const cancelRef = useRef<AbortController | null>(null)
  const { sliders } = useSliderStore()
  const [mode, setMode] = useState<'init' | 'scripted' | 'off' | 'on'>('init')
  const [perc, setPerc] = useState(0)

  const changeMode = useCallback(() => {
    if (mode === 'init') {
      setMode('scripted')
      if (!isPhone) {
        cancelRef.current = new AbortController()
        const start = Date.now()
        const n = setInterval(() => {
          setPerc((Date.now() - start) / 1000)
        }, 500)
        cancelRef.current.signal.addEventListener('abort', () => {
          clearInterval(n)
        })
        startScripted(cancelRef.current.signal)
          .then(() => setMode('on'))
          .catch(() => {})
      }
    } else if (mode === 'scripted') {
      cancelRef.current?.abort()
      cancelRef.current = null
      setMode('off')
      stop()
    } else if (mode === 'off') {
      setMode('on')
      if (!isPhone) startSolo()
    } else if (mode === 'on') {
      setMode('off')
      stop()
    }
  }, [mode])

  const onSliderValueChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.id in sliderMappings) {
      useSliderStore
        .getState()
        .setSliderValue(e.currentTarget.id as never, e.currentTarget.valueAsNumber)
    }
  }, [])

  return (
    <>
      <button
        type="button"
        onClick={changeMode}
        className="rounded-lg border border-transparent outline outline-transparent outline-solid outline-offset-2 p-2 text-base font-bold bg-slate-900/80 backdrop-blur-sm cursor-pointer transition-all timeline-view:animate-opaciterino hover:border-slate-600 focus:outline-3 focus:outline-slate-700"
      >
        {mode === 'init' && '🤔'}
        {mode === 'off' && '🎵'}
        {mode === 'scripted' && '🔊'}
        {mode === 'on' && '🎶'}
      </button>

      <div className="flex flex-col gap-1 my-4 timeline-view:animate-opaciterino">
        {isPhone && mode === 'scripted' && (
          <audio
            autoPlay
            controls
            controlsList="nodownload noremoteplayback"
            src="/2026/fm.opus"
            onEnded={() => setMode('off')}
            className="w-96"
          />
        )}
        {isPhone && mode === 'on' && (
          <p className="text-lg">Para la experiencia completa, visitame en un escritorio :)</p>
        )}
        {!isPhone && mode === 'scripted' && (
          <label className="flex gap-1 items-center text-slate-300">
            <input id="played" type="range" min={0} max={242} value={perc} step={1} disabled />
            <span>{`${Math.trunc(perc / 60)
              .toFixed(0)
              .padStart(2, '0')}:${Math.trunc(perc % 60)
              .toFixed(0)
              .padStart(2, '0')} / 04:02`}</span>
          </label>
        )}
        {sliders.map(({ id, min, max, value, step }) => (
          <label key={id} className="flex gap-1 items-center text-slate-300">
            <input
              id={id}
              type="range"
              min={min}
              max={max}
              value={value}
              step={step}
              onChange={onSliderValueChange}
              disabled={mode === 'scripted'}
            />
            <span>{`${sliderMappings[id as never] ?? id} ${value.toFixed(2)}`}</span>
          </label>
        ))}
      </div>
    </>
  )
}
