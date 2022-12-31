import type { Prop } from '../../../types/map'
import spritesheet from '../../spritesheets/stuff.json'

const shelfEmpty: Prop = {
  size: { w: 32, h: 32 },
  type: 'shelf-empty',
  texture: {
    spritesheet,
    name: 'stuff40.png',
  },
  boundingBox: { x1: 4, y1: 23, x2: 28, y2: 28 },
  renderOrderAddToY: 18,
}

export default shelfEmpty
