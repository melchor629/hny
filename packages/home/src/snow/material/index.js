import { ShaderMaterial, AdditiveBlending } from 'three'
import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'

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
