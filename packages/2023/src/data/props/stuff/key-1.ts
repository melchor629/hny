import type { Prop } from '../../../types/map'
import spritesheet from '../../spritesheets/stuff.json'

const key1: Prop = {
  size: { w: 32, h: 32 },
  type: 'key-1',
  texture: {
    spritesheet,
    name: 'stuff0.png',
  },
  boundingBox: { x1: 0, y1: 2, x2: 8, y2: 4 },
  renderOrderAddToY: -2,
}

export default key1
