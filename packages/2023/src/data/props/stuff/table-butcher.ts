import type { Prop } from '../../../types/map'
import spritesheet from '../../spritesheets/stuff.json'

const tableButcher: Prop = {
  size: { w: 32, h: 32 },
  type: 'table-butcher',
  texture: {
    spritesheet,
    name: 'stuff35.png',
  },
  boundingBox: { x1: 6, y1: 11, x2: 22, y2: 26 },
}

export default tableButcher
