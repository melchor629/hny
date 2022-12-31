import type { Prop } from '../../../types/map'
import spritesheet from '../../spritesheets/stuff.json'

const specialObject: Prop = {
  size: { w: 32, h: 32 },
  type: 'special-object',
  texture: {
    spritesheet,
    name: 'stuff10.png',
  },
  boundingBox: { x1: 8, y1: 20, x2: 23, y2: 32 },
}

export default specialObject
