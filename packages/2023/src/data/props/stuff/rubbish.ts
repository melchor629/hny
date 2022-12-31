import type { Prop } from '../../../types/map'
import spritesheet from '../../spritesheets/stuff.json'

const rubbish1: Prop = {
  size: { w: 32, h: 32 },
  type: 'rubbish',
  texture: {
    spritesheet,
    name: 'stuff9.png',
  },
  boundingBox: { x1: 4, y1: 22, x2: 22, y2: 32 },
  renderOrderAddToY: 16,
}

const rubbish2: Prop = {
  ...rubbish1,
  texture: {
    spritesheet,
    name: 'stuff28.png',
  },
}

const rubbish3: Prop = {
  ...rubbish1,
  texture: {
    spritesheet,
    name: 'stuff29.png',
  },
}

const rubbish4: Prop = {
  ...rubbish1,
  texture: {
    spritesheet,
    name: 'stuff30.png',
  },
}

export default [rubbish1, rubbish2, rubbish3, rubbish4]
