import { ShaderMaterial, AdditiveBlending } from 'three'
import fragmentShader from './fragment.glsl?raw'
import vertexShader from './vertex.glsl?raw'

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
