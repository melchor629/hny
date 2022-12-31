const wait = (delay: number, signal?: AbortSignal) => {
  let timeoutId: any
  let rejectFn: any
  const abortFn = () => {
    clearTimeout(timeoutId)
    rejectFn(new Error('Aborted'))
  }
  signal?.addEventListener('abort', abortFn, { once: true, capture: false })

  return new Promise<void>((resolve, reject) => {
    rejectFn = reject
    timeoutId = setTimeout(() => {
      signal?.removeEventListener('abort', abortFn, { capture: false })
      resolve()
    }, delay)
  })
}

export default wait
