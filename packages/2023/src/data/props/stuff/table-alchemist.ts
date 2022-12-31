import type { Prop } from '../../../types/map'
import spritesheet from '../../spritesheets/stuff.json'

const tableAlchemist: Prop = {
  size: { w: 32, h: 32 },
  type: 'table-alchemist',
  texture: {
    spritesheet,
    name: 'stuff36.png',
  },
  boundingBox: { x1: 6, y1: 11, x2: 22, y2: 26 },
}

export default tableAlchemist
