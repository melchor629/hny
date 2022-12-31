import spritesheet from '../spritesheets/nap-guy-1.json'
import type { Npc } from '../../types/map'

const napGuy1: Npc = {
  id: 'nap-guy-1',
  size: { w: 22, h: 22 },
  boundingBox: { x1: 6, y1: 18, x2: 16, y2: 26 },
  renderOrderAddToY: 14,
  states: {
    rest: {
      spritesheet,
      frames: [{ name: 'nap-guy-16.png', duration: 1000 }],
    },
    sleep: {
      spritesheet,
      frames: [
        { name: 'nap-guy-12.png', duration: 1.5 },
        { name: 'nap-guy-13.png', duration: 1.5 },
      ],
    },
    wakingUp: {
      spritesheet,
      frames: [
        { name: 'nap-guy-10.png', duration: 2 },
        { name: 'nap-guy-16.png', duration: 100000 },
      ],
    },
    goAway: {
      spritesheet,
      frames: [
        { name: 'nap-guy-10.png', duration: 1.0 },
        { name: 'nap-guy-17.png', duration: 0.5 },
        { name: 'nap-guy-18.png', duration: 100 },
      ],
    },
  },
}

export default napGuy1
