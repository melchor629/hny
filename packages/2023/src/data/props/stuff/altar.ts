import type { Prop } from '../../../types/map'
import spritesheet from '../../spritesheets/stuff.json'

const altar: Prop = {
  size: { w: 128, h: 128 },
  type: 'altar',
  texture: {
    spritesheet,
    name: 'stuff16.png',
  },
  boundingBox: { x1: 12, y1: 96, x2: 116, y2: 115 },
}

export default altar
