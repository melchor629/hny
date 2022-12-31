import spritesheet from '../spritesheets/nap-guy-2.json'
import type { Npc } from '../../types/map'

const napGuy2: Npc = {
  id: 'nap-guy-2',
  size: { w: 22, h: 22 },
  boundingBox: { x1: 6, y1: 14, x2: 16, y2: 22 },
  renderOrderAddToY: 14,
  states: {
    rest: {
      spritesheet,
      frames: [{ name: 'nap-guy-26.png', duration: 1000 }],
    },
    sleep: {
      spritesheet,
      frames: [
        { name: 'nap-guy-24.png', duration: 1.5 },
        { name: 'nap-guy-25.png', duration: 1.5 },
      ],
    },
    wakingUp: {
      spritesheet,
      frames: [
        { name: 'nap-guy-21.png', duration: 2 },
        { name: 'nap-guy-26.png', duration: 100000 },
      ],
    },
    goAway: {
      spritesheet,
      frames: [
        { name: 'nap-guy-21.png', duration: 1.0 },
        { name: 'nap-guy-27.png', duration: 0.5 },
        { name: 'nap-guy-28.png', duration: 100 },
      ],
    },
  },
}

export default napGuy2
