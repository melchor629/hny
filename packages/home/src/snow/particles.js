import { Points } from 'three'
import geometry from './geometry'
import material from './material'

const particles = new Points(geometry, material)

particles.changeDevicePixelRatio = (pixelRatio) => {
  material.uniforms.devicePixelRatio.value = pixelRatio || window.devicePixelRatio
}

export default particles
