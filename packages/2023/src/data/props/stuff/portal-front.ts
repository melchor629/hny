import type { Prop } from '../../../types/map'
import spritesheet from '../../spritesheets/stuff.json'

const portalFront: Prop = {
  size: { w: 32, h: 32 },
  type: 'portal-front',
  texture: {
    spritesheet,
    name: 'stuff17.png',
  },
  renderOrderAddToY: 18,
}

export default portalFront
