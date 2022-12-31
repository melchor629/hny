import type { Prop } from '../../../types/map'
import spritesheet from '../../spritesheets/stuff.json'

const key2: Prop = {
  size: { w: 32, h: 32 },
  type: 'key-2',
  texture: {
    spritesheet,
    name: 'stuff1.png',
  },
  boundingBox: { x1: 0, y1: 2, x2: 8, y2: 4 },
}

export default key2
