import { useCallback, useRef } from 'react'

export default function useResizeObserver(fn: (entry: ResizeObserverEntry) => void) {
  const targetRef = useRef<HTMLElement | null>(null)
  const observerRef = useRef<ResizeObserver | null>(null)
  const fnRef = useRef(fn)

  fnRef.current = fn
  if (observerRef.current == null) {
    observerRef.current = new ResizeObserver(([entry]) => {
      fnRef.current(entry)
    })
  }

  return useCallback((target: HTMLElement | null) => {
    targetRef.current = target
    if (target) {
      observerRef.current?.observe(target)
      return () => observerRef.current?.unobserve(target)
    }
    return () => {}
  }, [])
}
