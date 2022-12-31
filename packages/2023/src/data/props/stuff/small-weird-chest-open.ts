import type { Prop } from '../../../types/map'
import spritesheet from '../../spritesheets/stuff.json'

const smallWeirdChestOpen: Prop = {
  size: { w: 32, h: 32 },
  type: 'small-weird-chest-open',
  texture: {
    spritesheet,
    name: 'stuff33.png',
  },
  boundingBox: { x1: 1, y1: 5, x2: 5, y2: 9 },
  renderOrderAddToY: 3,
}

export default smallWeirdChestOpen
