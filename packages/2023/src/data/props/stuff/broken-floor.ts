import type { Prop } from '../../../types/map'
import spritesheet from '../../spritesheets/stuff.json'

export const brokenFloor1: Prop = {
  size: { w: 32, h: 32 },
  type: 'broken-floor-1',
  texture: {
    spritesheet,
    name: 'stuff43.png',
  },
  boundingBox: { x1: 10, y1: 10, x2: 16, y2: 16 },
  renderOrderAddToY: 0,
}

export const brokenFloor2: Prop = {
  size: { w: 32, h: 32 },
  type: 'broken-floor-2',
  texture: {
    spritesheet,
    name: 'stuff44.png',
  },
  boundingBox: { x1: 9, y1: 8, x2: 20, y2: 18 },
  renderOrderAddToY: 0,
}

export const brokenFloor3: Prop = {
  size: { w: 32, h: 32 },
  type: 'broken-floor-3',
  texture: {
    spritesheet,
    name: 'stuff45.png',
  },
  boundingBox: { x1: 9, y1: 8, x2: 20, y2: 18 },
  renderOrderAddToY: 0,
}
