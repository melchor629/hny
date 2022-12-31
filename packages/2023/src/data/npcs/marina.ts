import spritesheet from '../spritesheets/marina.json'
import type { Npc } from '../../types/map'

const marina: Npc = {
  id: 'marina',
  size: { w: 22, h: 22 },
  boundingBox: { x1: 8, y1: 20, x2: 16, y2: 26 },
  renderOrderAddToY: 20,
  states: {
    rest: {
      spritesheet,
      frames: [
        { name: 'marina0.png', duration: 4.5 },
        { name: 'marina1.png', duration: 0.5 },
      ],
    },
    working: {
      spritesheet,
      frames: [
        { name: 'marina2.png', duration: 2.5 },
        { name: 'marina4.png', duration: 0.5 },
        { name: 'marina2.png', duration: 1.0 },
        { name: 'marina5.png', duration: 0.5 },
        { name: 'marina2.png', duration: 0.2 },
        { name: 'marina3.png', duration: 0.5 },
      ],
    },
    lookingAtYou: {
      spritesheet,
      frames: [{ name: 'marina6.png', duration: 10 }],
    },
    pointingAtYou: {
      spritesheet,
      frames: [{ name: 'marina7.png', duration: 10 }],
    },
  },
}

export default marina
