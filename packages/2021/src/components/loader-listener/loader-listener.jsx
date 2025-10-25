import { Html, useProgress } from '@react-three/drei'
import { useCallback, useLayoutEffect, useState } from 'react'
import { useShallow } from 'zustand/shallow'
import { usePhasesStore } from '../../stores'
import styles from './loader-listener.module.css'

const LoaderListener = ({ container }) => {
  const { start } = usePhasesStore()
  const [isClicked, setClicked] = useState(false)
  const { progress, errors } = useProgress(
    useShallow(
      useCallback((p) => ({ progress: p.active ? p.progress : 100, errors: p.errors }), []),
    ),
  )

  useLayoutEffect(() => {
    const onClick = () => {
      if (!errors?.length) {
        start()
        setClicked(true)
      }

      container.removeEventListener('pointerup', onClick, false)
    }

    container.addEventListener('pointerup', onClick, false)
    return () => container.removeEventListener('pointerup', onClick, false)
  }, [start, container, errors])

  if (isClicked || progress < 100) {
    return null
  }

  if (errors?.length) {
    return (
      <Html portal={container} fullscreen position={[-1.81241, 2.21982, 0]}>
        <div className={styles['loaded-container']}>
          Ha habido un problema cargando
          <br />
          <small>
            Prueba a recargar. Si no se arregla, puede que tu navegador y/o dispositivo no sea
            compatible.
          </small>
          <br />
          <small className={styles.hint}>{errors.join('. ')}</small>
        </div>
      </Html>
    )
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

export default LoaderListener
