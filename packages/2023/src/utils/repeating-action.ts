const repeatingAction = (fn: () => void, interval: number, delay = 0, immediate = false) => {
  let intervalId: any
  const timeoutId = setTimeout(() => {
    intervalId = setInterval(fn, interval)
  }, delay)

  if (immediate) {
    fn()
  }

  return () => {
    clearTimeout(timeoutId)
    intervalId && clearInterval(intervalId)
  }
}

export default repeatingAction
