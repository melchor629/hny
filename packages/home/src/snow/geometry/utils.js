import { random } from 'lodash-es'

export const generateRandomPos = (allowInside = false) => [
  random(-10, 10, true),
  random(allowInside ? 5 : 8, allowInside ? 25 : 12, true),
  random(-1, -5, true),
]

export const generateRandomSize = () => random(2, 4, true)

export const generateRandomInitialAcceleration = () => [
  random(-0.1, 0.1, true),
  random(-0.1, 0.1, true),
  random(-0.04, 0.04, true),
]
