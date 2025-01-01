import { useFrame } from '@react-three/fiber'
import { useMemo } from 'react'
import {
  AdditiveBlending,
  Color,
  ShaderMaterial,
} from 'three'
import vertexShader from './snow.vert.glsl?raw'
import fragmentShader from './snow.frag.glsl?raw'

// based on this work https://github.com/sole/three.js-tutorials/blob/master/snow_shader/step10.js
// alterations: using plain colour and using a rounded effect in the particles, parameters changed too

type Props = Readonly<{
  width?: number
  height?: number
  depth?: number
}>

export default function Snow({ width = 300.0, height = 300.0, depth = 200.0 }: Props) {
  const snowShaderMaterial = useMemo(() => {
    return new ShaderMaterial({
      vertexShader,
      fragmentShader,
      blending: AdditiveBlending,
      transparent: true,
      depthTest: true,
      uniforms: {
        color: { value: new Color(0xFFFFFF) },
        height: { value: height },
        elapsedTime: { value: 0.0 },
        radiusX: { value: 2.5 },
        radiusZ: { value: 2.5 },
        size: { value: 100 },
        scale: { value: 4.0 },
        opacity: { value: 0.6 },
        speedH: { value: 0.4 },
        speedV: { value: 0.6 },
      },
    })
  }, [height])

  const snowPositionArray = useMemo(() => {
    const vertices: number[] = []
    for (let i = 0; i < 10_000; i += 1) {
      vertices.push(
        width * (Math.random() - 0.5),
        Math.random() * height,
        depth * (Math.random() - 0.5),
      )
    }

    return new Float32Array(vertices)
  }, [width, height, depth])

  useFrame(useMemo(() => ({ clock }) => {
    snowShaderMaterial.uniforms.elapsedTime.value = clock.getElapsedTime() * 10.0
  }, [snowShaderMaterial]))

  return (
    <points position={[0, -height / 2, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[snowPositionArray, 3]} />
      </bufferGeometry>
      <primitive attach="material" object={snowShaderMaterial} />
    </points>
  )
}
