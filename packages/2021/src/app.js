import React, { useState } from 'react'
import { Canvas } from 'react-three-fiber'
import { softShadows } from '@react-three/drei'
import * as THREE from 'three'
import { FullscreenButton, Scene } from './components'
import styles from './app.module.css'
import './styles.css'

softShadows()

export default function App() {
  const [container, setRef] = useState()

  return (
    <div className={styles['app-container']} ref={setRef}>
      <Canvas
        className={styles.canvas}
        style={{ width: '', height: '' }}
        colorManagement
        shadowMap
        gl={{
          powerPreference: 'high-performance',
          alpha: false,
          antialias: false,
          stencil: false,
          depth: false,
          physicallyCorrectLights: true,
        }}
        pixelRatio={process.env.NODE_ENV === 'development' ? 1 : window.devicePixelRatio}
        onCreated={({ gl, camera }) => {
          camera.position.set(-1.81241, 1.21982, 8.148)
          camera.lookAt(-1.81241, 2.21982, 0)
          window.camera = camera
          camera.fov = 39.5978
          gl.toneMapping = THREE.NoToneMapping
        }}
      >
        {container && <Scene container={container} />}
      </Canvas>
      {container && <FullscreenButton target={container} />}
    </div>
  )
}
