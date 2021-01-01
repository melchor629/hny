import { Html, useProgress } from '@react-three/drei'
import React from 'react'
import styles from './loader.module.css'

const Loader = ({ container }) => {
  const progress = useProgress((p) => (p.active ? p.progress : 100))
  return (
    <Html portal={container} fullscreen position={[-1.81241, 2.21982, 0]}>
      <div className={styles['loader-container']}>Cargando... ({progress.toFixed(1)}%)</div>
    </Html>
  )
}

export default Loader
