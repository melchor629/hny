import spritesheet from '../spritesheets/marisa.json'
import type { Npc } from '../../types/map'

const marisa: Npc = {
  id: 'marisa',
  size: { w: 22, h: 22 },
  boundingBox: { x1: 6, y1: 20, x2: 12, y2: 28 },
  renderOrderAddToY: 21,
  states: {
    rest: {
      spritesheet,
      frames: [
        { name: 'marisa0.png', duration: 3.5 },
        { name: 'marisa1.png', duration: 0.5 },
        { name: 'marisa0.png', duration: 1.5 },
      ],
    },
    working: {
      spritesheet,
      frames: [
        { name: 'marisa2.png', duration: 2.5 },
        { name: 'marisa5.png', duration: 0.5 },
        { name: 'marisa2.png', duration: 1.0 },
        { name: 'marisa4.png', duration: 0.5 },
        { name: 'marisa2.png', duration: 1.0 },
        { name: 'marisa6.png', duration: 0.5 },
        { name: 'marisa2.png', duration: 1.0 },
        { name: 'marisa4.png', duration: 0.5 },
        { name: 'marisa2.png', duration: 2.5 },
        { name: 'marisa3.png', duration: 0.5 },
      ],
    },
    lookingAtYou: {
      spritesheet,
      frames: [{ name: 'marisa7.png', duration: 10 }],
    },
  },
}

export default marisa
