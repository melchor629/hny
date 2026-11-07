import { useCallback, useLayoutEffect, useState } from 'react'
import useResizeObserver from '../use-resize-observer'
import SnowFall from './snow-fall'

export default function Snow() {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)

  const setDiv = useResizeObserver(
    useCallback(
      (entry: ResizeObserverEntry) => {
        if (!canvas) return
        canvas.style.width = `${entry.contentRect.width}px`
        canvas.style.height = `${entry.contentRect.height}px`
        canvas.width = entry.contentRect.width * devicePixelRatio
        canvas.height = entry.contentRect.height * devicePixelRatio
      },
      [canvas],
    ),
  )

  useLayoutEffect(() => {
    if (!canvas) return () => {}

    let n: number
    canvas.width = 1
    canvas.height = 1
    const ctx = canvas.getContext('2d')!
    function wait() {
      if (canvas?.width === 1) n = requestAnimationFrame(wait)
      else {
        const fall = new SnowFall(canvas!)
        function fn() {
          fall.draw(ctx)
          fall.update()
          n = requestAnimationFrame(fn)
        }
        fn()
      }
    }

    n = requestAnimationFrame(wait)
    return () => cancelAnimationFrame(n)
  }, [canvas])

  return (
    <div
      className="pointer-events-none absolute top-0 left-0 -z-1 h-full w-full"
      ref={setDiv}
    >
      <canvas ref={setCanvas} />
    </div>
  )
}
