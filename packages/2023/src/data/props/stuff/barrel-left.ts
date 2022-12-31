import type { Prop } from '../../../types/map'
import spritesheet from '../../spritesheets/stuff.json'

const barrelLeft: Prop = {
  size: { w: 30, h: 30 },
  type: 'barrel-left',
  texture: {
    spritesheet,
    name: 'stuff21.png',
  },
  boundingBox: { x1: 2, y1: 19, x2: 26, y2: 26 },
  renderOrderAddToY: 11,
}

export default barrelLeft
