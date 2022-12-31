import spritesheet from '../spritesheets/chris.json'
import type { Npc } from '../../types/map'

const chris: Npc = {
  id: 'chris',
  size: { w: 22, h: 22 },
  boundingBox: { x1: 8, y1: 20, x2: 16, y2: 26 },
  renderOrderAddToY: 14,
  states: {
    rest: {
      spritesheet,
      frames: [
        { name: 'chris0.png', duration: 4.0 },
        { name: 'chris1.png', duration: 0.5 },
      ],
    },
    sleep: {
      spritesheet,
      frames: [
        { name: 'chris2.png', duration: 1.5 },
        { name: 'chris3.png', duration: 1.5 },
      ],
    },
    wakingUp: {
      spritesheet,
      frames: [
        { name: 'chris2.png', duration: 1 },
        { name: 'chris4.png', duration: 2 },
        { name: 'chris5.png', duration: 3 },
        { name: 'chris0.png', duration: 100000 },
      ],
    },
  },
}

export default chris
