import { Html, useProgress } from '@react-three/drei'
import { useCallback } from 'react'
import { useShallow } from 'zustand/shallow'
import styles from './loader.module.css'

const Loader = ({ container }) => {
  const { errors } = useProgress(
    useShallow(
      useCallback((p) => ({ errors: p.errors }), []),
    ),
  )
  if (errors?.length) {
    return null
  }

  return (
    <Html portal={container} fullscreen position={[-1.81241, 2.21982, 0]}>
      <div className={styles['loader-container']}>Cargando...</div>
    </Html>
  )
}

export default Loader
