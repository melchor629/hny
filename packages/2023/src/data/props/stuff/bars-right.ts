import type { Prop } from '../../../types/map'
import spritesheet from '../../spritesheets/stuff.json'

const barsRight: Prop = {
  size: { w: 32, h: 32 },
  type: 'bars-right',
  texture: {
    spritesheet,
    name: 'stuff23.png',
  },
  boundingBox: { x1: 0, y1: 28, x2: 27, y2: 32 },
  renderOrderAddToY: 24,
}

export default barsRight
