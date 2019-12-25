import { inRange } from 'lodash-es'
import geometry, { generateRandomPos, generateRandomInitialAcceleration } from './geometry'

const renderLoop = delta => {
  const speed = [-0.08, -0.1, 0]
  const accel = [0.01, -0.02, 0]
  const pos = geometry.attributes.position.array

  for (let i = 0; i < pos.length; i += 3) {
    geometry.accumSpeed[i + 0] += accel[0] * delta
    geometry.accumSpeed[i + 1] += accel[1] * delta
    geometry.accumSpeed[i + 2] += accel[2] * delta
    pos[i + 0] += (speed[0] + geometry.accumSpeed[i + 0]) * delta
    pos[i + 1] += (speed[1] + geometry.accumSpeed[i + 1]) * delta
    pos[i + 2] += (speed[2] + geometry.accumSpeed[i + 2]) * delta

    if (!inRange(pos[i], -10, 10) || !inRange(pos[i + 1], -5 + 4 * (pos[i + 2] / 5), 25)) {
      //console.log(`reset ${i}`)
      const newPos = generateRandomPos()
      const newInitialAccel = generateRandomInitialAcceleration()
      pos[i + 0] = newPos[0]
      pos[i + 1] = newPos[1]
      pos[i + 2] = newPos[2]
      geometry.accumSpeed[i + 0] = newInitialAccel[0]
      geometry.accumSpeed[i + 1] = newInitialAccel[1]
      geometry.accumSpeed[i + 2] = newInitialAccel[2]
    }
  }

  geometry.attributes.position.needsUpdate = true
}

export default renderLoop
