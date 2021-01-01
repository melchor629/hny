import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import { Fullscreen } from '@styled-icons/material/Fullscreen'
import { FullscreenExit } from '@styled-icons/material/FullscreenExit'
import styles from './styles.module.css'

const FullscreenButton = ({ target }) => {
  const [isFullscreen, setFullscreen] = useState()

  useEffect(() => {
    const listener = (e) => setFullscreen(document.fullscreenElement === e.target)
    target.addEventListener('fullscreenchange', listener, false)
    listener({ target })

    return () => target.removeEventListener('fullscreenchange', listener, false)
  }, [target])

  const toggleFullscreen = useCallback(() => {
    let promise
    if (isFullscreen) {
      promise = document.exitFullscreen()
    } else {
      promise = target.requestFullscreen({ nav: 'hide' })
    }

    promise.catch((error) => console.error('Failed toggleFullscreen', error))
  }, [isFullscreen, target])

  if (!document.fullscreenEnabled) return null

  return (
    <button type="button" className={styles.button} onClick={toggleFullscreen}>
      {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
    </button>
  )
}

FullscreenButton.propTypes = {
  target: PropTypes.instanceOf(HTMLElement).isRequired,
}

export default FullscreenButton
