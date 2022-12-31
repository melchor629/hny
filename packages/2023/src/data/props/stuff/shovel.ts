import type { Prop } from '../../../types/map'
import spritesheet from '../../spritesheets/stuff.json'

const shovel: Prop = {
  size: { w: 32, h: 32 },
  type: 'shovel',
  texture: {
    spritesheet,
    name: 'stuff46.png',
  },
}

export default shovel
