import { Html, useProgress } from '@react-three/drei'
import PropTypes from 'prop-types'
import React, { useLayoutEffect, useState } from 'react'
import { usePhasesStore } from '../../stores'
import styles from './loader-listener.module.css'

const LoaderListener = ({ container }) => {
  const { start } = usePhasesStore()
  const [isClicked, setClicked] = useState(false)
  const progress = useProgress((p) => (p.active ? p.progress : 100))

  useLayoutEffect(() => {
    const onClick = () => {
      start()
      setClicked(true)
      container.removeEventListener('pointerup', onClick, false)
    }

    container.addEventListener('pointerup', onClick, false)
  }, [start, container])

  if (isClicked || progress < 100) {
    return null
  }

  return (
    <Html portal={container} fullscreen position={[-1.81241, 2.21982, 0]}>
      <div className={styles['loaded-container']}>
        Click para empezar
        <br />
        <small>
          Puedes poner en pantalla completa con el botón de abajo. Si estás con un movil, giralo.
        </small>
        <br />
        <small className={styles.hint}>
          Pista: <em>Hay unas tarjetas, se pueden interactuar con ellas de varias formas…</em>
        </small>
      </div>
    </Html>
  )
}

LoaderListener.propTypes = {
  container: PropTypes.instanceOf(HTMLDivElement).isRequired,
}

export default LoaderListener
