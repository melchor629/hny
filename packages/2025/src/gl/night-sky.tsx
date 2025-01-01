import { useMemo } from 'react'
import { Color, DoubleSide, ShaderMaterial } from 'three'
import vertexShader from './night-sky.vert.glsl?raw'
import fragmentShader from './night-sky.frag.glsl?raw'

// https://discourse.threejs.org/t/starry-shader-for-sky-sphere/7578/17
// https://stackblitz.com/edit/starry-skydome-t1j7od?file=index.js
// alterations: removed stars code keeping just the other effect

export default function NightSky({ radius = 500.01 }) {
  const starrySkyShader = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          skyRadius: { value: radius },
          env_c1: { value: new Color('#0d1a2f') },
          env_c2: { value: new Color('#0f8682') },
        },
        side: DoubleSide,
      }),
    [radius],
  )

  return (
    <mesh>
      <sphereGeometry args={[radius, 20, 20]} />
      <primitive object={starrySkyShader} attach="material" />
    </mesh>
  )
}
