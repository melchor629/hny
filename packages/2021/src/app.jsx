import { SoftShadows } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useState } from 'react'
import * as THREE from 'three'
import styles from './app.module.css'
import { FullscreenButton, Scene } from './components'

export default function App() {
  const [container, setRef] = useState()

  return (
    <div
      className={styles['app-container']}
      ref={setRef}
    >
      <Canvas
        className={styles.canvas}
        style={{ width: '', height: '' }}
        shadows
        gl={{
          powerPreference: 'high-performance',
          alpha: false,
          antialias: false,
          stencil: false,
          depth: false,
        }}
        dpr={import.meta.env.DEV ? 1 : window.devicePixelRatio}
        onCreated={({ gl, camera }) => {
          camera.position.set(-1.81241, 1.21982, 8.148)
          camera.lookAt(-1.81241, 2.21982, 0)
          camera.fov = 39.5978
          camera.updateProjectionMatrix()
          gl.toneMapping = THREE.NoToneMapping
        }}
      >
        <SoftShadows />
        {container && <Scene container={container} />}
      </Canvas>
      {container && <FullscreenButton target={container} />}
    </div>
  )
}
