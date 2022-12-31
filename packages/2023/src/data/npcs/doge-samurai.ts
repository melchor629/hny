import spritesheet from '../spritesheets/doge-samurai.json'
import type { Npc } from '../../types/map'

const dogeSamurai: Npc = {
  id: 'doge-samurai',
  size: { w: 32, h: 32 },
  boundingBox: { x1: 0, y1: 16, x2: 32, y2: 32 },
  states: {
    rest: {
      spritesheet,
      frames: [
        { name: 'doge-samurai0.png', duration: 1 },
        { name: 'doge-samurai1.png', duration: 1 },
      ],
    },
  },
}

export default dogeSamurai
