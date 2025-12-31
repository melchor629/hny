import { useCallback, useRef } from 'react'

export default function useIntersectionObserver(
  fn: (entry: IntersectionObserverEntry) => void,
  threshold?: number,
) {
  const targetRef = useRef<HTMLElement | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const fnRef = useRef(fn)

  fnRef.current = fn
  if (observerRef.current == null) {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        fnRef.current(entry)
      },
      {
        root: null,
        rootMargin: '0px',
        threshold,
      },
    )
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
