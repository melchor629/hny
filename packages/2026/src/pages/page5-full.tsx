import { type ChangeEvent, useCallback, useRef, useState } from 'react'
import useSliderStore from '../strudel/sliders'
import { init, sliderMappings, startScripted, startSolo, stop } from '../strudel/synth'

await init()

const isPhone =
  'userAgentData' in navigator &&
  navigator.userAgentData &&
  typeof navigator.userAgentData === 'object'
    ? 'isMobile' in navigator.userAgentData && navigator.userAgentData.isMobile === true
    : navigator.platform === 'iPhone' || navigator.userAgent.includes('Android ')
export default function Page5Full() {
  const cancelRef = useRef<AbortController | null>(null)
  const { sliders } = useSliderStore()
  const [mode, setMode] = useState<'init' | 'scripted' | 'off' | 'on'>('init')

  const changeMode = useCallback(() => {
    if (mode === 'init') {
      setMode('scripted')
      if (!isPhone) {
        cancelRef.current = new AbortController()
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

      <div className="flex flex-col gap-1 mt-4 timeline-view:animate-opaciterino">
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
