import { ShaderMaterial, AdditiveBlending } from 'three'
import vertexShader from './vertex.glsl?raw'
import fragmentShader from './fragment.glsl?raw'

const material = new ShaderMaterial({
  uniforms: {
    devicePixelRatio: { value: window.devicePixelRatio },
  },
  vertexShader,
  fragmentShader,
  blending: AdditiveBlending,
  depthTest: true,
  transparent: true,
  vertexColors: false,
})

export default material
