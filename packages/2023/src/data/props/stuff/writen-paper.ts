import type { Prop } from '../../../types/map'
import spritesheet from '../../spritesheets/stuff.json'

const writenPaper: Prop = {
  size: { w: 16, h: 16 },
  type: 'writen-paper',
  texture: {
    spritesheet,
    name: 'stuff2.png',
  },
  boundingBox: { x1: 2, y1: 12, x2: 14, y2: 15 },
  renderOrderAddToY: 10,
}

export default writenPaper
