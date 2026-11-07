import { Fullscreen } from '@styled-icons/material/Fullscreen'
import { FullscreenExit } from '@styled-icons/material/FullscreenExit'
import { useCallback, useEffect, useState } from 'react'
import fullscreenChangeEventName from './fullscreen-pollyfill'
import styles from './styles.module.css'

const FullscreenButton = ({ target }) => {
  const [isFullscreen, setFullscreen] = useState()

  useEffect(() => {
    const listener = (e) => setFullscreen(document.fullscreenElement === e.target)
    target.addEventListener(fullscreenChangeEventName, listener, false)
    listener({ target })

    return () => target.removeEventListener(fullscreenChangeEventName, listener, false)
  }, [target])

  const toggleFullscreen = useCallback(() => {
    let promise
    if (isFullscreen) {
      promise = document.exitFullscreen().then(() => window.screen.orientation?.unlock())
    } else {
      promise = target
        .requestFullscreen({ nav: 'hide' })
        .then(() => window.screen.orientation?.lock('landscape'))
    }

    promise.catch((error) => console.error('Failed toggleFullscreen', error))
  }, [isFullscreen, target])

  if (!document.fullscreenEnabled) return null

  return (
    <button
      type="button"
      className={styles.button}
      onClick={toggleFullscreen}
    >
      {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
    </button>
  )
}

export default FullscreenButton
