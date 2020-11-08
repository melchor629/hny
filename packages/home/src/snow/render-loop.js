import { inRange } from 'lodash-es'
import { Vector3, Camera } from 'three'
import geometry, { generateRandomPos, generateRandomInitialAcceleration } from './geometry'

const speed = new Vector3(-0.08, -0.1, 0)
const accel = new Vector3(0.01, -0.02, 0)

/**
 * Updates the particles position and acceleration. If a particle falls outside the screen, it is
 * assigned a new random position and acceleration to be reused in the loop of infinite particle
 * fall. Y acceleration is limited so particles don't go as fast as sonic on the screen. When
 * a particle goes outside the screen, the Y acceleration is slow down a bit instead of reset, to
 * keep the momentum of all the particles.
 * @param {number} delta delta time for that frame
 * @param {Camera} camera Camera for the scene
 */
const renderLoop = (delta, camera) => {
  const pos = geometry.attributes.position.array

  for (let i = 0; i < pos.length; i += 3) {
    geometry.accumSpeed[i + 0] += accel.x * delta
    geometry.accumSpeed[i + 1] += accel.y * delta
    geometry.accumSpeed[i + 2] += accel.z * delta
    geometry.accumSpeed[i + 1] = Math.max(geometry.accumSpeed[i + 1], -0.5)
    pos[i + 0] += (speed.x + geometry.accumSpeed[i + 0]) * delta
    pos[i + 1] += (speed.y + geometry.accumSpeed[i + 1]) * delta
    pos[i + 2] += (speed.z + geometry.accumSpeed[i + 2]) * delta

    const projected = new Vector3(pos[i + 0], pos[i + 1], pos[i + 2]).project(camera)
    if (!inRange(projected.x, -1.7, 1.35) || !inRange(projected.y, -1.05, 4.5)) {
      ;[pos[i + 0], pos[i + 1], pos[i + 2]] = generateRandomPos(camera)
      const [newAccelX, newAccelY, newAccelZ] = generateRandomInitialAcceleration()
      geometry.accumSpeed[i + 0] = newAccelX
      geometry.accumSpeed[i + 1] -= newAccelY
      geometry.accumSpeed[i + 2] = newAccelZ
    }
  }

  geometry.attributes.position.needsUpdate = true

  if (process.env.NODE_ENV !== 'production') {
    if (!window.project) window.project = (x, y, z = 0) => new Vector3(x, y, z).project(camera)
    if (!window.unproject)
      window.unproject = (x, y, z = 0) => new Vector3(x, y, z).unproject(camera)
  }
}

export default renderLoop
