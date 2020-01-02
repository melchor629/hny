import { easeSinInOut } from 'd3-ease'

const updateRotation = (rot, { delta }) => {
  let newRot = rot + (Math.PI / 16) * delta

  if (newRot > 2 * Math.PI) {
    newRot -= 2 * Math.PI
  }

  return newRot
}

export const user = {
  keyframes: {
    _: {
      animRot: (_, { mousePos }) => Math.PI * ((1.0 - mousePos.x) * 0.8 + 0.1),
      animR0t: (_, { mousePos }) => Math.PI * (mousePos.y - 0.5) * 0.8,
    },
  },
}

export const transitionToNormal = startTime => {
  let fromY = null
  const toY = 15
  return {
    time: time => (time - startTime) / 1000,
    keyframes: {
      _: {
        animRot: updateRotation,
        animR0t: Math.PI * 0.25,
        camera: {
          position: {
            y: (value, { time }) => {
              if (fromY === null) {
                fromY = value
              }

              return (toY - fromY) * easeSinInOut(time / 2) + fromY
            },
          },
        },
      },
      2: {
        mode: 'default',
      },
    },
  }
}

export const anvilSmash = startTime => ({
  time: time => ((time - startTime) / 1000) % 4.363,
  keyframes: {
    0.0: { effect: 1, animRot: Math.PI / 2 },
    0.54: { effect: 1 },
    1.09: { effect: 1, animRot: Math.PI * 0.75, color: c => c + 2 },
    2.19: { effect: 1, animRot: Math.PI / 2 },
    2.73: { effect: 1 },
    3.27: { effect: 1, animRot: Math.PI * 0.25, color: c => c + 2 },
    4.09: { effect: 1, animRot: Math.PI / 2 },
  },
})

export const brushTrain = startTime => ({
  time: time => ((time - startTime) / 1000) % 2.181,
  keyframes: {
    0.0: { effect: 1, animRot: Math.PI * 0.5, color: 0, animR0t: Math.PI * 0.25 },
    0.27: { effect: 1, animR0t: -Math.PI * 0.4 },
    0.55: { effect: 0.8, animRot: Math.PI * 0.75, animR0t: Math.PI * 0.25 },
    0.82: { effect: 0.8, animRot: Math.PI * 1.75 },
    1.31: { effect: 0.7, animRot: Math.PI * 0.25 },
    1.64: { effect: 1, animRot: Math.PI * 0.5 },
    1.91: { effect: 0.9, animRot: Math.PI * 1.25 },
    2.06: { effect: 0.9, animRot: Math.PI * 0.5 },
  },
})

export const funkyShuffle = startTime => ({
  time: time => ((time - startTime) / 1000) % 2.181,
  keyframes: {
    0.0: { effect: 0.8, animRot: Math.PI / 2 },
    0.43: { effect: 0.9 },
    0.53: { effect: 1, animRot: Math.PI * 1.5, color: c => c + 1 },
    0.83: { effect: 1, animRot: Math.PI * 1.75 },
    0.97: { effect: 0.8, animRot: Math.PI / 2 },
    1.25: { effect: 1, animRot: Math.PI * 1.5, color: c => c + 1 },
    1.36: { effect: 1, animRot: Math.PI * 1.75 },
    1.65: { effect: 1, animRot: Math.PI / 2 },
    1.91: { effect: 0.8 },
  },
})

export const matchboxBeat = startTime => ({
  time: time => ((time - startTime) / 1000) % 4.363,
  keyframes: {
    0.0: { effect: 0.8, animRot: Math.PI * 0.75, color: c => c + 1 },
    0.54: { effect: 1, animRot: Math.PI * 0.25, color: c => c + 1 },
    1.09: { effect: 0.8, animRot: Math.PI * 0.75, color: c => c + 1 },
    1.62: { effect: 1, animRot: Math.PI * 0.25, color: c => c + 1 },
    2.16: { effect: 0.8, animRot: Math.PI * 0.75, color: c => c + 1 },
    2.71: { effect: 1, animRot: Math.PI * 0.25, color: c => c + 1 },
    3.26: { effect: 0.8, animRot: Math.PI * 0.75, color: c => c + 1 },
    3.81: { effect: 1, animRot: Math.PI * 0.25, color: c => c + 1 },
  },
})

export const minimalDisco = startTime => ({
  time: time => ((time - startTime) / 1000) % 4.363,
  keyframes: {
    0.0: { effect: 0.8, animRot: Math.PI * 0.25, color: c => c + 1 },
    0.54: { effect: 1, animRot: Math.PI * 0.75, color: c => c + 1 },
    1.09: { effect: 0.8, animRot: Math.PI * 0.25, color: c => c + 1 },
    1.62: { effect: 1, animRot: Math.PI * 0.75, color: c => c + 1 },
    2.16: { effect: 0.8, animRot: Math.PI * 0.25, color: c => c + 1 },
    2.71: { effect: 1, animRot: Math.PI * 0.75, color: c => c + 1 },
    3.26: { effect: 0.8, animRot: Math.PI * 0.25, color: c => c + 1 },
    3.81: { effect: 1, animRot: Math.PI * 0.75, color: c => c + 1 },
    3.96: { effect: 1, animRot: Math.PI * 1.5, color: c => c + 1 },
  },
})

export const space = startTime => ({
  time: time => ((time - startTime) / 1000) % 9.6,
  keyframes: {
    0: { color: 0, animR0t: Math.PI * 0.25 },
    _: { animRot: updateRotation },
  },
})

export default {
  keyframes: {
    _: { animRot: updateRotation, animR0t: Math.PI * 0.25 },
  },
}
