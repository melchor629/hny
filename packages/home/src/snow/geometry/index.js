import { BufferGeometry, DynamicDrawUsage, Float32BufferAttribute } from 'three'
import { generateRandomInitialAcceleration, generateRandomPos, generateRandomSize } from './utils'
export { generateRandomInitialAcceleration, generateRandomPos, generateRandomSize } from './utils'

const numParticles = 1500
const positions = []
const sizes = []
const speeds = []
for (let i = 0; i < numParticles; i++) {
  positions.push(generateRandomPos(true))
  sizes.push(generateRandomSize())
  speeds.push(generateRandomInitialAcceleration())
}

const geometry = new BufferGeometry()
geometry.setAttribute(
  'position',
  new Float32BufferAttribute(positions.flat(), 3).setUsage(DynamicDrawUsage),
)
geometry.setAttribute('size', new Float32BufferAttribute(sizes, 1))
geometry.accumSpeed = speeds.flat()

export default geometry
