import type { Prop } from '../../../types/map'
import spritesheet from '../../spritesheets/stuff.json'

const tableMagic: Prop = {
  size: { w: 32, h: 32 },
  type: 'table-magic',
  texture: {
    spritesheet,
    name: 'stuff34.png',
  },
  boundingBox: { x1: 6, y1: 11, x2: 22, y2: 26 },
}

export default tableMagic
