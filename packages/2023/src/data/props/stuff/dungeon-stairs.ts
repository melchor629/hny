import type { Prop } from '../../../types/map'
import spritesheet from '../../spritesheets/stuff.json'

export const dungeonStairsLeft: Prop = {
  size: { w: 32, h: 32 },
  type: 'dungeon-stairs-left',
  texture: {
    spritesheet,
    name: 'stuff51.png',
  },
  boundingBox: { x1: 0, y1: 0, x2: 5, y2: 32 },
  renderOrder: 10,
}

export const dungeonStairsRight: Prop = {
  size: { w: 32, h: 32 },
  type: 'dungeon-stairs-right',
  texture: {
    spritesheet,
    name: 'stuff52.png',
  },
  boundingBox: { x1: 27, y1: 0, x2: 32, y2: 32 },
  renderOrder: 10,
}
