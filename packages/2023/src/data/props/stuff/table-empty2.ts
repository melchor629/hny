import type { Prop } from '../../../types/map'
import spritesheet from '../../spritesheets/stuff.json'

const tableEmpty2: Prop = {
  size: { w: 32, h: 32 },
  type: 'table-empty-2',
  texture: {
    spritesheet,
    name: 'stuff50.png',
  },
  boundingBox: { x1: 1, y1: 18, x2: 31, y2: 28 },
}

export default tableEmpty2
