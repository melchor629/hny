import type { Prop } from '../../../types/map'
import spritesheet from '../../spritesheets/stuff.json'

const tableSchoolMateFixed: Prop = {
  size: { w: 32, h: 32 },
  type: 'table-school-mate-fixed',
  texture: {
    spritesheet,
    name: 'stuff53.png',
  },
  boundingBox: { x1: 1, y1: 11, x2: 31, y2: 24 },
}

export default tableSchoolMateFixed
