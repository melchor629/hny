import type { Prop } from '../../../types/map'
import spritesheet from '../../spritesheets/stuff.json'

const barrelUp: Prop = {
  size: { w: 28, h: 30 },
  type: 'barrel-up',
  texture: {
    spritesheet,
    name: 'stuff19.png',
  },
  boundingBox: { x1: 4, y1: 20, x2: 24, y2: 28 },
  renderOrderAddToY: 11,
}

export default barrelUp
