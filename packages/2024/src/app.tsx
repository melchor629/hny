import { OrbitControls, Preload, SoftShadows, Stars } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { DirectionalLight, PCFSoftShadowMap } from 'three'
import TheMagic from './components/the-magic'
import TheText from './components/the-text'
import TheWelcome from './components/the-welcome'

export default function App() {
  return (
    <>
      <Canvas
        gl={{ stencil: false }}
        camera={{ far: 1250 }}
        shadows={{ enabled: true, type: PCFSoftShadowMap }}
        onCreated={({ camera, scene }) => {
          const light = new DirectionalLight('white', 1)
          light.castShadow = true
          camera.add(light)
          scene.add(camera)
        }}
      >
        <SoftShadows samples={16} size={16} />
        <Stars radius={500} depth={50} count={5000} factor={20} saturation={0} fade speed={1} />
        <ambientLight args={['white', 0.05]} />

        <Suspense fallback={null}>
          <TheMagic />

          <OrbitControls
            enablePan={false}
            enableZoom
            enableRotate
            minDistance={1}
            maxDistance={40}
          />

          <Preload all />
        </Suspense>
      </Canvas>

      <TheWelcome />
      <TheText />
    </>
  )
}
