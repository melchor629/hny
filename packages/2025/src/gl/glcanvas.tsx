import { OrbitControls, Stars } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useCallback } from 'react'
import { Vector3 } from 'three'
import useGameState from '../use-game-state'
import styles from './glcanvas.module.css'
import NightSky from './night-sky'
import Snow from './snow'

export default function GlCanvas() {
  const onCanvasAnimationEnd = useCallback(() => {
    useGameState.getState().markStageReady()
  }, [])

  return (
    <div className={styles.container} onAnimationEnd={onCanvasAnimationEnd}>
      <Canvas
        gl={{ stencil: false }}
        camera={{ far: 10000, position: new Vector3(0, 0, 50) }}
        shadows={{ enabled: false }}
      >
        {import.meta.env.DEV && <OrbitControls target={new Vector3(0, 0, 0)} enablePan={false} />}
        <NightSky radius={1200} />
        <Stars radius={500} depth={50} count={2500} factor={16} saturation={0} fade speed={1} />
        <Snow />
      </Canvas>
    </div>
  )
}
