import type { Prop } from '../../../types/map'
import spritesheet from '../../spritesheets/stuff.json'

const photo4: Prop = {
  size: { w: 16, h: 16 },
  type: 'photo-4',
  texture: {
    spritesheet,
    name: 'stuff6.png',
  },
  boundingBox: { x1: 2, y1: 12, x2: 14, y2: 15 },
  renderOrderAddToY: 9,
}

export default photo4
