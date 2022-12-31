import type { Prop } from '../../../types/map'
import spritesheet from '../../spritesheets/stuff.json'

const photo5: Prop = {
  size: { w: 16, h: 16 },
  type: 'photo-5',
  texture: {
    spritesheet,
    name: 'stuff7.png',
  },
  boundingBox: { x1: 2, y1: 12, x2: 14, y2: 15 },
  renderOrderAddToY: 9,
}

export default photo5
