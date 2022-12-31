import type { Prop } from '../../../types/map'
import spritesheet from '../../spritesheets/stuff.json'

const barrelRight: Prop = {
  size: { w: 30, h: 30 },
  type: 'barrel-right',
  texture: {
    spritesheet,
    name: 'stuff20.png',
  },
  boundingBox: { x1: 2, y1: 19, x2: 26, y2: 26 },
  renderOrderAddToY: 11,
}

export default barrelRight
