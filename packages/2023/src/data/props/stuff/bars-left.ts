import type { Prop } from '../../../types/map'
import spritesheet from '../../spritesheets/stuff.json'

const barsLeft: Prop = {
  size: { w: 32, h: 32 },
  type: 'bars-left',
  texture: {
    spritesheet,
    name: 'stuff22.png',
  },
  boundingBox: { x1: 5, y1: 28, x2: 32, y2: 32 },
  renderOrderAddToY: 24,
}

export default barsLeft
