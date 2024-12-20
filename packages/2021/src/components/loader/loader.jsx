import { Html, useProgress } from '@react-three/drei'
import React from 'react'
import { shallow } from 'zustand/shallow'
import styles from './loader.module.css'

const Loader = ({ container }) => {
  const { progress, errors } = useProgress(
    (p) => ({ progress: p.active ? p.progress : 100, errors: p.errors }),
    shallow,
  )
  if (errors?.length) {
    return null
  }

  return (
    <Html portal={container} fullscreen position={[-1.81241, 2.21982, 0]}>
      <div className={styles['loader-container']}>Cargando... ({progress.toFixed(1)}%)</div>
    </Html>
  )
}

export default Loader
