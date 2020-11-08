import { random } from 'lodash-es'
import { Vector3, Camera } from 'three'

/**
 * Generates a random position for a particle using either right values from the world space
 * (if camera is provided) or a random position using hardcoded values (if camera is not provided).
 * @param {Camera} camera Camera to use when calculating the right world positions
 * @returns {[number, number, number]} A (x, y, z) tuple
 */
export const generateRandomPos = (camera = null) => {
  if (camera) {
    const z = random(-1, -5, true)
    const zProjected = new Vector3(0, 0, z).project(camera).z
    const low = new Vector3(-1.2, 1.25, zProjected).unproject(camera)
    const high = new Vector3(1.2, 1.05, zProjected).unproject(camera)
    return [random(low.x, high.x, true), random(low.y, high.y, true), z]
  }

  return [random(-10, 8, true), random(3, 17, true), random(-1, -5, true)]
}

/**
 * Generates a random size for a particle.
 */
export const generateRandomSize = () => random(2, 4, true)

/**
 * Generates a random initial acceleration for a particle.
 * @returns {[number, number, number]} A (x, y, z) tuple
 */
export const generateRandomInitialAcceleration = () => [
  random(-0.1, 0.1, true),
  random(-0.1, 0.1, true),
  random(-0.04, 0.04, true),
]
