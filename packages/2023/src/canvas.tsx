import { Preload } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import RenderloopPauser from './objects/renderloop-pauser'
import GlobalScenario from './scenarios/global'

interface GameCanvasProps {
  width: number
  height: number
  scale: number
}

export default function GameCanvas({ width, height, scale }: GameCanvasProps) {
  return (
    <Canvas
      gl={{
        alpha: true,
        antialias: false,
        powerPreference: 'low-power',
        stencil: false,
      }}
      orthographic
      dpr={1}
      onCreated={(state) => {
        const rescale = (w: number, h: number, s: number) => {
          if (state.camera.type === 'PerspectiveCamera') {
            state.camera.aspect = w / h
          } else {
            state.camera.top = h
            state.camera.left = 0
            state.camera.right = w
            state.camera.bottom = 0
          }
          state.camera.updateProjectionMatrix()
        }

        state.camera.translateZ(-1)
        state.camera.manual = true
        rescale(width, height, scale)
        state.gl.domElement.style.imageRendering = 'pixelated'

        // NOTE: performance optimization (it may break something)
        state.scene.matrixAutoUpdate = false
        state.scene.matrixWorldAutoUpdate = false

        if (process.env.NODE_ENV !== 'production') {
          // @ts-ignore
          window.camera = state.camera
          // @ts-ignore
          window.scene = state.scene
          // @ts-ignore
          window.gl = state.gl
        }
      }}
    >
      <RenderloopPauser />
      <Suspense fallback={null}>
        <GlobalScenario />

        <Preload all />
      </Suspense>
    </Canvas>
  )
}
