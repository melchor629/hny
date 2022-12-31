import spritesheet from '../../spritesheets/stuff.json'

export const leverBehindUp = {
  size: { w: 32, h: 32 },
  type: 'lever-behind-up',
  texture: {
    spritesheet,
    name: 'stuff11.png',
  },
  boundingBox: { x1: 2, y1: 8, x2: 10, y2: 14 },
  renderOrderAddToY: 8,
}

export const leverBehindDown = {
  ...leverBehindUp,
  type: 'lever-behind-down',
  texture: {
    ...leverBehindUp.texture,
    name: 'stuff12.png',
  },
}
