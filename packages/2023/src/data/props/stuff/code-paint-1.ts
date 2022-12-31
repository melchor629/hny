import type { Prop } from '../../../types/map'
import spritesheet from '../../spritesheets/stuff.json'

const codePaint1: Prop = {
  size: { w: 32, h: 31 },
  type: 'code-paint-1',
  texture: {
    spritesheet,
    name: 'stuff24.png',
  },
  renderOrderAddToY: 16,
}

export default codePaint1
