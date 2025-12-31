import confetti from 'canvas-confetti'
import { useCallback, useMemo, useState } from 'react'
import BasePage from './base'
import useIntersectionObserver from '../use-intersaction-observer'
import useResizeObserver from '../use-resize-observer'

export default function Page4({ startParty }: { startParty: () => void }) {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
  const confetto = useMemo(
    () => (canvas ? confetti.create(canvas, { resize: true }) : confetti),
    [canvas],
  )
  const [counter, setCounter] = useState(10)
  const setRef = useIntersectionObserver((entry) => {
    if (!entry.isIntersecting || entry.intersectionRect.y < window.innerHeight / 2) return
    function fire(particleRatio: number, opts: object) {
      confetto({
        origin: { x: 0.5, y: 0.65 },
        ...opts,
        particleCount: Math.floor(200 * particleRatio),
      })
    }
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    })
    fire(0.2, {
      spread: 60,
    })
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    })
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    })
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    })
  }, 1)
  const setDiv = useResizeObserver(
    useCallback(
      (entry: ResizeObserverEntry) => {
        if (!canvas) return
        canvas.width = entry.contentRect.width * devicePixelRatio
        canvas.height = entry.contentRect.height * devicePixelRatio * 1.2
      },
      [canvas],
    ),
  )

  const onClick = useCallback(() => {
    if (counter > 0) {
      setCounter(counter - 1)
    } else if (counter === 0) {
      setCounter(-1)
      startParty()

      const end = Date.now() + 15_000
      function fn() {
        const timeLeft = end - Date.now()
        if (timeLeft < 0) return

        const particleCount = 10 + 40 * (timeLeft / 15_000)
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0, particleCount }
        confetto({ ...defaults, origin: { x: Math.random() * 0.2 + 0.1, y: Math.random() - 0.2 } })
        confetto({ ...defaults, origin: { x: Math.random() * 0.2 + 0.7, y: Math.random() - 0.2 } })
        setTimeout(fn, Math.random() * 150 + 175)
      }
      fn()
    }
  }, [counter, startParty])

  return (
    <BasePage ref={setDiv} className="justify-center!">
      <h1
        ref={setRef}
        className={`
          text-8xl transition-all
          ${counter >= 0 ? 'active:scale-90' : ''}
          ${counter === 9 ? 'text-red-400' : ''}
          ${counter === 8 ? 'text-emerald-400' : ''}
          ${counter === 7 ? 'text-fuchsia-400' : ''}
          ${counter === 6 ? 'text-amber-400' : ''}
          ${counter === 5 ? 'text-slate-300' : ''}
          ${counter === 4 ? 'text-lime-400' : ''}
          ${counter === 3 ? 'text-violet-400' : ''}
          ${counter === 2 ? 'text-stone-400' : ''}
          ${counter === 1 ? 'text-teal-400' : ''}
          ${counter === 0 ? 'text-yellow-400' : ''}
        `.trim()}
        onClick={onClick}
      >
        ¡Feliz año 2026!
      </h1>
      <canvas
        ref={setCanvas}
        className="w-full h-[120%] absolute left-0 right-0 translate-y-[-10lvh] pointer-events-none"
      />
    </BasePage>
  )
}
