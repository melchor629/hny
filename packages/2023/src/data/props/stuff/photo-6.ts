import type { Prop } from '../../../types/map'
import spritesheet from '../../spritesheets/stuff.json'

const photo6: Prop = {
  size: { w: 16, h: 16 },
  type: 'photo-6',
  texture: {
    spritesheet,
    name: 'stuff8.png',
  },
  boundingBox: { x1: 2, y1: 12, x2: 14, y2: 15 },
  renderOrderAddToY: 9,
}

export default photo6
