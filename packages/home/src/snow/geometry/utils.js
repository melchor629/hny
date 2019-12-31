import { random } from 'lodash-es'

export const generateRandomPos = (allowInside = false) => [
  random(-15, 8, true),
  random(allowInside ? 3 : 8, allowInside ? 17 : 9, true),
  random(-1, -5, true),
]

export const generateRandomSize = () => random(2, 4, true)

export const generateRandomInitialAcceleration = () => [
  random(-0.1, 0.1, true),
  random(-0.1, 0.1, true),
  random(-0.04, 0.04, true),
]
