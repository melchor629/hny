import type { Prop } from '../../../types/map'
import spritesheet from '../../spritesheets/stuff.json'

const weirdChestOpen: Prop = {
  size: { w: 64, h: 64 },
  type: 'weird-chest-1',
  texture: {
    spritesheet,
    name: 'stuff27.png',
  },
  boundingBox: { x1: 10 * 2, y1: 18 * 2, x2: 22 * 2, y2: 21 * 2 },
  renderOrderAddToY: 36,
}

export default weirdChestOpen
