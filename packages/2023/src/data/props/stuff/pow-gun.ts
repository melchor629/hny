import type { Prop } from '../../../types/map'
import spritesheet from '../../spritesheets/stuff.json'

const powGun: Prop = {
  size: { w: 32, h: 32 },
  type: 'pow-gun',
  texture: {
    spritesheet,
    name: 'stuff31.png',
  },
}

export default powGun
