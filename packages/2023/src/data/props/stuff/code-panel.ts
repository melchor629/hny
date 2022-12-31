import type { Prop } from '../../../types/map'
import spritesheet from '../../spritesheets/stuff.json'

const codePanel: Prop = {
  size: { w: 32, h: 32 },
  type: 'code-panel',
  texture: {
    spritesheet,
    name: 'stuff25.png',
  },
  renderOrderAddToY: 3,
  boundingBox: { x1: 0, y1: 3, x2: 4, y2: 7 },
}

export default codePanel
