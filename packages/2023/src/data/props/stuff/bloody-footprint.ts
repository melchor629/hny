import type { Prop } from '../../../types/map'
import spritesheet from '../../spritesheets/stuff.json'

const bloodyFootprint: Prop = {
  size: { w: 32, h: 32 },
  type: 'bloody-footprint',
  texture: {
    spritesheet,
    name: 'stuff15.png',
  },
}

export default bloodyFootprint
