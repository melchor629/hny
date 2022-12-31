import spritesheet from '../../spritesheets/stuff.json'

export const leverFrontUp = {
  size: { w: 32, h: 32 },
  type: 'lever-front-up',
  texture: {
    spritesheet,
    name: 'stuff13.png',
  },
  boundingBox: { x1: 2, y1: 8, x2: 10, y2: 16 },
  renderOrderAddToY: 8,
}

export const leverFrontDown = {
  ...leverFrontUp,
  type: 'lever-front-down',
  texture: {
    ...leverFrontUp.texture,
    name: 'stuff14.png',
  },
}
