import type { Prop } from '../../../types/map'
import spritesheet from '../../spritesheets/stuff.json'

const portalSide: Prop = {
  size: { w: 32, h: 42 },
  type: 'portal-side',
  texture: {
    spritesheet,
    name: 'stuff18.png',
  },
}

export default portalSide
