import { Preload, Stars } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { TheEffects, ThePart, TheProgress } from './components'
import TheScene from './the-scene'

export default function App() {
  return (
    <>
      <Canvas
        gl={{ stencil: false }}
        onCreated={({ camera }) => {
          camera.position.set(0, 1, 5)
          camera.lookAt(0, 0, 0)
          camera.fov = 39.5978
          camera.far = 1250
          camera.updateProjectionMatrix()
        }}
      >
        <Suspense fallback={<TheProgress />}>
          {/* Stars should be inside TheScene, but for simplicity... */}
          <Stars
            radius={500} // Radius of the inner sphere (default=100)
            depth={50} // Depth of area where stars should fit (default=50)
            count={5000} // Amount of stars (default=5000)
            factor={20} // Size factor (default=4)
            saturation={0} // Saturation 0-1 (default=0)
            fade // Faded dots (default=false)
          />
          <TheScene />
          <TheEffects />
          <Preload all />
        </Suspense>
      </Canvas>
      <ThePart />
    </>
  )
}
