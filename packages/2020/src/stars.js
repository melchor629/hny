import random from 'lodash-es/random'
import { BufferGeometry, Float32BufferAttribute, Points, PointsMaterial } from 'three'

const numParticles = 1500
const positions = []
for (let i = 0; i < numParticles; i++) {
  positions.push([random(-70, 70, true), random(-70, 70, true), random(-70, 70, true)])
}

const geometry = new BufferGeometry()
geometry.setAttribute('position', new Float32BufferAttribute(positions.flat(), 3))

const starsMesh = new Points(geometry, new PointsMaterial({ size: 3, sizeAttenuation: false }))

export default starsMesh
