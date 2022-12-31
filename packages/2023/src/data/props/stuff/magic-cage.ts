import type { Prop } from '../../../types/map'
import spritesheet from '../../spritesheets/stuff.json'

const magicCage: Prop = {
  size: { w: 18, h: 18 },
  type: 'magic-cage',
  texture: {
    spritesheet,
    name: 'stuff42.png',
  },
  renderOrderAddToY: 64,
}

export default magicCage
