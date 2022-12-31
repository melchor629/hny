import type { Prop } from '../../../types/map'
import spritesheet from '../../spritesheets/stuff.json'

const shelfSide: Prop = {
  size: { w: 32, h: 32 },
  type: 'shelf-side',
  texture: {
    spritesheet,
    name: 'stuff47.png',
  },
  boundingBox: { x1: 13, y1: 23, x2: 19, y2: 32 },
  renderOrderAddToY: 18,
}

export default shelfSide
