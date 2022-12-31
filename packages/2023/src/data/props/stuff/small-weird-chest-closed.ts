import type { Prop } from '../../../types/map'
import spritesheet from '../../spritesheets/stuff.json'

const smallWeirdChestClosed: Prop = {
  size: { w: 32, h: 32 },
  type: 'small-weird-chest-closed',
  texture: {
    spritesheet,
    name: 'stuff32.png',
  },
  boundingBox: { x1: 1, y1: 5, x2: 5, y2: 9 },
  renderOrderAddToY: 3,
}

export default smallWeirdChestClosed
